# Clear Site Data Chrome Extension


Clear Site Data is a simple and lightweight Chrome extension that allows you to quickly clear cookies and local storage for the currently active website with a single click.

The extension operates entirely locally in the browser and does not collect or transmit any user data.

---

## Features

- **One-Click Clearing**  
  Instantly removes cookies and local storage associated with the website open in the active tab.

- **Automatic Page Reload**  
  Automatically reloads the page after clearing site data.

- **Incognito Mode Support**  
  Works in Incognito windows (must be enabled manually in Chrome extension settings).

- **No Data Collection**  
  All operations are performed locally. No tracking, analytics, or external communication.

---

## How It Works

When the user clicks the extension icon:

1. The extension identifies the currently active tab.
2. The website origin (e.g. `https://www.example.com`) is extracted.
3. Chrome APIs (`browsingData` and `cookies`) are used to remove cookies and site data related to that website.
4. The active tab is reloaded to apply the changes.

All actions are triggered explicitly by the user.

---

## Permissions Used

The extension requires the following permissions to function correctly:

- **`browsingData`**  
  Required to clear cookies and local storage data for the selected website.

- **`tabs`**  
  Required to identify the active tab and reload it after clearing site data.

- **`activeTab`**  
  Required to access the currently active website only when the user interacts with the extension.

- **`notifications`**  
  Used only to display a local confirmation message after the operation is completed.

No data is read, stored, or transmitted outside the browser.

---

## Incognito Mode

The extension supports Incognito mode using Chrome’s split incognito behavior.

To enable it:
1. Open `chrome://extensions/`
2. Locate **Clear Site Data**
3. Click **Details**
4. Enable **Allow in Incognito**

Data from Incognito sessions is handled separately and is never shared with regular browsing sessions.

---

## Installation (Development)

1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** using the toggle in the top-right corner.
4. Click **Load unpacked**.
5. Select the folder containing `manifest.json`, `background.js`, and related files.
6. The **Clear Site Data** icon will appear in the Chrome toolbar.

---

## Privacy Policy

The privacy policy for this extension is available in the [`PRIVACY.md`](PRIVACY.md) file.

A public version of the privacy policy must be provided when publishing the extension on the Chrome Web Store.

---

## Disclaimer

Clearing cookies and site data may log users out of websites or reset site-specific preferences.
Use this extension at your own risk.

---

## License

This project is licensed under the MIT License.
See the [LICENSE](LICENSE) file for details.
