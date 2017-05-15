# UI steps transition module
Passage = (root = document.body) ->

	this.clear = () -> root.classList = ''

	this.pass = (along, without = [], time = 0, cb) ->
		if time isnt 0
			setTimeout () ->
				along.forEach (className) -> root.classList.add className
				without.forEach (className) -> root.classList.remove className
				if cb
					cb()
			, time
		else
			along.forEach (className) -> root.classList.add className
			without.forEach (className) -> root.classList.remove className
			if cb
				cb()

	return this;


passage = new Passage
