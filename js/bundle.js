var words;

words = ["игр", "игор", "играть", "стоп", "что", "сто", "100", "игра", "кто", "стол", "играя", "играет", "играл", "поиграть", "чтобы", "чтоб", "топ", "ыграть", "громче", "гром", "пиши", "тише", "тыщ"];

var Recognee;

Recognee = function(EGHV, language, continuous) {
  var handle, listen, makeContinuous, recognition, setGrammar, setLanguage, setRecognition;
  if (language == null) {
    language = 'ru-RU';
  }
  if (continuous == null) {
    continuous = true;
  }
  this.language = language;
  this.continuous = continuous;
  recognition = null;
  setRecognition = function() {
    var SpeechRecognition, SpeechRecognitionEvent;
    SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
    return recognition = new SpeechRecognition;
  };
  setLanguage = function(_this) {
    return recognition.lang = _this.language;
  };
  setGrammar = function() {
    var SpeechGrammarList, event, grammar, speechList, words;
    SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
    words = [];
    for (event in EGHV) {
      EGHV[event].grammar.forEach(function(word) {
        return words.push(word);
      });
    }
    speechList = new SpeechGrammarList;
    grammar = '#JSGF V1.0; grammar playercontrols; public <player> = ' + words.join(' | ') + ' ;';
    speechList.addFromString(grammar);
    return recognition.grammars = speechList;
  };
  makeContinuous = function(_this) {
    if (_this.continuous) {
      return recognition.addEventListener("end", function() {
        return recognition.start();
      });
    }
  };
  handle = function(event, vocabulary, handler, recognized, validations) {
    var result;
    if (validations == null) {
      validations = void 0;
    }
    result = recognized.results[0][0].transcript.toLowerCase();
    if (!validations) {
      return vocabulary.forEach(function(word) {
        if (result.indexOf(word) !== -1) {
          return handler();
        }
      });
    } else {
      if (eval(validations)) {
        return vocabulary.forEach(function(word) {
          if (result.indexOf(word) !== -1) {
            return handler();
          }
        });
      }
    }
  };
  listen = function() {
    return recognition.addEventListener("result", function(recognized) {
      var event, result, results;
      result = recognized.results[0][0].transcript.toLowerCase();
      console.log(result);
      results = [];
      for (event in EGHV) {
        results.push(handle(event, EGHV[event].grammar, EGHV[event].handler, recognized, EGHV[event].validation));
      }
      return results;
    });
  };
  this.recognize = function() {
    setRecognition();
    setLanguage(this);
    setGrammar();
    makeContinuous(this);
    listen(this);
    return recognition.start();
  };
  return this;
};

var source;

source = {
  data: null
};

var upload;

upload = Vue.component('upload', {
  template: '#input-template',
  methods: {
    buildOuterSource: function() {
      return source.data = this.$el.children[1].value;
    },
    buildSource: function() {
      return source.data = URL.createObjectURL(this.$el.children[0].files[0]);
    }
  }
});

var app;

app = new Vue({
  el: "#app",
  data: {
    source: source
  },
  components: {
    upload: upload
  },
  methods: {
    play: function() {
      return this.player.play();
    },
    stop: function() {
      return this.player.pause();
    },
    louder: function() {
      if (this.player.volume + 0.1 <= 1) {
        return this.player.volume += 0.1;
      } else {
        return this.player.volume = 1;
      }
    },
    quiter: function() {
      if (this.player.volume - 0.1 >= 0) {
        return this.player.volume -= 0.1;
      } else {
        return this.player.volume = 0;
      }
    },
    toggleSound: function() {
      return this.player.muted = !this.player.muted;
    },
    slower: function() {
      if (this.player.playbackRate - 0.2 >= 0.5) {
        return this.player.playbackRate -= 0.2;
      } else {
        return this.player.playbackRate = 0.5;
      }
    },
    faster: function() {
      return this.player.playbackRate += 0.2;
    }
  },
  computed: {
    player: function() {
      return document.querySelector('video');
    }
  }
});

var EGHV, recognizer;

EGHV = {
  play: {
    grammar: ["игра", "ыгра", "игр", "игор"],
    handler: app.play,
    validation: "app.player.paused"
  },
  stop: {
    grammar: ["100", "сто", "что", "топ", "кто"],
    handler: app.stop,
    validation: "!app.player.paused"
  },
  louder: {
    grammar: ["громче", "гром"],
    handler: app.louder,
    validation: "app.player.volume < 1"
  },
  quiter: {
    grammar: ["тише", "пиши", "тыщ"],
    handler: app.quiter,
    validation: "app.player.volume > 0"
  },
  toggleSound: {
    grammar: ["звук"],
    handler: app.toggleSound
  },
  slower: {
    grammar: ['медленнее'],
    handler: app.slower,
    validation: "app.player.playbackRate >= 0.6"
  },
  faster: {
    grammar: ['быстрее'],
    hanlder: app.faster
  }
};

recognizer = new Recognee(EGHV);

recognizer.recognize();


