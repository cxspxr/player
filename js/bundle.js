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
      if (validations && validations()) {
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

var data;

data = {
  type: null,
  source: null
};

var finalize;

finalize = {
  methods: {
    finalize: function() {
      return null;
    }
  }
};

var player;

player = Vue.component('player', {
  template: '#player-template',
  data: function() {
    return {
      source: data.source
    };
  },
  mixins: [finalize]
});

var upload;

upload = Vue.component('upload', {
  template: '#input-template',
  data: function() {
    return {
      type: data.type
    };
  },
  methods: {
    buildSource: function() {
      if (data.type === 'link') {
        data.source = this.$el.children[0].value;
      } else {
        data.source = URL.createObjectURL(this.$el.children[0].files[0]);
      }
      return this.$emit('finalize');
    }
  },
  mixins: [finalize]
});

var src;

src = Vue.component('src', {
  template: '#src-template',
  methods: {
    setType: function(type) {
      data.type = type;
      return this.$emit('finalize');
    }
  },
  mixins: [finalize]
});

var app;

app = new Vue({
  el: "#app",
  data: {
    chain: [src, upload, player],
    level: 0,
    currentComponent: null
  },
  components: {
    player: player,
    upload: upload,
    src: src
  },
  methods: {
    start: function() {
      return this.currentComponent = this.chain[0];
    },
    next: function() {
      this.level++;
      if (this.chain[this.level]) {
        return this.currentComponent = this.chain[this.level];
      }
    }
  }
});

app.start();

var API;

API = {
  element: function() {
    return document.querySelector('video');
  },
  play: function() {
    return API.element().play();
  },
  stop: function() {
    return API.element().pause();
  },
  louder: function() {
    if (API.element().volume + 0.1 <= 1) {
      return API.element().volume += 0.1;
    } else {
      return API.element().volume = 1;
    }
  },
  quiter: function() {
    if (API.element().volume - 0.1 >= 0) {
      return API.element().volume -= 0.1;
    } else {
      return API.element().volume = 0;
    }
  },
  toggleSound: function() {
    return API.element().muted = !API.element().muted;
  },
  slower: function() {
    if (API.element().playbackRate - 0.2 >= 0.5) {
      return API.element().playbackRate -= 0.2;
    } else {
      return API.element().playbackRate = 0.5;
    }
  },
  faster: function() {
    return API.element().playbackRate += 0.2;
  }
};

var EGHV, recognizer;

EGHV = {
  play: {
    grammar: ["игра", "ыгра", "игр", "игор"],
    handler: API.play,
    validation: function() {
      return API.element().paused;
    }
  },
  stop: {
    grammar: ["100", "сто", "что", "топ", "кто"],
    handler: API.stop,
    validation: function() {
      return !API.element().paused;
    }
  },
  louder: {
    grammar: ["громче", "гром"],
    handler: API.louder,
    validation: function() {
      return API.element().volume < 1;
    }
  },
  quiter: {
    grammar: ["тише", "пиши", "тыщ"],
    handler: API.quiter,
    validation: function() {
      return API.element().volume > 0;
    }
  },
  toggleSound: {
    grammar: ["звук"],
    handler: API.toggleSound
  },
  slower: {
    grammar: ['медленнее'],
    handler: API.slower,
    validation: function() {
      return API.element().playbackRate >= 0.6;
    }
  },
  faster: {
    grammar: ['быстрее'],
    hanlder: API.faster
  }
};

recognizer = new Recognee(EGHV);

recognizer.recognize();


