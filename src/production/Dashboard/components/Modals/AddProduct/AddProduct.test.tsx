import { render, screen } from '@testing-library/react'
import AddUserModal from './AddProduct'

jest.mock('../StructureModal', () => {
  return function Mock({ children, title }: any) {
    return (
      <div data-testid="structure-modal">
        <h2>{title}</h2>
        {children}
      </div>
    )
  }
})

jest.mock('@/production/Hooks/useUsers', () => {
  return function Mock() {
    return {
      newUser: {
        mutate: jest.fn((data, callbacks) => callbacks.onSuccess?.()),
      },
    }
  }
})

describe('AddUserModal (básico)', () => {
  const mockOnClose = jest.fn()

  beforeEach(() => {
    mockOnClose.mockClear()
  })

  it('renderiza sin crashear', () => {
    const { container } = render(<AddUserModal onClose={mockOnClose} />)
    expect(container).toBeInTheDocument()
  })

  it('muestra el título del modal', () => {
    render(<AddUserModal onClose={mockOnClose} />)
    expect(screen.getByText('Agregar Usuario')).toBeInTheDocument()
  })

  it('renderiza los inputs del formulario', () => {
    render(<AddUserModal onClose={mockOnClose} />)
    expect(screen.getByPlaceholderText('Ingrese el nombre')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Ingrese el email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Ingrese el password')).toBeInTheDocument()
  })

  it('muestra los labels del formulario', () => {
    render(<AddUserModal onClose={mockOnClose} />)
    expect(screen.getByText('Nombre')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Password')).toBeInTheDocument()
  })

  it('muestra el botón de agregar', () => {
    render(<AddUserModal onClose={mockOnClose} />)
    expect(screen.getByRole('button', { name: /Agregar/i })).toBeInTheDocument()
  })

  it('el input de email tiene tipo email', () => {
    render(<AddUserModal onClose={mockOnClose} />)
    const emailInput = screen.getByPlaceholderText('Ingrese el email') as HTMLInputElement
    expect(emailInput.type).toBe('email')
  })

  it('el input de password tiene tipo password', () => {
    render(<AddUserModal onClose={mockOnClose} />)
    const passwordInput = screen.getByPlaceholderText('Ingrese el password') as HTMLInputElement
    expect(passwordInput.type).toBe('password')
  })

  it('todos los inputs tienen atributo required', () => {
    render(<AddUserModal onClose={mockOnClose} />)
    const nameInput = screen.getByPlaceholderText('Ingrese el nombre') as HTMLInputElement
    const emailInput = screen.getByPlaceholderText('Ingrese el email') as HTMLInputElement
    const passwordInput = screen.getByPlaceholderText('Ingrese el password') as HTMLInputElement
    
    expect(nameInput.required).toBe(true)
    expect(emailInput.required).toBe(true)
    expect(passwordInput.required).toBe(true)
  })

  it('renderiza el modal structure correctamente', () => {
    render(<AddUserModal onClose={mockOnClose} />)
    expect(screen.getByTestId('structure-modal')).toBeInTheDocument()
  })
})
