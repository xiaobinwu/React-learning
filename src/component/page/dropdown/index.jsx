/*
    *TODO: 目前该组件只支持下拉一级菜单或者二级菜单，可以扩展到支持更多及的下拉菜单
    *@params:
    *overlay: 下拉菜单数据列表
    *isTree: 是否是树级下拉菜单
    *
    * 这个组件目前自身的状态：
    * activeTreeStem: 目前被选中的一级菜单
    * treeLeafArray: 目前被选中的一级菜单对应的二级菜单数组
    *
    * 由于activeTreeStem必须根据父组件的props，组件state如果依赖Props，一定要注意处理.
    * 比如这里增加了componentWillReceiveProps生命周期，判断当前props与上一次props是否相等，不等的时候更新state
*/


import React from 'react';
import './index.scss';
import classNames from 'classnames';

import update from 'react-addons-update';

import Icon from '../icon/index';
import RenderInBody from '../renderInBody/index';

class Dropdown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTreeStem: this.props.activeIndex[0],
            treeLeafArray: [{name: '全部类别'}]
        }
        this.handleTreeStemSelect = (arr, index) => {
            this.setState(update(this.state, {
                activeTreeStem: {$set: index},
                treeLeafArray: {$set: arr}
            }))
        }
    }

    componentWillReceiveProps(nextProps) {
        let originalActiveIndex = nextProps.activeIndex[0];

        if ( originalActiveIndex !== this.state.activeTreeStem) {
            this.setState(update(this.state, {
                activeTreeStem: {$set: originalActiveIndex},
                treeLeafArray: {$set: nextProps.overlay[originalActiveIndex].children}
            }))
        }
    }

    renderMenu() {
        let  { prefix, overlay, showDropdown, activeIndex, uniqueId } = this.props;
        let menuCls = classNames({
            [`${prefix}-menu`]: true,
            ['appear-from-top']: showDropdown
        })

        return (
            <ul className={menuCls}>
                {
                    overlay.map((item, index) => {
                        let itemCls = classNames({
                            [`${prefix}-menu-item`]: true,
                            [`${prefix}-active`]: index === activeIndex,
                            ['truncate']: true,
                        })
                        return (
                            <li
                             key={item.type}
                             className={itemCls}
                             onTouchTap={this.props.onSelect.bind(this, index, uniqueId)}>
                                {item.name}
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    renderTreeSelect() {
        let  { prefix, overlay, showDropdown, activeIndex, uniqueId } = this.props;
        let {  treeLeafArray, activeTreeStem } = this.state;

        let treeSelectCls = classNames({
            [`${prefix}-treeSelect`]: true,
            ['appear-from-top']: showDropdown
        })

        return (
            <div className={treeSelectCls}>
                <div className={`${prefix}-treeStem`}>
                    <ul>
                        {
                            overlay.map((item, i) => {
                                let treeStemCls = classNames({
                                    ['active']: activeTreeStem === i
                                })
                                return (
                                    <li
                                     key={i}
                                     className={treeStemCls}
                                     onTouchTap={this.handleTreeStemSelect.bind(this, item.children || [{name: '全部类别'}], i)}>
                                        {item.name}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className={`${prefix}-treeLeaf`}>
                    {
                        treeLeafArray.length ? (
                            <ul>
                                { treeLeafArray.map((item, i) => {
                                    let treeLeafCls = classNames({
                                        ['active']: activeIndex[0] === activeTreeStem && activeIndex[1] === i
                                    })
                                    return (
                                        <li
                                         key={i}
                                         className={treeLeafCls}
                                         onTouchTap={this.props.onSelect.bind(this, [activeTreeStem, i], uniqueId)}>
                                            {item.name}
                                        </li>
                                    )
                                })}
                            </ul>
                        ) :null
                    }
                </div>
            </div>
        )
    }

    render() {
        let { prefix, overlay, activeIndex, activeObject, showDropdown, isTree } = this.props;

        let boardStyle = {
            top: '84px'
        }

        let boardCls = classNames({
            [`${prefix}-board`]: true,
            [`${prefix}-hidden`]: !showDropdown
        })

        let iconCls = classNames({
            [`${prefix}-icon`]: true,
            [`${prefix}-icon-rotate`]: showDropdown
        })

        let elmCls = classNames({
            [`${prefix}-elm`]: true,
            [`${prefix}-elm-active`]: showDropdown
        })

        return (
            <div className={prefix}>
                <div className={elmCls} onTouchTap={this.props.toggleDropdown}>
                    <span className={`${prefix}-elm-text truncate`}>
                        { isTree ? overlay[activeIndex[0]].children[activeIndex[1]].name : overlay[activeIndex].name }
                    </span>
                    <Icon
                     className={iconCls}
                     type='up-arrow'
                     width='10px'
                     height='10px'
                    />
                </div>
                <RenderInBody>
                    <div className={boardCls} style={boardStyle}>

                        { isTree ? this.renderTreeSelect() : this.renderMenu() }

                        <div
                         className={`${prefix}-mask`}
                         onTouchTap={this.props.toggleDropdown}
                        />
                    </div>
                </RenderInBody>
            </div>
        );
    }
}

Dropdown.propTypes = {
    prefix: React.PropTypes.string,
    overlay: React.PropTypes.arrayOf(React.PropTypes.object),
    showDropdown: React.PropTypes.bool.isRequired,
    isTree: React.PropTypes.bool
}

Dropdown.defaultProps = {
    prefix: 'lbd-dropdown',
    overlay: [{name: '全部', type: 0}],
    isTree: false
}

export default Dropdown;
