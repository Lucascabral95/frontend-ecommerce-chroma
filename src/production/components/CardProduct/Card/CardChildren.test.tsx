import { render, screen } from '@testing-library/react'
import { Size } from '@/Insfraestructure/Interfaces/enums/enums-global.interface'
import {
  Product,
  ProductStatusString,
} from '@/Insfraestructure/Interfaces/products/product.interface'
import CardChildren from './CardChildren'

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

describe('CardChildren (básico)', () => {
  const baseDate = new Date('2024-01-01T00:00:00Z')

  const baseVariant = {
    id: 'v1',
    productId: 'p1',
    colorId: 'c1',
    sku: 'SKU123',
    barcode: '123456789',
    size: Size.M,
    price: 1200,
    stock: 10,
    weightGrams: 500,
    createdAt: baseDate,
    updatedAt: baseDate,
  }

  const baseImage = {
    id: 'img1',
    url: '/img/product-1.webp',
    alt: 'Producto Premium',
    position: 1,
    productId: 'p1',
    createdAt: baseDate,
  }

  const baseProduct: Product = {
    id: 'p1',
    name: 'Producto Premium',
    slug: 'producto-premium',
    description: 'Descripción del producto premium',
    basePrice: 1000,
    status: ProductStatusString.ACTIVE,
    variants: [baseVariant],
    images: [baseImage],
    tags: [
      {
        id: 't1',
        name: 'nuevo',
        slug: 'nuevo',
      },
    ],
    createdAt: baseDate,
    updatedAt: baseDate,
  }

  const productsMock: Product[] = [baseProduct]

  const productsWithoutImage: Product[] = [
    {
      ...baseProduct,
      id: 'p2',
      name: 'Producto Sin Imagen',
      slug: 'producto-sin-imagen',
      images: [],
      variants: [
        {
          ...baseVariant,
          id: 'v2',
          productId: 'p2',
        },
      ],
      tags: [
        {
          id: 't2',
          name: 'oferta',
          slug: 'oferta',
        },
      ],
    },
  ]

  it('renderiza sin crashear', () => {
    const { container } = render(<CardChildren products={productsMock} />)
    expect(container).toBeInTheDocument()
  })

  it('renderiza el contenedor image-card-contenedor', () => {
    const { container } = render(<CardChildren products={productsMock} />)
    const contenedor = container.querySelector('.image-card-contenedor')
    expect(contenedor).toBeInTheDocument()
  })

  it('renderiza el contenedor image-card', () => {
    const { container } = render(<CardChildren products={productsMock} />)
    const imageCard = container.querySelector('.image-card')
    expect(imageCard).toBeInTheDocument()
  })

  it('renderiza la imagen con URL correcta', () => {
    render(<CardChildren products={productsMock} />)
    const img = screen.getByAltText('Producto Premium')
    expect(img).toHaveAttribute('src', '/img/product-1.webp')
  })

  it('renderiza la imagen con fallback cuando no tiene URL', () => {
    render(<CardChildren products={productsWithoutImage} />)
    const img = screen.getByAltText('Producto Sin Imagen')
    expect(img).toHaveAttribute('src', '/img/oferta-1.webp')
  })

  it('renderiza el nombre del producto', () => {
    render(<CardChildren products={productsMock} />)
    expect(screen.getByText('Producto Premium')).toBeInTheDocument()
  })

  it('renderiza el precio correctamente', () => {
    render(<CardChildren products={productsMock} />)
    expect(screen.getByText('$ 1200')).toBeInTheDocument()
  })

  it('calcula correctamente las 3 cuotas sin interés', () => {
    render(<CardChildren products={productsMock} />)
    expect(screen.getByText('3 cuotas sin interés de $400.00')).toBeInTheDocument()
  })

  it('renderiza los links con href correcto', () => {
    const { container } = render(<CardChildren products={productsMock} />)
    const links = container.querySelectorAll('a')
    expect(links[0]).toHaveAttribute('href', '/product/p1')
    expect(links[1]).toHaveAttribute('href', '/product/p1')
  })

  it('el link de imagen tiene clase link-image', () => {
    const { container } = render(<CardChildren products={productsMock} />)
    const imageLink = container.querySelector('.link-image')
    expect(imageLink).toBeInTheDocument()
  })

  it('el link de título tiene clase title-card', () => {
    const { container } = render(<CardChildren products={productsMock} />)
    const titleLink = container.querySelector('.title-card')
    expect(titleLink).toBeInTheDocument()
  })

  it('renderiza el contenedor price-card', () => {
    const { container } = render(<CardChildren products={productsMock} />)
    const priceCard = container.querySelector('.price-card')
    expect(priceCard).toBeInTheDocument()
  })

  it('renderiza el contenedor price-in-quotes-card', () => {
    const { container } = render(<CardChildren products={productsMock} />)
    const quotesCard = container.querySelector('.price-in-quotes-card')
    expect(quotesCard).toBeInTheDocument()
  })

  it('la imagen tiene atributo loading="lazy"', () => {
    render(<CardChildren products={productsMock} />)
    const img = screen.getByAltText('Producto Premium')
    expect(img).toHaveAttribute('loading', 'lazy')
  })

  it('la imagen tiene quality 100', () => {
    render(<CardChildren products={productsMock} />)
    const img = screen.getByAltText('Producto Premium')
    expect(img).toHaveAttribute('quality', '100')
  })
})
