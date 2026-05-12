/**
 * SEO utilities for Kape Digital
 * Helpers for generating meta tags and schema markup
 */

export interface MetaTagsConfig {
  title: string;
  description: string;
  image?: string;
  url: string;
  type?: string;
}

export interface SchemaOrgItem {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

/**
 * Generate Open Graph meta tags
 */
export function generateOGMetaTags(config: MetaTagsConfig): Record<string, string> {
  return {
    'og:title': config.title,
    'og:description': config.description,
    'og:image': config.image || 'https://kapedigital.com/og-image.png',
    'og:url': config.url,
    'og:type': config.type || 'website',
    'og:locale': 'es_CR',
    'og:site_name': 'Kape Digital',
  };
}

/**
 * Generate Twitter Card meta tags
 */
export function generateTwitterCardMetaTags(config: MetaTagsConfig): Record<string, string> {
  return {
    'twitter:card': 'summary_large_image',
    'twitter:title': config.title,
    'twitter:description': config.description,
    'twitter:image': config.image || 'https://kapedigital.com/og-image.png',
  };
}

/**
 * Generate LocalBusiness schema for Google Search
 */
export function generateLocalBusinessSchema(): SchemaOrgItem {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Kape Digital',
    image: 'https://kapedigital.com/favicon.svg',
    description: 'Micro-agencia de desarrollo web en Costa Rica',
    url: 'https://kapedigital.com',
    telephone: '+506-0000-0000', // Replace with actual phone
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CR',
      addressLocality: 'Costa Rica',
    },
    sameAs: [
      'https://www.instagram.com/kapedigital.cr',
      'https://www.facebook.com/kapedigital.cr',
      'https://www.linkedin.com/company/kape-digital',
    ],
    priceRange: '$',
    areaServed: ['CR'],
  };
}

/**
 * Generate Service schema for individual services
 */
export function generateServiceSchema(service: {
  name: string;
  description: string;
  price: string;
}): SchemaOrgItem {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Kape Digital',
    },
    areaServed: ['CR'],
    priceRange: service.price,
  };
}

/**
 * Generate breadcrumb schema
 */
export function generateBreadcrumbSchema(breadcrumbs: Array<{
  label: string;
  url: string;
}>): SchemaOrgItem {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      item: crumb.url,
    })),
  };
}
