import { computed, Ref } from '@vue/composition-api';

export const useButtonSize = (size: Ref<string>, getCurrentInstance: any) => {
  const buttonSize = computed(() => {
    return size.value || (getCurrentInstance()?.proxy?.$KOOCAT || {})?.size;
  });

  return buttonSize;
};

export const useButtonDisabled = (disabled: Ref<boolean>) => {
  const buttonDisabled = computed(() => {
    return disabled.value;
  });

  return buttonDisabled;
};
