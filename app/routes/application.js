import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    this.get('session').fetch();
  },

  actions: {
    signIn: function() {
      var controller = this.controller;

      this.get('session').open('trello').then(function() {
        // authenticated
      }).catch(function(error) {
        controller.set('error', error);
      });
    },

    signOut: function() {
      var route = this;
      this.get('session').close().then(function() {
        route.transitionTo('index');
      });
    }
  }
});
