// import Router from 'next/navigation';
import Cookies from 'js-cookie';

export const setToken = (data) => {

  // Cheks if the code is running in the browser environment
  if (typeof window === 'undefined') {
    console.log('Im in undefined');
    return;
  }

  // Set user's data (that we got from STRAPI after the login) in cookies
  Cookies.set('id', data.user.id);
  Cookies.set('username', data.user.username);
  Cookies.set('jwt', data.jwt);
  console.log('Im in setToken');

  // if (Cookies.get('username')) {
  //   Router.reload('/')
  // }
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