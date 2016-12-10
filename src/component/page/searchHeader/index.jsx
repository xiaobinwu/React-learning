import './index.scss';
import React from 'react';

import Icon from '../../page/icon/index';

class SearchHeader extends React.Component {
    render() {
        let { prefix, value } = this.props;

        return (
            <div className={prefix}>
                <a className={`${prefix}-left`} href='/Mobile/Jobs'>
                    <Icon type='left-arrow' size='md' />
                </a>
                <div className={`${prefix}-bar`}>
                    <input type='search'
                     placeholder='请输入公司、职位关键字'
                     value={value}
                     onFocus={this.props.handleFocus}
                     onBlur={this.props.handleFocus}
                     onChange={this.props.handleInput} />
                    <div
                     className='search-icon'
                     onTouchTap={this.props.handleSearch}>
                        <Icon type='search' size='md' />
                    </div>
                </div>
            </div>
        )
    }
};

SearchHeader.displayName = 'SearchHeader';

SearchHeader.propTypes = {
    prefix: React.PropTypes.string,
    value: React.PropTypes.string
}

SearchHeader.defaultProps = {
    prefix: 'lbd-search-header',
    value: ''
}

export default SearchHeader;
