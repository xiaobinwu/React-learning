import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import Button from '../../../../../component/base/button/index';

class AppComponent extends React.Component {

    render() {
        return (
            <div className="index index-error">
                <div className='errorMegTitle'>对不起，出错了！</div>
                <div className='errorMeg'>text</div>
                <a href='/'>
                    <Button size='lg' type='hollow'>返回主页</Button>
                </a>
            </div>
        );
    }
}

// Render the main component into the dom
ReactDOM.render(<AppComponent />, document.getElementById('app'));

