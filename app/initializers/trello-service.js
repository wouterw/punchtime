export default {
  name: 'trello-service',
  initialize: function(container, application){
    application.inject('route', 'trello', 'service:trello');
  }
};
