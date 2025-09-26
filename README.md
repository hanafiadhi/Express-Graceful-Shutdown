# Express Graceful Shutdown Example

Proyek ini adalah contoh sederhana implementasi **graceful shutdown** pada server **Express.js**.  
Tujuannya adalah memastikan bahwa ketika server mengalami error fatal, server tidak langsung mati mendadak, tetapi:
- Menolak request baru
- Menunggu request yang sedang berjalan selesai
- Baru kemudian menutup server

## Fitur
- **Middleware Shutdown Check** → menolak request baru dengan `503` jika server sedang shutdown.
- **/create (POST)** → selalu memicu error dan memulai proses shutdown.
- **/data (GET)** → simulasi query lama (10 detik), tetap diproses meskipun server sudah dalam status shutdown.

## Cara Menjalankan
1. Clone repo:
   ```bash
   git clone <url-repo-kamu>
   cd <nama-folder>
   ```
   
2. Install dependency:
   ```bash
   npm install
   ```

3. Jalankan server:
    ```bash
    node index.js
    ```

4. Akses endpoint:
    ```bash
    POST http://localhost:3000/create → akan memicu error & memulai shutdown.
    GET http://localhost:3000/data → akan menunggu 10 detik lalu membalas { data: "hello" }.
    ```