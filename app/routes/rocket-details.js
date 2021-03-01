import Route from '@ember/routing/route';

export default class RocketDetailsRoute extends Route {
    async model(params) {
        await this.store.query('comment', {
            filter: { rocketId: params.rocket_id },
        });

        return this.store.findRecord('rocket', params.rocket_id);
    }
}
