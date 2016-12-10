import './index.scss';
import React from 'react';
import classNames from 'classnames';
import Icon from '../icon/index';

let tabList = [
    {
        name: '职位',
        url: '/Mobile/Jobs',
        id: 'jobs'
    },
    {
        name: '候选人',
        url: '/Mobile/Candidates',
        id: 'candidates'
    },
    {
        name: '消息',
        url: '/Mobile/Messages',
        id: 'messages'
    },
    {
        name: '我',
        url: '/Mobile/Me',
        id: 'me'
    }
];

let Nav = (props) => {
    if (!props.visible) {
        return null;
    }
    let tabs = tabList.map((tab) => {
        let classes = classNames({
            'nav-item': true,
            'nav-item-active': tab.id == props.nav.activeTab,
            'nav-item-hasRedpoint': props.nav.hasRedpoint && props.nav.hasRedpoint.indexOf(tab.id) > -1
        });
        return (
            <li key={tab.id} className={classes}>
                <a className="nav-item-link" href={tab.url}>
                    <Icon
                     type={ tab.id == props.nav.activeTab ? `${tab.id}-active` : tab.id }
                     size='lg'>
                        <span className="red-point"></span>
                    </Icon>
                    <span className="nav-item-name">{tab.name}</span>
                </a>
            </li>
        )
    });

    return (
        <ul className='nav-component'>
            {tabs}
        </ul>
    )
};

Nav.propTypes = {
    nav: React.PropTypes.shape({
        activeTab: React.PropTypes.string.isRequired,
        hasRedpoint: React.PropTypes.arrayOf(
            React.PropTypes.oneOf(tabList.map(tab => tab.id))
        )
    }),
    visible: React.PropTypes.bool.isRequired
}

Nav.defaultProps = {
    visible: true
}

export default Nav;
