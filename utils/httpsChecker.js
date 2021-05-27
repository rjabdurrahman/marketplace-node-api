module.exports = function httpsChecker(url) {
    if(!url.includes('http')) return 'https://' + url;
    else return url;
}