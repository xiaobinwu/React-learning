import React from 'react';
import './index.scss';

import $ from 'webpack-zepto';

import SubHeader from '../subHeader/index';
import Avatar from '../avatar/index';

class AtUserBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            headerData: {
                left: [{
                    icon: 'left-arrow',
                    onSelect: (item, e) => {
                        e.preventDefault();
                        this.props.closeAtUserBox()
                    }
                }]
            },
            searchValue: '',
            list: [],
            loading: true
        }
        this.handleInputChange = (e) => {
            let inputValue = e.target.value;
            if (inputValue) {
                this.fetchSearchResultList(inputValue)

            }
            this.setState({searchValue: inputValue})
        }
    }

    componentDidMount() {
        this.fetchListData()
    }

    fetchListData() {
        $.get(`/${this.props.type}/${this.props.jobId}/Comment/AtUsers`, (result)=> {
            if (result.succeeded) {
                this.setState({list: result.data})
            }
            this.setState({loading: false})
        })
    }

    fetchSearchResultList(keyword) {
        $.get('/User/SearchUser', {
            take: 10,
            keyword
        }, (result) => {
            this.setState({list: result.data})
        })
    }


    render() {
        let { prefix, handleSelect } = this.props;
        let { searchValue, list, loading } = this.state;

        return (
            <div className={`${prefix}-wrap`}>
                <SubHeader
                 title="联系人"
                 fixed
                 data={this.state.headerData} />
                 <div className={`${prefix}-content`}>
                    <div className={`${prefix}-searchBar`}>
                        <input
                         placeholder="查找更多好友"
                         className={`${prefix}-search`}
                         value={searchValue}
                         onChange={this.handleInputChange}  />
                    </div>
                    <div className={`${prefix}-list`}>
                        {
                            list.length > 0 ? (
                                <ul>
                                    {
                                        list.map((item, i) => {
                                            return (
                                                <li
                                                 key={`atUsersListItem-${i}`}
                                                 className={`${prefix}-item`}
                                                 onTouchTap={handleSelect.bind(this, item.id, item.nickname)}>
                                                    <div className={`${prefix}-left`}>
                                                        <Avatar url={item.avatar} />
                                                    </div>
                                                    <div className={`${prefix}-right`}>
                                                        <span>{item.realName}</span>
                                                        <span>@{item.nickname}</span>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            ) : <div className={`${prefix}-empty`}>{loading ? '加载中...' : '无结果'}</div>
                        }
                    </div>
                 </div>
            </div>
        )
    }
}

AtUserBox.propTypes = {
    jobId: React.PropTypes.string.isRequired,
    prefix: React.PropTypes.string,
    closeAtUserBox: React.PropTypes.func,
    handleSelect: React.PropTypes.func
}

AtUserBox.defaultProps = {
    prefix: 'lbd-at-user-box',
    closeAtUserBox: function() {},
    handleSelect: function() {}
}

export default AtUserBox;
