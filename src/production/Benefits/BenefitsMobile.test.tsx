import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BenefitsMobile from '@/production/Benefits/BenefitsMobile'
import React from 'react'

jest.mock('@/production/Section/SectionStructure', () => {
  return function MockSectionStructure({ children }: any) {
    return <>{children}</>
  }
})

const mockBenefits = [
  {
    icon: <div>Icon 1</div>,
    title: 'Beneficio 1',
    detail: 'Detalle 1',
  },
  {
    icon: <div>Icon 2</div>,
    title: 'Beneficio 2',
    detail: 'Detalle 2',
  },
  {
    icon: <div>Icon 3</div>,
    title: 'Beneficio 3',
    detail: 'Detalle 3',
  },
]

describe('BenefitsMobile', () => {
  it('debería renderizar el carrusel', () => {
    render(<BenefitsMobile benefits={mockBenefits} />)
    
    expect(screen.getByText('Beneficio 1')).toBeInTheDocument()
  })

  it('debería mostrar los botones de navegación', () => {
    render(<BenefitsMobile benefits={mockBenefits} />)
    
    expect(screen.getByLabelText('Anterior')).toBeInTheDocument()
    expect(screen.getByLabelText('Siguiente')).toBeInTheDocument()
  })

  it('debería ir al siguiente beneficio al hacer click en siguiente', async () => {
    render(<BenefitsMobile benefits={mockBenefits} />)
    
    const nextButton = screen.getByLabelText('Siguiente')
    fireEvent.click(nextButton)
    
    await waitFor(() => {
      const track = document.querySelector('.carousel__track')
      expect(track).toHaveStyle('transform: translateX(-100%)')
    })
  })

  it('debería ir al beneficio anterior al hacer click en anterior', async () => {
    render(<BenefitsMobile benefits={mockBenefits} />)
    
    const nextButton = screen.getByLabelText('Siguiente')
    fireEvent.click(nextButton)
    
    const prevButton = screen.getByLabelText('Anterior')
    fireEvent.click(prevButton)
    
    await waitFor(() => {
      const track = document.querySelector('.carousel__track')
      expect(track).toHaveStyle('transform: translateX(-0%)')
    })
  })

  it('debería navegar con teclas del teclado', async () => {
    render(<BenefitsMobile benefits={mockBenefits} />)
    
    fireEvent.keyDown(window, { key: 'ArrowRight' })
    
    await waitFor(() => {
      const track = document.querySelector('.carousel__track')
      expect(track).toHaveStyle('transform: translateX(-100%)')
    })
  })

  it('debería navegar a la izquierda con ArrowLeft', async () => {
    render(<BenefitsMobile benefits={mockBenefits} />)
    
    const nextButton = screen.getByLabelText('Siguiente')
    fireEvent.click(nextButton)
    
    fireEvent.keyDown(window, { key: 'ArrowLeft' })
    
    await waitFor(() => {
      const track = document.querySelector('.carousel__track')
      expect(track).toHaveStyle('transform: translateX(-0%)')
    })
  })

  it('debería mostrar los puntos de navegación', () => {
    render(<BenefitsMobile benefits={mockBenefits} />)
    
    const dots = screen.getAllByRole('tab')
    expect(dots).toHaveLength(3)
  })

  it('debería marcar el punto activo correctamente', async () => {
    render(<BenefitsMobile benefits={mockBenefits} />)
    
    const dots = screen.getAllByRole('tab')
    expect(dots[0]).toHaveAttribute('aria-selected', 'true')
    expect(dots[1]).toHaveAttribute('aria-selected', 'false')
    
    fireEvent.click(dots[1])
    
    await waitFor(() => {
      expect(dots[1]).toHaveAttribute('aria-selected', 'true')
      expect(dots[0]).toHaveAttribute('aria-selected', 'false')
    })
  })

  it('debería navegar al hacer click en los puntos', async () => {
    render(<BenefitsMobile benefits={mockBenefits} />)
    
    const dots = screen.getAllByRole('tab')
    fireEvent.click(dots[2])
    
    await waitFor(() => {
      const track = document.querySelector('.carousel__track')
      expect(track).toHaveStyle('transform: translateX(-200%)')
    })
  })

  it('debería hacer loop al llegar al final', async () => {
    render(<BenefitsMobile benefits={mockBenefits} />)
    
    const nextButton = screen.getByLabelText('Siguiente')
    
    // Ir al final
    fireEvent.click(nextButton)
    fireEvent.click(nextButton)
    fireEvent.click(nextButton)
    
    await waitFor(() => {
      const track = document.querySelector('.carousel__track')
      expect(track).toHaveStyle('transform: translateX(-0%)')
    })
  })

  it('debería simular touch swipe a la derecha', async () => {
    const { container } = render(<BenefitsMobile benefits={mockBenefits} />)
    
    const viewport = container.querySelector('.carousel__viewport') as HTMLElement
    
    const touchStartEvent = new TouchEvent('touchstart', {
      touches: [{ clientX: 100 } as any],
      bubbles: true,
    })
    
    const touchMoveEvent = new TouchEvent('touchmove', {
      touches: [{ clientX: 150 } as any],
      bubbles: true,
    })
    
    const touchEndEvent = new TouchEvent('touchend', {
      bubbles: true,
    })
    
    viewport.dispatchEvent(touchStartEvent)
    viewport.dispatchEvent(touchMoveEvent)
    viewport.dispatchEvent(touchEndEvent)
    
    await waitFor(() => {
      const track = document.querySelector('.carousel__track')
      expect(track).toHaveStyle('transform: translateX(-0%)')
    })
  })

  it('debería tener aria labels accesibles', () => {
    render(<BenefitsMobile benefits={mockBenefits} />)
    
    expect(screen.getByLabelText('Beneficios')).toBeInTheDocument()
    expect(screen.getByLabelText('Ir a slide')).toBeInTheDocument()
  })
})
