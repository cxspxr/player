var source;

source = {
  data: null
};

Vue.component('upload', {
  template: '#input-template',
  methods: {
    buildSource: function() {
      return source.data = URL.createObjectURL(this.$el.files[0]);
    }
  }
});



var app;

app = new Vue({
  el: "#app",
  data: {
    source: source,
    play: false,
    player: document.querySelector('video')
  },
  methods: {
    updatePlayer: (function(_this) {
      return function() {
        return app.player = document.querySelector('video');
      };
    })(this)
  },
  watch: {
    play: (function(_this) {
      return function(v) {
        app.updatePlayer();
        if (v) {
          return app.player.play();
        } else {
          return app.player.pause();
        }
      };
    })(this)
  }
});

var grammar, words;

words = ["Играть", "Стоп"];

grammar = '#JSGF V1.0; grammar playercontrols; public <player> = ' + words.join(' | ') + ' ;';

var SpeechGrammarList, SpeechRecognition, SpeechRecognitionEvent, recognition, speechList;

SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;

SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

recognition = new SpeechRecognition;

speechList = new SpeechGrammarList;

speechList.addFromString(grammar);

recognition.grammars = speechList;

recognition.lang = 'ru-RU';

recognition.addEventListener("speechend", (function(_this) {
  return function() {
    return recognition.stop();
  };
})(this));

recognition.addEventListener("end", (function(_this) {
  return function() {
    return recognition.start();
  };
})(this));

recognition.addEventListener("result", (function(_this) {
  return function(event) {
    return words.forEach(function(word) {
      word = word.toLowerCase();
      if (event.results[0][0].transcript.match(word)) {
        if (word === "играть") {
          return app.play = true;
        } else if (word === "стоп") {
          return app.play = false;
        }
      }
    });
  };
})(this));

recognition.start();
