---
title: Update Microservice
sidebar_label: Update Microservices
---

## Prerequisites
* file `patch-services-YYYYMMDD.zip`

## Tools
1. Windows Explorer
1. Notepad
1. curl (opsional)

## Estimation
5 - 15 menit

## Step-by-step

Gunakan metode sederhana Close-Replace-Run
* Close: menutup service
* Replace: timpa file instalasi, cek file `svc.XXX.bat`
* Run: jalankan file bat

Untuk mencegah terganggunya proses di mobile client, sebaiknya update hanya dilakukan di malam hari dan performance CPU mencapai titik idle (atau di bawah 1%). Anda bisa menggunakan Task Manager Windows untuk memantau performance mesin.

1. Akses ke mesin aplikasi, pastikan direktori `C:\u11\` masih ada. Jika tidak ada, lihat [Panduan Instalasi](installation#step-by-step).

1. Stop semua service collection. Temukan service yang sedang aktif di Task Manager dari daftar berikut:
    1. Database Service
    1. Media Service
    1. Collector Service
    1. Gateway Service
    1. APK-OTA Service

    Tutup semua service dimulai dari Gateway terlebih dulu, APK-OTA, Collector, Media, dan terakhir Database. Cara menutup service lihat Panduan Menutup Microservice di bawah halaman ini.
    
1. Backup folder `C:/u11/installer/mcservices` ke lokasi lain
1. Extract All file `patch-services-YYYYMMDD.zip` ke direktori `C:\u11\`
1. Setelah Complete, jalankan file-file batch di lokasi `C:\u11\` dengan urutan:

### svc.database-xxx.bat
Perhatikan xxx biasanya mengacu ke dev atau prod.
Sebelum dijalankan. Anda perlu memeriksa isi file `svc.database.bat` untuk disesuaikan dengan konfigurasi akses database di mesin development / production.

```
REM check file jar menggunakan versi terbaru
set file=installer/mcservices/mcdb-verena1-1.1.3.jar
…
REM check password database mungkin terbaru
set dbpwd=verenamc321
```

Setelah dijalankan tunggu sampai tampil pesan berikut:
```sh
Started MCDataApplication in 20.236 seconds (JVM running for 25.817)
```

### svc.media.bat

Tunggu sampai tampil pesan berikut:
```sh
Started MCMediaApplication in 3.085 seconds (JVM running for 5.906)
```

### svc.collector.bat

Tunggu sampai tampil pesan berikut:
```sh
Started MCCollApplication in 5.654 seconds (JVM running for 9.273)
```

### svc.gateway.bat

Tunggu sampai tampil pesan berikut:
```sh
Started MCGatewayApplication in 3.72 seconds (JVM running for 6.566)
```

### svc.apk-ota.bat

Tunggu sampai tampil pesan berikut:
```sh
Serving HTTP on :: port 8000 (http://[::]:8000/) ...
```

Update selesai !

---
## Production Checklist
Struktur Folder dan File
Periksa kembali apakah struktur folder dan file menyerupai gambar berikut:

```text
c:/u11/
├── installer
│   └── apk
│   |   └── coll
│   |       ├── arm32
|   |       |   └── app-armeabi-v7a-release.apk
│   |       ├── arm64
|   |       |   └── app-arm64-v8a-release.apk
|   |       ├── x86_64
|   |       |   └── app-x86_64-release.apk
│   |       └── app-release.apk
│   └── mcservices
|       ├── mcdb-service.jar
|       ├── mccollector-service.jar
|       ├── mcmedia-service.jar
│       └── mcgateway-service.jar
├── svc.apk-ota.bat
├── svc.collector.bat
├── svc.database.bat
├── svc.gateway.bat
└── svc.media.bat
```

---
## Tes Public URL
Ada 2 port yang perlu bisa diakses ke publik. Untuk itu perlu dilakukan pengecekan untuk URL berikut :
```
https://112.78.148.118:[port-gateway]/collector/v1/get_server_info
```

```
http://112.78.148.118:[port-apk]/apk/coll/app-release.apk
```
Lihat [port](installation#configure-port)

Anda bisa menggunakan tools seperti curl atau Chrome browser untuk memastikan kedua URL di atas aktif.
```sh
C:\>curl --insecure https://112.78.148.118:[port-gateway]/collector/v1/get_server_info
{"serverDate":1609321090577}

C:\>curl http://112.78.148.118:[port-apk]/apk/coll/app-release.apk
Warning: Binary output can mess up your terminal. Use "--output -" to tell
Warning: curl to output it to your terminal anyway, or consider "--output
Warning: <FILE>" to save to a file.
```
Lihat [port](installation#configure-port)

Ketersediaan port publik di atas perlu dikoordinasikan dengan Network Administrator jika ada perubahan karena biasanya dibedakan antara port _development_ dan _production_. 
>Setup port hanya dilakukan sekali saja saat [prosedur Instalasi](installation#configure-port) di awal.

## Closing Microservice
Di Windows, masing-masing service berjalan diatas console, tutup console bisa dilakukan dengan 3 cara:
* Klik tombol X di kanan atas  
    atau 
* via **Task Manager**, dengan klik kanan service yang diinginkan, lalu **End Task**  
    atau
* Tekan kombinasi keyboard `Ctrl + C`


## Troubleshooting

Database Service - Proses terhenti di log 
```
...
HikariPool-1 - Start Completed 
```

Jika setelah ditunggu 5 menit proses tidak berlanjut yang disebabkan gagal berkomunikasi dengan database, Anda harus meminta bantuan Database Administrator untuk melakukan [_restart_](install_dbmssql#restart-database) database instance SQL SERVER via `SSMS`. Lihat Panduan [Restart Database](install_dbmssql#restart-database).



## Questions

Q: Bagaimana cara menutup service ?  
A: Masing-masing service mempunyai nama yang mudah dikenali. Di Windows, lihat bagian TaskBar dan jika mau stop Collector Service, lihat judul COLLECTOR-SERVICE →  Close Window


Q: Apa hubungan Database Service dengan SQL Server Database ?  
A: Database Service adalah microservice berbasis Java untuk basis data mobile collection.
SQL Server adalah database dari Microsoft.



Q: Mengapa Gateway Service yang terlebih dulu dimatikan ?  
A: Komunikasi dengan mobile client terjadi melalui Gateway Service. Dengan mematikan Gateway Service terlebih dulu dapat dipastikan tidak akan ada request baru sehingga update service lainnya aman untuk dilakukan.


Q: Bagaimana melakukan update untuk suatu service saja selama ada informasi spesifik ada patch untuk suatu service ?  
A: Masing-masing service biasanya memiliki 1 (satu) batch file yang berisi parameter dan informasi cara menjalankan servicenya. Lakukan hal ini jika dan hanya jika anda mempunyai cukup pengetahuan mengenai microservices dan batch file.


Q: Bagaimana jika lupa melakukan prosedur backup ?  
A: Service Mobile Collection biasanya menggunakan versioning untuk setiap patch yang dirilis sehingga tidak akan menimpa versi sebelumnya. Tindakan backup dapat dilakukan secara mandiri.


