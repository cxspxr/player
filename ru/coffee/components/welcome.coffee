welcome = Vue.component 'welcome',
	template: '#welcome-template'
	mounted: () ->
		_this = @
		passage.pass ['no-overflow', 'transition']
		passage.pass ['body-color'], [], 8000, () -> _this.$emit 'finalize'
