player = Vue.component 'player',
	template: '#player-template'
	mounted: () ->
		passage.clear()
		passage.pass ['transition'], [], 0, () => @$emit 'start'
		passage.pass ['cloud-bg'], [], 300

	data: () ->
		source: data.source
		settings: false
	methods:
		toggleSettings: () ->
			@settings = !@settings
