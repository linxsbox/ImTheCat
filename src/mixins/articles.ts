import { Vue, Component } from 'vue-property-decorator';

@Component
export class MixinsArticles extends Vue {

  created () {
    this.runing();
  }

  runing () {
    // init Mixins Articles
  }

  // methods
  gotoArticleDetails (id: string) {
    this.$router.push({name: 'articleDetail', params: { id }});
  }
}
