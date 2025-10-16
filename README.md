# Clear Site Data Chrome Extension

A simple Chrome extension to quickly clear cookies and local storage for the currently active website.

## Features

*   **One-Click Clearing:** Click the extension icon to instantly remove cookies and local storage data associated with the website in the active tab.
*   **Automatic Reload:** After clearing the data, the extension automatically reloads the page.
*   **Incognito Mode Support:** Works in Incognito windows (requires enabling in extension settings).

## How it Works

The extension listens for clicks on its action icon. When clicked, it identifies the active tab's URL, extracts the origin (e.g., `https://www.example.com`), and then uses the `chrome.browsingData` API to remove cookies and local storage specifically for that origin. Finally, it reloads the tab using `chrome.tabs.reload`.

## Permissions Used

*   `browsingData`: To clear site data (cookies, local storage).
*   `tabs`: To get information about the active tab (URL, ID) and reload it.
*   `notifications`: To display a confirmation message after clearing data.
*   `host_permissions` (`<all_urls>`): Necessary for the `browsingData` API to clear data on any website origin.

## Installation (Development)

1.  Clone or download this repository.
2.  Open Chrome and navigate to `chrome://extensions/`.
3.  Enable "Developer mode" using the toggle switch in the top right corner.
4.  Click the "Load unpacked" button.
5.  Select the directory containing the extension's files (`manifest.json`, `background.js`, etc.).
6.  The "Clear Site Data" extension icon should appear in your Chrome toolbar.
7.  **(Optional) To use in Incognito mode:** Go to `chrome://extensions/`, find "Clear Site Data", click "Details", and enable "Allow in Incognito".
