chrome.action.onClicked.addListener(async() => {
    const [tab] = await chrome.tabs.query({ 
        active: true,
        currentWindow: true 
    });

    console.log("Current tab => ",tab);

    if(!tab.url || !tab.id ) return;

    const url = new URL(tab.url);
    const origin = url.origin;
    
    chrome.browsingData.remove({
        "origins": [origin]
    }, {
        "cookies": true,
        "localStorage": true,
    }, () => {
        chrome.tabs.reload(tab.id);
        createNotification(origin);
        console.log(`Browsing data cleared for origin: ${origin}`);
    });
})


function createNotification(url){
    chrome.notifications.create({
        type: 'basic',
        iconUrl:'icons/icon.png',
        title: 'Cleared data',
        message: `Cookie e localStorage removed for: \n${url}`
    });
}