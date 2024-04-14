// import Router from 'next/navigation';
import Cookies from 'js-cookie';

interface ErrorData {
  status: number;
  name: string;
  message: string;
  details: {
    errors: {
      path: string[];
      message: string;
      name: string;
    }[] 
  };
}

interface UserData {
  blocked: boolean;
  confirmed: boolean;
  createdAt: string;
  email: string;
  id: number;
  provider: string;
  updatedAt: string;
  username: string;
}

interface StrapiErrorResponse {
  data: null;
  error: ErrorData;
}

interface StrapiSuccessResponse {
  jwt: string;
  user: UserData;
}

type StrapiResponse = StrapiErrorResponse | StrapiSuccessResponse;

export const setToken = (data: StrapiResponse) => {

  // Cheks if the code is running in the browser environment
  if (typeof window === 'undefined') {
    return;
  }

  // Set user's data (that we got from STRAPI after the login) to cookies
  if ('user' in data && 'jwt' in data) {
    Cookies.set('id', String(data.user.id));
    Cookies.set('username', data.user.username);
    Cookies.set('jwt', data.jwt);

    // if (Cookies.get('username')) {
    //   Router.reload('/')
    // }
  }

  // If there is an error message in data, log it
  else if ('error' in data) {
    console.log(data.error.name);
    if ('errors' in data.error.details && data.error.details.errors.length > 0) {
      // If there are multiple errors, log them all
      data.error.details.errors.map((error) => {
        console.log(error.message);
      });
    } else {
      console.log(data.error.message);
    }
  }
}

export const unsetToken = () => {

  // Cheks if the code is running in the browser environment
  if (typeof window === 'undefined') {
    return;
  }
  // Remove user's data from cookies
  Cookies.remove('id');
  Cookies.remove('username');
  Cookies.remove('jwt');

  // Router.reload('/')
}

export const getUserFromLocalCookie = () => {
  return Cookies.get('username');
}
export const getUserIdFromLocalCookie = () => {
  return Cookies.get('id');
}
export const getJwtFromLocalCookie = () => {
  return Cookies.get('jwt');
}