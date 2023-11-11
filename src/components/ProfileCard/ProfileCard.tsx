import "./ProfileCard.scss";

interface CardProps {
  src: string;
  catName: string;
}

export const Card = ({ src, catName }: CardProps) => {
  return (
    <div className="card">
      <img className="card__image" src={src} alt={catName} />
      <h3 className="card__cat-name">{catName}</h3>
    </div>
  );
};
