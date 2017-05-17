###*
	* Vue.js компонент, отвечающий за настройку слов-команд и языка распознавания речи.
	* @namespace controls
###
controls = Vue.component 'controls',
	###*
		* HTML шаблон компонента.
		* @type {string}
		* @memberof controls
	###
	template: '#controls-template'
	###*
		* Функция, которая вызывается при создании Vue.js компонента.
		* @type {function}
		* @memberof controls
	###
	mounted: () ->
		$('.selectpicker').selectpicker();
		if @accept isnt 'live'
			passage.clear()
			passage.pass ['magic', 'half-visible']
	###*
		* Методы компонента.
		* @memberof controls
		* @namespace controls.methods
	###
	methods:
		###*
			* Проверка на пустоту формы со словами.
			* @memberof controls.methods
		###
		checkValidity: () ->
			f = document.getElementsByTagName('form')[0]
			if f.checkValidity()
				 return true
			else
			    alert("Все поля обязательны к заполнению!")
				return false

		###*
			* Функция сбора информации со всех полей формы.
			* @memberof controls.methods
			* @param {object} event - Обработчик события клика.
		###
		gather: (event) ->
			event.preventDefault()

			if not @checkValidity()
				return false

			ary = @$el.querySelectorAll 'input'
			_this = @
			Array.prototype.forEach.call ary, (e) ->
				if e.classList.contains "control"
					_this.inputs[e.name] = [e.value]


			select = @$el.querySelector 'select'
			window.lang = @languages[select.value]
			@lang = @languages[select.value]

			if @accept isnt 'live'
				@$emit 'finalize'
			else
				@$parent.$emit 'restart'
	###*
		* Функция, служащая объектом свойств компонента Vue.js
		* @memberof controls
		* @returns {object} Объект с данными компонента (словарь, языки и т.д.)
	###
	data: () ->
		inputs: vocabulary
		languages: languages
		lang: lang
		aliases:
			play: "Играть"
			stop: "Стоп"
			louder: "Громче"
			quiter: "Тише"
			mute: "Убрать / Вернуть звук"
			slower: "Медленнее"
			faster: "Быстрее"
	###*
		* Массив переданных свойств в сам компонент.
		* @memberof controls
		* @type {mixed}
	###
	props: ['accept']
