import { pathToFileURL } from 'node:url'
import { addNote, listNotes, markDone } from './notes'
import type { Priority } from './storage'

export { addNote, listNotes, markDone }

const isDirectRun =
  process.argv[1] !== undefined && import.meta.url === pathToFileURL(process.argv[1]).href

if (isDirectRun) {
  const [komut, ...rest] = process.argv.slice(2)

  if (komut === 'ekle') {
    const text = rest[0]
    if (!text) {
      console.error('Kullanım: ekle "not metni" [--oncelik yüksek|orta|düşük]')
      process.exit(1)
    }
    const oncelikFlagIndex = rest.indexOf('--oncelik')
    const priority: Priority =
      oncelikFlagIndex !== -1 ? (rest[oncelikFlagIndex + 1] as Priority) : 'orta'
    const not = addNote(text, priority)
    console.log(`Not eklendi (#${not.id}): ${not.text} [${not.priority}]`)
  } else if (komut === 'listele') {
    const notlar = listNotes()
    if (notlar.length === 0) {
      console.log('Henüz not yok.')
    } else {
      notlar.forEach((n) => {
        const durum = n.done ? '[✓]' : '[ ]'
        console.log(`${durum} #${n.id} [${n.priority}] ${n.text}`)
      })
    }
  } else if (komut === 'tamamla') {
    const id = Number(rest[0])
    if (isNaN(id)) {
      console.error('Kullanım: tamamla <id>')
      process.exit(1)
    }
    markDone(id)
    console.log(`#${id} numaralı not tamamlandı işaretlendi.`)
  } else {
    console.log('Komutlar: ekle, listele, tamamla')
  }
}
