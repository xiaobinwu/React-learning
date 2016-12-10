import 'core-js/fn/object/assign';
import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'webpack-zepto';

import update from 'react-addons-update';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import Header from '../../../../../component/page/header/index';
import Nav from '../../../../../component/page/nav/index';
import List from '../../../../../component/page/list/index';
import Filter from '../../../../../component/page/filter/index';
import Loading from '../../../../../component/base/loading/index';

import { throttle } from '../../../../../utils/throttle';
import { getQuery } from '../../../../../utils/queryUrl';

class AppComponent extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            nav: {
                activeTab: 'jobs',
                hasRedpoint: []
            },
            list: [],
            jobFilter: {
                names: [],
                activeIndex: 0
            },
            conditionFilter: {
                filterLists: [],
                activeIndex: 0
            },
            page: {
                total: 0,
                current: 0,
                index: 0
            },
            loading: true,
            clientFrom: null
        }

        this.toggleJobFilter = (i) => {

            this.updateFilterAfterToggleJobFilter(i)
                .then(this.fetchListData.bind(this))
                .then(this.updateListData.bind(this))
                .catch((result) => {
                    console.log(result.message);
                });
        }

        this.toggleConditionFilter = (i) => {

            this.updateFilterAfterToggleConditionFilter(i)
                .then(this.fetchListData.bind(this))
                .then(this.updateListData.bind(this))
                .catch((result) => {
                    console.log(result.message);
                });
        }

        this.handleScroll = (e) => {
            let scrollTop = e.target.body.scrollTop;
            let docHeight = e.target.body.scrollHeight;
            let winHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            let maxScrollTop = docHeight - winHeight;
            let disBeforeBtm = Math.abs(scrollTop - maxScrollTop);

            if (disBeforeBtm < 150 && this.state.page.total - this.state.page.current > 10) {
                 this.fetchListData().then(this.appendListData.bind(this))
            }
        }
    }

    updateFilterAfterToggleJobFilter(i) {
        return new Promise((resolve) => {
            let newData = update(this.state, {
                jobFilter: {
                    activeIndex: {$set: i}
                },
                conditionFilter: {
                    activeIndex: {$set: 0}
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

    updateFilterAfterToggleConditionFilter(i) {
        return new Promise((resolve) => {
            let newData = update(this.state, {
                conditionFilter: {
                    activeIndex: {$set: i}
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

    componentDidMount() {
        this.updateFilter();
        this.fetchInitialListData();
        this.getUnreadCount();
        window.addEventListener('scroll', throttle(this.handleScroll, 200));
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    componentWillMount() {
        let clientFrom = getQuery()['clientFrom'];
        if (clientFrom && clientFrom === 'iOS' || clientFrom === 'Android') {
            this.setState({clientFrom})
        }
    }

    updateFilter() {
        let filterNames = [],
            filterLists = [],
            filterList1 = [{name: '最新', type: 0}, {name: '代运营', type: 1}, {name: 'A2A', type: 2}],
            filterList2 = [{name: '我创建的', type: 3}];

        if (ISHR === 'False') {
            filterNames.push({name: '市场职位', type: 0})
            filterList2.push({name: '我的抢单', type: 4}, {name: '我代运营的', type: 5})
            filterLists.push(filterList1)
        }
        filterNames.push({name: '我的职位', type: 1})
        filterLists.push(filterList2)


        this.setState(update(this.state, {
            jobFilter: {names: {$set: filterNames}},
            conditionFilter: {filterLists: {$set: filterLists}}
        }))
    }

    updateListData(result) {
        this.setState(update(this.state, {
            list: {$set: result.data.list},
            loading: {$set: false},
            page: {
                total: {$set: result.data.total},
                current: {$set: 0},
                index: {$set: 1}
            }
        }))
    }

    fetchInitialListData(){
        $.get('/Mobile/Job/JobList', {
            type: ISHR === 'False' ? 0 : 3,
            start: 0,
            take: 10
        }, (result) => {
            this.updateListData(result)
        })
    }

    fetchListData() {
        return new Promise((resolve, reject) => {
            $.get('/Mobile/Job/JobList', {
                type: this.state.conditionFilter.filterLists[this.state.jobFilter.activeIndex][this.state.conditionFilter.activeIndex].type,
                start: this.state.page.index > 0 ? (this.state.page.current+10) : 0,
                take: 10
            }, (result) => {
                if (result.succeeded) {
                    resolve(result);
                } else {
                    reject(result);
                }
            })
        })
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

    getUnreadCount(){
        $.get('/Mobile/Message/UnreadCount', (result) => {
            if (result.data.messageCount > 0) {
              this.setState(update(this.state, {
                  nav: {
                    hasRedpoint: {$push: ['messages']}
                  }
              }))
            }
        })
    }

    render() {
        let { page, list, loading, jobFilter, conditionFilter } = this.state;
        let pageLeft = page.total - page.current;
        return (
            <div className="index">
                <Header isHR={ISHR === 'True'}/>

                <div className="content">
                    <Filter
                     filters={jobFilter.names}
                     activeIndex={jobFilter.activeIndex}
                     type="mainJobFilter"
                     onClick={this.toggleJobFilter}
                     hiden={jobFilter.names.length === 1} />
                    <Filter
                     filters={conditionFilter.filterLists[jobFilter.activeIndex]}
                     activeIndex={conditionFilter.activeIndex}
                     type="mainConditionFilter"
                     onClick={this.toggleConditionFilter} />
                    <List
                     list={list}
                     isCard
                     type='jobList' />
                    <Loading complete={ !loading && pageLeft < 10 || pageLeft === 10}/>
                </div>

                <Nav nav={this.state.nav} visible={!this.state.clientFrom} />
            </div>
        );
    }
}

// Render the main component into the dom
ReactDOM.render(<AppComponent />, document.getElementById('app'));

