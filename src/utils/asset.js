import { ASSET_BASE_URL } from '../config/env';

const ensureLeadingSlash = (path) => {
  if (!path) {
    return '';
  }
  return path.startsWith('/') ? path : `/${path}`;
};

const stripTrailingSlash = (url = '') => {
  if (!url) {
    return '';
  }
  return url.endsWith('/') ? url.slice(0, -1) : url;
};

export const buildAssetUrl = (path = '') => {
  if (!path) {
    return '';
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const base = stripTrailingSlash(ASSET_BASE_URL || '');
  return `${base}${ensureLeadingSlash(path)}`;
};


