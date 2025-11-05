import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import FilterProducts from './FilterProducts'

const pushMock = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  useSearchParams: () => new URLSearchParams('page=2&sort=asc'),
}))

describe('FilterProducts (básico)', () => {
  const setOpenFiltersMock = jest.fn()

  beforeEach(() => {
    pushMock.mockClear()
    setOpenFiltersMock.mockClear()
  })

  it('renderiza las secciones principales', () => {
    render(<FilterProducts setOpenFilters={setOpenFiltersMock} />)

    expect(screen.getByText(/Filtrar/i)).toBeInTheDocument()
    expect(screen.getAllByText(/APLICAR/i).length).toBeGreaterThan(0)
    expect(screen.getByText(/Categorías/i)).toBeInTheDocument()
    expect(screen.getByText(/Tallas/i)).toBeInTheDocument()
    expect(screen.getByText(/Marcas/i)).toBeInTheDocument()
    expect(screen.getByText(/Precios/i)).toBeInTheDocument()
  })

  it('cierra los filtros cuando se hace clic fuera del contenedor', () => {
    const { container } = render(
      <FilterProducts setOpenFilters={setOpenFiltersMock} />
    )

    const backdrop = container.querySelector('.component-filter-products')
    fireEvent.click(backdrop as HTMLElement)

    expect(setOpenFiltersMock).toHaveBeenCalledWith(false)
  })

  it('no cierra los filtros cuando se hace clic dentro del contenedor', () => {
    const { container } = render(
      <FilterProducts setOpenFilters={setOpenFiltersMock} />
    )

    const inner = container.querySelector(
      '.component-filter-products__container'
    )
    fireEvent.click(inner as HTMLElement)

    expect(setOpenFiltersMock).not.toHaveBeenCalled()
  })

  it('no redirige cuando no hay filtros seleccionados', () => {
    render(<FilterProducts setOpenFilters={setOpenFiltersMock} />)

    const applyButton = screen.getAllByText(/APLICAR/i)[0]
    fireEvent.click(applyButton)

    expect(pushMock).not.toHaveBeenCalled()
    expect(setOpenFiltersMock).not.toHaveBeenCalled()
  })

  it('permite cerrar usando el icono de retroceso', () => {
    const { container } = render(
      <FilterProducts setOpenFilters={setOpenFiltersMock} />
    )

    const backIcon = container.querySelector('.icon-back')
    fireEvent.click(backIcon as HTMLElement)

    expect(setOpenFiltersMock).toHaveBeenCalledWith(false)
  })

  it('aplica filtros seleccionados y redirige correctamente', async () => {
    render(<FilterProducts setOpenFilters={setOpenFiltersMock} />)

    const categoryLabel = screen.getByText('Sweater')
    fireEvent.click(categoryLabel.closest('.value') as HTMLElement)

    const applyButton = screen.getAllByText(/APLICAR/i)[0]
    fireEvent.click(applyButton)

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith(
        expect.stringContaining('sort=asc')
      )
    })

    const finalUrl = pushMock.mock.calls[0][0]
    expect(finalUrl).toContain('/section/product?')
    expect(finalUrl).toContain('categoryId=1a2b3c4d-5e6f-4789-a012-123456789abc')
    expect(finalUrl).not.toContain('page=')
    expect(setOpenFiltersMock).toHaveBeenCalledWith(false)
  })
})
