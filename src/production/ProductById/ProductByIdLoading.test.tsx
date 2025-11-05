import { render, screen } from '@testing-library/react'
import ProductByIdLoading from './ProductByIdLoading'

describe('ProductByIdLoading', () => {
  it('muestra mensaje de carga con el detail', () => {
    render(<ProductByIdLoading detail="producto" />)
    expect(screen.getByText('Cargando producto...')).toBeInTheDocument()
  })

  it('renderiza sin crashear', () => {
    const { container } = render(<ProductByIdLoading detail="datos" />)
    expect(container.querySelector('.product-by-id-loading')).toBeInTheDocument()
  })
})
