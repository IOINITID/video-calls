import { logout } from './logout';

export const getLogout = async () => {
  try {
    await logout();
    localStorage.removeItem('token');
    // location.href = 'http://localhost:3000'; // Не нужен при добавленных приватных роутах
  } catch (error) {
    console.log(error);
  }
};
