import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Subscribe from './Subscribe'

jest.mock('@/production/Section/SectionStructure', () => {
  return function DummySectionStructure({ children }: any) {
    return <>{children}</>
  }
})

describe('Subscribe Component', () => {
  it('debe renderizar el componente sin errores', () => {
    render(<Subscribe />)
    expect(screen.getByPlaceholderText(/Ingresá tu dirección de correo/i)).toBeInTheDocument()
  })

  it('debe actualizar el email cuando se escribe en el input', () => {
    render(<Subscribe />)
    const input = screen.getByPlaceholderText(/Ingresá tu dirección de correo/i) as HTMLInputElement
    
    fireEvent.change(input, { target: { value: 'test@example.com' } })
    
    expect(input.value).toBe('test@example.com')
  })

  it('debe limpiar el email después de hacer click', async () => {
    render(<Subscribe />)
    const input = screen.getByPlaceholderText(/Ingresá tu dirección de correo/i) as HTMLInputElement
    const sendDiv = document.querySelector('.icon') as HTMLElement
    
    fireEvent.change(input, { target: { value: 'test@example.com' } })
    fireEvent.click(sendDiv)
    
    await waitFor(() => {
      expect(input.value).toBe('')
    })
  })
})
