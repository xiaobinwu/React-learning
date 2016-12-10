import './index.scss';
import React from 'react';
import 'core-js/es6/promise';

import $ from 'webpack-zepto';
import update from 'react-addons-update';

import Filter from '../filter/index';
import List from '../list/index';
import Loading from '../../base/loading';
import Dropdown from '../dropdown/index';

import { throttle } from '../../../utils/throttle';
import { city as CITY } from '../config/city';
import { timeFilter as TIMEFILTER } from '../config/timeFilter';

class JobSearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            positionFilter: {
                filterLists: CITY,
                activeIndex: 0,
                showDropdown: false
            },
            timeFilter: {
                filterLists: TIMEFILTER,
                activeIndex: 0,
                showDropdown: false
            },
            jobFilter: {
                filterLists: [{
                    name: '全部类别',
                    children: [{name: '全部类别'}]
                }],
                activeIndex: [0, 0],
                showDropdown: false
            },
            list: [],
            page: {
                total: 0,
                current: 0,
                index: 0
            },
            loading: true
        }
        this.handleFilterSelect = (i, key) => {
            this.updateFilters(i , key)
                .then(this.fetchListData.bind(this))
                .then(this.updateListData.bind(this))
                .catch((result) => {
                    console.log(result.message);
                });
        }
        this.togglePositionDropdown = () => {
            this.setState(update(this.state, {
                positionFilter: {
                    showDropdown: {$set: !this.state.positionFilter.showDropdown}
                },
                timeFilter: {
                    showDropdown: {$set: false}
                },
                jobFilter: {
                    showDropdown: {$set: false}
                }
            }))
        }
        this.toggleTimeDropdown = () => {
            this.setState(update(this.state, {
                timeFilter: {
                    showDropdown: {$set: !this.state.timeFilter.showDropdown}
                },
                positionFilter: {
                    showDropdown: {$set: false
                    }
                },
                jobFilter: {
                    showDropdown: {$set: false}
                }
            }))
        }
        this.toggleJobDropdown = () => {
            this.setState(update(this.state, {
                jobFilter: {
                    showDropdown: {$set: !this.state.jobFilter.showDropdown}
                },
                positionFilter: {
                    showDropdown: {$set: false
                    }
                },
                timeFilter: {
                    showDropdown: {$set: false}
                }
            }))
        }
        this.handleScroll = (e) => {
            let scrollTop = e.target.body.scrollTop;
            let docHeight = e.target.body.scrollHeight;
            let winHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            let maxScrollTop = docHeight - winHeight;
            let disBeforeBtm = Math.abs(scrollTop - maxScrollTop);

            if (disBeforeBtm < 150 && this.state.page.total - this.state.page.current > 10 ) {
                this.fetchListData().then(this.appendListData.bind(this))
            }
        }
    }

    componentDidMount() {
        this.fetchListData().then(this.updateListData.bind(this));
        this.fetchJobCategories();
        window.addEventListener('scroll', throttle(this.handleScroll, 300));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.keyword !== this.props.keyword) {
            this.setState(update(this.state, {
                page: {
                    index: {$set: 0}
                },
                list: {$set: []},
                loading: {$set: true}
            }))
        }
        if (nextProps.isFocused && !this.props.isFocused) {
            this.setState(update(this.state, {
                timeFilter: {
                    showDropdown: {$set: false}
                },
                positionFilter: {
                    showDropdown: {$set: false}
                },
                jobFilter: {
                    showDropdown: {$set: false}
                }
            }))
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.keyword !== this.props.keyword) {
            this.fetchListData().then(this.updateListData.bind(this))
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    updateFilters(i ,key) {
        return new Promise((resolve) => {
            let newData = update(this.state, {
                [key]: {
                    activeIndex: {$set: i},
                    showDropdown: {$set: false}
                },
                page: {
                    index: {$set: 0}
                },
                list: {$set: []},
                loading: {$set: true}
            })
            this.setState(newData)
            resolve()
        })
    }

    updateListData(result) {
        window.scrollTo(0,0);

        this.setState(update(this.state, {
            list: {$set: result.data.list},
            loading: {$set: false},
            page: {
                total: {$set: result.data.total},
                current: {$set: 0},
                index: {$set: 1}
            }
        }))
        return result;
    }

    appendListData(result) {
        this.setState(update(this.state, {
            list: {$push: result.data.list},
            page: {
                current: {$set: this.state.page.current + 10},
                index: {$set: this.state.page.index + 1}
            }
        }))
    }

    fetchListData() {
        let { page, positionFilter, timeFilter, jobFilter } = this.state;
        let { keyword } = this.props;
        let jobFilterLists = jobFilter.filterLists,
            jobActiveIndex = jobFilter.activeIndex,
            parentListItem = jobFilterLists[jobActiveIndex[0]],
            childListItem = parentListItem.children[jobActiveIndex[1]];

        return new Promise((resolve, reject) => {
            $.get('/Mobile/Job/JobList', {
                keyword: keyword,
                start: page.index > 0 ? (page.current+10) : 0,
                take: 10,
                locationId: positionFilter.filterLists[positionFilter.activeIndex].type,
                orderBy: timeFilter.filterLists[timeFilter.activeIndex].type,
                jobCategoryId: childListItem.id,
                type: 6
            }, (result) => {
                if (result.succeeded) {
                    resolve(result);
                } else {
                    reject(result);
                }
            })
        })
    }

    fetchJobCategories() {
        $.get('/Data/JobCategories', (result) => {
            let jobCategories = result.subJobCategories;

            let loopCategories = (arr) => {
                arr.forEach((item, index) => {
                    if (index === 0) {
                        item.collapsed = true;
                        item.children = [{name: '全部类别'}];
                    } else {
                        item.collapsed = false;
                        item.children = item.subJobCategories;
                    }

                    item.type = item.id;
                    item.id = undefined;
                    item.subJobCategories = undefined;
                })
            }

            loopCategories(jobCategories);

            this.setState(update(this.state, {
                jobFilter: {
                    filterLists: {$set: jobCategories}
                }
            }))
        })
    }

    render() {
        let { prefix } = this.props;
        let  { jobFilter, positionFilter, timeFilter, list, page, loading } = this.state;
        let pageLeft = page.total - page.current;

        return (
            <div className={prefix}>
                <div className={`${prefix}-filter`}>
                    <Dropdown
                     isTree
                     uniqueId='jobFilter'
                     overlay={jobFilter.filterLists}
                     activeIndex={jobFilter.activeIndex}
                     showDropdown={jobFilter.showDropdown}
                     onSelect={this.handleFilterSelect}
                     toggleDropdown={this.toggleJobDropdown} />
                    <Dropdown
                     uniqueId='positionFilter'
                     overlay={positionFilter.filterLists}
                     activeIndex={positionFilter.activeIndex}
                     showDropdown={positionFilter.showDropdown}
                     onSelect={this.handleFilterSelect}
                     toggleDropdown={this.togglePositionDropdown} />
                    <Dropdown
                     uniqueId='timeFilter'
                     overlay={timeFilter.filterLists}
                     activeIndex={timeFilter.activeIndex}
                     showDropdown={timeFilter.showDropdown}
                     onSelect={this.handleFilterSelect}
                     toggleDropdown={this.toggleTimeDropdown} />
                </div>
                <div className={`${prefix}-list`}>
                    <List
                     list={list}
                     isCard
                     type='jobList' />
                    <Loading complete={ !loading && pageLeft < 10 || pageLeft === 10} />
                </div>
            </div>
        )
    }
};

JobSearchResults.displayName = 'JobSearchResults';

JobSearchResults.propTypes = {
    prefix: React.PropTypes.string,
    keyword: React.PropTypes.string
}

JobSearchResults.defaultProps = {
    prefix: 'lbd-job-search',
    keyword: ''
}

export default JobSearchResults;
