<template>
  <div class="header">
    <h1 class="header__title">Vulnerabilities List</h1>
    <ActionButton @button-clicked="onButtonClicked" button-text="Add" />
  </div>
  <div class="item-list">
    <div v-if="vulnerabilities.length" class="item-list__items">
      <VulnerabilityCard
        v-for="vulnerability in vulnerabilities"
        @card-clicked="onCardClicked"
        :vulnerability="vulnerability"
        :key="vulnerability.id"
      />
    </div>
    <div v-else class="item-list__empty">No items available</div>
  </div>
</template>

<script setup lang="ts">
import ActionButton from '@/components/ActionButton.vue'
import VulnerabilityCard from '@/components/VulnerabilityCard.vue'
import { storeToRefs } from 'pinia'
import { useVulnerabilitiesStore } from '../stores/vulnerabilities'
import { useRouter } from 'vue-router'
import type { IVulnerability } from '@/types'

const router = useRouter()

const onButtonClicked = async () => {
  await router.push({ name: 'create' })
}

const onCardClicked = async (vulnerability: IVulnerability) => {
  await router.push({ name: 'inspect', params: { id: vulnerability.id } })
}

const store = useVulnerabilitiesStore()
const { vulnerabilities } = storeToRefs(store)
</script>
