import 'core-js/fn/object/assign';
import 'core-js/es6/promise';

import $ from 'webpack-zepto';
import update from 'react-addons-update';
import './index.scss';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import React from 'react';
import ReactDOM from 'react-dom';

import SubHeader from '../../../../../component/page/subHeader/index';
import Panel from '../../../../../component/base/panel/index';
import TabPanel from '../../../../../component/base/tabPanel/index';
import CandidateInfo from '../../../../../component/page/candidateInfo/index';
import CandidateDetail from '../../../../../component/page/candidateDetail/index';
import CommentList from '../../../../../component/page/commentList/index';
import TimeLine from '../../../../../component/page/timeLine/index';

class AppComponent extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            headerData: {
                left: [{
                    icon: 'left-arrow',
                    link: '/Mobile/Candidates?clientAction=popToRoot'
                }]
            },
            recommendId: '',
            candidateName: '',
            company: '',
            candidateInfo: null,
            token: '',
            content: '',
            resumeFiles: [],
            readRecords: [],
            hash: '',
            commentCounts: 0
        }
        this.handleCollapse = () => {
            this.setReadByUser()
        }
        this.handleAddComment = () => {
            this.setState({commentCounts: this.state.commentCounts + 1})
        }
    }

    setInitialData() {
        let initialDataElm = document.getElementById('initialData'),
            token = document.querySelector('input[name=__RequestVerificationToken]').value,
            data = JSON.parse(initialDataElm.innerHTML),
            hash = window.location.hash;
        let candidateInfo = {
            name: data.RealName,
            employInfo: data.PresentEmployerInfo,
            degreeInfo: data.DegreeInfo,
            location: data.CityName,
            email: data.Email,
            mobile: data.Mobile,
            jobName: data.JobName,
            company: data.EmployCompany,
            hunterAvatar: data.HunterAvatarUrl,
            created: data.CreateDate,
            jobName: data.JobName,
            recommendStatus: data.RecommendStatus
        };

        return new Promise((resolve) => {
            this.setState(update(this.state, {
                recommendId: {$set: data.Id},
                candidateName: {$set: data.RealName},
                company: {$set: data.EmployCompany},
                candidateInfo: {$set: candidateInfo},
                token: {$set: token},
                content: {$set: data.Content},
                resumeFiles: {$set: data.Attachments},
                hash: {$set: hash},
                commentCounts: {$set: data.CommentsCount}
            }));

            resolve()
        })
    }

    componentWillMount() {
        this.setInitialData()
            .then(this.getReadRecords.bind(this))
    }

    getReadRecords() {
        $.get(`/Recommendation/${this.state.recommendId}/ReadRecords`, (result) => {
            if(result.succeeded) {
                this.setState({readRecords: result.data})
            }
        })
    }

    setReadByUser() {
        $.post('/Recommendation/SetReadByUser', {
            recommendationId: this.state.recommendId
        }, (result) => {
            if (result.succeeded) {
                let readRecords = this.state.readRecords;
                for ( var i = 0, len = readRecords.length; i < len; i++){
                    if (readRecords[i].isUser && !readRecords[i].hasRead) {
                        this.setState(update(this.state, {
                            readRecords: {
                                [i]: {
                                    hasRead: {$set: true},
                                    updated: {$apply: () => new Date().toLocaleString('chinese',{hour12:false})}
                                }
                            }
                        }))
                        break;
                    }
                }
            }
        })
    }

    render() {
        let { headerData, candidateName, company, candidateInfo, content, resumeFiles, readRecords, hash, commentCounts } = this.state;
        let activeTab = 0;
        if ( hash) {
            switch (hash) {
                case '#resume':
                    activeTab = 0;
                    break;
                case '#comments':
                    activeTab = 1;
                    break;
                case '#timeline':
                    activeTab = 2;
                    break;
                default:
                    activeTab = 0;
                    break;
            }
        }
        return (
            <div className="index">
                <SubHeader
                 title={`${candidateName}-推荐到${company}`}
                 fixed
                 data={headerData} />

                <div className="content">
                    <CandidateInfo item={candidateInfo} />
                    <TabPanel activeTab={activeTab}>
                        <Panel title="简历" key="0" url='resume'>
                            <CandidateDetail
                             content={content}
                             resumeFiles={resumeFiles}
                             readRecords={readRecords}
                             jobId={this.state.recommendId}
                             handleCollapse={this.handleCollapse} />
                        </Panel>
                        <Panel title={commentCounts ? `评论 ${commentCounts}` : '评论'} key="1" url='comments'>
                            <CommentList
                             url={`/Recommendation/${this.state.recommendId}/Comments`}
                             jobId={this.state.recommendId}
                             type='Recommendation'
                             addComment={this.handleAddComment} />
                        </Panel>
                        <Panel title="时间线" key="2" url='timeline'>
                            <TimeLine url={`/Mobile/Recommendation/${this.state.recommendId}/TimeLine`} />
                        </Panel>
                    </TabPanel>

                </div>

            </div>
        );
    }
}

// Render the main component into the dom
ReactDOM.render(<AppComponent />, document.getElementById('app'));

