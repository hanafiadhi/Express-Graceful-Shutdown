# Express Graceful Shutdown Example

Proyek ini adalah contoh sederhana implementasi **graceful shutdown** pada server **Express.js**.  
Tujuannya adalah memastikan bahwa ketika server mengalami error fatal, server tidak langsung mati mendadak, tetapi:
- Menolak request baru
- Menunggu request yang sedang berjalan selesai dan setiap request akan mengembalikan response
- Baru kemudian menutup server

## Fitur
- **Middleware Shutdown Check** → menolak request baru dengan `503` jika server sedang shutdown.
- **/data (GET)** → simulasi query lama (10 detik), tetap diproses meskipun server sudah dalam status shutdown.

## Cara Menjalankan
1. Clone repo:
   ```bash
   git clone <url-repo-kamu>
   cd <nama-folder>
   ```
   
2. buka terminal:
   ```bash
   docker compose up --build
   ```
   ![alt text](<Screen Shot 2025-10-02 at 16.09.15.png>)

3. Hit Endpoint:
    ```bash
    http://localhost:3000/data/user/
    ```

4. buka terminal Baru:
    ```bash
    docker compose stop app
    ```
    ![alt text](<Screen Shot 2025-10-02 at 16.27.38.png>)
   
5. Hit Endpoint:
    ```bash
    http://localhost:3000/create/
    ```
    Kenapa muncul ECONNRESET?
    Karena:
      Container sudah berhenti total akibat docker compose stop app.
      Jadi ketika kamu akses http://localhost:3000/create/, tidak ada server yang listening di port 3000.Akibatnya koneksi TCP ditolak/diputus → Node/axios/curl menampilkan ECONNRESET.
6. Setelah request http://localhost:3000/data/user/ mengembalikan response maka server baaru akan di matikan secar total
   ![alt text](image.png)