const ignore = {
    cancel: false
};

function callback(details) {
    let url = new URL(details.url);
    let req_url = url.searchParams.get('requrl');
    if (!req_url) {
        return ignore;
    }
    return {
        redirectUrl: req_url,
    }
}

function onMessage(msg) {
    switch (msg.cmd) {
        case 'openOptionPage':
            chrome.runtime.openOptionsPage();
            break;
    }
}

chrome.runtime.onMessage.addListener(onMessage);
chrome.webRequest.onBeforeRequest.addListener(callback,
    {
        urls: [
            "https://cas.mioffice.cn/*"
        ]
    },
    ["blocking"]);