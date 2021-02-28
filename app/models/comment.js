import Model, { attr, belongsTo } from '@ember-data/model';

export default class CommentModel extends Model {
    @belongsTo('launch') launch;
    @belongsTo('rocket') rocket;

    @attr('string') body;
}
