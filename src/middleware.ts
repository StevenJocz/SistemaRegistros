import { jwtDecode } from 'jwt-decode';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
   const token = request.cookies.get('gresptes')?.value; // Obtén el token desde las cookies

   if (token) {
      try {
         // Decodificar el token
         const decodedToken: any = jwtDecode(token);
         const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos

         // Verificar si el token está expirado
         if (decodedToken.exp < currentTime) {
            return NextResponse.redirect(new URL('/', request.url)); // Token expirado, redirigir
         }

         const userType = decodedToken.tipoUsuario;

         
         
         // Si el token es válido y el usuario intenta acceder a '/', redirigir al dashboard
         if (request.nextUrl.pathname === '/') {
            return NextResponse.redirect(new URL('/dashboard', request.url));
         }

         // Permitir acceso a otras rutas
         return NextResponse.next();
      } catch (error) {
         // Si la decodificación falla (token no válido), redirigir al inicio
         console.error('Error al decodificar el token:', error);
         return NextResponse.redirect(new URL('/', request.url));
      }
   } else {
      // Si no hay token y se intenta acceder a rutas protegidas, redirigir al inicio
      if (!['/'].includes(request.nextUrl.pathname)) {
         return NextResponse.redirect(new URL('/', request.url));
      }
   }

   // Continuar el flujo normal
   return NextResponse.next();
}

export const config = {
   matcher: ['/', '/dashboard/:path*'], // Aplica el middleware a la raíz y cualquier subruta de /dashboard
};
