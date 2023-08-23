export { default } from 'next-auth/middleware';

// protected routes => need authentication
export const config = {
  matcher: ['/trips', '/reservations', '/properties', '/favorites'],
};
