import './index.scss';
import React from 'react';
import Icon from '../icon/index';
import { date } from '../../../utils/date';
import { recommendStatusFilter } from '../../../utils/recommendStatusFilter';

let CandidateItem = (props) => {
    let { realName, recommendStatus, company, title, degreeInfo, firmName, jobName, recommendDate } = props.item;
    degreeInfo = degreeInfo.split(' ').join('·');

    return (
        <div className="lbd-candidate-item">
            <div className="lbd-candidate-item-header lbd-candidate-item-between">
                <span className="lbd-candidate-item-name">{realName}</span>
                <div className="lbd-candidate-item-message">
                    <span className="lbd-candidate-item-status">{recommendStatusFilter(recommendStatus)}</span>
                </div>
            </div>
            <div className="lbd-candidate-item-info lbd-candidate-item-line">
                <Icon type="building" size="sm" />
                <span className="lbd-candidate-item-padding">{company}·{title}</span>
            </div>
            <div className="lbd-candidate-item-info lbd-candidate-item-line">
                <Icon type="hat" size="sm" />
                <span className="lbd-candidate-item-padding">{degreeInfo}</span>
            </div>
            <div className="lbd-candidate-item-footer lbd-candidate-item-between">
                <div className="lbd-candidate-item-truncate">
                    <Icon type="file" size="md" />
                    <span className="lbd-candidate-item-padding ">推荐到{firmName}-{jobName}</span>
                </div>
                <span className="lbd-candidate-item-align-right">{date(recommendDate)}</span>
            </div>
        </div>
    )
};

CandidateItem.propTypes = {
    recommendDate: React.PropTypes.string
}

export default CandidateItem;

