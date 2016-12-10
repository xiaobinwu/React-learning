import './index.scss';
import React from 'react';
import Button from '../../base/button/index';
import Avatar from '../avatar/index';
import Tag from '../tag/index';
import ImageGallary from '../imageGallary/index';

import { date } from '../../../utils/date';
import { convertAtFormat } from '../../../utils/convertAtFormat';

let CommentItem = (props) => {
    let { prefix, item, openReplyBox, hasNoReply } = props;
    let { atUsers, avatarUrl, content, created, pictureAttachmentUrls,
          posterName, posterNickname, nickname, realName, posterId,
          sceneType, sceneObjectId, privacy } = item;
    created = created.replace(/T/ig, ' ').split('.')[0];
    let imageGallery, location;

    if (atUsers && atUsers.length > 0) {
        content = convertAtFormat(content, atUsers);
    }

    if (pictureAttachmentUrls && pictureAttachmentUrls.length > 0) {
        imageGallery = <ImageGallary imageList={pictureAttachmentUrls} />
    }else {
        imageGallery = null;
    }

    if (sceneType && sceneObjectId) {
        if (sceneType === 1) {
            location = `/Mobile/Job/${sceneObjectId}?clientAction=push#comments`
        }else if (sceneType === 3) {
            location = `/Mobile/Recommendation/${sceneObjectId}?clientAction=push#comments`
        }
    }else {
        location = 'javascript:void(0)'
    }

    return (
        <a href={location}>
            <div className={prefix}>
                <div className={`${prefix}-left`}>
                    <Avatar url={avatarUrl}/>
                </div>
                <div className={`${prefix}-right`}>
                    <div className={`${prefix}-header`}>
                        <div className={`${prefix}-info truncate`}>
                            <span className={`${prefix}-name`}>{posterName || realName}</span>
                            <span className={`${prefix}-nickname`}>@{posterNickname || nickname}</span>
                        </div>
                        {
                            hasNoReply ? (
                                <div className={`${prefix}-change`}>
                                    {date(created)}
                                </div>
                            ) : (
                                <div className={`${prefix}-change`} onTouchTap={openReplyBox.bind(this, posterId, posterNickname, privacy)}>
                                    <Button size="sm" type="border">回复</Button>
                                </div>
                            )
                        }
                    </div>
                    <div className={`${prefix}-body`}>
                        {
                            privacy === 1 ? <Tag type='private' className={`${prefix}-tag`} /> : null
                        }
                        <div
                         className={`${prefix}-content`}
                         dangerouslySetInnerHTML={{__html: content}} />
                    </div>
                    <div className={`${prefix}-gallary`}>{imageGallery}</div>
                    {
                        hasNoReply ? null : <div className={`${prefix}-footer`}>{date(created)}</div>
                    }
                </div>
            </div>
        </a>
    )
};

CommentItem.propTypes = {
    prefix: React.PropTypes.string,
    openReplyBox: React.PropTypes.func
}

CommentItem.defaultProps = {
    prefix: 'lbd-comment-item',
    item: {},
    openReplyBox: function() {}
}

export default CommentItem;

