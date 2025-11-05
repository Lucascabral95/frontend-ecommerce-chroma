import { render, screen, fireEvent } from '@testing-library/react'
import Modal from '@/production/Cart/Modal/Modal'

// Mock del store de cart para controlar el estado en el test
jest.mock('@/lib/zustand/CartZustand', () => ({
  useCartStore: () => ({
    cart: [
      { id: 'p1', name: 'Prod 1', qty: 1, price: 1000 },
      { id: 'p2', name: 'Prod 2', qty: 2, price: 2000 },
    ],
  }),
}))

// Mock del hijo que renderiza el contenido del carrito para simplificar
jest.mock('@/production/Cart/EstructureCart/EstructureCartMobile', () => {
  return function MockEstructureCartMobile() {
    return <div data-testid="cart-mobile">Cart Mobile Content</div>
  }
})

describe('Modal (básico)', () => {
  it('renderiza sin crashear y muestra el contenido del carrito', () => {
    render(<Modal />)
    expect(screen.getByText(/Mi carrito/i)).toBeInTheDocument()
    expect(screen.getByTestId('cart-mobile')).toBeInTheDocument()
  })

  it('llama a close al hacer click fuera del contenedor', () => {
    const onClose = jest.fn()
    render(<Modal close={onClose} />)

    // click en overlay (div.modal-cart)
    const overlay = document.querySelector('.modal-cart') as HTMLElement
    fireEvent.click(overlay)

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('no llama a close al clickear dentro del contenedor', () => {
    const onClose = jest.fn()
    render(<Modal close={onClose} />)

    // click en el contenedor interno
    const container = document.querySelector('.modal-cart__container') as HTMLElement
    fireEvent.click(container)

    expect(onClose).not.toHaveBeenCalled()
  })

  it('los iconos de cerrar invocan close', () => {
    const onClose = jest.fn()
    render(<Modal close={onClose} />)

    // back arrow
    const backIcon = document.querySelector('.icon-back') as HTMLElement
    fireEvent.click(backIcon)
    // close X
    const closeIcon = document.querySelector('.icon') as HTMLElement
    fireEvent.click(closeIcon)

    expect(onClose).toHaveBeenCalledTimes(2)
  })
})
