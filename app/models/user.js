import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  email: DS.attr('string'),
  times: DS.hasMany('time'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date')
});