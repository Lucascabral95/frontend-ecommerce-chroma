import { render, screen } from '@testing-library/react'
import BannerFull from './BannerFull'

jest.mock('next/link', () => {
  return function Mock({ children, href, className }: any) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    )
  }
})

jest.mock('next/image', () => ({
  __esModule: true,
  default: function Mock({ src, alt, ...props }: any) {
    return <img src={src} alt={alt} {...props} />
  },
}))

describe('BannerFull (básico)', () => {
  it('renderiza sin crashear', () => {
    const { container } = render(<BannerFull />)
    expect(container).toBeInTheDocument()
  })

  it('renderiza el contenedor banner-full', () => {
    const { container } = render(<BannerFull />)
    const bannerContainer = container.querySelector('.banner-full')
    expect(bannerContainer).toBeInTheDocument()
  })

  it('renderiza el contenedor banner-full__container', () => {
    const { container } = render(<BannerFull />)
    const innerContainer = container.querySelector('.banner-full__container')
    expect(innerContainer).toBeInTheDocument()
  })

  it('renderiza tres banners', () => {
    render(<BannerFull />)
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(3)
  })

  it('renderiza las imágenes con atributo alt', () => {
    render(<BannerFull />)
    expect(screen.getByAltText('Banner Full 1')).toBeInTheDocument()
    expect(screen.getByAltText('Banner Full 2')).toBeInTheDocument()
    expect(screen.getByAltText('Banner Full 3')).toBeInTheDocument()
  })

  it('renderiza las imágenes con las URLs correctas', () => {
    render(<BannerFull />)
    const images = screen.getAllByRole('img')
    expect(images[0]).toHaveAttribute('src', '/img/port-uno.webp')
    expect(images[1]).toHaveAttribute('src', '/img/port-dos.webp')
    expect(images[2]).toHaveAttribute('src', '/img/port-tres.webp')
  })

  it('cada imagen tiene clase image-banner-full', () => {
    const { container } = render(<BannerFull />)
    const images = container.querySelectorAll('.image-banner-full')
    expect(images).toHaveLength(3)
  })

  it('cada link tiene clase images-banner-full', () => {
    const { container } = render(<BannerFull />)
    const links = container.querySelectorAll('.images-banner-full')
    expect(links).toHaveLength(3)
  })

  it('los links tienen las URLs correctas', () => {
    render(<BannerFull />)
    const links = screen.getAllByRole('link') as HTMLAnchorElement[]
    
    expect(links[0]).toHaveAttribute(
      'href',
      '/section/product/all?categoryId=6fddfssdf-0d1e-4234-f567-6789abcdef01'
    )
    expect(links[1]).toHaveAttribute(
      'href',
      '/section/product?categoryId=3c4d5e6f-7a8b-4901-c234-3456789abcde&sortOrder=asc&sortBy=basePrice'
    )
    expect(links[2]).toHaveAttribute(
      'href',
      '/section/product?categoryId=6f7a8b9c-0d1e-32432-f567-6789abcdef01'
    )
  })

  it('las imágenes tienen dimensiones correctas', () => {
    render(<BannerFull />)
    const images = screen.getAllByRole('img')
    images.forEach(img => {
      expect(img).toHaveAttribute('width', '600')
      expect(img).toHaveAttribute('height', '950')
    })
  })
})
