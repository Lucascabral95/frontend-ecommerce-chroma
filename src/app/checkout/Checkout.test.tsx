import { render, screen } from '@testing-library/react'

// ===== MOCKS BÁSICOS =====
jest.mock('@/lib/zustand/AuthZustand', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    userDataSession: { id: 'user-123', email: 'test@example.com' },
  })),
}))

jest.mock('@/lib/zustand/CartZustand', () => ({
  useCartStore: jest.fn(() => ({
    cart: { 
      id: 'cart-123', 
      userId: 'user-123',
      items: [{ id: 'item-1', quantity: 1 }] 
    },
  })),
}))

jest.mock('@/production/Hooks/useSEO', () => ({
  useSEO: jest.fn(() => ({ title: 'Test', description: 'Test' })),
}))

jest.mock('@/production/components/SEO', () => {
  return function Mock() {
    return <div data-testid="seo" />
  }
})

jest.mock('@/Shared/Components/Toast', () => {
  return function Mock({ message }: any) {
    return message ? <div data-testid="toast">{message}</div> : null
  }
})

jest.mock('@/production/ProductById/ProductByIdError', () => {
  return function Mock({ title }: any) {
    return <div data-testid="error">{title}</div>
  }
})

// ===== MOCKEAR DetailCheckoutCart =====
jest.mock('@/production/components/Checkout/DetailCheckoutCart/DetailCheckoutCart', () => {
  return function Mock() {
    return <div data-testid="detail-checkout">Detalles</div>
  }
})

jest.mock('@/lib/OrdersApi', () => ({
  createOrder: jest.fn(),
}))

import Component from './page'

describe('Component (básico)', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renderiza sin crashear', () => {
    const { container } = render(<Component />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renderiza el formulario de checkout', () => {
    render(<Component />)
    expect(screen.getByText(/Dirección de envío/i)).toBeInTheDocument()
  })

  it('muestra carrito vacío cuando no hay items', () => {
    const useCartStore = require('@/lib/zustand/CartZustand').useCartStore
    useCartStore.mockReturnValue({
      cart: { id: 'cart-123', items: [] },
    })

    render(<Component />)
    expect(screen.getByText('Carrito vacío')).toBeInTheDocument()
  })
})

afterEach(() => {
  jest.clearAllMocks()
})
