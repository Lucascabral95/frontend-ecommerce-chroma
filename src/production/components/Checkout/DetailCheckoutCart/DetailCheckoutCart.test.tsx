import { render, screen } from '@testing-library/react'
import { CartByIdInterface } from '@/Insfraestructure/Interfaces/Carts/Carts.interface'
import DetailCheckoutCart from './DetailCheckoutCart'

const checkoutCartRenderSpy = jest.fn()

jest.mock('../CheckoutCart/CheckoutCart', () => ({
  __esModule: true,
  default: (props: any) => {
    checkoutCartRenderSpy(props)
    return <div data-testid="checkout-cart-mock">CheckoutCart Mock</div>
  },
}))

const baseDate = new Date('2024-01-01T00:00:00Z')

const createCartMock = (): CartByIdInterface => ({
  id: 'cart-1',
  userId: 'user-1',
  createdAt: baseDate,
  updatedAt: baseDate,
  items: [
    {
      id: 'item-1',
      cartId: 'cart-1',
      variantId: 'variant-1',
      quantity: 2,
      unitPriceSnap: 273,
      createdAt: baseDate,
      updatedAt: baseDate,
      variant: {
        id: 'variant-1',
        productId: 'product-1',
        colorId: 'color-1',
        sku: 'SKU-1',
        barcode: 'BAR-1',
        size: 'M',
        price: 273,
        stock: 10,
        weightGrams: 500,
        createdAt: baseDate,
        updatedAt: baseDate,
        product: {
          id: 'product-1',
          name: 'Chaqueta Unisex',
          slug: 'chaqueta-unisex',
          description: 'Chaqueta liviana para todo el año',
          brandId: 'brand-1',
          categoryId: 'category-1',
          basePrice: 300,
          status: 'ACTIVE',
          createdAt: baseDate,
          updatedAt: baseDate,
          images: [
            {
              id: 'image-1',
              url: '/img/product-1.webp',
              alt: 'Chaqueta Unisex',
              position: 1,
              productId: 'product-1',
              variantId: 'variant-1',
              createdAt: baseDate,
            },
          ],
        },
      },
    },
  ],
})

describe('DetailCheckoutCart (básico)', () => {
  beforeEach(() => {
    checkoutCartRenderSpy.mockClear()
  })

  it('renderiza el encabezado y la sección de resumen', () => {
    const cartMock = createCartMock()
    render(<DetailCheckoutCart cart={cartMock} />)

    expect(screen.getByText(/Detalles de la compra/i)).toBeInTheDocument()
    expect(screen.getByText(/Resumen de la compra/i)).toBeInTheDocument()
    expect(screen.getByTestId('checkout-cart-mock')).toBeInTheDocument()
  })

  it('calcula y muestra subtotal y total correctamente', () => {
    const cartMock = createCartMock()
    const { container } = render(<DetailCheckoutCart cart={cartMock} />)

    const subtotalValue = container.querySelectorAll('.div-text .text-first')[1]
    expect(subtotalValue).toHaveTextContent('$546')

    const totalValue = container.querySelector('.div-text-buy .text-first:nth-child(2)')
    expect(totalValue).toHaveTextContent('$546')
  })

  it('pasa el carrito y el ancho esperado al CheckoutCart interno', () => {
    const cartMock = createCartMock()
    render(<DetailCheckoutCart cart={cartMock} />)

    expect(checkoutCartRenderSpy).toHaveBeenCalledWith(
      expect.objectContaining({ cart: cartMock, width: '100%' })
    )
  })
})
