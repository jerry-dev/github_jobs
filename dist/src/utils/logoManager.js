const logoManager = function(url) {
    if (url === 'null') {
        return `<img rel="icon" class="icon" src="../../src/assets/icons/desktop/icons8-github-darktheme.svg">`
    } else {
        return `<img rel="icon" class="icon" src=${url}>`;
    }
}

export default logoManager;