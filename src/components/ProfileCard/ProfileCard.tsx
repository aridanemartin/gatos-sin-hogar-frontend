import './ProfileCard.scss';

interface ProfileCardProps {
  src?: string;
  name: string;
}

export const ProfileCard = ({
  src = 'https://placekitten.com/200/200',
  name
}: ProfileCardProps) => {
  return (
    <div className="card">
      <div className="card-container">
        <div className="card">
          <img src={src} />
          <div className="card__overlay">
            <h2 className="card__title">{name}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
