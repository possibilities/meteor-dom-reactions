if (Meteor.is_client) {

  Session.set('user_1_karma', 1);
  Session.set('user_2_karma', 2);
  
  Template.karma.user_1_karma = function() {
    return Session.get('user_1_karma');
  };
  Template.karma.user_2_karma = function() {
    return Session.get('user_2_karma');
  };

  var moreKarma = function(index) {
    var name = 'user_' + index + '_karma';
    var val = Session.get(name);
    Session.set(name, (val + index));
  };

  Template.karma.events = {
    'click .user_1_button': function() {
      moreKarma(1);
    },
    'click .user_2_button.btn': function() {
      moreKarma(2);
    }
  };
}
