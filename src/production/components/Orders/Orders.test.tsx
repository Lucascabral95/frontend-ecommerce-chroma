import { render, screen } from '@testing-library/react'
import Orders from './Orders'
import {
  OrderStatus,
  type GetOrdersByUserIdInterface,
} from '@/Insfraestructure/Interfaces/Orders/Orders'

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

jest.mock('next/image', () => ({
  __esModule: true,
  default: function Mock({ src, alt, ...props }: any) {
    return <img src={src} alt={alt} {...props} />
  },
}))

const baseItem = (
  overrides?: Partial<GetOrdersByUserIdInterface['items'][number]>
) => ({
  id: 'item-1',
  orderId: 'order-1',
  variantId: 'variant-1',
  quantity: 1,
  unitPrice: 1000,
  productName: 'Chaqueta',
  sku: 'SKU-1',
  size: 'M' as GetOrdersByUserIdInterface['items'][number]['size'],
  colorName: 'Azul',
  createdAt: '2024-01-01T00:00:00.000Z',
  variant: {
    product: {
      id: 'product-1',
      images: [{ url: '/img/product-1.webp' }],
    },
  },
  ...overrides,
})

const createOrder = (
  overrides?: Partial<GetOrdersByUserIdInterface>
): GetOrdersByUserIdInterface => ({
  id: 'order-1',
  number: 1234,
  userId: 'user-1',
  status: OrderStatus.PAID,
  currency: 'ARS' as GetOrdersByUserIdInterface['currency'],
  subtotal: 1000,
  shipping: 0,
  tax: 0,
  discount: 0,
  total: 1000,
  shippingAddress: {
    street: 'Calle 123',
    city: 'Buenos Aires',
    state: 'BA',
    postalCode: '1000',
    country: 'AR',
    contactName: 'Juan Perez',
    phone: '555-1234',
    taxId: '20123456789',
  },
  billingAddress: {
    street: 'Calle 123',
    city: 'Buenos Aires',
    state: 'BA',
    postalCode: '1000',
    country: 'AR',
    contactName: 'Juan Perez',
  },
  mpPreferenceId: 'pref-1',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  items: [baseItem()],
  ...overrides,
})

describe('Orders (básico)', () => {
  it('muestra el estado vacío cuando no hay órdenes', () => {
    render(<Orders orders={[]} />)

    expect(
      screen.getByText('No tienes pedidos todavía', { exact: false })
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Explorar productos/i })).toBeInTheDocument()
  })

  it('renderiza las órdenes con enlace y total formateado', () => {
    const order = createOrder()
    render(<Orders orders={[order]} />)

    const orderLink = screen.getByRole('link', { name: /Ver detalles/i })
    expect(orderLink).toHaveAttribute('href', `/orders/detail/${order.id}`)

    expect(screen.getByText(/Pedido #1234/)).toBeInTheDocument()
    expect(screen.getByText(order.status)).toBeInTheDocument()
    expect(screen.getByText(/\$\s*1\.000,00/)).toBeInTheDocument()
    expect(screen.getByAltText('Chaqueta')).toBeInTheDocument()
  })

  it('muestra el contador de items extra cuando hay más de tres productos', () => {
    const order = createOrder({
      items: Array.from({ length: 5 }, (_, i) =>
        baseItem({
          id: `item-${i}`,
          variantId: `variant-${i}`,
          productName: `Producto ${i}`,
          variant: {
            product: {
              id: `product-${i}`,
              images: [{ url: `/img/product-${i}.webp` }],
            },
          },
        })
      ),
    })

    render(<Orders orders={[order]} />)

    expect(screen.getByText('+2')).toBeInTheDocument()
  })
})
