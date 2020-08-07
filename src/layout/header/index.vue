<template>
  <div class="layout-header">
    <header class="header-box-fixed">
      <div class="header-container">
        <a class="header-logo" href=""></a>
        <nav class="header-nav">
          <ul class="nav-menu-box">
            <li>
              <ul>
                <li class="nav-menu-box-list" v-for="(item, index) in navList" :key="index">
                  <router-link class="nav-menu-link" :to="{name: item['name']}">{{ item['label'] }}</router-link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class Header extends Vue {
  navList = [{
    name: 'index',
    label: '首页'
  },{
    name: 'articles',
    label: '文章'
  }, {
    name: 'gallery',
    label: '摄影影集'
  }, {
    name: 'about',
    label: '关于我们'
  }, {
    name: 'contactUs',
    label: '联系我们'
  }];
}
</script>

<style lang="scss" scoped src="./index.scss"></style>
