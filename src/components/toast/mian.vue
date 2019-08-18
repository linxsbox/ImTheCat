<template>
  <transition name="cat-toast" @after-leave="handleAfterLeave">
    <div v-show="visible" class="cat-toast" @mouseenter="clearTimer" @mouseleave="startTimer">
      <span class="cat-toast__icon" v-if="true">icon</span>
      <p class="cat-toast__content">{{ message }}</p>
      <div class="cat-toast__btn-close">
        <span>close</span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "toast",
  data() {
    return {
      visible: false,
      message: "",
      duration: 3000,
      closed: false,
      onClose: null,
      showClose: false,
      stid: null
    };
  },
  watch: {
    closed(val, oldVal) {
      if (val) this.visible = false;
    }
  },
  computed: {},
  methods: {
    closeToast() {
      this.closed = true;
      if (typeof this.onClose === "function") {
        this.onClose(this);
      }
    },
    startTimer() {
      if (this.duration > 0)
        setTimeout(() => {
          if (!this.closed) this.closeToast();
        }, this.duration);
    },
    clearTimer() {
      clearTimeout(this.stid);
    },
    handleAfterLeave() {
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    }
  },
  mounted() {
    this.startTimer();
  }
};
</script>
<style scoped src="./toast.css"></style>