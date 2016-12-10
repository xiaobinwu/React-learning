/*
    *@params:
    *offsetTop: 表示固定在距离顶部一定距离
    *offsetBottom: 表示固定在局里底部一定距离
*/

import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';

import update from 'react-addons-update';

import { throttle } from '../../../utils/throttle';


function getScroll(w, top) {
    let ret = w[`page${top ? 'Y' : 'X'}Offset`];
    const method = `scroll${top ? 'Top' : 'Left'}`;
    if (typeof ret !== 'number') {
        const d = w.document;
        // ie6,7,8 standard mode
        ret = d.documentElement[method];
        if (typeof ret !== 'number') {
            // quirks mode
            ret = d.body[method];
        }
    }
    return ret;
}

function getOffset(element) {
    const rect = element.getBoundingClientRect();
    const body = document.body;
    const clientTop = element.clientTop || body.clientTop || 0;
    const clientLeft = element.clientLeft || body.clientLeft || 0;
    const scrollTop = getScroll(window, true);
    const scrollLeft = getScroll(window);

    return {
        top: rect.top + scrollTop - clientTop,
        left: rect.left + scrollLeft - clientLeft
    };
}

class Sticky extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stickyStyle: null,
            placeholderStyle: null
        };
    }

    handleScroll() {
        let { offsetTop, offsetBottom } = this.props;

        const scrollTop = getScroll(window, true);
        const elemOffset = getOffset(ReactDOM.findDOMNode(this));
        const elemSize = {
            width: ReactDOM.findDOMNode(this.refs.fixedNode).offsetWidth,
            height: ReactDOM.findDOMNode(this.refs.fixedNode).offsetHeight
        };

        const offsetMode = {};
        if (typeof offsetTop !== 'number' && typeof offsetBottom !== 'number') {
            offsetMode.top = true;
            offsetTop = 0;
        } else {
            offsetMode.top = typeof offsetTop === 'number';
            offsetMode.bottom = typeof offsetBottom === 'number';
        }

        if (scrollTop > elemOffset.top - offsetTop && offsetMode.top) {
            // Fixed Top
            if (!this.state.stickyStyle) {
                this.setState(update(this.state, {
                    stickyStyle: {
                        $set: {
                            position: 'fixed',
                            top: offsetTop,
                            left: elemOffset.left,
                            width: ReactDOM.findDOMNode(this).offsetWidth
                        }
                    },
                    placeholderStyle: {
                        $set: {
                            display: 'block',
                            height: ReactDOM.findDOMNode(this).offsetHeight
                        }
                    }
                }));
            }
        } else if (scrollTop < elemOffset.top + elemSize.height + offsetBottom - window.innerHeight &&
            offsetMode.bottom) {
            // Fixed Bottom
            if (!this.state.stickyStyle) {
                this.setState(update(this.state, {
                    stickyStyle: {
                        $set: {
                            position: 'fixed',
                            bottom: offsetBottom,
                            left: elemOffset.left,
                            width: ReactDOM.findDOMNode(this).offsetWidth
                        }
                    },
                    placeholderStyle: {
                        $set: {
                            display: 'block',
                            height: ReactDOM.findDOMNode(this).offsetHeight
                        }
                    }
                }));
            }
        } else if (this.state.stickyStyle) {
            this.setState(update(this.state, {
                stickyStyle: { $set: null },
                placeholderStyle: { $set: null }
            }));
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', throttle(this.handleScroll.bind(this), 100));
        window.addEventListener('resize', throttle(this.handleScroll.bind(this), 100));
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this))
        window.removeEventListener('resize', this.handleScroll.bind(this))
    }


    render() {

        return (
            < div className = "sticky-wrap" {...this.props } >
                < div className = 'sticky-placeholder' style = { this.state.placeholderStyle } > < /div>
                < div className = 'sticky' ref = "fixedNode" style = { this.state.stickyStyle } >
                    { this.props.children }
                < /div>
            < /div>
        );
    }
}

Sticky.propTypes = {
    offsetTop: React.PropTypes.number,
    offsetBottom: React.PropTypes.number
}

export default Sticky;
