import yolanda from '@assets/pictures/testimonials/yolanda.webp';
import doramas from '@assets/pictures/testimonials/doramas.webp';
import nazia from '@assets/pictures/testimonials/nazia.webp';
import quotes from '@assets/icons/quotes.png';

export interface TestimonialsContent {
  className: string;
  content: {
    testimonialContentClass: string;
    quotes: {
      className: string;
      src: string;
      alt: string;
    };
    contentClass: string;
    image: {
      className: string;
      src: string;
      alt: string;
    };
    textContent: {
      heading: string;
      personName: string;
    };
    link: {
      className: string;
      to: string;
      text: string;
    };
  };
}

export const slides: TestimonialsContent[] = [
  {
    className: 'testimonial-slide',
    content: {
      testimonialContentClass: 'testimonial-content',
      quotes: {
        className: 'quotes',
        src: `${quotes}`,
        alt: 'nature'
      },
      contentClass: 'content',
      image: {
        className: 'image',
        src: `${yolanda}`,
        alt: ''
      },
      textContent: {
        heading:
          'Porque dar es recibir. Y porque recibimos más de lo que damos. No son sólo gatos, son parte de la familia de Gatos sin Hogar.',
        personName: 'Yolanda'
      },
      link: {
        className: 'link',
        to: '/adopta',
        text: 'Leer más sobre los voluntarios'
      }
    }
  },
  {
    className: 'testimonial-slide',
    content: {
      testimonialContentClass: 'testimonial-content',
      quotes: {
        className: 'quotes',
        src: `${quotes}`,
        alt: 'nature'
      },
      contentClass: 'content',
      image: {
        className: 'image',
        src: `${doramas}`,
        alt: ''
      },
      textContent: {
        heading:
          'El cariño y los cuidados que les brindamos a nuestros callejeros tiene una maravillosa recompensa: su gratitud y su amor incondicional',
        personName: 'Doramas'
      },
      link: {
        className: 'link',
        to: '/adopta',
        text: 'Leer más sobre los voluntarios'
      }
    }
  },
  {
    className: 'testimonial-slide',
    content: {
      testimonialContentClass: 'testimonial-content',
      quotes: {
        className: 'quotes',
        src: `${quotes}`,
        alt: 'nature'
      },
      contentClass: 'content',
      image: {
        className: 'image',
        src: `${nazia}`,
        alt: ''
      },
      textContent: {
        heading:
          'Si tú también amas a los animales y quieres colaborar de alguna forma, te animo a unirte. Es de las decisiones más bonitas que he tomado.',
        personName: 'Nazia'
      },
      link: {
        className: 'link',
        to: '/adopta',
        text: 'Leer más sobre los voluntarios'
      }
    }
  }
];
