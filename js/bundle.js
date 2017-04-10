var source;

source = {
  data: null
};

Vue.component('upload', {
  template: '#input-template',
  methods: {
    buildOuterSource: function() {
      return source.data = this.$el.value;
    }
  }

  /*
  		buildSource: () ->	
  			source.data = URL.createObjectURL this.$el.files[0]
   */
});



var app;

app = new Vue({
  el: "#app",
  data: {
    source: source,
    play: false
  },
  methods: {
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
  },
  watch: {
    play: function(v) {
      if (v) {
        return this.player.play();
      } else {
        return this.player.pause();
      }
    }
  }
});

var grammar, vocabulary, words;

words = ["игр", "игор", "играть", "стоп", "что", "сто", "100", "игра", "кто", "стол", "играя", "играет", "играл", "поиграть", "чтобы", "чтоб", "топ", "ыграть", "громче", "гром", "пиши", "тише", "тыщ"];

grammar = '#JSGF V1.0; grammar playercontrols; public <player> = ' + words.join(' | ') + ' ;';

vocabulary = {
  'play': ["игра", "ыгра", "игр", "игор"],
  'stop': ["100", "сто", "что", "топ", "кто"],
  'louder': ["громче", "гром"],
  'quiter': ["тише", "пиши", "тыщ"],
  'toggleSound': ["звук"],
  'slower': ['медленнее'],
  'faster': ['быстрее']
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
      vocabulary.quiter.forEach(function(word) {
        if (result.indexOf(word) !== -1) {
          return app.quiter();
        }
      });
    }
    vocabulary.toggleSound.forEach(function(word) {
      if (result.indexOf(word) !== -1) {
        return app.toggleSound();
      }
    });
    if (!(app.player.playbackRate <= 0.5)) {
      vocabulary.slower.forEach(function(word) {
        if (result.indexOf(word) !== -1) {
          return app.slower();
        }
      });
    }
    return vocabulary.faster.forEach(function(word) {
      if (result.indexOf(word) !== -1) {
        return app.faster();
      }
    });

    /* 
    		if app.volume != 0
    		
    		else
     */
  };
})(this));

recognition.start();
