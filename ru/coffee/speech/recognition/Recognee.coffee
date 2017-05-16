Recognee = (language = 'ru-RU', continuous = true) ->

	# Public properties
	this.language = language
	this.continuous = continuous
	# EGHV stands for Events, Grammars, Handlers & Validations
	EGHV = {}
	recognition = null

	this.paused = () -> return recognition.paused

	# Settings
	setRecognition = () ->
		SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
		SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

		recognition = new SpeechRecognition

	setLanguage = (_this) ->
		recognition.lang = _this.language

	setGrammar = () ->
		SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
		words = []
		for event of EGHV
			EGHV[event].grammar.forEach (word) -> words.push word
		speechList = new SpeechGrammarList
		grammar = '#JSGF V1.0; grammar playercontrols; public <player> = ' + words.join(' | ') + ' ;';
		speechList.addFromString grammar
		recognition.grammars = speechList

	makeContinuous = (_this) ->
		_this.continuous = true
		recognition.addEventListener "end", () ->
			if _this.continuous
				recognition.start()

	# Internal functions

	# Common event handling
	this.listen = (event, grammar, handler,validation = undefined) ->
		EGHV[event] =
			grammar: grammar
			handler: handler
			validation: validation
	# Function for controlling recognition result and calling appropriate handlers for events
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
	handle = () ->
		recognition.addEventListener "result", (recognized) ->
			console.log recognized.results[0][0].transcript.toLowerCase()
			for event of EGHV
				control event, EGHV[event].grammar, EGHV[event].handler, recognized, EGHV[event].validation

	# Ride
	this.recognize = () ->
		setRecognition()
		setLanguage(this)
		setGrammar()
		makeContinuous(this)
		handle()

		recognition.start()

	# Stop
	this.stop = () =>
		this.continuous = false
		recognition.stop()

	return this;
