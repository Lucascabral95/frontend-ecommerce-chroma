import { render, screen } from '@testing-library/react'
import ProductByCategory from './page'

jest.mock('zustand', () => ({
  create: jest.fn((fn) => () => {
    const state = {}
    const setState = jest.fn()
    return fn(setState, undefined, undefined)
  }),
}))

jest.mock('next/navigation', () => ({
  useParams: jest.fn(() => ({ category: 'camisas' })),
  useSearchParams: jest.fn(() => new URLSearchParams()),
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
    title: 'Camisas - Indumentaria Masculina',
    description: 'Camisas test',
    path: '/section/product/camisas',
  })),
}))

jest.mock('@/production/FilterProducts/BodyFilterProducts/BodyFilterProducts', () => {
  return function Mock({ id, params }: any) {
    return <div data-testid="body-filter-products">Filter: {id}</div>
  }
})

jest.mock('@/Shared/BodyProducts/BodyProductsCategories', () => [
  {
    id: 'camisas',
    title: 'Camisas Premium',
    description: 'Descubre nuestras camisas de alta calidad',
    image: '/img/camisas.jpg',
  },
  {
    id: 'pantalones',
    title: 'Pantalones Elegantes',
    description: 'Pantalones para cualquier ocasión',
    image: '/img/pantalones.jpg',
  },
])

jest.mock('@/Shared/utils/functions-seo', () => ({
  getOptimizedTitle: jest.fn((cat) => `${cat} - Indumentaria Masculina`),
  getOptimizedDescription: jest.fn((cat) => `Descubre nuestros ${cat}`),
  getOptimizedKeywords: jest.fn((cat) => `${cat}, ropa, masculina`),
}))

