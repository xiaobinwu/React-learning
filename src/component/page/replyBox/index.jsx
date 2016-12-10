import React from 'react';
import './index.scss';
import 'core-js/es6/promise';

import update from 'react-addons-update';
import $ from 'webpack-zepto';

import SubHeader from '../subHeader/index';
import ContentEditable from '../../base/contentEditable/index';
import RenderInBody from '../renderInBody/index';
import AtUserBox from '../atUserBox/index';
import Toast from '../../base/toast/index';
import Icon from '../icon/index';

import { errorMessage } from '../../../utils/error';

function insertTextAtCursor(text) {
    let sel, range, html;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            let textNode = document.createTextNode(text);
            range.insertNode( textNode);
            range.setStartAfter(textNode);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    } else if (document.selection && document.selection.createRange) {
        document.selection.createRange().text = text;
    }
}

class ReplyBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            headerData: {
                left: [{
                    icon: 'left-arrow',
                    onSelect: (item, e) => {
                        e.preventDefault();
                        this.props.closeReplyBox()
                    }
                }],
                right: [{
                    title: '完成',
                    onSelect: (item, e) => {
                        e.preventDefault();
                        this.handleCommentSubmit()
                    }
                }]
            },
            showAtUserBox: false,
            comment: '',
            atUsersPool: [],
            toast: {
                isToastOpen: false,
                type: '',
                message: ''
            },
            isPublic: true
        }
        this.handleCommentChange = (e) => {
            this.setState({comment: e.target.value})
        }
        this.handlePaste = (e) => {
            let clipboardData, pastedData;

            e.stopPropagation();
            e.preventDefault();

            // Get pasted data via clipboard API
            clipboardData = e.clipboardData || window.clipboardData;
            pastedData = clipboardData.getData('Text');

            insertTextAtCursor(pastedData)

            let html = document.getElementById('userInput').innerHTML;
            this.setState({comment: html})
        }
        this.handleClickAt = () => {
            this.setState({showAtUserBox: true})
        }
        this.togglePublic = () => {
            this.setState({isPublic: !this.state.isPublic})
        }
        this.closeAtUserBox = () => {
            this.setState({showAtUserBox: false})
        }
        this.handleSelect = (userId, nickname) => {
            let atUsers = this.state.atUsers ? `${this.state.atUsers},${userId}` : userId;

            this.setState(update(this.state, {
                showAtUserBox: {$set: false},
                comment:{$set: `${this.state.comment}@${nickname}&nbsp;`},
                atUsersPool: {$push: [{userId, nickname}]}
            }))
        }
    }

    handleCommentSubmit() {
        let arr = this.state.atUsersPool,
            atUsers = '',
            hasAtUser = /@/.test(this.state.comment),
            comment = this.state.comment.replace(/<(\/div|\/p|\/?span)>/gm, '')
                                        .replace(/<(div|p)>/gm, '\n')
                                        .replace(/<br>/gm, '\n')
                                        .replace(/(&nbsp;)/ig, ' ')
                                        .replace(/@([^\s |^\u3400-\u9FBF]+)/g, function($1, $2){
                                            for (var i = 0; i < arr.length; i++) {
                                                if (arr[i].nickname === $2) {
                                                    atUsers = atUsers ? `${atUsers},${arr[i].userId}` : arr[i].userId;
                                                    return `[userId:'${arr[i].userId}']`;
                                                }
                                            }
                                            return $1;
                                        });
        if (!comment.trim()) {
            this.showErrorMessage('评论不能为空哦')
        }else if (!this.state.isPublic && !hasAtUser){
            this.showErrorMessage('私密消息必须@别人才能收到哦')
        }else {
           this.showLoadingToast()
               .then(this.sendAjax.bind(this, comment, atUsers))
        }
    }

    sendAjax(comment, atUsers) {
        $.post(`/${this.props.type}/${this.props.jobId}/Comment`, {
            atUserIds: atUsers,
            comment,
            privacy: this.state.isPublic ? 0 : 1
        }, (result) => {
            if (result.succeeded) {
                this.showToast()
                this.props.addComment()
                this.timeout = setTimeout( () => {
                    this.props.closeReplyBox()
                }, 1500)
            }else {
                this.showErrorMessage(errorMessage(result))
            }
        })
    }

    showLoadingToast() {
        return new Promise((resolve) => {
            this.setState(update(this.state, {
                toast: {
                    isToastOpen: {$set: true},
                    type: {$set: 'loading'},
                    message: {$set: '发送中'}
                }
            }))
            resolve()
        })
    }

    showErrorMessage(msg) {
        this.setState(update(this.state, {
            toast: {
                isToastOpen: {$set: true},
                type: {$set: 'error'},
                message: {$set: msg}
            }
        }))
    }

    showToast() {
        this.setState(update(this.state, {
            toast: {
                isToastOpen: {$set: true},
                type: {$set: 'success'},
                message: {$set: '评论成功'}
            }
        }))
    }

    closeToast() {
        this.setState(update(this.state, {
            toast: {
                isToastOpen: {$set: false},
                type: {$set: ''},
                message: {$set: ''}
            }
        }))
    }

    componentDidMount() {
        document.body.classList.add('modal-is-open')

        let { userId, nickname, privacy } = this.props.poster

        if (userId && nickname) {
            this.setState(update(this.state, {
                comment: {$set: `@${nickname}&nbsp;`},
                atUsers: {$set: userId},
                isPublic: {$set: privacy ? false : true},
                atUsersPool: {$set: [{userId, nickname }]}
            }))
        }
    }

    componentWillUnmount() {
        document.body.classList.remove('modal-is-open');
    }

    render() {
        let { prefix } = this.props;
        let { comment, isPublic } = this.state;

        return (
            <div>
                <div className={`${prefix}-wrap`}>
                    <SubHeader
                     title="回复评论"
                     fixed
                     data={this.state.headerData} />
                     <div className={`${prefix}-content`}>
                        <div className={`${prefix}-features`}>
                            <span className={`${prefix}-button`} onTouchTap={this.handleClickAt}>
                                <Icon type='at' size='sm' />
                            </span>
                            <span className={`${prefix}-button`} onTouchTap={this.togglePublic}>
                                <Icon type={isPublic ? 'open' : 'close'} size='md' />
                                <span className={`${prefix}-button-text`}>{isPublic ? '公开' : '私密'}</span>
                            </span>
                        </div>
                        <div className={`${prefix}-editable`}>
                            <ContentEditable
                             id='userInput'
                             data-ph="写评论..."
                             html={comment}
                             onPaste={this.handlePaste}
                             onChange={this.handleCommentChange} />
                        </div>
                     </div>
                </div>
                {
                    this.state.showAtUserBox ? (
                        <RenderInBody>
                            <AtUserBox
                             jobId={this.props.jobId}
                             closeAtUserBox={this.closeAtUserBox}
                             handleSelect={this.handleSelect}
                             type={this.props.type} />
                        </RenderInBody>
                    ) : null
                }
                {
                    this.state.toast.isToastOpen ? (
                        <Toast
                         type={this.state.toast.type}
                         onOk={this.closeToast.bind(this)}
                         message={this.state.toast.message}>
                        </Toast>
                    ) : null
                }
            </div>
        )
    }
}

ReplyBox.propTypes = {
    prefix: React.PropTypes.string,
    closeReplyBox: React.PropTypes.func,
    jobId: React.PropTypes.string,
    addComment: React.PropTypes.func
}

ReplyBox.defaultProps = {
    prefix: 'lbd-reply-box',
    closeReplyBox: function() {},
    addComment: function() {}
}

export default ReplyBox;
