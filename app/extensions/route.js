import Ember from 'Ember';

Ember.Router.reopen({
  setup: function(model, transition) {
    this._super(model, transition);
    var pushChannelName = this.pushChannelName || this.routeName;
    var pushChannel = this.pushChannelFor(pushChannelName);
    this.setupPushChannel(pushChannel, model);
  },

  pushChannelFor: function(name) {
    return this.container.lookup("push-channel:" + name);
  },

  setupPushChannel: function(pushChannel, model) {
    if (pushChannel) {
      pushChannel.set('model', model);
    }
  }
});
