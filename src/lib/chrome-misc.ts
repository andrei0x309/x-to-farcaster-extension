export const getChromeUrl = (url: string) => {
    return chrome.runtime.getURL(url)
}
