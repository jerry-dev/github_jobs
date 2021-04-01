const createdAt = function(time) {
    const creation = new Date(Number(time));
    const milliSeconds = new Date().getTime() - creation.getTime();
    const minutes = Math.floor(milliSeconds/1000/60);
    const hours = Math.floor(milliSeconds/1000/60/60);
    const days = Math.floor(milliSeconds/1000/60/60/24);
    const weeks = Math.floor(milliSeconds/1000/60/60/24/7);
    const months = Math.floor(milliSeconds/1000/60/60/24/7/4);

    if (hours < 1) {
        return `${minutes}mi ago`;
    } else if (days < 1) {
        return `${hours}h ago`;
    } else if (weeks < 1) {
        return `${days}d ago`;
    } else if (months < 1) {
        return `${weeks}w ago`;
    } else if (months >= 1) {
        return `${months}mo ago`;
    }
}

export default createdAt;