import { fireEvent, render, screen } from '@testing-library/react'
import Pagination from './Pagination'

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

jest.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams('size=M'),
}))

describe('Pagination (básico)', () => {
  it('renderiza los enlaces de paginación con la cantidad correcta', () => {
    render(<Pagination totalPages={3} page={2} categoryId="all" />)

    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(3)
    expect(links[1]).toHaveClass('link-redireccion', 'active')
  })

  it('genera hrefs adecuados para categoryId "all"', () => {
    render(<Pagination totalPages={2} page={1} categoryId="all" />)

    const links = screen.getAllByRole('link')
    expect(links[0]).toHaveAttribute('href', '/section/product/all?size=M&page=1')
    expect(links[1]).toHaveAttribute('href', '/section/product/all?size=M&page=2')
  })

  it('genera hrefs adecuados para categorías específicas y dispara onPageChange', () => {
    const onPageChange = jest.fn()
    render(
      <Pagination
        totalPages={2}
        page={1}
        categoryId="outerwear"
        onPageChange={onPageChange}
      />
    )

    const links = screen.getAllByRole('link')
    expect(links[1]).toHaveAttribute(
      'href',
      '/section/product/outerwear?size=M&page=2'
    )

    fireEvent.click(links[1])
    expect(onPageChange).toHaveBeenCalledWith(2)
  })
})
