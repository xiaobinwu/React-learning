import React from 'react';
import './index.scss';

import Filter from '../filter/index';
import FeedList from '../feedList/index';

class JobFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterLists: [
                {name: '全部', type: 0},
                {name: '拒绝', type: 3},
                {name: '面试', type: 8},
                {name: '淘汰', type: 11}
            ],
            activeIndex: 0
        }
        this.handleClick = (index) => {
            this.setState({activeIndex: index})
        }
    }

    render() {
        return (
            <div>
                <Filter
                 type="button"
                 filters={this.state.filterLists}
                 activeIndex={this.state.activeIndex}
                 onClick={this.handleClick}
                />

                <div className='lbd-feed-list-wrap'>
                    <FeedList
                     url={this.props.url}
                     type={this.state.filterLists[this.state.activeIndex].type}
                    />
                </div>
            </div>
        )
    }
}

JobFeed.propTypes = {
    url: React.PropTypes.string
}

export default JobFeed;
