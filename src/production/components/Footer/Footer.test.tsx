import { render, screen } from '@testing-library/react'
import Footer from './Footer'

jest.mock('@/production/Section/SectionStructure', () => ({
  __esModule: true,
  default: ({ children }: any) => (
    <div data-testid="section-structure">{children}</div>
  ),
}))

describe('Footer (básico)', () => {
  it('renderiza las secciones de SectionStructure', () => {
    render(<Footer />)

    const sections = screen.getAllByTestId('section-structure')
    expect(sections).toHaveLength(2)
  })

  it('muestra los enlaces de redes sociales', () => {
    render(<Footer />)

    const socialLinks = screen.getAllByRole('link')
    expect(socialLinks.length).toBeGreaterThanOrEqual(5)
    expect(socialLinks[0]).toHaveAttribute('target', '_blank')
    expect(socialLinks[0]).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('muestra el mensaje del desarrollador', () => {
    render(<Footer />)

    expect(screen.getByText(/Desarrollado con/i)).toBeInTheDocument()
    expect(screen.getByText(/Lucas Cabral/i)).toBeInTheDocument()
  })
})
