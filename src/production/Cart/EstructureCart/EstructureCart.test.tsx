import { render, screen, fireEvent } from '@testing-library/react'
import EstructureCart from '@/production/Cart/EstructureCart/EstructureCart'

jest.mock('@/lib/zustand/CartZustand', () => ({
  useCartStore: () => ({
    cart: undefined,
    cartTotalPrice: 3500,
    incrementQuantity: jest.fn(),
    decrementQuantity: jest.fn(),
    removeItem: jest.fn(),
    checkout: jest.fn(),
    toast: { message: '', error: false },
    isLoading: false,
  }),
}))

jest.mock('@/production/Cart/EstructureCart/CartCard/CartCard', () => {
  return function MockCartCard(props: any) {
    const count = props.cartItems?.items?.length ?? 0
    return (
      <div data-testid="cart-card">
        <span>Items: {count}</span>
        <button onClick={() => props.aumentQuantity?.('id1')}>inc</button>
        <button onClick={() => props.decrementQuantity?.('id1')}>dec</button>
        <button onClick={() => props.handleRemoveItem?.('id1')}>remove</button>
      </div>
    )
  }
})

// Mock de Toast
jest.mock('@/Shared/Components/Toast', () => {
  return function MockToast({ message }: { message: string }) {
    return <div role="status">{message}</div>
  }
})

describe('EstructureCart (básico)', () => {
  const cartById = {
    id: 'c1',
    items: [
      { id: 'id1', name: 'Prod 1', price: 1000, quantity: 1 },
      { id: 'id2', name: 'Prod 2', price: 2500, quantity: 1 },
    ],
  } as any

  it('renderiza sin crashear y muestra secciones principales', () => {
    const { container } = render(<EstructureCart cartById={cartById} />)
    expect(container).toBeInTheDocument()
    expect(screen.getByText(/Resumen de compra/i)).toBeInTheDocument()
    expect(screen.getByText(/Subtotal/i)).toBeInTheDocument()
    expect(screen.getAllByText(/\$3500/i).length).toBeGreaterThan(0)
    expect(screen.getByText(/Descuento total/i)).toBeInTheDocument()
    expect(screen.getByText(/\$0/i)).toBeInTheDocument()
    expect(screen.getAllByText(/Total/i).length).toBeGreaterThan(0) // evita choque por duplicados
  })

  it('usa cartTotalPrice del store para mostrar Subtotal y Total', () => {
    render(<EstructureCart cartById={cartById} />)
    expect(screen.getAllByText('$3500').length).toBeGreaterThan(0)
  })

  it('habilita el botón INICIAR COMPRA cuando hay items y no está cargando', () => {
    render(<EstructureCart cartById={cartById} />)
    const button = screen.getByRole('button', { name: /INICIAR COMPRA/i })
    expect(button).toBeEnabled()
  })

  it('deshabilita el botón si no hay items', () => {
    const emptyCart = { id: 'c2', items: [] }
    render(<EstructureCart cartById={emptyCart as any} />)
    const button = screen.getByRole('button', { name: /INICIAR COMPRA/i })
    expect(button).toBeDisabled()
  })

  it('cambia el texto del botón a PROCESANDO... cuando isLoading es true', () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    ;(jest.mocked as any)(require('@/lib/zustand/CartZustand')).useCartStore = () => ({
      cart: undefined,
      cartTotalPrice: 3500,
      incrementQuantity: jest.fn(),
      decrementQuantity: jest.fn(),
      removeItem: jest.fn(),
      checkout: jest.fn(),
      toast: { message: '', error: false },
      isLoading: true,
    })
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const ModEstructureCart = require('@/production/Cart/EstructureCart/EstructureCart').default
    render(<ModEstructureCart cartById={cartById} />)
    expect(screen.getByRole('button', { name: /PROCESANDO/i })).toBeInTheDocument()
  })

  it('invoca checkout al hacer click en el botón', () => {
    const checkoutSpy = jest.fn()
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    ;(jest.mocked as any)(require('@/lib/zustand/CartZustand')).useCartStore = () => ({
      cart: undefined,
      cartTotalPrice: 3500,
      incrementQuantity: jest.fn(),
      decrementQuantity: jest.fn(),
      removeItem: jest.fn(),
      checkout: checkoutSpy,
      toast: { message: '', error: false },
      isLoading: false,
    })
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const ModEstructureCart = require('@/production/Cart/EstructureCart/EstructureCart').default
    render(<ModEstructureCart cartById={cartById} />)
    const button = screen.getByRole('button', { name: /INICIAR COMPRA/i })
    fireEvent.click(button)
    expect(checkoutSpy).toHaveBeenCalledTimes(1)
  })

  it('propaga acciones a CartCard: increment, decrement, remove', () => {
    const inc = jest.fn()
    const dec = jest.fn()
    const rm = jest.fn()
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    ;(jest.mocked as any)(require('@/lib/zustand/CartZustand')).useCartStore = () => ({
      cart: undefined,
      cartTotalPrice: 3500,
      incrementQuantity: inc,
      decrementQuantity: dec,
      removeItem: rm,
      checkout: jest.fn(),
      toast: { message: '', error: false },
      isLoading: false,
    })
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const ModEstructureCart = require('@/production/Cart/EstructureCart/EstructureCart').default
    render(<ModEstructureCart cartById={cartById} />)
    fireEvent.click(screen.getByText('inc'))
    fireEvent.click(screen.getByText('dec'))
    fireEvent.click(screen.getByText('remove'))
    expect(inc).toHaveBeenCalledWith('id1')
    expect(dec).toHaveBeenCalledWith('id1')
    expect(rm).toHaveBeenCalledWith('id1')
  })

  it('muestra Toast cuando hay mensaje en el store', () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    ;(jest.mocked as any)(require('@/lib/zustand/CartZustand')).useCartStore = () => ({
      cart: undefined,
      cartTotalPrice: 3500,
      incrementQuantity: jest.fn(),
      decrementQuantity: jest.fn(),
      removeItem: jest.fn(),
      checkout: jest.fn(),
      toast: { message: 'Error al pagar', error: true },
      isLoading: false,
    })
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const ModEstructureCart = require('@/production/Cart/EstructureCart/EstructureCart').default
    render(<ModEstructureCart cartById={cartById} />)
    expect(screen.getByRole('status')).toHaveTextContent('Error al pagar')
  })
})
