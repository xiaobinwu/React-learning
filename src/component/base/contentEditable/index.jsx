/*
    *
    *@params:
    *html: 这个参数接收的是一段html，而不是文本。由于contentEditable元素监听不到onChange事件，
    *所以这里是用onBlur+onInput组合来监听文本框的变化，更新innerHTML。
    *
    *注意监听onPaste事件，并且去格式化，而且要处理好光标的位置。案例见replybox组件的handlePaste方法
*/

import React from 'react';
import './index.scss';

export default class ContentEditable extends React.Component {
    constructor() {
        super();
        this.emitChange = this.emitChange.bind(this);
    }

    render() {
        return React.createElement(
            this.props.tagName || 'div',
            Object.assign({}, this.props, {
                ref: (e) => this.htmlEl = e,
                onInput: this.emitChange,
                onBlur: this.emitChange,
                onPaste: this.props.onPaste,
                contentEditable: !this.props.disabled,
                dangerouslySetInnerHTML: { __html: this.props.html }
            }),
            this.props.children);
    }

    shouldComponentUpdate(nextProps) {
        return !this.htmlEl || nextProps.html !== this.htmlEl.innerHTML ||
            this.props.disabled !== nextProps.disabled;
    }

    componentDidUpdate() {
        if (this.htmlEl && this.props.html !== this.htmlEl.innerHTML) {
            this.htmlEl.innerHTML = this.props.html;
        }
    }

    emitChange(evt) {
        if (!this.htmlEl) return;
        var html = this.htmlEl.innerHTML;
        if (this.props.onChange && html !== this.lastHtml) {
            evt.target = { value: html };
            this.props.onChange(evt);
        }
        this.lastHtml = html;
    }

}

ContentEditable.propTypes = {
    html: React.PropTypes.node,
    onPaste: React.PropTypes.func,
    onChange: React.PropTypes.func
}
