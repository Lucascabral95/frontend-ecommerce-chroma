import { render, screen, fireEvent } from '@testing-library/react'
import MethodsPayments from './MethodsPayments'

describe('MethodsPayments (básico)', () => {
  it('renderiza sin crashear', () => {
    const { container } = render(<MethodsPayments />)
    expect(container).toBeInTheDocument()
  })

  it('renderiza el contenedor methods-payments', () => {
    const { container } = render(<MethodsPayments />)
    const container_ = container.querySelector('.methods-payments')
    expect(container_).toBeInTheDocument()
  })

  it('renderiza tres métodos de servicio', () => {
    const { container } = render(<MethodsPayments />)
    const methods = container.querySelectorAll('.method-service')
    expect(methods).toHaveLength(3)
  })

  it('muestra el título "Métodos de pago"', () => {
    render(<MethodsPayments />)
    expect(screen.getByText('Métodos de pago')).toBeInTheDocument()
  })

  it('muestra el título "Método de envío"', () => {
    render(<MethodsPayments />)
    expect(screen.getByText('Método de envío')).toBeInTheDocument()
  })

  it('muestra el título "Método de cambio"', () => {
    render(<MethodsPayments />)
    expect(screen.getByText('Método de cambio')).toBeInTheDocument()
  })

  it('renderiza los detalles cuando se hace clic en métodos de pago', () => {
    render(<MethodsPayments />)
    const paymentMethod = screen.getByText('Métodos de pago').closest('.icon-name-close')
    fireEvent.click(paymentMethod as HTMLElement)
    expect(screen.getByText(/Aceptamos Mercado Pago/)).toBeInTheDocument()
  })

  it('renderiza los detalles cuando se hace clic en método de envío', () => {
    render(<MethodsPayments />)
    const shippingMethod = screen.getByText('Método de envío').closest('.icon-name-close')
    fireEvent.click(shippingMethod as HTMLElement)
    expect(screen.getByText(/Realizamos envíos a todo el país/)).toBeInTheDocument()
  })

  it('renderiza los detalles cuando se hace clic en método de cambio', () => {
    render(<MethodsPayments />)
    const exchangeMethod = screen.getByText('Método de cambio').closest('.icon-name-close')
    fireEvent.click(exchangeMethod as HTMLElement)
    expect(screen.getByText(/Para realizar un cambio de producto/)).toBeInTheDocument()
  })

  it('cierra la descripción cuando se hace clic nuevamente', () => {
    render(<MethodsPayments />)
    const paymentMethod = screen.getByText('Métodos de pago').closest('.icon-name-close')
    
    // Abrir
    fireEvent.click(paymentMethod as HTMLElement)
    expect(screen.getByText(/Aceptamos Mercado Pago/)).toBeInTheDocument()
    
    // Cerrar
    fireEvent.click(paymentMethod as HTMLElement)
    expect(screen.queryByText(/Aceptamos Mercado Pago/)).not.toBeInTheDocument()
  })

  it('muestra solo una descripción abierta a la vez', () => {
    render(<MethodsPayments />)
    const paymentMethod = screen.getByText('Métodos de pago').closest('.icon-name-close')
    const shippingMethod = screen.getByText('Método de envío').closest('.icon-name-close')
    
    // Abrir pago
    fireEvent.click(paymentMethod as HTMLElement)
    expect(screen.getByText(/Aceptamos Mercado Pago/)).toBeInTheDocument()
    
    // Abrir envío (debe cerrar pago)
    fireEvent.click(shippingMethod as HTMLElement)
    expect(screen.queryByText(/Aceptamos Mercado Pago/)).not.toBeInTheDocument()
    expect(screen.getByText(/Realizamos envíos a todo el país/)).toBeInTheDocument()
  })

  it('todos los métodos empiezan cerrados', () => {
    render(<MethodsPayments />)
    const descriptions = screen.queryAllByText(/Aceptamos Mercado Pago|Realizamos envíos|Para realizar un cambio/)
    expect(descriptions).toHaveLength(0)
  })

  it('tiene clase icon-name-close en el contenedor clickeable', () => {
    const { container } = render(<MethodsPayments />)
    const clickables = container.querySelectorAll('.icon-name-close')
    expect(clickables).toHaveLength(3)
  })

  it('tiene clase icono-details_name en el contenedor de ícono y nombre', () => {
    const { container } = render(<MethodsPayments />)
    const iconNameContainers = container.querySelectorAll('.icono-details_name')
    expect(iconNameContainers).toHaveLength(3)
  })

  it('tiene clase icono-close en el contenedor del ícono de flecha', () => {
    const { container } = render(<MethodsPayments />)
    const closeIconContainers = container.querySelectorAll('.icono-close')
    expect(closeIconContainers).toHaveLength(3)
  })

  it('renderiza los íconos de cada método', () => {
    const { container } = render(<MethodsPayments />)
    const icons = container.querySelectorAll('.icono')
    expect(icons.length).toBeGreaterThanOrEqual(3)
  })

  it('la descripción tiene la clase description cuando está abierta', () => {
    const { container } = render(<MethodsPayments />)
    const paymentMethod = screen.getByText('Métodos de pago').closest('.icon-name-close')
    fireEvent.click(paymentMethod as HTMLElement)
    
    const description = container.querySelector('.description')
    expect(description).toBeInTheDocument()
  })

  it('contiene información sobre Mercado Pago en detalles de pago', () => {
    render(<MethodsPayments />)
    const paymentMethod = screen.getByText('Métodos de pago').closest('.icon-name-close')
    fireEvent.click(paymentMethod as HTMLElement)
    
    expect(screen.getByText(/Mercado Pago/)).toBeInTheDocument()
    expect(screen.getByText(/12 cuotas sin interés/)).toBeInTheDocument()
  })

  it('contiene información sobre TREGGO en detalles de envío', () => {
    render(<MethodsPayments />)
    const shippingMethod = screen.getByText('Método de envío').closest('.icon-name-close')
    fireEvent.click(shippingMethod as HTMLElement)
    
    expect(screen.getByText(/TREGGO|ANDREANI|OCA/)).toBeInTheDocument()
  })

  it('contiene información sobre 30 días en detalles de cambio', () => {
    render(<MethodsPayments />)
    const exchangeMethod = screen.getByText('Método de cambio').closest('.icon-name-close')
    fireEvent.click(exchangeMethod as HTMLElement)
    
    expect(screen.getByText(/30 días/)).toBeInTheDocument()
  })
})
