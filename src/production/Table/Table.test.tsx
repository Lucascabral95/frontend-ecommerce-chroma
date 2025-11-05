import { render, screen, within } from '@testing-library/react'
import Table from './Table'

type Row = { id: string; producto: string; precio: number; cantidad: number }

const headers = ['Producto', 'Precio', 'Cantidad', 'Subtotal']
const data: Row[] = [{ id: 'r1', producto: 'Remera', precio: 1200, cantidad: 1 }]

function renderRow(item: Row) {
  return (
    <>
      <td>{item.producto}</td>
      <td>{item.precio}</td>
      <td>{item.cantidad}</td>
      <td>{item.precio * item.cantidad}</td>
    </>
  )
}

describe('Table (básico)', () => {
  it('renderiza headers y una fila', () => {
    render(<Table<Row> headers={headers} data={data} renderRow={renderRow} rowKey={(r) => r.id} />)
    const table = screen.getByRole('table')
    const thead = within(table).getAllByRole('rowgroup')[0]
    const tbody = within(table).getAllByRole('rowgroup')[1]
    const headerCells = within(within(thead).getByRole('row')).getAllByRole('columnheader')
    expect(headerCells.map(th => th.textContent)).toEqual(headers)
    const rows = within(tbody).getAllByRole('row')
    expect(rows).toHaveLength(1)
  })
})
