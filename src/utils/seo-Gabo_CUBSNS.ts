/**
 * SEO utilities for Kape Digital
 * Schema.org graph builder + meta helpers
 */

export type PageType =
  | 'default'
  | 'home'
  | 'services'
  | 'portfolio'
  | 'about'
  | 'contact'
  | 'blog-list'
  | 'blog-post';

export interface SchemaOrgItem {
  '@type': string;
  [key: string]: any;
}

const ORG_ID      = 'https://kapedigital.com/#organization';
const WEBSITE_ID  = 'https://kapedigital.com/#website';
const BUSINESS_ID = 'https://kapedigital.com/#localbusiness';
const PERSON_ID   = 'https://kapedigital.com/#person-carlos';

const SOCIAL_LINKS = [
  'https://www.instagram.com/kapedigital.cr',
  'https://www.facebook.com/kapedigital.cr',
  'https://www.linkedin.com/company/kape-digital',
];

function organization(): SchemaOrgItem {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'Kape Digital',
    legalName: 'Kape Digital',
    url: 'https://kapedigital.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://kapedigital.com/favicon.svg',
      width: 512,
      height: 512,
    },
    image: 'https://kapedigital.com/og-image.png',
    description: 'Micro-agencia de desarrollo web en Costa Rica.',
    foundingDate: '2025',
    founder: { '@id': PERSON_ID },
    sameAs: SOCIAL_LINKS,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'hola@kapedigital.com',
      availableLanguage: ['Spanish', 'English'],
      areaServed: 'CR',
    },
  };
}

function localBusiness(): SchemaOrgItem {
  return {
    '@type': 'LocalBusiness',
    '@id': BUSINESS_ID,
    name: 'Kape Digital',
    image: 'https://kapedigital.com/og-image.png',
    url: 'https://kapedigital.com',
    description: 'Desarrollo web, tiendas en linea y presencia digital para PYMEs costarricenses.',
    priceRange: '$$',
    email: 'hola@kapedigital.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CR',
      addressRegion: 'Cartago',
      addressLocality: 'Cartago',
    },
    areaServed: [
      { '@type': 'Country', name: 'Costa Rica' },
      { '@type': 'AdministrativeArea', name: 'San Jose' },
      { '@type': 'AdministrativeArea', name: 'Cartago' },
      { '@type': 'AdministrativeArea', name: 'Heredia' },
      { '@type': 'AdministrativeArea', name: 'Alajuela' },
    ],
    sameAs: SOCIAL_LINKS,
    knowsLanguage: ['es-CR', 'en'],
  };
}

function website(locale: 'es' | 'en'): SchemaOrgItem {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: 'https://kapedigital.com',
    name: 'Kape Digital',
    description: locale === 'en'
      ? 'Web development micro-agency in Costa Rica.'
      : 'Micro-agencia de desarrollo web en Costa Rica.',
    publisher: { '@id': ORG_ID },
    inLanguage: locale === 'en' ? 'en' : 'es-CR',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://kapedigital.com/blog/?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

function personCarlos(): SchemaOrgItem {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Carlos Petersen',
    jobTitle: 'Web Developer & Founder',
    worksFor: { '@id': ORG_ID },
    url: 'https://kapedigital.com/sobre',
  };
}

function faqPage(faqs: Array<{ question: string; answer: string }>): SchemaOrgItem {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

function breadcrumbList(items: Array<{ label: string; url: string }>): SchemaOrgItem {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: c.url,
    })),
  };
}

function articleSchema(article: {
  headline: string;
  description: string;
  datePublished: string;
  author?: string;
  image?: string;
}, url: string): SchemaOrgItem {
  return {
    '@type': 'BlogPosting',
    headline: article.headline,
    description: article.description,
    datePublished: article.datePublished,
    dateModified: article.datePublished,
    image: article.image || 'https://kapedigital.com/og-image.png',
    author: article.author
      ? { '@type': 'Person', name: article.author }
      : { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    inLanguage: url.includes('/en/') ? 'en' : 'es-CR',
  };
}

export function servicesGraph(locale: 'es' | 'en'): SchemaOrgItem[] {
  const isEn = locale === 'en';
  const services = [
    { name: 'Grano',     sub: isEn ? 'Conversion landing page' : 'Landing de conversion',  desc: isEn ? 'Single-page website to convert visitors into customers.' : 'Landing disenada para convertir visitantes en clientes.', price: '250' },
    { name: 'Tueste',    sub: isEn ? 'Digitalization package'  : 'Paquete de virtualizacion', desc: isEn ? 'Complete 4-6 page website with WhatsApp, Google Business and training.' : 'Sitio web 4-6 paginas con WhatsApp Business, Google Business y capacitacion.', price: '500' },
    { name: 'Pergamino', sub: isEn ? 'Online store'            : 'Tienda en linea',         desc: isEn ? 'Ecommerce with catalog, payments and admin panel.' : 'Tienda en linea con catalogo, pagos y panel de admin.', price: '800' },
    { name: 'Finca',     sub: isEn ? 'Custom system'           : 'Sistema a medida',         desc: isEn ? 'Custom web applications and integrations.' : 'Aplicaciones web a medida e integraciones.', price: null as string | null },
  ];

  return services.map(s => {
    const base: SchemaOrgItem = {
      '@type': 'Service',
      name: s.name + ' - ' + s.sub,
      description: s.desc,
      provider: { '@id': BUSINESS_ID },
      areaServed: 'CR',
      serviceType: s.sub,
    };
    if (s.price) {
      base.offers = {
        '@type': 'Offer',
        price: s.price,
        priceCurrency: 'USD',
      };
    }
    return base;
  });
}

export interface SchemaInput {
  pageType:     PageType;
  url:          string;
  title:        string;
  description:  string;
  image:        string;
  locale:       'es' | 'en';
  faqs?:        Array<{ question: string; answer: string }>;
  breadcrumbs?: Array<{ label: string; url: string }>;
  article?: {
    headline:      string;
    description:   string;
    datePublished: string;
    author?:       string;
    image?:        string;
  };
}

export function buildSchemaGraph(input: SchemaInput) {
  const graph: SchemaOrgItem[] = [
    organization(),
    localBusiness(),
    website(input.locale),
    personCarlos(),
  ];

  if (input.faqs && input.faqs.length > 0) graph.push(faqPage(input.faqs));
  if (input.breadcrumbs && input.breadcrumbs.length > 0) graph.push(breadcrumbList(input.breadcrumbs));
  if (input.pageType === 'services') graph.push(...servicesGraph(input.locale));
  if (input.pageType === 'blog-post' && input.article) graph.push(articleSchema(input.article, input.url));

  graph.push({
    '@type': input.pageType === 'blog-post' ? 'Article' : 'WebPage',
    '@id': input.url + '#webpage',
    url: input.url,
    name: input.title,
    description: input.description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    inLanguage: input.locale === 'en' ? 'en' : 'es-CR',
    primaryImageOfPage: { '@type': 'ImageObject', url: input.image },
  });

  return { '@context': 'https://schema.org', '@graph': graph };
}
