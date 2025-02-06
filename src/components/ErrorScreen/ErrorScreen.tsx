import React, { ReactNode } from 'react';
import './ErrorScreen.scss';
import catNotFoundImage from '@assets/icons/catNotFound.webp';

interface ErrorScreenProps {
  errorCode: string;
  errorMessage: string;
  button: ReactNode;
}

export const ErrorScreen = ({
  errorMessage,
  errorCode,
  button
}: ErrorScreenProps) => {
  return (
    <div className="errorScreen">
      <img
        src={catNotFoundImage}
        alt="Error Cat Not Found"
        className="errorScreen__image"
      />
      {errorCode && <p className="errorScreen__errorCode">{errorCode}</p>}
      <p className="errorScreen__message">{errorMessage}</p>
      {button}
    </div>
  );
};
