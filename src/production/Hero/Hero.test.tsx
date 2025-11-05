import { render, screen } from '@testing-library/react'
import ImageCarousel from './Hero'

// Mock CSS
jest.mock('slick-carousel/slick/slick.css', () => ({}))
jest.mock('slick-carousel/slick/slick-theme.css', () => ({}))

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}))

// Mock react-slick
jest.mock('react-slick', () => {
  return function Mock({ children, ...props }: any) {
    return (
      <div data-testid="slider" data-props={JSON.stringify(props)}>
        {children}
      </div>
    )
  }
})

describe('ImageCarousel (Hero)', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renderiza sin crashear', () => {
    const { container } = render(<ImageCarousel />)
    expect(container).toBeInTheDocument()
  })

  it('renderiza el slider', () => {
    render(<ImageCarousel />)
    expect(screen.getByTestId('slider')).toBeInTheDocument()
  })

  it('pasa configuración correcta al Slider', () => {
    render(<ImageCarousel />)
    const slider = screen.getByTestId('slider')
    const props = JSON.parse(slider.getAttribute('data-props') || '{}')

    expect(props.dots).toBe(true)
    expect(props.infinite).toBe(true)
    expect(props.speed).toBe(500)
    expect(props.slidesToShow).toBe(1)
    expect(props.autoplay).toBe(true)
    expect(props.autoplaySpeed).toBe(2800)
    expect(props.arrows).toBe(false)
  })

  it('renderiza imágenes en el carrusel', () => {
    const { container } = render(<ImageCarousel />)
    const images = container.querySelectorAll('img')
    expect(images.length).toBeGreaterThan(0)
  })
})
