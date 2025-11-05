import { render, screen, fireEvent } from '@testing-library/react'
import CardError from './CardError'

jest.mock('@/production/Section/SectionStructure', () => {
  return function Mock({ children }: any) {
    return <div data-testid="section-structure">{children}</div>
  }
})

describe('CardError (básico)', () => {
  it('renderiza sin crashear', () => {
    const { container } = render(<CardError />)
    expect(container).toBeInTheDocument()
  })

  it('renderiza SectionStructure', () => {
    render(<CardError />)
    expect(screen.getByTestId('section-structure')).toBeInTheDocument()
  })

  it('renderiza con título por defecto', () => {
    render(<CardError />)
    expect(screen.getByText('Ha ocurrido un problema')).toBeInTheDocument()
  })

  it('renderiza con mensaje primario por defecto', () => {
    render(<CardError />)
    expect(screen.getByText('Se ha producido un error técnico inesperado.')).toBeInTheDocument()
  })

  it('renderiza con título personalizado', () => {
    render(<CardError title="Error Personalizado" />)
    expect(screen.getByText('Error Personalizado')).toBeInTheDocument()
  })

  it('renderiza con mensaje primario personalizado', () => {
    render(<CardError primaryText="Mi mensaje de error" />)
    expect(screen.getByText('Mi mensaje de error')).toBeInTheDocument()
  })

  it('renderiza con secundaryText cuando se proporciona', () => {
    render(<CardError secondaryText="Información secundaria" />)
    expect(screen.getByText('Información secundaria')).toBeInTheDocument()
  })

  it('muestra error 500 en el mensaje cuando errorCode es >= 500', () => {
    render(<CardError errorCode={500} />)
    expect(screen.getByText(/Nuestros sistemas están experimentando/i)).toBeInTheDocument()
  })

  it('muestra error 400 en el mensaje cuando errorCode es >= 400', () => {
    render(<CardError errorCode={404} />)
    expect(screen.getByText(/No se pudo procesar tu solicitud/i)).toBeInTheDocument()
  })

  it('muestra el código de error en el mensaje primario', () => {
    render(<CardError errorCode={500} />)
    expect(screen.getByText(/Código: 500/)).toBeInTheDocument()
  })

  it('renderiza el ícono de error', () => {
    const { container } = render(<CardError />)
    const icon = container.querySelector('.card-error__icon')
    expect(icon).toBeInTheDocument()
  })

  it('el ícono tiene aria-hidden="true"', () => {
    const { container } = render(<CardError />)
    const icon = container.querySelector('svg')
    expect(icon).toHaveAttribute('aria-hidden', 'true')
  })

  it('la sección tiene role="alert"', () => {
    const { container } = render(<CardError />)
    const section = container.querySelector('.card-error')
    expect(section).toHaveAttribute('role', 'alert')
  })

  it('la sección tiene aria-live="assertive"', () => {
    const { container } = render(<CardError />)
    const section = container.querySelector('.card-error')
    expect(section).toHaveAttribute('aria-live', 'assertive')
  })

  it('la sección tiene aria-atomic="true"', () => {
    const { container } = render(<CardError />)
    const section = container.querySelector('.card-error')
    expect(section).toHaveAttribute('aria-atomic', 'true')
  })

  it('renderiza el botón "Reintentar" cuando onRetry se proporciona', () => {
    const mockRetry = jest.fn()
    render(<CardError onRetry={mockRetry} />)
    expect(screen.getByRole('button', { name: /Reintentar/i })).toBeInTheDocument()
  })

  it('llama a onRetry cuando se hace clic en "Reintentar"', () => {
    const mockRetry = jest.fn()
    render(<CardError onRetry={mockRetry} />)
    const retryButton = screen.getByRole('button', { name: /Reintentar/i })
    fireEvent.click(retryButton)
    expect(mockRetry).toHaveBeenCalled()
  })

  it('no renderiza botón "Reintentar" cuando onRetry no se proporciona', () => {
    render(<CardError />)
    expect(screen.queryByRole('button', { name: /Reintentar/i })).not.toBeInTheDocument()
  })

  it('renderiza botón "Contactar a Soporte" cuando onContact se proporciona', () => {
    const mockContact = jest.fn()
    render(<CardError onContact={mockContact} />)
    expect(screen.getByRole('button', { name: /Contactar a Soporte/i })).toBeInTheDocument()
  })

  it('llama a onContact cuando se hace clic en "Contactar a Soporte"', () => {
    const mockContact = jest.fn()
    render(<CardError onContact={mockContact} />)
    const contactButton = screen.getByRole('button', { name: /Contactar a Soporte/i })
    fireEvent.click(contactButton)
    expect(mockContact).toHaveBeenCalled()
  })

  it('renderiza texto "Reintentar" personalizado', () => {
    render(<CardError onRetry={jest.fn()} retryButtonText="Volver a intentar" />)
    expect(screen.getByRole('button', { name: /Volver a intentar/i })).toBeInTheDocument()
  })

  it('renderiza texto "Contactar" personalizado', () => {
    const mockContact = jest.fn()
    render(<CardError onContact={mockContact} contactButtonText="Abrir chat" />)
    expect(screen.getByRole('button', { name: /Abrir chat/i })).toBeInTheDocument()
  })

  it('renderiza supportId cuando se proporciona', () => {
    render(<CardError supportId="SUP-12345" />)
    expect(screen.getByText('ID de Soporte: SUP-12345')).toBeInTheDocument()
  })

  it('no renderiza supportId cuando no se proporciona', () => {
    render(<CardError />)
    expect(screen.queryByText(/ID de Soporte:/)).not.toBeInTheDocument()
  })

  it('renderiza ambos botones cuando se proporcionan', () => {
    render(
      <CardError
        onRetry={jest.fn()}
        onContact={jest.fn()}
      />
    )
    expect(screen.getByRole('button', { name: /Reintentar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Contactar a Soporte/i })).toBeInTheDocument()
  })

  it('tiene la clase card-error en la sección', () => {
    const { container } = render(<CardError />)
    const section = container.querySelector('.card-error')
    expect(section).toHaveClass('card-error')
  })

  it('botón "Reintentar" tiene clase btn--primary', () => {
    const { container } = render(<CardError onRetry={jest.fn()} />)
    const button = container.querySelector('.btn--primary')
    expect(button).toBeInTheDocument()
  })

  it('botón "Contactar" tiene clase btn--ghost', () => {
    const { container } = render(<CardError onContact={jest.fn()} />)
    const button = container.querySelector('.btn--ghost')
    expect(button).toBeInTheDocument()
  })
})
