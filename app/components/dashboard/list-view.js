import Component from '@glimmer/component';
import { computed } from '@ember/object';
import { singularize } from 'ember-inflector';

export default class DashboardListViewComponent extends Component {
    @computed('args.modelName').readOnly()
    get detailRoute() {
        const modelName = singularize(this.args.modelName);
        return `${modelName}-details`;
    }

    @computed('args.modelName').readOnly()
    get capitalizedModelName() {
        const modelName = singularize(this.args.modelName);
        return modelName[0].toUpperCase() + modelName.substring(1);
    }
}
