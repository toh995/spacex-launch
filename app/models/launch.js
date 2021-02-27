import Model, { attr, belongsTo } from '@ember-data/model';
import { computed } from '@ember/object';

export default class LaunchModel extends Model {
    @belongsTo('rocket') rocket;

    @attr('string') name;
    @attr('string') description;
    @attr('string') imageUrl;
    @attr('string') wikipediaUrl;
    @attr('string') youtubeId;
}
