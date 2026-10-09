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
        //Show notification with the cleared URL, if enabled
        chrome.storage.sync.get({ showNotifications: false }, ({ showNotifications }) => {
            if (!showNotifications) return;
            chrome.notifications.create({
                type: 'basic',
                iconUrl: 'icons/icon.png',
                title: 'Site Data Cleared',
                message: `Cleared data for: ${tab.url}`
            });
        });
       // Reload the current tab to reflect the changes
        chrome.tabs.reload(tab.id);
    });
})

// Context menu on the toolbar icon to toggle notifications
const NOTIFICATIONS_MENU_ID = 'show-notifications';

const syncNotificationsMenu = async () => {
    const { showNotifications } = await chrome.storage.sync.get({ showNotifications: false });
    await chrome.contextMenus.removeAll();
    chrome.contextMenus.create({
        id: NOTIFICATIONS_MENU_ID,
        title: 'Show notifications',
        type: 'checkbox',
        checked: showNotifications,
        contexts: ['action']
    });
};

chrome.runtime.onInstalled.addListener(syncNotificationsMenu);
chrome.runtime.onStartup.addListener(syncNotificationsMenu);

chrome.contextMenus.onClicked.addListener((info) => {
    if (info.menuItemId !== NOTIFICATIONS_MENU_ID) return;
    chrome.storage.sync.set({ showNotifications: info.checked });
});

chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'sync' || !changes.showNotifications) return;
    chrome.contextMenus.update(NOTIFICATIONS_MENU_ID, { checked: changes.showNotifications.newValue });
});
