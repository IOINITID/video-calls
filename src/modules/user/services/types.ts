/**
 * Type ответа для получения пользователя.
 */
export type User = {
  id: string;
  email: string;
  name: string;
  socket_id: string;
  status: 'offline' | 'online';
  default_color: string;
  description: string;
  color: string;
  image: string;
};
