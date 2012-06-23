_.mixin(_.str.exports());  

(function() {

  Reactions = new Meteor.Collection(null);

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
    var elementID = _.slugify(name);

    Reactions.insert({
      stamp: now,
      name: name,
      elementID: elementID
    });
    
    return new Handlebars.SafeString('<span id="' + elementID + '">' + options.fn(this) + '</span>');
    
    // return new Handlebars.SafeString('<span id="' + elementID + '"><div class="reaction-stamp" style="background-color:' + nextColor() + '">' + name + ': ' + now + '</div>' + options.fn(this) + '</span>');
  });
  
  Meteor.startup(function() {
    Template.reactionConsole.reactions = function() {
      // TODO what? use limit on mongo query
      var reactions = Reactions.find({}).fetch();
      return _.last(reactions, 20);
    };

    Template.reaction.events = {
      // TODO find out why we couldn't use Meteor's mouseenter/mouseleave
      'mouseover': function(e) {
        e.stopPropagation();
        var sourceID = $(e.currentTarget).data('source');
        var $source = $('#' + sourceID);
        var previousBackgroundColor = $source.parent().css('backgroundColor');
        $(e.currentTarget).data('previousBackgroundColor', previousBackgroundColor);
        $source.parent().css({
          backgroundColor: 'lightBlue'
        });
      },
      'mouseleave': function(e) {
        e.stopPropagation();
        var sourceID = $(e.currentTarget).data('source');
        var $source = $('#' + sourceID);
        var previousBackgroundColor = $(e.currentTarget).data('previousBackgroundColor');
        if (previousBackgroundColor) {
          $source.parent().css({
            backgroundColor: previousBackgroundColor
          });
        }
      }
    };

    $('body').append(
      Meteor.ui.render(function() {
        return Template.reactionConsole()
      })
    );
  });
  
})();
