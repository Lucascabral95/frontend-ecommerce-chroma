import { render, screen, fireEvent, within } from '@testing-library/react'
import CartCard from '@/production/Cart/EstructureCart/CartCard/CartCard'

// Mock next/image como <img> nativo y next/link como <a>
jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line jsx-a11y/alt-text
  default: (props: any) => <img {...props} />,
}))
jest.mock('next/link', () => {
  // eslint-disable-next-line react/display-name
  return function MockLink(props: { href: string; children: React.ReactNode; className?: string }) {
    const { href, children, ...rest } = props
    return <a href={href} {...rest}>{children}</a>
  }
})

// Mock de Table: renderiza una tabla simple para facilitar aserciones
jest.mock('@/production/Table/Table', () => {
  return function MockTable({ headers, data, renderRow }: any) {
    return (
      <table>
        <thead>
          <tr>
            {headers.map((h: string, i: number) => <th key={i}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((item: any, idx: number) => <tr key={idx}>{renderRow(item)}</tr>)}
        </tbody>
      </table>
    )
  }
})

const cartItemsMock = {
  id: 'cart-1',
  items: [
    {
      id: 'i1',
      quantity: 1,
      variant: {
        size: 'M',
        price: 1200,
        product: { id: 'p1', name: 'Remera', images: [{ url: '/img/p1.webp' }] },
      },
    },
    {
      id: 'i2',
      quantity: 2,
      variant: {
        size: '42',
        price: 1500,
        product: { id: 'p2', name: 'Zapatillas', images: [{ url: '/img/p2.webp' }] },
      },
    },
  ],
} as any

describe('CartCard (básico)', () => {
  const inc = jest.fn()
  const dec = jest.fn()
  const rm = jest.fn()

  beforeEach(() => {
    inc.mockClear()
    dec.mockClear()
    rm.mockClear()
  })

  it('renderiza headers y filas', () => {
    const { container } = render(
      <CartCard
        cartItems={cartItemsMock}
        aumentQuantity={inc}
        decrementQuantity={dec}
        handleRemoveItem={rm}
        checkout={() => {}}
      />
    )

    // Headers
    expect(screen.getByText('Producto')).toBeInTheDocument()
    expect(screen.getByText('Precio')).toBeInTheDocument()
    expect(screen.getByText('Cantidad')).toBeInTheDocument()
    expect(screen.getByText('Subtotal')).toBeInTheDocument()

    // Filas (por nombre de producto)
    expect(screen.getAllByText('Remera').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Zapatillas').length).toBeGreaterThan(0)

    // Imágenes como <img>
    const imgs = container.querySelectorAll('img')
    expect(imgs.length).toBeGreaterThan(0)
  })

  it('calcula y muestra subtotales por ítem', () => {
    render(
      <CartCard
        cartItems={cartItemsMock}
        aumentQuantity={inc}
        decrementQuantity={dec}
        handleRemoveItem={rm}
        checkout={() => {}}
      />
    )
    // i1: 1200 * 1 = 1200
    expect(screen.getAllByText('1200').length).toBeGreaterThan(0)
    // i2: 1500 * 2 = 3000
    expect(screen.getAllByText('3000').length).toBeGreaterThan(0)
  })

  it('los links apuntan a /product/:id por imagen y título', () => {
    render(
      <CartCard
        cartItems={cartItemsMock}
        aumentQuantity={inc}
        decrementQuantity={dec}
        handleRemoveItem={rm}
        checkout={() => {}}
      />
    )
    const links = screen.getAllByRole('link')
    expect(links.some(a => (a as HTMLAnchorElement).href.includes('/product/p1'))).toBe(true)
    expect(links.some(a => (a as HTMLAnchorElement).href.includes('/product/p2'))).toBe(true)
  })

  it('decrementQuantity se llama al clickear el icono de restar', () => {
    const { container } = render(
      <CartCard
        cartItems={cartItemsMock}
        aumentQuantity={inc}
        decrementQuantity={dec}
        handleRemoveItem={rm}
        checkout={() => {}}
      />
    )
    const rows = container.querySelectorAll('tr')
    // En la primera fila, busca el contenedor de cantidad
    const firstRow = rows[1] as HTMLTableRowElement
    const quantityDiv = firstRow.querySelector('.quantity-button') as HTMLElement
    const icons = quantityDiv.querySelectorAll('.icono')
    // El primer .icono es decrement
    fireEvent.click(icons[0] as HTMLElement)
    expect(dec).toHaveBeenCalledWith('i1')
  })

  it('aumentQuantity se llama al clickear el icono de sumar', () => {
    const { container } = render(
      <CartCard
        cartItems={cartItemsMock}
        aumentQuantity={inc}
        decrementQuantity={dec}
        handleRemoveItem={rm}
        checkout={() => {}}
      />
    )
    const rows = container.querySelectorAll('tr')
    const firstRow = rows[1] as HTMLTableRowElement
    const quantityDiv = firstRow.querySelector('.quantity-button') as HTMLElement
    const icons = quantityDiv.querySelectorAll('.icono')
    // El segundo .icono es increment
    fireEvent.click(icons[1] as HTMLElement)
    expect(inc).toHaveBeenCalledWith('i1')
  })

  it('handleRemoveItem se llama al clickear el icono de trash (desktop)', () => {
    const { container } = render(
      <CartCard
        cartItems={cartItemsMock}
        aumentQuantity={inc}
        decrementQuantity={dec}
        handleRemoveItem={rm}
        checkout={() => {}}
      />
    )
    // La celda con clase .trash en la primera fila
    const rows = container.querySelectorAll('tr')
    const firstRow = rows[1] as HTMLTableRowElement
    const trashCell = firstRow.querySelector('.trash') as HTMLElement
    fireEvent.click(trashCell)
    expect(rm).toHaveBeenCalledWith('i1')
  })
})
