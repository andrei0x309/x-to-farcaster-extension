
<script lang="ts">

    import Alert from '@/components/alert.svelte'

  interface Props {
    isActive?: boolean;
  }

  let { isActive = false }: Props = $props();
      let alert: any & { showAlert: (msg: string, type: 'warning' | 'success' | 'danger' | 'info') => void } = $state();
 
</script>


<div id="tab-1" class="{`tab-pane ${isActive ? 'active' : ''}`}">

    <Alert bind:this={alert} alertMsg="" alertType="warning" alertVisible={false} alertTimeout={0} />

    
    <h2 class="-mb-1 text-lg font-semibold text-gray-900 dark:text-white">Quote To Farcaster</h2>
    <p class="text-sm text-gray-600 dark:text-gray-400 px-4">This extension will help you to quote any tweet from X.com to a farcaster client like fosscaster.xyz or farcaster.xyz</p>
    <h2 class="-mb-1 mt-2 text-lg font-semibold text-gray-900 dark:text-white">Notes</h2>
    <ul class="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400 text-left text-sm">
        <li class="flex items-center" style="margin-bottom: 1rem;">
            <svg class="w-3.5 h-3.5 me-2 text-purple-500 dark:text-purple-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
             </svg>
            A button will appear on all posts on X.com besides the bookmark button while you have the extension enabled.
        </li>
        <li class="flex items-center" style="margin-bottom: 1rem;">
            <svg class="w-3.5 h-3.5 me-2 text-purple-500 dark:text-purple-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
             </svg>
             If you don't see the button, refresh X App page.
        </li>
        <li class="flex items-center" style="margin-bottom: 1rem;">
            <svg class="w-3.5 h-3.5 me-2 text-purple-500 dark:text-purple-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
             </svg>
             You should be already logged in to fosscaster.xyz or farcaster.xyz to use the extension.
        </li>
        <li class="flex items-center" style="margin-bottom: 1rem;">
          <svg class="w-3.5 h-3.5 me-2 text-purple-500 dark:text-purple-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
           </svg>
           The preview of the quote might not appear in the composer box, but it will appear if you type anything or post the link.
      </li>
    </ul>

 

  </div>

  <style lang="scss">

.blink {
    animation: blinker 1s linear infinite;
    cursor: wait;
}

@keyframes blinker {
    50% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}


  </style>