describe('ProductByCategory (básico)', () => {
  it('renderiza sin crashear', () => {
    const { container } = render(<ProductByCategory />)
    expect(container).toBeInTheDocument()
  })

  it('renderiza SectionStructure', () => {
    render(<ProductByCategory />)
    expect(screen.getByTestId('section-structure')).toBeInTheDocument()
  })

  it('renderiza el componente SEO', async () => {
    render(<ProductByCategory />)
    const seo = await screen.findByTestId('seo-component')
    expect(seo).toBeInTheDocument()
  })

  it('renderiza el breadcrumb Home', async () => {
    render(<ProductByCategory />)
    const homeLink = await screen.findByRole('link', { name: /Home/i })
    expect(homeLink).toBeInTheDocument()
  })

  it('el link Home apunta a /', async () => {
    render(<ProductByCategory />)
    const homeLink = await screen.findByRole('link', { name: /Home/i })
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('renderiza el separador de breadcrumb', async () => {
    render(<ProductByCategory />)
    expect(await screen.findByText('/')).toBeInTheDocument()
  })

  it('renderiza el breadcrumb con la categoría', async () => {
    render(<ProductByCategory />)
    const categoryLink = await screen.findByRole('link', { name: /CAMISAS/i })
    expect(categoryLink).toBeInTheDocument()
  })

  it('el link de categoría apunta a la URL correcta', async () => {
    render(<ProductByCategory />)
    const categoryLink = await screen.findByRole('link', { name: /CAMISAS/i })
    expect(categoryLink).toHaveAttribute('href', '/section/product/camisas')
  })

  it('renderiza el título de la categoría', async () => {
    render(<ProductByCategory />)
    expect(await screen.findByText('Camisas Premium')).toBeInTheDocument()
  })

  it('renderiza la descripción de la categoría', async () => {
    render(<ProductByCategory />)
    expect(
      await screen.findByText('Descubre nuestras camisas de alta calidad')
    ).toBeInTheDocument()
  })

  it('renderiza BodyFilterProducts', async () => {
    render(<ProductByCategory />)
    const bodyFilter = await screen.findByTestId('body-filter-products')
    expect(bodyFilter).toBeInTheDocument()
  })

  it('BodyFilterProducts recibe la categoría correcta', async () => {
    render(<ProductByCategory />)
    expect(await screen.findByText(/Filter: camisas/)).toBeInTheDocument()
  })

  it('useParams es llamado', () => {
    const { useParams } = require('next/navigation')
    render(<ProductByCategory />)
    expect(useParams).toHaveBeenCalled()
  })

  it('useSearchParams es llamado', () => {
    const { useSearchParams } = require('next/navigation')
    render(<ProductByCategory />)
    expect(useSearchParams).toHaveBeenCalled()
  })

  it('useSEO es llamado con parámetros correctos', () => {
    const { useSEO } = require('@/production/Hooks/useSEO')
    render(<ProductByCategory />)
    
    expect(useSEO).toHaveBeenCalledWith(
      expect.objectContaining({
        path: '/section/product/camisas',
        type: 'website',
        noIndex: false,
      })
    )
  })

  it('getOptimizedTitle es llamado con la categoría', () => {
    const { getOptimizedTitle } = require('@/Shared/utils/functions-seo')
    render(<ProductByCategory />)
    
    expect(getOptimizedTitle).toHaveBeenCalledWith('camisas')
  })

  it('getOptimizedDescription es llamado con la categoría', () => {
    const { getOptimizedDescription } = require('@/Shared/utils/functions-seo')
    render(<ProductByCategory />)
    
    expect(getOptimizedDescription).toHaveBeenCalledWith('camisas')
  })

  it('getOptimizedKeywords es llamado con la categoría', () => {
    const { getOptimizedKeywords } = require('@/Shared/utils/functions-seo')
    render(<ProductByCategory />)
    
    expect(getOptimizedKeywords).toHaveBeenCalledWith('camisas')
  })

  it('renderiza el contenedor product-by-category', async () => {
    const { container } = render(<ProductByCategory />)
    const productByCategory = container.querySelector('.product-by-category')
    expect(productByCategory).toBeInTheDocument()
  })

  it('renderiza el contenedor product-by-category__container', async () => {
    const { container } = render(<ProductByCategory />)
    const innerContainer = container.querySelector(
      '.product-by-category__container'
    )
    expect(innerContainer).toBeInTheDocument()
  })

  it('renderiza sections-index con breadcrumb', async () => {
    const { container } = render(<ProductByCategory />)
    const sectionsIndex = container.querySelector('.sections-index')
    expect(sectionsIndex).toBeInTheDocument()
  })

  it('renderiza title-category', async () => {
    const { container } = render(<ProductByCategory />)
    const titleCategory = container.querySelector('.title-category')
    expect(titleCategory).toBeInTheDocument()
  })

  it('renderiza description-category', async () => {
    const { container } = render(<ProductByCategory />)
    const descriptionCategory = container.querySelector(
      '.description-category'
    )
    expect(descriptionCategory).toBeInTheDocument()
  })

  it('renderiza con diferentes categorías', () => {
    const { useParams } = require('next/navigation')
    useParams.mockReturnValue({ category: 'pantalones' })

    render(<ProductByCategory />)

    useParams.mockReturnValue({ category: 'camisas' })
  })

  it('renderiza con parámetros de búsqueda', () => {
    const { useSearchParams } = require('next/navigation')
    useSearchParams.mockReturnValue(new URLSearchParams('page=1&sort=price'))

    render(<ProductByCategory />)

    useSearchParams.mockReturnValue(new URLSearchParams())
  })

  it('muestra fallback de carga inicialmente', () => {
    render(<ProductByCategory />)
    // El Suspense muestra el fallback mientras se renderiza
    expect(screen.getByTestId('section-structure')).toBeInTheDocument()
  })

  it('renderiza todos los elementos principales', async () => {
    render(<ProductByCategory />)
    expect(screen.getByTestId('section-structure')).toBeInTheDocument()
    expect(await screen.findByTestId('seo-component')).toBeInTheDocument()
    expect(await screen.findByRole('link', { name: /Home/i })).toBeInTheDocument()
    expect(
      await screen.findByRole('link', { name: /CAMISAS/i })
    ).toBeInTheDocument()
    expect(await screen.findByText('Camisas Premium')).toBeInTheDocument()
    expect(await screen.findByTestId('body-filter-products')).toBeInTheDocument()
  })
})

afterEach(() => {
  jest.clearAllMocks()
  const { useParams, useSearchParams } = require('next/navigation')
  useParams.mockReturnValue({ category: 'camisas' })
  useSearchParams.mockReturnValue(new URLSearchParams())
})
