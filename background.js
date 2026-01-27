chrome.action.onClicked.addListener(async() => {
    // Get the current active tab in the window
    const [tab] = await chrome.tabs.query({ 
        active: true,
        currentWindow: true 
    });

    // Check if the tab is valid
    if (!tab || !tab.url || !tab.id) return;
    
    const url = new URL(tab.url);
    const origin = url.origin
    // Clear cookies and localStorage for the current tab's origin
    chrome.browsingData.remove({
        "origins": [origin]
    }, {
        "cookies": true,
        "localStorage": true,
    }, () => {
        //Show notification with the cleared URL
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icons/icon.png',
            title: 'Site Data Cleared',
            message: `Cleared data for: ${tab.url}`
        });
       // Reload the current tab to reflect the changes
        chrome.tabs.reload(tab.id);
    });
})
