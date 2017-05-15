player = Vue.component 'player',
	template: '#player-template'
	mounted: () ->
		document.body.classList.add 'transition'
		setTimeout () ->
			document.body.classList.add 'cloud-bg'
		, 300
		@$emit 'start'

	data: () ->
		source: data.source
		settings: false
	methods:
		toggleSettings: () ->
			@settings = !@settings
