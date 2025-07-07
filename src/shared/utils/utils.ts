import Cookies from 'js-cookie';

import type { CookiesType } from "./utils.types";

export const getItemFromCookies = (): CookiesType => {
  const cookieUserId = Cookies.get('userId')?.replace(/"/g, '').trim() || '';
  const cookieAccessToken = Cookies.get('accessToken')?.replace(/"/g, '').trim() || '';
  const apiKey = Cookies.get('apiKey')?.replace(/"/g, '').trim() || '';

  return {
    cookieUserId,
    cookieAccessToken,
    apiKey
  }
}

export const connectionRefused = (errorMessage: string): void => {
  const errorIncludes = ['Failed to fetch', 'NetworkError', 'ERR_CONNECTION_REFUSED']

  if (errorIncludes.some((error) => errorMessage.includes(error))) {
    throw new Error('Cannot connect to the server. Please check your connection and refresh the page.');
  }
}

export const cookiesSetting = (): Cookies.CookieAttributes => ({
  secure: true,
  sameSite: 'Strict',
  expires: 1,
})