import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import Button from '../../../../../component/base/button/index';

class AppComponent extends React.Component {

    render() {
        return (
            <div className="index index-error">
                <div className='errorImg'>
                    <img src='//hstatic.hirede.com/lbd/mobile/images/common/error.png' />
                </div>
                <div className='errorMeg'>无法找到该页面(404)</div>
                <a href='/'>
                    <Button size='lg' type='hollow'>返回主页</Button>
                </a>
            </div>
        );
    }
}

// Render the main component into the dom
ReactDOM.render(<AppComponent />, document.getElementById('app'));

