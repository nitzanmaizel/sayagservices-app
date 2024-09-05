import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import GoogleButton from '../button/GoogleButton';
import styles from './Navbar.module.scss';

const Navbar: React.FC = () => {
  const { userInfo } = useUser();
  return (
    <nav className={styles.navbarWrapper}>
      <div className='navbar-logo'>
        <Link to='/'>
          <img src='/assets/logo.png' width='105' alt='Logo' />
        </Link>
      </div>
      <div className={styles.navLinks}>
        {userInfo ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link to='/dashboard'>Dashboard</Link>
            <img
              src={userInfo.picture}
              width='35'
              alt='User Avatar'
              style={{ borderRadius: '50%', marginRight: '10px' }}
            />
            <span style={{ marginRight: '10px' }}>{userInfo.name}</span>
            <div className='justify-center'>
              <GoogleButton />
            </div>
          </div>
        ) : (
          <GoogleButton />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
