import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class LaunchModel extends Model {
    @belongsTo('rocket') rocket;
    @hasMany('comment') comments;

    @attr('string') name;
    @attr('string') description;
    @attr('string') imageUrl;
    @attr('string') wikipediaUrl;
    @attr('string') youtubeId;
}
