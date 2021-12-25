import ReactDOM from 'react-dom';
import store from './store/index';
import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthorizationResponse } from './types';
import { getLogout } from './services/get-logout';
import { AuthorizationForm } from './components/authorization-form';
import { axiosInstance } from './services/axios-instance';

const Root = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<{ id: string; email: string } | Record<string, never>>({});
  const [users, setUsers] = useState<{ _id: string; email: string }[]>([]);

  const checkAuth = async () => {
    try {
      const response = await axios.get<AuthorizationResponse>('http://localhost:8080/api/refresh', {
        withCredentials: true,
      });

      if (response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        setIsAuth(true);
        setUser(response.data.user);
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
    <Provider store={store}>
      <div>
        {isAuth ? (
          <div>
            <h1>{isAuth ? `Пользователь авторизован ${user.email}.` : 'Пользователь не авторизован.'}</h1>
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
          <AuthorizationForm />
        )}
      </div>
    </Provider>
  );
};

ReactDOM.render(<Root />, document.querySelector('.root'));
