import { render, screen } from '@testing-library/react'
import ProductSlider from './CardProduct'

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

describe('ProductSlider (básico)', () => {
  const productsMock = [
    {
      id: 'p1',
      title: 'Producto 1',
      url: '/product/1',
      price: 1200,
    },
    {
      id: 'p2',
      title: 'Producto 2',
      url: '/product/2',
      price: 1500,
    },
    {
      id: 'p3',
      title: 'Producto 3',
      url: '/product/3',
      price: 900,
    },
  ]

  it('renderiza sin crashear', () => {
    const { container } = render(<ProductSlider products={productsMock} />)
    expect(container).toBeInTheDocument()
  })

  it('renderiza el contenedor product-slider-container', () => {
    const { container } = render(<ProductSlider products={productsMock} />)
    const sliderContainer = container.querySelector('.product-slider-container')
    expect(sliderContainer).toBeInTheDocument()
  })

  it('renderiza los iconos de navegación', () => {
    const { container } = render(<ProductSlider products={productsMock} />)
    const iconos = container.querySelectorAll('.icono')
    expect(iconos).toHaveLength(2)
  })

  it('renderiza todos los productos', () => {
    render(<ProductSlider products={productsMock} />)
    expect(screen.getByText('PRODUCTO 1')).toBeInTheDocument()
    expect(screen.getByText('PRODUCTO 2')).toBeInTheDocument()
    expect(screen.getByText('PRODUCTO 3')).toBeInTheDocument()
  })

  it('renderiza las imágenes con alt text correcto', () => {
    render(<ProductSlider products={productsMock} />)
    expect(screen.getByAltText('Producto 1')).toBeInTheDocument()
    expect(screen.getByAltText('Producto 2')).toBeInTheDocument()
    expect(screen.getByAltText('Producto 3')).toBeInTheDocument()
  })

  it('renderiza los títulos en mayúsculas', () => {
    render(<ProductSlider products={productsMock} />)
    const titleElements = screen.getAllByText(/PRODUCTO/)
    expect(titleElements).toHaveLength(3)
  })

  it('muestra los precios correctamente', () => {
    render(<ProductSlider products={productsMock} />)
    expect(screen.getByText('$1200')).toBeInTheDocument()
    expect(screen.getByText('$1500')).toBeInTheDocument()
    expect(screen.getByText('$900')).toBeInTheDocument()
  })

  it('calcula correctamente las 3 cuotas sin interés', () => {
    render(<ProductSlider products={productsMock} />)
    expect(screen.getByText('3 cuotas sin interés de $400.00')).toBeInTheDocument()
    expect(screen.getByText('3 cuotas sin interés de $500.00')).toBeInTheDocument()
    expect(screen.getByText('3 cuotas sin interés de $300.00')).toBeInTheDocument()
  })

  it('renderiza las tarjetas de productos', () => {
    const { container } = render(<ProductSlider products={productsMock} />)
    const cards = container.querySelectorAll('.image-card-contenedor')
    expect(cards).toHaveLength(3)
  })

  it('renderiza el contenedor de precios', () => {
    const { container } = render(<ProductSlider products={productsMock} />)
    const priceCards = container.querySelectorAll('.price-card')
    expect(priceCards).toHaveLength(3)
  })

  it('renderiza los links con URLs correctas', () => {
    const { container } = render(<ProductSlider products={productsMock} />)
    const imageCards = container.querySelectorAll('.image-card a')
    const titleLinks = container.querySelectorAll('.title-card')
    
    expect(imageCards[0]).toHaveAttribute('href', '/product/1')
    expect(imageCards[1]).toHaveAttribute('href', '/product/2')
    expect(imageCards[2]).toHaveAttribute('href', '/product/3')
    
    expect(titleLinks[0]).toHaveAttribute('href', '/product/1')
    expect(titleLinks[1]).toHaveAttribute('href', '/product/2')
    expect(titleLinks[2]).toHaveAttribute('href', '/product/3')
  })

  it('maneja un array vacío de productos', () => {
    const { container } = render(<ProductSlider products={[]} />)
    expect(container.querySelector('.product-slider-container')).toBeInTheDocument()
  })
})
