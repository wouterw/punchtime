import Ember from 'ember';

var Router = Ember.Router.extend({
  location: PunchtimeENV.locationType
});

Router.map(function() {
  this.resource('projects', function() {
    this.route('new');
  });
});

export default Router;
