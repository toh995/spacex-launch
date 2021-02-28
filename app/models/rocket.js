import Model, { attr, hasMany } from '@ember-data/model';

export default class RocketModel extends Model {
    @hasMany('launch') launches;
    @hasMany('comment') comments;

    @attr('string') name;
    @attr('string') description;
    @attr('string') imageUrl;
    @attr('string') wikipediaUrl;
}
