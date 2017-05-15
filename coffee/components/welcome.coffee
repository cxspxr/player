welcome = Vue.component 'welcome',
	template: '#welcome-template'
	mounted: () ->
		_this = @
		document.body.classList.add 'no-overflow'
		document.body.classList.add 'transition'
		setTimeout () ->
			_this.$emit 'finalize'
			document.body.classList.add 'body-color'
		, 100
