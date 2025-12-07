import http from "k6/http";
import { check, sleep } from "k6";

// Konfigurasi opsi pengujian:
export const options = {
  // vus: Virtual Users (jumlah pengguna virtual yang berjalan secara paralel)
  // duration: Durasi pengujian
  vus: 1200,
  duration: "30s",
  // Tahapan beban (Stages) - untuk skenario yang lebih kompleks
//   stages: [
//     { duration: "10s", target: 500 }, // Naikkan ke 50 VUs dalam 10 detik
//     { duration: "20s", target: 500 }, // Pertahankan 50 VUs selama 20 detik
//     { duration: "5s", target: 0 }, // Turunkan ke 0 VUs dalam 5 detik
//   ],
};

// Fungsi default adalah iterasi yang akan dijalankan oleh setiap Virtual User
export default function () {
  // Ganti 'http://localhost:3000/api/endpoint' dengan endpoint Node.js Anda
  const res = http.get("http://localhost:3000/api/v1/provinces");

  // Lakukan pengecekan (assertions) pada respons
  check(res, {
    "status is 200": (r) => r.status === 200,
    "response body is not empty": (r) => r.body.length > 0,
  });

  // Jeda sebentar sebelum iterasi berikutnya (simulasi jeda berpikir pengguna)
  //sleep(1);
}
