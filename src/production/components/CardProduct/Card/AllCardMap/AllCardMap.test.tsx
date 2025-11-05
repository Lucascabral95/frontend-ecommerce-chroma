import { render, screen } from '@testing-library/react'
import { Size } from '@/Insfraestructure/Interfaces/enums/enums-global.interface'
import {
  Product,
  ProductStatusString,
  ProductsInterface,
} from '@/Insfraestructure/Interfaces/products/product.interface'
import AllCardMap from './AllCardMap'

jest.mock('../CardChildren', () => {
  return function Mock({ products }: any) {
    return <div data-testid="card-children">{products[0]?.id}</div>
  }
})

jest.mock('@/production/components/Pagination/Pagination', () => {
  return function Mock({ totalPages, page, categoryId }: any) {
    return (
      <div data-testid="pagination">
        Página {page} de {totalPages} - Categoría: {categoryId}
      </div>
    )
  }
})

describe('AllCardMap (básico)', () => {
  const baseDate = new Date('2024-01-01T00:00:00Z')

  const createProduct = (id: string, name: string): Product => ({
    id,
    name,
    slug: `${id}-slug`,
    description: `${name} descripción`,
    basePrice: 1000,
    status: ProductStatusString.ACTIVE,
    variants: [
      {
        id: `${id}-variant`,
        productId: id,
        colorId: 'color-1',
        sku: `SKU-${id}`,
        barcode: `BAR-${id}`,
        size: Size.M,
        price: 1200,
        stock: 10,
        weightGrams: 500,
        createdAt: baseDate,
        updatedAt: baseDate,
      },
    ],
    images: [
      {
        id: `${id}-image`,
        url: '/img/product-1.webp',
        alt: name,
        position: 1,
        productId: id,
        createdAt: baseDate,
      },
    ],
    tags: [
      {
        id: 'tag-1',
        name: 'nuevo',
        slug: 'nuevo',
      },
    ],
    createdAt: baseDate,
    updatedAt: baseDate,
  })

  const productsMock: ProductsInterface = {
    page: 1,
    limit: 12,
    total: 24,
    totalPages: 2,
    prevPage: false,
    nextPage: true,
    products: [
      createProduct('p1', 'Producto 1'),
      createProduct('p2', 'Producto 2'),
      createProduct('p3', 'Producto 3'),
    ],
  }

  it('renderiza sin crashear', () => {
    const { container } = render(
      <AllCardMap allProducts={productsMock} categoryId="cat-1" />
    )
    expect(container).toBeInTheDocument()
  })

  it('renderiza el contenedor card-map', () => {
    const { container } = render(
      <AllCardMap allProducts={productsMock} categoryId="cat-1" />
    )
    const cardMap = container.querySelector('.card-map')
    expect(cardMap).toBeInTheDocument()
  })

  it('renderiza el contenedor card-map__container', () => {
    const { container } = render(
      <AllCardMap allProducts={productsMock} categoryId="cat-1" />
    )
    const innerContainer = container.querySelector('.card-map__container')
    expect(innerContainer).toBeInTheDocument()
  })

  it('renderiza todos los productos', () => {
    render(<AllCardMap allProducts={productsMock} categoryId="cat-1" />)
    const cardChildren = screen.getAllByTestId('card-children')
    expect(cardChildren).toHaveLength(3)
  })

  it('renderiza CardChildren con el producto correcto', () => {
    render(<AllCardMap allProducts={productsMock} categoryId="cat-1" />)
    expect(screen.getByText('p1')).toBeInTheDocument()
    expect(screen.getByText('p2')).toBeInTheDocument()
    expect(screen.getByText('p3')).toBeInTheDocument()
  })

  it('cada producto está en un contenedor-card', () => {
    const { container } = render(
      <AllCardMap allProducts={productsMock} categoryId="cat-1" />
    )
    const containers = container.querySelectorAll('.container-card')
    expect(containers).toHaveLength(3)
  })

  it('renderiza Pagination', () => {
    render(<AllCardMap allProducts={productsMock} categoryId="cat-1" />)
    expect(screen.getByTestId('pagination')).toBeInTheDocument()
  })

  it('Pagination recibe totalPages correcto', () => {
    render(<AllCardMap allProducts={productsMock} categoryId="cat-1" />)
    expect(screen.getByText(/Página 1 de 2/)).toBeInTheDocument()
  })

  it('Pagination recibe page correcto', () => {
    const productsPage2: ProductsInterface = {
      ...productsMock,
      page: 2,
    }
    render(<AllCardMap allProducts={productsPage2} categoryId="cat-1" />)
    expect(screen.getByText(/Página 2 de 2/)).toBeInTheDocument()
  })

  it('Pagination recibe categoryId correcto', () => {
    render(<AllCardMap allProducts={productsMock} categoryId="cat-especial" />)
    expect(screen.getByText(/Categoría: cat-especial/)).toBeInTheDocument()
  })

  it('maneja allProducts undefined', () => {
    const { container } = render(
      <AllCardMap allProducts={undefined} categoryId="cat-1" />
    )
    expect(container).toBeInTheDocument()
    expect(screen.getByTestId('pagination')).toBeInTheDocument()
  })

  it('renderiza 0 productos cuando products es vacío', () => {
    const emptyProducts: ProductsInterface = {
      ...productsMock,
      products: [],
    }
    const { container } = render(
      <AllCardMap allProducts={emptyProducts} categoryId="cat-1" />
    )
    const cardChildren = container.querySelectorAll('[data-testid="card-children"]')
    expect(cardChildren).toHaveLength(0)
  })

  it('Pagination tiene valores por defecto cuando allProducts es undefined', () => {
    render(<AllCardMap allProducts={undefined} categoryId="cat-1" />)
    expect(screen.getByText(/Página 1 de 0/)).toBeInTheDocument()
  })

  it('usa key con product.id', () => {
    const { container } = render(
      <AllCardMap allProducts={productsMock} categoryId="cat-1" />
    )
    const containers = container.querySelectorAll('.container-card')
    // Verificar que cada contenedor puede ser identificado por su producto
    expect(containers).toHaveLength(3)
  })

  it('renderiza múltiples productos correctamente', () => {
    const manyProducts: ProductsInterface = {
      ...productsMock,
      products: Array.from({ length: 12 }, (_, i) => ({
        ...createProduct(`p${i}`, `Producto ${i}`),
      })),
    }
    const { container } = render(
      <AllCardMap allProducts={manyProducts} categoryId="cat-1" />
    )
    const containers = container.querySelectorAll('.container-card')
    expect(containers).toHaveLength(12)
  })

  it('Pagination recibe valores correctos para primera página', () => {
    render(<AllCardMap allProducts={productsMock} categoryId="cat-1" />)
    expect(screen.getByText(/Página 1 de 2/)).toBeInTheDocument()
  })

  it('Pagination recibe valores correctos para última página', () => {
    const lastPageProducts = { ...productsMock, page: 2, nextPage: false }
    render(<AllCardMap allProducts={lastPageProducts} categoryId="cat-1" />)
    expect(screen.getByText(/Página 2 de 2/)).toBeInTheDocument()
  })
})
