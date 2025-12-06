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

## Menjalankan

