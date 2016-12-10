import './index.scss';

import React from 'react';

class Tab extends React.Component {
    handleTabClick(e) {
        this.props.onTabClick(e);
        window.location.hash = this.props.url;
    }

    render() {
        let {isActive, index, title } = this.props;
        const className = `tab-item ${isActive ? 'active' : ''}`;

        return (
            <li
             className={className}
             onTouchTap={this.handleTabClick.bind(this)}
             key={index}
             data-index={index}>
                {title}
            </li>
        )
    }
}

export default Tab;
