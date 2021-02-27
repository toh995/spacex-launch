import Component from '@glimmer/component';
import { computed } from '@ember/object';

export default class DetailsPageIndexComponent extends Component {
    @computed('args.model.youtubeId').readOnly()
    get webcastEmbedUrl() {
        const { youtubeId } = this.args.model;
        return youtubeId ? `https://www.youtube.com/embed/${youtubeId}` : '';
    }
}
