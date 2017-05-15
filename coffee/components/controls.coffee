controls = Vue.component 'controls',
	template: '#controls-template'
	mounted: () ->
		$('.selectpicker').selectpicker();
		document.body.classList = ''
		setTimeout () ->
			document.body.classList.add 'magic'
			document.body.classList.add 'half-visible'
		, 100
	methods:
		checkValidity: () ->
			f = document.getElementsByTagName('form')[0]
			if f.checkValidity()
				 return true
			else
			    alert("All fields are required!")
				return false

		gather: (event) ->
			event.preventDefault()

			if not @checkValidity()
				return false

			ary = @$el.querySelectorAll 'input'
			_this = @
			Array.prototype.forEach.call ary, (e) ->
				_this.inputs[e.name] = [e.value]

			select = @$el.querySelector 'select'
			window.lang = @languages[select.value]
			@lang = @languages[select.value]

			if @accept isnt 'live'
				@$emit 'finalize'
			else
				@$parent.$emit 'restart'

	data: () ->
		inputs: vocabulary
		languages: languages
		lang: lang
		aliases:
			play: "Play"
			stop: "Stop"
			louder: "Louder"
			quiter: "Quiter"
			mute: "Mute / Unmute"
			slower: "Slower"
			faster: "Faster"
	props: ['accept']
