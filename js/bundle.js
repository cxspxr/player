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
    source: source
  }
});
