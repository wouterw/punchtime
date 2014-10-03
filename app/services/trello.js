import Ember from 'ember';
import { request } from 'ic-ajax';
import config from 'punchtime/config/environment';

function getApiKey() {
  return config.torii.providers.trello.apiKey;
}

function getAccessToken() {
  var serviceAuth = JSON.parse(localStorage.getItem('punchtime:access-token'));
  return serviceAuth.token;
}

function urlFor() {
  var args = [].slice.call(arguments);

  var s = args.shift(), key = getApiKey(), token = getAccessToken();
  var resource = 'https://api.trello.com/1' + s + '?key=' + key + '&token=' + token;

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
