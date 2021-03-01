import faker from 'faker';

import ENV from 'spacex-launch/config/environment';

export default function() {
  // if we are running tests, add extra "fake" endpoints for the spacex API
  if (ENV.environment === 'test') {    
    this.get('https://api.spacexdata.com/v4/launches', (schema, request) => {
      return schema.launches.all();
    });

    this.get('https://api.spacexdata.com/v4/rockets', (schema, request) => {
      return schema.rockets.all();
    });

    this.get('https://api.spacexdata.com/v4/launches/:id', (schema, request) => {
      const { id } = request.params;
      return schema.launches.findBy({ id });
    });

    this.get('https://api.spacexdata.com/v4/rockets/:id', (schema, request) => {
      const { id } = request.params;
      return schema.rockets.findBy({ id });
    });

  }

  // global defaults
  this.namespace = 'api';
  this.passthrough('https://api.spacexdata.com/**');

  /**
   * This comments endpoint is used for both the real app, and for testing.
   * The endpoint can recieve a query param of EITHER `filter[launchId]` OR `filter[rocketId]`.
   * It will then return all comments related to that rocket or launch id.
   * 
   * If neither query params exist on the request, then just return all comments.
   */
  this.get('/comments', (schema, request) => {
    const launchId = request.queryParams['filter[launchId]'];
    const rocketId = request.queryParams['filter[rocketId]'];

    // return all comments
    if (!launchId && !rocketId) {
      return schema.comments.all();
    }

    else {
      // find the parent model name and id
      let parentModelName;
      let parentId;
      
      if (launchId) {
        parentModelName = 'launches';
        parentId = launchId;
      }

      else if (rocketId) {
        parentModelName = 'rockets';
        parentId = rocketId;
      }

      // find parent
      let parent = schema[parentModelName].findBy({ id: parentId });

      // if parent doesn't exist, then create the parent, and create associated comments
      if (parent === null) {
        parent = schema[parentModelName].create({ id: parentId });
        
        for (let i = 0; i < 10; i++) {
          const body = faker.lorem.paragraph();
          parent.createComment({ body });
        }

        parent.reload();
      }

      // return comments
      return parent.comments;
    }
  });
}
