

// No popup, open options in page
chrome.browserAction.onClicked.addListener(activeTab => {
	chrome.runtime.openOptionsPage()
})

