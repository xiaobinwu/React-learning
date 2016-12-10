/*
    *TODO: 重新设计TOAST组件，向外抛出调用接口，简化组件的使用
    *@params:
    *type: 弹窗类型，目前有三种，'success', 'error', 'loading'
*/

import './index.scss';
import React from 'react';

import Icon from '../../page/icon/index';

class Toast extends React.Component {

    componentDidMount() {
        if (this.props.type !== 'loading') {
            this.timeout = setTimeout(function() {
                this.props.onOk()
            }.bind(this), 1500);
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.type !== this.props.type && this.props.type !== 'loading') {
            this.timeout = setTimeout(function() {
                this.props.onOk()
            }.bind(this), 1500);
        }
    }

    componentWillUnmount() {
        if (this.props.type !== 'loading') {
            clearTimeout(this.timeout)
        }
    }

    render() {
        let { prefix, children, type, message, onOk } = this.props;

        return (
            <div>
              <div className={`${prefix}-mask`}></div>
              <div className={`${prefix}-wrap`}>
                <div className={`${prefix}-content ${prefix}-${type}`}>
                    <div className={`${prefix}-body`}>
                        {
                            type === 'success' ? <Icon type='success' width='50px' height='50px' /> : null
                        }
                        {
                            type === 'loading' ? <Icon type='loading' width='50px' height='50px' /> : null
                        }
                        <div className={`${prefix}-message`}>
                            { message || children}
                        </div>
                    </div>
                </div>
              </div>
            </div>
        )
    }
}

Toast.propTypes = {
    prefix: React.PropTypes.string,
    className: React.PropTypes.string,
    type: React.PropTypes.oneOf(['success', 'error', 'loading']).isRequired,
    message: React.PropTypes.string,
    onOk: React.PropTypes.func
}

Toast.defaultProps = {
    prefix: 'toast',
    className: '',
    onOk: function(){}
}

export default Toast;

