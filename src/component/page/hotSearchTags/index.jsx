import './index.scss';
import React from 'react';

import Icon from '../../page/icon/index';

let HotSearchTags = (props) => {
    let { prefix, data } = props;

    return (
        <div className={prefix}>
            <h3 className={`${prefix}-title`}>热门搜索</h3>
            <ul className={`${prefix}-tagContainer`}>
                {
                    data.length > 0 ? (
                        data.map((tag, index) => {
                            return <li
                                    key={index}
                                    className={`${prefix}-tag`}
                                    onTouchTap={props.handleSearch.bind(this, tag)}>
                                       {tag}
                                   </li>
                        })
                    ) : null
                }
            </ul>
        </div>
    )
};

HotSearchTags.displayName = 'HotSearchTags';

HotSearchTags.propTypes = {
    prefix: React.PropTypes.string,
    data: React.PropTypes.arrayOf(React.PropTypes.string)
}

HotSearchTags.defaultProps = {
    prefix: 'lbd-hot-search'
}

export default HotSearchTags;
