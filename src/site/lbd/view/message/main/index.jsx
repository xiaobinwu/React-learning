import 'core-js/fn/object/assign';
import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'webpack-zepto';
import update from 'react-addons-update';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import SubHeader from '../../../../../component/page/subHeader/index';
import Nav from '../../../../../component/page/nav/index';
import ApplyBanner from '../../../../../component/page/applyBanner/index';
import CommentList from '../../../../../component/page/commentList/index';

import { getQuery } from '../../../../../utils/queryUrl';

class AppComponent extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            nav: {
                activeTab: 'messages',
                hasRedpoint: []
            },
            applyJoinNum: 0,
            company: '',
            isAdmin: true,
            joinListAvatar: [],
            clientFrom: null
        }

    }

    readAllNewComments() {
        $.post('/Mobile/Message/ReadAllNewComments');
    }

    getJoiningApplicationList() {
        $.get('/Mobile/Message/JoiningApplications', (result) => {
            this.setState({joinList: result.data})
        })
    }

    setInitialData() {
        let initialDataElm = document.getElementById('initialData'),
            data = JSON.parse(initialDataElm.innerHTML);

        this.setState(update(this.state, {
            applyJoinNum: {$set: data.ApplicationCount},
            joinListAvatar: {$set: data.ApplicantAvatarUrls},
            company: {$set: data.FirmShortName},
            isAdmin: {$set: data.IsAdmin}
        }));
    }

    componentDidMount() {
        this.readAllNewComments()
        this.setInitialData()
    }

    componentWillMount() {
        let clientFrom = getQuery()['clientFrom'];
        if (clientFrom && clientFrom === 'iOS' || clientFrom === 'Android') {
            this.setState({clientFrom})
        }
    }

    render() {
        let { nav, applyJoinNum, joinListAvatar, company, isAdmin } = this.state;
        return (
            <div className='index'>
                <SubHeader title='消息' fixed />
                <div className='content'>
                    {
                        isAdmin && applyJoinNum > 0 ? (
                            <ApplyBanner
                             total={applyJoinNum}
                             list={joinListAvatar}
                             company={company}
                             url='/Mobile/JoiningApplications?clientAction=push'
                            />
                        ) : null
                    }
                    <div className='divider'>最新消息</div>
                    <CommentList url='/Mobile/Message/MessageList' hasNoReply/>
                </div>
                <Nav nav={nav} visible={!this.state.clientFrom} />
            </div>
        );
    }
}

// Render the main component into the dom
ReactDOM.render(<AppComponent />, document.getElementById('app'));

