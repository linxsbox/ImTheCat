<template>
  <footer class="cat-footer">
    <div class="footer-container">
      <div class="footer-wrapper pad-tb20">
        <div class="map-site">
          <span class="mag-r20" v-for="(item, index) in mapSiteList" :key="index">
            <router-link class="link" :to="{name: item['name']}">{{ item['label'] }}</router-link>
          </span>
        </div>
        <div class="copy-right pad-t20">Copyright © {{ years }} {{ author }}.</div>
      </div>
      <div class="footer-beian pad-t20 pad-b10">
        <template v-for="(item, index) in beian">
          <span :class="item['icon']" :key="index" v-if="item">
            <a class="link" :href="item['url']" target="_blank" rel="noopener noreferrer">{{ item['name'] }}</a>
          </span>
          <i :key="index" v-else></i>
        </template>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import website from '@/website.json';

@Component({})
export default class Layout extends Vue {
  author = '';
  years = '';
  beian = [];

  mapSiteList = [{
    name: 'index',
    label: '首页'
  },{
    name: 'articles',
    label: '文章'
  }, {
    name: 'gallery',
    label: '摄影作品'
  }, {
    name: 'about',
    label: '关于我们'
  }, {
    name: 'contactUs',
    label: '联系我们'
  }, {
    name: 'barrageRoom',
    label: '弹幕娱乐'
  }];

  created () {
    this.author = website.author;
    this.years = website.years;
    this.beian = this.insertSplitSymbol(website.beian);
  }

  insertSplitSymbol (arr:any = []) {
    for (let index = arr.length - 1; 0 < index; index--) {
      arr.splice(index, 0, false);
    }
    return arr;
  }
}
</script>

<style lang="scss" scoped src="./index.scss"></style>
