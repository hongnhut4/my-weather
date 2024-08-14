import CryptoJS from 'crypto-js'
import { format } from 'date-fns'

const secretKey = import.meta.env.VITE_SECRET_KEY

export const convertKelvinToCelsius = (kelvin: number): string => {
  return (kelvin - 273.15).toFixed(2)
}

export const saveHistoryDataToLocalStorage = (history: string[]) => {
  const ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(history),
    secretKey
  ).toString()
  localStorage.setItem('searchHistory', ciphertext)
}

export const getHistoryFromLocalStorage = (): string[] => {
  const ciphertext = localStorage.getItem('searchHistory')
  if (ciphertext) {
    try {
      const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey)
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8)
      return JSON.parse(decryptedData)
    } catch (error) {
      console.error('Failed to decrypt data:', error)
      return []
    }
  }
  return []
}

export const formatDateWithDDMMYYYY = (date: Date) => {
  return format(date, 'd MMMM, yyyy')
}

export const formatDateWithDDMM = (date: Date) => {
  return format(date, 'dd MMMM')
}
