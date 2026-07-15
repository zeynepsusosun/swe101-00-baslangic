import chalk from 'chalk'
import type { Note } from './storage'

const c = {
  pink: chalk.hex('#F48FB1'),
  done: chalk.hex('#CE93D8').strikethrough,
  high: chalk.hex('#EF9A9A').bold,
  mid: chalk.hex('#F48FB1'),
  low: chalk.hex('#A5D6A7'),
  id: chalk.hex('#80DEEA'),
  dim: chalk.hex('#BDBDBD'),
}

function priorityLabel(p: Note['priority']): string {
  if (p === 'yüksek') return c.high('● yüksek')
  if (p === 'orta') return c.mid('● orta  ')
  return c.low('● düşük ')
}

export function printHeader(): void {
  console.log(c.pink('╔══════════════════════════════╗'))
  console.log(c.pink('║        Not Defteri 📒        ║'))
  console.log(c.pink('╚══════════════════════════════╝'))
}

export function printNote(n: Note): void {
  const durum = n.done ? c.done('[✓]') : c.pink('[ ]')
  const id = c.id(`#${n.id}`)
  const metin = n.done ? c.done(n.text) : n.text
  const oncelik = priorityLabel(n.priority)
  console.log(`${durum} ${id} ${oncelik}  ${metin}`)
}

export function printSuccess(msg: string): void {
  console.log(c.pink('✓ ') + msg)
}

export function printError(msg: string): void {
  console.error(chalk.red('✗ ') + msg)
}

export function printEmpty(): void {
  console.log(c.dim('Henüz not yok. "ekle" komutuyla başlayabilirsin.'))
}
