/*
    *这个组件示范了如何声明式的调用Modal和toast，
    *声明式调用是符合react思想的，但是调用起来较为麻烦，
    *未来可以将Modal和toast组件进行改造，抛出接口来调用
*/

import $ from 'webpack-zepto';
import update from 'react-addons-update';
import React from 'react';
import './index.scss';

import Button from '../../base/button/index';
import Modal from '../../base/modal/index';
import Toast from '../../base/toast/index';
import GetJobModal from '../getJobModal/index';
import Footer from '../footer/index';

import { errorMessage } from '../../../utils/error';

class GetOrderButton extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isModalOpen: false,
            toast: {
                isToastOpen: false,
                type: '',
                message: ''
            },
            isErrorMessageOpen: false,
            refundPolicyDescription: '',
            leftOrdersAmount: 0,
            errorMesg: ''

        }
        this.handleClick = ()=> {
            let { isModalOpen, toast, isErrorMessageOpen } = this.state;
            let { isFinished } = this.props;
            if (isModalOpen || toast.isToastOpen || isErrorMessageOpen || isFinished) {
                return false;
            }
            let { isA2AJob } = this.props;
            if (isA2AJob) {
                this.getInternalOrder()
            }else {
                this.getMarketOrder()
                    .then(this.setMarketOrderDetail.bind(this))
                    .then(() => {
                        this.setState({isModalOpen: true})
                    })
                    .catch((result) => {
                        this.showErrorMessage(result)
                    });
            }
        }
        this.handleA2AJobOk = () => {
            this.setState(update(this.state, {
                toast: {
                    isToastOpen: {$set: false},
                    type: {$set: ''},
                    message: {$set: ''}
                }
            }))
        }
        this.handleMarketJobOk = () => {
            this.confirmMarketOrder()
                .then(() => {
                    this.setState(update(this.state, {
                        isModalOpen: {$set: false},
                        toast: {
                            isToastOpen: {$set: true},
                            type: {$set: 'success'},
                            message: {$set: '抢单成功'}
                        }
                    }))
                    this.props.onClick()
                })
                .catch((result) => {
                    this.showErrorMessage(result)
                });
        }
        this.handleCancel = () => {
            this.setState({isModalOpen: false})
        }
    }


    showErrorMessage(result) {

        if (result.data && result.data.code) {
            switch (result.data.code) {
                case 'NotFoundFirm':
                    this.setState(update(this.state, {
                        isErrorMessageOpen: {$set: true},
                        errorMesg: {$set: '必须认证您所在的公司才可以抢单！'}
                    }))
                    break;
                case 'Applying':
                    this.setState(update(this.state, {
                        isErrorMessageOpen: {$set: true},
                        errorMesg: {$set: '还未能认证您所在的公司，请等待审核通过后再抢单！'}
                    }))
                    break;
                case 'OutOfLimit':
                    this.setState(update(this.state, {
                        isErrorMessageOpen: {$set: true},
                        errorMesg: {$set: errorMessage(result)}
                    }))
                    break;
                case 'FirmNotVerified':
                    this.setState(update(this.state, {
                        isErrorMessageOpen: {$set: true},
                        errorMesg: {$set: errorMessage(result)}
                    }))
                    break;
                default:
                    this.setState(update(this.state, {
                        toast: {
                            isToastOpen: {$set: true},
                            type: {$set: 'error'},
                            message: {$set: errorMessage(result)}
                        }
                    }))
                    break;
            }
        }else {
            this.setState(update(this.state, {
                toast: {
                    isToastOpen: {$set: true},
                    type: {$set: 'error'},
                    message: {$set: errorMessage(result)}
                }
            }))
        }
    }

    closeErrorMessage() {
        this.setState(update(this.state, {
            isErrorMessageOpen: {$set: false},
            errorMesg: {$set: ''}
        }))
    }

    setMarketOrderDetail(result) {
        this.setState(update(this.state, {
            leftOrdersAmount: {$set:result.leftOrdersAmount},
            refundPolicyDescription: {$set:result.refundPolicyDescription}
        }))
    }

    getInternalOrder() {
        $.post('/Headhunting/Order/GetInternalOrder', {
            jobId: this.props.jobId,
            __RequestVerificationToken: this.props.token
        }, (result) => {
            if (result.succeeded) {
                this.setState(update(this.state, {
                    toast: {
                        isToastOpen: {$set: true},
                        type: {$set: 'success'},
                        message: {$set: '抢单成功'}
                    }
                }))
                this.props.onClick()
            }else {
                this.showErrorMessage(result)
            }
        })
    }

    getMarketOrder() {
        return new Promise((resolve, reject) => {
            $.post('/Headhunting/Order/GetMarketOrder', {
                jobId: this.props.jobId,
                __RequestVerificationToken: this.props.token
            }, (result) => {
                if (result.succeeded) {
                    resolve(result.data)
                }else {
                    reject(result)
                }
            })
        })
    }

    confirmMarketOrder() {
        return new Promise((resolve, reject) => {
            $.post('/Headhunting/Order/GetMarketOrder', {
                jobId: this.props.jobId,
                __RequestVerificationToken: this.props.token,
                confirm: true
            }, (result) => {
                if (result.succeeded) {
                    resolve(result.data)
                }else {
                    reject(result)
                }
            })
        })
    }

    render() {
        return (
            <div>
                <Footer>
                    <div className={this.props.prefix}>
                        <Button
                         block
                         disabled={this.props.isFinished}
                         onClick={this.handleClick}>
                            { this.props.isFinished ? '已抢单' : '立即抢单'}
                        </Button>
                    </div>
                </Footer>

                {
                    this.state.toast.isToastOpen ? (
                        <Toast
                         type={this.state.toast.type}
                         onOk={this.handleA2AJobOk}
                         message={this.state.toast.message}>
                        </Toast>
                    ) : null
                }

                <Modal
                 visible={this.state.isErrorMessageOpen}
                 type='alert'
                 okText='确定'
                 onOk={this.closeErrorMessage.bind(this)}
                 content={this.state.errorMesg}
                />

                <Modal
                 visible={this.state.isModalOpen}
                 type='confirm'
                 okText='确定抢单'
                 cancelText='再考虑下'
                 onOk={this.handleMarketJobOk}
                 onCancel={this.handleCancel}>
                    <GetJobModal
                     leftOrdersAmount={this.state.leftOrdersAmount}
                     refundPolicyDescription={this.state.refundPolicyDescription}/>
                </Modal>
            </div>
        );
    }
}

GetOrderButton.propTypes = {
    prefix: React.PropTypes.string,
    isA2AJob: React.PropTypes.bool.isRequired,
    token: React.PropTypes.string.isRequired,
    isFinished: React.PropTypes.bool.isRequired,
    jobId: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func
}

GetOrderButton.defaultProps = {
    prefix: 'lbd-order-button',
    onClick: function() {}
}

export default GetOrderButton;
