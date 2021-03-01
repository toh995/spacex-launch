import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
    serialize(object, request) {
        const serializeOne = (instance) => {
            return {
                id: instance.id,
                name: instance.name,
                details: instance.description,
                links: {
                    patch: { small: instance.imageUrl },
                    wikipedia: instance.wikipediaUrl,
                    youtube_id: instance.youtubeId,
                }
            };
        };

        if (object.models) {
            return object.models.map(serializeOne);
        }
        else {
            return serializeOne(object.attrs);
        }
    }
});
