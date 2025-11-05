import { render, screen, fireEvent } from '@testing-library/react'
import Header from './Header'

// Mock next/link
jest.mock('next/link', () => {
  return function Mock({ children, href }: any) {
    return <a href={href}>{children}</a>
  }
})

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => '/',
}))

// Mock Zustand stores
jest.mock('@/lib/zustand/AuthZustand', () => ({
  __esModule: true,
  default: () => ({
    userDataSession: null,
    logout: jest.fn(),
  }),
}))

jest.mock('@/lib/zustand/CartZustand', () => ({
  useCartStore: () => ({
    cart: { items: [] },
  }),
}))

// Mock components
jest.mock('@/production/Section/SectionStructure', () => {
  return function Mock({ children }: any) {
    return <>{children}</>
  }
})

jest.mock('@/production/Header/components/MenuBurguer', () => {
  return function Mock({ close }: any) {
    return <div data-testid="menu-burguer">Menu</div>
  }
})

jest.mock('@/production/Header/components/Search', () => {
  return function Mock({ close }: any) {
    return <div data-testid="search">Search</div>
  }
})

jest.mock('@/production/Cart/Modal/Modal', () => {
  return function Mock({ close }: any) {
    return <div data-testid="modal">Modal</div>
  }
})

describe('Header (básico)', () => {
  it('renderiza el header sin crashear', () => {
    const { container } = render(<Header />)
    expect(container).toBeInTheDocument()
  })

  it('muestra el título CHROMA', () => {
    render(<Header />)
    expect(screen.getByText('CHROMA')).toBeInTheDocument()
  })

  it('muestra el ícono de menú hamburguesa', () => {
    render(<Header />)
    const icons = document.querySelectorAll('.menu-hamburguesa .icono')
    expect(icons.length).toBeGreaterThan(0)
  })

  it('muestra ícono de carrito y búsqueda', () => {
    render(<Header />)
    const userCartSection = document.querySelector('.busqueda-usuario-cart')
    expect(userCartSection).toBeInTheDocument()
  })

  it('no muestra cart count cuando está vacío', () => {
    render(<Header />)
    expect(screen.queryByText(/^\d+$/)).not.toBeInTheDocument()
  })

  it('no muestra MenuBurguer inicialmente', () => {
    render(<Header />)
    expect(screen.queryByTestId('menu-burguer')).not.toBeInTheDocument()
  })

  it('muestra links de autenticación', () => {
    render(<Header />)
    const links = screen.getAllByRole('link')
    expect(links.some(a => (a as HTMLAnchorElement).href.includes('/customer/account/login'))).toBe(true)
  })
})
