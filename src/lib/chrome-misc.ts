export const getChromeUrl = (url: string) => {
    return chrome.runtime.getURL(url)
}

export const navigdateTo = (url: string) => {
        chrome.tabs.create({ url });
  }

