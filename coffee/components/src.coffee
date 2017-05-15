src = Vue.component 'src',
	template: '#src-template'
	mounted: () ->
		ghost = document.querySelectorAll('button')[1]

		passage.clear()
		passage.pass ['cinema', 'half-visible'], ['invisible'], 100, () => ghost.classList.add 'moveButton'

	methods:
		setType: (type) ->
			data.type = type

			passage.pass ['invisible'], ['half-visible'], 0, () => @$emit 'finalize'
