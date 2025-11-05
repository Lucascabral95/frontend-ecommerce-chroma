import { render, screen, fireEvent } from '@testing-library/react'
import ArrayCategory from './ArrayCategory'

describe('ArrayCategory (básico)', () => {
  it('renderiza sin crashear', () => {
    const { container } = render(<ArrayCategory idem="Categoría" />)
    expect(container).toBeInTheDocument()
  })

  it('renderiza el contenedor category', () => {
    const { container } = render(<ArrayCategory idem="Categoría" />)
    const category = container.querySelector('.category')
    expect(category).toBeInTheDocument()
  })

  it('muestra el título correctamente', () => {
    render(<ArrayCategory idem="Mi Categoría" />)
    expect(screen.getByText('Mi Categoría')).toBeInTheDocument()
  })

  it('renderiza el contenedor title-title-category', () => {
    const { container } = render(<ArrayCategory idem="Categoría" />)
    const titleContainer = container.querySelector('.title-title-category')
    expect(titleContainer).toBeInTheDocument()
  })

  it('renderiza el ícono de flecha hacia abajo por defecto', () => {
    const { container } = render(<ArrayCategory idem="Categoría" />)
    const icons = container.querySelectorAll('svg')
    // Al menos un ícono debe estar presente
    expect(icons.length).toBeGreaterThan(0)
  })

  it('renderiza los children cuando se proporcionan', () => {
    render(
      <ArrayCategory idem="Categoría">
        <div>Contenido hijo</div>
      </ArrayCategory>
    )
    expect(screen.getByText('Contenido hijo')).toBeInTheDocument()
  })

  it('los children están ocultos por defecto', () => {
    const { container } = render(
      <ArrayCategory idem="Categoría">
        <div>Contenido hijo</div>
      </ArrayCategory>
    )
    const valuesDiv = container.querySelector('.values')
    expect(valuesDiv).toHaveStyle('display: none')
  })

  it('abre los children cuando se hace clic en el título', () => {
    const { container } = render(
      <ArrayCategory idem="Categoría">
        <div>Contenido hijo</div>
      </ArrayCategory>
    )
    const titleContainer = container.querySelector('.title-title-category')
    fireEvent.click(titleContainer as HTMLElement)
    
    const valuesDiv = container.querySelector('.values')
    expect(valuesDiv).toHaveStyle('display: block')
  })

  it('cierra los children cuando se hace clic nuevamente', () => {
    const { container } = render(
      <ArrayCategory idem="Categoría">
        <div>Contenido hijo</div>
      </ArrayCategory>
    )
    const titleContainer = container.querySelector('.title-title-category')
    
    // Abrir
    fireEvent.click(titleContainer as HTMLElement)
    expect(container.querySelector('.values')).toHaveStyle('display: block')
    
    // Cerrar
    fireEvent.click(titleContainer as HTMLElement)
    expect(container.querySelector('.values')).toHaveStyle('display: none')
  })

  it('alterna el estado cuando se hace clic múltiples veces', () => {
    const { container } = render(
      <ArrayCategory idem="Categoría">
        <div>Contenido</div>
      </ArrayCategory>
    )
    const titleContainer = container.querySelector('.title-title-category')
    const valuesDiv = container.querySelector('.values')
    
    // Cerrado por defecto
    expect(valuesDiv).toHaveStyle('display: none')
    
    // Click 1: Abrir
    fireEvent.click(titleContainer as HTMLElement)
    expect(valuesDiv).toHaveStyle('display: block')
    
    // Click 2: Cerrar
    fireEvent.click(titleContainer as HTMLElement)
    expect(valuesDiv).toHaveStyle('display: none')
    
    // Click 3: Abrir
    fireEvent.click(titleContainer as HTMLElement)
    expect(valuesDiv).toHaveStyle('display: block')
  })

  it('renderiza el contenedor title', () => {
    const { container } = render(<ArrayCategory idem="Categoría" />)
    const title = container.querySelector('.title')
    expect(title).toBeInTheDocument()
  })

  it('renderiza el párrafo con clase text', () => {
    const { container } = render(<ArrayCategory idem="Categoría" />)
    const text = container.querySelector('.text')
    expect(text).toBeInTheDocument()
  })

  it('renderiza el contenedor icono', () => {
    const { container } = render(<ArrayCategory idem="Categoría" />)
    const iconoDiv = container.querySelector('.icono')
    expect(iconoDiv).toBeInTheDocument()
  })

  it('maneja múltiples children', () => {
    render(
      <ArrayCategory idem="Categoría">
        <div>Hijo 1</div>
        <div>Hijo 2</div>
        <div>Hijo 3</div>
      </ArrayCategory>
    )
    expect(screen.getByText('Hijo 1')).toBeInTheDocument()
    expect(screen.getByText('Hijo 2')).toBeInTheDocument()
    expect(screen.getByText('Hijo 3')).toBeInTheDocument()
  })

  it('sin children no muestra nada en values', () => {
    const { container } = render(<ArrayCategory idem="Categoría" />)
    const valuesDiv = container.querySelector('.values')
    expect(valuesDiv?.children.length).toBe(0)
  })

  it('el contenedor values está presente aunque esté oculto', () => {
    const { container } = render(
      <ArrayCategory idem="Categoría">
        <div>Contenido</div>
      </ArrayCategory>
    )
    const valuesDiv = container.querySelector('.values')
    expect(valuesDiv).toBeInTheDocument()
  })

  it('renderiza contenido complejo en children', () => {
    render(
      <ArrayCategory idem="Categoría">
        <ul>
          <li>Opción 1</li>
          <li>Opción 2</li>
          <li>Opción 3</li>
        </ul>
      </ArrayCategory>
    )
    expect(screen.getByText('Opción 1')).toBeInTheDocument()
    expect(screen.getByText('Opción 2')).toBeInTheDocument()
    expect(screen.getByText('Opción 3')).toBeInTheDocument()
  })
})
