import { render, screen } from '@testing-library/react'
import EstructureCartCheckoutProfile from './EstructureCartCheckoutProfile'

jest.mock('@/production/Section/SectionStructure', () => {
  return function Mock({ children, background }: any) {
    return (
      <div data-testid="section-structure" style={{ background }}>
        {children}
      </div>
    )
  }
})

jest.mock('@/Shared/Components/Toast', () => {
  return function Mock({ message, error }: any) {
    return (
      <div data-testid="toast" data-error={error}>
        {message}
      </div>
    )
  }
})

describe('EstructureCartCheckoutProfile (básico)', () => {
  it('renderiza sin crashear', () => {
    const { container } = render(
      <EstructureCartCheckoutProfile title="Checkout">
        <div>Contenido</div>
      </EstructureCartCheckoutProfile>
    )
    expect(container).toBeInTheDocument()
  })

  it('renderiza SectionStructure', () => {
    render(
      <EstructureCartCheckoutProfile title="Checkout">
        <div>Contenido</div>
      </EstructureCartCheckoutProfile>
    )
    expect(screen.getByTestId('section-structure')).toBeInTheDocument()
  })

  it('renderiza el contenedor estructure-cart-checkout-profile', () => {
    const { container } = render(
      <EstructureCartCheckoutProfile title="Checkout">
        <div>Contenido</div>
      </EstructureCartCheckoutProfile>
    )
    const estructura = container.querySelector('.estructure-cart-checkout-profile')
    expect(estructura).toBeInTheDocument()
  })

  it('renderiza el título correctamente', () => {
    render(
      <EstructureCartCheckoutProfile title="Mi Checkout">
        <div>Contenido</div>
      </EstructureCartCheckoutProfile>
    )
    expect(screen.getByText('Mi Checkout')).toBeInTheDocument()
  })

  it('tiene h2 con clase title-text', () => {
    const { container } = render(
      <EstructureCartCheckoutProfile title="Checkout">
        <div>Contenido</div>
      </EstructureCartCheckoutProfile>
    )
    const titleHeading = container.querySelector('h2.title-text')
    expect(titleHeading).toBeInTheDocument()
  })

  it('renderiza los children correctamente', () => {
    render(
      <EstructureCartCheckoutProfile title="Checkout">
        <div>Mi contenido especial</div>
      </EstructureCartCheckoutProfile>
    )
    expect(screen.getByText('Mi contenido especial')).toBeInTheDocument()
  })

  it('renderiza múltiples children', () => {
    render(
      <EstructureCartCheckoutProfile title="Checkout">
        <div>Contenido 1</div>
        <div>Contenido 2</div>
        <div>Contenido 3</div>
      </EstructureCartCheckoutProfile>
    )
    expect(screen.getByText('Contenido 1')).toBeInTheDocument()
    expect(screen.getByText('Contenido 2')).toBeInTheDocument()
    expect(screen.getByText('Contenido 3')).toBeInTheDocument()
  })

  it('no renderiza Toast cuando no hay mensaje', () => {
    render(
      <EstructureCartCheckoutProfile title="Checkout">
        <div>Contenido</div>
      </EstructureCartCheckoutProfile>
    )
    expect(screen.queryByTestId('toast')).not.toBeInTheDocument()
  })

  it('renderiza Toast cuando hay mensaje', () => {
    render(
      <EstructureCartCheckoutProfile
        title="Checkout"
        toast={{ message: 'Operación exitosa', error: false }}
      >
        <div>Contenido</div>
      </EstructureCartCheckoutProfile>
    )
    expect(screen.getByTestId('toast')).toBeInTheDocument()
    expect(screen.getByText('Operación exitosa')).toBeInTheDocument()
  })

  it('pasa error=false al Toast cuando no es error', () => {
    render(
      <EstructureCartCheckoutProfile
        title="Checkout"
        toast={{ message: 'Éxito', error: false }}
      >
        <div>Contenido</div>
      </EstructureCartCheckoutProfile>
    )
    const toast = screen.getByTestId('toast')
    expect(toast).toHaveAttribute('data-error', 'false')
  })

  it('pasa error=true al Toast cuando es error', () => {
    render(
      <EstructureCartCheckoutProfile
        title="Checkout"
        toast={{ message: 'Error', error: true }}
      >
        <div>Contenido</div>
      </EstructureCartCheckoutProfile>
    )
    const toast = screen.getByTestId('toast')
    expect(toast).toHaveAttribute('data-error', 'true')
  })

  it('no renderiza Toast cuando mensaje está vacío', () => {
    render(
      <EstructureCartCheckoutProfile
        title="Checkout"
        toast={{ message: '', error: false }}
      >
        <div>Contenido</div>
      </EstructureCartCheckoutProfile>
    )
    expect(screen.queryByTestId('toast')).not.toBeInTheDocument()
  })

  it('aplica background cuando se proporciona', () => {
    const { container } = render(
      <EstructureCartCheckoutProfile
        title="Checkout"
        background="lightblue"
      >
        <div>Contenido</div>
      </EstructureCartCheckoutProfile>
    )
    const estructura = container.querySelector('.estructure-cart-checkout-profile')
    expect(estructura).toHaveStyle('background: lightblue')
  })

  it('pasa background a SectionStructure', () => {
    const { container } = render(
      <EstructureCartCheckoutProfile
        title="Checkout"
        background="gray"
      >
        <div>Contenido</div>
      </EstructureCartCheckoutProfile>
    )
    const sectionStructure = container.querySelector('[data-testid="section-structure"]')
    expect(sectionStructure).toHaveStyle('background: gray')
  })

  it('no aplica background cuando no se proporciona', () => {
    const { container } = render(
      <EstructureCartCheckoutProfile title="Checkout">
        <div>Contenido</div>
      </EstructureCartCheckoutProfile>
    )
    const estructura = container.querySelector('.estructure-cart-checkout-profile')
    expect(estructura).toHaveStyle('background: ')
  })

  it('renderiza el contenedor __container', () => {
    const { container } = render(
      <EstructureCartCheckoutProfile title="Checkout">
        <div>Contenido</div>
      </EstructureCartCheckoutProfile>
    )
    const innerContainer = container.querySelector('.estructure-cart-checkout-profile__container')
    expect(innerContainer).toBeInTheDocument()
  })

  it('renderiza el contenedor cont', () => {
    const { container } = render(
      <EstructureCartCheckoutProfile title="Checkout">
        <div>Contenido</div>
      </EstructureCartCheckoutProfile>
    )
    const cont = container.querySelector('.cont')
    expect(cont).toBeInTheDocument()
  })

  it('renderiza el div title', () => {
    const { container } = render(
      <EstructureCartCheckoutProfile title="Checkout">
        <div>Contenido</div>
      </EstructureCartCheckoutProfile>
    )
    const titleDiv = container.querySelector('.title')
    expect(titleDiv).toBeInTheDocument()
  })

  it('renderiza Toast después del children', () => {
    const { container } = render(
      <EstructureCartCheckoutProfile
        title="Checkout"
        toast={{ message: 'Mensaje', error: false }}
      >
        <div data-testid="children">Contenido</div>
      </EstructureCartCheckoutProfile>
    )
    const children = screen.getByTestId('children')
    const toast = screen.getByTestId('toast')
    const cont = container.querySelector('.cont')
    
    expect(cont?.contains(children)).toBe(true)
    expect(cont?.contains(toast)).toBe(true)
  })

  it('maneja título vacío', () => {
  const { container } = render(
    <EstructureCartCheckoutProfile title="">
      <div>Contenido</div>
    </EstructureCartCheckoutProfile>
  )
  const h2 = container.querySelector('h2.title-text')
  expect(h2?.textContent?.trim()).toBe('')
})


  it('maneja contenido complejo', () => {
    render(
      <EstructureCartCheckoutProfile title="Checkout">
        <section>
          <h3>Sección 1</h3>
          <p>Párrafo</p>
        </section>
        <form>
          <input type="text" />
        </form>
      </EstructureCartCheckoutProfile>
    )
    expect(screen.getByText('Sección 1')).toBeInTheDocument()
    expect(screen.getByText('Párrafo')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })
})
