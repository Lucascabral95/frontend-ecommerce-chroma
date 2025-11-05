import { render, screen } from '@testing-library/react'
import SliderSimple from './SliderSimple'

// Mock CSS
jest.mock('slick-carousel/slick/slick.css', () => ({}))
jest.mock('slick-carousel/slick/slick-theme.css', () => ({}))

// Mock react-slick
jest.mock('react-slick', () => {
  // eslint-disable-next-line react/display-name
  return function MockSlick({ children, ...props }: any) {
    return (
      <div data-testid="slick-slider" data-props={JSON.stringify(props)}>
        <div className="slick-track">
          {Array.isArray(children)
            ? children.map((c, i) => (
                <div key={i} className="slick-slide" data-index={i}>
                  {c}
                </div>
              ))
            : <div className="slick-slide">{children}</div>}
        </div>
      </div>
    )
  }
})

describe('SliderSimple (básico)', () => {
  const slides = [
    <div key="s1">Slide 1</div>,
    <div key="s2">Slide 2</div>,
    <div key="s3">Slide 3</div>,
    <div key="s4">Slide 4</div>,
    <div key="s5">Slide 5</div>,
  ]

  it('renderiza el slider con sus slides', () => {
    render(<SliderSimple>{slides}</SliderSimple>)
    expect(screen.getByTestId('slick-slider')).toBeInTheDocument()
    const renderedSlides = document.querySelectorAll('.slick-slide')
    expect(renderedSlides.length).toBe(slides.length)
  })

  it('pasa configuración correcta: autoplay, dots, slidesToShow=4', () => {
    render(<SliderSimple>{slides}</SliderSimple>)
    const wrapper = screen.getByTestId('slick-slider')
    const props = JSON.parse(wrapper.getAttribute('data-props') || '{}')

    expect(props.dots).toBe(true)
    expect(props.infinite).toBe(true)
    expect(props.speed).toBe(500)
    expect(props.slidesToShow).toBe(4)
    expect(props.slidesToScroll).toBe(4)
    expect(props.autoplay).toBe(true)
    expect(props.autoplaySpeed).toBe(2400)
  })

  it('incluye configuración responsive con 3 breakpoints', () => {
    render(<SliderSimple>{slides}</SliderSimple>)
    const props = JSON.parse(screen.getByTestId('slick-slider').getAttribute('data-props') || '{}')

    expect(Array.isArray(props.responsive)).toBe(true)
    expect(props.responsive.length).toBe(3)
    expect(props.responsive[0].breakpoint).toBe(1024)
    expect(props.responsive[1].breakpoint).toBe(600)
    expect(props.responsive[2].breakpoint).toBe(480)
  })

  it('renderiza un slide único correctamente', () => {
    render(<SliderSimple><div>Único</div></SliderSimple>)
    expect(screen.getByText('Único')).toBeInTheDocument()
    const renderedSlides = document.querySelectorAll('.slick-slide')
    expect(renderedSlides.length).toBe(1)
  })
})
