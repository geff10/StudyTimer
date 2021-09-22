const notification = {
    show: (title, message, image, soundEnabled) => {
        chrome.notifications.create({
            "type": "basic",
            "iconUrl": chrome.runtime.getURL(image),
            "title": title,
            "message": message
        });
        
        if (soundEnabled) {
            sound.play();
        }
    }
}