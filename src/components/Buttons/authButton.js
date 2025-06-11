import React from 'react';
import './Button.scss';

const AuthButton = ({ onClick, children }) => {
  return (
    <button className="auth-button" onClick={onClick} type='submit'>
      {children}
    </button>
  );
};

export default AuthButton;