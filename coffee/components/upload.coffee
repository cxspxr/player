upload = Vue.component 'upload',
	template: '#input-template'
	mounted: () ->
		passage.clear()
		passage.pass ['transparent'], [], 0
	data: () ->
		type: data.type
	methods:
		checkExtension: (upload, exts) ->
			fileName = document.getElementById(upload).value
			return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName)

		buildSource: () ->
			extensions = ['ogv', 'mp4', 'webm']

			if not @checkExtension('upload', extensions)
				alert 'Unsupported extension, try again. Supported extensions are: ' + extensions.join " "
				document.getElementById('upload').value = ""
				return false

			input = document.querySelector 'input'
			if data.type is 'link'
				data.source = input.value
			else
				data.source = URL.createObjectURL input.files[0]

			passage.pass ['invisible'], [], 0, () => @$emit 'finalize'
