import { act, renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import useCategories from '../useCategories'

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

jest.mock('@/lib/resources/categoryApi', () => ({
  getAllCategories: jest.fn(),
  createCategory: jest.fn(),
  updateOldCategory: jest.fn(),
  deleteOldCategory: jest.fn(),
}))

const {
  getAllCategories,
  createCategory,
  updateOldCategory,
  deleteOldCategory,
} = jest.requireMock('@/lib/resources/categoryApi') as jest.Mocked<
  typeof import('@/lib/resources/categoryApi')
>

describe('useCategories hook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('obtiene las categorías correctamente', async () => {
    getAllCategories.mockResolvedValue([
      { id: '1', name: 'Abrigos' } as any,
      { id: '2', name: 'Camisas' } as any,
    ])

    const { wrapper } = createWrapper()
    const { result } = renderHook(() => useCategories(), { wrapper })

    await waitFor(() => expect(result.current.categories.isSuccess).toBe(true))

    expect(result.current.categories.data).toHaveLength(2)
    expect(getAllCategories).toHaveBeenCalledTimes(1)
  })

  it('crea una categoría e invalida la cache', async () => {
    getAllCategories.mockResolvedValue([])
    createCategory.mockResolvedValue({ id: '3', name: 'Pantalones' })

    const { wrapper, queryClient } = createWrapper()
    const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries')

    const { result } = renderHook(() => useCategories(), { wrapper })

    await waitFor(() => expect(result.current.categories.isSuccess).toBe(true))

    await act(async () => {
      await result.current.createNewCategory.mutateAsync({
        name: 'Pantalones',
      } as any)
    })

    expect(createCategory).toHaveBeenCalledWith({ name: 'Pantalones' })
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['categories'] })
  })

  it('actualiza una categoría e invalida la cache', async () => {
    getAllCategories.mockResolvedValue([])
    updateOldCategory.mockResolvedValue({ id: '1', name: 'Abrigos' })

    const { wrapper, queryClient } = createWrapper()
    const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries')

    const { result } = renderHook(() => useCategories(), { wrapper })

    await waitFor(() => expect(result.current.categories.isSuccess).toBe(true))

    await act(async () => {
      await result.current.updateCategory.mutateAsync({
        id: '1',
        category: { name: 'Abrigos' } as any,
      })
    })

    expect(updateOldCategory).toHaveBeenCalledWith('1', { name: 'Abrigos' })
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['categories'] })
  })

  it('elimina una categoría e invalida la cache', async () => {
    getAllCategories.mockResolvedValue([])
    deleteOldCategory.mockResolvedValue({ success: true })

    const { wrapper, queryClient } = createWrapper()
    const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries')

    const { result } = renderHook(() => useCategories(), { wrapper })

    await waitFor(() => expect(result.current.categories.isSuccess).toBe(true))

    await act(async () => {
      await result.current.deleteCategory.mutateAsync('1')
    })

    expect(deleteOldCategory).toHaveBeenCalledWith('1')
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['categories'] })
  })
})
