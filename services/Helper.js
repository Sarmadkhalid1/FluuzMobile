export const formatCurrency = (value) => {
    if (value && decimalCount(value) > 2) {
        value = value.toString();
        return parseFloat(value).toFixed(2).toString()
    }
    else if (value) {
        return value.toString();
    }
    return value;
}

const decimalCount = (number) => {
    const numberAsString = number.toString();
    if (numberAsString.includes('.')) {
        return numberAsString.split('.')[1].length;
    }
    return 0;
}

export const timestampWithOffsetToDate = (timestamp, offset) => {
    var date = new Date(timestamp);

    var offsetMilliseconds = offset * 60 * 1000;
    date.setTime(date.getTime() + offsetMilliseconds);

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    return { day, month, year };
}
export const truncateText = (str, no) => {
    if (str.length > no) {
        return str.slice(0, no) + '...';
    }
    return str;
}

export const formatDate = (dateString) => {
    if (typeof dateString !== 'string') {
        return 'Invalid input';
    }
    var tIndex = dateString.indexOf('T');
    if (tIndex === -1) {
        return dateString;
    }
    var datePart = dateString.substring(0, tIndex);
    return datePart;
}

export const formatTime = (timeString) => {
    if (typeof timeString !== 'string') {
        return 'Invalid input';
    }
    var tIndex = timeString.indexOf('T');
    if (tIndex === -1) {
        return 'Invalid time format';
    }
    var timePart = timeString.substring(tIndex + 1, timeString.indexOf('.'));
    return timePart;
}

export const getAmPm = (timeString) => {
    if (typeof timeString !== 'string') {
        return 'Invalid input';
    }
    const timeParts = timeString.split(':');
    if (timeParts.length !== 3) {
        return 'Invalid time format';
    }
    const hour = parseInt(timeParts[0], 10);
    if (isNaN(hour) || hour < 0 || hour >= 24) {
        return 'Invalid hour';
    }
    return hour < 12 ? 'AM' : 'PM';
}