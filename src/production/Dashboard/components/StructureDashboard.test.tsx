import { render, screen, fireEvent } from '@testing-library/react'
import StructureDashboard from './StructureDashboard'

jest.mock('next/link', () => {
  return function Mock({ children, href, className }: any) {
    return <a href={href} className={className}>{children}</a>
  }
})

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => '/customer/account/profile',
}))

jest.mock('@/lib/zustand/AuthZustand', () => ({
  __esModule: true,
  default: () => ({
    logout: jest.fn(),
  }),
}))

jest.mock('@/Shared/Constants/ElementsDashboard', () => ({
  elementsDashboard: [
    { url: '/customer/account/profile', name: 'Perfil', icon: <div>IconPerfil</div> },
    { url: '/orders/record', name: 'Pedidos', icon: <div>IconPedidos</div> },
  ],
}))

describe('StructureDashboard (básico)', () => {
  it('renderiza sin crashear', () => {
    const { container } = render(
      <StructureDashboard title="Mi Dashboard">
        <div>Contenido</div>
      </StructureDashboard>
    )
    expect(container).toBeInTheDocument()
  })

  it('muestra el título Chroma', () => {
    render(
      <StructureDashboard title="Mi Dashboard">
        <div>Contenido</div>
      </StructureDashboard>
    )
    expect(screen.getByText('Chroma')).toBeInTheDocument()
  })

  it('muestra el título del dashboard', () => {
    render(
      <StructureDashboard title="Mi Dashboard">
        <div>Contenido</div>
      </StructureDashboard>
    )
    expect(screen.getByText('Mi Dashboard')).toBeInTheDocument()
  })

  it('renderiza los elementos del dashboard', () => {
    render(
      <StructureDashboard title="Mi Dashboard">
        <div>Contenido</div>
      </StructureDashboard>
    )
    expect(screen.getByText('Perfil')).toBeInTheDocument()
    expect(screen.getByText('Pedidos')).toBeInTheDocument()
  })

  it('marca el elemento activo', () => {
    render(
      <StructureDashboard title="Mi Dashboard">
        <div>Contenido</div>
      </StructureDashboard>
    )
    const perfilLink = screen.getByText('Perfil').closest('a')
    expect(perfilLink).toHaveClass('active')
  })

  it('muestra el botón de logout', () => {
    render(
      <StructureDashboard title="Mi Dashboard">
        <div>Contenido</div>
      </StructureDashboard>
    )
    expect(screen.getByText('Logout')).toBeInTheDocument()
  })

  it('renderiza los children correctamente', () => {
    render(
      <StructureDashboard title="Mi Dashboard">
        <div>Contenido Especial</div>
      </StructureDashboard>
    )
    expect(screen.getByText('Contenido Especial')).toBeInTheDocument()
  })
})
