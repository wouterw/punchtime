import Ember from 'ember';
import { request } from 'ic-ajax';

function getApiKey() {
  return Ember.get(window.PunchtimeENV, 'torii.providers.trello.apiKey');
}

function getAccessToken() {
  var serviceAuth = JSON.parse(localStorage.getItem('punchtime:access-token'));
  return serviceAuth.token;
}

function urlFor() {
  var args = [].slice.call(arguments);

  var resource = 'https://api.trello.com/1' + args.shift() +
    '?key=' + getApiKey() + '&token=' + getAccessToken();

  return String.prototype.fmt.apply(resource, args);
}

export default Ember.Object.extend({

  getBoards: function(organization) {
    return request(urlFor('/organizations/%@/boards', organization));
  },

  getUserInfo: function(token) {
    return request(urlFor('/tokens/%@/member', token));
  }

});
