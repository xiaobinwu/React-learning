import './index.scss';
import React from 'react';

import $ from 'webpack-zepto';
import update from 'react-addons-update';
import { throttle } from '../../../utils/throttle';

import CommentItem from '../commentItem/index';
import Loading from '../../base/loading/index';
import RenderInBody from '../renderInBody/index';
import ReplyBox from '../replyBox/index';
import Footer from '../footer/index';
import Icon from '../icon/index';

class CommentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            page: {
                total: 0,
                current: 0,
                index: 0
            },
            loading: true,
            openReplyBoxJob: null
        }
        this.handleScroll = (e) => {
            let scrollTop = e.target.body.scrollTop;
            let docHeight = e.target.body.scrollHeight;
            let winHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            let maxScrollTop = docHeight - winHeight;
            let disBeforeBtm = Math.abs(scrollTop - maxScrollTop);

            if (disBeforeBtm < 150 && this.state.page.total - this.state.page.current > 10 ) {
                this.fetchListData()
            }
        }
        this.openReplyBox = (userId, nickname, privacy) => {
            this.setState({openReplyBoxJob: {userId, nickname, privacy} || true})
        }
        this.closeReplyBox = () => {
            this.setState({openReplyBoxJob: null})
        }
    }

    componentDidMount() {
        this.fetchInitialListData()
        window.addEventListener('scroll', throttle(this.handleScroll, 300));
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.openReplyBoxJob === null && prevState.openReplyBoxJob !== null) {
            this.fetchInitialListData()
        }
    }

    fetchInitialListData() {
        let { url } = this.props;

        $.get(url, {start: 0, take: 10 }, (result) => {
            if (result.succeeded) {
                this.setState(update(this.state, {
                    list: {$set: result.data.list},
                    page: {
                        total: {$set: result.data.total},
                        current: {$set: 0},
                        index: {$set: 1}
                    },
                    loading: {$set: false}
                }))
            }else {
                this.setState({loading: false})
            }
        })
    }

    fetchListData() {
        let { url } = this.props;

        $.get(url, {
            start: this.state.page.index > 0 ? (this.state.page.current+10) : 0,
            take: 10
        }, (result) => {
            this.setState(update(this.state, {
                list: {$push: result.data.list},
                page: {
                    current: {$set: this.state.page.current + 10},
                    index: {$set: this.state.page.index + 1}
                }
            }))
        })
    }


    render() {
        let { list, loading, openReplyBoxJob } = this.state;
        let pageLeft = this.state.page.total - this.state.page.current;

        return (
            <div>
                <div className='lbd-comment-wrap'>
                    <ul className='lbd-comment-list'>
                        {
                            list.map((item, i) => {
                                return <CommentItem
                                        key={i}
                                        item={item}
                                        openReplyBox={this.openReplyBox}
                                        hasNoReply={this.props.hasNoReply}
                                        />
                            })
                        }
                    </ul>
                    <Loading complete={ !loading && pageLeft < 10 || pageLeft === 10} />
                </div>
                {
                    this.props.hasNoReply ? null : (
                        <Footer>
                            <div
                             className='lbd-write-comment'
                             onTouchTap={this.openReplyBox}>
                                <Icon type='write' width='20px' height='20px' />
                                <span >发表评论</span>
                            </div>
                        </Footer>
                    )
                }
                {
                    openReplyBoxJob ? (
                        <RenderInBody>
                            <ReplyBox
                             poster={openReplyBoxJob}
                             jobId={this.props.jobId}
                             closeReplyBox={this.closeReplyBox}
                             type={this.props.type}
                             addComment={this.props.addComment.bind(this)}
                            />
                        </RenderInBody>
                    ) : null
                }
            </div>
        )
    }
}

CommentList.propTypes = {
    url: React.PropTypes.string.isRequired,
    jobId: React.PropTypes.string.isRequired,
    addComment: React.PropTypes.func
}

CommentList.defaultProps = {
    addComment: function() {}
}

export default CommentList;
