import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { registration } from '../../../registration/services';
import { setLogin } from '../../../user/store/user';
import { authorization } from '../../services';

const Authorization = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div style={{ display: 'grid' }}>
      <label style={{ display: 'grid' }} htmlFor="email">
        <span>Email</span>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          autoComplete="off"
        />
      </label>
      <label style={{ display: 'grid' }} htmlFor="password">
        <span>Password</span>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          autoComplete="off"
        />
      </label>
      <button
        onClick={async () => {
          try {
            const response = await authorization(email, password);

            localStorage.setItem('token', response.data.accessToken);

            dispatch(
              setLogin({ id: response.data.user.id, email: response.data.user.email, token: response.data.accessToken })
            );
          } catch (error) {
            console.log(error);
          }
        }}
      >
        Login
      </button>
      <button
        onClick={async () => {
          try {
            const response = await registration(email, password);

            localStorage.setItem('token', response.data.accessToken);

            dispatch(
              setLogin({ id: response.data.user.id, email: response.data.user.email, token: response.data.accessToken })
            );
          } catch (error) {
            console.log(error);
          }
        }}
      >
        Registration
      </button>
    </div>
  );
};

export const AuthorizationMemoized = memo(Authorization);
