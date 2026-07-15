import { pathToFileURL } from 'node:url'
import { addNote, listNotes, markDone } from './notes'
import { printHeader, printNote, printSuccess, printError, printEmpty } from './display'
import type { Priority } from './storage'

export { addNote, listNotes, markDone }

const isDirectRun =
  process.argv[1] !== undefined && import.meta.url === pathToFileURL(process.argv[1]).href

if (isDirectRun) {
  const [komut, ...rest] = process.argv.slice(2)

  if (komut === 'ekle') {
    const text = rest[0]
    if (!text) {
      printError('Kullanım: ekle "not metni" [--oncelik yüksek|orta|düşük]')
      process.exit(1)
    }
    const oncelikFlagIndex = rest.indexOf('--oncelik')
    const priority: Priority =
      oncelikFlagIndex !== -1 ? (rest[oncelikFlagIndex + 1] as Priority) : 'orta'
    const not = addNote(text, priority)
    printSuccess(`Not eklendi (#${not.id}): ${not.text}`)
  } else if (komut === 'listele') {
    const notlar = listNotes()
    printHeader()
    if (notlar.length === 0) {
      printEmpty()
    } else {
      notlar.forEach(printNote)
    }
  } else if (komut === 'tamamla') {
    const id = Number(rest[0])
    if (isNaN(id)) {
      printError('Kullanım: tamamla <id>')
      process.exit(1)
    }
    markDone(id)
    printSuccess(`#${id} numaralı not tamamlandı işaretlendi.`)
  } else {
    printHeader()
    console.log('Komutlar: ekle "metin" [--oncelik yüksek|orta|düşük] | listele | tamamla <id>')
  }
}
