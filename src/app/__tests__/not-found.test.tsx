import { render, screen } from '@testing-library/react'
import NotFound from '../not-found'

jest.mock('next/link', () => {
  return function Mock({ children, href, className }: any) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    )
  }
})

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/not-found'),
}))

describe('NotFound (básico)', () => {
  it('renderiza sin crashear', () => {
    const { container } = render(<NotFound />)
    expect(container).toBeInTheDocument()
  })

  it('renderiza el contenedor not-found-container', () => {
    const { container } = render(<NotFound />)
    const container_ = container.querySelector('.not-found-container')
    expect(container_).toBeInTheDocument()
  })

  it('muestra el código 404', () => {
    render(<NotFound />)
    expect(screen.getByText('404')).toBeInTheDocument()
  })

  it('muestra el título de página no encontrada', () => {
    render(<NotFound />)
    expect(screen.getByText('Página no encontrada')).toBeInTheDocument()
  })

  it('muestra la descripción', () => {
    render(<NotFound />)
    expect(screen.getByText(/Lo sentimos, la página que estás buscando/)).toBeInTheDocument()
  })

  it('renderiza el link "Volver al inicio"', () => {
    render(<NotFound />)
    const link = screen.getByRole('link', { name: /Volver al inicio/i })
    expect(link).toBeInTheDocument()
  })

  it('el link apunta al home', () => {
    render(<NotFound />)
    const link = screen.getByRole('link', { name: /Volver al inicio/i })
    expect(link).toHaveAttribute('href', '/')
  })

  it('el link tiene clase back-home', () => {
    const { container } = render(<NotFound />)
    const link = container.querySelector('.back-home')
    expect(link).toBeInTheDocument()
  })

  it('renderiza el contenedor not-found-content', () => {
    const { container } = render(<NotFound />)
    const content = container.querySelector('.not-found-content')
    expect(content).toBeInTheDocument()
  })

  it('el código 404 tiene clase error-code', () => {
    const { container } = render(<NotFound />)
    const errorCode = container.querySelector('.error-code')
    expect(errorCode).toBeInTheDocument()
    expect(errorCode?.textContent).toBe('404')
  })

  it('el título tiene clase title', () => {
    const { container } = render(<NotFound />)
    const title = container.querySelector('.title')
    expect(title).toBeInTheDocument()
  })

  it('la descripción tiene clase description', () => {
    const { container } = render(<NotFound />)
    const description = container.querySelector('.description')
    expect(description).toBeInTheDocument()
  })

  it('height es 100vh cuando es ruta api', () => {
    const usePathnameModule = require('next/navigation')
    usePathnameModule.usePathname.mockReturnValue('/api/test')
    
    const { container } = render(<NotFound />)
    const container_ = container.querySelector('.not-found-container')
    expect(container_).toHaveStyle('height: 100vh')
    
    usePathnameModule.usePathname.mockReturnValue('/not-found')
  })

  it('height es 80vh cuando NO es ruta api', () => {
    const usePathnameModule = require('next/navigation')
    usePathnameModule.usePathname.mockReturnValue('/products')
    
    const { container } = render(<NotFound />)
    const container_ = container.querySelector('.not-found-container')
    expect(container_).toHaveStyle('height: 80vh')
    
    usePathnameModule.usePathname.mockReturnValue('/not-found')
  })
})

afterEach(() => {
  jest.clearAllMocks()
})
