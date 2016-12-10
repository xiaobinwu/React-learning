export const feedType = {
    undefined: {
        code: 0,
        text: '未定义',
        job_desc: '',
        candidate_desc: ''
    },
    recommedation: {
        code: 1,
        text: '推荐',
        job_desc: '推荐了候选人 %p',
        candidate_desc: '推荐了候选人'
    },
    accepted: {
        code: 2,
        text: '接受',
        job_desc: '接受了候选人 %p',
        candidate_desc: '接受了候选人'
    },
    rejected: {
        code: 3,
        text: '拒绝',
        job_desc: '拒绝了候选人 %p',
        candidate_desc: '拒绝了候选人'
    },
    reAccepted: {
        code: 4,
        text: '重新接受',
        job_desc: '重新接受了候选人 %p',
        candidate_desc: '重新接受了候选人'
    },
    promoteInterview: {
        code: 5,
        text: '推进面试',
        job_desc: '将候选人 %p 推进到面试阶段',
        candidate_desc: '将候选人推进到面试阶段'
    },
    arrangeInterview: {
        code: 6,
        text: '安排面试',
        job_desc: '为候选人 %p 安排了',
        candidate_desc: '安排了'
    },
    cancelInterview: {
        code: 7,
        text: '取消面试',
        job_desc: '为候选人 %p 取消了',
        candidate_desc: '取消了'
    },
    feedBackInterview: {
        code: 8,
        text: '反馈面试',
        job_desc: '反馈了候选人 %p 的',
        candidate_desc: '反馈了'
    },
    offer: {
        code: 9,
        text: 'Offer',
        job_desc: 'Offer了候选人 %p',
        candidate_desc: '将候选人推进到Offer阶段'
    },
    onboard: {
        code: 10,
        text: '入职',
        job_desc: '将候选人 %p 推进到入职阶段',
        candidate_desc: '候选人已入职'
    },
    obsoleted: {
        code: 11,
        text: '淘汰',
        job_desc: '淘汰了候选人 %p',
        candidate_desc: '候选人已淘汰'
    },
    pauseJob: {
        code: 12,
        text: '暂停职位',
        job_desc: '暂停了职位',
        candidate_desc: '暂停了职位'
    },
    finishJob: {
        code: 13,
        text: '完成职位',
        job_desc: '完成了职位',
        candidate_desc: '完成了职位'
    },
    restartJob: {
        code: 14,
        text: '重启职位',
        job_desc: '重启了职位',
        candidate_desc: '重启了职位'
    },
    publishJob: {
        code: 15,
        text: '发布职位',
        job_desc: '发布了该职位',
        candidate_desc: '发布了职位'
    },
    transferJob: {
        code: 16,
        text: '移交职位',
        job_desc: '将移交职位给 %p',
        candidate_desc: '移交了职位'
    },
    dimission: {
        code: 17,
        text: '离职',
        job_desc: '将候选人 %p 设置为离职状态',
        candidate_desc: '候选人已离职'
    },
    projectManagerApproved: {
        code: 18,
        text: '筛选通过',
        job_desc: '筛选通过了候选人 %p',
        candidate_desc: '筛选通过'
    },
    jobAccountRecharge: {
        code: 19,
        text: '塞红包',
        job_desc: '为职位充值红包',
        candidate_desc: '为职位充值红包'
    },
    jobReward: {
        code: 20,
        text: '打赏',
        job_desc: '打赏了',
        candidate_desc: '打赏了'
    },
    jobAccountRechargeBroadcast: {
        code: 21,
        text: '广播',
        job_desc: '广播了职位',
        candidate_desc: '广播了职位'
    },
    comment: {
        code: 99,
        text: '评论',
        job_desc: '评论了职位',
        candidate_desc: '评论了职位'
    }
}
