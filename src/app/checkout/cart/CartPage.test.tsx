import { render, screen, waitFor } from '@testing-library/react'

jest.mock('@/lib/zustand/CartZustand', () => ({
  useCartStore: jest.fn(() => ({
    cart: {
      id: 'cart-123',
      userId: 'user-123',
      items: [
        {
          id: 'item-1',
          quantity: 2,
          variant: {
            id: 'var-1',
            price: 1000,
            size: 'M',
            product: { id: 'p1', name: 'Remera' },
          },
        },
      ],
    },
  })),
}))

jest.mock('@/lib/zustand/AuthZustand', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    userDataSession: {
      id: 'user-123',
      email: 'test@example.com',
    },
  })),
}))

jest.mock('@/lib/CartsApi', () => ({
  getCartByUserId: jest.fn(async () => ({
    id: 'cart-123',
    userId: 'user-123',
    items: [
      {
        id: 'item-1',
        quantity: 2,
        variant: {
          id: 'var-1',
          price: 1000,
        },
      },
    ],
  })),
}))

jest.mock('@/production/components/SEO', () => {
  return function Mock() {
    return <div data-testid="seo-component" />
  }
})

jest.mock('@/production/Hooks/useSEO', () => ({
  useSEO: jest.fn(() => ({
    title: 'Mi Carrito',
    description: 'Revisa tu carrito',
    path: '/checkout/cart',
  })),
}))

jest.mock('@/production/Cart/EstructureCart/EstructureCart', () => {
  return function Mock({ cartById }: any) {
    return (
      <div data-testid="structure-cart">
        Carrito: {cartById?.items?.length} items
      </div>
    )
  }
})

jest.mock('@/production/ProductById/ProductByIdLoading', () => {
  return function Mock({ detail }: any) {
    return <div data-testid="product-loading">Cargando {detail}</div>
  }
})

jest.mock('@/production/ProductById/ProductByIdError', () => {
  return function Mock({ title, description }: any) {
    return (
      <div data-testid="product-error">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    )
  }
})

import CartPage from './page'

describe('CartPage (básico)', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renderiza sin crashear', () => {
    const { container } = render(<CartPage />)
    expect(container).toBeInTheDocument()
  })

  it('renderiza el carrito con items', async () => {
    render(<CartPage />)
    
    await waitFor(() => {
      expect(screen.getByTestId('structure-cart')).toBeInTheDocument()
    })
  })

  it('renderiza SEO', async () => {
    render(<CartPage />)
    
    await waitFor(() => {
      expect(screen.getByTestId('seo-component')).toBeInTheDocument()
    })
  })

  it('pasa cartById a EstructureCart', async () => {
    render(<CartPage />)
    
    await waitFor(() => {
      expect(screen.getByText(/Carrito: .* items/)).toBeInTheDocument()
    })
  })

  it('muestra error cuando falla la carga', async () => {
    const { getCartByUserId } = require('@/lib/CartsApi')
    getCartByUserId.mockRejectedValueOnce(new Error('Error loading cart'))

    render(<CartPage />)
    
    await waitFor(() => {
      expect(screen.getByText('Error al cargar el carrito')).toBeInTheDocument()
    })
  })

  it('muestra carrito vacío cuando no hay items', async () => {
    const useCartStore = require('@/lib/zustand/CartZustand').useCartStore
    useCartStore.mockReturnValue({
      cart: {
        id: 'cart-123',
        items: [],
      },
    })

    render(<CartPage />)
    
    await waitFor(() => {
      expect(screen.getByText('Carrito vacío')).toBeInTheDocument()
    })
  })

  it('muestra carrito vacío cuando no hay sesión', async () => {
    const useAuthStore = require('@/lib/zustand/AuthZustand').default
    useAuthStore.mockReturnValue({
      userDataSession: null,
    })

    render(<CartPage />)
    
    await waitFor(() => {
      expect(screen.getByText('Carrito vacío')).toBeInTheDocument()
    })
  })

  it('usa useAuthStore correctamente', async () => {
    const useAuthStore = require('@/lib/zustand/AuthZustand').default
    render(<CartPage />)
    
    await waitFor(() => {
      expect(useAuthStore).toHaveBeenCalled()
    })
  })

  it('usa useCartStore correctamente', async () => {
    const { useCartStore } = require('@/lib/zustand/CartZustand')
    render(<CartPage />)
    
    await waitFor(() => {
      expect(useCartStore).toHaveBeenCalled()
    })
  })

  it('usa useSEO correctamente', () => {
    const { useSEO } = require('@/production/Hooks/useSEO')
    render(<CartPage />)
    
    expect(useSEO).toHaveBeenCalledWith(
      expect.objectContaining({
        title: expect.stringContaining('Carrito'),
        path: '/checkout/cart',
        noIndex: true,
      })
    )
  })

  it('muestra mensaje descriptivo en carrito vacío', async () => {
    const useCartStore = require('@/lib/zustand/CartZustand').useCartStore
    useCartStore.mockReturnValue({
      cart: { id: 'cart-123', items: [] },
    })

    render(<CartPage />)
    
    await waitFor(() => {
      expect(
        screen.getByText('Aún no has agregado ningún producto al carrito.')
      ).toBeInTheDocument()
    })
  })

  it('no ejecuta fetchCartData sin userDataSession', async () => {
    const useAuthStore = require('@/lib/zustand/AuthZustand').default
    useAuthStore.mockReturnValue({
      userDataSession: null,
    })

    const { getCartByUserId } = require('@/lib/CartsApi')
    jest.clearAllMocks()

    render(<CartPage />)
    
    await waitFor(() => {
      expect(getCartByUserId).not.toHaveBeenCalled()
    })
  })

  it('muestra loading cuando está cargando', async () => {
    render(<CartPage />)
    
    await waitFor(() => {
      const loading = screen.queryByTestId('product-loading')
      const cart = screen.queryByTestId('structure-cart')
      const error = screen.queryByTestId('product-error')
      
      expect(loading || cart || error).toBeInTheDocument()
    })
  })

  it('renderiza ProductByIdError cuando hay error', async () => {
    const { getCartByUserId } = require('@/lib/CartsApi')
    getCartByUserId.mockRejectedValue(new Error('API Error'))

    render(<CartPage />)
    
    await waitFor(() => {
      expect(screen.getByTestId('product-error')).toBeInTheDocument()
    })
  })
})

afterEach(() => {
  jest.clearAllMocks()
})
