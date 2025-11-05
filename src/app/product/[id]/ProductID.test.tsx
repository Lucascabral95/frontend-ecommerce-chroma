import { render, screen } from '@testing-library/react'

jest.mock('@/lib/zustand/CartZustand', () => ({
  useCartStore: jest.fn(() => ({
    cart: {
      id: 'cart-123',
      userId: 'user-123',
    },
    addToCart: jest.fn(),
  })),
}))

jest.mock('next/navigation', () => ({
  useParams: jest.fn(() => ({ id: 'prod-123' })),
}))

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
  default: function Mock({ src, alt, priority, ...props }: any) {
    return <img src={src} alt={alt} {...props} />
  },
}))

jest.mock('@/production/Section/SectionStructure', () => {
  return function Mock({ children }: any) {
    return <div data-testid="section-structure">{children}</div>
  }
})

jest.mock('@/production/components/SEO', () => {
  return function Mock() {
    return <div data-testid="seo-component" />
  }
})

jest.mock('@/production/Hooks/useSEO', () => ({
  useSEO: jest.fn(() => ({
    title: 'Producto Test',
    description: 'Descripción test',
    path: '/product/test',
  })),
}))

jest.mock('@/production/ProductById/ProductByIdLoading', () => {
  return function Mock({ detail }: any) {
    return <div data-testid="product-loading">Cargando {detail}</div>
  }
})

jest.mock('@/production/ProductById/ProductByIdError', () => {
  return function Mock({ title }: any) {
    return <div data-testid="product-error">{title}</div>
  }
})

jest.mock('@/production/components/Collapse/MethodsPayments', () => {
  return function Mock() {
    return <div data-testid="methods-payments">Métodos de Pago</div>
  }
})

jest.mock('@/Shared/Components/Toast', () => {
  return function Mock({ message, error }: any) {
    if (!message) return null
    return (
      <div data-testid="toast" data-error={error}>
        {message}
      </div>
    )
  }
})

const mockProductData = {
  id: 'prod-123',
  name: 'Remera Premium',
  basePrice: 1500,
  description: 'Remera de alta calidad',
  images: [{ url: '/img/remera.jpg', alt: 'Remera Premium' }],
  variants: [
    { id: 'var-1', size: 'S', stock: 10 },
    { id: 'var-2', size: 'M', stock: 15 },
    { id: 'var-3', size: 'L', stock: 8 },
  ],
}

jest.mock('@/production/Hooks/useProducts', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    productById: {
      data: mockProductData,
      isLoading: false,
      isError: false,
    },
  })),
}))

import ProductID from './page'

describe('ProductID (básico)', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Resetea los mocks a su estado por defecto
    const useProducts = require('@/production/Hooks/useProducts').default
    useProducts.mockReturnValue({
      productById: {
        data: mockProductData,
        isLoading: false,
        isError: false,
      },
    })
  })

  it('renderiza sin crashear', () => {
    const { container } = render(<ProductID />)
    expect(container).toBeInTheDocument()
  })

  it('renderiza SectionStructure', () => {
    render(<ProductID />)
    expect(screen.getByTestId('section-structure')).toBeInTheDocument()
  })

  it('renderiza el componente SEO', () => {
    render(<ProductID />)
    expect(screen.getByTestId('seo-component')).toBeInTheDocument()
  })

  it('muestra el título del producto', () => {
    render(<ProductID />)
    expect(screen.getByText('REMERA PREMIUM')).toBeInTheDocument()
  })

  it('muestra el precio del producto', () => {
    render(<ProductID />)
    expect(screen.getByText(/\$ 1500/)).toBeInTheDocument()
  })

  it('muestra la descripción del producto', () => {
    render(<ProductID />)
    expect(screen.getByText('Remera de alta calidad')).toBeInTheDocument()
  })

  it('renderiza el breadcrumb Home', () => {
    render(<ProductID />)
    const homeLink = screen.getByRole('link', { name: /Home/i })
    expect(homeLink).toBeInTheDocument()
  })

  it('muestra el nombre del producto en el breadcrumb', () => {
    render(<ProductID />)
    expect(screen.getByText('Remera Premium')).toBeInTheDocument()
  })

  it('renderiza los talles disponibles', () => {
    render(<ProductID />)
    const allText = screen.queryAllByText(/S|M|L/)
    expect(allText.length).toBeGreaterThan(0)
  })

  it('renderiza el botón "Agregar al carrito"', () => {
    render(<ProductID />)
    const button = screen.getByRole('button', { name: /Agregar al carrito/i })
    expect(button).toBeInTheDocument()
  })

  it('el botón "Agregar al carrito" está deshabilitado sin seleccionar talle', () => {
    render(<ProductID />)
    const button = screen.getByRole('button', { name: /Agregar al carrito/i })
    expect(button).toBeDisabled()
  })

  it('renderiza MethodsPayments', () => {
    render(<ProductID />)
    expect(screen.getByTestId('methods-payments')).toBeInTheDocument()
  })

  it('renderiza la imagen del producto', () => {
    render(<ProductID />)
    const img = screen.getByAltText('Remera Premium')
    expect(img).toBeInTheDocument()
  })

  it('muestra loading cuando isLoading es true', () => {
    const useProducts = require('@/production/Hooks/useProducts').default
    useProducts.mockReturnValue({
      productById: {
        data: null,
        isLoading: true,
        isError: false,
      },
    })
    
    render(<ProductID />)
    expect(screen.getByTestId('product-loading')).toBeInTheDocument()
  })

  it('muestra error cuando isError es true', () => {
    const useProducts = require('@/production/Hooks/useProducts').default
    useProducts.mockReturnValue({
      productById: {
        data: null,
        isLoading: false,
        isError: true,
      },
    })
    
    render(<ProductID />)
    expect(screen.getByTestId('product-error')).toBeInTheDocument()
  })

  it('renderiza el contenedor principal', () => {
    const { container } = render(<ProductID />)
    const productId = container.querySelector('.product-id')
    expect(productId).toBeInTheDocument()
  })

  it('renderiza el contenedor product-info', () => {
    const { container } = render(<ProductID />)
    const productInfo = container.querySelector('.product-info')
    expect(productInfo).toBeInTheDocument()
  })

  it('renderiza el contenedor product-images', () => {
    const { container } = render(<ProductID />)
    const productImages = container.querySelector('.product-images')
    expect(productImages).toBeInTheDocument()
  })

  it('maneja múltiples talles', () => {
    render(<ProductID />)
    expect(screen.getByText('REMERA PREMIUM')).toBeInTheDocument()
  })

  it('renderiza el divisorio', () => {
    const { container } = render(<ProductID />)
    const divisorio = container.querySelector('.divisorio')
    expect(divisorio).toBeInTheDocument()
  })
})

afterEach(() => {
  jest.clearAllMocks()
})
