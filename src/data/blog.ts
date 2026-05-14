export interface BlogSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface BlogPost {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  accent: string;
  color: string;
  description: string;
  sections: BlogSection[];
}

const blogPostsByLocale: Record<'es' | 'en', BlogPost[]> = {
  es: [
    {
      slug: 'por-que-tu-negocio-no-aparece-en-google',
      category: 'SEO',
      title: '¿Por qué tu negocio no aparece en Google?',
      excerpt: 'La respuesta no es "hacé SEO". Es más sencillo y más profundo que eso. Acá te explico por dónde empezar sin gastar un colón.',
      readTime: '5 min',
      date: 'Abril 2026',
      accent: 'border-amber-400',
      color: 'bg-amber-50',
      description: 'Entendé por qué un negocio puede existir online y aun así no aparecer en Google, y qué corregir primero para mejorar visibilidad.',
      sections: [
        {
          heading: 'Lo que normalmente está fallando',
          paragraphs: [
            'La mayoría de los negocios no tienen un problema de magia negra ni de algoritmo. Tienen un problema de base: el sitio no le deja claro a Google qué vende, dónde opera y por qué debería mostrarlo primero.',
            'Cuando la estructura, los títulos y el contenido están genéricos, el buscador entiende poco. Si a eso le sumás una ficha de negocio incompleta o sin autoridad local, la visibilidad se cae todavía más.',
          ],
          bullets: [
            'No hay páginas pensadas para búsquedas reales.',
            'Los textos no responden intención de búsqueda.',
            'La ficha de negocio no está optimizada o no existe.',
          ],
        },
        {
          heading: 'Por dónde empezar sin gastar de más',
          paragraphs: [
            'El primer paso no es publicar veinte artículos. Es ordenar la propuesta: una página clara por servicio, un título útil por página y contenido que responda preguntas concretas.',
            'Después conviene trabajar la ficha de Google Business Profile, pedir reseñas reales y enlazar el sitio con datos consistentes de contacto, ubicación y servicios. Eso mueve más la aguja que muchas tácticas ruidosas.',
          ],
        },
      ],
    },
    {
      slug: 'whatsapp-business-lo-basico',
      category: 'Digitalización',
      title: 'WhatsApp Business: lo básico que todo negocio necesita',
      excerpt: 'Catálogo de productos, respuestas automáticas y un perfil profesional. Todo gratis. Te enseño a configurarlo en 20 minutos.',
      readTime: '4 min',
      date: 'Abril 2026',
      accent: 'border-green-500',
      color: 'bg-green-50',
      description: 'Una guía corta para ordenar WhatsApp Business y convertirlo en una herramienta de ventas más profesional.',
      sections: [
        {
          heading: 'Qué configurar primero',
          paragraphs: [
            'Empezá por lo básico: nombre comercial correcto, descripción clara, horario, dirección si aplica y un enlace a tu sitio web. Eso ya cambia la percepción de profesionalismo.',
            'Después cargá un catálogo sencillo con los productos o servicios más consultados. No hace falta tener todo perfecto; hace falta que el cliente entienda rápido qué ofrecés.',
          ],
          bullets: [
            'Mensaje de bienvenida para nuevos contactos.',
            'Respuestas rápidas para preguntas repetidas.',
            'Catálogo con nombres y precios claros.',
          ],
        },
        {
          heading: 'Cómo evitar que se vuelva un caos',
          paragraphs: [
            'La herramienta sola no resuelve el proceso. Si todo llega por WhatsApp sin etiquetas, sin horarios y sin seguimiento, terminás administrando el negocio desde el celular en modo reactivo.',
            'La clave es usarlo como canal de entrada y no como sustituto de una presencia digital completa. WhatsApp ayuda a cerrar; el sitio ayuda a explicar y convertir mejor.',
          ],
        },
      ],
    },
    {
      slug: 'landing-page-vs-sitio-web',
      category: 'Web',
      title: 'Landing page vs sitio web: ¿cuál necesitás primero?',
      excerpt: 'Depende de en qué etapa está tu negocio. Te ayudo a entender la diferencia con ejemplos reales de Costa Rica.',
      readTime: '6 min',
      date: 'Marzo 2026',
      accent: 'border-kape-naranja',
      color: 'bg-orange-50',
      description: 'Comparación práctica entre una landing page y un sitio web para decidir qué construir primero según el momento del negocio.',
      sections: [
        {
          heading: 'La diferencia real',
          paragraphs: [
            'Una landing page está pensada para una sola acción: pedir una cotización, agendar una llamada o vender algo puntual. Un sitio web, en cambio, organiza la marca, los servicios y el contenido para acompañar decisiones más amplias.',
            'Si todavía estás validando una oferta concreta, una landing puede ser suficiente. Si necesitás explicar varias líneas de servicio, confianza, portafolio y soporte, ya te conviene un sitio más completo.',
          ],
        },
        {
          heading: 'Cómo decidir sin adivinar',
          paragraphs: [
            'Elegí landing cuando el objetivo sea uno solo y el mensaje sea muy específico. Elegí sitio web cuando el negocio necesite crecer, posicionarse y responder preguntas diferentes de clientes distintos.',
            'En la práctica, muchos proyectos arrancan con una landing bien hecha y después escalan a un sitio completo cuando la oferta se ordena y aparecen nuevas necesidades.',
          ],
        },
      ],
    },
    {
      slug: 'cuanto-cuesta-un-sitio-web-costa-rica',
      category: 'Costos',
      title: '¿Cuánto cuesta tener un sitio web en Costa Rica?',
      excerpt: 'Entre $200 y $20,000. El rango es enorme y la diferencia importa. Te explico qué está detrás de cada precio.',
      readTime: '5 min',
      date: 'Marzo 2026',
      accent: 'border-kape-naranja',
      color: 'bg-orange-50',
      description: 'Qué factores mueven el precio de un sitio web y cómo evaluar si una propuesta tiene sentido o solo está inflada.',
      sections: [
        {
          heading: 'Por qué los precios varían tanto',
          paragraphs: [
            'El costo depende de alcance, estrategia, diseño, redacción, SEO, animaciones, integraciones y soporte. Un sitio no cuesta lo mismo si solo presenta información o si además vende, automatiza y conecta sistemas.',
            'Muchas cotizaciones parecen baratas porque recortan justamente lo que hace que el sitio funcione después del lanzamiento: contenidos, estructura, performance y mantenimiento.',
          ],
        },
        {
          heading: 'Qué revisar antes de comparar',
          paragraphs: [
            'No compares solo el total. Compará qué incluye, cuántas páginas, qué entregables quedan listos, quién escribe los textos, qué pasa con el SEO básico y si hay soporte post-lanzamiento.',
            'Un sitio más caro puede salir más barato si evita rehacerlo a los seis meses. El precio correcto es el que te deja operar sin improvisar desde el día uno.',
          ],
        },
      ],
    },
    {
      slug: 'instagram-no-es-un-sitio-web',
      category: 'Estrategia',
      title: 'Instagram no es un sitio web: diferencias que importan',
      excerpt: 'Miles de emprendedores usan Instagram como su única presencia digital. Esto es lo que están arriesgando.',
      readTime: '4 min',
      date: 'Febrero 2026',
      accent: 'border-purple-500',
      color: 'bg-purple-50',
      description: 'Por qué depender solo de Instagram limita el negocio y qué rol debería cumplir un sitio web propio.',
      sections: [
        {
          heading: 'Lo que sí hace bien Instagram',
          paragraphs: [
            'Instagram sirve para generar atención, mostrar prueba social y activar conversaciones rápidas. Es útil como vitrina y como canal de interacción diaria.',
            'El problema aparece cuando toda la presencia digital vive ahí. En ese escenario, la marca depende de una plataforma ajena, con reglas cambiantes y poca capacidad de ordenar información.',
          ],
        },
        {
          heading: 'Lo que un sitio propio resuelve',
          paragraphs: [
            'Un sitio web permite explicar mejor la oferta, rankear en Google, capturar leads y dar confianza con una estructura que vos controlás. También sirve como base para anuncios, SEO y automatización.',
            'La combinación más sana suele ser simple: Instagram para atraer, sitio web para convertir y WhatsApp o email para cerrar. Esa mezcla es más estable que apostar todo a una sola red social.',
          ],
        },
      ],
    },
  ],
  en: [
    {
      slug: 'por-que-tu-negocio-no-aparece-en-google',
      category: 'SEO',
      title: 'Why is your business not showing up on Google?',
      excerpt: 'The answer is not "do SEO". It is simpler and deeper than that. Here is where to start without spending a cent.',
      readTime: '5 min',
      date: 'April 2026',
      accent: 'border-amber-400',
      color: 'bg-amber-50',
      description: 'Understand why a business can exist online and still not appear on Google, and what to fix first to improve visibility.',
      sections: [
        {
          heading: 'What is usually failing',
          paragraphs: [
            'Most businesses do not have a black magic or algorithm problem. They have a foundation problem: the site does not make it clear to Google what it sells, where it operates, and why it should show up first.',
            'When structure, titles, and content are generic, the search engine understands very little. If you add an incomplete business profile or no local authority, visibility drops even more.',
          ],
          bullets: [
            'There are no pages built for real searches.',
            'The copy does not match search intent.',
            'The business profile is not optimized or does not exist.',
          ],
        },
        {
          heading: 'Where to start without overspending',
          paragraphs: [
            'The first step is not publishing twenty articles. It is organizing the offer: one clear page per service, a useful title for each page, and content that answers specific questions.',
            'Then it helps to work on the Google Business Profile, ask for real reviews, and connect the site with consistent contact, location, and service data. That moves the needle more than many noisy tactics.',
          ],
        },
      ],
    },
    {
      slug: 'whatsapp-business-lo-basico',
      category: 'Digitalization',
      title: 'WhatsApp Business: the basics every business needs',
      excerpt: 'Product catalog, automatic replies, and a professional profile. All free. I will show you how to set it up in 20 minutes.',
      readTime: '4 min',
      date: 'April 2026',
      accent: 'border-green-500',
      color: 'bg-green-50',
      description: 'A short guide to organizing WhatsApp Business and turning it into a more professional sales tool.',
      sections: [
        {
          heading: 'What to set up first',
          paragraphs: [
            'Start with the basics: the correct business name, a clear description, hours, address if applicable, and a link to your website. That already changes the perception of professionalism.',
            'Then load a simple catalog with the most requested products or services. It does not need to be perfect; it needs to help the customer quickly understand what you offer.',
          ],
          bullets: [
            'Welcome message for new contacts.',
            'Quick replies for repeated questions.',
            'Catalog with clear names and prices.',
          ],
        },
        {
          heading: 'How to keep it from becoming chaos',
          paragraphs: [
            'The tool alone does not solve the process. If everything arrives through WhatsApp without labels, hours, and follow-up, you end up running the business from your phone in reactive mode.',
            'The key is to use it as an entry channel and not as a replacement for a complete digital presence. WhatsApp helps close; the site helps explain and convert better.',
          ],
        },
      ],
    },
    {
      slug: 'landing-page-vs-sitio-web',
      category: 'Web',
      title: 'Landing page vs website: which do you need first?',
      excerpt: 'It depends on where your business is today. I will help you understand the difference with real examples from Costa Rica.',
      readTime: '6 min',
      date: 'March 2026',
      accent: 'border-kape-naranja',
      color: 'bg-orange-50',
      description: 'A practical comparison between a landing page and a website so you can decide what to build first based on your business stage.',
      sections: [
        {
          heading: 'The real difference',
          paragraphs: [
            'A landing page is designed for one action: request a quote, book a call, or sell something specific. A website, by contrast, organizes the brand, services, and content to support broader decisions.',
            'If you are still validating a specific offer, a landing page may be enough. If you need to explain multiple services, trust, portfolio, and support, a fuller website is the better fit.',
          ],
        },
        {
          heading: 'How to decide without guessing',
          paragraphs: [
            'Choose a landing page when the goal is one thing and the message is very specific. Choose a website when the business needs to grow, position itself, and answer different questions from different customers.',
            'In practice, many projects start with a well-built landing page and later expand into a full website once the offer is organized and new needs appear.',
          ],
        },
      ],
    },
    {
      slug: 'cuanto-cuesta-un-sitio-web-costa-rica',
      category: 'Costs',
      title: 'How much does a website cost in Costa Rica?',
      excerpt: 'Between $200 and $20,000. The range is huge and the difference matters. Here is what is behind each price.',
      readTime: '5 min',
      date: 'March 2026',
      accent: 'border-kape-naranja',
      color: 'bg-orange-50',
      description: 'What factors move website pricing and how to judge whether a proposal makes sense or is just inflated.',
      sections: [
        {
          heading: 'Why prices vary so much',
          paragraphs: [
            'The cost depends on scope, strategy, design, copywriting, SEO, animations, integrations, and support. A site does not cost the same if it only presents information or if it also sells, automates, and connects systems.',
            'Many quotes look cheap because they cut the exact things that make the site work after launch: content, structure, performance, and maintenance.',
          ],
        },
        {
          heading: 'What to review before comparing',
          paragraphs: [
            'Do not compare only the total. Compare what is included, how many pages, what deliverables are ready, who writes the copy, what happens with basic SEO, and whether post-launch support is included.',
            'A more expensive site can end up cheaper if it avoids rebuilding everything six months later. The right price is the one that lets you operate without improvising from day one.',
          ],
        },
      ],
    },
    {
      slug: 'instagram-no-es-un-sitio-web',
      category: 'Strategy',
      title: 'Instagram is not a website: important differences',
      excerpt: 'Thousands of entrepreneurs use Instagram as their only digital presence. Here is what they are risking.',
      readTime: '4 min',
      date: 'February 2026',
      accent: 'border-purple-500',
      color: 'bg-purple-50',
      description: 'Why relying only on Instagram limits the business and what role an owned website should play.',
      sections: [
        {
          heading: 'What Instagram does well',
          paragraphs: [
            'Instagram is good for creating attention, showing social proof, and starting quick conversations. It works well as a showcase and a daily interaction channel.',
            'The problem appears when the entire digital presence lives there. In that scenario, the brand depends on someone else’s platform, with changing rules and little ability to organize information.',
          ],
        },
        {
          heading: 'What an owned website solves',
          paragraphs: [
            'A website lets you explain the offer better, rank on Google, capture leads, and build trust with a structure you control. It also serves as a base for ads, SEO, and automation.',
            'The healthiest mix is usually simple: Instagram to attract, a website to convert, and WhatsApp or email to close. That combination is more stable than betting everything on one social network.',
          ],
        },
      ],
    },
  ],
};

export function getBlogPosts(locale: 'es' | 'en'): BlogPost[] {
  return blogPostsByLocale[locale];
}

export function getBlogPost(locale: 'es' | 'en', slug: string): BlogPost | undefined {
  return blogPostsByLocale[locale].find((post) => post.slug === slug);
}

export const blogPosts = blogPostsByLocale.es;
