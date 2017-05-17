###*
	* Vue.js компонент, отвечающий за приветственную анимацию.
	* @namespace welcome
###
welcome = Vue.component 'welcome',
	###*
		* HTML-шаблон компонента.
		* @type {string}
		* @memberof welcome
	###
	template: '#welcome-template'
	###*
		* Функция, которая вызывается при создании Vue.js компонента.
		* @type {function}
		* @memberof welcome
	###
	mounted: () ->
		_this = @
		passage.pass ['no-overflow', 'transition']
		passage.pass ['body-color'], [], 8000, () -> _this.$emit 'finalize'
