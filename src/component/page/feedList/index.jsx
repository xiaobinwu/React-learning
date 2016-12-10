import './index.scss';
import React from 'react';

import $ from 'webpack-zepto';
import update from 'react-addons-update';
import { throttle } from '../../../utils/throttle';

import FeedItem from '../feedItem/index';
import Loading from '../../base/loading/index';

class FeedList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            page: {
                total: 0,
                current: 0,
                index: 0
            },
            loading: true
        }
        this.handleScroll = (e) => {
            let scrollTop = e.target.body.scrollTop;
            let docHeight = e.target.body.scrollHeight;
            let winHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            let maxScrollTop = docHeight - winHeight;
            let disBeforeBtm = Math.abs(scrollTop - maxScrollTop);

            if (disBeforeBtm < 150 && this.state.page.total - this.state.page.current > 10 ) {
                this.fetchListData(this.props.type)
            }
        }
    }

    componentDidMount() {
        this.fetchInitialListData(this.props.type)
        window.addEventListener('scroll', throttle(this.handleScroll, 300));
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({loading: true})
        this.fetchInitialListData(nextProps.type)
    }

    fetchInitialListData(type) {
        let { url } = this.props;
        let data = {
            start: 0,
            take: 10
        }
        if (type !== undefined) {
            data.type = type
        }

        $.get(url, data, (result) => {
            this.setState(update(this.state, {
                list: {$set: result.data.feedItems},
                page: {
                    total: {$set: result.data.total},
                    current: {$set: 0},
                    index: {$set: 1}
                },
                loading: {$set: false}
            }))
        })
    }

    fetchListData(type) {
        let { url } = this.props;
        let data = {
            start: this.state.page.index > 0 ? (this.state.page.current+10) : 0,
            take: 10
        }
        if (type !== undefined) {
            data.type = type
        }
        $.get(url, data, (result) => {
            this.setState(update(this.state, {
                list: {$push: result.data.feedItems},
                page: {
                    current: {$set: this.state.page.current + 10},
                    index: {$set: this.state.page.index + 1}
                }
            }))
        })
    }


    render() {
        let { list, loading }= this.state;
        let pageLeft = this.state.page.total - this.state.page.current;

        return (
            <div>
                <ul className='lbd-feed-list'>
                    {
                        list.length > 0 ? list.map((item, i) => {
                            return <FeedItem key={i} item={item}/>
                        }) : null
                    }
                </ul>
                <Loading complete={ !loading && pageLeft < 10 || pageLeft === 10} />
            </div>
        )
    }
}

FeedList.propTypes = {
    url: React.PropTypes.string.isRequired,
    type: React.PropTypes.number
}

export default FeedList;
