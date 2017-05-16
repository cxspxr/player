app = new Vue
	el: "#app"
	data:
		chain: [welcome, src, upload,  controls, loading, player]
		level: 0
		currentComponent: null
	components: {welcome, player, upload, src, controls, loading}
	methods:
		start: () ->
			@currentComponent = @chain[0]
		next: () ->
			@level++
			@currentComponent = @chain[@level] if @chain[@level]
		startRecognition: () ->
			recognizer.language = lang
			recognizer.start vocabulary
		restartRecognition: () ->
			recognizer.stop()
			_this = @
			setTimeout () ->
				_this.startRecognition()
			, 200

app.start()
