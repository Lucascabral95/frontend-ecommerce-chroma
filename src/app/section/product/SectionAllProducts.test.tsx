import { render, screen } from '@testing-library/react'
import SectionAllProducts from './page'

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => new URLSearchParams('brand=nike&color=blue')),
}))

jest.mock('next/link', () => {
  return function Mock({ children, href, className }: any) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    )
  }
})

jest.mock('@/production/Section/SectionStructure', () => {
  return function Mock({ children }: any) {
    return <div data-testid="section-structure">{children}</div>
  }
})

jest.mock('@/production/components/SEO', () => {
  return function Mock() {
    return <div data-testid="seo-component" />
  }
})

jest.mock('@/production/Hooks/useSEO', () => ({
  useSEO: jest.fn(() => ({
    title: 'Todos los productos',
    description: 'Descripción',
    path: '/section/product/all',
  })),
}))

jest.mock('@/production/FilterProducts/BodyFilterProducts/BodyFilterProducts', () => {
  return function Mock({ id, params }: any) {
    return <div data-testid="body-filter-products">Filter: {id}</div>
  }
})

describe('SectionAllProducts (básico)', () => {
  it('renderiza sin crashear', () => {
    const { container } = render(<SectionAllProducts />)
    expect(container).toBeInTheDocument()
  })

  it('renderiza SectionStructure', () => {
    render(<SectionAllProducts />)
    expect(screen.getByTestId('section-structure')).toBeInTheDocument()
  })

  it('renderiza el componente SEO', async () => {
    render(<SectionAllProducts />)
    const seo = await screen.findByTestId('seo-component')
    expect(seo).toBeInTheDocument()
  })

  it('renderiza el breadcrumb Home', async () => {
    render(<SectionAllProducts />)
    const homeLink = await screen.findByRole('link', { name: /Home/i })
    expect(homeLink).toBeInTheDocument()
  })

  it('el link Home apunta a /', async () => {
    render(<SectionAllProducts />)
    const homeLink = await screen.findByRole('link', { name: /Home/i })
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('renderiza el separador de breadcrumb', async () => {
    render(<SectionAllProducts />)
    expect(await screen.findByText('/')).toBeInTheDocument()
  })

  it('renderiza el breadcrumb TODOS', async () => {
    render(<SectionAllProducts />)
    const allLink = await screen.findByRole('link', { name: /TODOS/i })
    expect(allLink).toBeInTheDocument()
  })

  it('el link TODOS apunta a la URL correcta', async () => {
    render(<SectionAllProducts />)
    const allLink = await screen.findByRole('link', { name: /TODOS/i })
    expect(allLink).toHaveAttribute('href', '/section/product/all')
  })

  it('renderiza BodyFilterProducts', async () => {
    render(<SectionAllProducts />)
    const bodyFilter = await screen.findByTestId('body-filter-products')
    expect(bodyFilter).toBeInTheDocument()
  })

  it('BodyFilterProducts recibe el id "all"', async () => {
    render(<SectionAllProducts />)
    expect(await screen.findByText(/Filter: all/)).toBeInTheDocument()
  })

  it('useSearchParams es llamado', () => {
    const { useSearchParams } = require('next/navigation')
    render(<SectionAllProducts />)
    expect(useSearchParams).toHaveBeenCalled()
  })

  it('useSEO es llamado con parámetros correctos', () => {
    const { useSEO } = require('@/production/Hooks/useSEO')
    render(<SectionAllProducts />)

    expect(useSEO).toHaveBeenCalledWith(
      expect.objectContaining({
        path: '/section/product/all',
        type: 'website',
      })
    )
  })

  it('renderiza el contenedor product-by-category', async () => {
    const { container } = render(<SectionAllProducts />)
    const productByCategory = container.querySelector('.product-by-category')
    expect(productByCategory).toBeInTheDocument()
  })

  it('renderiza el contenedor product-by-category__container', async () => {
    const { container } = render(<SectionAllProducts />)
    const innerContainer = container.querySelector(
      '.product-by-category__container'
    )
    expect(innerContainer).toBeInTheDocument()
  })

  it('renderiza sections-index con breadcrumb', async () => {
    const { container } = render(<SectionAllProducts />)
    const sectionsIndex = container.querySelector('.sections-index')
    expect(sectionsIndex).toBeInTheDocument()
  })

  it('renderiza con parámetros de búsqueda', () => {
    const { useSearchParams } = require('next/navigation')
    useSearchParams.mockReturnValue(new URLSearchParams('page=1&sort=price'))

    render(<SectionAllProducts />)

    useSearchParams.mockReturnValue(new URLSearchParams('brand=nike&color=blue'))
  })

  it('muestra fallback de carga inicialmente', () => {
    render(<SectionAllProducts />)
    expect(screen.getByTestId('section-structure')).toBeInTheDocument()
  })

  it('renderiza todos los elementos principales', async () => {
    render(<SectionAllProducts />)
    expect(screen.getByTestId('section-structure')).toBeInTheDocument()
    expect(await screen.findByTestId('seo-component')).toBeInTheDocument()
    expect(await screen.findByRole('link', { name: /Home/i })).toBeInTheDocument()
    expect(await screen.findByRole('link', { name: /TODOS/i })).toBeInTheDocument()
    expect(await screen.findByTestId('body-filter-products')).toBeInTheDocument()
  })
})

afterEach(() => {
  jest.clearAllMocks()
  const { useSearchParams } = require('next/navigation')
  useSearchParams.mockReturnValue(new URLSearchParams('brand=nike&color=blue'))
})
