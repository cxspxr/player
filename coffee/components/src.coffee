src = Vue.component 'src',
	template: '#src-template'
	mounted: () ->
		ghost = document.querySelectorAll('button')[1]
		document.body.classList = ''
		setTimeout () ->
			ghost.classList.add 'moveButton'
			document.body.classList.add 'cinema'
			document.body.classList.remove 'invisible'
			document.body.classList.add 'half-visible'
		, 100
	methods:
		setType: (type) ->
			data.type = type
			@$emit 'finalize'
			document.body.classList.remove 'half-visible'
			document.body.classList.add 'invisible'
