import { TestimonialsSlider } from '@components/TestimonialsSlider/TestimonialsSlider';
import './HomePage.scss';
import { slides } from '@components/TestimonialsSlider/testimonialData';
import { HomepageHeader } from '@components/HomepageHeader/HomepageHeader';

export const HomePage = () => {
  return (
    <div>
      <HomepageHeader />
      <TestimonialsSlider slides={slides} />
    </div>
  );
};
