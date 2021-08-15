import React from 'react';
import '../asssets/HeaderOption.css';
import {Avatar} from "@material-ui/core";
import { GetUserFromReduxStore } from './getUser';


function HeaderOption({avatar, Icon, title , onClick , exist}) {
    const user =  GetUserFromReduxStore();
    return <div onClick={onClick} className="headerOption">
        {Icon && <Icon className='headerOption__icon'/>}
        {exist && <Avatar  className='headerOption__icon' src={avatar}>
                {user && user.email[0]}
            </ Avatar>}

        <h3 className='headerOption__title'>{title}</h3>
    </div>;
    
}

export default HeaderOption
