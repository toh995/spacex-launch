import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
    serialize(object, request) {
        const serializeOne = (instance) => {
            return {
                id: instance.id,
                name: instance.name,
                description: instance.description,
                flickr_images: [instance.imageUrl],
                wikipedia: instance.wikipediaUrl,
            };
        }

        if (object.models) {
            return object.models.map(serializeOne);
        }
        else {
            return serializeOne(object.attrs);
        }
    }
});
