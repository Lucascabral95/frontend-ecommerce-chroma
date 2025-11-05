import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Search from './Search'

jest.mock('next/link', () => {
  return function Mock({ children, href }: any) {
    return <a href={href}>{children}</a>
  }
})

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}))

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => '/',
}))

jest.mock('@/lib/products.api', () => ({
  getProducts: jest.fn(() =>
    Promise.resolve({
      products: [
        { id: 'p1', name: 'Producto 1', images: [{ url: '/img/p1.webp' }], variants: [{ price: 1200 }] },
        { id: 'p2', name: 'Producto 2', images: [{ url: '/img/p2.webp' }], variants: [{ price: 2500 }] },
      ],
    })
  ),
}))

jest.mock('@/production/Header/components/SearchMobile', () => {
  return function Mock() {
    return <div data-testid="search-mobile">SearchMobile</div>
  }
})

describe('Search (básico)', () => {
  const mockClose = jest.fn()

  it('renderiza sin crashear', () => {
    const { container } = render(<Search close={mockClose} />)
    expect(container).toBeInTheDocument()
  })

  it('renderiza el input de búsqueda', () => {
    render(<Search close={mockClose} />)
    const input = screen.getByPlaceholderText(/¿Qué estás buscando?/i)
    expect(input).toBeInTheDocument()
  })

  it('actualiza el valor del input cuando se escribe', () => {
    render(<Search close={mockClose} />)
    const input = screen.getByPlaceholderText(/¿Qué estás buscando?/i) as HTMLInputElement
    
    fireEvent.change(input, { target: { value: 'zapatillas' } })
    expect(input.value).toBe('zapatillas')
  })

  it('muestra imagen de oferta por defecto', () => {
    render(<Search close={mockClose} />)
    const images = document.querySelectorAll('.image-search')
    expect(images.length).toBeGreaterThan(0)
  })

  it('renderiza SearchMobile', () => {
    render(<Search close={mockClose} />)
    expect(screen.getByTestId('search-mobile')).toBeInTheDocument()
  })

  it('muestra mensaje de búsqueda sin resultados', async () => {
    render(<Search close={mockClose} />)
    const input = screen.getByPlaceholderText(/¿Qué estás buscando?/i)
    
    fireEvent.change(input, { target: { value: 'producto inexistente xyz' } })
    
    await waitFor(() => {
      expect(screen.getByText(/No hay resultados/i)).toBeInTheDocument()
    }, { timeout: 1000 })
  })
})
