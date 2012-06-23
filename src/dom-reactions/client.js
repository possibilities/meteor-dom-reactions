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

  var previousStamp;
  Handlebars.registerHelper('stampIfUnique', function(reaction) {
    console.log(this, reaction);
    var space = '&nbsp;';
    var stamp = (this.stamp !== previousStamp) ? this.stamp : space;
    if (stamp !== space)
      previousStamp = stamp;
    return new Handlebars.SafeString(stamp);
  });

  Handlebars.registerHelper('showReactions', function(name, options) {
    var now = moment().format('h:mm:ss');
    var elementID = _.slugify(name);

    Reactions.insert({
      stamp: now,
      name: name,
      elementID: elementID
    });
    
    return new Handlebars.SafeString('<span id="' + elementID + '">' + options.fn(this) + '</span>');
  });
  
  Meteor.startup(function() {
    Template.reactionConsole.reactions = function() {
      return Reactions.find();
    };

    Template.reaction.events = {
      // TODO find out why we couldn't use Meteor's mouseenter/mouseleave
      'mouseover .reaction': function(e) {
        var $target = $(e.currentTarget);
        $target.toggleClass('active');

        var sourceID = $target.data('source');
        var $source = $('#' + sourceID);

        var previousBackgroundColor = $source.parent().css('backgroundColor');
        $target.data('previousBackgroundColor', previousBackgroundColor);
        $source.parent().css({
          backgroundColor: 'lightBlue'
        });
      },
      'mouseout .reaction': function(e) {
        var $target = $(e.currentTarget);
        $target.toggleClass('active');

        var sourceID = $target.data('source');
        var $source = $('#' + sourceID);

        var previousBackgroundColor = $target.data('previousBackgroundColor');
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
