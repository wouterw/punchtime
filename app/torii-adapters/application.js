import Ember from 'ember';
import Trello from 'punchtime/services/trello';

var trello = Trello.create();

export default Ember.Object.extend({
  open: function(serviceAuth) {
    localStorage.setItem('punchtime:access-token', JSON.stringify(serviceAuth));

    return trello.getUserInfo(serviceAuth.token).then(function(data) {
      var session = { user: data };

      localStorage.setItem('punchtime:session', JSON.stringify(session));

      return { user: session.user };
    });
  },

  fetch: function() {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      var session = JSON.parse(localStorage.getItem('punchtime:session'));
      if (!session) { reject(); }
      resolve({ user: session.user });
    });
  },

  close: function() {
    return new Ember.RSVP.Promise(function(resolve) {
      localStorage.removeItem('punchtime:session');
      localStorage.removeItem('punchtime:access-token');
      resolve();
    });
  }
});

// TODO: Ember Data Session Model

// var session = this.store.createRecord('session', {
//   serviceAuth: serviceAuth
// });

// return session.save().then(function() {
//   return session.get('user');
// }).then(function(user) {
//   return { currentUser: user };
// });
