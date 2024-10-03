<template>
  <div class="header">
    <h1 class="header__title">Inspect Vulnerability</h1>
    <div class="header__button-group">
      <ActionButton @button-clicked="onEditButtonClicked" button-text="Edit" />
      <ActionButton @button-clicked="onDeleteButtonClicked" button-text="Delete" />
      <ActionButton @button-clicked="onHomeButtonClicked" button-text="Home" />
    </div>
  </div>
  <div class="inspect-item">
    <div class="inspect-item__top">
      <h1 class="inspect-item__top-title">{{ selectedVulnerability?.name }}</h1>
      <p class="inspect-item__top-rank">#{{ selectedVulnerability?.rank }}</p>
    </div>
    <p class="inspect-item__description">{{ selectedVulnerability?.description }}</p>
    <h2 class="inspect-item__sub-title">Preventions</h2>
    <ul class="inspect-item__prevention-list">
      <li
        v-for="(prevention, index) in selectedVulnerability?.preventions"
        :key="index"
        class="inspect-item__prevention-item"
      >
        {{ prevention }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import ActionButton from '@/components/ActionButton.vue'
import { useVulnerabilitiesStore } from '@/stores/vulnerabilities'
import { storeToRefs } from 'pinia'

const router = useRouter()
const store = useVulnerabilitiesStore()
const { deleteVulnerabilityAction } = store
const { selectedVulnerability } = storeToRefs(store)

const onEditButtonClicked = async () => {
  await router.push({ name: 'edit', params: { id: selectedVulnerability.value?.id } })
}

const onDeleteButtonClicked = async () => {
  if (selectedVulnerability.value?.id) {
    await deleteVulnerabilityAction(selectedVulnerability.value.id)
    await router.push({ name: 'home' })
  }
}

const onHomeButtonClicked = async () => {
  await router.push({ name: 'home' })
}
</script>
