const isDevelopment = process.env.NODE_ENV !== 'production';

const DEFAULT_PROD_API_HOST = 'https://api.example.com';
const DEFAULT_API_URL = isDevelopment
  ? 'http://localhost:5000/api'
  : `${DEFAULT_PROD_API_HOST}/api`;

const API_URL = process.env.REACT_APP_API_URL || DEFAULT_API_URL;

const sanitizeBaseUrl = (url) => {
  if (!url) return isDevelopment ? 'http://localhost:5000' : DEFAULT_PROD_API_HOST;
  const trimmed = url.endsWith('/') ? url.slice(0, -1) : url;
  return trimmed.replace(/\/api$/, '');
};

const API_BASE_URL = process.env.REACT_APP_ASSET_BASE_URL || sanitizeBaseUrl(API_URL);

const DEFAULT_SOCKET_URL = isDevelopment ? 'http://localhost:5000' : API_BASE_URL;
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || DEFAULT_SOCKET_URL;

const ASSET_BASE_URL = API_BASE_URL;

export { isDevelopment, API_URL, API_BASE_URL, SOCKET_URL, ASSET_BASE_URL };


