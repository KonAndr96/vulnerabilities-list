<template>
  <div class="header">
    <h1 class="header__title">Vulnerabilities List</h1>
    <ActionButton @button-clicked="onHomeButtonClicked" button-text="Home" />
  </div>
  <ActionForm @submit-button-clicked="onSubmiButtonClicked" />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useVulnerabilitiesStore } from '@/stores/vulnerabilities'
import ActionForm from '@/components/ActionForm.vue'
import ActionButton from '@/components/ActionButton.vue'
import type { IVulnerability } from '@/types'

const router = useRouter()
const { createVulnerabilityAction } = useVulnerabilitiesStore()

const onHomeButtonClicked = async () => {
  await router.push({ name: 'home' })
}

const onSubmiButtonClicked = async (newVulnerability: IVulnerability) => {
  createVulnerabilityAction(newVulnerability)
  await router.push({ name: 'home' })
}
</script>
