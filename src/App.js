import React, {useEffect}  from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import Login from './components/Login';
import { auth } from './firebase';


function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
     
      if (userAuth) {
        dispatch(login({
          email: userAuth.email,
          uid: userAuth.uid,
          name: userAuth.displayName,
          profilePic: userAuth.photoURL,
        }))
      }
      else{
        dispatch(logout())
      }
    })
   
  }, [])
  return (
    <div className="app">
      {/* Header */}
      <Header />

      {!user ? 
      <Login /> :
        <div className="app__body">
          <Sidebar />
          <Feed />
        </div>
      }

    </div>
  );
}
    
    
      
        


export default App;
