const logoManager = function(url) {
    if (url === 'null') {
        return `<img rel="icon" src="../../src/assets/icons/desktop/dev-svgrepo-com.svg">`;
    } else {
        return `<img rel="icon" src=${url}>`;
    }
}

export default logoManager;