import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
    name() {
        return faker.internet.userName();
    },

    description() {
        return faker.lorem.paragraph();
    },

    imageUrl() {
        return faker.image.imageUrl();
    },

    wikipediaUrl() {
        return faker.internet.url();
    },
});
