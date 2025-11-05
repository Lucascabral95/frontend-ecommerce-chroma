import { render, screen } from '@testing-library/react'
import TableDashboard from './TableDashboard'

describe('TableDashboard (básico)', () => {
  const headers = ['SKU', 'Talla', 'Color', 'Precio', 'Stock']
  const rows = (
    <>
      <tr>
        <td>SKU001</td>
        <td>M</td>
        <td>Rojo</td>
        <td>$1200</td>
        <td>10</td>
      </tr>
      <tr>
        <td>SKU002</td>
        <td>L</td>
        <td>Azul</td>
        <td>$1500</td>
        <td>5</td>
      </tr>
    </>
  )

  it('renderiza sin crashear', () => {
    const { container } = render(
      <TableDashboard headers={headers} rows={rows} />
    )
    expect(container).toBeInTheDocument()
  })

  it('renderiza los headers correctamente', () => {
    render(<TableDashboard headers={headers} rows={rows} />)
    headers.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument()
    })
  })

  it('renderiza las filas en el tbody', () => {
    render(<TableDashboard headers={headers} rows={rows} />)
    expect(screen.getByText('SKU001')).toBeInTheDocument()
    expect(screen.getByText('SKU002')).toBeInTheDocument()
    expect(screen.getByText('$1200')).toBeInTheDocument()
    expect(screen.getByText('$1500')).toBeInTheDocument()
  })

  it('tiene la estructura de tabla correcta', () => {
    const { container } = render(
      <TableDashboard headers={headers} rows={rows} />
    )
    expect(container.querySelector('table')).toBeInTheDocument()
    expect(container.querySelector('thead')).toBeInTheDocument()
    expect(container.querySelector('tbody')).toBeInTheDocument()
  })

  it('maneja un array vacío de headers', () => {
    const { container } = render(
      <TableDashboard headers={[]} rows={<tr><td>Vacío</td></tr>} />
    )
    expect(container.querySelector('table')).toBeInTheDocument()
  })
})
