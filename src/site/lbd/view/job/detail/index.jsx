import 'core-js/fn/object/assign';

import $ from 'webpack-zepto';
import update from 'react-addons-update';
import './index.scss';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import React from 'react';
import ReactDOM from 'react-dom';

import SubHeader from '../../../../../component/page/subHeader/index';
import JobInfo from '../../../../../component/page/jobInfo/index';
import JobDetail from '../../../../../component/page/jobDetail/index';
import CommentList from '../../../../../component/page/commentList/index';
import JobFeed from '../../../../../component/page/jobFeed/index';

import Panel from '../../../../../component/base/panel/index';
import TabPanel from '../../../../../component/base/tabPanel/index';


class AppComponent extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            headerData: {
                left: [{
                    icon: 'left-arrow',
                    link: '/Mobile/Jobs?clientAction=popToRoot'
                }]
            },
            jobId: '',
            jobName: '',
            jobInfo: null,
            jobDescription: '',
            jobAnalysis: '',
            jobPeriod: '',
            token: '',
            isFinished: false,
            isA2AJob: false,
            isMyJob: false,
            isProjectManagerOfJob: false,
            recommendCount: 0,
            hash: '',
            commentCounts: 0
        }
        this.handleGetOrder = () => {
            this.setState({isFinished: true})
        }
        this.handleAddComment = () => {
            this.setState({commentCounts: this.state.commentCounts + 1})
        }
    }

    setInitialData() {
        let initialDataElm = document.getElementById('initialData'),
            token = document.querySelector("input[name=__RequestVerificationToken]").value,
            data = JSON.parse(initialDataElm.innerHTML),
            hash = window.location.hash;
        let jobInfo = {
            name: data.Name,
            recruiterFirmShortName: data.RecruiterFirmShortName,
            location: data.Location,
            salary: data.Salary,
            commissionValue: data.CommissionValue,
            recruitingCount: data.RecruitingCount,
            offerCount: data.OfferCount,
            interviewCount: data.InterviewCount,
            orderCount: data.OrderCount,
            recommendTotal: data.RecommendCount,
            recruiterAvatarUrl: data.RecruiterAvatarUrl,
            recruiterRealName: data.RecruiterRealName,
            pmAvatarUrl: data.PMAvatarUrl,
            pmName: data.PMName,
            update: data.Update,
            ispmJob: data.IsPMJob,
            isA2AJob: data.IsA2AJob
        };

        let jobPeriod = '';
        if (data.JobType == 1) {
            if (data.RefundPolicyDescription) {
                jobPeriod = `${data.RefundPolicyDescription}\n*如和线下合同冲突，以线上公司设定为准`
            } else {
                jobPeriod = '按合同约定'
            }
        } else if (data.JobType == 2 && data.CanViewInternalInformation) {
            jobPeriod = `【本职位由我公司发布】 内部佣金: ${data.InternalCommissionValue}, 保证期: ${data.InternalGuaranteePeriod}, 内部退款条款按客户合同约定。`
        }

        this.setState(update(this.state, {
            jobId: {$set: data.Id},
            jobName: {$set: data.Name},
            jobInfo: {$set: jobInfo},
            jobDescription: {$set: data.Description},
            jobAnalysis: {$set: data.Analysis},
            jobPeriod: {$set: jobPeriod},
            isFinished: {$set: data.IsMyOrder},
            isA2AJob: {$set: data.IsA2AJob},
            isMyJob: {$set: data.IsMyJob},
            isProjectManagerOfJob: {$set: data.IsProjectManagerOfJob},
            recommendCount: {$set: data.RecommendCount},
            token: {$set: token},
            hash: {$set: hash},
            commentCounts: {$set: data.CommentsCount}
        }));
    }

    componentWillMount() {
        this.setInitialData()
    }

    render() {
        let { jobName, headerData, jobInfo, jobDescription, jobAnalysis, jobPeriod, jobId,
              isFinished, isA2AJob, isMyJob, isProjectManagerOfJob, recommendCount, token, hash, commentCounts } = this.state;
        let activeTab = 0;
        if ( hash) {
            switch (hash) {
                case '#detail':
                    activeTab = 0;
                    break;
                case '#comments':
                    activeTab = 1;
                    break;
                case '#feeds':
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
                 title={jobName}
                 fixed
                 data={headerData} />

                <div className="content">
                    <JobInfo item={jobInfo} />
                    <TabPanel activeTab={activeTab}>
                        <Panel title="详情" key="0" url='detail'>
                            <JobDetail
                             jobDescription={jobDescription}
                             jobAnalysis={jobAnalysis}
                             jobPeriod={jobPeriod}
                             isFinished={isFinished}
                             isA2AJob={isA2AJob}
                             isMyJob={isMyJob}
                             isProjectManagerOfJob={isProjectManagerOfJob}
                             recommendCount={recommendCount}
                             token={token}
                             jobId={jobId}
                             onClick={this.handleGetOrder}
                            />
                        </Panel>
                        <Panel title={commentCounts ? `评论 ${commentCounts}` : '评论'} key="1" url='comments'>
                            <CommentList
                             url={`/Job/${jobId}/Comments`}
                             jobId={jobId}
                             addComment={this.handleAddComment}
                             type="Job"/>
                        </Panel>
                        <Panel title="动态" key="2" url='feeds'>
                            <JobFeed url={`/Job/${jobId}/Feed`} />
                        </Panel>
                    </TabPanel>
                </div>
            </div>
        );
    }
}

// Render the main component into the dom
ReactDOM.render(<AppComponent />, document.getElementById('app'));

