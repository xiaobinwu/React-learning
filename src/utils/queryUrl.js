export function getQuery() {
    var s = window.location.href;
    var query = {};
    if (s.indexOf('?') >= 0) {
        s = s.substring(s.indexOf('?'));
    }
    if (s.indexOf('#') >= 0) { //防止出现 #
        s = s.substring(0, s.indexOf('#'));
    }

    s.replace(/\b([^&=]*)=([^&=]*)\b/g, function(m, a, d) {
        if (typeof query[a] != 'undefined') {
            query[a] += ',' + d;
        } else {
            query[a] = d;
        }
    });

    return query;
}
