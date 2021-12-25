import { logout } from './logout';

export const getLogout = async () => {
  try {
    await logout();
    localStorage.removeItem('token');
    location.href = 'http://localhost:3000';
  } catch (error) {
    console.log(error);
  }
};
