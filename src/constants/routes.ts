const ROUTES = {
  BASE: '/',
  AUTH: {
    BASE: '/auth',
    LOGIN: '/login',
    ME: '/me',
  },
  USER: {
    BASE: '/user',
    CREATE: '/create',
    LIST: '/list',
  },
  PERMISSION: {
    BASE: '/permission',
    LIST: '/list',
  },
  CATEGORY: {
    BASE: '/category',
    CREATE: '/create',
    LIST: '/list',
    UPDATE: '/update',
    DETAIL: '/detail',
  },
  ASSET: {
    BASE: '/assets',
    POST: '/post',
  },
  BLOG: {
    BASE: '/blog',
    CREATE: '/create',
    LIST: '/list',
    UPDATE: '/update',
    DETAIL: '/detail',
    DELETE: '/delete',
  },
  ROLE: {
    BASE: '/role',
    CREATE: '/create',
    LIST: '/list',
    UPDATE: '/update',
    DETAIL: '/detail',
    DELETE: '/delete',
  },
};

export { ROUTES };
