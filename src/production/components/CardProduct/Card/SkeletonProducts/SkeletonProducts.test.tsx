import { render, screen } from '@testing-library/react'
import SkeletonProducts from './SkeletonProducts'

jest.mock('@/production/Section/SectionStructure', () => {
  return function Mock({ children }: any) {
    return <div data-testid="section-structure">{children}</div>
  }
})

describe('SkeletonProducts (básico)', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renderiza sin crashear', () => {
    const { container } = render(<SkeletonProducts />)
    expect(container).toBeInTheDocument()
  })

  it('renderiza SectionStructure', () => {
    render(<SkeletonProducts />)
    expect(screen.getByTestId('section-structure')).toBeInTheDocument()
  })

  it('renderiza la sección skeleton-products', () => {
    const { container } = render(<SkeletonProducts />)
    const section = container.querySelector('.skeleton-products')
    expect(section).toBeInTheDocument()
  })

  it('tiene atributo aria-busy="true"', () => {
    const { container } = render(<SkeletonProducts />)
    const section = container.querySelector('.skeleton-products')
    expect(section).toHaveAttribute('aria-busy', 'true')
  })

  it('tiene atributo aria-live="polite"', () => {
    const { container } = render(<SkeletonProducts />)
    const section = container.querySelector('.skeleton-products')
    expect(section).toHaveAttribute('aria-live', 'polite')
  })

  it('tiene role="status"', () => {
    const { container } = render(<SkeletonProducts />)
    const section = container.querySelector('.skeleton-products')
    expect(section).toHaveAttribute('role', 'status')
  })

  it('renderiza el contenedor skeleton-products__container', () => {
    const { container } = render(<SkeletonProducts />)
    const containerEl = container.querySelector('.skeleton-products__container')
    expect(containerEl).toBeInTheDocument()
  })

  it('renderiza skeleton cards', () => {
    const { container } = render(<SkeletonProducts />)
    const skeletonCards = container.querySelectorAll('.skeleton-card')
    expect(skeletonCards.length).toBeGreaterThan(0)
  })

  it('cada skeleton card tiene aria-hidden="true"', () => {
    const { container } = render(<SkeletonProducts />)
    const skeletonCards = container.querySelectorAll('.skeleton-card')
    skeletonCards.forEach(card => {
      expect(card).toHaveAttribute('aria-hidden', 'true')
    })
  })

  it('cada skeleton card tiene partes internas', () => {
    const { container } = render(<SkeletonProducts />)
    const skeletonCard = container.querySelector('.skeleton-card')
    
    expect(skeletonCard?.querySelector('.skeleton-card__media')).toBeInTheDocument()
    expect(skeletonCard?.querySelector('.skeleton-card__title')).toBeInTheDocument()
    expect(skeletonCard?.querySelector('.skeleton-card__price')).toBeInTheDocument()
    expect(skeletonCard?.querySelector('.skeleton-card__installments')).toBeInTheDocument()
  })

  it('renderiza el texto de carga oculto', () => {
    render(<SkeletonProducts />)
    expect(screen.getByText('Cargando productos…')).toBeInTheDocument()
  })

  it('el texto de carga tiene clase visually-hidden', () => {
    const { container } = render(<SkeletonProducts />)
    const hiddenText = container.querySelector('.visually-hidden')
    expect(hiddenText).toHaveTextContent('Cargando productos…')
  })

  it('renderiza 4 items por defecto (desktop)', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1280,
    })
    
    const { container } = render(<SkeletonProducts />)
    const skeletonCards = container.querySelectorAll('.skeleton-card')
    expect(skeletonCards).toHaveLength(4)
  })

  it('renderiza 3 items en tablet (768px)', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768,
    })
    
    const { container } = render(<SkeletonProducts />)
    const skeletonCards = container.querySelectorAll('.skeleton-card')
    expect(skeletonCards).toHaveLength(3)
  })

  it('renderiza 2 items en móvil (480px)', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 480,
    })
    
    const { container } = render(<SkeletonProducts />)
    const skeletonCards = container.querySelectorAll('.skeleton-card')
    expect(skeletonCards).toHaveLength(2)
  })

  it('renderiza 1 item en móvil pequeño', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 320,
    })
    
    const { container } = render(<SkeletonProducts />)
    const skeletonCards = container.querySelectorAll('.skeleton-card')
    expect(skeletonCards).toHaveLength(1)
  })

  it('tiene un event listener de resize', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener')
    render(<SkeletonProducts />)
    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))
    addEventListenerSpy.mockRestore()
  })

  it('limpia el event listener al desmontar', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')
    const { unmount } = render(<SkeletonProducts />)
    unmount()
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))
    removeEventListenerSpy.mockRestore()
  })
})
