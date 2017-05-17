###*
	* Наш собственный модуль обработки распознавания речи.
	* @class Recognee
###
Recognee = (language = 'ru-RU', continuous = true) ->
	# Public properties

	###*
		* Свойство, определяющее язык распознавания.
		* @memberof Recognee
		* @type {string}
	###
	this.language = language
	###*
		* Свойство, определяющее непрерывность распознавания.
		* @memberof Recognee
		* @type {bool}
	###
	this.continuous = continuous
	# EGHV stands for Events, Grammars, Handlers & Validations
	###*
		* Приватный объект для хранения событий, грамматики, функий-коллбеков и валидаций.
		* @memberof Recognee
		* @type {object}
	###
	EGHV = {}
	###*
		* Приватный объект распознавания речи Web Speech API.
		* @memberof Recognee
		* @type {object}
	###
	recognition = null
	###*
		* Вспомагательная функция для определения состояния плеера.
		* @memberof Recognee
		* @returns {bool} Играет ли плеер.
	###
	this.paused = () -> return recognition.paused

	# Settings
	###*
		* Приватная функция для задания объекта распознавания речи в зависимости от браузера и движка.
		* @memberof Recognee
	###
	setRecognition = () ->
		SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
		SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

		recognition = new SpeechRecognition
	###*
		* Приватная функция для задания языка распознавания речи объекту распознавания.
		* @memberof Recognee
	###
	setLanguage = (_this) ->
		recognition.lang = _this.language
	###*
		* Приватная функция для задания грамматического словаря для объекта распознавания.
		* @memberof Recognee
	###
	setGrammar = () ->
		SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
		words = []
		for event of EGHV
			EGHV[event].grammar.forEach (word) -> words.push word
		speechList = new SpeechGrammarList
		grammar = '#JSGF V1.0; grammar playercontrols; public <player> = ' + words.join(' | ') + ' ;';
		speechList.addFromString grammar
		recognition.grammars = speechList
	###*
		* Приватная функция для иммитации непрерывности распознавания.
		* @memberof Recognee
	###
	makeContinuous = (_this) ->
		_this.continuous = true
		recognition.addEventListener "end", () ->
			if _this.continuous
				recognition.start()

	# Internal functions

	# Common event handling
	###*
		* Публичная функция для взаимодействия с модулем снаружи.
		* Служит для обеспчения возможности прицепления любых функций с любыми валидациями
		* на любые распознанные слова.
		* @param {string} event - Имя события.
		* @param {mixed} grammar - Массив с грамматикой.
		* @param {mixed} handler - Функция-обработчик события.
		* @param {mixed} validation - Функция-валидация в обработчике.
		* @memberof Recognee
	###
	this.listen = (event, grammar, handler,validation = undefined) ->
		EGHV[event] =
			grammar: grammar
			handler: handler
			validation: validation
	# Function for controlling recognition result and calling appropriate handlers for events
	###*
		* Приватная функция для обработки публичного прицепления события на распознавание.
		* @param {string} event - Имя события.
		* @param {mixed} grammar - Массив с грамматикой.
		* @param {mixed} handler - Функция-обработчик события.
		* @param {mixed} validations - Функция-валидация в обработчике.
		* @param {object} recognized - Объект с распознанными словами.
		* @memberof Recognee
	###
	control = (event, grammar, handler, recognized, validations = undefined) ->
		result = recognized.results[0][0].transcript.toLowerCase()

		unless validations
			grammar.forEach (word) ->
				if result.indexOf(word) != -1 then handler()
		else
			if(validations && validations())
				grammar.forEach (word) ->
					if result.indexOf(word) != -1 then handler()

	# Common on-result handler with the use of CONTROL function
	###*
		* Приватная функция для прицепления обработчика распознавания на событие распознавание речи.
		* @memberof Recognee
	###
	handle = () ->
		recognition.addEventListener "result", (recognized) ->
			console.log recognized.results[0][0].transcript.toLowerCase()
			for event of EGHV
				control event, EGHV[event].grammar, EGHV[event].handler, recognized, EGHV[event].validation

	# Ride
	###*
		* Публичная функция старта распознавания речи.
		* @memberof Recognee
	###
	this.recognize = () ->
		setRecognition()
		setLanguage(this)
		setGrammar()
		makeContinuous(this)
		handle()

		recognition.start()

	###*
		* Публичная функция остановки распознавания речи.
		* @memberof Recognee
	###
	# Stop
	this.stop = () =>
		this.continuous = false
		recognition.stop()

	return this;
