<template>
  <button v-on="withListener ? { click: onButtonClick } : {}" class="action-button">
    <span>{{ buttonText }}</span>
  </button>
</template>

<script setup lang="ts">
import type { IActionButtonProps, IActionButtonEmits } from '@/types'

withDefaults(defineProps<IActionButtonProps>(), {
  withListener: true
})
const emits = defineEmits<IActionButtonEmits>()

const onButtonClick = () => {
  emits('button-clicked')
}
</script>
