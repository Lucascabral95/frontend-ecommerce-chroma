import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode, JwtPayload } from 'jwt-decode';

const loginRegisterPaths = ['/customer/account/login', '/customer/account/create'];
const routesProtecteds = ['/customer/account/cart', '/customer/account/profile', '/checkout', '/checkout/cart', '/orders/record', '/orders/detail/:path*'];
const routeRedirectInMatch = '/'

const KEY_JWT = process.env.KEY_JWT || 'defaultJwtKey';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedRoute = routesProtecteds.some(path =>
    pathname.startsWith(path)
  );
  const isLoginOrRegisterPage = loginRegisterPaths.some(path =>
    pathname.startsWith(path)
  );

  const token = request.cookies.get(KEY_JWT)?.value;
  let isTokenValid = false;

  if (token) {
    try {
      const payload = jwtDecode<JwtPayload>(token);
      const currentTime = Date.now() / 1000;

      isTokenValid = payload.exp ? payload.exp > currentTime : true;
    } catch (error) {
      console.error('Token inválido:', error);
      isTokenValid = false;
    }
  }

  if (isProtectedRoute && !isTokenValid) {
    const returnTo = encodeURIComponent(pathname);
    return NextResponse.redirect(
      new URL(`${loginRegisterPaths[0]}?from=${returnTo}`, request.url)
    );
  }

  if (isLoginOrRegisterPage && isTokenValid) {
    return NextResponse.redirect(
      new URL(routeRedirectInMatch, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/customer/account/login',
    '/customer/account/create',
    '/customer/account/profile',

    '/customer/account/cart',

    '/checkout',
    '/checkout/cart',

    '/orders/record',
    '/orders/detail/:path*'
  ]
};
