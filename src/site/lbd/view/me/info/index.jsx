import 'core-js/fn/object/assign';
import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'webpack-zepto';
import update from 'react-addons-update';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import SubHeader from '../../../../../component/page/subHeader/index';
import UserInfo from '../../../../../component/page/userInfo/index';

class AppComponent extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            headerData: {
                left: [{
                    icon: 'left-arrow',
                    link: '/Mobile/Me?clientAction=pop'
                }]
            },
            information: null,
            token: ''
        }
        this.handleLogout = () => {
            $.post('/Account/Logout', {__RequestVerificationToken: this.state.token }, () => {
                window.location.href = '/Login';
            })
        }
    }

    getToken() {
        let token = document.querySelector('input[name=__RequestVerificationToken]').value;
        this.setState({token: token});
    }

    componentDidMount() {
        this.setInitialData()
        this.getToken()
    }

    setInitialData() {
        let initialDataElm = document.getElementById('initialData'),
            data = JSON.parse(initialDataElm.innerHTML);
        let information = {
            avatarUrl: data.AvatarUrl,
            realName: data.RealName,
            nickname: data.Nickname,
            company: data.Company,
            email: data.Email,
            mobile: data.Mobile,
            slogan: data.Slogan
        }

        this.setState(update(this.state, {
            information: {$set: information}
        }));
    }

    render() {
        let { headerData, information } = this.state;
        return (
            <div className='index'>
                <SubHeader
                 title='个人信息'
                 fixed
                 data={headerData}
                />
                <div className='content'>
                    <UserInfo information={information} />
                    <div
                     className='loginOutBtn'
                     onClick={this.handleLogout} >
                        退出登录
                    </div>
                </div>
            </div>
        );
    }
}

// Render the main component into the dom
ReactDOM.render(<AppComponent />, document.getElementById('app'));

