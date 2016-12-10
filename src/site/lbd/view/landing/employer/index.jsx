import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

var logo = require('../../../static/landing/logo.png'),
    arrow_up = require('../../../static/landing/arrowup.png'),
    label_01 = require('../../../static/landing/label-01.png'),
    label_02 = require('../../../static/landing/label-02.png'),
    label_03 = require('../../../static/landing/label-03.png'),
    label_04 = require('../../../static/landing/label-04.png'),
    partner_01 = require('../../../static/landing/partner-visual-china.png'),
    partner_02 = require('../../../static/landing/partner-yongyou.png'),
    partner_03 = require('../../../static/landing/partner-fenghuang.png'),
    partner_04 = require('../../../static/landing/partner-yy.png'),
    partner_05 = require('../../../static/landing/partner-yixin.png'),
    partner_06 = require('../../../static/landing/partner-netease.png');

class AppComponent extends React.Component {

    render() {
        return (
            <div className='index index-landing-employer'>
                <header className='page-header'>
                    <div className='header-logo'>
                        <img src={logo} alt='logo' />
                    </div>
                    <nav className='header-nav'>
                        <a href='/baidu/employer' className='active'>我是HR</a>
                        <a href='/baidu/headhunting'>我是猎头</a>
                    </nav>
                    <div className='header-login'>
                        <a href='/register'><button className='button'>立即注册</button></a>
                        <div>已有账号<a href='/login' className='login'>登录</a></div>
                    </div>
                    <div className='header-tip'><img src={arrow_up} alt='下拉箭头'/></div>
                </header>
                <section className='function-section'>
                    <ul className='function-list'>
                        <li className='item-01'>
                            <div className='function-logo'>
                                <img src={label_01} alt='发布职位' />
                            </div>
                            <div className='function-desc'>
                                <h1>发布职位</h1>
                                <p>自定义佣金在线发布职位</p>
                            </div>
                        </li>
                        <li className='item-02'>
                            <div className='function-logo'>
                                <img src={label_02} alt='猎头抢单' />
                            </div>
                            <div className='function-desc'>
                                <h1>猎头抢单</h1>
                                <p>猎头2小时极速抢单推荐</p>
                            </div>
                        </li>
                        <li className='item-03'>
                            <div className='function-logo'>
                                <img src={label_03} alt='公开反馈' />
                            </div>
                            <div className='function-desc'>
                                <h1>公开反馈</h1>
                                <p>猎头秒get职位需求</p>
                            </div>
                        </li>
                        <li className='item-04'>
                            <div className='function-logo'>
                                <img src={label_04} alt='offer' />
                            </div>
                            <div className='function-desc'>
                                <h1>offer</h1>
                                <p>平均10天找到合适人选</p>
                            </div>
                        </li>
                    </ul>
                </section>
                <section className='partner-section'>
                    <header>3000+知名互联网企业在用猎必得</header>
                    <div className='partners'>
                        <ul className='partner-list'>
                            <li><img src={partner_01} alt='视觉中国集团' /></li>
                            <li><img src={partner_02} alt='用友' /></li>
                            <li><img src={partner_03} alt='凤凰金融' /></li>
                        </ul>
                        <ul className='partner-list'>
                            <li><img src={partner_04} alt='欢聚时代' /></li>
                            <li><img src={partner_05} alt='宜信' /></li>
                            <li><img src={partner_06} alt='网易游戏' /></li>
                        </ul>
                    </div>
                    <a href='/register'><button className='register-btn'>立即注册</button></a>
                </section>
                <footer className='page-footer'>
                    <a href='http://www.liebide.com'>liebide.com</a>
                    <span>深圳八爪网络科技有限公司</span>
                </footer>
            </div>
        );
    }
}

// Render the main component into the dom
ReactDOM.render(<AppComponent />, document.getElementById('app'));

