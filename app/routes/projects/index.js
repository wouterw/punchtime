import Ember from 'ember';
import Protected from 'punchtime/mixins/protected-route';

export default Ember.Route.extend(Protected, {
  model: function() {
    return this.trello.getBoards('typework');
  }
});
