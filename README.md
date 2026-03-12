# HIMAPROM Website
**Himpunan Mahasiswa Produksi Media**

Website resmi organisasi mahasiswa HIMAPROM dengan konsep desain perpaduan budaya wayang tradisional Indonesia dan estetika media digital modern.

---

## Struktur Project

```
himaprom-website/
├── index.html                  # Halaman utama
├── pages/
│   ├── tentang.html            # Profil & Visi-Misi
│   ├── divisi.html             # Detail 5 Divisi
│   ├── program.html            # Program Kerja (Accordion)
│   ├── galeri.html             # Galeri Kegiatan
│   ├── angkatan.html           # Data Angkatan & Riwayat Ketua
│   ├── struktur.html           # Struktur Organisasi
│   └── kontak.html             # Halaman Kontak
├── data/
│   ├── program-kerja.json      # Data program kerja (editable)
│   ├── angkatan.json           # Data angkatan (editable)
│   └── ketua-himpunan.json     # Riwayat ketua (editable)
├── assets/
│   ├── css/style.css           # Stylesheet utama
│   ├── js/script.js            # JavaScript utama
│   └── images/                 # Folder gambar
└── README.md
```

---

## Cara Menggunakan

### Menjalankan Website
Buka `index.html` di browser, atau gunakan live server (VSCode Extension: Live Server).

> ⚠️ Untuk memuat data dari JSON (program kerja, angkatan, ketua), website **harus dijalankan melalui server** (bukan langsung buka file HTML). Gunakan Live Server atau XAMPP.

### Mengupdate Data

#### Program Kerja (`data/program-kerja.json`)
```json
[
  {
    "divisi": "Nama Divisi",
    "icon": "🎬",
    "color": "#5A2D82",
    "programs": [
      { "nama": "Nama Program", "desc": "Deskripsi program." }
    ]
  }
]
```

#### Angkatan (`data/angkatan.json`)
```json
[
  {
    "tahun": "2026",
    "ketua": "Nama Ketua",
    "jumlah_anggota": 32,
    "foto": "assets/images/angkatan/angkatan-2026.jpg",
    "deskripsi": "Deskripsi singkat angkatan."
  }
]
```

#### Riwayat Ketua (`data/ketua-himpunan.json`)
```json
[
  { "periode": "2026", "nama": "Nama Ketua Baru" }
]
```

---

## Warna & Desain

| Warna | Hex | Fungsi |
|-------|-----|--------|
| Deep Purple | `#5A2D82` | Warna utama |
| Gold | `#D4AF37` | Aksen budaya wayang |
| Soft Violet | `#8A63D2` | Secondary |
| Dark Charcoal | `#1F1F1F` | Teks & background gelap |

**Font:** Red Hat Display (Google Fonts)

---

## Fitur
- ✅ Responsive design (mobile-friendly)
- ✅ Sticky navbar dengan efek transparansi hero
- ✅ Hamburger menu mobile
- ✅ Scroll reveal animations
- ✅ Accordion program kerja
- ✅ Gallery dengan lightbox
- ✅ Animated counters
- ✅ Data dari JSON (mudah diupdate)
- ✅ Contact form
- ✅ Wayang-inspired SVG ornaments

---

*HIMAPROM — Melestarikan Budaya, Menciptakan Inovasi Media*
