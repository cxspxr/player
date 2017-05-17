# UI steps transition module
###*
	* Наш собственный модуль обработки динамических переходов в UI приложения.
	* @param {object} root - Элемент-родитель, обслуживающий переходы.
	* @class Passage
###
Passage = (root = document.body) ->
	###*
		* Функция для очистки всех эффектов с корневого элемента.
		* @memberof Passage
	###
	this.clear = () -> root.classList = ''
	###*
		* Функция для осуществления перехода в UI.
		* @param {mixed} along - Массив CSS классов, которые следует добавить корневому элементу.
		* @param {mixed} without - Массив CSS классов, которые следует убрать из корневого элемента.
		* @param {integer} time - Время, через которое необходимо это сделать.
		* @param {mixed} cb - Функция-коллбек
		* @memberof Passage
	###
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

###*
	* Глобальный объект модуля переходов в UI.
	* @type {object}
###
passage = new Passage
