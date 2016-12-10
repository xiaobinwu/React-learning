/*
    *当需要将组件直接渲染在body上时，可以使用这个组件包裹它。
    *比如modal/toast/imageContainer/dropdown这些弹窗类的组件，我们会希望它出现在Body上，
    *从而避免z-index管理的困难。
    *
    * 这样做react官方并不是很赞同，可能有一些性能问题。
*/

import React from 'react';
import ReactDOM from 'react-dom';


class RenderInBody extends React.Component {

    componentDidMount() {
        this.popup = document.createElement('div');
        document.body.appendChild(this.popup);
        this._renderLayer();
    }


    componentDidUpdate() {
        this._renderLayer();
    }


    componentWillUnmount() {
        ReactDOM.unmountComponentAtNode(this.popup);
        document.body.removeChild(this.popup);
    }


    _renderLayer() {
        ReactDOM.render(this.props.children, this.popup);
    }


    render() {
        // Render a placeholder
        return React.DOM.div(null);
    }
}

export default RenderInBody;
