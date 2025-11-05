import { render, screen } from '@testing-library/react'
import AddressList from './AddressList'

describe('AddressList (básico)', () => {
  const addressesMock = [
    {
      firstName: 'Juan',
      lastName: 'Pérez',
      phone: '1234567890',
      street1: 'Calle Principal 123',
      city: 'Buenos Aires',
      state: 'CABA',
      postalCode: '1425',
      country: 'Argentina',
    },
    {
      firstName: 'María',
      lastName: 'González',
      phone: '0987654321',
      street1: 'Avenida Secundaria 456',
      city: 'Córdoba',
      state: 'Córdoba',
      postalCode: '5000',
      country: 'Argentina',
    },
  ]

  it('renderiza sin crashear', () => {
    const { container } = render(<AddressList addresses={addressesMock} />)
    expect(container).toBeInTheDocument()
  })

  it('renderiza el contenedor address-list-container', () => {
    const { container } = render(<AddressList addresses={addressesMock} />)
    const listContainer = container.querySelector('.address-list-container')
    expect(listContainer).toBeInTheDocument()
  })

  it('renderiza todas las direcciones', () => {
    render(<AddressList addresses={addressesMock} />)
    expect(screen.getByText('Dirección 1')).toBeInTheDocument()
    expect(screen.getByText('Dirección 2')).toBeInTheDocument()
  })

  it('muestra la primera dirección correctamente', () => {
    render(<AddressList addresses={addressesMock} />)
    expect(screen.getByText('Juan Pérez')).toBeInTheDocument()
  })

  it('muestra la segunda dirección correctamente', () => {
    render(<AddressList addresses={addressesMock} />)
    expect(screen.getByText('María González')).toBeInTheDocument()
  })

  it('renderiza un array vacío sin errores', () => {
    const { container } = render(<AddressList addresses={[]} />)
    expect(container).toBeInTheDocument()
  })

  it('renderiza una sola dirección', () => {
    render(<AddressList addresses={[addressesMock[0]]} />)
    expect(screen.getByText('Dirección 1')).toBeInTheDocument()
    expect(screen.queryByText('Dirección 2')).not.toBeInTheDocument()
  })

  it('los índices empiezan desde 1', () => {
    render(<AddressList addresses={addressesMock} />)
    expect(screen.getByText('Dirección 1')).toBeInTheDocument()
    expect(screen.getByText('Dirección 2')).toBeInTheDocument()
    expect(screen.queryByText('Dirección 0')).not.toBeInTheDocument()
  })

  it('renderiza múltiples direcciones con información correcta', () => {
    render(<AddressList addresses={addressesMock} />)
    expect(screen.getByText('1234567890')).toBeInTheDocument()
    expect(screen.getByText('0987654321')).toBeInTheDocument()
  })
})
