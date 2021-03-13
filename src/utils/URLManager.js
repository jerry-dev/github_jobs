const URLManager = function(url) {
    if (url === null || url === 'null' ) {
        return '';
    } else {
        return url;
    }
}

export default URLManager;