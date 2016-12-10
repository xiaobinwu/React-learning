export function convertAtFormat(str, arr) {
    return str.replace(/\n/g, '<br>')
              .replace(/\[userId:'([^\]]+)*?'\]/g, function ($1, $2) {
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i].userId == $2) {
                            return `<span class="lbd-comment-item-at">@${arr[i].nickname} </span>`;
                        }
                    }
                    return $1;
               });
}


