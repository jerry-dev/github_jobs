const URLManager = function(url) {

    switch(url) {
        case 'null':
        case null:
        case 'undefined':
        case undefined:
            return '';
        default:
            if (url.length < 8) {
                return '';
            } else {
                let reformattedURL = url;

                if (reformattedURL.includes('.com/')) {
                    const regex = new RegExp('.com/');
                    reformattedURL = reformattedURL.replace(regex, '.com');
                }

                if (reformattedURL.includes('.io/')) {
                    const regex = new RegExp('.io/');
                    reformattedURL = reformattedURL.replace(regex, '.io');
                }

                if (reformattedURL.includes('http')) {
                    const regex = new RegExp('http:');
                    reformattedURL = reformattedURL.replace(regex, '');
                }

                if (reformattedURL.includes('https:')) {
                    const regex = new RegExp('https:');
                    reformattedURL = reformattedURL.replace(regex, '');
                }

                if (reformattedURL.includes('//')) {
                    const regex = new RegExp('//');
                    reformattedURL = reformattedURL.replace(regex, '');
                }

                if (reformattedURL.includes('www.')) {
                    const regex = new RegExp('www.');
                    reformattedURL = reformattedURL.replace(regex, '');
                }          
                
                return reformattedURL;
            }
    }
}

export default URLManager;