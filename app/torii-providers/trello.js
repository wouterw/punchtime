import Ember from 'ember';
import { configurable } from 'torii/configuration';

/* global require */
// import Provider from 'torii/providers/base';
var Provider = require('torii/providers/base').default;

function currentUrl(){
  return [window.location.protocol,
    "//",
    window.location.host,
    window.location.pathname].join('');
}

export default Provider.extend({
  name: 'trello',
  baseUrl: 'https://trello.com/1/authorize',

  appName: configurable('name', 'torri-trello'),
  apiKey: configurable('apiKey'),
  scope: configurable('scope', 'read'),
  expiration: configurable('expiration', '1hour'),

  /**
   * `open` returns a promise that resolves to
   * a `service-auth` model
   */
  open: function() {
    var providerUri = this.providerUri();
    var extract = ['token'];
    var name = this.get('name');

    return this.get('popup').open(providerUri, extract).then(function(data) {
      if (!data.token) {
        return Ember.RSVP.reject('Missing token');
      }

      data.provider = name;

      return data;
    });
  },

  providerUri: function() {
    return this.get('baseUrl') +
      '?key='+ this.get('apiKey') + '&scope=' + this.get('scope') +
      '&name='+ this.get('appName') + '&expiration=' + this.get('expiration') +
      '&callback_method=fragment' + '&return_url='+currentUrl();
  }
});

// TODO: Ember Data Service Auth Model

// var store = this.get('store');

// var serviceName = 'Trello';
// var authCode = data.auth_code;

// // send 'auth_code' to server, which knows the 'secret'
// // and can exchange it for a 'access_token'
// var auth = store.createRecord('service-auth', {
//   name: serviceName, authCode: authCode
// });

// return auth.save();
