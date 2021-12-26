import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Authorization } from '../../../modules/authorization/pages/authorization';
import { userEmailSelector, userIsAuthorizatedSelector } from '../../../modules/user/store/selectors';
import { setLogin } from '../../../modules/user/store/user';
import { axiosInstance } from '../../services/axios-instance';
import { getLogout } from '../../services/get-logout';
import { AuthorizationResponse } from '../../types';

const AppContainer = () => {
  const dispatch = useDispatch();
  const isAuthorizated = useSelector(userIsAuthorizatedSelector);
  const userEmail = useSelector(userEmailSelector);
  const [users, setUsers] = useState<{ _id: string; email: string }[]>([]);

  const checkAuth = async () => {
    try {
      const response = await axios.get<AuthorizationResponse>('http://localhost:8080/api/refresh', {
        withCredentials: true,
      });

      if (response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);

        dispatch(
          setLogin({ id: response.data.user.id, email: response.data.user.email, token: response.data.accessToken })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      checkAuth();
    }
  }, []);

  return (
    <div>
      {isAuthorizated ? (
        <div>
          <h1>{isAuthorizated ? `Пользователь авторизован ${userEmail}.` : 'Пользователь не авторизован.'}</h1>
          <button
            onClick={async () => {
              const response = await axiosInstance.get<{ _id: string; email: string }[]>('/users', {
                withCredentials: true,
              });

              setUsers(response.data);
            }}
          >
            Получить пользователей
          </button>
          <button onClick={getLogout}>Logout</button>
          <br />
          Пользователи:
          {users?.map((user) => {
            return <div key={user._id}>{user.email}</div>;
          })}
        </div>
      ) : (
        <Authorization />
      )}
    </div>
  );
};

export { AppContainer };
