import { expect, test } from 'vitest'
import { addNote, listNotes, markDone } from './notes'
import type { Note } from './storage'

// In-memory storage stubs — gerçek notes.json'a dokunmaz
function makeStore(initial: Note[] = []) {
  const store: Note[] = [...initial]
  const load = () => [...store]
  const save = (notes: Note[]) => {
    store.length = 0
    store.push(...notes)
  }
  return { load, save, store }
}

test('addNote yeni notu doğru alanlarla oluşturur', () => {
  const { load, save } = makeStore()

  const not = addNote('Alışveriş yap', 'orta', load, save)

  expect(not.id).toBe(1)
  expect(not.text).toBe('Alışveriş yap')
  expect(not.done).toBe(false)
  expect(not.priority).toBe('orta')
  expect(typeof not.createdAt).toBe('string')
})

test('listNotes boş depoda boş dizi döndürür, dolu depoda tüm notları döndürür', () => {
  const { load, save } = makeStore()

  expect(listNotes(load)).toEqual([])

  addNote('İlk not', 'düşük', load, save)
  addNote('İkinci not', 'yüksek', load, save)

  const notlar = listNotes(load)
  expect(notlar).toHaveLength(2)
  expect(notlar[0].text).toBe('İlk not')
  expect(notlar[1].text).toBe('İkinci not')
})

test('markDone var olan notu tamamlandı işaretler; olmayan id hata fırlatır', () => {
  const { load, save, store } = makeStore()
  addNote('Bitir', 'yüksek', load, save)

  markDone(1, load, save)

  expect(store[0].done).toBe(true)
  expect(() => markDone(99, load, save)).toThrow()
})
