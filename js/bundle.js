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
  this.paused = function() {
    return recognition.paused;
  };
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
    _this.continuous = true;
    return recognition.addEventListener("end", function() {
      if (_this.continuous) {
        return recognition.start();
      }
    });
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
      console.log(recognized.results[0][0].transcript.toLowerCase());
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
  this.stop = (function(_this) {
    return function() {
      _this.continuous = false;
      return recognition.stop();
    };
  })(this);
  return this;
};

var Passage, passage;

Passage = function(root) {
  if (root == null) {
    root = document.body;
  }
  this.clear = function() {
    return root.classList = '';
  };
  this.pass = function(along, without, time, cb) {
    if (without == null) {
      without = [];
    }
    if (time == null) {
      time = 0;
    }
    if (time !== 0) {
      return setTimeout(function() {
        along.forEach(function(className) {
          return root.classList.add(className);
        });
        without.forEach(function(className) {
          return root.classList.remove(className);
        });
        if (cb) {
          return cb();
        }
      }, time);
    } else {
      along.forEach(function(className) {
        return root.classList.add(className);
      });
      without.forEach(function(className) {
        return root.classList.remove(className);
      });
      if (cb) {
        return cb();
      }
    }
  };
  return this;
};

passage = new Passage;

var data;

data = {
  type: null,
  source: null
};

var vocabulary;

vocabulary = {
  play: ["играть"],
  stop: ["стоп"],
  louder: ["громче"],
  quiter: ["тише"],
  mute: ["звук"],
  slower: ["медленнее"],
  faster: ["быстрее"]
};

var lang, languages;

lang = 'ru-RU';

languages = {
  "Afrikaans": 'af',
  "Basque": 'eu',
  "Bulgarian": 'bg',
  "Catalan": 'ca',
  "Arabic (Egypt)": 'ar-EG',
  "Arabic (Jordan)": 'ar-JO',
  "Arabic (Kuwait)": 'ar-KW',
  "Arabic (Lebanon)": 'ar-LB',
  "Arabic (Qatar)": 'ar-QA',
  "Arabic (UAE)": 'ar-AE',
  "Arabic (Morocco)": 'ar-MA',
  "Arabic (Iraq)": 'ar-IQ',
  "Arabic (Algeria)": 'ar-DZ',
  "Arabic (Bahrain)": 'ar-BH',
  "Arabic (Lybia)": 'ar-LY',
  "Arabic (Oman)": 'ar-OM',
  "Arabic (Saudi Arabia)": 'ar-SA',
  "Arabic (Tunisia)": 'ar-TN',
  "Arabic (Yemen)": 'ar-YE',
  "Czech": 'cs',
  "Dutch": 'nl-NL',
  "English (Australia)": 'en-AU',
  "English (Canada)": 'en-CA',
  "English (India)": 'en-IN',
  "English (New Zealand)": 'en-NZ',
  "English (South Africa)": 'en-ZA',
  "English (UK)": 'en-GB',
  "English (US)": 'en-US',
  "Finnish": 'fi',
  "French": 'fr-FR',
  "Galician": 'gl',
  "German": 'de-DE',
  "Hebrew": 'he',
  "Hungarian": 'hu',
  "Icelandic": 'is',
  "Italian": 'it-IT',
  "Indonesian": 'id',
  "Japanese": 'ja',
  "Korean": 'ko',
  "Latin": 'la',
  "Mandarin Chinese": 'zh-CN',
  "Traditional Taiwan": 'zh-TW',
  "Simplified China": 'zh-CN',
  "Simplified Hong Kong": 'zh-HK',
  "Yue Chinese (Traditional Hong Kong)": 'zh-yue',
  "Malaysian": 'ms-MY',
  "Norwegian": 'no-NO',
  "Polish": 'pl',
  "Pig Latin": 'xx-piglatin',
  "Portuguese": 'pt-PT',
  "Portuguese (Brasil)": 'pt-BR',
  "Romanian": 'ro-RO',
  "Russian": 'ru-RU',
  "Serbian": 'sr-SP',
  "Slovak": 'sk',
  "Spanish (Argentina)": 'es-AR',
  "Spanish (Bolivia)": 'es-BO',
  "Spanish (Chile)": 'es-CL',
  "Spanish (Colombia)": 'es-CO',
  "Spanish (Costa Rica)": 'es-CR',
  "Spanish (Domican Republic)": 'es-DO',
  "Spanish (Ecuador)": 'es-EC',
  "Spanish (El Salvador)": 'es-SV',
  "Spanish (Guatemala)": 'es-GT',
  "Spanish (Honduras)": 'es-HN',
  "Spanish (Mexico)": 'es-MX',
  "Spanish (Nicaragua)": 'es-NI',
  "Spanish (Panama)": 'es-PA',
  "Spanish (Paraguay)": 'es-PY',
  "Spanish (Peru)": 'es-PE',
  "Spanish (Puerto Rico)": 'es-PR',
  "Spanish (Spain)": 'es-ES',
  "Spanish (US)": ' es-US',
  "Spanish (Uruguay)": 'es-UY',
  "Spanish (Venezuela)": 'es-VE',
  "Swedish": 'sv-SE',
  "Turkish": 'tr',
  "Zulu": 'zu'
};



var welcome;

welcome = Vue.component('welcome', {
  template: '#welcome-template',
  mounted: function() {
    var _this;
    _this = this;
    passage.pass(['no-overflow', 'transition']);
    return passage.pass(['body-color'], [], 8000, function() {
      return _this.$emit('finalize');
    });
  }
});

