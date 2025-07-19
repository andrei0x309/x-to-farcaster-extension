<script lang="ts">
    interface Props {
        isActive?: boolean;
    }

    let { isActive = false }: Props = $props();

    const navigdateTo = (url: string) => {
        chrome.tabs.create({ url });
    }

</script>


<div id="tab-2" class="{`tab-pane ${isActive ? 'active' : ''}`} dark:text-gray-100 text-gray-800" style="font-size: 1rem; text-align: left;">
    <h2 class="-mb-1 text-lg font-semibold text-gray-900 dark:text-white text-[1.05rem]">Source Code</h2>
    <p class="text-sm text-gray-600 dark:text-gray-400 px-4">This extension is open-source and the source can be found on GitHub here: <a style="color: blueviolet;" onclick={() => {
        navigdateTo('https://github.com/andrei0x309/x-to-farcaster-extension')
        }} href="#link1">GitHub Repo</a></p>
    <h2 class="-mb-1 mt-2 text-lg font-semibold text-gray-900 dark:text-white text-[1.05rem]">Other Farcaster related Projects</h2>
    <ul class="px-2 max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400 text-left text-[0.9rem]">
        <li class="flex items-center">
            <p class="p-1 m-0">
                <b>Clear Wallet</b> - an open-source browser EVM wallet with farcaster actions(if you have imported custody PK) ( login to farcaster.xyz do SIWF, etc.):
            <a style="color: blueviolet;" onclick={() => { navigdateTo('https://github.com/andrei0x309/clear-wallet')}} href="#link2">GitHub Repo</a>
        </p>
        </li>
        <li class="flex items-center">
            <p class="p-1 m-0">
             <b>Yup Live</b> - an open-source(desktop/mobile/web) multi client for farcaster, lens, bluesky, X.
            <a style="color: blueviolet;" onclick={() => { navigdateTo('https://github.com/andrei0x309/yup-live')}} href="#link2">GitHub Repo</a>
            </p>
        </li>
        <li class="flex items-center">
            <p class="p-1 m-0">
                <b>Farcaster Hub Utils</b> - an open-source(desktop/mobile/web) library to interact with farcaster hubs on behalf of one or more FIDs and signer PKs.
             <a style="color: blueviolet;" onclick={() => { navigdateTo('https://github.com/andrei0x309/farcaster-hub-utils')}} href="#link2">GitHub Repo</a>
             </p>
        </li>
        <li class="flex items-center">
            <p class="p-1 m-0">
                <b>Farcaster Easy Login</b> - an open-source browser extension to login to farcaster.xyz without needing a mobile device, and using your preferred EVM wallet.
           <a style="color: blueviolet;" onclick={() => { navigdateTo('https://github.com/andrei0x309/warp-easy-login-browser-extension')}} href="#link2">GitHub Repo</a>
           </p>
      </li>
    </ul>
</div>