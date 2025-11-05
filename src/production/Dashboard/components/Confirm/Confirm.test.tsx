import { render, screen, fireEvent } from '@testing-library/react'
import ConfirmComponent from './Confirm'

describe('ConfirmComponent (básico)', () => {
  const mockOnConfirm = jest.fn()
  const mockOnCancel = jest.fn()

  beforeEach(() => {
    mockOnConfirm.mockClear()
    mockOnCancel.mockClear()
  })

  it('no renderiza nada cuando isOpen es false', () => {
    const { container } = render(
      <ConfirmComponent
        isOpen={false}
        title="Confirmar"
        message="¿Estás seguro?"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    )
    expect(container.firstChild).toBeNull()
  })

  it('renderiza el modal cuando isOpen es true', () => {
    render(
      <ConfirmComponent
        isOpen={true}
        title="Confirmar"
        message="¿Estás seguro?"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    )
    expect(screen.getByText('Confirmar')).toBeInTheDocument()
  })

  it('muestra el título correctamente', () => {
    render(
      <ConfirmComponent
        isOpen={true}
        title="Mi Título"
        message="Mi mensaje"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    )
    expect(screen.getByText('Mi Título')).toBeInTheDocument()
  })

  it('muestra el mensaje correctamente', () => {
    render(
      <ConfirmComponent
        isOpen={true}
        title="Título"
        message="Este es mi mensaje"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    )
    expect(screen.getByText('Este es mi mensaje')).toBeInTheDocument()
  })

  it('muestra los botones con textos por defecto', () => {
    render(
      <ConfirmComponent
        isOpen={true}
        title="Título"
        message="Mensaje"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    )
    const buttons = screen.getAllByRole('button')
    expect(buttons.some(btn => btn.textContent === 'Cancelar')).toBe(true)
    expect(buttons.some(btn => btn.textContent === 'Eliminar')).toBe(true)
  })

  it('muestra los botones con textos personalizados', () => {
    render(
      <ConfirmComponent
        isOpen={true}
        title="Título"
        message="Mensaje"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        confirmText="Aceptar"
        cancelText="Rechazar"
      />
    )
    expect(screen.getByRole('button', { name: /Rechazar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Aceptar/i })).toBeInTheDocument()
  })

  it('llama a onConfirm cuando se clickea el botón confirmar', () => {
    render(
      <ConfirmComponent
        isOpen={true}
        title="Título"
        message="Mensaje"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    )
    const confirmButton = screen.getByRole('button', { name: /Eliminar/i })
    fireEvent.click(confirmButton)
    expect(mockOnConfirm).toHaveBeenCalled()
  })

  it('llama a onCancel cuando se clickea el botón cancelar', () => {
    render(
      <ConfirmComponent
        isOpen={true}
        title="Título"
        message="Mensaje"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    )
    const cancelButton = screen.getByRole('button', { name: /Cancelar/i })
    fireEvent.click(cancelButton)
    expect(mockOnCancel).toHaveBeenCalled()
  })

  it('llama a onCancel cuando se clickea el overlay', () => {
    render(
      <ConfirmComponent
        isOpen={true}
        title="Título"
        message="Mensaje"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    )
    const overlay = document.querySelector('.confirm-overlay')
    fireEvent.click(overlay as HTMLElement)
    expect(mockOnCancel).toHaveBeenCalled()
  })

  it('no llama a onCancel cuando se clickea dentro del contenido modal', () => {
    render(
      <ConfirmComponent
        isOpen={true}
        title="Título"
        message="Mensaje"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    )
    const content = document.querySelector('.confirm-content')
    fireEvent.click(content as HTMLElement)
    expect(mockOnCancel).not.toHaveBeenCalled()
  })

  it('tiene las clases CSS correctas en los botones', () => {
    render(
      <ConfirmComponent
        isOpen={true}
        title="Título"
        message="Mensaje"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    )
    const cancelButton = screen.getByRole('button', { name: /Cancelar/i })
    const confirmButton = screen.getByRole('button', { name: /Eliminar/i })
    
    expect(cancelButton).toHaveClass('confirm-button--cancel')
    expect(confirmButton).toHaveClass('confirm-button--confirm')
  })
})
