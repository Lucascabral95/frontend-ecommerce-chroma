import { render, screen, fireEvent } from '@testing-library/react'
import EstructureCartMobile from '@/production/Cart/EstructureCart/EstructureCartMobile'

// Mock next/image y next/link para entorno de test
jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line jsx-a11y/alt-text
  default: (props: any) => <img {...props} />,
}))
jest.mock('next/link', () => {
  // eslint-disable-next-line react/display-name
  return function MockLink(props: { href: string; children: React.ReactNode; className?: string }) {
    const { href, children, ...rest } = props
    return <a href={href} {...rest}>{children}</a>
  }
})

// Mocks de store y Toast
const incSpy = jest.fn()
const decSpy = jest.fn()
const rmSpy = jest.fn()
const checkoutSpy = jest.fn()

jest.mock('@/lib/zustand/CartZustand', () => ({
  useCartStore: () => ({
    cart: undefined,
    cartTotalPrice: 3500,
    incrementQuantity: incSpy,
    decrementQuantity: decSpy,
    removeItem: rmSpy,
    checkout: checkoutSpy,
    toast: { message: '', error: false },
    isLoading: false,
  }),
}))

jest.mock('@/Shared/Components/Toast', () => {
  return function MockToast({ message }: { message: string }) {
    return <div role="status">{message}</div>
  }
})

const cartByIdMock = {
  id: 'cart-1',
  items: [
    {
      id: 'item-1',
      quantity: 1,
      variant: { size: 'M', price: 1200, product: { id: 'p1', name: 'Remera', images: [{ url: '/img/p1.webp' }] } },
    },
    {
      id: 'item-2',
      quantity: 2,
      variant: { size: '42', price: 1150, product: { id: 'p2', name: 'Zapatillas', images: [{ url: '/img/p2.webp' }] } },
    },
  ],
} as any

describe('EstructureCartMobile (básico)', () => {
  beforeEach(() => {
    incSpy.mockClear()
    decSpy.mockClear()
    rmSpy.mockClear()
    checkoutSpy.mockClear()
  })

  it('muestra estado vacío cuando no hay items', () => {
    const emptyCart = { id: 'c-empty', items: [] }
    render(<EstructureCartMobile cartById={emptyCart as any} />)

    expect(screen.getByText(/No hay productos en el carrito/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Seguir comprando/i })).toHaveAttribute('href', '/')
  })

  it('renderiza items, subtotales y total cuando hay productos', () => {
    render(<EstructureCartMobile cartById={cartByIdMock} />)

    expect(screen.getByText('Remera')).toBeInTheDocument()
    expect(screen.getByText('Zapatillas')).toBeInTheDocument()
    expect(screen.getAllByText(/Subtotal/i).length).toBeGreaterThan(0)
    // Total/subtotal renderizados con 3500 del store
    expect(screen.getAllByText('$3500').length).toBeGreaterThan(0)
  })

  it('deshabilita el botón de decremento cuando quantity <= 1', () => {
    render(<EstructureCartMobile cartById={cartByIdMock} />)
    const decButtons = document.querySelectorAll('.quantity-btn')
    // Primer botón de la lista es el dec del primer item (cantidad 1)
    const firstDec = decButtons[0] as HTMLButtonElement
    expect(firstDec).toBeDisabled()
  })

  it('invoca increment y decrement con el id del item', () => {
    render(<EstructureCartMobile cartById={cartByIdMock} />)

    // Hay dos items; por cada item hay dos botones de cantidad (dec y inc)
    const quantityButtons = Array.from(document.querySelectorAll('.quantity-btn')) as HTMLButtonElement[]
    const [decFirst, incFirst, decSecond, incSecond] = quantityButtons

    fireEvent.click(incFirst)
    expect(incSpy).toHaveBeenCalledWith('item-1')

    fireEvent.click(decSecond)
    expect(decSpy).toHaveBeenCalledWith('item-2')
  })

  it('invoca removeItem con el id correcto', () => {
    render(<EstructureCartMobile cartById={cartByIdMock} />)
    const removeButtons = document.querySelectorAll('.remove-item')
    fireEvent.click(removeButtons[0] as HTMLButtonElement)
    expect(rmSpy).toHaveBeenCalledWith('item-1')
  })

  it('checkout se ejecuta al clickear el botón y respeta isLoading', () => {
    render(<EstructureCartMobile cartById={cartByIdMock} />)
    const btn = screen.getByRole('button', { name: /Iniciar compra/i })
    expect(btn).toBeEnabled()
    fireEvent.click(btn)
    expect(checkoutSpy).toHaveBeenCalledTimes(1)
  })

  it('renderiza links a producto en imagen y nombre', () => {
    render(<EstructureCartMobile cartById={cartByIdMock} />)
    const productLinks = screen.getAllByRole('link')
    expect(productLinks.some(a => (a as HTMLAnchorElement).href.includes('/product/p1'))).toBe(true)
    expect(productLinks.some(a => (a as HTMLAnchorElement).href.includes('/product/p2'))).toBe(true)
  })

  it('muestra Toast cuando hay mensaje en el store', () => {
    ;(jest.mocked as any)(require('@/lib/zustand/CartZustand')).useCartStore = () => ({
      cart: undefined,
      cartTotalPrice: 3500,
      incrementQuantity: incSpy,
      decrementQuantity: decSpy,
      removeItem: rmSpy,
      checkout: checkoutSpy,
      toast: { message: 'Algo salió mal', error: true },
      isLoading: false,
    })
    const Mod = require('@/production/Cart/EstructureCart/EstructureCartMobile').default
    render(<Mod cartById={cartByIdMock} />)
    expect(screen.getByRole('status')).toHaveTextContent('Algo salió mal')
  })
})
