import type { IVulnerability, StoreObject } from '@/types'
import { defineStore } from 'pinia'
import { ref, computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

import {
  fetchVulnerabilities,
  createVulnerability,
  editVulnerability,
  deleteVulnerability
} from '@/utils'

export const useVulnerabilitiesStore = defineStore('vulnerabilities', (): StoreObject => {
  const route = useRoute()
  const vulnerabilities = ref<IVulnerability[]>([])

  watchEffect(async () => {
    vulnerabilities.value = await fetchVulnerabilities()
  })

  // Getting the vulnerability through id, to avoid unecessary calls to /vulnerabilities/:id endpoint and affect performance.
  const selectedVulnerability = computed<IVulnerability | undefined>(() => {
    if (
      typeof route.params.id === 'string' &&
      (route.name === 'edit' || route.name === 'inspect')
    ) {
      return vulnerabilities.value.find((vulnerability) => vulnerability.id === route.params.id)
    }
    return undefined
  })

  const createVulnerabilityAction = async (vulnerability: IVulnerability): Promise<void> => {
    const id = vulnerabilities.value.length + 1
    const newVulnerability: IVulnerability = { ...vulnerability, id: String(id) }
    await createVulnerability(newVulnerability)

    // If local state is not updated too, it does not immediately show up in the list.
    vulnerabilities.value = [...vulnerabilities.value, newVulnerability]
  }

  const editVulnerabilityAction = async (vulnerability: IVulnerability): Promise<void> => {
    const foundVulnerability = vulnerabilities.value.find(
      (oldVulnerability) => oldVulnerability.id === vulnerability.id
    )
    const newVulnerability: IVulnerability = { ...foundVulnerability, ...vulnerability }

    await editVulnerability(newVulnerability)

    // If local state is not updated too, it does not immediately show up in the list.
    vulnerabilities.value = vulnerabilities.value.map((oldVulnerability) => {
      return oldVulnerability.id === vulnerability.id ? newVulnerability : oldVulnerability
    })
  }

  const deleteVulnerabilityAction = async (vulnerabilityId: string): Promise<void> => {
    await deleteVulnerability(vulnerabilityId)

    // If local state is not updated too, it does not immediately show up in the list.
    vulnerabilities.value = vulnerabilities.value.filter((oldVulnerability) => {
      return oldVulnerability.id !== vulnerabilityId
    })
  }

  return {
    vulnerabilities,
    createVulnerabilityAction,
    editVulnerabilityAction,
    selectedVulnerability,
    deleteVulnerabilityAction
  }
})
