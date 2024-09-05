import React from 'react';
import styles from './GoogleButton.module.scss';
import { useUser } from '../../hooks/useUser';

const GoogleButton: React.FC = () => {
  const { userInfo, login, logout } = useUser();

  const handleClick = () => {
    return userInfo ? logout() : login();
  };

  const buttonText = userInfo ? 'Logout from Google' : 'Login with Google';

  return (
    <button className={styles.googleButtonWrapper} onClick={handleClick}>
      <img height={30} src='/assets/google-logo.png' alt='Google Logo' />
      <div>{buttonText}</div>
    </button>
  );
};

export default GoogleButton;
