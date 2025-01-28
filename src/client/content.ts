  
(() =>{
    try { 
        const container = document.documentElement;
        const script = document.createElement('script');
        script.setAttribute('async', "false")
        script.setAttribute('fetchpriority', "high")
        script.src = chrome.runtime.getURL('src/client/inject.js')
        container.prepend(script)
        script.addEventListener('load', () => { container.removeChild(script) } )
    } catch (error) {
      console.error('Faild to inject warp easy long listner.', error);
    }
  })()

const allowedEvents = ['']
  
    window.addEventListener("message", (event) => {
      if (event.source != window)
          return;
        if(allowedEvents.includes(event?.data?.type ?? '')){
            chrome.runtime.sendMessage(event.data)
        }
  })
  
