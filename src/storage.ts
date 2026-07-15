import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

export type Priority = 'yüksek' | 'orta' | 'düşük'

export interface Note {
  id: number
  text: string
  done: boolean
  priority: Priority
  createdAt: string
}

const VALID_PRIORITIES = new Set<string>(['yüksek', 'orta', 'düşük'])

function isNote(value: unknown): value is Note {
  if (typeof value !== 'object' || value === null) return false
  const v = value as Record<string, unknown>
  return (
    typeof v['id'] === 'number' &&
    typeof v['text'] === 'string' &&
    typeof v['done'] === 'boolean' &&
    typeof v['priority'] === 'string' &&
    VALID_PRIORITIES.has(v['priority']) &&
    typeof v['createdAt'] === 'string'
  )
}

const DB_PATH = resolve(process.cwd(), 'notes.json')

export function loadNotes(): Note[] {
  if (!existsSync(DB_PATH)) return []
  const raw = readFileSync(DB_PATH, 'utf-8').trim()
  if (raw === '') return []
  const parsed: unknown = JSON.parse(raw)
  if (!Array.isArray(parsed)) throw new Error('notes.json geçersiz format')
  return parsed.map((item, i) => {
    if (!isNote(item)) throw new Error(`notes.json[${i}] geçersiz not kaydı`)
    return item
  })
}

export function saveNotes(notes: Note[]): void {
  writeFileSync(DB_PATH, JSON.stringify(notes, null, 2), 'utf-8')
}
