import { TestimonialsSlider } from '@components/TestimonialsSlider/TestimonialsSlider';
import './HomePage.scss';
import { slides } from '@components/TestimonialsSlider/testimonialData';

export const HomePage = () => {
  return (
    <div>
      <TestimonialsSlider slides={slides} />
    </div>
  );
};
