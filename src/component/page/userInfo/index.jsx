import './index.scss';
import React from 'react';
import Avatar from '../avatar/index';

let UserInfo = (props) => {
    let { information, prefix } = props;
    let { avatarUrl, realName, nickname, company, email, mobile, slogan } = information || {};
    let informationList = [{
        title: '头像',
        url: avatarUrl
    },{
        title: '姓名',
        content: realName
    },{
        title: '昵称',
        content: nickname
    },{
        title: '手机',
        content: mobile
    },{
        title: '邮箱',
        content: email
    },{
        title: '个性签名',
        content: slogan
    },{
        title: '公司',
        content: company
    }]

    return (
        <div className={prefix}>
            <ul className={`${prefix}-list`}>
                {
                    informationList.map((item, i) => {
                        return (
                            <li className={`${prefix}-item`} key={`${prefix}-item-${i}`}>
                                <div className={`${prefix}-title`}>
                                    {item.title}
                                </div>
                                {
                                    item.url !== undefined ? (
                                        <div className={`${prefix}-content`}>
                                            <Avatar url={item.url} size='lg' />
                                        </div>
                                    ) : (
                                        <div className={`${prefix}-content`}>
                                            {item.content || '未填写'}
                                        </div>
                                    )
                                }
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
};

UserInfo.propTypes = {
    prefix: React.PropTypes.string,
    information: React.PropTypes.shape({
        avatarUrl: React.PropTypes.string,
        realName: React.PropTypes.string,
        nickname: React.PropTypes.string,
        company: React.PropTypes.string,
        email: React.PropTypes.string,
        mobile: React.PropTypes.string,
        slogan: React.PropTypes.string
    })
}

UserInfo.defaultProps = {
    prefix: 'lbd-user-info'
}

export default UserInfo;
