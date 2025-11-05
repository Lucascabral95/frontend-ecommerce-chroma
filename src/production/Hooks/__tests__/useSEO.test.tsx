import { useSEO } from '../useSEO'

jest.mock('../../config/seo.config', () => ({
  SEO_DEFAULTS: {
    siteName: 'Chroma Test',
    baseUrl: 'https://example.com',
    defaultImage: '/images/default.jpg',
    twitterHandle: '@chroma_test',
  },
}))

describe('useSEO hook', () => {
  it('retorna valores combinando props y defaults', () => {
    const seo = useSEO({
      title: 'Página de prueba',
      description: 'Descripción',
      path: '/ruta',
      image: '/img/cover.png',
      keywords: 'uno, dos',
      type: 'article',
    })

    expect(seo.title).toBe('Página de prueba')
    expect(seo.description).toBe('Descripción')
    expect(seo.canonical).toBe('https://example.com/ruta')
    expect(seo.image).toBe('https://example.com/img/cover.png')
    expect(seo.type).toBe('article')
    expect(seo.siteName).toBe('Chroma Test')
    expect(seo.twitterHandle).toBe('@chroma_test')
    expect(seo.schemaMarkup.url).toBe('https://example.com/ruta')
  })

  it('usa valores por defecto cuando no se proveen algunos props', () => {
    const seo = useSEO({
      title: 'Solo título',
      description: 'Sin imagen personalizada',
    })

    expect(seo.canonical).toBe('https://example.com')
    expect(seo.image).toBe('/images/default.jpg')
    expect(seo.type).toBe('website')
    expect(seo.noIndex).toBe(false)
  })
})
