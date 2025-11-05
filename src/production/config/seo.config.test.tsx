import { SEO_DEFAULTS } from './seo.config'

describe('SEO_DEFAULTS (básico)', () => {
  it('exporta el objeto SEO_DEFAULTS', () => {
    expect(SEO_DEFAULTS).toBeDefined()
  })

  it('tiene la propiedad siteName', () => {
    expect(SEO_DEFAULTS.siteName).toBe('Chroma')
  })

  it('tiene la propiedad baseUrl', () => {
    expect(SEO_DEFAULTS.baseUrl).toBeDefined()
  })

  it('tiene la propiedad defaultImage', () => {
    expect(SEO_DEFAULTS.defaultImage).toBe('/images/og-default.jpg')
  })

  it('tiene la propiedad twitterHandle', () => {
    expect(SEO_DEFAULTS.twitterHandle).toBe('@chroma')
  })

  it('tiene todas las propiedades requeridas', () => {
    expect(SEO_DEFAULTS).toHaveProperty('siteName')
    expect(SEO_DEFAULTS).toHaveProperty('baseUrl')
    expect(SEO_DEFAULTS).toHaveProperty('defaultImage')
    expect(SEO_DEFAULTS).toHaveProperty('twitterHandle')
  })

  it('SEO_DEFAULTS es un objeto', () => {
    expect(typeof SEO_DEFAULTS).toBe('object')
  })

  it('no es nulo', () => {
    expect(SEO_DEFAULTS).not.toBeNull()
  })
})
