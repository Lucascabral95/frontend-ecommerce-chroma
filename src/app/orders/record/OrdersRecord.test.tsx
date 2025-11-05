import { render } from '@testing-library/react'

jest.mock('@/lib/zustand/AuthZustand', () => ({
  __esModule: true,
  default: () => ({ userDataSession: null }),
}))

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => new URLSearchParams()),
}))

jest.mock('@/production/Hooks/useSEO', () => ({
  useSEO: jest.fn(() => ({})),
}))

jest.mock('@/production/components/SEO', () => () => null)

jest.mock('@/lib/OrdersApi', () => ({
  getOrderByUserId: jest.fn(),
}))

jest.mock('@/production/components/Orders/Orders', () => () => null)

import OrdersRecord from './page'

describe('OrdersRecord', () => {
  it('renderiza sin error', () => {
    render(<OrdersRecord />)
  })

  it('renderiza el contenedor', () => {
    const { container } = render(<OrdersRecord />)
    expect(container.firstChild).toBeTruthy()
  })
})
