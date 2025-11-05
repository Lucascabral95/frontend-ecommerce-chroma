import { act, renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import useProducts from '../useProducts'
import {
  Product,
  ProductStatusString,
} from '@/Insfraestructure/Interfaces/products/product.interface'
import { Size } from '@/Insfraestructure/Interfaces/enums/enums-global.interface'

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  return { wrapper, queryClient }
}

jest.mock('@/lib/products.api', () => ({
  getProducts: jest.fn(),
  getProductById: jest.fn(),
  createNewProduct: jest.fn(),
  updateOfProduct: jest.fn(),
}))

const {
  getProducts,
  getProductById,
  createNewProduct,
  updateOfProduct,
} = jest.requireMock('@/lib/products.api') as jest.Mocked<
  typeof import('@/lib/products.api')
>

const baseDate = new Date('2024-01-01T00:00:00Z')

const buildProduct = (overrides?: Partial<Product>): Product => ({
  id: 'p-base',
  name: 'Default Product',
  slug: 'default-product',
  description: 'Descripción genérica',
  brandId: 'brand-1',
  categoryId: 'category-1',
  basePrice: 1000,
  status: ProductStatusString.ACTIVE,
  variants: [
    {
      id: 'v-1',
      productId: 'p-base',
      colorId: 'color-1',
      sku: 'SKU-1',
      barcode: 'BAR-1',
      size: Size.M,
      price: 1200,
      stock: 5,
      weightGrams: 500,
      createdAt: baseDate,
      updatedAt: baseDate,
    },
  ],
  images: [
    {
      id: 'img-1',
      url: '/img/product-1.webp',
      alt: 'Imagen producto',
      position: 1,
      productId: 'p-base',
      variantId: 'v-1',
      createdAt: baseDate,
    },
  ],
  tags: [
    {
      id: 'tag-1',
      name: 'nuevo',
      slug: 'nuevo',
    },
  ],
  createdAt: baseDate,
  updatedAt: baseDate,
  ...overrides,
})

describe('useProducts hook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('obtiene productos y producto por id', async () => {
    const product = buildProduct({ id: 'p1', name: 'Producto A', slug: 'producto-a' })
    getProducts.mockResolvedValue({
      page: 1,
      limit: 20,
      total: 1,
      totalPages: 1,
      prevPage: false,
      nextPage: false,
      products: [product],
    })
    getProductById.mockResolvedValue(product)

    const { wrapper } = createWrapper()
    const { result } = renderHook(() => useProducts('p1'), { wrapper })

    await waitFor(() => expect(result.current.products.isSuccess).toBe(true))
    await waitFor(() => expect(result.current.productById.isSuccess).toBe(true))

    expect(result.current.products.data?.products[0].id).toBe('p1')
    expect(result.current.productById.data?.id).toBe('p1')
  })

  it('crea un producto y lo agrega a la cache', async () => {
    const createdProduct = buildProduct({ id: 'p2', name: 'Producto B', slug: 'producto-b' })
    getProducts.mockResolvedValueOnce({
      page: 1,
      limit: 20,
      total: 0,
      totalPages: 1,
      prevPage: false,
      nextPage: false,
      products: [],
    })
    createNewProduct.mockResolvedValue(createdProduct)

    const { wrapper, queryClient } = createWrapper()
    const setQueryDataSpy = jest.spyOn(queryClient, 'setQueryData')
    const { result } = renderHook(() => useProducts(undefined, {}), {
      wrapper,
    })

    await waitFor(() => expect(result.current.products.isSuccess).toBe(true))

    await act(async () => {
      await result.current.createProduct.mutateAsync({
        name: 'Producto B',
        basePrice: 1000,
        status: ProductStatusString.ACTIVE,
      } as any)
    })

    expect(createNewProduct).toHaveBeenCalledWith({
      name: 'Producto B',
      basePrice: 1000,
      status: ProductStatusString.ACTIVE,
    })

    expect(setQueryDataSpy).toHaveBeenCalledWith(
      ['products', {}],
      expect.any(Function)
    )

    const [, updater] = setQueryDataSpy.mock.calls.find(
      (call) => Array.isArray(call[0]) && call[0][0] === 'products'
    ) as [any, (oldData: any) => any]

    const previous = {
      page: 1,
      limit: 20,
      total: 0,
      totalPages: 1,
      prevPage: false,
      nextPage: false,
      products: [],
    }

    const updated = updater(previous)
    expect(updated.products).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: 'p2' })])
    )
  })

  it('actualiza un producto e invalida la query', async () => {
    const product = buildProduct({ id: 'p3', name: 'Producto C', slug: 'producto-c' })
    getProducts.mockResolvedValue({
      page: 1,
      limit: 20,
      total: 1,
      totalPages: 1,
      prevPage: false,
      nextPage: false,
      products: [product],
    })
    updateOfProduct.mockResolvedValue(
      buildProduct({ id: 'p3', name: 'Producto Actualizado', slug: 'producto-actualizado' })
    )

    const { wrapper, queryClient } = createWrapper()
    const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries')

    const { result } = renderHook(() => useProducts('p3', {}), { wrapper })

    await waitFor(() => expect(result.current.products.isSuccess).toBe(true))

    await act(async () => {
      await result.current.updateProduct.mutateAsync({
        id: 'p3',
        product: {
          name: 'Producto Actualizado',
          basePrice: 1500,
          status: ProductStatusString.ACTIVE,
        } as any,
      })
    })

    expect(updateOfProduct).toHaveBeenCalledWith(
      'p3',
      expect.objectContaining({ name: 'Producto Actualizado' })
    )
    await waitFor(() => {
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['products', {}] })
    })
  })
})
