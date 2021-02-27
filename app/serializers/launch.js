import JSONSerializer from '@ember-data/serializer/json';

export default class LaunchSerializer extends JSONSerializer {
    normalize(typeClass, hash) {
        hash = {
            id: hash.id,
            name: hash.name,
            description: hash.details,
            imageUrl: hash.links.patch.small ?? '',
            wikipediaUrl: hash.links.wikipedia ?? '',
            youtubeId: hash.links.youtube_id ?? '',
        }

        return super.normalize(typeClass, hash);
    }
}
