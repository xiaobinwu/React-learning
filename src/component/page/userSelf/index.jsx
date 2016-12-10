import './index.scss';
import React from 'react';
import Avatar from '../avatar/index';
import Icon from '../icon/index';

let UserSelf = (props) => {
    let { avatarUrl, realName, nickname, prefix } = props;

    return (
        <div className={prefix}>
            <div className={`${prefix}-profile`}>
                <Avatar url={avatarUrl} size='lg' className={`${prefix}-avatar`} />
                <div className={`${prefix}-name`}>
                    {realName}{` @${nickname}`}
                </div>
            </div>
            <a href='/Mobile/Me/UserProfile?clientAction=push'>
                <div className={`${prefix}-setting`}>
                    <Icon type='setting' size='lg'/>
                </div>
            </a>
        </div>
    )
};

UserSelf.propTypes = {
   prefix: React.PropTypes.string,
   realName: React.PropTypes.string,
   nickname: React.PropTypes.string,
   avatarUrl: React.PropTypes.string
}

UserSelf.defaultProps = {
    prefix: 'lbd-user-self',
    realName: '暂无'
}

export default UserSelf;
