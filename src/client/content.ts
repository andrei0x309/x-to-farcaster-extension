import { getOptions } from '../lib/utils';

const allowedEvents = ['QTFgetClient']
  
    window.addEventListener("message", (event) => {
      if (event.source != window)
          return;
        if(allowedEvents.includes(event?.data?.type ?? '')){
            if(event?.data?.type === 'QTFgetClient'){
              console.log('QTFgetClient')
              getOptions().then((options) => {
                console.log(options)
                const client = options?.client || 'fosscaster'
                window.postMessage({
                    type: 'QTFsendClient',
                    client: client
                }, "*")
            }) 
          }
        }
  })
  
