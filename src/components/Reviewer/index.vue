<template>
  <div class="reviewer-container">
    <div>
      <kc-avatar shape="circle" size="small" text="小王吧" class="kc-reviewer__avatar"></kc-avatar>
      <kc-input type="textarea" v-model="article" class="kc-reviewer__input"></kc-input>
      <input type="button" value="发送" class="kc-review__btn" />
    </div>
    <div v-for="data in reviewData" :key="data.id" class="kc-text__container">
      <kc-avatar shape="circle" size="small" :text="data.name" :src="data.url" class="kc-text__avatar"></kc-avatar>
      <div class="kc-text">
        <span class="kc-text__name">{{data.name}}</span><br>
        <span class="kc-text__text">{{data.text}}</span><br>
        <span class="kc-text__msg">{{data.msg}}</span>
        <input class="kc-text__btn" type="button" value="更多">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import KcAvatar from 'cps/Avatar/index.vue';
import KcInput from 'cps/Input/index.vue';
import { passTime } from '@/utils/hsyTime.ts';
export default defineComponent({
  components: {
    KcAvatar,
    KcInput
  },
  setup (){
    const article = ref('123');
    const reviewData = [
      { id: '001', msg:'', name: '李霸霸', url: '', date: '2020/11/30 22:00', text: '问题的关键究竟为何？ 那么， 在这种困难的抉择下，本人思来想去，寝食难安。 吉姆·罗恩曾经提到过，要么你主宰生活，要么你被生活主宰。带着这句话，我们还要更加慎重的审视这个问题： 苏轼在不经意间这样说过' },
      { id: '002', msg:'', name: '张渔歌', url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607619857024&di=c2567bb9e2ee81e120a51888bb246c49&imgtype=0&src=http%3A%2F%2Fimg.wxcha.com%2Ffile%2F201912%2F26%2F1a7978f27a.jpg', date: '2020/12/3 18:33', text: '本人思来想去，寝食难安。 中午吃什么，到底应该如何实现。 在这种困难的抉择下，本人思来想去，寝食难安。 这样看来， 叔本华曾经提到过，意志是一个强壮的盲人，倚靠在明眼的跛子肩上。我希望诸位也能好好地体会这句话。 了解清楚中午吃什么到底是一种怎么样的存在，是解决一切问题的关键。 问题的关键究竟为何？' },
      { id: '003', msg:'', name: '熊初墨', url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607619897214&di=c11fa84d3b5f0390870f7a21ef85ed72&imgtype=0&src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201906%2F30%2F20190630112508_GRirM.thumb.400_0.jpeg', date: '2020/12/6 8:35', text: '带着这些问题，我们来审视一下中午吃什么。 在这种困难的抉择下，本人思来想去，寝食难安。' },
      { id: '004', msg:'', name: '回守涛', url: '', date: '2020/12/8 19:03', text: '塞涅卡说过一句富有哲理的话，生命如同寓言，其价值不在与长短，而在与内容。这句话语虽然很短，但令我浮想联翩。' },
      { id: '005', msg:'', name: 'Edward', url: '', date: '2020/12/10 20:06', text: '文森特·皮尔在不经意间这样说过，改变你的想法，你就改变了自己的世界。这启发了我， 莎士比亚说过一句富有哲理的话，抛弃时间的人，时间也抛弃他。这不禁令我深思。 叔本华在不经意间这样说过，普通人只想到如何度过时间，有才能的人设法利用时间。' },
      { id: '006', msg:'', name: 'Green', url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3190772544,3763166011&fm=26&gp=0.jpg', date: '2020/12/15 10:24', text: '贝多芬在不经意间这样说过，卓越的人一大优点是：在不利与艰难的遭遇里百折不饶。这似乎解答了我的疑惑。 王阳明曾经提到过，故立志者，为学之心也；为学者，立志之事也。' },
    ];
    reviewData.forEach(item => {
      item.msg = passTime(item.date, +new Date());
    });
    return {
      article,
      reviewData
    };
  }
});
</script>

<style lang="scss" scoped src="./index.scss">
</style>
