import { expect, test } from 'vitest'
import { addNote, listNotes, markDone } from './index'
import type { Note } from './storage'

function makeStore(initial: Note[] = []) {
  const store: Note[] = [...initial]
  const load = () => [...store]
  const save = (notes: Note[]) => {
    store.length = 0
    store.push(...notes)
  }
  return { load, save }
}

test('index addNote re-export çalışır', () => {
  const { load, save } = makeStore()
  const not = addNote('index üzerinden eklendi', 'orta', load, save)
  expect(not.text).toBe('index üzerinden eklendi')
})

test('index listNotes re-export çalışır', () => {
  const { load, save } = makeStore()
  addNote('A', 'düşük', load, save)
  expect(listNotes(load)).toHaveLength(1)
})

test('index markDone re-export çalışır', () => {
  const { load, save } = makeStore()
  addNote('Tamamlanacak', 'yüksek', load, save)
  markDone(1, load, save)
  expect(listNotes(load)[0].done).toBe(true)
})
