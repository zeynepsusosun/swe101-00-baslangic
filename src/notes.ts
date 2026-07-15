import { loadNotes, saveNotes } from './storage'
import type { Note, Priority } from './storage'

export function addNote(
  text: string,
  priority: Priority,
  load: () => Note[] = loadNotes,
  save: (notes: Note[]) => void = saveNotes,
): Note {
  const notes = load()
  const id = notes.length === 0 ? 1 : Math.max(...notes.map((n) => n.id)) + 1
  const note: Note = {
    id,
    text,
    done: false,
    priority,
    createdAt: new Date().toISOString(),
  }
  save([...notes, note])
  return note
}

export function listNotes(load: () => Note[] = loadNotes): Note[] {
  return load()
}

export function markDone(
  id: number,
  load: () => Note[] = loadNotes,
  save: (notes: Note[]) => void = saveNotes,
): void {
  const notes = load()
  const index = notes.findIndex((n) => n.id === id)
  if (index === -1) throw new Error(`${id} numaralı not bulunamadı`)
  notes[index] = { ...notes[index], done: true }
  save(notes)
}
