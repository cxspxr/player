###*
	* Vue.js компонент, отвечающий за сам плеер.
	* @namespace player
###
player = Vue.component 'player',
	###*
		* HTML-шаблон компонента.
		* @type {string}
		* @memberof player
	###
	template: '#player-template'
	###*
		* Функция, которая вызывается при создании Vue.js компонента.
		* @type {function}
		* @memberof player
	###
	mounted: () ->
		passage.clear()
		passage.pass ['transition'], [], 0, () => @$emit 'start'
		passage.pass ['cloud-bg'], [], 300
	###*
		* Функция, служащая объектом свойств компонента Vue.js
		* @memberof player
		* @returns {object} Объект с данными компонента (источник видео)
	###
	data: () ->
		source: data.source
		settings: false
	###*
		* Методы компонента.
		* @memberof player
		* @namespace player.methods
	###
	methods:
		###*
			* Метод показа / скрывания живых настроек.
			* @memberof player.methods
		###
		toggleSettings: () ->
			@settings = !@settings
