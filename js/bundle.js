var Recognee;

Recognee = function(language, continuous) {
  var EGHV, control, handle, makeContinuous, recognition, setGrammar, setLanguage, setRecognition;
  if (language == null) {
    language = 'ru-RU';
  }
  if (continuous == null) {
    continuous = true;
  }
  this.language = language;
  this.continuous = continuous;
  EGHV = {};
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
  this.listen = function(event, grammar, handler, validation) {
    if (validation == null) {
      validation = void 0;
    }
    return EGHV[event] = {
      grammar: grammar,
      handler: handler,
      validation: validation
    };
  };
  control = function(event, grammar, handler, recognized, validations) {
    var result;
    if (validations == null) {
      validations = void 0;
    }
    result = recognized.results[0][0].transcript.toLowerCase();
    console.log(result);
    if (!validations) {
      return grammar.forEach(function(word) {
        if (result.indexOf(word) !== -1) {
          return handler();
        }
      });
    } else {
      if (validations && validations()) {
        return grammar.forEach(function(word) {
          if (result.indexOf(word) !== -1) {
            return handler();
          }
        });
      }
    }
  };
  handle = function() {
    return recognition.addEventListener("result", function(recognized) {
      var event, results;
      results = [];
      for (event in EGHV) {
        results.push(control(event, EGHV[event].grammar, EGHV[event].handler, recognized, EGHV[event].validation));
      }
      return results;
    });
  };
  this.recognize = function() {
    setRecognition();
    setLanguage(this);
    setGrammar();
    makeContinuous(this);
    handle();
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
    API.element().play();
    return console.log("play called");
  },
  stop: function() {
    API.element().pause();
    return console.log("stop called");
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

var recognizer;

recognizer = new Recognee();

recognizer.listen('play', ["игра", "ыгра", "игр", "игор"], API.play, function() {
  return API.element().paused;
});

recognizer.listen('stop', ["100", "сто", "что", "топ", "кто"], API.stop, function() {
  return !API.element().paused;
});

recognizer.listen('louder', ["громче", "гром"], function() {
  return API.element().volume < 1;
});

recognizer.listen('quiter', ["тише", "пиши", "тыщ"], API.quiter, function() {
  return API.element().volume > 0;
});

recognizer.listen('toggleSound', ["звук"], API.toggleSound);

recognizer.listen('slower', ["медленнее"], API.slower, function() {
  return API.element().playbackRate >= 0.6;
});

recognizer.listen('faster', ["быстрее"], API.faster);

recognizer.recognize();


