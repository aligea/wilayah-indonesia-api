# Wilayah Public API Microservice

Microservice API untuk data wilayah Indonesia (provinsi, kabupaten/kota, kecamatan, desa).


## Endpoint Dasar

- GET /api/v1/provinces  
- GET /api/v1/provinces/:id  
- GET /api/v1/regencies?province_id=11
- GET /api/v1/regencies/:id  
- GET /api/v1/districts?regency_id=11.01
- GET /api/v1/districts/11.01.02      
- GET /api/v1/villages?district_id=110101  

Dokumentasi OpenAPI tersedia di `src/docs/openapi.yaml`.

<<<<<<< HEAD
## Menjalankan

=======

# Install & Run — Wilayah Public API

Berikut langkah-langkah untuk menginstall dan menjalankan project ini secara lokal.

Prerequisites:
- Node.js 14+ dan `npm` atau `yarn`
- MySQL (jika Anda ingin menjalankan database lokal sesuai konfigurasi `src/config/database.js`)

1) Pasang dependensi

```bash
npm install
# atau
# yarn install
```

2) Siapkan environment (opsional)

- Salin `.env.example` ke `.env` (jika ada) dan sesuaikan variabel (PORT, DATABASE_URL, dsb.).

3) Siapkan database (opsional)

- Jika Anda menggunakan database lokal, impor SQL dari folder `db/seeders/` atau jalankan migrasi sesuai alur Anda.
- Jalankan skrip berikut:
```
npm run migrate
```

4) Menjalankan server

```bash
# jalankan langsung
node src/server.js

# atau jalankan melalui npm script (jika tersedia):
npm run start

# atau bisa juga dengan:
npm run dev
```

5) Akses API dan halaman test

- API base: `http://localhost:3000/api/v1`
- Halaman pengujian interaktif (view) tersedia di: `http://localhost:3000/` atau `http://localhost:3000/test`

Catatan tambahan:

- Logger error menulis ke `logs/error.log`.
- Jika Anda membuka `src/views/index.tpl.html` langsung dari filesystem, klien akan fallback ke `http://localhost:3000/api/v1`.
>>>>>>> dev_v1
