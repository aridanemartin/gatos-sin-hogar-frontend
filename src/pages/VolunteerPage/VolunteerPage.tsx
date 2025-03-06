import { TestimonialsSlider } from "@components/TestimonialsSlider/TestimonialsSlider";
import "./VolunteerPage.css";
import { slides } from "@components/TestimonialsSlider/testimonialData";
import { StaticCards } from "@components/StaticCards/StaticCards";
import { Button, SideImageText } from "garoe-ui";
import volunteersImageSrc from "@assets/pictures/volunteers.webp";
import { Title } from "@components/Title/Title";
import { TitleVariant } from "@components/Title/Title.types";

export const VolunteerPage = () => {
	return (
		<div className="volunteerPage">
			<Title variant={TitleVariant.H2} className="volunteerTitle">
				VOLUNTARIOS
			</Title>
			<SideImageText
				className="sideImageText"
				imageSrc={volunteersImageSrc}
				imageAlt="Volunteer"
				imagePosition="right"
				imagePositionBreakpoint={200}
			>
				<h2 className="title">
					Llenamos las barrigas, <br />
					cuidamos las heridas,
					<br /> pero sobre todo...
					<br />
					les damos una segunda oportunidad.{" "}
				</h2>
				<p className="description">
					Ser voluntario significa cuidar, alimentar y dar cariño a los gatos
					que más nos necesitan. Con solo dos horas al mes, puedes marcar la
					diferencia. ¡Únete a nuestro equipo y cambia vidas!
				</p>
			</SideImageText>
			<section className="joinUsBanner">
				<p>
					Con tan solo dos horas disponibles al mes puedes unirte a nuestro
					equipo!
				</p>
				<Button
					onClick={() => {}}
					text="¡Quiero ser voluntario!"
					className="override"
				/>
			</section>

			<Title variant={TitleVariant.H2}>ACTIVIDADES</Title>
			<StaticCards />
			<Title variant={TitleVariant.H2}>TESTIMONIOS</Title>
			<TestimonialsSlider slides={slides} />
		</div>
	);
};
