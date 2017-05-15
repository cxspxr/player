loading = Vue.component 'loading',
	template: '#loading-template'

	mounted: () ->
		_this = @
		document.body.classList = ''
		document.body.classList.add 'invisible'
		document.body.classList.remove 'transition'
		setTimeout () ->
            document.body.classList.add 'loading'
            document.body.classList.add 'loading-background'
            document.body.classList.remove 'invisible'
		, 400
		setTimeout () ->
             document.body.classList.add 'invisible'
             _this.$emit 'finalize'
		, 5000
		document.body.classList.remove 'loading-background'
		document.body.classList.remove 'loading'
