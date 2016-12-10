/*
    *TODO: 重新设计MODAL组件，向外抛出调用接口，简化组件的使用
    *@params:
    *type: 弹窗类型，目前有两种，confirm弹窗有两个按钮操作, alert弹窗只有一个确定按钮)
*/

import './index.scss';
import React from 'react';

class Modal extends React.Component {

    render() {
        let { prefix, children, type, visible, okText, cancelText, onOk, onCancel, content, head } = this.props;

        if (!visible) {
            return null;
        }

        return (
            <div>
              <div className={`${prefix}-mask`}></div>
              <div className={`${prefix}-wrap`}>
                <div className={`${prefix}-content ${prefix}-${type}`}>
                    <div className={`${prefix}-body`}>
                        {
                            head ? (
                                <div className={`${prefix}-head`}>
                                    { head }
                                </div>
                            ) : null
                        }
                        { content || children}
                    </div>
                    <div className={`${prefix}-footer`}>
                        { type === 'alert' ? null : (
                            <div
                             className={`${prefix}-footer-button`}
                             onTouchTap={onCancel}>
                                {cancelText}
                            </div>
                        )}
                        <div
                         className={`${prefix}-footer-button`}
                         onTouchTap={onOk}>
                            {okText}
                        </div>
                    </div>
                </div>
              </div>
            </div>
        )
    }
}

Modal.propTypes = {
    prefix: React.PropTypes.string,
    className: React.PropTypes.string,
    type: React.PropTypes.oneOf(['confirm', 'alert']).isRequired,
    okText: React.PropTypes.string,
    cancelText: React.PropTypes.string,
    onOk: React.PropTypes.func,
    onCancel: React.PropTypes.func,
    content: React.PropTypes.string,
    head: React.PropTypes.string
}

Modal.defaultProps = {
    prefix: 'modal',
    className: '',
    okText: '确定',
    cancelText: '取消',
    onOk: function(){},
    onCancel: function(){}
}

export default Modal;
