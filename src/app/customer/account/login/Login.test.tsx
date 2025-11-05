import { render, screen, fireEvent } from '@testing-library/react'

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
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}))

jest.mock('@/production/components/SEO', () => {
  return function Mock() {
    return <div data-testid="seo" />
  }
})

jest.mock('@/production/Hooks/useSEO', () => ({
  useSEO: jest.fn(() => ({
    title: 'Login',
    description: 'Login test',
  })),
}))

jest.mock('@/lib/zustand/AuthZustand', () => ({
  __esModule: true,
  default: () => ({
    setJwt: jest.fn(),
  }),
}))

jest.mock('@/lib/auth', () => ({
  loginUser: jest.fn(async () => ({ accessToken: 'token-123' })),
}))

jest.mock('@/Shared/Components/Toast', () => {
  return function Mock({ message }: any) {
    return message ? <div data-testid="toast">{message}</div> : null
  }
})

import Login from './page'

describe('Login (básico)', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renderiza sin crashear', () => {
    const { container } = render(<Login />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renderiza el formulario de login', () => {
    render(<Login />)
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /INICIAR SESIÓN/i })).toBeInTheDocument()
  })

  it('muestra el link para registrarse', () => {
    render(<Login />)
    const registerLink = screen.getByText('REGISTRARME')
    expect(registerLink).toHaveAttribute('href', '/customer/account/create')
  })
})

afterEach(() => {
  jest.clearAllMocks()
})
