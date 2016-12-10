import './index.scss';
import React from 'react';

import $ from 'webpack-zepto';

import Avatar from '../avatar/index';
import { date } from '../../../utils/date';
import { feedType } from '../config/feedType';

function createRealContent(type) {
    let content;
    for (var key in feedType) {
        let item = feedType[key]
        if (item.code === type) {
            content = item.candidate_desc;
        }
    }
    return content;
}

class TimeLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }

    componentDidMount() {

        $.get(this.props.url, (result) => {
            let items = result.data.items;
            if (result.succeeded && !!items && Object.keys(items).length !== 0 ) {
                this.setState({list: items})
            }
        })
    }

    render() {
        let { prefix } = this.props;
        let { list } = this.state;

        return (
            <ul className={prefix}>
                {
                    list.length > 0 ? list.map((item, i) => {
                        return (
                            <TimelineItem key={`${prefix}-item-${i}`} item={item} />
                        )
                    }) : null
                }
            </ul>
        )
    }
}

let TimelineItem = (props) => {
    let prefix = 'lbd-timeline'
    let { type, posterAvatarUrl='', posterNickName='', posterRealName, created, extensionProperties = {} } = props.item;
    created = created.replace(/T/ig, ' ').split('.')[0];
    let amount = parseFloat(extensionProperties.amount || '0') / 100,
        receiverRealName = extensionProperties.recommenderRealName,
        receiverNickName = extensionProperties.recommenderNickname,
        interviewAddress = extensionProperties.interviewAddress || '',
        interviewTime = extensionProperties.interviewTime || '',
        result = extensionProperties.result || '',
        interviewType = extensionProperties.interviewType || '',
        includePickUpService = extensionProperties.includePickUpService,
        extra = extensionProperties.reason ||
                extensionProperties.rejectedReason ||
                extensionProperties.obsoletedReason ||
                extensionProperties.recommendReason ||
                extensionProperties.evaluation ||
                extensionProperties.remark ||
                extensionProperties.content || '';

    return (
        <li className={`${prefix}-item`}>
            <div className={`${prefix}-left`}>
                <Avatar url={posterAvatarUrl}/>
            </div>
            <div className={`${prefix}-right`}>
                <div className={`${prefix}-header`}>
                    <div className={`${prefix}-info truncate`}>
                        <span className={`${prefix}-name`}>{posterRealName}</span>
                        <span className={`${prefix}-nickname`}>@{posterNickName}</span>
                    </div>
                    <div className={`${prefix}-time`}>
                        <span>{date(created)}</span>
                    </div>
                </div>
                <div className={`${prefix}-body`}>
                    <div>
                        {
                            amount ? <span className={`${prefix}-money`}>{amount}元</span> : null
                        }
                        <span>{createRealContent(type)}</span>
                        {
                            type === 6 || type === 7 ? <span>{interviewType}</span> : null
                        }
                        {
                            type === 8 ? <span>{interviewType}结果({result})</span> : null
                        }
                        {
                            receiverRealName ? <span>{receiverRealName}@{receiverNickName}</span> : null
                        }
                    </div>
                    {
                        type === 6 && interviewTime ? (
                            <div>
                                面试时间：{interviewTime}
                            </div>
                        ) : null
                    }
                    {
                        type === 6 && interviewAddress ? (
                            <div>
                                面试地点：{interviewAddress}
                                {
                                    includePickUpService === 'True' ? <span>(使用面试专车)</span> : null
                                }
                            </div>
                        ) : null
                    }
                    {
                        extra ? (<div className={`${prefix}-extra`}>{extra}</div>) : null
                    }
                </div>
            </div>
        </li>
    )

}

TimeLine.propTypes = {
    url: React.PropTypes.string.isRequired,
    prefix: React.PropTypes.string
}

TimeLine.defaultProps = {
    url: '',
    prefix: 'lbd-timeline'
}

export default TimeLine;
