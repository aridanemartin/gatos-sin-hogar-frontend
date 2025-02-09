import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import type { TestimonialsContent } from './testimonialData';

import './TestimonialsSlider.css';
import 'swiper/css';
import 'swiper/css/navigation';

interface TestimonialsSliderProps {
  slides: TestimonialsContent[];
}

export const TestimonialsSlider = ({ slides }: TestimonialsSliderProps) => {
  return (
    <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className={slide.className}>
          {typeof slide.content === 'string' ? (
            slide.content
          ) : (
            <div className={slide.content.testimonialContentClass}>
              <div className="quotes">
                <img
                  className={slide.content.quotes.className}
                  src={slide.content.quotes.src}
                  alt={slide.content.quotes.alt}
                />
              </div>
              <div className={slide.content.contentClass}>
                <div className="image">
                  <img
                    src={slide.content.image.src}
                    alt={slide.content.image.alt}
                  />
                </div>
                <div className="text-content">
                  <h3>"{slide.content.textContent.heading}"</h3>
                  <p>{slide.content.textContent.personName}</p>
                </div>
              </div>
              <Link
                className={slide.content.link.className}
                to={slide.content.link.to}
              >
                {slide.content.link.text}
              </Link>
            </div>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
