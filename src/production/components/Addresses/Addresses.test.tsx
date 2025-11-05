import { render, screen } from '@testing-library/react'
import Addresses from './Addresses'

describe('Addresses (básico)', () => {
  const addressMock = {
    firstName: 'Juan',
    lastName: 'Pérez',
    phone: '1234567890',
    street1: 'Calle Principal 123',
    city: 'Buenos Aires',
    state: 'CABA',
    postalCode: '1425',
    country: 'Argentina',
  }

  it('renderiza sin crashear', () => {
    const { container } = render(
      <Addresses address={addressMock} index={1} />
    )
    expect(container).toBeInTheDocument()
  })

  it('muestra el número de dirección', () => {
    render(<Addresses address={addressMock} index={1} />)
    expect(screen.getByText('Dirección 1')).toBeInTheDocument()
  })

  it('muestra el nombre y apellido completo', () => {
    render(<Addresses address={addressMock} index={1} />)
    expect(screen.getByText('Juan Pérez')).toBeInTheDocument()
  })

  it('muestra el teléfono', () => {
    render(<Addresses address={addressMock} index={1} />)
    expect(screen.getByText('1234567890')).toBeInTheDocument()
  })

  it('muestra la calle', () => {
    render(<Addresses address={addressMock} index={1} />)
    expect(screen.getByText('Calle Principal 123')).toBeInTheDocument()
  })

  it('muestra la ciudad', () => {
    render(<Addresses address={addressMock} index={1} />)
    const cityText = screen.getByText(/Ciudad:/).parentElement
    expect(cityText).toHaveTextContent('Buenos Aires')
  })

  it('muestra la provincia', () => {
    render(<Addresses address={addressMock} index={1} />)
    const stateText = screen.getByText(/Provincia:/).parentElement
    expect(stateText).toHaveTextContent('CABA')
  })

  it('muestra el código postal', () => {
    render(<Addresses address={addressMock} index={1} />)
    expect(screen.getByText('1425')).toBeInTheDocument()
  })

  it('muestra el país', () => {
    render(<Addresses address={addressMock} index={1} />)
    expect(screen.getByText('Argentina')).toBeInTheDocument()
  })

  it('renderiza el card address', () => {
    const { container } = render(
      <Addresses address={addressMock} index={1} />
    )
    const card = container.querySelector('.card-address')
    expect(card).toBeInTheDocument()
  })

  it('renderiza todos los labels correctamente', () => {
    render(<Addresses address={addressMock} index={1} />)
    expect(screen.getByText(/Nombre y apellido:/)).toBeInTheDocument()
    expect(screen.getByText(/Teléfono:/)).toBeInTheDocument()
    expect(screen.getByText(/Calle:/)).toBeInTheDocument()
    expect(screen.getByText(/Ciudad:/)).toBeInTheDocument()
    expect(screen.getByText(/Provincia:/)).toBeInTheDocument()
    expect(screen.getByText(/Código postal:/)).toBeInTheDocument()
    expect(screen.getByText(/País:/)).toBeInTheDocument()
  })
})
