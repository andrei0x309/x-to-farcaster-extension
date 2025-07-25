<script lang="ts">
  import { onMount } from 'svelte';
  import { getOptions, setOptions } from '@/lib/utils';
  import { getChromeUrl } from '@/lib/chrome-misc';
  import { on } from 'svelte/events';
  interface Props {
    isActive?: boolean;
  }

  let { isActive = false }: Props = $props();
  
  let client = $state('fosscaster')

  const handleChange = async (client: string) => {
    const options = await getOptions();
    options.client = client;
    await setOptions(options);
  };
    
 
  onMount(async () => {
    const options = await getOptions();
    client = options.client;
  });

</script>


<div id="tab-2" class="{`tab-pane ${isActive ? 'active' : ''}`} dark:text-gray-100 text-gray-800" style="font-size: 1rem; text-align: left;">
    <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white text-[1.05rem] text-center">Farcaster Client</h2>
    <div class="radio-input">
  <label class="label" onclick={() => handleChange('fosscaster')} aria-hidden="true">
    <input
      type="radio"
      id="value-1"
      checked={client === 'fosscaster'}
      name="value-radio"
      value="fosscaster"
    />
    <p class="text text-[#2e2030] dark:text-white">fosscaster.xyz</p>
    <img src={getChromeUrl('/clients/fosscaster.svg')} alt="fosscaster.xyz" class="w-8 h-8" style="margin-left: auto;" />
  </label>
  <label class="label" onclick={() => handleChange('farcaster')} aria-hidden="true">
    <input type="radio" id="value-2" name="value-radio" value="farcaster"  checked={client === 'farcaster'} />
    <p class="text text-[#2e2030] dark:text-white">farcaster.xyz</p>
    <img src={getChromeUrl('/clients/farcaster.svg')} alt="farcaster.xyz" class="w-8 h-8" style="margin-left: auto;" />
  </label>
</div>

</div>

<style scoped>

.radio-input {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.radio-input * {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.radio-input label {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 0px 20px;
  width: 260px;
  cursor: pointer;
  height: 50px;
  position: relative;
}

.radio-input label::before {
  position: absolute;
  content: "";
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 260px;
  height: 45px;
  z-index: -1;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  border-radius: 10px;
  border: 2px solid transparent;
}
.radio-input label:hover::before {
  transition: all 0.2s ease;
  background-color: #352a3c;
}

.radio-input label:hover .text {
  transition: all 0.2s ease;
  color: #fff;
}

.radio-input .label:has(input:checked) .text {
    color: #fff;
}

.radio-input .label:has(input:checked)::before {
  background-color: #482d50;
  border-color: #a143d8;
  height: 50px;
}
.radio-input .label input[type="radio"] {
  background-color: #2e2030;
  appearance: none;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.radio-input .label input[type="radio"]:checked {
  background-color: #9c43d8;
  -webkit-animation: puls 0.7s forwards;
  animation: pulse 0.7s forwards;
}

.radio-input .label input[type="radio"]:before {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  transition: all 0.1s cubic-bezier(0.165, 0.84, 0.44, 1);
  background-color: #fff;
  transform: scale(0);
}

.radio-input .label input[type="radio"]:checked::before {
  transform: scale(1);
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
  }
  70% {
    box-shadow: 0 0 0 8px rgba(255, 255, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
}


</style>