import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import useUsers from '../useUsers'

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  return { wrapper, queryClient }
}

jest.mock('@/lib/UsersApi', () => ({
  getAllUsers: jest.fn(),
  getUserById: jest.fn(),
  createUser: jest.fn(),
  deleteUserById: jest.fn(),
  updateUserById: jest.fn(),
}))

const {
  getAllUsers,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById,
} = jest.requireMock('@/lib/UsersApi') as jest.Mocked<
  typeof import('@/lib/UsersApi')
>

describe('useUsers hook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('fetches all users and user by id', async () => {
    getAllUsers.mockResolvedValue({
      page: 1,
      limit: 1000,
      total: 1,
      totalPages: 1,
      prevPage: false,
      nextPage: false,
      users: [{ id: '1', name: 'John Doe' }],
    })
    getUserById.mockResolvedValue({ id: '1', name: 'John Doe' })

    const { wrapper } = createWrapper()
    const { result } = renderHook(() => useUsers('1'), { wrapper })

    await waitFor(() => expect(result.current.users.isSuccess).toBe(true))
    await waitFor(() => expect(result.current.userById.isSuccess).toBe(true))

    expect(result.current.users.data?.users[0].name).toBe('John Doe')
    expect(result.current.userById.data?.id).toBe('1')
  })

  it('creates a user and updates the cache', async () => {
    const newUserData = { id: '2', name: 'Jane Doe' }
    getAllUsers.mockResolvedValueOnce({
      page: 1,
      limit: 1000,
      total: 0,
      totalPages: 1,
      prevPage: false,
      nextPage: false,
      users: [],
    })
    createUser.mockResolvedValue(newUserData)

    const { wrapper, queryClient } = createWrapper()
    const setQueryDataSpy = jest.spyOn(queryClient, 'setQueryData')
    const { result } = renderHook(() => useUsers(undefined), { wrapper })

    await waitFor(() => expect(result.current.users.isSuccess).toBe(true))

    await result.current.newUser.mutateAsync({ name: 'Jane Doe' } as any)

    expect(createUser).toHaveBeenCalledWith({ name: 'Jane Doe' })
    expect(setQueryDataSpy).toHaveBeenCalledWith(
      ['users', {}],
      expect.any(Function)
    )

    const [, updater] = setQueryDataSpy.mock.calls.find(
      (call) => Array.isArray(call[0]) && call[0][0] === 'users'
    ) as [any, (oldData: any) => any]

    const updated = updater(undefined)
    expect(updated.users).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: '2' })])
    )
  })

  it('deletes a user and updates the cache', async () => {
    getAllUsers.mockResolvedValueOnce({
      page: 1,
      limit: 1000,
      total: 1,
      totalPages: 1,
      prevPage: false,
      nextPage: false,
      users: [{ id: '3', name: 'User 3' }],
    })
    deleteUserById.mockResolvedValue({ success: true })

    const { wrapper, queryClient } = createWrapper()
    const setQueryDataSpy = jest.spyOn(queryClient, 'setQueryData')
    const { result } = renderHook(() => useUsers(undefined), { wrapper })

    await waitFor(() => expect(result.current.users.isSuccess).toBe(true))

    await result.current.deleteUser.mutateAsync('3')

    expect(deleteUserById).toHaveBeenCalledWith('3')
    expect(setQueryDataSpy).toHaveBeenCalledWith(
      ['users', {}],
      expect.any(Function)
    )

    const [, updater] = setQueryDataSpy.mock.calls.find(
      (call) => Array.isArray(call[0]) && call[0][0] === 'users'
    ) as [any, (oldData: any) => any]

    const previous = {
      page: 1,
      limit: 1000,
      total: 1,
      totalPages: 1,
      prevPage: false,
      nextPage: false,
      users: [{ id: '3', name: 'User 3' }],
    }

    const updated = updater(previous)
    expect(updated.users).toHaveLength(0)
    expect(updated.total).toBe(0)
  })

  it('updates a user and invalidates queries', async () => {
    getAllUsers.mockResolvedValue({
      page: 1,
      limit: 1000,
      total: 1,
      totalPages: 1,
      prevPage: false,
      nextPage: false,
      users: [{ id: '4', name: 'Old Name' }],
    })
    updateUserById.mockResolvedValue({ id: '4', name: 'New Name' })

    const { wrapper, queryClient } = createWrapper()
    const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries')

    const { result } = renderHook(() => useUsers('4'), { wrapper })

    await waitFor(() => expect(result.current.users.isSuccess).toBe(true))

    await result.current.updateUser.mutateAsync({
      id: '4',
      user: { name: 'New Name' } as any,
    })

    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['users', {}] })
  })
})
