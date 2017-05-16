API =
	element: () -> return document.querySelector('video')
	play: () ->
		API.element().play()
	stop: () ->
		API.element().pause()
	louder: () ->
		if API.element().volume + 0.1 <= 1 then API.element().volume+= 0.1
		else API.element().volume = 1
	quiter: () ->
		if API.element().volume - 0.1 >= 0 then API.element().volume-= 0.1
		else API.element().volume = 0
	toggleSound: () ->
		API.element().muted = !API.element().muted
	slower: () ->
		if API.element().playbackRate - 0.2 >= 0.5 then API.element().playbackRate-= 0.2
		else API.element().playbackRate = 0.5
	faster: () ->
		API.element().playbackRate+= 0.2