var loading;

loading = Vue.component('loading', {
  template: '#loading-template',
  mounted: function() {
    var _this;
    _this = this;
    passage.clear();
    passage.pass(['loading', 'loading-background']);
    passage.pass(['invisible'], [], 5000, (function(_this) {
      return function() {
        return _this.$emit('finalize');
      };
    })(this));
    return passage.pass([], ['loading-background', 'loading'], 6000);
  }
});

var player;

player = Vue.component('player', {
  template: '#player-template',
  mounted: function() {
    passage.clear();
    passage.pass(['transition'], [], 0, (function(_this) {
      return function() {
        return _this.$emit('start');
      };
    })(this));
    return passage.pass(['cloud-bg'], [], 300);
  },
  data: function() {
    return {
      source: data.source,
      settings: false
    };
  },
  methods: {
    toggleSettings: function() {
      return this.settings = !this.settings;
    }
  }
});

var upload;

upload = Vue.component('upload', {
  template: '#input-template',
  mounted: function() {
    passage.clear();
    return passage.pass(['transparent'], [], 0);
  },
  data: function() {
    return {
      type: data.type
    };
  },
  methods: {
    checkExtension: function(upload, exts) {
      var fileName;
      fileName = document.getElementById(upload).value.trim();
      return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
    },
    buildSource: function() {
      var extensions, input;
      extensions = ['ogv', 'mp4', 'webm'];
      if (!this.checkExtension('upload', extensions)) {
        alert('Unsupported extension, try again. Supported extensions are: ' + extensions.join(" "));
        document.getElementById('upload').value = "";
        return false;
      }
      input = document.querySelector('input');
      if (data.type === 'link') {
        data.source = input.value.trim();
      } else {
        data.source = URL.createObjectURL(input.files[0]);
      }
      return passage.pass(['invisible'], [], 0, (function(_this) {
        return function() {
          return _this.$emit('finalize');
        };
      })(this));
    }
  }
});

var src;

src = Vue.component('src', {
  template: '#src-template',
  mounted: function() {
    var ghost;
    ghost = document.querySelectorAll('button')[1];
    passage.clear();
    return passage.pass(['cinema', 'half-visible'], ['invisible'], 100, (function(_this) {
      return function() {
        return ghost.classList.add('moveButton');
      };
    })(this));
  },
  methods: {
    setType: function(type) {
      data.type = type;
      return passage.pass(['invisible'], ['half-visible'], 0, (function(_this) {
        return function() {
          return _this.$emit('finalize');
        };
      })(this));
    }
  }
});

var controls;

controls = Vue.component('controls', {
  template: '#controls-template',
  mounted: function() {
    $('.selectpicker').selectpicker();
    console.log(this.accept);
    if (this.accept !== 'live') {
      passage.clear();
      return passage.pass(['magic', 'half-visible']);
    }
  },
  methods: {
    checkValidity: function() {
      var f;
      f = document.getElementsByTagName('form')[0];
      if (f.checkValidity()) {
        return true;
      } else {
        alert("All fields are required!");
      }
      return false;
    },
    gather: function(event) {
      var _this, ary, select;
      event.preventDefault();
      if (!this.checkValidity()) {
        return false;
      }
      ary = this.$el.querySelectorAll('input');
      _this = this;
      Array.prototype.forEach.call(ary, function(e) {
        if (e.classList.contains("control")) {
          return _this.inputs[e.name] = [e.value];
        }
      });
      select = this.$el.querySelector('select');
      window.lang = this.languages[select.value];
      this.lang = this.languages[select.value];
      if (this.accept !== 'live') {
        return this.$emit('finalize');
      } else {
        return this.$parent.$emit('restart');
      }
    }
  },
  data: function() {
    return {
      inputs: vocabulary,
      languages: languages,
      lang: lang,
      aliases: {
        play: "Play",
        stop: "Stop",
        louder: "Louder",
        quiter: "Quiter",
        mute: "Mute / Unmute",
        slower: "Slower",
        faster: "Faster"
      }
    };
  },
  props: ['accept']
});

var app;

app = new Vue({
  el: "#app",
  data: {
    chain: [welcome, src, upload, controls, loading, player],
    level: 0,
    currentComponent: null
  },
  components: {
    welcome: welcome,
    player: player,
    upload: upload,
    src: src,
    controls: controls,
    loading: loading
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
    },
    startRecognition: function() {
      recognizer.language = lang;
      return recognizer.start(vocabulary);
    },
    restartRecognition: function() {
      var _this;
      recognizer.stop();
      _this = this;
      return setTimeout(function() {
        return _this.startRecognition();
      }, 200);
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

var recognizer;

recognizer = new Recognee();

recognizer.start = function(vocabulary) {
  this.listen('play', vocabulary.play, API.play, function() {
    return API.element().paused;
  });
  this.listen('stop', vocabulary.stop, API.stop, function() {
    return !API.element().paused;
  });
  this.listen('louder', vocabulary.louder, API.louder, function() {
    return API.element().volume < 1;
  });
  this.listen('quiter', vocabulary.quiter, API.quiter, function() {
    return API.element().volume > 0;
  });
  this.listen('toggleSound', vocabulary.mute, API.toggleSound);
  this.listen('slower', vocabulary.slower, API.slower, function() {
    return API.element().playbackRate >= 0.6;
  });
  this.listen('faster', vocabulary.faster, API.faster);
  return this.recognize();
};
