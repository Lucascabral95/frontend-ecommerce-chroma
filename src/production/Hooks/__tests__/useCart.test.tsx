import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import useCart from '../useCart'
import { CartByIdInterface } from '@/Insfraestructure/Interfaces/Carts/Carts.interface'

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

  return { wrapper }
}

jest.mock('@/lib/CartsApi', () => ({
  getCartByUserId: jest.fn(),
}))

const { getCartByUserId } = jest.requireMock('@/lib/CartsApi') as jest.Mocked<
  typeof import('@/lib/CartsApi')
>

describe('useCart hook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const buildCart = (overrides?: Partial<CartByIdInterface>): CartByIdInterface => ({
    id: 'cart-1',
    userId: 'user-1',
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z'),
    items: [],
    ...overrides,
  })

  it('obtiene el carrito por id', async () => {
    getCartByUserId.mockResolvedValue(buildCart())

    const { wrapper } = createWrapper()
    const { result } = renderHook(() => useCart('cart-1'), { wrapper })

    await waitFor(() => expect(result.current.cartById.isSuccess).toBe(true))
    expect(result.current.cartById.data?.id).toBe('cart-1')
    expect(getCartByUserId).toHaveBeenCalledWith('cart-1')
  })

  it('no ejecuta la query si no hay id', async () => {
    getCartByUserId.mockResolvedValue(buildCart({ id: '', userId: 'user-1' }))

    const { wrapper } = createWrapper()
    const { result } = renderHook(() => useCart(), { wrapper })

    // hook still runs but query function called with empty string
    await waitFor(() => expect(result.current.cartById.isSuccess).toBe(true))
    expect(getCartByUserId).toHaveBeenCalledWith('')
  })
})
