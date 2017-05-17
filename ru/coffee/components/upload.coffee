###*
	* Vue.js компонент, отвечающий за загрузку видео.
	* @namespace upload
###
upload = Vue.component 'upload',
	###*
		* HTML-шаблон компонента.
		* @type {string}
		* @memberof upload
	###
	template: '#input-template'
	###*
		* Функция, которая вызывается при создании Vue.js компонента.
		* @type {function}
		* @memberof upload
	###
	mounted: () ->
		passage.clear()
		passage.pass ['transparent'], [], 0
	###*
		* Функция, служащая объектом свойств компонента Vue.js
		* @memberof upload
		* @returns {object} Объект с данными компонента (вид подключения видео).
	###
	data: () ->
		type: data.type
	###*
		* Методы компонента.
		* @memberof upload
		* @namespace upload.methods
	###
	methods:
		###*
			* Метод, проверяющий совпадение расширения файла.
			* @memberof upload.methods
			* @returns {bool} Совпало ли расширение файла.
		###
		checkExtension: (upload, exts) ->
			fileName = document.getElementById(upload).value.trim()
			return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName)
		###*
			* Метод, составляющий объектный единый указатель ресурса.
			* @memberof upload.methods 
		###
		buildSource: () ->
			extensions = ['ogv', 'mp4', 'webm']

			if not @checkExtension('upload', extensions)
				alert 'Неподдерживаемое расширение файла. Поддерживаемые расширения: ' + extensions.join " "
				document.getElementById('upload').value = ""
				return false

			input = document.querySelector 'input'
			if data.type is 'link'
				data.source = input.value.trim()
			else
				data.source = URL.createObjectURL input.files[0]

			passage.pass ['invisible'], [], 0, () => @$emit 'finalize'
