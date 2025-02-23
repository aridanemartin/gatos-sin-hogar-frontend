import { TestimonialsSlider } from "@components/TestimonialsSlider/TestimonialsSlider";
import "./VolunteerPage.css";
import { slides } from "@components/TestimonialsSlider/testimonialData";
import { StaticCards } from "@components/StaticCards/StaticCards";
import { Button, ButtonType } from "@components/Button/Button";

export const VolunteerPage = () => {
	return (
		<div className="volunteerPage">
			<section className="joinUsBanner">
				<p>
					Con tan solo dos horas disponibles al mes puedes unirte a nuestro
					equipo!
				</p>
				<Button
					buttonType={ButtonType.PRIMARY}
					text="¡Hazte voluntario!"
					onClick={() => console.log("Volunteer button clicked")}
				/>
			</section>
			<StaticCards />
			<TestimonialsSlider slides={slides} />
		</div>
	);
};
