import { A } from '@ember/array';
import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { pluralize } from 'ember-inflector';

export default class IndexController extends Controller {
    @tracked selectedModelName;
    @tracked selectedLayout = 'grid';

    @computed('selectedModelName').readOnly()
    get selectedRecords() {
        const pluralModelName = pluralize(this.selectedModelName);
        return this.model[pluralModelName] ?? A();
    }

    @action
    selectModelName(modelName) {
        this.selectedModelName = modelName;
    }

    @action
    selectLayout(layout) {
        this.selectedLayout = layout;
    }
}
