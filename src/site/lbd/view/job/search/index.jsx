import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import $ from 'webpack-zepto';
import update from 'react-addons-update';

import SearchHeader from '../../../../../component/page/searchHeader/index';
import HotSearchTags from '../../../../../component/page/hotSearchTags/index';
import JobSearchResults from '../../../../../component/page/jobSearchResults/index';

class AppComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSearchResult: false,
            hotSearchTags: [],
            keyword: '',
            inputValue: '',
            isFocused: false
        }
        this.handleInput = (e) => {
            this.setState({inputValue: e.target.value})
        }
        this.handleFocus = (e) => {
            this.setState({isFocused: !this.state.isFocused})
        }
        this.handleSearch = () => {
            let value = this.state.inputValue;

            this.setState(update(this.state, {
                showSearchResult: {$set: true},
                keyword: {$set: value}
            }))
        }
    }

    setInitialData() {
        let initialDataElm = document.getElementById('initialData'),
            data = JSON.parse(initialDataElm.innerHTML);

        this.setState({hotSearchTags: data})
    }

    componentWillMount() {
        this.setInitialData()
    }

    handleHotSearch(value) {
        this.setState(update(this.state, {
            showSearchResult: {$set: true},
            keyword: {$set: value},
            inputValue: {$set: value}
        }))
    }

    render() {
        let  { showSearchResult, hotSearchTags, keyword, inputValue, isFocused } = this.state;

        return (
            <div className="index index-search">
                <SearchHeader
                 value={inputValue}
                 handleInput={this.handleInput}
                 handleFocus={this.handleFocus}
                 handleSearch={this.handleSearch} />
                <div className='content'>
                    {
                        !showSearchResult ? (
                            <HotSearchTags
                             data={hotSearchTags}
                             handleSearch={this.handleHotSearch.bind(this)} />
                        ) : (
                            <JobSearchResults
                             keyword={keyword}
                             isFocused={isFocused} />
                        )
                    }
                </div>
            </div>
        );
    }
}

// Render the main component into the dom
ReactDOM.render(<AppComponent />, document.getElementById('app'));

