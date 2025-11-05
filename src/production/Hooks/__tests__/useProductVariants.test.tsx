import { act, renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import useProductVariants from '../useProductVariants'
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

jest.mock('@/lib/product-variants', () => ({
  createNewProductVariant: jest.fn(),
  deleteOldProductVariant: jest.fn(),
  updateOldProductVariant: jest.fn(),
}))

const {
  getProducts,
  getProductById,
  createNewProduct,
  updateOfProduct,
} = jest.requireMock('@/lib/products.api') as jest.Mocked<
  typeof import('@/lib/products.api')
>

const {
  createNewProductVariant,
  deleteOldProductVariant,
  updateOldProductVariant,
} = jest.requireMock('@/lib/product-variants') as jest.Mocked<
  typeof import('@/lib/product-variants')
>

const baseDate = new Date('2024-01-01T00:00:00Z')

const buildProduct = (overrides?: Partial<Product>): Product => ({
  id: 'product-1',
  name: 'Producto Base',
  slug: 'producto-base',
  description: 'Producto variante base',
  brandId: 'brand-1',
  categoryId: 'category-1',
  basePrice: 1000,
  status: ProductStatusString.ACTIVE,
  variants: [
    {
      id: 'variant-1',
      productId: 'product-1',
      colorId: 'color-1',
      sku: 'SKU-1',
      barcode: 'BAR-1',
      size: Size.M,
      price: 1200,
      stock: 10,
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
      productId: 'product-1',
      variantId: 'variant-1',
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

describe('useProductVariants hook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('obtiene variantes de productos y producto por id', async () => {
    const product = buildProduct()
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
    const { result } = renderHook(() => useProductVariants('product-1'), {
      wrapper,
    })

    await waitFor(() => expect(result.current.productVariant.isSuccess).toBe(true))
    await waitFor(() => expect(result.current.productVariantById.isSuccess).toBe(true))

    expect(result.current.productVariant.data?.products[0].id).toBe('product-1')
    expect(result.current.productVariantById.data?.id).toBe('product-1')
  })

  it('crea un producto y agrega a la cache', async () => {
    const product = buildProduct()
    getProducts.mockResolvedValueOnce({
      page: 1,
      limit: 20,
      total: 0,
      totalPages: 1,
      prevPage: false,
      nextPage: false,
      products: [],
    })
    createNewProduct.mockResolvedValue(product)

    const { wrapper, queryClient } = createWrapper()
    const { result } = renderHook(() => useProductVariants(undefined, {}), {
      wrapper,
    })

    await waitFor(() => expect(result.current.productVariant.isSuccess).toBe(true))

    queryClient.setQueryData(['productVariants', 'product-1'], {
      variants: product.variants,
    })

    queryClient.setQueryData(['products', {}], result.current.productVariant.data)

    await act(async () => {
      await result.current.createProduct.mutateAsync({
        name: 'Nuevo',
        basePrice: 1200,
        status: ProductStatusString.ACTIVE,
      } as any)
    })

    const cached = queryClient.getQueryData<any>(['products', {}])
    expect(cached?.products.some((p: any) => p.id === 'product-1')).toBe(true)
  })

  it('actualiza un producto e invalida queries', async () => {
    const product = buildProduct({ id: 'product-2', slug: 'producto-2' })
    getProducts.mockResolvedValue({
      page: 1,
      limit: 20,
      total: 1,
      totalPages: 1,
      prevPage: false,
      nextPage: false,
      products: [product],
    })
    updateOfProduct.mockResolvedValue(product)

    const { wrapper, queryClient } = createWrapper()
    const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries')

    const { result } = renderHook(() => useProductVariants('product-2', {}), {
      wrapper,
    })

    await waitFor(() => expect(result.current.productVariant.isSuccess).toBe(true))

    queryClient.setQueryData(['products', {}], result.current.productVariant.data)

    await act(async () => {
      await result.current.updateProduct.mutateAsync({
        id: 'product-2',
        product: {
          name: 'Actualizado',
          basePrice: 1400,
          status: ProductStatusString.ACTIVE,
        } as any,
      })
    })

    expect(updateOfProduct).toHaveBeenCalledWith(
      'product-2',
      expect.objectContaining({ name: 'Actualizado' })
    )
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['products', {}] })
  })

  it('crea una variante y la agrega en cache', async () => {
    const product = buildProduct()
    getProducts.mockResolvedValue({
      page: 1,
      limit: 20,
      total: 1,
      totalPages: 1,
      prevPage: false,
      nextPage: false,
      products: [product],
    })
    createNewProductVariant.mockResolvedValue({
      id: 'variant-2',
      productId: 'product-1',
      size: Size.L,
      price: 1100,
    } as any)

    const { wrapper, queryClient } = createWrapper()
    const { result } = renderHook(() => useProductVariants(undefined, {}), {
      wrapper,
    })

    await waitFor(() => expect(result.current.productVariant.isSuccess).toBe(true))

    queryClient.setQueryData(['productVariants', 'product-1'], {
      variants: product.variants,
    })

    queryClient.setQueryData(['products', {}], result.current.productVariant.data)

    await act(async () => {
      await result.current.createProductVariant.mutateAsync({
        productId: 'product-1',
        size: Size.L,
        price: 1100,
        colorId: 'color-2',
        sku: 'SKU-2',
        barcode: 'BAR-2',
      } as any)
    })

    await waitFor(() => {
      const cachedVariants = queryClient.getQueryData<any>(['productVariants', 'product-1'])
      expect(cachedVariants?.variants?.some((v: any) => v.id === 'variant-2')).toBe(true)
    })
  })

  it('actualiza una variante e invalida queries', async () => {
    const product = buildProduct()
    getProducts.mockResolvedValue({
      page: 1,
      limit: 20,
      total: 1,
      totalPages: 1,
      prevPage: false,
      nextPage: false,
      products: [product],
    })

    updateOldProductVariant.mockResolvedValue({
      variant: {
        id: 'variant-1',
        productId: 'product-1',
        size: Size.M,
        price: 1300,
      },
    } as any)

    const { wrapper, queryClient } = createWrapper()
    const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries')

    const { result } = renderHook(() => useProductVariants('product-1', {}), {
      wrapper,
    })

    await waitFor(() => expect(result.current.productVariant.isSuccess).toBe(true))

    queryClient.setQueryData(['productVariants', 'product-1'], {
      variants: product.variants,
    })

    queryClient.setQueryData(['products', {}], result.current.productVariant.data)

    await act(async () => {
      await result.current.updateProductVariant.mutateAsync({
        id: 'variant-1',
        productVariant: {
          size: Size.M,
          price: 1300,
          colorId: 'color-1',
          sku: 'SKU-1',
        } as any,
      })
    })

    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['products'] })
    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: ['productVariants', 'product-1'],
    })
  })

  it('elimina una variante e invalida queries', async () => {
    getProducts.mockResolvedValue({
      page: 1,
      limit: 20,
      total: 1,
      totalPages: 1,
      prevPage: false,
      nextPage: false,
      products: [buildProduct()],
    })
    deleteOldProductVariant.mockResolvedValue({ success: true } as any)

    const { wrapper, queryClient } = createWrapper()
    const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries')

    const { result } = renderHook(() => useProductVariants('product-1', {}), {
      wrapper,
    })

    await waitFor(() => expect(result.current.productVariant.isSuccess).toBe(true))

    queryClient.setQueryData(['productVariants', 'product-1'], {
      variants: result.current.productVariantById.data?.variants ?? [],
    })

    queryClient.setQueryData(['products', {}], result.current.productVariant.data)

    await act(async () => {
      await result.current.deleteProductVariant.mutateAsync('variant-1')
    })

    expect(deleteOldProductVariant).toHaveBeenCalledWith('variant-1')
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['products'] })
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['productVariants', 'product-1'] })
  })
})
