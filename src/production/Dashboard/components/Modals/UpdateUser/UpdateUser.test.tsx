import { render, screen } from '@testing-library/react'
import UpdateUserModal from './UpdateUser'

jest.mock('../StructureModal', () => {
  return function Mock({ children, title, close }: any) {
    return (
      <div data-testid="structure-modal">
        <h2>{title}</h2>
        <button onClick={close}>Close</button>
        {children}
      </div>
    )
  }
})

jest.mock('@/production/Hooks/useUsers', () => {
  return function Mock() {
    return {
      updateUser: {
        mutate: jest.fn((data, callbacks) => callbacks.onSuccess?.()),
        isPending: false,
        isError: false,
        isSuccess: false,
      },
    }
  }
})

describe('UpdateUserModal (básico)', () => {
  const mockOnClose = jest.fn()
  const userDataMock = {
    id: 'u1',
    name: 'Juan Pérez',
    email: 'juan@example.com',
  }

  beforeEach(() => {
    mockOnClose.mockClear()
  })

  it('renderiza sin crashear', () => {
    const { container } = render(
      <UpdateUserModal onClose={mockOnClose} userData={userDataMock} />
    )
    expect(container).toBeInTheDocument()
  })

  it('muestra el título del modal', () => {
    render(<UpdateUserModal onClose={mockOnClose} userData={userDataMock} />)
    expect(screen.getByText('Actualizar Usuario')).toBeInTheDocument()
  })

  it('renderiza los inputs con valores por defecto', () => {
    render(<UpdateUserModal onClose={mockOnClose} userData={userDataMock} />)
    const nameInput = screen.getByDisplayValue('Juan Pérez') as HTMLInputElement
    const emailInput = screen.getByDisplayValue('juan@example.com') as HTMLInputElement
    
    expect(nameInput).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
  })

  it('muestra los labels del formulario', () => {
    render(<UpdateUserModal onClose={mockOnClose} userData={userDataMock} />)
    expect(screen.getByText('Nombre')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('muestra el botón de actualizar', () => {
    render(<UpdateUserModal onClose={mockOnClose} userData={userDataMock} />)
    expect(screen.getByRole('button', { name: /Actualizar/i })).toBeInTheDocument()
  })

  it('renderiza el botón de cerrar modal', () => {
    render(<UpdateUserModal onClose={mockOnClose} userData={userDataMock} />)
    expect(screen.getByText('Close')).toBeInTheDocument()
  })

  it('el formulario tiene tipo email en el campo de email', () => {
    render(<UpdateUserModal onClose={mockOnClose} userData={userDataMock} />)
    const emailInput = screen.getByPlaceholderText('Ingrese el email') as HTMLInputElement
    expect(emailInput.type).toBe('email')
  })

  it('los inputs tienen required attribute', () => {
    render(<UpdateUserModal onClose={mockOnClose} userData={userDataMock} />)
    const nameInput = screen.getByPlaceholderText('Ingrese el nombre') as HTMLInputElement
    const emailInput = screen.getByPlaceholderText('Ingrese el email') as HTMLInputElement
    
    expect(nameInput.required).toBe(true)
    expect(emailInput.required).toBe(true)
  })
})
