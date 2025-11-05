import { render, screen } from '@testing-library/react'
import SectionOfferts, { Product } from './SectionOfferts'

// Mock SectionStructure
jest.mock('@/production/Section/SectionStructure', () => {
  return function MockSectionStructure({ children }: { children: React.ReactNode }) {
    return <div data-testid="section-structure">{children}</div>
  }
})

jest.mock('@/production/components/CardProduct/CardProduct', () => {
  return function MockCardProduct({ products }: { products: Product[] }) {
    return (
      <div data-testid="card-product">
        <span data-testid="product-count">{products.length}</span>
        {products.map((p) => (
          <div key={p.id} data-testid={`product-${p.id}`}>
            {p.title} - ${p.price}
          </div>
        ))}
      </div>
    )
  }
})

describe('SectionOfferts (básico)', () => {
  const productsMock: Product[] = [
    { id: 'p1', title: 'Remera', url: '/products/p1', price: 1200 },
    { id: 'p2', title: 'Zapatillas', url: '/products/p2', price: 3500 },
    { id: 'p3', title: 'Pantalón', url: '/products/p3', price: 2800 },
  ]

  it('renderiza sin crashear', () => {
    const { container } = render(<SectionOfferts products={productsMock} />)
    expect(container).toBeInTheDocument()
  })

  it('renderiza SectionStructure y CardProduct', () => {
    render(<SectionOfferts products={productsMock} />)
    expect(screen.getByTestId('section-structure')).toBeInTheDocument()
    expect(screen.getByTestId('card-product')).toBeInTheDocument()
  })

  it('pasa el array de productos a CardProduct correctamente', () => {
    render(<SectionOfferts products={productsMock} />)
    expect(screen.getByTestId('product-count')).toHaveTextContent('3')
    expect(screen.getByTestId('product-p1')).toHaveTextContent('Remera - $1200')
    expect(screen.getByTestId('product-p2')).toHaveTextContent('Zapatillas - $3500')
    expect(screen.getByTestId('product-p3')).toHaveTextContent('Pantalón - $2800')
  })

  it('maneja array vacío sin romper', () => {
    render(<SectionOfferts products={[]} />)
    expect(screen.getByTestId('section-structure')).toBeInTheDocument()
    expect(screen.getByTestId('card-product')).toBeInTheDocument()
    expect(screen.getByTestId('product-count')).toHaveTextContent('0')
  })
})
