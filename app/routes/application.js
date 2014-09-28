import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    this.get('session').fetch();
  },

  actions: {
    signIn: function() {
      var route = this;

      this.get('session').open('trello').then(function() {
        route.wuphf.success('You\'ve been successfully signed in!');
      }).catch(function() {
        route.wuphf.danger('Failed to sign in!');
      });
    },

    signOut: function() {
      var route = this;
      this.get('session').close().then(function() {
        route.transitionTo('index');
        route.wuphf.success('You\'ve been signed out!');
      });
    }
  }
});
