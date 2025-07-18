import { setDefaultOptions } from './lib/utils';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Service Worker received message:', request)
})


chrome.runtime.onStartup.addListener(() => {
    console.info('Service worker startup');
    setDefaultOptions();
    if (chrome.runtime.lastError) {
        console.warn("Whoops.. " + chrome.runtime.lastError.message);
    }
})

