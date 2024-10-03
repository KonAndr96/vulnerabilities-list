export interface IVulnerability {
  id?: string
  rank: string | undefined
  name: string
  description: string
  preventions: string[]
}
