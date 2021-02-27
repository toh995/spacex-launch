import JSONSerializer from '@ember-data/serializer/json';

export default class RocketSerializer extends JSONSerializer {
    normalize(typeClass, hash) {
        hash = {
            id: hash.id,
            name: hash.name,
            description: hash.description,
            imageUrl: hash.flickr_images.length ? hash.flickr_images[0] : '',
            wikipediaUrl: hash.wikipedia,
        }

        return super.normalize(typeClass, hash);
    }
}
