//   http://192.168.1.10:8080/browse/LBD-763
export function errorMessage(result, delimiter) {
    delimiter = delimiter ? delimiter : ',';

    if (typeof result === 'string') {
        try {
            result = JSON.parse(result);
        } catch (e) {
            result = {
                message: '操作失败，请重试！'
            };
        }
    }

    var resultData = result.data;
    var resultMessage = result.message;

    // 1, 2
    if (resultMessage) {
        return resultMessage;
    }

    if (resultData) {

        // 3
        if (resultData.code && resultData.message) {
            return resultData.message;

            // 4
        } else {
            return Object.keys(resultData).reduce(function (errorMessageSummary, errorKey) {
                var errorMessage = resultData[errorKey];

                if (Array.isArray(errorMessage)) {
                    errorMessageSummary = errorMessageSummary.concat(errorMessage);
                } else {
                    errorMessageSummary.push(errorMessage);
                }

                return errorMessageSummary;
            }, []).join(delimiter);
        }
    }

    return '';
}
