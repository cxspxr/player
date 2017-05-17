###*
	* Vue.js инстанс. Точка входа во Vue.js программу, точка сбора всех компонентов.
	* @namespace app
###
app = new Vue
	###*
		* HTML элемент, к которому прикреплён инстанс.
		* @type {string}
		* @memberof app
	###
	el: "#app"
	###*
		* Объект с данными Vue.js инстанса.
		* @property {mixed} chain - Цепь-последовательность подгрузки компонент Vue.js.
		* @property {integer} level - Текущий шаг приложения.
		* @property {object} currentComponent - Текущий динамический компонент Vue.js.
		* @memberof app
	###
	data:
		chain: [welcome, src, upload,  controls, loading, player]
		level: 0
		currentComponent: null
	###*
		* Объект с регистрацией компонентов Vue.js.
		* @type {object}
		* @memberof app
	###
	components: {welcome, player, upload, src, controls, loading}
	###*
		* Методы Vue.js инстанса.
		* @namespace app.methods
		* @memberof app
	###
	methods:
		###*
			* Функция старта динамической подгрузки Vue.js компонентов, указанных в chain.
			* @memberof app.methods
		###
		start: () ->
			@currentComponent = @chain[0]
		###*
			* Функция переключения динамического компонента Vue.js на следующий в chain.
			* @memberof app.methods
		###
		next: () ->
			@level++
			@currentComponent = @chain[@level] if @chain[@level]
		###*
			* Функция начала распознавания речи, используемая наш модуль Recognee.
			* @memberof app.methods
		###
		startRecognition: () ->
			recognizer.language = lang
			recognizer.start vocabulary
		###*
			* Функция перезапуска распознавания речи для обновления настроек команд или языка.
			* @memberof app.methods
		###
		restartRecognition: () ->
			recognizer.stop()
			_this = @
			setTimeout () ->
				_this.startRecognition()
			, 200

app.start()
