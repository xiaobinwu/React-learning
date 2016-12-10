export function createFilter(data) {
    let statusJSON = {
        32: {
            name: '待筛选 ',
            type: 32
        },
        1: {
            name: '待反馈 ',
            type: 1
        },
        2: {
            name: '已接受 ',
            type: 2
        },
        4: {
            name: '面试 ',
            type: 4
        },
        8: {
            name: 'Offer/入职 ',
            type: 8
        },
        16: {
            name: '淘汰/拒绝 ',
            type: 16
        }
    }
    let filterNames = [{name: '全部状态'}];

    for (var i = 0; i < data.length; i++) {
        let status = data[i].name || data[i].Name,
            count = data[i].count || data[i].Count;
        let name = statusJSON[status].name + count,
            type = statusJSON[status].type;

        if (count > 0) {
            filterNames.push({name, type})
        }
    }
    return filterNames;
}
