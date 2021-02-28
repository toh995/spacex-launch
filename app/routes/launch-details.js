import Route from '@ember/routing/route';

export default class LaunchDetailsRoute extends Route {
    async model(params) {
        await this.store.query('comment', {
            filter: { launchId: params.launch_id },
        });

        return this.store.findRecord('launch', params.launch_id);
    }
}
