import Ember from 'ember';

export default Ember.Object.extend(Ember.ActionHandler, {
  pusher: null, // injected

  channelName: function() {
    throw new Error('must implement channelName');
  },

  subscribeToChannel: function() {
    var channelName = this.get('channelName');
    if (!channelName) { return; }

    var pusherChannel = this.pusher.subscribe(channelName);

    function handlePusherEvent(eventName, data) {
      this.send(eventName, data);
    }

    pusherChannel.bind_all(Ember.run.bind(this, handlePusherEvent));
  }.observes('channelName').on('init'),

  unsubscribeToChannel: function() {
    var channelName = this.get('channelName');
    if (!channelName) { return; }
    this.pusher.unsubscribe(this.get('channelName'));
  }.observesBefore('channelName')
});

// This version converts pushes to actions;
// We could also implemented this pattern with
// Ember.Evented and converting to events
