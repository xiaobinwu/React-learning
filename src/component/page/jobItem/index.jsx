import './index.scss';
import React from 'react';
import Icon from '../icon/index';
import Tag from '../tag/index';

let JobItem = (props) => {
    let { name, firmShortName, location, salary, commissionValue, recruitingCount,
        recommendationStatistic, orderCount= 0, created,
        hasProjectManager, isA2A } = props.item;

    recommendationStatistic = recommendationStatistic || {};
    let { offerCount = 0, interviewCount = 0, total = 0 } = recommendationStatistic;

    return (
        <div className="lbd-job-item">
            <div className="lbd-job-item-header lbd-job-item-line">
                <span className="lbd-job-item-name truncate">{name}</span>
                {(hasProjectManager)
                  ? <Tag type='pm-job' />
                  : null
                }
                {(isA2A)
                  ? <Tag type='a2a-job' />
                  : null
                }
            </div>
            <div className="lbd-job-item-info lbd-job-item-line">
                <Icon type="building" size="sm" />
                <span className="lbd-job-item-padding lbd-job-item-firm truncate">{firmShortName}</span>
                <Icon type="position" size="sm" />
                <span className="lbd-job-item-padding lbd-job-item-loc truncate">{location}</span>
            </div>
            <div className="lbd-job-item-subinfo">
                <span>月薪</span>
                <span className="lbd-job-item-padding lbd-job-item-orange">{salary}</span>
                <span>佣金</span>
                <span className="lbd-job-item-padding lbd-job-item-orange">{commissionValue}</span>
                <span>需</span><span className="lbd-job-item-orange">{recruitingCount}</span><span>人</span>
            </div>
            <div className="lbd-job-item-footer">
                <div className="lbd-job-item-num">
                    <span>抢</span>
                    <span>{orderCount}</span>
                </div>
                <div className="lbd-job-item-num">
                    <span>推</span>
                    <span>{total}</span>
                </div>
                <div className="lbd-job-item-num">
                    <span>面</span>
                    <span>{interviewCount}</span>
                </div>
                <div className="lbd-job-item-num">
                    <span>Offer</span>
                    <span>{offerCount}</span>
                </div>
                <span className="lbd-job-item-float-right">{created}</span>
            </div>
        </div>
    )
};

JobItem.propTypes = {
    recommendationStatistic: React.PropTypes.shape({
        offerCount: React.PropTypes.number,
        interviewCount: React.PropTypes.number,
        total: React.PropTypes.number
    }),
    acceptedHeadhuntersCount: React.PropTypes.number,
    hasProjectManager: React.PropTypes.bool.isRequired,
    isA2A: React.PropTypes.bool.isRequired
}

export default JobItem;

