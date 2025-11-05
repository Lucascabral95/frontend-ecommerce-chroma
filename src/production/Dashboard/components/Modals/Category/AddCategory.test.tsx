import { render, screen } from '@testing-library/react'
import AddCategory from './AddCategory'

jest.mock('../StructureModal', () => {
  return function Mock({ children, title }: any) {
    return (
      <div data-testid="structure-modal">
        <h2>{title}</h2>
        {children}
      </div>
    )
  }
})

jest.mock('@/production/Hooks/useCategories', () => {
  return function Mock() {
    return {
      createNewCategory: {
        mutate: jest.fn((data, callbacks) => callbacks.onSuccess?.()),
      },
    }
  }
})

jest.mock('@/Shared/Constants/categories', () => ({
  CATEGORIES: [
    { label: 'Ropa', value: 'cat1' },
    { label: 'Zapatos', value: 'cat2' },
    { label: 'Accesorios', value: 'cat3' },
  ],
}))

describe('AddCategory (básico)', () => {
  const mockOnClose = jest.fn()

  beforeEach(() => {
    mockOnClose.mockClear()
  })

  it('renderiza sin crashear', () => {
    const { container } = render(<AddCategory onClose={mockOnClose} />)
    expect(container).toBeInTheDocument()
  })

  it('muestra el título del modal', () => {
    render(<AddCategory onClose={mockOnClose} />)
    expect(screen.getByText('Agregar Categoría')).toBeInTheDocument()
  })

  it('renderiza el input de nombre', () => {
    render(<AddCategory onClose={mockOnClose} />)
    expect(screen.getByPlaceholderText('Ingrese el nombre')).toBeInTheDocument()
  })

  it('muestra los labels del formulario', () => {
    render(<AddCategory onClose={mockOnClose} />)
    expect(screen.getByText('Nombre')).toBeInTheDocument()
    expect(screen.getByText('Categoría Padre')).toBeInTheDocument()
  })

  it('renderiza el select de categoría padre', () => {
    render(<AddCategory onClose={mockOnClose} />)
    const select = screen.getByRole('combobox', { name: /Categoría Padre/i })
    expect(select).toBeInTheDocument()
  })

  it('muestra las opciones de categoría', () => {
    render(<AddCategory onClose={mockOnClose} />)
    expect(screen.getByText('Ropa')).toBeInTheDocument()
    expect(screen.getByText('Zapatos')).toBeInTheDocument()
    expect(screen.getByText('Accesorios')).toBeInTheDocument()
  })

  it('muestra el botón de agregar', () => {
    render(<AddCategory onClose={mockOnClose} />)
    expect(screen.getByRole('button', { name: /Agregar/i })).toBeInTheDocument()
  })

  it('el input de nombre tiene atributo required', () => {
    render(<AddCategory onClose={mockOnClose} />)
    const input = screen.getByPlaceholderText('Ingrese el nombre') as HTMLInputElement
    expect(input.required).toBe(true)
  })

  it('renderiza el modal structure correctamente', () => {
    render(<AddCategory onClose={mockOnClose} />)
    expect(screen.getByTestId('structure-modal')).toBeInTheDocument()
  })
})
