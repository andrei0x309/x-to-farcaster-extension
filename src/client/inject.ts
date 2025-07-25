// @ts-nocheck

const SVG = 
   `<span style="margin-right: 0.5rem;">Quote to</span>
   <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256" fill="none" style="width: 1.1rem; height: 1.1rem;">
    <rect width="256" height="256" rx="56" fill="#cc1515"></rect>
    <path
        d="M183.296 71.68H211.968L207.872 94.208H200.704V180.224L201.02 180.232C204.266 180.396 206.848 183.081 206.848 186.368V191.488L207.164 191.496C210.41 191.66 212.992 194.345 212.992 197.632V202.752H155.648V197.632C155.648 194.345 158.229 191.66 161.476 191.496L161.792 191.488V186.368C161.792 183.081 164.373 180.396 167.62 180.232L167.936 180.224V138.24C167.936 116.184 150.056 98.304 128 98.304C105.944 98.304 88.0638 116.184 88.0638 138.24V180.224L88.3798 180.232C91.6262 180.396 94.2078 183.081 94.2078 186.368V191.488L94.5238 191.496C97.7702 191.66 100.352 194.345 100.352 197.632V202.752H43.0078V197.632C43.0078 194.345 45.5894 191.66 48.8358 191.496L49.1518 191.488V186.368C49.1518 183.081 51.7334 180.396 54.9798 180.232L55.2958 180.224V94.208H48.1278L44.0318 71.68H72.7038V54.272H183.296V71.68Z"
        fill="white"></path>
    </svg>`
 
let client = 'fosscaster';

const timelineSelector = 'main'
const tweetSelector = '[data-testid="tweet"]:not(:has(.farcaster-button))';
const tweetTimeSelector = 'time';
const tweetBookmarkSelector = '[data-testid="bookmark"]';
let intervalExecuting = false;
let observingChanges = false;

const style = document.createElement('style');
style.textContent = `
.farcaster-button:hover {
  background-color: #3c2173; /* Match border color on hover */
  color: white; 
  transform: scale(1.05); /* Slight enlargement on hover */
}
`;

let dataPromiseReslove = () => {};

const CLIENTS = {
    'farcaster': 'farcaster.xyz',
    'fosscaster': 'fosscaster.xyz',
}

const clientsList = Object.keys(CLIENTS);



window.addEventListener('message', (event) => {
    if (event.data?.type === 'QTFsendClient') {
        dataPromiseReslove(event.data.client)
    }
});

const getClient = async () => {
        const waitForMessage = new Promise((resolve) => {
            dataPromiseReslove = resolve;
        });
        window.postMessage({
            type: 'QTFgetClient'
        }, "*")
        const client = await waitForMessage;
        console.log('client: ', client);
        return client;
}

const quoteToFarcaster = async (tweetAddress) => {
    const rawClient = await getClient();
    if ( clientsList.includes(rawClient)) {
        client = CLIENTS[rawClient];
    }
    
    const composeWarcastUrl = `https://${client}/~/compose?text=`
    const text = encodeURIComponent(` ${tweetAddress}`);
    window.open(`${composeWarcastUrl}${text}`, '_blank');
}

const insertQuoteToFarcasterButon = (tweetElement) => {
    const button = tweetElement.querySelector('.farcaster-button');
    if (button) {
        return;
    }
    const tweetTime = tweetElement.querySelector('time');
    if(!tweetTime) {
        return;
    }
    const link = tweetTime.parentElement;
    const tweetAddress = link.href;
    const farcasterButton = document.createElement('button');
    farcasterButton.className = 'farcaster-button';
    farcasterButton.innerHTML = SVG;
    farcasterButton.style = 'background: transparent;border: 1px solid #cc1515;padding: 0.2rem; padding-left: 0.5rem; padding-right: 0.5rem; border-radius: 0.5rem; color: #cc1515; font-size: 0.8rem; font-weight: 600; display: flex; align-items: center; justify-content: center; cursor: pointer; margin-right: 0.5rem;';
    farcasterButton.onclick = () => {
        quoteToFarcaster(tweetAddress);
    }
    const bookmarkButton = tweetElement.querySelector(tweetBookmarkSelector);
    if (!bookmarkButton) {
        return;
    }
    const bookmarkButtonParent = bookmarkButton.parentElement;
    bookmarkButtonParent.prepend(farcasterButton);
}


const config = { attributes: true, childList: true, subtree: true };


const callback = function(mutationsList, observer) {
    for(const mutation of mutationsList) {
            const targetNode = document.querySelector(timelineSelector);
            if(!targetNode) {
                return;
            }
            const tweets = targetNode.querySelectorAll(tweetSelector);
            tweets.forEach(tweet => {
                insertQuoteToFarcasterButon(tweet);
            });
    }
}

const interval = setInterval(() => {
    if (intervalExecuting) {
        return;
    }
    intervalExecuting = true;
    const targetNode = document.querySelector(timelineSelector);
    if (targetNode && !observingChanges) {
        observingChanges = true;
        const head = document.head || document.getElementsByTagName('head')[0];
        if (head) {
            head.appendChild(style);
        }

        const observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
        clearInterval(interval);
    }
    intervalExecuting = false;
}, 300);
