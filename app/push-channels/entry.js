import PushChannel from 'app/push-channels/base';

export default PushChannel.extend({
  channelName: function() {
    return 'time-entry-' + this.get('model.id');
  },

  actions: {
    publishingCompleted: function() {
      this.get('model').set('publishing', false);
    }
  }
});
