import { render, screen, fireEvent } from '@testing-library/react'
import MenuBurguerMobile from './MenuBurguerMobile'

jest.mock('next/link', () => {
  return function Mock({ children, href, onClick }: any) {
    return <a href={href} onClick={onClick}>{children}</a>
  }
})

jest.mock('@/lib/zustand/AuthZustand', () => ({
  __esModule: true,
  default: () => ({
    userDataSession: null,
    logout: jest.fn(),
  }),
}))

jest.mock('@/lib/Categories', () => [
  { url: '/section/hombre', name: 'Hombre' },
  { url: '/section/mujer', name: 'Mujer' },
])

describe('MenuBurguerMobile (básico)', () => {
  const mockClose = jest.fn()

  beforeEach(() => {
    mockClose.mockClear()
  })

  it('renderiza sin crashear', () => {
    const { container } = render(<MenuBurguerMobile close={mockClose} />)
    expect(container).toBeInTheDocument()
  })

  it('renderiza el link de acceso (sin sesión)', () => {
    render(<MenuBurguerMobile close={mockClose} />)
    expect(screen.getByText('INGRESAR')).toBeInTheDocument()
  })

  it('renderiza las categorías', () => {
    render(<MenuBurguerMobile close={mockClose} />)
    expect(screen.getByText('Hombre')).toBeInTheDocument()
    expect(screen.getByText('Mujer')).toBeInTheDocument()
  })

  it('llama a close cuando se clickea una categoría', () => {
    render(<MenuBurguerMobile close={mockClose} />)
    const hombre = screen.getByText('Hombre').closest('a')
    
    fireEvent.click(hombre as HTMLElement)
    expect(mockClose).toHaveBeenCalled()
  })

  it('renderiza el footer con crédito de desarrollador', () => {
    render(<MenuBurguerMobile close={mockClose} />)
    expect(screen.getByText(/Lucas Cabral/i)).toBeInTheDocument()
  })

  it('llama a close cuando se clickea el overlay', () => {
    render(<MenuBurguerMobile close={mockClose} />)
    const overlay = document.querySelector('.menu-burguer-mobile')
    
    fireEvent.click(overlay as HTMLElement)
    expect(mockClose).toHaveBeenCalled()
  })
})
