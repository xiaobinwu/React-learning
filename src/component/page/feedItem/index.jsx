import './index.scss';
import React from 'react';
import Avatar from '../avatar/index';
import { feedType } from '../config/feedType';


import { date } from '../../../utils/date';

function createRealContent(type, person, url, scene) {
    let content;
    for (var key in feedType) {
        let item = feedType[key]
        if (item.code === type) {
            if (scene) {
                if (scene === 2) {
                    content = person ? `${item.candidate_desc} <a class=lbd-feed-item-green href=${url}>${person}</a>` : item.candidate_desc
                }else if (scene === 1) {
                    content = person ? item.job_desc.replace('%p', `<a class=lbd-feed-item-green href=${url}>${person}</a>`) : item.job_desc
                }
            }else {
                content = person ? item.job_desc.replace('%p', `<span>${person}</span>`) : item.job_desc
            }
        }
    }
    return content;
}

let FeedItem = (props) => {
    let { prefix, item } = props;
    let { type, posterAvatarUrl, posterRealName, posterNickName, created, extensionProperties = {}, scene='' } = item;

    created = created.replace(/T/ig, ' ').split('.')[0];
    let amount = parseFloat(extensionProperties.amount || '0') / 100,
        receiverRealName = extensionProperties.recommenderRealName,
        receiverNickName = extensionProperties.recommenderNickname,
        candidateName = extensionProperties.candidateName || '',
        jobName = extensionProperties.jobName || '',
        result = extensionProperties.result || '',
        interviewType = extensionProperties.interviewType || '',
        extra = extensionProperties.reason ||
                extensionProperties.rejectedReason ||
                extensionProperties.obsoletedReason ||
                extensionProperties.evaluation ||
                extensionProperties.remark ||
                extensionProperties.content || '',
        jobDetailUrl = extensionProperties.jobDetailUrl ?
                       `/Mobile${extensionProperties.jobDetailUrl}?clientAction=push#feeds` : '',
        recommendationDetailUrl = extensionProperties.recommendationId ?
                                  `/Mobile/Recommendation/${extensionProperties.recommendationId}?clientAction=push#timeline` : '',
        url = jobDetailUrl || recommendationDetailUrl || '',
        feedHtml = (scene && scene === 2) ?
                    createRealContent(type, jobName, url, scene) :
                    createRealContent(type, candidateName, url, scene);

    return (
        <div className={prefix}>
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
                        <span
                         className={`${prefix}-content`}
                         dangerouslySetInnerHTML={{__html: feedHtml}}
                        />
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
                        extra ? (<div className={`${prefix}-extra`}>{extra}</div>) : null
                    }
                </div>
            </div>
        </div>
    )
};

FeedItem.propTypes = {
    prefix: React.PropTypes.string
}

FeedItem.defaultProps = {
    prefix: 'lbd-feed-item',
    item: {}
}

export default FeedItem;

