const badge = {
    update: (values) => {
        if (values.color) {
            chrome.browserAction.setBadgeBackgroundColor({
                color: values.color
            });
        }
        
        if (values.text) {
            chrome.browserAction.setBadgeText({
                text: values.text
            });
        }
    }
}