###*
	* Vue.js компонент, отвечающий за загрузку перед показом плеера.
	* @namespace loading
###
loading = Vue.component 'loading',
	###*
		* HTML-шаблон компонента.
		* @type {string}
		* @memberof loading
	###
	template: '#loading-template'
	###*
		* Функция, которая вызывается при создании Vue.js компонента.
		* @type {function}
		* @memberof loading
	###
	mounted: () ->
		_this = @
		passage.clear()
		passage.pass ['loading', 'loading-background']
		passage.pass ['invisible'], [], 5000, () => _this.$emit 'finalize'
		passage.pass [], ['loading-background', 'loading'], 6000
