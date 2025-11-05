import { render, screen } from '@testing-library/react'
import ProductByIdError from './ProductByIdError'

jest.mock('@/production/Section/SectionStructure', () => {
  return function Mock({ children }: any) {
    return <>{children}</>
  }
})

jest.mock('next/link', () => {
  return function Mock({ children, href }: any) {
    return <a href={href}>{children}</a>
  }
})

describe('ProductByIdError', () => {
  it('renderiza título y descripción', () => {
    render(
      <ProductByIdError 
        title="Error 404" 
        description="Producto no encontrado" 
      />
    )
    expect(screen.getByText('Error 404')).toBeInTheDocument()
    expect(screen.getByText('Producto no encontrado')).toBeInTheDocument()
  })

  it('muestra link para volver al inicio', () => {
    render(
      <ProductByIdError 
        title="Error" 
        description="Descripción" 
      />
    )
    const link = screen.getByRole('link', { name: /Volver al Inicio/i })
    expect(link).toHaveAttribute('href', '/')
  })

  it('renderiza el ícono de error', () => {
    const { container } = render(
      <ProductByIdError 
        title="Error" 
        description="Descripción" 
      />
    )
    expect(container.querySelector('.error-icon')).toBeInTheDocument()
  })
})
