import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { JwtPayloadData } from './Insfraestructure/Interfaces/auth/auth.interface';

const loginRegisterPaths = ['/customer/account/login', '/customer/account/create'];
const routesProtecteds = [
  '/customer/account/cart',
  '/customer/account/profile',
  '/checkout',
  '/checkout/cart',
  '/orders/record',
  '/orders/detail/:path*'
];
const routesAdmin = ['/api/dashboard/:path*'];
const routeRedirectInMatch = '/';

const ADMIN_EMAIL = 'lucas@hotmail.com';
const KEY_JWT = process.env.KEY_JWT || 'defaultJwtKey';

interface AuthResult {
  isTokenValid: boolean;
  isAdmin: boolean;
  userEmail?: string;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedRoute = matchesRoute(pathname, routesProtecteds);
  const isAdminRoute = matchesRoute(pathname, routesAdmin);
  const isLoginOrRegisterPage = matchesRoute(pathname, loginRegisterPaths);

  const authResult = validateToken(request);
  const { isTokenValid, isAdmin } = authResult;

  if (isAdminRoute) {
    if (!isTokenValid) {
      return redirectToLogin(request, pathname);
    }

    if (!isAdmin) {
      return NextResponse.redirect(new URL(routeRedirectInMatch, request.url));
    }

    return NextResponse.next();
  }

  if (isProtectedRoute && !isTokenValid) {
    return redirectToLogin(request, pathname);
  }

  if (isLoginOrRegisterPage && isTokenValid) {
    const redirectUrl = isAdmin ? '/api/dashboard' : routeRedirectInMatch;
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  return NextResponse.next();
}

function validateToken(request: NextRequest): AuthResult {
  const token = request.cookies.get(KEY_JWT)?.value;

  if (!token) {
    return { isTokenValid: false, isAdmin: false };
  }

  try {
    const payload = jwtDecode<JwtPayload>(token);
    const decoded = jwtDecode<JwtPayloadData>(token);
    const currentTime = Date.now() / 1000;

    const isTokenValid = payload.exp ? payload.exp > currentTime : true;

    if (!isTokenValid) {
      return { isTokenValid: false, isAdmin: false };
    }

    const isAdmin = decoded.email === ADMIN_EMAIL;

    return {
      isTokenValid: true,
      isAdmin,
      userEmail: decoded.email
    };

  } catch (error) {
    console.error('Token inválido:', error);
    return { isTokenValid: false, isAdmin: false };
  }
}

function matchesRoute(pathname: string, routes: string[]): boolean {
  return routes.some(route => {
    if (route.includes(':path*')) {
      const baseRoute = route.replace('/:path*', '');
      return pathname.startsWith(baseRoute);
    }
    return pathname.startsWith(route);
  });
}

function redirectToLogin(request: NextRequest, pathname: string): NextResponse {
  const returnTo = encodeURIComponent(pathname);
  return NextResponse.redirect(
    new URL(`${loginRegisterPaths[0]}?from=${returnTo}`, request.url)
  );
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
    '/orders/detail/:path*',

    '/api/dashboard/:path*'
  ]
};
