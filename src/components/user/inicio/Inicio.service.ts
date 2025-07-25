import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const loginHandler = async (credentials: { correo: string; clave: string }) => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });

    const data = await response.json();

    if (data.result === true && data.token) {
      const decodedToken: any = jwtDecode(data.token);
      const expirationDate = new Date(decodedToken.exp * 1000);

      Cookies.set('gresptes', data.token, { expires: expirationDate, path: '/' });
    }

    return data;
  } catch (error) {
    console.error('Error al autenticar', error);
    throw error;
  }
};

export default loginHandler;
