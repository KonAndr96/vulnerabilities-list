<template>
  <div class="header">
    <h1 class="header__title">Vulnerabilities List</h1>
    <div class="header__button-group">
      <ActionButton @button-clicked="onDeleteButtonClicked" button-text="Delete" />
      <ActionButton @button-clicked="onHomeButtonClicked" button-text="Home" />
    </div>
  </div>
  <ActionForm @submit-button-clicked="onSubmiButtonClicked" />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useVulnerabilitiesStore } from '@/stores/vulnerabilities'
import ActionForm from '@/components/ActionForm.vue'
import ActionButton from '@/components/ActionButton.vue'
import type { IVulnerability } from '@/types'
import { storeToRefs } from 'pinia'

const router = useRouter()
const store = useVulnerabilitiesStore()
const { selectedVulnerability } = storeToRefs(store)
const { editVulnerabilityAction, deleteVulnerabilityAction } = store

const onHomeButtonClicked = async () => {
  await router.push({ name: 'home' })
}

const onSubmiButtonClicked = async (newVulnerability: IVulnerability) => {
  editVulnerabilityAction(newVulnerability)
  await router.push({ name: 'inspect', params: { id: newVulnerability.id } })
}

const onDeleteButtonClicked = async () => {
  if (selectedVulnerability.value?.id) {
    await deleteVulnerabilityAction(selectedVulnerability.value.id)
    await router.push({ name: 'home' })
  }
}
</script>
