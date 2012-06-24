_.mixin(_.str.exports());  

(function() {

  Reactions = new Meteor.Collection(null);

  var previousStamp;
  Handlebars.registerHelper('stamp', function(reaction) {
    if (this.stamp !== previousStamp) {
      previousStamp = this.stamp;
      return new Handlebars.SafeString(this.stamp);
    }
  });

  Handlebars.registerHelper('showReactions', function(name, options) {
    var now = moment().format('h:mm:ss');
    var elementID = _.slugify(name);

    Reactions.insert({
      stamp: now,
      name: name,
      elementID: elementID
    });
    
    return new Handlebars.SafeString('<span id="' + elementID + '" class="dom-reaction-marker">' + options.fn(this) + '</span>');
  });
  
  Meteor.startup(function() {
    Template.reactionConsole.reactions = function() {
      return Reactions.find();
    };

    Template.reaction.events = {
      // TODO find out why we couldn't use Meteor's mouseenter/mouseleave
      'mouseover .reaction-field': function(e) {
        var $target = $(e.target);
        $target.toggleClass('active');

        var sourceID = $target.data('source');
        var $source = $('#' + sourceID);

        var previousBackgroundColor = $source.parent().css('backgroundColor');
        $target.data('previousBackgroundColor', previousBackgroundColor);
        $source.parent().css({
          backgroundColor: 'lightBlue'
        });
      },
      'mouseout .reaction-field': function(e) {
        var $target = $(e.target);
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
