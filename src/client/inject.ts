// @ts-nocheck

const SVG = `
<span style="margin-right: 0.5rem;">Quote to</span>
<svg width="18" height="18" viewBox="0 0 1260 1260" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1_2)"><path d="M947.747 1259.61H311.861C139.901 1259.61 0 1119.72 0 947.752V311.871C0 139.907 139.901 0.00541362 311.861 0.00541362H947.747C1119.71 0.00541362 1259.61 139.907 1259.61 311.871V947.752C1259.61 1119.72 1119.71 1259.61 947.747 1259.61Z" fill="#472A91"></path><path d="M826.513 398.633L764.404 631.889L702.093 398.633H558.697L495.789 633.607L433.087 398.633H269.764L421.528 914.36H562.431L629.807 674.876L697.181 914.36H838.388L989.819 398.633H826.513Z" fill="white"></path></g><defs><clipPath id="clip0_1_2"><rect width="1259.61" height="1259.61" fill="white"></rect></clipPath></defs></svg>`

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
    if (event.data.type === 'client') {
        dataPromiseReslove(event.data.client)
    }
});

const getClient = async () => {
        const waitForMessage = new Promise((resolve) => {
            dataPromiseReslove = resolve;
        });
        window.postMessage({
            type: 'getClient'
        }, "*")
        return await waitForMessage;
}

const quoteToFarcaster = async (tweetAddress) => {
    const rawClient = await getClient();
    let client = 'fosscaster.xyz';
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
    farcasterButton.style = 'background: transparent;border: 1px solid #3c2173;padding: 0.2rem; padding-left: 0.5rem; padding-right: 0.5rem; border-radius: 0.5rem; color: #3c2173; font-size: 0.8rem; font-weight: 600; display: flex; align-items: center; justify-content: center; cursor: pointer;';
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
