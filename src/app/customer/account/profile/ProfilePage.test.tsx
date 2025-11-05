import { render, screen } from '@testing-library/react'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}))

jest.mock('@/production/Hooks/useSEO', () => ({
  useSEO: jest.fn(() => ({
    title: 'Mi Perfil',
    description: 'Mi Perfil',
  })),
}))

jest.mock('@/production/components/SEO', () => {
  return function Mock() {
    return <div data-testid="seo" />
  }
})

jest.mock('@/lib/zustand/AuthZustand', () => ({
  __esModule: true,
  default: () => ({
    userDataSession: { id: 'user-123' },
  }),
}))

jest.mock('@/lib/auth', () => ({
  getAddressByUserId: jest.fn(async () => ({
    firstAddress: {
      firstName: 'Lucas',
      lastName: 'Cabral',
      phone: '1234567890',
      street1: 'Calle Principal',
      city: 'Buenos Aires',
      state: 'Buenos Aires',
      postalCode: 'B1636',
      country: 'Argentina',
    },
  })),
  createAddress: jest.fn(),
  updateAddressById: jest.fn(),
}))

jest.mock('@/production/ProductById/ProductByIdError', () => {
  return function Mock({ title }: any) {
    return <div data-testid="error">{title}</div>
  }
})

import ProfilePage from './page'

describe('ProfilePage (básico)', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renderiza sin crashear', () => {
    const { container } = render(<ProfilePage />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renderiza el formulario de datos personales', async () => {
    render(<ProfilePage />)
    
    const firstNameInput = await screen.findByDisplayValue('Lucas')
    expect(firstNameInput).toBeInTheDocument()
    expect(screen.getByDisplayValue('Cabral')).toBeInTheDocument()
  })

  it('renderiza el botón de guardar', async () => {
    render(<ProfilePage />)
    
    const button = await screen.findByRole('button')
    expect(button).toBeInTheDocument()
  })
})

afterEach(() => {
  jest.clearAllMocks()
})
