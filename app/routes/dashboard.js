import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default class IndexRoute extends Route {
    async model() {
        return RSVP.hash({
            launches: this.store.findAll('launch'),
            rockets: this.store.findAll('rocket'),
        });
    }
}
