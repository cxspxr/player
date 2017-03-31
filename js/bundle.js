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
    })(this),
    louder: (function(_this) {
      return function() {
        app.updatePlayer();
        if (app.player.volume + 0.1 <= 1) {
          return app.player.volume += .1;
        } else {
          return app.player.volume = 1;
        }
      };
    })(this),
    quiter: (function(_this) {
      return function() {
        app.updatePlayer();
        if (app.player.volume - 0.1 >= 0) {
          return app.player.volume -= .1;
        } else {
          return app.player.volume = 0;
        }
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
    })(this),
    volume: (function(_this) {
      return function(v) {};
    })(this)
  }
});

var grammar, vocabulary, words;

words = ["игр", "игор", "играть", "стоп", "что", "сто", "100", "игра", "кто", "стол", "играя", "играет", "играл", "поиграть", "чтобы", "чтоб", "топ", "ыграть", "громче", "гром", "пиши", "тише", "тыщ"];

grammar = '#JSGF V1.0; grammar playercontrols; public <player> = ' + words.join(' | ') + ' ;';

vocabulary = {
  'play': ["игра", "ыгра", "игр", "игор"],
  'stop': ["100", "сто", "что", "топ", "кто"],
  'louder': ["громче", "гром"],
  'quiter': ["тише", "пиши", "тыщ"]
};

var SpeechGrammarList, SpeechRecognition, SpeechRecognitionEvent, recognition, speechList;

SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;

SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

recognition = new SpeechRecognition;

speechList = new SpeechGrammarList;

speechList.addFromString(grammar);

recognition.grammars = speechList;

recognition.lang = 'ru-RU';


/*
recognition.addEventListener "speechend", () => recognition.stop()
 */

recognition.addEventListener("end", (function(_this) {
  return function() {
    return recognition.start();
  };
})(this));

recognition.addEventListener("result", (function(_this) {
  return function(event) {
    var result;
    result = event.results[0][0].transcript.toLowerCase();
    console.log(result);
    if (!app.play) {
      vocabulary.play.forEach(function(word) {
        if (result.indexOf(word) !== -1) {
          return app.play = true;
        }
      });
    } else {
      vocabulary.stop.forEach(function(word) {
        if (result.indexOf(word) !== -1) {
          return app.play = false;
        }
      });
    }
    if (app.player.volume < 1) {
      vocabulary.louder.forEach(function(word) {
        if (result.indexOf(word) !== -1) {
          return app.louder();
        }
      });
    }
    if (app.player.volume > 0) {
      return vocabulary.quiter.forEach(function(word) {
        if (result.indexOf(word) !== -1) {
          return app.quiter();
        }
      });
    }

    /* 
    		if app.volume != 0
    		
    		else
     */
  };
})(this));

recognition.start();
