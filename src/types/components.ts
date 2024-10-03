import type { IVulnerability } from './vulnerabilities'

export interface IActionButtonProps {
  buttonText: string
  withListener?: boolean
}

export interface IActionButtonEmits {
  (e: 'button-clicked'): void
}

export interface IVulnerabilityCardEmits {
  (e: 'card-clicked', payload: IVulnerability): void
}

export interface IActionFormEmits {
  (e: 'submit-button-clicked', payload: IVulnerability): void
}

export interface IVulnerabilityCardProps {
  vulnerability: IVulnerability
}
