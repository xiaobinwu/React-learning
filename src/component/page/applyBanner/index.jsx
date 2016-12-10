import './index.scss';
import React from 'react';
import Icon from '../icon/index';
import Avatar from '../avatar/index';

let ApplyBanner = (props) => {
    let { total, list, prefix, url, company } = props;
    return (
        <a href={url} className={`${prefix}-link`}>
            <div className={prefix}>
                <Icon type='alarm' width='50px' height='50px' />
                <div className={`${prefix}-content truncate`}>
                    <div>申请加入</div>
                    <div className={`${prefix}-text is-orange truncate`}>{total}人申请加入{company}</div>
                </div>
                <div className={`${prefix}-avatars`}>
                    {
                        total > 0 ? list.filter((url, i) => i < 3).map((url, i) => {
                            return <Avatar key={`${prefix}-${i}`} url={url} className={`${prefix}-avatar`}/>
                        }) : null
                    }
                    <Icon type='back' width='20px' height='12px' className={`${prefix}-arrow`}/>
                </div>
            </div>
        </a>
    )
}

ApplyBanner.propTypes = {
    prefix: React.PropTypes.string
}

ApplyBanner.defaultProps = {
    prefix: 'lbd-apply-banner'
}

export default ApplyBanner;
