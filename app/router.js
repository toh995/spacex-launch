import EmberRouter from '@ember/routing/router';
import config from 'spacex-launch/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('dashboard', { path: '/' }, function() {});
  this.route('launch-details', { path: '/launches/:launch_id'});
  this.route('rocket-details', { path: '/rockets/:rocket_id'});
});
