import { render, screen, fireEvent } from '@testing-library/react'
import BodyFilterProducts from './BodyFilterProducts'

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}))

jest.mock('@/production/Hooks/useProducts', () => {
  return function Mock() {
    return {
      products: {
        data: {
          items: [
            { id: 'p1', name: 'Producto 1', basePrice: 1200 },
            { id: 'p2', name: 'Producto 2', basePrice: 2500 },
          ],
          total: 2,
        },
      },
    }
  }
})

jest.mock('@/production/components/CardProduct/Card/AllCardMap/AllCardMap', () => {
  return function Mock() {
    return <div data-testid="all-card-map">AllCardMap</div>
  }
})

jest.mock('@/production/components/FilterProducts/FilterProducts', () => {
  return function Mock() {
    return <div data-testid="filter-products">FilterProducts</div>
  }
})

jest.mock('@/production/ProductById/ProductByIdError', () => {
  return function Mock() {
    return <div data-testid="error">Error</div>
  }
})

describe('BodyFilterProducts (básico)', () => {
  it('renderiza sin crashear', () => {
    const { container } = render(<BodyFilterProducts id="all" />)
    expect(container).toBeInTheDocument()
  })

  it('muestra el botón de FILTRAR', () => {
    render(<BodyFilterProducts id="all" />)
    expect(screen.getByText(/FILTRAR/i)).toBeInTheDocument()
  })

  it('muestra el select de ordenamiento', () => {
    render(<BodyFilterProducts id="all" />)
    const select = document.querySelector('select.order')
    expect(select).toBeInTheDocument()
  })

  it('abre FilterProducts cuando se clickea el botón FILTRAR', () => {
    render(<BodyFilterProducts id="all" />)
    const filterBtn = screen.getByText(/FILTRAR/i).closest('button')
    
    fireEvent.click(filterBtn as HTMLElement)
    expect(screen.getByTestId('filter-products')).toBeInTheDocument()
  })

  it('renderiza AllCardMap cuando hay productos', () => {
    render(<BodyFilterProducts id="all" />)
    expect(screen.getByTestId('all-card-map')).toBeInTheDocument()
  })

  it('tiene opciones de ordenamiento en el select', () => {
    render(<BodyFilterProducts id="all" />)
    const options = document.querySelectorAll('select.order option')
    expect(options.length).toBeGreaterThanOrEqual(5)
  })
})
