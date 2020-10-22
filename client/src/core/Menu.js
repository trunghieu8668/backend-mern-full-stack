import React, { Fragment } from 'react';
import {Link, withRouter} from 'react-router-dom'
import { signout, isAuthenticated } from '../auth';
import { itemTotal } from './cartHelpers'
import { Home } from 'react-feather';

const isActive = (history, path) => {
    if(history.location.pathname === path){
        return {color: 'yellow'}
    }
    else {
        return {color: '#fff'}
    }
}

const Menu = ({history}) => {
    return (
      <nav className="container">
          <ul className="Menu-Top clearfix w-100 d-none d-lg-flex d-xl-flex">
            <li><a href="/"><Home className="fa" size="25" color="white"/></a></li>
            <li><a href="gas.html">Gas</a></li>
            <li><a href="gao.html">Gạo</a></li>
            <li><a href="nuoc.html">Nước</a></li>
            <li><a href="bia.html">Bia</a></li>
            <li><a href="nuoc-ngot.html">Nước ngọt</a></li>
            <li className><a href="nuoc-mam.html">Nước mắm</a></li>
            <li><a href="tra.html">Trà</a></li>
            <li><a href="thiet-bi.html">Thiết bị</a></li>
            <li><a href="tin-tuc.html">Tin tức</a></li>
         </ul>
       </nav>
    );
};

export default withRouter(Menu);
