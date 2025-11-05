import { render, screen } from '@testing-library/react'
import MarqueeBanner from './Maraquee'

jest.mock('react-fast-marquee', () => ({
  __esModule: true,
  default: ({ children }: any) => <div data-testid="marquee-mock">{children}</div>,
}))

describe('MarqueeBanner (básico)', () => {
  it('renderiza la sección con rol marquee', () => {
    render(<MarqueeBanner />)

    const marqueeSection = screen.getByRole('marquee')
    expect(marqueeSection).toBeInTheDocument()
    expect(marqueeSection).toHaveAttribute(
      'aria-label',
      'Promociones y beneficios'
    )
  })

  it('muestra el texto dentro del componente Marquee', () => {
    render(<MarqueeBanner />)

    expect(screen.getByTestId('marquee-mock')).toBeInTheDocument()
    expect(screen.getByText(/RETIRO EN TIENDA SIN CARGO/i)).toBeInTheDocument()
  })
})
