import Route from '@ember/routing/route';

export default class LaunchDetailsRoute extends Route {
    model(params) {
        return this.store.findRecord('launch', params.launch_id);
    }
}
