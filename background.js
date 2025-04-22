chrome.action.onClicked.addListener(async() => {
    // Get the current active tab in the window
    const [tab] = await chrome.tabs.query({ 
        active: true,
        currentWindow: true 
    });

    
    // Check if the tab is valid
    if(!tab.url || !tab.id ) return;
    
    console.log("Current tab => ",tab);
    
    const url = new URL(tab.url);
    const origin = url.origin;
    
    // Clear cookies and localStorage for the current tab's origin
    chrome.browsingData.remove({
        "origins": [origin]
    }, {
        "cookies": true,
        "localStorage": true,
    }, () => {
        // Reload the current tab to reflect the changes
        chrome.tabs.reload(tab.id);
        // Optionally, you can create a notification to inform the user
        createNotification("Clear Site Data",`Cookie e localStorage removed for: \n${url}`);
        console.log(`Browsing data cleared for origin: ${origin}`);
    });
})


// Function to create a notification
function createNotification(title,message){
    chrome.notifications.create({
        type: 'basic',
        iconUrl:'icons/icon.png',
        title: title,
        message: message
    });
}