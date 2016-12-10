/*
    *@params:
    *data: 顶部数据格式：
        var data = {
          "left": [
            {
              "link": "",         // url : http://xxx.xxx.xxx
              "title": "",        // 链接标题
              "onSelect": function() {},
              "icon": "",         // 字体图标名称: 使用 Amaze UI 字体图标 http://www.amazeui.org/css/icon
            }
          ],

          "right": [ // 右侧字段含义同左侧
            {
              "link": "",
              "title": "",
              "onSelect": function() {},
              "icon": "",
            }
          ]
        };

 */

import './index.scss';
import React from 'react';
import Icon from '../../page/icon/index';
import classNames from 'classnames';

class SubHeader extends React.Component {

    renderTitle() {
        let { title, onSelect, link, prefix } = this.props;

        return title ? ( < h1 className = { `${prefix}-title truncate` }
            onTouchTap = {
                onSelect.bind(this, {
                    title: title,
                    link: link
                })
            } > {
                link ? ( < a href = { link } > { title } < /a>) : title
            } < /h1>
        ) : null;
    }

    renderNav(position) {
        let { data, prefix } = this.props;
        let renderItem = (item, i) => {
            let handleClick = item.onSelect || this.props.onSelect;
            return ( < a href = { item.link }
                onTouchTap = { handleClick.bind(this, item) }
                key = { 'headerNavItem' + i } > {
                    item.title ? ( < span className = { `${prefix}-nav-title` } > { item.title } < /span>) : null
                }

                {
                    item.icon ? ( < Icon type = { item.icon }
                        size = "md" / >
                    ) : null
                } < /a>
            );
        };

        return data && data[position] ? ( < div className = { `${prefix}-nav ${prefix}-${position}` } > {
            data[position].map(function(item, i) {
                return renderItem(item, i);
            })
        } < /div>) : null;
    }


    render() {
        let { prefix, fixed } = this.props;
        let headerCls = classNames({
            [prefix]: true,
            [`${prefix}-fixed`]: fixed
        })
        return (
            < div className = { headerCls } >
                { this.renderNav('left') }
                { this.renderTitle() }
                { this.renderNav('right') }
            < /div>
        )
    }
}

SubHeader.propTypes = {
    prefix: React.PropTypes.string,
    data: React.PropTypes.object,
    fixed: React.PropTypes.bool,
    title: React.PropTypes.node,
    link: React.PropTypes.string,
    onSelect: React.PropTypes.func
}

SubHeader.defaultProps = {
    prefix: 'lbd-subHeader',
    onSelect: function() {}
}

module.exports = SubHeader;
