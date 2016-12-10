import 'core-js/fn/object/assign';
import 'core-js/es6/promise';
import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'webpack-zepto';
import update from 'react-addons-update';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import Nav from '../../../../../component/page/nav/index';
import List from '../../../../../component/page/list/index';
import Filter from '../../../../../component/page/filter/index';
import Loading from '../../../../../component/base/loading/index';
import Dropdown from '../../../../../component/page/dropdown/index';

import { throttle } from '../../../../../utils/throttle';
import { getQuery } from '../../../../../utils/queryUrl';
import { createFilter } from '../../../../../utils/createConditionFilter';

class AppComponent extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            nav: {
                activeTab: 'candidates',
                hasRedpoint: []
            },
            list: [],
            jobFilter: {
                names: [],
                activeIndex: 0
            },
            conditionFilter: {
                filterLists: [],
                activeIndex: 0,
                showDropdown: false
            },
            relatedJobFilter: {
                filterLists: [],
                activeIndex: 0,
                showDropdown: false
            },
            requireStatistics: false,
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

        this.toggleConditionFilter =(i, key) => {

            this.updateFilterAfterToggleConditionFilter(i, key)
                .then(this.fetchListData.bind(this))
                .then(this.updateListData.bind(this))
                .then(this.updateConditionFilter.bind(this))
                .catch((result) => {
                    console.log(result.message);
                });
        }

        this.toggleConditionDropdown = () => {
            let { showDropdown } = this.state.conditionFilter;

            this.setState(update(this.state, {
                conditionFilter: {showDropdown: {$set: !showDropdown}},
                relatedJobFilter: {showDropdown: {$set: false}}
            }))
        }

        this.toggleRelatedJobDropdown = () => {
            let { showDropdown } = this.state.relatedJobFilter;

            this.setState(update(this.state, {
                conditionFilter: {showDropdown: {$set: false}},
                relatedJobFilter: {showDropdown: {$set: !showDropdown}}
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
        this.initialFilter()
            .then(this.fetchListData.bind(this))
            .then(this.updateListData.bind(this))
            .then(this.updateConditionFilter.bind(this))
            .catch((result) => {
                console.log(result.message);
            });
        this.getUnreadCount();
        window.addEventListener('scroll', throttle(this.handleScroll, 300));
    }

    componentWillMount() {
        let clientFrom = getQuery()['clientFrom'];
        if (clientFrom && clientFrom === 'iOS' || clientFrom === 'Android') {
            this.setState({clientFrom})
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    updateFilterAfterToggleJobFilter(i) {
        return new Promise((resolve) => {
            let newData = update(this.state, {
                jobFilter: {
                    activeIndex: {$set: i}
                },
                conditionFilter: {
                    activeIndex: {$set: 0},
                    showDropdown: {$set: false}
                },
                relatedJobFilter: {
                    activeIndex: {$set: 0},
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

    updateFilterAfterToggleConditionFilter(i, key) {
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
                loading: {$set: true},
                requireStatistics: {$set: key === 'relatedJobFilter'}
            })

            if (key === 'relatedJobFilter') {
                newData.conditionFilter.activeIndex = 0;
            }
            this.setState(newData)
            resolve()
        })
    }

    initialFilter() {
        return new Promise((resolve) => {
            let filterNames = this.initialJobFilter(),
                conditionFilter = this.initialConditionFilter().conditionFilter,
                relatedJobFilter = this.initialConditionFilter().relatedJobFilter,
                activeIndex = this.initialFilterActiveIndex(filterNames, conditionFilter, relatedJobFilter);

            this.setState(update(this.state, {
                jobFilter: {
                    names: {$set: filterNames},
                    activeIndex: {$set: activeIndex.filterNames || 0}
                },
                conditionFilter: {
                    filterLists: {$set: conditionFilter},
                    activeIndex: {$set: activeIndex.conditionFilter || 0}
                },
                relatedJobFilter: {
                    filterLists: {$set: relatedJobFilter},
                    activeIndex: {$set: activeIndex.relatedJobFilter || 0}
                },
                requireStatistics: {$set: !!activeIndex.relatedJobFilter}
            }))
            resolve()
        })
    }

    initialFilterActiveIndex(filterNames, conditionFilter, relatedJobFilter) {
        let querys = getQuery(),
            activeIndex = {};

        const TYPE = querys['type'],
              STATUS = querys['status'],
              JOBID = querys['jobId'];

        filterNames.forEach((item, i) => {
            if (item.type == TYPE) {
                activeIndex.filterNames = i
            }
        })
        if (STATUS) {
            conditionFilter[activeIndex.filterNames || 0].forEach((item, i) => {
                if (item.type == STATUS) {
                    activeIndex.conditionFilter = i
                }
            })
        }
        if (JOBID) {
            relatedJobFilter[activeIndex.filterNames || 0].forEach((item, i) => {
                if (item.type == JOBID) {
                    activeIndex.relatedJobFilter = i
                }
            })
        }
        return activeIndex;
    }

    initialJobFilter() {
        let filterNames = [];
        filterNames.push({name: '我接收的', type: 1})
        if (ISHR === 'False') {
            filterNames.splice(0, 0, {name: '我推荐的', type: 0});
            filterNames.splice(2, 0, {name: '代运营的', type: 2});
        }
        return filterNames;
    }

    initialConditionFilter() {
        let initialDataElm = document.getElementById('initialData'),
            data = JSON.parse(initialDataElm.innerHTML),
            conditionFilter = [],
            relatedJobFilter = [];

        let { RecommendToMe, RecommendByMe, RecommendToPM,
              HuntingJobItems, OrderJobItems, ProjectManagerJobItems } = data;

        let createNewRelatedJobFilter = (list) => {
            let filterNames = [{name: '全部职位'}];
            list.forEach((item) => {
                filterNames.push({name: item.Text, type: item.Value})
            })
            return filterNames;
        }

        conditionFilter.push(createFilter(RecommendToMe))
        relatedJobFilter.push(createNewRelatedJobFilter(HuntingJobItems))
        if (ISHR === 'False') {
            conditionFilter.splice(0, 0, createFilter(RecommendByMe));
            conditionFilter.splice(2, 0, createFilter(RecommendToPM));
            relatedJobFilter.splice(0, 0, createNewRelatedJobFilter(data.OrderJobItems));
            relatedJobFilter.splice(2, 0, createNewRelatedJobFilter(data.ProjectManagerJobItems));
        }
        return { conditionFilter, relatedJobFilter };
    }

    updateConditionFilter(result) {
        let statics = result.data.recommendStatistics,
            activeIndex = this.state.jobFilter.activeIndex;

        if (statics) {
            let newData = createFilter(statics);
            this.setState(update(this.state, {
                conditionFilter: {
                    filterLists: { [activeIndex]: {$set: newData}}
                }
            }))
        }
    }

    updateListData(result) {
        this.setState(update(this.state, {
            list: {$set: result.data.list},
            loading: {$set: false},
            page: {
                total: {$set: result.data.total},
                current: {$set: 0},
                index: {$set: 1}
            },
            requireStatistics: {$set: false}
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
        return new Promise((resolve, reject) => {
            $.get('/Mobile/Candidate/CandidateList', {
                type: this.state.jobFilter.names[this.state.jobFilter.activeIndex].type,
                status: this.state.conditionFilter.filterLists[this.state.jobFilter.activeIndex][this.state.conditionFilter.activeIndex].type,
                jobId: this.state.relatedJobFilter.filterLists[this.state.jobFilter.activeIndex][this.state.relatedJobFilter.activeIndex].type,
                start: this.state.page.index > 0 ? (this.state.page.current+10) : 0,
                take: 10,
                requireStatistics: this.state.requireStatistics
            }, (result) => {
                if (result.succeeded) {
                    resolve(result);
                } else {
                    reject(result);
                }
            })
        })
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
        let { page, list, loading, jobFilter, conditionFilter, relatedJobFilter } = this.state;
        let pageLeft = page.total - page.current;
        return (
            <div className="index">
                <Filter
                 type='mainJobFilter'
                 isHead
                 filters={jobFilter.names}
                 activeIndex={jobFilter.activeIndex}
                 onClick={this.toggleJobFilter}
                 hasSingleItem={jobFilter.names.length === 1} />
                <div className='condition-filter'>
                    <Dropdown
                     uniqueId='relatedJobFilter'
                     overlay={relatedJobFilter.filterLists[jobFilter.activeIndex]}
                     activeIndex={relatedJobFilter.activeIndex}
                     showDropdown={relatedJobFilter.showDropdown}
                     onSelect={this.toggleConditionFilter}
                     toggleDropdown={this.toggleRelatedJobDropdown} />
                    <Dropdown
                     uniqueId='conditionFilter'
                     overlay={conditionFilter.filterLists[jobFilter.activeIndex]}
                     activeIndex={conditionFilter.activeIndex}
                     showDropdown={conditionFilter.showDropdown}
                     onSelect={this.toggleConditionFilter}
                     toggleDropdown={this.toggleConditionDropdown} />
                </div>
                <div className='content'>
                    <List
                     list={list}
                     isCard
                     type='candidateList' />
                    <Loading complete={ !loading && pageLeft < 10 || pageLeft === 10} />
                </div>

                <Nav nav={this.state.nav} visible={!this.state.clientFrom} />
            </div>
        );
    }
}

// Render the main component into the dom
ReactDOM.render(<AppComponent />, document.getElementById('app'));

