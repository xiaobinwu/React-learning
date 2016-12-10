export function recommendStatusFilter(status) {
    switch(status) {
        case 'Unfiltered': return '未筛选';
        case 'Unprocessed': return '未处理';
        case 'Accepted': return '已接受';
        case 'Rejected': return '已拒绝';
        case 'Interview': return '面试';
        case 'Arranged': return '已安排';
        case 'AwaitEvaluation': return '待评估';
        case 'Feedbacked': return '已反馈';
        case 'Offer': return 'Offer';
        case 'Onboard': return '已入职';
        case 'Dimission': return '已离职';
        case 'Obsoleted': return '已淘汰';
        default: return null;
    }
}
