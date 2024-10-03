<template>
  <div class="form-component">
    <h1 class="form-component__title">Add or Create Vulnerability</h1>
    <form @submit.prevent="onSubmit">
      <div class="form-component__field">
        <label for="name" class="form-component__label">Name</label>
        <input
          type="text"
          id="name"
          v-model="newVulnerability.name"
          class="form-component__input"
          required
        />
      </div>

      <div class="form-component__field">
        <label for="rank" class="form-component__label">Rank</label>
        <input
          type="number"
          id="rank"
          v-model="newVulnerability.rank"
          class="form-component__input"
          required
        />
      </div>

      <div class="form-component__field">
        <label for="description" class="form-component__label">Description</label>
        <textarea
          id="description"
          v-model="newVulnerability.description"
          class="form-component__textarea"
          required
        ></textarea>
      </div>

      <div class="form-component__field">
        <label for="prevention" class="form-component__label">Prevention Methods</label>
        <div
          v-for="(prevention, index) in newVulnerability.preventions"
          :key="index"
          class="form-component__prevention-list"
        >
          <input
            v-model="newVulnerability.preventions[index]"
            type="text"
            class="form-component__prevention-input"
            required
          />
          <div class="form-component__prevention-button-group">
            <ActionButton
              v-if="index === newVulnerability.preventions.length - 1"
              buttonText="Add Prevention"
              :with-listener="true"
              @button-clicked="onAddButtonClicked"
            />
            <ActionButton
              v-if="
                index === newVulnerability.preventions.length - 1 &&
                newVulnerability.preventions.length > 1
              "
              buttonText="Delete Prevention"
              :with-listener="true"
              @button-clicked="onDeleteButtonClicked"
            />
          </div>
        </div>
      </div>
      <ActionButton :with-listener="false" type="submit" buttonText="Submit" />
    </form>
  </div>
</template>

<script setup lang="ts">
import type { IActionFormEmits, IVulnerability } from '@/types'

import ActionButton from '@/components/ActionButton.vue'
import { reactive } from 'vue'
import { useVulnerabilitiesStore } from '@/stores/vulnerabilities'
import { storeToRefs } from 'pinia'

const emits = defineEmits<IActionFormEmits>()
const store = useVulnerabilitiesStore()
const { selectedVulnerability } = storeToRefs(store)

const newVulnerability = reactive<IVulnerability>({
  id: selectedVulnerability.value?.id ?? undefined,
  rank: selectedVulnerability.value?.rank ?? '',
  name: selectedVulnerability.value?.name ?? '',
  description: selectedVulnerability.value?.description ?? '',
  preventions: selectedVulnerability.value?.preventions ?? ['']
})

const onSubmit = async (): Promise<void> => {
  emits('submit-button-clicked', newVulnerability)
}

const onAddButtonClicked = () => {
  newVulnerability.preventions.push('')
}

const onDeleteButtonClicked = () => {
  newVulnerability.preventions.pop()
}
</script>
