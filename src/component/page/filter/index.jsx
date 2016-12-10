/*
    *@params:
    *filters: 数据列表
    *isHead：是否为头部（头部的话会fixed在顶部）
    *isSlidable： 是否可以向右滑动查看更多
    *hasSingleItem: 是否只有一个子元素
    *
*/

import './index.scss';
import React from 'react';
import classNames from 'classnames';

let Filter = (props) => {
    let { type, isHead, isSlidable, hasSingleItem , hiden, filters, activeIndex, onClick } = props;
    let className = classNames({
        [`lbd-filter-${type}`]: true,
        ['is-head']: isHead,
        ['has-single-item']: hasSingleItem,
        ['is-hiden']: hiden,
        ['is-slidable']: isSlidable
    });

    let filterList = filters.map((filter, i) => {
        let filterItemCls = classNames({
            ['lbd-filter-item']: true,
            ['lbd-filter-item-active']: i == activeIndex,
            ['lbd-filter-item-single']: filters.length === 1
        })
        return (
            <li
             key={i}
             className={filterItemCls}
             onTouchTap={onClick.bind(null, i)} >
                {filter.name}
            </li>
        )
    })

    return (
        <div className={className}>
            <div className="lbd-filter-mask"></div>
            {
                filters.length > 0 ? (
                    <ul className="lbd-filter-wrap" id="lbd-filter-scroll-el">
                        {filterList}
                    </ul>
                ) : null
            }
        </div>
    )
};

Filter.propTypes = {
    filters: React.PropTypes.arrayOf(React.PropTypes.object),
    activeIndex: React.PropTypes.number.isRequired,
    isHead: React.PropTypes.bool,
    isSlidable: React.PropTypes.bool,
    hasSingleItem: React.PropTypes.bool,
    hiden: React.PropTypes.bool,
    onClick: React.PropTypes.func
}

Filter.defaultProps = {
    filters: []
}

export default Filter;
