import 'core-js/fn/object/assign';
import './index.scss';

import $ from 'webpack-zepto';
import update from 'react-addons-update';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import React from 'react';
import ReactDOM from 'react-dom';
import Nav from '../../../../../component/page/nav/index';
import UserSelf from '../../../../../component/page/userSelf/index';
import FeedList from '../../../../../component/page/feedList/index';

import { getQuery } from '../../../../../utils/queryUrl';

class AppComponent extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            nav: {
                activeTab: 'me',
                hasRedpoint: []
            },
            avatarUrl: '',
            realName: '',
            nickname: '',
            clientFrom: null
        }
    }

    componentDidMount() {
        this.setInitialData();
        this.getUnreadCount();
    }

    componentWillMount() {
        let clientFrom = getQuery()['clientFrom'];
        if (clientFrom && clientFrom === 'iOS' || clientFrom === 'Android') {
            this.setState({clientFrom})
        }
    }

    getUnreadCount(){
        $.get('/Mobile/Message/UnreadCount', (result) => {
            if (result.succeeded) {
                if (result.data.messageCount > 0) {
                  this.setState(update(this.state, {
                      nav: {
                        hasRedpoint: {$push: ['messages']}
                      }
                  }))
                }
            }
        })
    }

    setInitialData() {

        this.setState(update(this.state, {
            avatarUrl: {$set: AVATARURL},
            realName: {$set: REALNAME},
            nickname: {$set: NICKNAME}
        }));
    }

    render() {
        let { avatarUrl, realName, nickname, nav } = this.state;
        return (
            <div className="index">
                <div className='content'>
                    <UserSelf
                     avatarUrl={avatarUrl}
                     realName={realName}
                     nickname={nickname}
                    />
                    <div className='divider'>动态</div>
                    <FeedList url='/Mobile/Me/MyActivities' />
                </div>
                <Nav nav={nav} visible={!this.state.clientFrom} />
            </div>
        );
    }
}

// Render the main component into the dom
ReactDOM.render(<AppComponent />, document.getElementById('app'));

