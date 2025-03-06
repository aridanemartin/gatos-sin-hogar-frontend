import { TestimonialsSlider } from "@components/TestimonialsSlider/TestimonialsSlider";
import "./HomePage.scss";
import { slides } from "@components/TestimonialsSlider/testimonialData";
import { Button, SideImageText } from "garoe-ui";
import portadaImgSrc from "@assets/pictures/mirandaPortada.webp";

export const HomePage = () => {
	return (
		<section className="homePage">
			<SideImageText
				className="sideImageText"
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
			<TestimonialsSlider slides={slides} />
		</section>
	);
};
