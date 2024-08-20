# wilayah-indonesia-api
 public API untuk mengakses wilayah Indonesia (provinsi, kabupaten/kota, kecamatan, kelurahan/desa) 


## Dokumentasi API

Dokumentasi ini menjelaskan cara mengakses layanan API

### Provinsi

```
GET [baseurlapp]/v1/provinces

GET [baseurlapp]/v1/province/{id_province}
```

### Kota/Kabupaten
```
GET [baseurlapp]/v1/regencies/{id_province}

GET [baseurlapp]/v1/regency/{id_regency}
```

### Kecamatan
```
GET [baseurlapp]/v1/districts/{id_regency}
GET [baseurlapp]/v1/district/{id_district}
```

### Desa/Kelurahan
```
GET [baseurlapp]/v1/vilagges/{id_district}
GET [baseurlapp]/v1/village/{id_vilagge}
```

### Pencarian Data
```
GET [baseurlapp]/search/{query}
```

### Spin up the development server:
Clone - download the project, then locate to parent directory
```
npm install
npm run dev
```
Look at your terminal, and there should be a message that the "API is listening on port 3000". For this development stage `[baseurlapp] = http://localhost:300`