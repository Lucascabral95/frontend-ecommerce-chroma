import { render, screen } from '@testing-library/react'
import SectionStructure from './SectionStructure'

describe('SectionStructure', () => {
  it('renderiza children correctamente', () => {
    render(
      <SectionStructure>
        <div>Test Content</div>
      </SectionStructure>
    )
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('aplica background cuando se pasa como prop', () => {
    const { container } = render(
      <SectionStructure background="red">
        <div>Content</div>
      </SectionStructure>
    )
    const section = container.querySelector('.section-structure')
    expect(section).toHaveStyle({ background: 'red' })
  })

  it('renderiza sin background cuando no se pasa', () => {
    const { container } = render(
      <SectionStructure>
        <div>Content</div>
      </SectionStructure>
    )
    const section = container.querySelector('.section-structure')
    expect(section).toBeInTheDocument()
  })
})
