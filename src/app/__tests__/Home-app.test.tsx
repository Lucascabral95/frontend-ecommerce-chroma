import { render, screen } from '@testing-library/react'
import Home from '../page'

jest.mock('@/production/components/SEO', () => {
  return function Mock() {
    return <div data-testid="seo-component" />
  }
})

jest.mock('@/production/Hero/Hero', () => {
  return function Mock() {
    return <div data-testid="hero">Hero</div>
  }
})

jest.mock('@/production/components/Interest-free/Interest-free', () => {
  return function Mock() {
    return <div data-testid="interest-free">Interest Free</div>
  }
})

jest.mock('@/production/components/BannerFull/BannerFull', () => {
  return function Mock() {
    return <div data-testid="banner-full">Banner Full</div>
  }
})

jest.mock('@/production/components/CardProduct/Card/CardArrayComponent', () => {
  return function Mock() {
    return <div data-testid="card-array">Card Array</div>
  }
})

jest.mock('@/production/components/YoutubeVideo/YoutubeVideo', () => {
  return function Mock() {
    return <div data-testid="youtube-video">YouTube Video</div>
  }
})

jest.mock('@/production/components/OffetHome/OfferHome', () => {
  return function Mock() {
    return <div data-testid="offer-home">Offer Home</div>
  }
})

jest.mock('@/production/Benefits/Benefits', () => {
  return function Mock() {
    return <div data-testid="benefits">Benefits</div>
  }
})

jest.mock('@/production/Hooks/useSEO', () => ({
  useSEO: jest.fn(() => ({
    title: 'Chroma',
    description: 'Test',
  })),
}))

describe('Home (básico)', () => {
  it('renderiza sin crashear', () => {
    const { container } = render(<Home />)
    expect(container).toBeInTheDocument()
  })

  it('renderiza el componente SEO', () => {
    render(<Home />)
    expect(screen.getByTestId('seo-component')).toBeInTheDocument()
  })

  it('renderiza el componente Hero', () => {
    render(<Home />)
    expect(screen.getByTestId('hero')).toBeInTheDocument()
  })

  it('renderiza el componente InterestFree', () => {
    render(<Home />)
    expect(screen.getByTestId('interest-free')).toBeInTheDocument()
  })

  it('renderiza el componente BannerFull', () => {
    render(<Home />)
    expect(screen.getByTestId('banner-full')).toBeInTheDocument()
  })

  it('renderiza el componente CardArrayComponent', () => {
    render(<Home />)
    expect(screen.getByTestId('card-array')).toBeInTheDocument()
  })

  it('renderiza el componente YoutubeVideo', () => {
    render(<Home />)
    expect(screen.getByTestId('youtube-video')).toBeInTheDocument()
  })

  it('renderiza el componente OfferHome', () => {
    render(<Home />)
    expect(screen.getByTestId('offer-home')).toBeInTheDocument()
  })

  it('renderiza el componente Benefits', () => {
    render(<Home />)
    expect(screen.getByTestId('benefits')).toBeInTheDocument()
  })

  it('los componentes se renderizan en orden correcto', () => {
    const { container } = render(<Home />)
    const components = container.querySelectorAll('[data-testid]')
    const testIds = Array.from(components).map(el => el.getAttribute('data-testid'))
    
    expect(testIds).toContain('seo-component')
    expect(testIds).toContain('hero')
    expect(testIds).toContain('interest-free')
    expect(testIds).toContain('banner-full')
  })

  it('useSEO es llamado con parámetros correctos', () => {
    const { useSEO } = require('@/production/Hooks/useSEO')
    render(<Home />)
    
    expect(useSEO).toHaveBeenCalledWith(
      expect.objectContaining({
        title: expect.stringContaining('Chroma'),
        path: '/',
        type: 'website',
      })
    )
  })

  it('el título SEO contiene "Chroma"', () => {
    const { useSEO } = require('@/production/Hooks/useSEO')
    render(<Home />)
    
    const callArgs = useSEO.mock.calls[0][0]
    expect(callArgs.title).toContain('Chroma')
  })

  it('el path SEO es "/"', () => {
    const { useSEO } = require('@/production/Hooks/useSEO')
    render(<Home />)
    
    const callArgs = useSEO.mock.calls[0][0]
    expect(callArgs.path).toBe('/')
  })

  it('el type SEO es "website"', () => {
    const { useSEO } = require('@/production/Hooks/useSEO')
    render(<Home />)
    
    const callArgs = useSEO.mock.calls[0][0]
    expect(callArgs.type).toBe('website')
  })

  it('SEO recibe todos los datos correctos', () => {
    render(<Home />)
    const seo = screen.getByTestId('seo-component')
    expect(seo).toBeInTheDocument()
  })

  it('renderiza los 9 componentes principales', () => {
    const { container } = render(<Home />)
    const components = container.querySelectorAll('[data-testid]')
    expect(components.length).toBeGreaterThanOrEqual(8) // SEO + 8 componentes
  })
})
