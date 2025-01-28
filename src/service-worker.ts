chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Service Worker received message:', request)
})

console.info('Service Worker Loaded')
