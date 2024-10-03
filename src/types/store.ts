import type { Ref, ComputedRef } from 'vue'
import type { IVulnerability } from './vulnerabilities'

export interface StoreObject {
  vulnerabilities: Ref<IVulnerability[]>
  selectedVulnerability: ComputedRef<IVulnerability | undefined>
  createVulnerabilityAction: (vulnerability: IVulnerability) => Promise<void>
  editVulnerabilityAction: (vulnerability: IVulnerability) => Promise<void>
  deleteVulnerabilityAction: (vulnerabilityId: string) => Promise<void>
}
