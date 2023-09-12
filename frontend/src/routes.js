/* eslint-disable import/prefer-default-export */
const apiPath = '/api/v1';

const routes = {
  api: {
    login: [apiPath, 'login'].join('/'),
    data: [apiPath, 'data'].join('/'),
    signup: [apiPath, 'signup'].join('/'),
  },
  pages: {
    main: '/',
    login: '/login',
    signup: '/signup',
    error: '/error',
    notFound: '*',
  },
};

export { routes };
