import { render, screen } from '@testing-library/react'
import ErrorBoundary from './ErrorBoundary'

// Componente que lanza un error
const ThrowError = () => {
  throw new Error('Error de prueba')
}

// Componente normal sin error
const NormalComponent = () => <div>Contenido normal</div>

describe('ErrorBoundary (básico)', () => {
  // Suprimir console.error durante los tests
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  it('renderiza sin crashear', () => {
    const { container } = render(
      <ErrorBoundary>
        <NormalComponent />
      </ErrorBoundary>
    )
    expect(container).toBeInTheDocument()
  })

  it('renderiza los children normalmente cuando no hay error', () => {
    render(
      <ErrorBoundary>
        <NormalComponent />
      </ErrorBoundary>
    )
    expect(screen.getByText('Contenido normal')).toBeInTheDocument()
  })

  it('muestra el fallback por defecto cuando hay error', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )
    expect(screen.getByText('¡Algo salió mal!')).toBeInTheDocument()
  })

  it('muestra el mensaje de error por defecto', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )
    expect(
      screen.getByText(/Ha ocurrido un error inesperado/i)
    ).toBeInTheDocument()
  })

  it('muestra el botón "Intentar nuevamente"', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )
    expect(screen.getByRole('button', { name: /Intentar nuevamente/i })).toBeInTheDocument()
  })

  it('muestra el botón "Recargar página"', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )
    expect(screen.getByRole('button', { name: /Recargar página/i })).toBeInTheDocument()
  })

  it('renderiza el fallback personalizado cuando se proporciona', () => {
    render(
      <ErrorBoundary fallback={<div>Mi error personalizado</div>}>
        <ThrowError />
      </ErrorBoundary>
    )
    expect(screen.getByText('Mi error personalizado')).toBeInTheDocument()
  })

  it('muestra los detalles técnicos del error', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )
    const details = screen.getByText('Detalles técnicos').closest('details')
    expect(details).toBeInTheDocument()
  })

  it('contiene el mensaje de error en los detalles técnicos', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )
    expect(screen.getByText(/Error de prueba/i)).toBeInTheDocument()
  })

  it('llama a onError cuando se captura un error', () => {
    const mockOnError = jest.fn()
    render(
      <ErrorBoundary onError={mockOnError}>
        <ThrowError />
      </ErrorBoundary>
    )
    expect(mockOnError).toHaveBeenCalled()
  })
})
