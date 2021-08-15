import React from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from './../features/userSlice';


const GetUserFromReduxStore = () => {
  const user = useSelector(selectUser);

  return user ? user : "";
}

export {
  GetUserFromReduxStore ,
  
}
