import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

var logo = require('../../../static/landing/logo.png'),
    arrow_up = require('../../../static/landing/arrowup.png'),
    feature_01 = require('../../../static/landing/feature-01.png'),
    feature_02 = require('../../../static/landing/feature-02.png'),
    feature_03 = require('../../../static/landing/feature-03.png'),
    feature_04 = require('../../../static/landing/feature-04.png'),
    desc_01 = require('../../../static/landing/desc-01.png'),
    desc_02 = require('../../../static/landing/desc-02.png'),
    desc_03 = require('../../../static/landing/desc-03.png'),
    desc_04 = require('../../../static/landing/desc-04.png');

class AppComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentindex: 1,
            shouldAnimate: true
        }
        this.onTranslate = () => {
            let index = this.state.currentindex,
                currentindex;

            if (index === 4) {
                this.setState({
                    currentindex: 0,
                    shouldAnimate:  false
                })
                requestAnimationFrame(this.onTranslate)
            }else {
                this.setState({
                    currentindex: index + 1,
                    shouldAnimate:  true
                })
            }
        }
    }

    componentDidMount() {
        this.interval = setInterval(this.onTranslate, 4000);
    }

    componentWillUnmount() {
         this.clearInterval(this.interval)
    }

    render() {
        let width = window.innerWidth,
            index = this.state.currentindex,
            translateX = -(width*index);

        let caseContainerStyle = {
            width: width*5
        }

        if (this.state.shouldAnimate) {
            caseContainerStyle.transform = `translate3d(${translateX}px, 0px, 0px )`;
            caseContainerStyle.transitionProperty = 'transform';
            caseContainerStyle.transitionTimingFunction = 'cubic-bezier(0, 0, 0.5, 1)';
            caseContainerStyle.transitionDuration = '350ms';
        }else {
            caseContainerStyle.transform = `translate3d(${translateX}px, 0px, 0px )`;
        }

        return (
            <div className='index index-landing-headhunting'>
                <header className='page-header'>
                    <div className='header-logo'>
                        <img src={logo} alt='logo' />
                    </div>
                    <nav className='header-nav'>
                        <a href='/baidu/employer'>我是HR</a>
                        <a href='/baidu/headhunting' className='active'>我是猎头</a>
                    </nav>
                    <div className='header-login'>
                        <a href='/register'><button className='button'>立即注册</button></a>
                        <div>已有账号<a href='/login' className='login'>登录</a></div>
                    </div>
                    <div className='header-tip'><img src={arrow_up} alt='下拉箭头'/></div>
                </header>
                <section className='function-section'>
                    <ul className='feature-list'>
                        <li>
                            <img src={feature_01} alt='抢单推荐' />
                            <p>抢单推荐</p>
                        </li>
                        <li>
                            <img src={feature_02} alt='安排面试' />
                            <p>安排面试</p>
                        </li>
                        <li>
                            <img src={feature_03} alt='Offer' />
                            <p>Offer</p>
                        </li>
                        <li>
                            <img src={feature_04} alt='入职即付75%' />
                            <p>入职即付75%</p>
                        </li>
                    </ul>
                    <ul className='function-list'>
                        <li className='item-01'>
                            <div className='function-logo'>
                                <img src={desc_01} alt='回款慢，没保障？' />
                            </div>
                            <div className='function-desc'>
                                <h1>回款慢，没保障？</h1>
                                <p>上猎必得，入职即付75%, 平台担保垫付佣金</p>
                            </div>
                        </li>
                        <li className='item-02'>
                            <div className='function-logo'>
                                <img src={desc_02} alt='寻访难，缺渠道？' />
                            </div>
                            <div className='function-desc'>
                                <h1>寻访难，缺渠道？</h1>
                                <p>云端人才库，百万份互联网人才鲜活简历供你挑选</p>
                            </div>
                        </li>
                        <li className='item-03'>
                            <div className='function-logo'>
                                <img src={desc_03} alt='单子多，难交付？' />
                            </div>
                            <div className='function-desc'>
                                <h1>单子多，难交付？</h1>
                                <p>来猎必得发布职位3000+猎头帮你做单</p>
                            </div>
                        </li>
                        <li className='item-04'>
                            <div className='function-logo'>
                                <img src={desc_04} alt='想创业，没资金？r' />
                            </div>
                            <div className='function-desc'>
                                <h1>想创业，没资金？</h1>
                                <p>云猎空间提供免费工位, 专业培训、扶持基金让你安心做猎头</p>
                            </div>
                        </li>
                    </ul>
                </section>
                <section className='case-section'>
                    <header>最新职位</header>
                    <div className='cases'>
                        <div className='case-container' style={caseContainerStyle}>
                            <div className='case-item'>
                                <div className='table-row'>
                                    视觉中国集团视觉研发工程师
                                </div>
                                <div className='table-row'>
                                    最高佣金<span className='hightlight'>68</span>K
                                </div>
                                <div className='table-row'>
                                    <p>
                                        HR
                                        <span className='nickname'>@90Alice </span>
                                        给猎头发了
                                        <span className='money'>30元</span>
                                        红包：
                                    </p>
                                    <p>“紧急寻android工程师通信行业，推就获红包。”</p>
                                </div>
                            </div>
                            <div className='case-item'>
                                <div className='table-row'>
                                    用友产品运营总监
                                </div>
                                <div className='table-row'>
                                    最高佣金<span className='hightlight'>85</span>K
                                </div>
                                <div className='table-row'>
                                    <p>HR<span className='nickname'>@monkey</span>对候选人进行了评论：</p>
                                    <p>“候选人资质很不错，很满意。”</p>
                                </div>
                            </div>
                            <div className='case-item'>
                                <div className='table-row'>
                                    凤凰金融web前端
                                </div>
                                <div className='table-row'>
                                    最高佣金<span className='hightlight'>60</span>K
                                </div>
                                <div className='table-row'>
                                    <p>
                                        HR
                                        <span className='nickname'>@peterpan2016 </span>
                                        给猎头发了
                                        <span className='money'>50元</span>
                                        红包：
                                    </p>
                                    <p>“ 这个候选人很赞！”</p>
                                </div>
                            </div>
                            <div className='case-item'>
                                <div className='table-row'>
                                    宜信java高级工程师
                                </div>
                                <div className='table-row'>
                                    最高佣金<span className='hightlight'>60</span>K
                                </div>
                                <div className='table-row'>
                                    <p>HR<span className='nickname'>@Winona </span>对候选人进行了评论</p>
                                    <p>“候选人技术能力强，英文也很流利。”</p>
                                </div>
                            </div>
                            <div className='case-item'>
                                <div className='table-row'>
                                    视觉中国集团视觉研发工程师
                                </div>
                                <div className='table-row'>
                                    最高佣金<span className='hightlight'>68</span>K
                                </div>
                                <div className='table-row'>
                                    <p>
                                        HR
                                        <span className='nickname'>@90Alice </span>
                                        给猎头发了
                                        <span className='money'>30元</span>
                                        红包：
                                    </p>
                                    <p>“急寻android工程师通信行业，推就获红包。”</p>
                                </div>
                            </div>
                        </div>
                        <div className='case-tab'>
                            {
                                [1, 2, 3, 4].map((item, i) => {
                                    return <a className={this.state.currentindex == item ? 'dot current' : 'dot'} key={i}></a>
                                })
                            }
                        </div>
                    </div>
                    <footer>
                        <a href='/register'><button className='register-btn'>立即注册</button></a>
                    </footer>
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

