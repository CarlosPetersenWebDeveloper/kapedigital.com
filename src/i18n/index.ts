export type Locale = 'es' | 'en';

export const DEFAULT_LOCALE: Locale = 'es';
export const SUPPORTED_LOCALES: Locale[] = ['es', 'en'];

export function getLocale(pathname: string): Locale {
  return pathname.startsWith('/en') ? 'en' : 'es';
}

export function isEnglishPath(pathname: string): boolean {
  return getLocale(pathname) === 'en';
}

export function localizedPath(pathname: string, targetPath: string): string {
  if (!targetPath.startsWith('/')) {
    return targetPath;
  }

  if (targetPath.startsWith('/en')) {
    return targetPath;
  }

  const locale = getLocale(pathname);
  if (locale === 'en') {
    if (targetPath === '/') {
      return '/en/';
    }

    return `/en${targetPath}`;
  }

  return targetPath;
}

export function localizedHome(pathname: string): string {
  return getLocale(pathname) === 'en' ? '/en/' : '/';
}

export { getSiteText } from './site';
