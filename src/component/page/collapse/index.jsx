/*
    *TODO: 目前该组件只支持根据行数来判断，可增加其他几种方式以增加灵活性
    *@params:
    *row: 最多显示几行，超过这个值将出现展开收起按钮
*/


import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';

class Collapse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggled: false,
            maxHeight: 0,
            targetHeight: null
        }
        this.handleClick = ()=> {
            this.setState({isToggled: !this.state.isToggled});
            if (!this.state.isToggled) {
                this.props.onClick()
            }
        }
    }

    getTheStyle(elem, prop) {
        return window.getComputedStyle(elem,null).getPropertyValue(prop);
    }


    // componentDidUpdate () {
    //     const targetNode = ReactDOM.findDOMNode(this.refs.targetNode);
    //     const targetHeight = targetNode.offsetHeight;
    //     this.setState({targetHeight})
    // }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return !this.state.targetHeight || this.state.isToggled !== nextState.isToggled ;
    // }

    componentDidMount () {
        let setHeight = () => {
            const targetNode = ReactDOM.findDOMNode(this.refs.targetNode);
            const lineHeight = parseFloat(this.getTheStyle(targetNode.firstElementChild, 'line-height'));
            const maxHeight = this.props.row * lineHeight;
            const targetHeight = targetNode.offsetHeight;
            this.setState({maxHeight, targetHeight})
        }

        requestAnimationFrame(setHeight)

    }

    render() {

        let wrapStyle = { maxHeight: this.state.maxHeight };
        if (this.state.isToggled) {
            wrapStyle.maxHeight = 'none';
        }

        return (
          <div className="lbd-collapse">
              <div className="lbd-collapse-wrap" style={wrapStyle}>
                <div ref="targetNode">
                    {this.props.children}
                </div>
              </div>
              {this.state.targetHeight > this.state.maxHeight ? (
                  <div className="lbd-collapse-icon" onTouchTap={this.handleClick}>
                      <span>
                          {this.state.isToggled ? '收起' : '显示全部'}
                      </span>
                  </div>
              ) : null}
          </div>
        )

    }
}

Collapse.propTypes = {
    row: React.PropTypes.number,
    onClick: React.PropTypes.func
}

Collapse.defaultProps = {
    row: 4,
    onClick: function() {}
}

export default Collapse;
