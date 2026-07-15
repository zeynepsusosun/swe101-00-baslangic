# Not Defteri CLI

Komut satırında çalışan küçük bir not defteri uygulaması.
Not ekle, listele, tamamlandı işaretle — her şey `notes.json` dosyasında kalıcı olarak saklanır.

---

## Kurulum

**Gereksinim:** Node.js >= 22

```bash
git clone <repo-url>
cd swe101-00-baslangic
npm install
```

---

## Kullanım

```bash
# Not ekle (varsayılan öncelik: orta)
npm run dev -- ekle "Alışveriş yap"

# Öncelikli not ekle (yüksek / orta / düşük)
npm run dev -- ekle "Makaleyi bitir" --oncelik yüksek
npm run dev -- ekle "Müzik çalma listesi yap" --oncelik düşük

# Notları listele
npm run dev -- listele

# Notu tamamlandı işaretle
npm run dev -- tamamla 1
```

### Örnek çıktı

```
╔══════════════════════════════╗
║        Not Defteri 📒        ║
╚══════════════════════════════╝
[✓] #1 ● orta    Alışveriş yap
[ ] #2 ● yüksek  Makaleyi bitir
[ ] #3 ● düşük   Müzik çalma listesi yap
```

---

## Testler

```bash
npm test          # 6 test, hepsinin yeşil olması gerekir
npm run typecheck # TypeScript strict kontrolü
```

Unit testler üç temel davranışı kapsar:

- `addNote` — yeni notu doğru alanlarla oluşturur
- `listNotes` — boş ve dolu depo senaryolarını doğrular
- `markDone` — var olan notu tamamlar; olmayan id için hata fırlatır

---

## Ne öğrendim

- **JSON kalıcı depolama:** `fs.readFileSync` / `writeFileSync` ile dosyadan okuma/yazma; `existsSync` ile ilk çalıştırmada dosya yokken güvenli başlangıç.
- **TypeScript strict modu:** Dış verinin (`JSON.parse`) `unknown` tipinde geldiğini ve tip guard fonksiyonuyla doğrulanması gerektiğini öğrendim.
- **Test-first (TDD) döngüsü:** Önce başarısız testi yazmak, ardından sadece o testi geçirecek kadar kod yazmak — fazladan soyutlamadan kaçınmayı kolaylaştırıyor.
- **Dependency injection ile test izolasyonu:** `loadNotes` / `saveNotes` fonksiyonlarını parametre olarak geçirerek testlerde gerçek dosyaya dokunmadan in-memory kopya kullandım.
- **chalk ile terminal renklendirme:** Hex renk kodlarıyla pastel tema oluşturma, `strikethrough` ile tamamlanmış not görünümü.
- **CLI argüman ayrıştırma:** `process.argv` ile harici kütüphane olmadan komut ve flag okuma.
- **Anlamlı commit disiplini:** Her özelliği ayrı commit'e bölmek, `git log`'u gelecekte okunabilir kılıyor.
