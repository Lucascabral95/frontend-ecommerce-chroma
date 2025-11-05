import { render, screen } from '@testing-library/react'
import OfferHome from './OfferHome'

jest.mock('next/image', () => ({
  __esModule: true,
  default: function Mock({ src, alt, ...props }: any) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />
  },
}))

describe('OfferHome (básico)', () => {
  it('renderiza el contenedor principal', () => {
    const { container } = render(<OfferHome />)
    expect(container.querySelector('.offer-home')).toBeInTheDocument()
    expect(container.querySelector('.offer-home__container')).toBeInTheDocument()
  })

  it('muestra todas las imágenes configuradas', () => {
    render(<OfferHome />)
    expect(screen.getByAltText('Colección 2025')).toBeInTheDocument()
    expect(screen.getByAltText('3x2')).toBeInTheDocument()
  })
})
