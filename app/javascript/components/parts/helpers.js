import { error, warn } from './notifications';
import { useNavigate } from 'react-router-dom';

export const handleAjaxError = (err) => {
  error('Something went wrong');
  console.log(`ERROR ! : ${err}`);
  console.error(err);
};

export const isEmptyObject = obj => Object.keys(obj).length === 0;

export const isEmptyArray = obj => obj.length === 0;

export const isCurrntUser = (user, currentUser) => {
  return user.id === currentUser.id;
}

export const defaultImage = () => {
  return '/assets/default.jpeg';
}

export const noImage = () => {
  return '/assets/noimage.jpg';
}

export const timeStamp = (obj) => {
  const moment = require('moment');
  return moment(obj.created_at).format('YYYY年 MM月 DD日');
}

export const unPermitted = () => {
  navigate('/')
  warn('権限がありません');
}

// export const loggedInNow = (jsonData) => {
//   // return Object.keys(loggedInUser).length !== 0;
//   const navigate = useNavigate();
//   if (jsonData.logged_in === false){
//     navigate('/login');
//     warn("ログインが必要です");
//   }
// }