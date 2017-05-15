loading = Vue.component 'loading',
	template: '#loading-template'

	mounted: () ->
		_this = @
		passage.clear()
		passage.pass ['loading', 'loading-background']
		passage.pass ['invisible'], [], 5000, () => _this.$emit 'finalize'
		passage.pass [], ['loading-background', 'loading'], 6000
