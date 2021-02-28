import faker from 'faker';

export default function() {
  this.namespace = 'api';

  this.passthrough('https://api.spacexdata.com/**');

  /**
   * This endpoint can recieve a query param of EITHER `filter[launchId]` OR `filter[rocketId]`.
   * It will then return all comments related to that rocket or launch id.
   * 
   * If neither query params exist, then just return all comments.
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
