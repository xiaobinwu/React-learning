import './index.scss';
import React from 'react';
import Avatar from '../avatar/index';
import Button from '../../base/button/index';

let JoinItem = (props) => {

    let { prefix, item, handleAccept, handleDecline } = props;
    let { avatarUrl, realName, nickName, message, accepted, declined, key } = item;

    return (
        <div className={prefix}>
            <div className={`${prefix}-left`}>
                <Avatar url={avatarUrl}/>
            </div>
            <div className={`${prefix}-right`}>
                <div className={`${prefix}-main`}>
                    <div className={`${prefix}-header`}>
                        <div className={`${prefix}-info`}>
                            <span className={`${prefix}-name`}>{realName}</span>
                            <span className={`${prefix}-nickname`}>@{nickName}</span>
                        </div>
                    </div>
                    <div className={`${prefix}-body`}>
                        <div className={`${prefix}-content`}>
                            {message || '暂无留言'}
                        </div>
                    </div>
                </div>
                <div className={`${prefix}-aside`}>
                    {(() => {
                        if (accepted) {
                            return '已通过'
                        } else if (declined) {
                            return '已拒绝'
                        } else {
                            return (
                                <div className={`${prefix}-button`}>
                                    <Button
                                     size='md'
                                     type='border'
                                     onClick={handleDecline.bind(this, key)}>拒绝</Button>
                                    <Button
                                     size='md'
                                     type='solid'
                                     onClick={handleAccept.bind(this, key)}>接受</Button>
                                </div>
                            )
                        }
                    })()}
                </div>
            </div>
        </div>
    )
}

JoinItem.propTypes = {
    prefix: React.PropTypes.string
}

JoinItem.defaultProps = {
    prefix: 'lbd-join-item',
    item: {}
}

export default JoinItem;

