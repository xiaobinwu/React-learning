if (!Date.prototype.add) {
    Date.prototype.add = function (obj) { // obj = {year:1,month:-1,day:2};
        var year = this.getFullYear(), month = this.getMonth(),time=0;
        for (var q in obj) {
            if (q == 'year') {
                year += obj[q]
            } else if (q == 'month') {
                month += obj[q];
                if(month>12){
                    year += parseInt(month/12);
                    month -= 12;
                }else if(month<1){
                    month = 12+month;
                    year += parseInt(month/12);
                }
            } else if (q == 'day') {
                time = obj[q] * 24 * 60 * 60 * 1000;
            }
        }
        return new Date(new Date(year+'/'+(month+1)+'/'+this.getDate()).getTime()+time);
    }
}

if (!Date.prototype.format) {
    Date.prototype.format = function (format) {
        var o = {
            'M+': this.getMonth() + 1, //month
            'd+': this.getDate(), //day
            'h+': this.getHours(), //hour
            'm+': this.getMinutes(), //minute
            's+': this.getSeconds(), //second
            'q+': Math.floor((this.getMonth() + 3) / 3), //quarter
            'S': this.getMilliseconds() //millisecond
        }

        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp('(' + k + ')').test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
            }
        }

        return format;
    }
}

function i10n (str) {
    return str;
}

function makeEmpyArray(size, filling){
    return Array.apply(null, Array(size || 4)).map(Number.prototype.valueOf,filling || 0)
}

// 自动补零
function markPadding(str, size){
    if(str.length < size){
        return makeEmpyArray(size - str.length).join('') + str;
    }else{
        return str;
    }
}

// str = '2014/01/12 12:30'
function magicTime(str) {
    if (!str) {
        return '';
    }

    var date = new Date(str.replace(/-/g,'/')), now = new Date();
    if(date > now){
        return '刚刚';
    }
    function doubleNumTime(num) {
        num += '';
        return num.length == 1 ? '0' + num : num;
    }
    if (typeof serviceDateOffset == 'string') {
        now = new Date(now.getTime() + serviceDateOffset)
    }
    var year = now.getFullYear(),
        month = now.getMonth()+1,
        day = now.getDate(),
        nowDate = new Date(year + '/' + month + '/' + day),
        hour = now.getHours(),
        minutes = now.getMinutes(),
        yestoday = nowDate.add({ day: -1 }),
        tomorrow = nowDate.add({ day: 1 });
    var maxDate = new Date('2900/01/01').getTime(), miniDate = new Date('2000/01/01').getTime();
    var dateObj = new Date(date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()),
        dateHours = date.getHours(),
        dateMinu = date.getMinutes(),
        dateTime = date.getTime(),
        nowTime = now.getTime(),
        oneHourTime = 60*60*1000;
    if (date.toString() == 'Invalid Date') {
        return str;
    }
    if (date.getTime() >= maxDate) {
        return i10n('很久以后');
    } else if (date.getTime() <= miniDate) {
        return i10n('很久以前');
    } else {
        if (yestoday.getTime() == dateObj.getTime()) {
            return i10n('昨天') + ' ' + doubleNumTime(date.getHours()) + ':' + doubleNumTime(date.getMinutes());
        } else if (tomorrow.getTime() == dateObj.getTime()) {
            return i10n('明天') + ' ' + doubleNumTime(date.getHours()) + ':' + doubleNumTime(date.getMinutes());
        } else if (dateObj.getTime() == nowDate.getTime()) {
            if (dateTime > nowTime - oneHourTime * 4 && dateTime < nowTime - oneHourTime) {  //目标时间小于当前时间，并且不超过4小时
                return (hour - dateHours) + i10n('小时前');
            } else if (dateTime < nowTime + oneHourTime * 4 && dateTime > nowTime + oneHourTime) {  //目标时间大于当前时间，并且不超过4小时
                return (dateHours - hour) + i10n('小时后');
            } else if (dateHours == hour || (dateTime > nowTime && dateTime < nowTime + oneHourTime) || (dateTime < nowTime && dateTime > nowTime - oneHourTime)) {  // 目标时间与当前时间
                var minutesDiff = Math.floor((dateTime - nowTime) / 60000);
                if(minutesDiff==0||minutesDiff==1){
                    return i10n('刚刚');
                }else if(minutesDiff>0){
                    return minutesDiff + i10n('分钟后');
                } else {
                    return (minutesDiff*-1) + i10n('分钟前');
                }
            }else{
                return i10n('今天') + ' ' + doubleNumTime(dateHours) + ':' + doubleNumTime(dateMinu);
            }
        }
        return str;
    }
}

function magicDate(str) { //将时分秒去掉
    var result = magicTime(str);

    var idx = result.indexOf(' ');
    if (idx !== -1) {
        result = result.substr(0, idx);
    }
    return result;
}

// 时间工具，取时分
function magicHourMinute(str){
    const d = new Date(str.replace(/-/g,'/'));
    return markPadding(d.getHours() + '', 2) + ':' + markPadding(d.getMinutes() + '', 2);
}

// 取月
function magicMonth (str) {
    const d = new Date(str.replace(/-/g,'/'));
    return markPadding(d.getMonth() + 1 + '', 2);
}

// 取天
function magicDay (str) {
    const d = new Date(str.replace(/-/g,'/'));
    return markPadding(d.getDate() + '', 2);
}

export function date (datetime) {
    return datetime ? magicDate(datetime) : '';
}

export function time (datetime) {
    return datetime ? magicHourMinute(datetime) : '';
}

export function dateWithoutYear (datetime) {
    return datetime ? magicMonth(datetime) + '-' + magicDay(datetime) : '';
}
