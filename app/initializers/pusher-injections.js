/* global Pusher */
export default {
  name: 'pusher injections',

  initialize: function(container, application) {
    var pusher = new Pusher(ENV.PUSHER_APP_KEY);
    // var socket = io();
    container.register("pusher:main", pusher, { instantiate: false });
    container.injection("push-channel", "pusher", "pusher:main");
    container.injection("push-channel", "target", "router:main");
  }
};
