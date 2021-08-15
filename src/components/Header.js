import React from 'react';
import '../asssets/Header.css';
import SearchIcon from '@material-ui/icons/Search';
import HeaderOption from './HeaderOption';

import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ChatIcon from '@material-ui/icons/Chat';
import NotificationsIcon from "@material-ui/icons/Notifications";
import HomeIcon  from '@material-ui/icons/Home';
import BusinessCenterIcon  from '@material-ui/icons/BusinessCenter';
import { logout } from '../features/userSlice';
import { useDispatch } from 'react-redux';
import { auth } from '../firebase';
import { GetUserFromReduxStore } from './getUser';

function Header() {
    
    const user =  GetUserFromReduxStore();
    const dispatch = useDispatch();
    const logoutOfApp = () =>{
        dispatch(logout());
        auth.signOut();
    }
    return ( 
    <div className = "header" >
        <div className="header__left">
            {/* Icon */}
            <img src="https://www.flaticon.com/svg/static/icons/svg/174/174857.svg" alt=""/>
            {/* Search */}

            <div className="header__search">
                <SearchIcon />
                <input placeholder="Search" type="text" />
            </div>
        </div>

        <div className="header__right">
            <HeaderOption Icon={HomeIcon} title='Home'/>
            <HeaderOption Icon={SupervisorAccountIcon} title='My Network'/>
            <HeaderOption Icon={BusinessCenterIcon} title='Jobs'/>
            <HeaderOption Icon={ChatIcon} title='Messaging'/>
            <HeaderOption Icon={NotificationsIcon} title='Notifications'/>
            <HeaderOption onClick={logoutOfApp} avatar={user.profilePic} exist={true} title='Me'/>
        </div>
    </div >
    )
}

export default Header