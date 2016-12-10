import './index.scss';
import React from 'react';

import Icon from '../../page/icon/index';

let Header = (props) => {
    return (
        <div className='header'>
            <img className="header-logo" src="/Areas/Mobile/Static/Images/Common/icon-logo.png" />
            {props.isHR ? null : (
                <a className='header-search' href='/Mobile/Job/Search'>
                    <Icon type='search' size='md' />
                </a>
            )}
        </div>
    )
};

Header.displayName = 'PageHeader';

export default Header;
