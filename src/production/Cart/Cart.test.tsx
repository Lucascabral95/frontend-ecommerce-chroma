import { render, screen } from '@testing-library/react'
import Cart from './Cart'

describe('Cart (básico)', () => {
  it('renderiza sin crashear', () => {
    const { container } = render(<Cart />)
    expect(container).toBeInTheDocument()
  })

  it('muestra el texto Cart', () => {
    render(<Cart />)
    expect(screen.getByText(/Cart/i)).toBeInTheDocument()
  })
})
