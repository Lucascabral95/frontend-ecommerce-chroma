import { render, screen } from '@testing-library/react'
import YoutubeVideo from './YoutubeVideo'

describe('YoutubeVideo (básico)', () => {
  it('renderiza el iframe con el videoId provisto', () => {
    render(<YoutubeVideo videoId="dQw4w9WgXcQ" title="Demo" />)

    const iframe = screen.getByTitle('Demo') as HTMLIFrameElement
    expect(iframe).toBeInTheDocument()
    expect(iframe.src).toContain('https://www.youtube.com/embed/dQw4w9WgXcQ')
    expect(iframe).toHaveAttribute('allowfullscreen', '')
  })

  it('usa un título por defecto cuando no se provee', () => {
    render(<YoutubeVideo videoId="abc123" />)

    expect(
      screen.getByTitle('Video de Youtube')
    ).toHaveAttribute('src', 'https://www.youtube.com/embed/abc123')
  })
})
