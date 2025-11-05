import { render, screen } from '@testing-library/react'
import AddUserModal from './FormInput'

jest.mock('@/production/Hooks/useUsers', () => {
  return function Mock() {
    return {
      newUser: {
        mutateAsync: jest.fn(() => Promise.resolve()),
      },
    }
  }
})

describe('AddUserModal (básico)', () => {
  const mockOnClose = jest.fn()

  it('renderiza sin crashear', () => {
    const { container } = render(<AddUserModal open={true} onClose={mockOnClose} />)
    expect(container).toBeInTheDocument()
  })

  it('muestra el título', () => {
    render(<AddUserModal open={true} onClose={mockOnClose} />)
    expect(screen.getByText('Agregar Usuario')).toBeInTheDocument()
  })

  it('renderiza los inputs del formulario', () => {
    render(<AddUserModal open={true} onClose={mockOnClose} />)
    expect(screen.getByPlaceholderText('Ingrese el nombre')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Ingrese el email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Ingrese el password')).toBeInTheDocument()
  })

  it('muestra los labels del formulario', () => {
    render(<AddUserModal open={true} onClose={mockOnClose} />)
    expect(screen.getByText('Nombre')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Password')).toBeInTheDocument()
  })

  it('muestra el botón de agregar', () => {
    render(<AddUserModal open={true} onClose={mockOnClose} />)
    expect(screen.getByRole('button', { name: /Agregar/i })).toBeInTheDocument()
  })
})
