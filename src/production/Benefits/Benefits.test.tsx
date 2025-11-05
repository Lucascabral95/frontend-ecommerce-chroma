import { render, screen } from '@testing-library/react'
import Benefits from '@/production/Benefits/Benefits'

jest.mock('@/production/Section/SectionStructure', () => {
  return function MockSectionStructure({ children }: { children: React.ReactNode }) {
    return <>{children}</>
  }
})
jest.mock('next/image', () => ({ __esModule: true, default: (p: any) => <img {...p} /> }))
jest.mock('next/link', () => {
  return function MockLink(props: { href: string; children: React.ReactNode }) {
    const { href, children, ...rest } = props
    return <a href={href} {...rest}>{children}</a>
  }
})

describe('Benefits (básico)', () => {
  it('muestra los títulos de beneficios', () => {
    render(<Benefits />)
    expect(screen.getAllByText(/ENVÍOS GRATIS A TODO EL PAÍS/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/RETIRO EN TIENDA/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/COMPRA 100% SEGURA/i).length).toBeGreaterThan(0)
  })

  it('muestra detalles de cada beneficio', () => {
    render(<Benefits />)
    expect(screen.getAllByText(/en compras superiores a \$79\.999/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Elegí tu tienda más cercana/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Tu información segura y garantizada/i).length).toBeGreaterThan(0)
  })

  it('muestra la imagen con alt "Locales"', () => {
    render(<Benefits />)
    expect(screen.getByAltText('Locales')).toBeInTheDocument()
  })

  it('existe al menos un enlace en el bloque de locales', () => {
    const { container } = render(<Benefits />)
    const locals = container.querySelector('.locals') as HTMLElement
    const link = locals.querySelector('a')
    expect(link).toBeTruthy()
  })
})
