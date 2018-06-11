function onMessage(msg) {
    switch (msg.cmd) {
        case 'openOptionPage':
            chrome.runtime.openOptionsPage();
            break;
    }
}

chrome.runtime.onMessage.addListener(onMessage);