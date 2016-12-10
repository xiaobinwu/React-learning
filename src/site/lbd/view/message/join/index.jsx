import 'core-js/fn/object/assign';
import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'webpack-zepto';
import update from 'react-addons-update';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import SubHeader from '../../../../../component/page/subHeader/index';
import JoinItem from '../../../../../component/page/joinItem/index';
import Modal from '../../../../../component/base/modal/index';
import Toast from '../../../../../component/base/toast/index';

import { errorMessage } from '../../../../../utils/error';

class AppComponent extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            headerData: {
                left: [{
                    icon: 'left-arrow',
                    link: '/Mobile/Messages?clientAction=pop'
                }]
            },
            joinList: [],
            token: '',
            isModalOpen: false,
            modalHead: '',
            modalContent: '',
            itemIndex: 0,
            status: 0,
            toast: {
                isToastOpen: false,
                message: '',
                type: ''
            }
        }
        this.handleAccept = (index) => {
            this.setState(update(this.state, {
                isModalOpen: {$set: true},
                modalHead: {$set: '确定同意加入吗？'},
                modalContent: {$set: '加入公司后将可以使用招聘业务，发布职位等'},
                itemIndex: {$set: index},
                status: {$set: 1}
            }))
        }
        this.handleDecline = (index) => {
            this.setState(update(this.state, {
                isModalOpen: {$set: true},
                modalHead: {$set: '确定拒绝加入吗？'},
                modalContent: {$set: '拒绝后将会自动从列表移除'},
                itemIndex: {$set: index},
                status: {$set: 2}
            }))
        }
        this.handleOk = () => {
            this.showLoadingToast()
            this.sendAjax()
        }
        this.handleCancel = () => {
            this.setState(update(this.state, {
                isModalOpen: {$set: false}
            }))
        }

    }

    sendAjax() {
        let { itemIndex, status } = this.state;
        $.post('/FirmManager/Approval', {
            applicationId: this.state.joinList[itemIndex].applicationId,
            status: status,
            __RequestVerificationToken: this.state.token
        }, (result) => {
            if (result.succeeded) {
                let list = this.state.joinList.map((item, i) => {
                    if (i === itemIndex) {
                        if (status === 1) {
                            item.accepted = true
                        }else if (status === 2) {
                            item.declined = true
                        }
                    }
                    return item;
                })
                this.setState(update(this.state, {
                    toast: {
                        isToastOpen: {$set: false},
                        type: {$set: ''},
                        message: {$set: ''}
                    },
                    joinList: {$set: list}
                }))
            }else {
                this.showErrorMessage(result)
            }
        })
    }

    getJoiningApplicationList() {
        $.get('/Mobile/Message/JoiningApplications', (result) => {
            if (result.succeeded) {
                if (result.data.total > 0) {
                    let list = result.data.list.map((item, i) => {
                        return {
                            message: item.message,
                            realName: item.realName,
                            nickName: item.nickname,
                            avatarUrl: item.avatarUrl,
                            applicationId: item.applicationId,
                            accepted: false,
                            declined: false,
                            key: i
                        }
                    })
                    this.setState({joinList: list})
                }
            }else {
                this.showErrorMessage(result)
            }
        })
    }

    getToken() {
        let token = document.querySelector('input[name=__RequestVerificationToken]').value;
        this.setState({token: token})
    }

    componentDidMount() {
        this.getJoiningApplicationList()
        this.getToken()
    }

    showErrorMessage(result) {
        this.setState(update(this.state, {
            toast: {
                isToastOpen: {$set: true},
                type: {$set: 'error'},
                message: {$set: errorMessage(result)}
            }
        }))
    }

    showLoadingToast() {
        this.setState(update(this.state, {
            isModalOpen: {$set: false},
            toast: {
                isToastOpen: {$set: true},
                type: {$set: 'loading'},
                message: {$set: '请求发送中'}
            }
        }))
    }

    handleToastClose() {
        this.setState(update(this.state, {
            toast: {
                isToastOpen: {$set: false},
                type: {$set: ''},
                message: {$set: ''}
            }
        }))
    }

    renderList() {
        let joinList = this.state.joinList;
        return joinList.length > 0 ? (
            <ul className='joinList'>
                {
                    joinList.map((item, i) => {
                        return <JoinItem
                                key={`join-list-item-${i}`}
                                item={item}
                                handleAccept={this.handleAccept}
                                handleDecline={this.handleDecline}
                                />
                    })
                }
            </ul>
        ) : null
    }

    render() {
        let { headerData } = this.state;
        return (
            <div className='index'>
                <SubHeader
                 title='新成员申请'
                 fixed
                 data={headerData}
                />
                <div className='content'>
                    {this.renderList()}
                </div>
                <Modal
                 visible={this.state.isModalOpen}
                 type='confirm'
                 okText='确定'
                 cancelText='取消'
                 onOk={this.handleOk}
                 onCancel={this.handleCancel}
                 head={this.state.modalHead}
                 content={this.state.modalContent}
                />
                {
                    this.state.toast.isToastOpen ? (
                        <Toast
                         type={this.state.toast.type}
                         onOk={this.handleToastClose.bind(this)}
                         message={this.state.toast.message}>
                        </Toast>
                    ) : null
                }
            </div>
        );
    }
}

// Render the main component into the dom
ReactDOM.render(<AppComponent />, document.getElementById('app'));

