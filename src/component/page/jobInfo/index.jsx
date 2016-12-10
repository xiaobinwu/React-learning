import './index.scss';
import React from 'react';
import Icon from '../icon/index';
import Tag from '../tag/index';
import Avatar from '../avatar/index';

import { date } from '../../../utils/date';

let JobInfo = (props) => {
    let { item, prefix } = props;
    item = item || {};
    let { name, recruiterFirmShortName, location, salary, commissionValue, recruitingCount,
          offerCount = 0, interviewCount = 0, orderCount= 0, recommendTotal=0,
          recruiterAvatarUrl, recruiterRealName, pmAvatarUrl, pmName,
          update, ispmJob, isA2AJob } = item;

    return (
        <div className={prefix}>
            <div className={`${prefix}-header ${prefix}-line`}>
                <span className={`${prefix}-name truncate`}>{name}</span>
                {(ispmJob)
                  ? <Tag type='pm-job' />
                  : null
                }
                {(isA2AJob)
                  ? <Tag type='a2a-job' />
                  : null
                }
            </div>
            <div className={`${prefix}-info ${prefix}-line`}>
                <Icon type="building" size="sm" />
                <span className={`${prefix}-padding ${prefix}-firm truncate`}>{recruiterFirmShortName}</span>
                <Icon type="position" size="sm" />
                <span className={`${prefix}-padding ${prefix}-loc truncate`}>{location}</span>
            </div>
            <div className={`${prefix}-subinfo`}>
                <span>月薪</span>
                <span className={`${prefix}-padding ${prefix}-orange`}>{salary}</span>
                <span>佣金</span>
                <span className={`${prefix}-padding ${prefix}-orange`}>{commissionValue}</span>
                <span>需</span><span className={`${prefix}-orange`}>{recruitingCount}</span><span>人</span>
            </div>
            <div className={`${prefix}-statics`}>
                <div className={`${prefix}-num`}>
                    <span>抢</span>
                    <span>{orderCount}</span>
                </div>
                <div className={`${prefix}-num`}>
                    <span>推</span>
                    <span>{recommendTotal}</span>
                </div>
                <div className={`${prefix}-num`}>
                    <span>面</span>
                    <span>{interviewCount}</span>
                </div>
                <div className={`${prefix}-num`}>
                    <span>Offer</span>
                    <span>{offerCount}</span>
                </div>
            </div>
            <div className={`${prefix}-footer`}>
                {
                    recruiterRealName ? (
                        <div className={`${prefix}-footer-item`}>
                            <Avatar url={recruiterAvatarUrl} />
                            <div className={`${prefix}-tag`}><Tag type='hr' /></div>
                        </div>
                    ) : null
                }
                {
                    pmName ? (
                        <div className={`${prefix}-footer-item`}>
                            <Avatar url={pmAvatarUrl} />
                            <div className={`${prefix}-tag`}><Tag type='pm' /></div>
                        </div>
                    ) : null
                }
                <div className={`${prefix}-footer-item`}>
                    <span className={`${prefix}-font`}>{date(update)}</span>
                    <span className={`${prefix}-font ${prefix}-gray`}>更新</span>
                </div>
            </div>
        </div>
    )
};

JobInfo.propTypes = {
    item: React.PropTypes.shape({
        recommendationStatistic: React.PropTypes.shape({
            offerCount: React.PropTypes.number,
            interviewCount: React.PropTypes.number,
            total: React.PropTypes.number
        }),
        acceptedHeadhuntersCount: React.PropTypes.number,
        hasProjectManager: React.PropTypes.bool,
        isA2A: React.PropTypes.bool
    }),
    prefix: React.PropTypes.string
}

JobInfo.defaultProps = {
    prefix: 'lbd-job-info'
}

export default JobInfo;

