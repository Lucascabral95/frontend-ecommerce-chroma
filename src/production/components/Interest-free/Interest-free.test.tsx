import { render, screen, waitFor } from '@testing-library/react'
import InterestFree from './Interest-free'

jest.mock('@/production/Section/SectionStructure', () => ({
  __esModule: true,
  default: ({ children }: any) => <div data-testid="section-structure">{children}</div>,
}))

jest.mock('next/image', () => ({
  __esModule: true,
  default: function Mock({ src, alt, ...props }: any) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />
  },
}))

describe('InterestFree (básico)', () => {
  const originalInnerWidth = window.innerWidth

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    })
  })

  it('muestra la imagen de escritorio cuando el ancho es mayor al breakpoint', async () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })

    render(<InterestFree />)

    await waitFor(() => {
      expect(screen.getByAltText('Interest Free')).toHaveAttribute(
        'src',
        '/img/6-cuotas-s-interes.webp'
      )
    })
  })

  it('muestra la imagen mobile cuando el ancho es menor al breakpoint', async () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    })

    render(<InterestFree />)

    await waitFor(() => {
      expect(screen.getByAltText('Interest Free')).toHaveAttribute(
        'src',
        '/img/quotas-without-interest-mobile.webp'
      )
    })
  })
})
