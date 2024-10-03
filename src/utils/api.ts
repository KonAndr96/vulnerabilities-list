import type { IVulnerability } from '@/types'

const BASE_URL = '/vulnerabilities'
const PORT = '3000'
const server = `http://localhost:${PORT}${BASE_URL}`
const headers = {
  'Content-type': 'application/json; charset=UTF-8'
}

export const fetchVulnerabilities = async (): Promise<IVulnerability[]> => {
  try {
    const response = await fetch(server, { method: 'GET', headers })
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    const data: IVulnerability[] = await response.json()
    return data
  } catch (error) {
    console.error('Results could not be fetched')

    return []
  }
}

export const createVulnerability = async (item: IVulnerability): Promise<void> => {
  try {
    const response = await fetch(server, {
      method: 'POST',
      headers,
      body: JSON.stringify(item)
    })
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }
  } catch (error) {
    console.error('Vulnerability could not be created.')
  }
}

export const editVulnerability = async (item: IVulnerability): Promise<void> => {
  try {
    const response = await fetch(`${server}/${item.id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(item)
    })
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }
  } catch (error) {
    console.error('Vulnerability could not be edited.')
  }
}

export const deleteVulnerability = async (itemId: string): Promise<void> => {
  try {
    const response = await fetch(`${server}/${itemId}`, {
      method: 'DELETE',
      headers
    })
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }
  } catch (error) {
    console.error('Vulnerability could not be deleted.')
  }
}
