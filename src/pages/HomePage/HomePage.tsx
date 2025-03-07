import { TestimonialsSlider } from "@components/TestimonialsSlider/TestimonialsSlider";
import "./HomePage.scss";
import { slides } from "@components/TestimonialsSlider/testimonialData";
import { Button, SideImageText, TwoColumnsLayout } from "garoe-ui";
import portadaImgSrc from "@assets/pictures/mirandaPortada.webp";

export const HomePage = () => {
	return (
		<section className="homePage">
			<SideImageText
				className="homePageSideImageText"
				imageSrc={portadaImgSrc}
				imageAlt="Volunteer"
				imagePosition="right"
				imagePositionBreakpoint={200}
			>
				<h1 className="title">
					<strong>
						Salvamos las
						<br /> vidas {""}
					</strong>
					de
					<br /> gatos sin hogar
				</h1>
				<div className="buttonsWrapper">
					<Button
						text="hazte voluntario"
						className="button"
						variant="primary"
						onClick={() => {}}
					/>
					<Button
						text="Ayuda con una donación"
						className="button"
						variant="tertiary"
						onClick={() => {}}
					/>
				</div>
			</SideImageText>
			<p>
				<TwoColumnsLayout
					leftColumnContent={
						<>
							<h2>¿Quiénes somos?</h2>
							<p>
								En Gatos Sin Hogar Gran Canaria transformamos la vida de los
								felinos urbanos a través de un sistema organizado de cuidado y
								protección. Con 9 colonias registradas y un equipo de
								voluntarios comprometidos, proporcionamos alimento, atención
								veterinaria y el calor de una familia a quienes más lo
								necesitan.
							</p>
							<p>
								Únete a nuestra red de guardianes felinos y ayúdanos a construir
								un Gran Canaria más compasivo.
							</p>
							<Button text="Leer más" onClick={() => {}} />
						</>
					}
					rightColumnContent={<p>hola</p>}
				/>
			</p>
			<TestimonialsSlider slides={slides} />
		</section>
	);
};
