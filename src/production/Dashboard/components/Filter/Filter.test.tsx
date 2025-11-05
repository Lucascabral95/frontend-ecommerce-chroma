import { render, screen, fireEvent } from '@testing-library/react'
import Filters from './Filters'

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/dashboard/products',
}))

describe('Filters (básico)', () => {
  const mockSetSearchName = jest.fn()
  const mockOnAddResource = jest.fn()
  const mockOnKeyDown = jest.fn()

  beforeEach(() => {
    mockSetSearchName.mockClear()
    mockOnAddResource.mockClear()
    mockOnKeyDown.mockClear()
  })

  it('renderiza sin crashear', () => {
    const { container } = render(
      <Filters
        search={false}
        order={false}
        searchName=""
        setSearchName={mockSetSearchName}
        onAddResource={mockOnAddResource}
        nameResource="Producto"
      />
    )
    expect(container).toBeInTheDocument()
  })

  it('muestra el botón de agregar recurso', () => {
    render(
      <Filters
        search={false}
        order={false}
        searchName=""
        setSearchName={mockSetSearchName}
        onAddResource={mockOnAddResource}
        nameResource="Producto"
      />
    )
    expect(screen.getByRole('button', { name: /Agregar Producto/i })).toBeInTheDocument()
  })

  it('llama a onAddResource cuando se clickea el botón', () => {
    render(
      <Filters
        search={false}
        order={false}
        searchName=""
        setSearchName={mockSetSearchName}
        onAddResource={mockOnAddResource}
        nameResource="Producto"
      />
    )
    const button = screen.getByRole('button', { name: /Agregar Producto/i })
    fireEvent.click(button)
    expect(mockOnAddResource).toHaveBeenCalled()
  })

  it('muestra el input de búsqueda cuando search es true', () => {
    render(
      <Filters
        search={true}
        order={false}
        searchName=""
        setSearchName={mockSetSearchName}
        onAddResource={mockOnAddResource}
        nameResource="Producto"
      />
    )
    expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument()
  })

  it('no muestra el input de búsqueda cuando search es false', () => {
    render(
      <Filters
        search={false}
        order={false}
        searchName=""
        setSearchName={mockSetSearchName}
        onAddResource={mockOnAddResource}
        nameResource="Producto"
      />
    )
    expect(screen.queryByPlaceholderText('Buscar...')).not.toBeInTheDocument()
  })

  it('actualiza el input de búsqueda cuando se escribe', () => {
    render(
      <Filters
        search={true}
        order={false}
        searchName="test"
        setSearchName={mockSetSearchName}
        onAddResource={mockOnAddResource}
        nameResource="Producto"
      />
    )
    const input = screen.getByDisplayValue('test')
    fireEvent.change(input, { target: { value: 'nuevo' } })
    expect(mockSetSearchName).toHaveBeenCalledWith('nuevo')
  })

  it('llama a onKeyDown cuando se presiona una tecla en el input', () => {
    render(
      <Filters
        search={true}
        order={false}
        searchName=""
        setSearchName={mockSetSearchName}
        onAddResource={mockOnAddResource}
        nameResource="Producto"
        onKeyDown={mockOnKeyDown}
      />
    )
    const input = screen.getByPlaceholderText('Buscar...')
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(mockOnKeyDown).toHaveBeenCalled()
  })

  it('muestra el select de orden cuando order es true', () => {
    render(
      <Filters
        search={false}
        order={true}
        searchName=""
        setSearchName={mockSetSearchName}
        onAddResource={mockOnAddResource}
        nameResource="Producto"
      />
    )
    const select = screen.getByRole('combobox')
    expect(select).toBeInTheDocument()
    expect(screen.getByText('Ordenar')).toBeInTheDocument()
  })

  it('no muestra el select de orden cuando order es false', () => {
    render(
      <Filters
        search={false}
        order={false}
        searchName=""
        setSearchName={mockSetSearchName}
        onAddResource={mockOnAddResource}
        nameResource="Producto"
      />
    )
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument()
  })

  it('muestra todas las opciones de ordenamiento', () => {
    render(
      <Filters
        search={false}
        order={true}
        searchName=""
        setSearchName={mockSetSearchName}
        onAddResource={mockOnAddResource}
        nameResource="Producto"
      />
    )
    expect(screen.getByText('Mas recientes')).toBeInTheDocument()
    expect(screen.getByText('Nombre A - Z')).toBeInTheDocument()
    expect(screen.getByText('Nombre Z - A')).toBeInTheDocument()
    expect(screen.getByText('Menor precio')).toBeInTheDocument()
    expect(screen.getByText('Mayor precio')).toBeInTheDocument()
  })

  it('muestra search e order juntos cuando ambos son true', () => {
    render(
      <Filters
        search={true}
        order={true}
        searchName=""
        setSearchName={mockSetSearchName}
        onAddResource={mockOnAddResource}
        nameResource="Producto"
      />
    )
    expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })
})
