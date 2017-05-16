recognizer = new Recognee()

# Listening events
recognizer.start = (vocabulary) ->
    this.listen 'play', vocabulary.play, API.play, -> API.element().paused
    this.listen 'stop', vocabulary.stop, API.stop, -> !API.element().paused
    this.listen 'louder', vocabulary.louder, API.louder, -> API.element().volume < 1
    this.listen 'quiter', vocabulary.quiter, API.quiter, -> API.element().volume > 0
    this.listen 'toggleSound', vocabulary.mute, API.toggleSound
    this.listen 'slower', vocabulary.slower, API.slower, -> API.element().playbackRate >= 0.6
    this.listen 'faster', vocabulary.faster, API.faster
    this.recognize()
