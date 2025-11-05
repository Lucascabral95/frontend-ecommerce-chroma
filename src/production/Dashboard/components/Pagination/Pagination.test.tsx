import { render, screen } from '@testing-library/react'
import PaginationDashboard from './Pagination'

jest.mock('next/link', () => {
  return function Mock({ children, href, className, onClick }: any) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    )
  }
})

jest.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/dashboard/users',
}))

describe('PaginationDashboard (básico)', () => {
  it('renderiza sin crashear', () => {
    const { container } = render(
      <PaginationDashboard totalPages={5} page={1} />
    )
    expect(container).toBeInTheDocument()
  })

  it('muestra los números de página cuando totalPages <= 5', () => {
    render(<PaginationDashboard totalPages={5} page={1} />)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('marca la página actual como activa', () => {
    render(<PaginationDashboard totalPages={5} page={2} />)
    const activePage = screen.getByText('2').closest('a')
    expect(activePage).toHaveClass('active')
  })

  it('muestra el botón anterior cuando page > 1', () => {
    render(<PaginationDashboard totalPages={5} page={2} />)
    expect(screen.getByText('«')).toBeInTheDocument()
  })

  it('no muestra el botón anterior cuando page === 1', () => {
    render(<PaginationDashboard totalPages={5} page={1} />)
    const prevButtons = screen.queryAllByText('«')
    expect(prevButtons.length).toBe(0)
  })

  it('muestra el botón siguiente cuando page < totalPages', () => {
    render(<PaginationDashboard totalPages={5} page={1} />)
    expect(screen.getByText('»')).toBeInTheDocument()
  })

  it('no muestra el botón siguiente cuando page === totalPages', () => {
    render(<PaginationDashboard totalPages={5} page={5} />)
    const nextButtons = screen.queryAllByText('»')
    expect(nextButtons.length).toBe(0)
  })

  it('muestra elipsis cuando hay muchas páginas', () => {
    render(<PaginationDashboard totalPages={20} page={1} />)
    expect(screen.getByText('...')).toBeInTheDocument()
  })

  it('llama a onPageChange cuando se clickea un número de página', () => {
    const mockOnPageChange = jest.fn()
    render(
      <PaginationDashboard 
        totalPages={5} 
        page={1} 
        onPageChange={mockOnPageChange}
      />
    )
    const pageLink = screen.getByText('3').closest('a')
    pageLink?.click()
    expect(mockOnPageChange).toHaveBeenCalledWith(3)
  })
})
