import { render, screen, fireEvent } from '@testing-library/react'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}))

jest.mock('next/link', () => {
  return function Mock({ children, href }: any) {
    return <a href={href}>{children}</a>
  }
})

jest.mock('react-icons/bs', () => ({
  BsArrowLeftShort: () => <span data-testid="icon" />,
}))

jest.mock('@/production/Hooks/useSEO', () => ({
  useSEO: jest.fn(() => ({
    title: 'Crear cuenta',
    description: 'Crear cuenta',
  })),
}))

jest.mock('@/production/components/SEO', () => {
  return function Mock() {
    return <div data-testid="seo" />
  }
})

jest.mock('@/Shared/Components/Toast', () => {
  return function Mock({ message }: any) {
    return message ? <div data-testid="toast">{message}</div> : null
  }
})

jest.mock('@/lib/auth', () => ({
  registerUser: jest.fn(async () => true),
}))

import CreateUser from './page'

describe('CreateUser (básico)', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renderiza sin crashear', () => {
    const { container } = render(<CreateUser />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renderiza el formulario de registro', () => {
    render(<CreateUser />)
    expect(screen.getByText('Crear cuenta')).toBeInTheDocument()
    expect(screen.getByLabelText(/Nombre completo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument()
  })

  it('muestra errores cuando falla validación', () => {
    render(<CreateUser />)
    
    const submitButton = screen.getByRole('button', { name: /CREAR CUENTA/i })
    fireEvent.click(submitButton)
    
    expect(screen.getByLabelText(/Nombre completo/i)).toBeInTheDocument()
  })
})

afterEach(() => {
  jest.clearAllMocks()
})
