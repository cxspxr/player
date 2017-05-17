###*
	* Vue.js компонент, отвечающий за выбор метода подключения видео.
	* @namespace source
###
src = Vue.component 'src',
	###*
		* HTML-шаблон компонента.
		* @type {string}
		* @memberof source
	###
	template: '#src-template'
	###*
		* Функция, которая вызывается при создании Vue.js компонента.
		* @type {function}
		* @memberof source
	###
	mounted: () ->
		ghost = document.querySelectorAll('button')[1]

		passage.clear()
		passage.pass ['cinema', 'half-visible'], ['invisible'], 100, () => ghost.classList.add 'moveButton'
	###*
		* Методы компонента.
		* @memberof source
		* @namespace source.methods
	###
	methods:
		###*
			* Метод выбора типа подключения видео.
			* @memberof source.methods
		###
		setType: (type) ->
			data.type = type

			passage.pass ['invisible'], ['half-visible'], 0, () => @$emit 'finalize'
