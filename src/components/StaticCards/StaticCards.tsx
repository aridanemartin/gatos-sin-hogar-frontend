import "./StaticCards.css";
import { FeederIcon } from "@assets/icons/svg/FeederIcon";
import { CrossIcon } from "@assets/icons/svg/CrossIcon";
import { ShopIcon } from "@assets/icons/svg/ShopIcon";
import { Title } from "@components/Title/Title";
import { TitleVariant } from "@components/Title/Title.types";

const cardsInfo = [
	{
		title: "Alimentación de las colonias",
		description:
			"Ayuda a alimentar a los gatos callejeros proporcionándoles comida en los puntos de alimentación establecidos. Garantizamos su bienestar y controlamos su estado de salud.",
		iconSrc: FeederIcon,
	},
	{
		title: "Tratamiento básico",
		description:
			"Colabora en la atención veterinaria básica, como la desparasitación, administración de medicación y curas menores para garantizar la salud de los gatos rescatados.",
		iconSrc: CrossIcon,
	},
	{
		title: "Recaudación de pienso y dinero",
		description:
			"Organiza y participa en campañas de recogida de alimento y donaciones para asegurar el sustento y atención médica de los gatos en nuestra protectora.",
		iconSrc: ShopIcon,
	},
];

export const StaticCards = () => {
	return (
		<section>
			<Title variant={TitleVariant.H2}>ACTIVIDADES</Title>
			<div className="staticCards">
				{cardsInfo.map((card) => (
					<div className="staticCard" key={card.title}>
						<div className="content">
							<div className="icon">
								<card.iconSrc />
							</div>
							<h2 className="title">{card.title}</h2>
							<p className="description">{card.description}</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};
