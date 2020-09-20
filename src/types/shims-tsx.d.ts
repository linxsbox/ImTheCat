import Vue, { VNode } from 'vue';

declare global {
  namespace JSX {
    // eslint:disable no-empty-interface
    type Element = VNode
    // eslint:disable no-empty-interface
    type ElementClass = Vue
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
