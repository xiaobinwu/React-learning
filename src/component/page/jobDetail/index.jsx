import './index.scss';
import React from 'react';
import Collapse from '../collapse/index';
import GetOrderButton from '../getOrderButton/index';
import Footer from '../footer/index';
import Button from '../../base/button/index';

class JobDetail extends React.Component {
    renderFooter() {
        let { prefix, jobId, isFinished, isA2AJob, isMyJob, isProjectManagerOfJob, recommendCount, token } = this.props;

        if (isMyJob || isProjectManagerOfJob) {
            let type = isMyJob? 1 : 2,
                url = `/Mobile/Candidates?type=${type}&jobId=${jobId}`;
            return (
                <Footer>
                    <div className={`${prefix}-footer`}>
                        <a href={url}>
                            <Button block>查看收到的候选人({recommendCount})</Button>
                        </a>
                    </div>
                </Footer>
            )
        } else if (ISHR === 'False') {
            return <GetOrderButton
                     isFinished={isFinished}
                     isA2AJob={isA2AJob}
                     token={token}
                     jobId={jobId}
                     onClick={this.props.onClick.bind(this)}
                   />
        } else {
            return null
        }
    }

    render() {
        let { prefix, jobDescription, jobAnalysis, jobPeriod } = this.props;
        return (
            <div>
                <div className={prefix}>
                    <div className={`${prefix}-card`}>
                        <div className={`${prefix}-content`}>
                            <div className={`${prefix}-title`}>职位描述</div>
                            <Collapse row={4}>
                                <div
                                 className={`${prefix}-para`}
                                 dangerouslySetInnerHTML={{__html: jobDescription}}
                                />
                            </Collapse>
                        </div>
                    </div>
                    <div className={`${prefix}-card`}>
                        <div className={`${prefix}-content`}>
                            <div className={`${prefix}-title`}>职位分析</div>
                            <Collapse row={4}>
                                <div
                                 className={`${prefix}-para`}
                                 dangerouslySetInnerHTML={{__html: jobAnalysis}}
                                />
                            </Collapse>
                        </div>
                    </div>
                    {
                        jobPeriod ? (
                            <div className={`${prefix}-card`}>
                                <div className={`${prefix}-content`}>
                                    <div className={`${prefix}-title`}>保证期说明</div>
                                        <div className={`${prefix}-para`}>
                                            {jobPeriod}
                                        </div>
                                </div>
                            </div>
                        ) : null
                    }
                </div>
                { this.renderFooter() }
            </div>
        );
    }
}

JobDetail.propTypes = {
    prefix: React.PropTypes.string,
    jobDescription: React.PropTypes.string,
    jobAnalysis: React.PropTypes.string,
    jobPeriod: React.PropTypes.string
}

JobDetail.defaultProps = {
    prefix: 'lbd-job-detail',
    jobDescription: '',
    jobAnalysis: '',
    jobPeriod: ''
}

export default JobDetail;

