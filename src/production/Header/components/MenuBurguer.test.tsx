import { render, screen, fireEvent } from '@testing-library/react'
import MenuBurguer from './MenuBurguer'

jest.mock('next/link', () => {
  return function Mock({ children, href }: any) {
    return <a href={href}>{children}</a>
  }
})

jest.mock('@/lib/Categories', () => [
  { url: '/section/hombre', name: 'Hombre' },
  { url: '/section/mujer', name: 'Mujer' },
  { url: '/section/accesorios', name: 'Accesorios' },
])

jest.mock('./MenuBurguerMobile', () => {
  return function Mock() {
    return <div data-testid="menu-mobile">MenuBurguerMobile</div>
  }
})

describe('MenuBurguer (básico)', () => {
  const mockClose = jest.fn()

  it('renderiza sin crashear', () => {
    const { container } = render(<MenuBurguer close={mockClose} />)
    expect(container).toBeInTheDocument()
  })

  it('renderiza los links de categorías', () => {
    render(<MenuBurguer close={mockClose} />)
    expect(screen.getByText('Hombre')).toBeInTheDocument()
    expect(screen.getByText('Mujer')).toBeInTheDocument()
    expect(screen.getByText('Accesorios')).toBeInTheDocument()
  })

  it('llama a close cuando se clickea una categoría', () => {
    render(<MenuBurguer close={mockClose} />)
    const link = screen.getByText('Hombre').closest('li')
    
    fireEvent.click(link as HTMLElement)
    expect(mockClose).toHaveBeenCalled()
  })

  it('renderiza MenuBurguerMobile', () => {
    render(<MenuBurguer close={mockClose} />)
    expect(screen.getByTestId('menu-mobile')).toBeInTheDocument()
  })
})
