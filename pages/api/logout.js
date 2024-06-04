import { setCookie } from 'nookies';

export default async (req, res) => {
  // Establecer la cookie 'token' a una cadena vacía y establecer su 'maxAge' a -1 efectivamente la elimina.
  setCookie({ res }, 'token', '', {
    maxAge: -1,
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Asegurarse de que la cookie sea segura en producción
    sameSite: 'strict',
  });

  // Redirigir al usuario a la página de inicio después del cierre de sesión
  // Send a successful response
  res.status(200).json({ message: 'Logged out successfully' });
};
