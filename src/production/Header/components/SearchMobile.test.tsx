import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SearchMobile from './SearchMobile'

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
}))

jest.mock('@/lib/products.api', () => ({
  getProducts: jest.fn(() =>
    Promise.resolve({
      products: [
        { id: 'p1', name: 'Producto 1', images: [{ url: '/img/p1.webp' }], basePrice: 1200 },
        { id: 'p2', name: 'Producto 2', images: [{ url: '/img/p2.webp' }], basePrice: 2500 },
      ],
    })
  ),
}))

describe('SearchMobile (básico)', () => {
  const mockClose = jest.fn()

  it('renderiza sin crashear', () => {
    const { container } = render(<SearchMobile close={mockClose} />)
    expect(container).toBeInTheDocument()
  })

  it('renderiza el input de búsqueda', () => {
    render(<SearchMobile close={mockClose} />)
    const input = screen.getByPlaceholderText(/¿Qué estás buscando?/i)
    expect(input).toBeInTheDocument()
  })

  it('actualiza el valor del input cuando se escribe', () => {
    render(<SearchMobile close={mockClose} />)
    const input = screen.getByPlaceholderText(/¿Qué estás buscando?/i) as HTMLInputElement
    
    fireEvent.change(input, { target: { value: 'remera' } })
    expect(input.value).toBe('remera')
  })

  it('muestra imágenes de oferta por defecto', () => {
    render(<SearchMobile close={mockClose} />)
    const images = document.querySelectorAll('.images .img')
    expect(images.length).toBeGreaterThan(0)
  })

  it('renderiza el icono de volver atrás', () => {
    render(<SearchMobile close={mockClose} />)
    const backIcon = document.querySelector('.searcher-icon-input .icono')
    expect(backIcon).toBeInTheDocument()
  })

  it('llama a close cuando se hace click en el icono de volver', () => {
    render(<SearchMobile close={mockClose} />)
    const backIcon = document.querySelector('.searcher-icon-input .icono')
    
    fireEvent.click(backIcon as HTMLElement)
    expect(mockClose).toHaveBeenCalled()
  })
})
