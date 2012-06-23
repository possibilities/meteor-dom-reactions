(function() {

  var colorIndex = 0;
  var colors = [
    'green',
    'red',
    'blue',
    'orange',
    'purple',
    'fuchsia',
    'indigo',
    'gray'
  ];

  var nextColor = function() {
    if (colorIndex >= colors.length)
      colorIndex = 0;
    var color = colors[colorIndex];
    colorIndex++;
    return color;
  };

  Handlebars.registerHelper('showReactions', function(name, options) {
    var now = moment().format('h:mm:ss');
    return new Handlebars.SafeString('<span><div class="reaction-stamp" style="background-color:' + nextColor() + '">' + name + ': ' + now + '</div>' + options.fn(this) + '</span>');
  });
  
})();
