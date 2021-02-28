import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default class RocketAdapter extends JSONAPIAdapter {
    host = 'https://api.spacexdata.com';
    namespace = 'v4'
}
