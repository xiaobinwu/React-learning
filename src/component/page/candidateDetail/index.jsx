import './index.scss';
import React from 'react';
import Collapse from '../collapse/index';
import Avatar from '../avatar/index';
import Icon from '../icon/index';
import Button from '../../base/button/index';
import Footer from '../footer/index';
import { date } from '../../../utils/date';

function formatBytes(bytes,decimals) {
   if(bytes == 0) return '0 Byte';
   var k = 1000;
   var dm = decimals + 1 || 2;
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
   var i = Math.floor(Math.log(bytes) / Math.log(k));
   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}


class CandidateDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showResumeFiles: false
        }
        this.handleToggle = () => {
            this.setState({showResumeFiles: !this.state.showResumeFiles})
        }
    }

    renderAttachmentControl() {
        let { resumeFiles, prefix } = this.props;
        let { showResumeFiles } = this.state;
        let cls = showResumeFiles ? `${prefix}-rotate` : '';
        return resumeFiles.length > 0 ? (
            <div className={`${prefix}-attachment`} onTouchTap={this.handleToggle}>
                <Icon
                 type='attachment'
                 width='12px'
                 height='12px'
                />
                <span className={`${prefix}-attach-text`}>
                    附件({resumeFiles.length})
                </span>
                <Icon
                 className={`${prefix}-arrow ${cls}`}
                 type='up-arrow'
                 width='10px'
                 height='10px'
                />
            </div>
        ) : null
    }

    renderAttachmentList() {
        let { resumeFiles, prefix } = this.props;
        let { showResumeFiles } = this.state;
        let cls = showResumeFiles ? `${prefix}-expand` : '';
        return resumeFiles.length > 0 ? (
            <ul className={`${prefix}-attach-list ${cls}`}>
                {
                    resumeFiles.map((file, i) => {
                        return (
                            <li
                             className={`${prefix}-attach-item`}
                             key={`${prefix}-item-${i}`}>
                                <a href={file.Url} target='_blank'>
                                    <Icon
                                     type='attachment'
                                     width='12px'
                                     height='12px'
                                    />
                                    <span className={`${prefix}-attach-text`}>
                                        {file.Name}
                                    </span>
                                    <span className={`${prefix}-gray`}>
                                        {`(${formatBytes(file.Length)})`}
                                    </span>
                                </a>
                            </li>
                        )
                    })
                }
            </ul>
        ) : null
    }

    render() {
        let { prefix, content, readRecords, jobId, isPulic } = this.props;
        return (
            <div className={prefix}>
                <div className={`${prefix}-card`}>
                    <div className={`${prefix}-content`}>
                        <div className={`${prefix}-title`}>
                            <span>简历详情</span>
                            {this.renderAttachmentControl()}
                        </div>
                        {this.renderAttachmentList()}
                        <Collapse row={4} onClick={this.props.handleCollapse.bind(this)}>
                            <div
                             className={`${prefix}-para`}
                             dangerouslySetInnerHTML={{__html: content}} />
                        </Collapse>
                    </div>
                </div>
                <div className={`${prefix}-card`}>
                    <div className={`${prefix}-content-full`}>
                        <div className={`${prefix}-title ${prefix}-padding`}>阅读与转发</div>
                        <ul className={`${prefix}-records`}>
                            {
                                readRecords.length > 0 && readRecords.map((item, i) => {
                                    let readRecordsName = item.viewerInfo.realName ?
                                                          `${item.viewerInfo.realName}@${item.viewerInfo.nickname}` :
                                                          item.viewerInfo.id
                                    return (
                                        <li
                                         key={`readRecordsItem-${i}`}
                                         className={`${prefix}-item`}>
                                            <div className={`${prefix}-avatar`}>
                                                <Avatar url={item.viewerInfo.avatarUrl} />
                                            </div>
                                            <div className={`${prefix}-name truncate`}>
                                                <span>{readRecordsName}</span>
                                            </div>
                                            <div className={`${prefix}-condition`}>
                                                {
                                                    item.hasRead ? (
                                                        '已读 '+date(item.updated)
                                                    ) : '未读'
                                                }
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
                {
                    isPulic ? null : (
                        <Footer>
                            <div className={`${prefix}-footer`}>
                                <a href={`/Recommendation/Steps/${jobId}?clientAction=push`}>
                                    <Button block>处理候选人</Button>
                                </a>
                            </div>
                        </Footer>
                    )
                }
            </div>
        );
    }
}

CandidateDetail.propTypes = {
    prefix: React.PropTypes.string,
    content: React.PropTypes.string,
    resumeFiles: React.PropTypes.array,
    handleCollapse: React.PropTypes.func,
    jobId: React.PropTypes.string
}

CandidateDetail.defaultProps = {
    prefix: 'lbd-candidate-detail',
    content: '',
    resumeFiles: [],
    handleCollapse: function() {},
    jobId: ''
}

export default CandidateDetail;

