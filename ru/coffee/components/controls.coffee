# Controls component
controls = Vue.component 'controls',
	template: '#controls-template'
	mounted: () ->
		$('.selectpicker').selectpicker();
		console.log @accept
		if @accept isnt 'live'
			passage.clear()
			passage.pass ['magic', 'half-visible']
	methods:
		checkValidity: () ->
			f = document.getElementsByTagName('form')[0]
			if f.checkValidity()
				 return true
			else
			    alert("Все поля обязательны к заполнению!")
				return false

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
	props: ['accept']
