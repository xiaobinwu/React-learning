import './index.scss';
import React from 'react';

let GetJobModal = (props) => {
    let { leftOrdersAmount, refundPolicyDescription } = props

    return (
        <div className="lbd-job-modal">
            <div className="lbd-job-modal-title">
                <span>您有</span>
                <span className="lbd-job-modal-orange">{leftOrdersAmount}</span>
                <span>个抢单名额，抢下剩</span>
                <span className="lbd-job-modal-orange">{leftOrdersAmount-1}</span>
                <span>个</span>
            </div>
            <div className="lbd-job-modal-content">保证期退款条款：{refundPolicyDescription}</div>
        </div>
    )
};

GetJobModal.propTypes = {
    leftOrdersAmount: React.PropTypes.number,
    refundPolicyDescription: React.PropTypes.string
}

GetJobModal.defaultProps = {
    leftOrdersAmount: 0,
    refundPolicyDescription: ''
}

export default GetJobModal;
