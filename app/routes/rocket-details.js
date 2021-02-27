import Route from '@ember/routing/route';

export default class RocketDetailsRoute extends Route {
    model(params) {
        return this.store.findRecord('rocket', params.rocket_id);
    }
}
