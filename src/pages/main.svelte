<script lang="ts">
  import MainTab from "./main-tab.svelte";
  import AboutTab from "./about-tab.svelte";
  import OptionsTab from "./options-tab.svelte";
  import { getOptions, setOptions } from '@/lib/utils'
  
 
  let activeTab = $state('main')
  let options: Awaited<ReturnType<typeof getOptions>>
  let theme = 'dark'
  let isDarkTheme = $state(false)

  const themeToggle = () => {
    theme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.classList.toggle('dark')
    getOptions().then((options) => {
      options.theme = theme
      setOptions(options)
    })
  }

  const setTab = (tab: string) => {
    activeTab = tab
  }

  ;(async () => {
    options = await getOptions()
    theme = options.theme
    isDarkTheme = theme === 'dark'
    if (isDarkTheme) {
      document.documentElement.classList.add('dark')
    }
  })()

</script>
 
<div class="mainbody w-full">
  <input title="theme-switch" type="checkbox" id="themeSwitch" name="theme-switch" class="theme-switch__input" onchange={themeToggle} checked={isDarkTheme} />
	<label for="themeSwitch" class="theme-switch__label">
		<span></span>
	</label>
  <div class="container--tabs">
    <section class="row">
      <ul class="nav nav-tabs">
        <li class="{`${activeTab === 'main' ? 'active': ''}`}"><a onclick={() => setTab('main')}  href="#tab-1">Main</a></li>
        <li class="{`${activeTab === 'options' ? 'active': ''}`}"><a onclick={() => setTab('options')}  href="#tab-2">Options</a></li>
        <li class="{`${activeTab === 'about' ? 'active': ''}`}"><a onclick={() => setTab('about')}  href="#tab-3">About</a></li>
      </ul>
      <div class="tab-content p-4">
        <MainTab isActive={activeTab === 'main'} />
        <OptionsTab isActive={activeTab === 'options'} />
        <AboutTab isActive={activeTab === 'about'} />

      </div>
    </section>
  </div>
</div>

<style lang="scss">

// Toggle switch
.theme-switch__input,
.theme-switch__label {
	position: absolute;
  right: 30px;
  top: 10px;
  cursor: pointer;
}

.theme-switch__input {
	opacity: 0;
	
	&:hover,
	&:focus {
		+ .theme-switch__label {
			background-color: lightSlateGray;
		}
		
		+ .theme-switch__label span::after {
			background-color: rgb(182, 218, 230)
		}
	}
}

.theme-switch__label {
    padding: 5px;
    transition: background-color .2s ease-in-out;
    width: 40px;
    height: 15px;
    border-radius: 50px;
    text-align: center;
    background-color: #708090;
    box-shadow: -4px 4px 15px inset #0006;
	
	&::before,
	&::after {
		font-size: 1.2rem;
		position: absolute;
		transform: translate3d(0, -50%, 0);
		top: 50%;
	}
	
	&::before {
		content: '\263C';
		right: 100%;
		margin-right: 10px;
		color: orange;
	}
	
	&::after {
		content: '\263E';
		left: 100%;
		margin-left: 10px;
		color: rgb(93, 107, 121);
	}
	
	span {
		position: absolute;
		bottom: calc(100% + 10px);
		left: 0;
		width: 100%;
	}
	
	span::after {
    position: absolute;
    top: calc(100% + 12px);
    left: 2px;
    width: 12px;
    height: 12px;
    content: "";
    border-radius: 50%;
    background-color: #add8e6;
    transition: transform .2s, background-color .2s;
    box-shadow: -3px 3px 8px #0006;
	}
}

// Checked label styles
.theme-switch__input:checked ~ .theme-switch__label {
		background-color: lightSlateGray;
	
	&::before {
		color: lightSlateGray;
	}
	
	&::after {
		color: turquoise;
	}
	
	span::after {
		transform: translate3d(20px, 0, 0);
	}
}

</style>
