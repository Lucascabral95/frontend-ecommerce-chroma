import { render, screen } from '@testing-library/react'
import RootLayout from '../layout'

jest.mock('next/font/google', () => ({
  Geist: () => ({
    variable: '--font-geist-sans',
  }),
  Geist_Mono: () => ({
    variable: '--font-geist-mono',
  }),
}))

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}))

jest.mock('@/Insfraestructure/Tans-Tack-Query/TansTackQuery.global', () => {
  return function Mock({ children }: any) {
    return <div data-testid="tan-stack-query">{children}</div>
  }
})

jest.mock('@/providers/zustand.provider', () => ({
  StoreInitializer: ({ children }: any) => (
    <div data-testid="store-initializer">{children}</div>
  ),
}))

jest.mock('@/providers/react-helmet-async', () => {
  return function Mock({ children }: any) {
    return <div data-testid="helmet-async">{children}</div>
  }
})

jest.mock('@/production/Header/Header', () => {
  return function Mock() {
    return <header data-testid="header">Header</header>
  }
})

jest.mock('@/production/components/Footer/Footer', () => {
  return function Mock() {
    return <footer data-testid="footer">Footer</footer>
  }
})

jest.mock('@/production/Benefits/Subscribe/Subscribe', () => {
  return function Mock() {
    return <div data-testid="subscribe">Subscribe</div>
  }
})

jest.mock('@/production/components/Marquee/Maraquee', () => {
  return function Mock() {
    return <div data-testid="marquee">Marquee</div>
  }
})

describe('RootLayout (básico)', () => {
  it('renderiza sin crashear', () => {
    const { container } = render(
      <RootLayout>
        <div>Contenido</div>
      </RootLayout>
    )
    expect(container).toBeInTheDocument()
  })

  it('renderiza ReactHelmetAsyncProvider', () => {
    render(
      <RootLayout>
        <div>Contenido</div>
      </RootLayout>
    )
    expect(screen.getByTestId('helmet-async')).toBeInTheDocument()
  })

  it('renderiza StoreInitializer', () => {
    render(
      <RootLayout>
        <div>Contenido</div>
      </RootLayout>
    )
    expect(screen.getByTestId('store-initializer')).toBeInTheDocument()
  })

  it('renderiza TanStackQuery', () => {
    render(
      <RootLayout>
        <div>Contenido</div>
      </RootLayout>
    )
    expect(screen.getByTestId('tan-stack-query')).toBeInTheDocument()
  })

  it('renderiza MarqueeBanner cuando NO es ruta admin', () => {
    render(
      <RootLayout>
        <div>Contenido</div>
      </RootLayout>
    )
    expect(screen.getByTestId('marquee')).toBeInTheDocument()
  })

  it('renderiza Header cuando NO es ruta admin', () => {
    render(
      <RootLayout>
        <div>Contenido</div>
      </RootLayout>
    )
    expect(screen.getByTestId('header')).toBeInTheDocument()
  })

  it('renderiza main con clase grow', () => {
    const { container } = render(
      <RootLayout>
        <div>Contenido</div>
      </RootLayout>
    )
    const main = container.querySelector('main')
    expect(main).toHaveClass('grow')
  })

  it('renderiza los children en main', () => {
    render(
      <RootLayout>
        <div>Mi Contenido Principal</div>
      </RootLayout>
    )
    const main = screen.getByRole('main')
    expect(main).toHaveTextContent('Mi Contenido Principal')
  })

  it('renderiza Subscribe cuando NO es ruta admin', () => {
    render(
      <RootLayout>
        <div>Contenido</div>
      </RootLayout>
    )
    expect(screen.getByTestId('subscribe')).toBeInTheDocument()
  })

  it('renderiza Footer cuando NO es ruta admin', () => {
    render(
      <RootLayout>
        <div>Contenido</div>
      </RootLayout>
    )
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('NO renderiza MarqueeBanner cuando es ruta admin', () => {
    const usePathnameModule = require('next/navigation')
    usePathnameModule.usePathname.mockReturnValue('/api/dashboard/products')
    
    render(
      <RootLayout>
        <div>Contenido</div>
      </RootLayout>
    )
    expect(screen.queryByTestId('marquee')).not.toBeInTheDocument()
  })

  it('NO renderiza Header cuando es ruta admin', () => {
    const usePathnameModule = require('next/navigation')
    usePathnameModule.usePathname.mockReturnValue('/api/dashboard/products')
    
    render(
      <RootLayout>
        <div>Contenido</div>
      </RootLayout>
    )
    expect(screen.queryByTestId('header')).not.toBeInTheDocument()
  })

  it('NO renderiza Subscribe cuando es ruta admin', () => {
    const usePathnameModule = require('next/navigation')
    usePathnameModule.usePathname.mockReturnValue('/api/dashboard/settings')
    
    render(
      <RootLayout>
        <div>Contenido</div>
      </RootLayout>
    )
    expect(screen.queryByTestId('subscribe')).not.toBeInTheDocument()
  })

  it('NO renderiza Footer cuando es ruta admin', () => {
    const usePathnameModule = require('next/navigation')
    usePathnameModule.usePathname.mockReturnValue('/api/dashboard/users')
    
    render(
      <RootLayout>
        <div>Contenido</div>
      </RootLayout>
    )
    expect(screen.queryByTestId('footer')).not.toBeInTheDocument()
  })

  it('renderiza los children', () => {
    render(
      <RootLayout>
        <section>Sección Principal</section>
      </RootLayout>
    )
    expect(screen.getByText('Sección Principal')).toBeInTheDocument()
  })

  it('todos los providers están anidados correctamente', () => {
    const { container } = render(
      <RootLayout>
        <div>Contenido</div>
      </RootLayout>
    )
    const helmet = container.querySelector('[data-testid="helmet-async"]')
    const store = helmet?.querySelector('[data-testid="store-initializer"]')
    const tanStack = store?.querySelector('[data-testid="tan-stack-query"]')
    
    expect(helmet).toBeInTheDocument()
    expect(store).toBeInTheDocument()
    expect(tanStack).toBeInTheDocument()
  })

  it('renderiza múltiples children', () => {
    render(
      <RootLayout>
        <div>Contenido 1</div>
        <div>Contenido 2</div>
      </RootLayout>
    )
    expect(screen.getByText('Contenido 1')).toBeInTheDocument()
    expect(screen.getByText('Contenido 2')).toBeInTheDocument()
  })

  it('afterEach limpia los mocks', () => {
    const usePathnameModule = require('next/navigation')
    expect(usePathnameModule.usePathname()).toBe('/')
  })
})

afterEach(() => {
  jest.clearAllMocks()
  const usePathnameModule = require('next/navigation')
  usePathnameModule.usePathname.mockReturnValue('/')
})
