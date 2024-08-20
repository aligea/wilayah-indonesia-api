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
GET [baseurlapp]/districts/{id_regency}
GET [baseurlapp]/district/{id_district}
```

Desa/Kelurahan

GET [baseurlapp]/vilagges/{id_district}

GET [baseurlapp]/village/{id_vilagge}

### Pencarian Data
`GET [baseurlapp]/search/{query}`






Spin up the development server:

```
npm run dev
```
Look at your terminal, and there should be a message that the "API is listening on port 3000".