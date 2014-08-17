import DS from 'ember-data';

export default DS.Model.extend({
  note: DS.attr('string'),
  start: DS.attr('date'),
  end: DS.attr('date'),

  project: DS.belongsTo('project'),
  categories: DS.hasMany('category'),
  members: DS.hasMany('user'),

  createdBy: DS.belongsTo('user'),

  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date')
});
