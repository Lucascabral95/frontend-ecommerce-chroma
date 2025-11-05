import { render, screen } from '@testing-library/react'

jest.mock('@/lib/zustand/CartZustand', () => ({
  useCartStore: jest.fn(() => ({
    cart: { id: 'cart-123', items: [] },
  })),
}))

jest.mock('next/navigation', () => ({
  useParams: jest.fn(() => ({ orderid: 'order-123' })),
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}))

jest.mock('next/link', () => {
  return function Mock({ children, href }: any) {
    return <a href={href}>{children}</a>
  }
})

jest.mock('next/image', () => ({
  __esModule: true,
  default: function Mock({ src, alt }: any) {
    return <img src={src} alt={alt} />
  },
}))

jest.mock('@/production/Hooks/useSEO', () => ({
  useSEO: jest.fn(() => ({
    title: 'Pedido',
    description: 'Pedido',
  })),
}))

jest.mock('@/production/components/SEO', () => {
  return function Mock() {
    return <div data-testid="seo" />
  }
})

jest.mock('react-icons/fa', () => ({
  FaSpinner: () => <span data-testid="spinner" />,
  FaExclamationCircle: () => <span data-testid="error-icon" />,
  FaMapMarkerAlt: () => <span data-testid="map-icon" />,
}))

jest.mock('@/lib/OrdersApi', () => ({
  getOrderById: jest.fn(async () => ({
    id: 'order-123',
    number: 12345,
    status: 'PAID',
    createdAt: '2025-11-03',
    subtotal: 1500,
    shipping: 200,
    total: 1700,
    items: [
      {
        id: 'item-1',
        productName: 'Remera Premium',
        size: 'M',
        colorName: 'Negro',
        sku: 'REM-001',
        unitPrice: 1500,
        quantity: 1,
        variant: {
          product: {
            id: 'prod-123',
            images: [{ url: '/img/remera.jpg' }],
          },
        },
      },
    ],
    shippingAddress: {
      street: 'Calle Principal 123',
      city: 'Buenos Aires',
      state: 'Buenos Aires',
      postalCode: 'B1636',
      country: 'Argentina',
    },
  })),
}))

import OrderById from './page'

describe('OrderById (básico)', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renderiza sin crashear', () => {
    const { container } = render(<OrderById />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renderiza los detalles del pedido', async () => {
    render(<OrderById />)
    
    const orderNumber = await screen.findByText('#12345')
    expect(orderNumber).toBeInTheDocument()
  })

  it('renderiza los productos del pedido', async () => {
    render(<OrderById />)
    
    const productName = await screen.findByText('Remera Premium')
    expect(productName).toBeInTheDocument()
  })
})

afterEach(() => {
  jest.clearAllMocks()
})
