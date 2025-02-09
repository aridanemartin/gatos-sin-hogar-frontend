import './Title.scss';
import type { TitleVariant } from './Title.types';

interface TitleProps {
  variant: TitleVariant;
  children: React.ReactNode;
}

export const Title: React.FC<TitleProps> = ({ variant, children }) => {
  const Tag = variant;
  return <Tag className={`titleComponent ${variant}`}>{children}</Tag>;
};
