import { render, screen } from '@testing-library/react'
import { CartByIdInterface } from '@/Insfraestructure/Interfaces/Carts/Carts.interface'
import CheckoutCart from './CheckoutCart'

jest.mock('next/link', () => {
  return function Mock({ children, href, className }: any) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    )
  }
})

jest.mock('next/image', () => ({
  __esModule: true,
  default: function Mock({ src, alt, ...props }: any) {
    return <img src={src} alt={alt} {...props} />
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

describe('CheckoutCart (básico)', () => {
  it('renderiza la tabla con los encabezados esperados', () => {
    const cartMock = createCartMock()
    render(<CheckoutCart cart={cartMock} />)

    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByText('Producto')).toBeInTheDocument()
    expect(screen.getByText('Precio')).toBeInTheDocument()
    expect(screen.getByText('Cantidad')).toBeInTheDocument()
    expect(screen.getByText('Subtotal')).toBeInTheDocument()
  })

  it('muestra la información principal del producto', () => {
    const cartMock = createCartMock()
    const { container } = render(<CheckoutCart cart={cartMock} />)

    const titleLink = container.querySelector('.title-size-link')
    expect(titleLink?.textContent?.trim()).toBe('Chaqueta Unisex')

    const sizeText = container.querySelector('.title-size p')
    expect(sizeText?.textContent?.replace(/\s+/g, ' ').trim()).toBe('Talle: M')

    const quantityText = container.querySelector('.td-quantity p')
    expect(quantityText?.textContent?.trim()).toBe('2')
  })

  it('calcula correctamente el subtotal y respeta el ancho personalizado', () => {
    const cartMock = createCartMock()
    const { container } = render(<CheckoutCart cart={cartMock} width="80%" />)

    const desktopSubtotalCell = Array.from(
      container.querySelectorAll('td.table-of-desktop')
    ).find((cell) => cell.textContent?.trim() === '546')
    expect(desktopSubtotalCell).toBeTruthy()

    const mobileSubtotal = container.querySelector(
      '.table-mobile .container-third .text p'
    )
    expect(mobileSubtotal?.textContent?.replace(/\s+/g, '')).toBe('$546')

    const wrapper = container.querySelector('.cart-cart') as HTMLDivElement | null
    expect(wrapper?.style.width).toBe('80%')
  })
})
