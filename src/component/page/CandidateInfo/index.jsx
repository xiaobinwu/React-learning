import './index.scss';
import React from 'react';
import Icon from '../icon/index';
import Avatar from '../avatar/index';

import { date } from '../../../utils/date';
import { recommendStatusFilter } from '../../../utils/recommendStatusFilter';

let CandidateInfo = (props) => {
    let { item, prefix } = props;
    item = item || {};
    let { name, employInfo = '', degreeInfo = '', location, email, mobile, jobName, company, hunterAvatar='', created, recommendStatus } = item;

    employInfo = employInfo.split('▪').join('·');
    degreeInfo = degreeInfo.split('▪').join('·');

    return (
        <div>
            <div className={prefix}>
                <div className={`${prefix}-header ${prefix}-between`}>
                    <span className={`${prefix}-name`}>{name}</span>
                    <div className={`${prefix}-message`}>
                        <span className={`${prefix}-status`}>{recommendStatusFilter(recommendStatus)}</span>
                    </div>
                </div>
                <div className={`${prefix}-line ${prefix}-info`}>
                    <Icon type="building" size="sm" />
                    <span className={`${prefix}-padding`}>{employInfo}</span>
                </div>
                <div className={`${prefix}-line ${prefix}-info`}>
                    <Icon type="hat" size="sm" />
                    <span className={`${prefix}-padding`}>{degreeInfo}</span>
                </div>
                <div className={`${prefix}-footer`}>
                    <div className={`${prefix}-item`}>
                        <Icon type="position" size="sm" />
                        <span className={`${prefix}-padding-sm`}>{location}</span>
                    </div>
                    <div className={`${prefix}-item`}>
                        <Icon type="mail" size="sm" />
                        <span className={`${prefix}-padding-sm`}>{email}</span>
                    </div>
                    <div className={`${prefix}-item`}>
                        <Icon type="phone" size="sm" />
                        <a className={`${prefix}-padding-sm`} href={`tel:${mobile}`}>{mobile}</a>
                    </div>
                </div>
            </div>
            <div className={`${prefix}-column ${prefix}-between`}>
                <div className={`${prefix}-left`}>
                    <Avatar url={hunterAvatar} />
                    <span className={`${prefix}-padding ${prefix}-recommend`}>推荐到{company}-{jobName}</span>
                </div>
                <span className={`${prefix}-align-right`}>{date(created)}</span>
            </div>
        </div>
    )
};

CandidateInfo.propTypes = {
    prefix: React.PropTypes.string
}

CandidateInfo.defaultProps = {
    prefix: 'lbd-candidate-info'
}

export default CandidateInfo;

