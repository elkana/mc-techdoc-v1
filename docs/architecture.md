---
title: Architecture
sidebar_label: Architecture
---


## Mobile
Diperlukan sistem operasi Android minimal Marshmallow dengan pertimbangan target market dan keamanan.
Dari piranti handphone, aplikasi mobile collection hanya dapat berkomunikasi ke mesin staging via internet. Di dalam aplikasinya sudah terdapat dukungan self-update / OTA (Over-The-Air) pada saat login online.

Bagaimana cara OTA bekerja ?
1. Pastikan APK-OTA Service di mesin staging berjalan tanpa kendala.
1. Pastikan url berikut dapat diunduh menggunakan browser Chrome
    1. http://IP:Port/apk/coll/app-release.apk
    1. url ini hanya untuk cek dan tidak diperuntukkan dibagikan ke siapapun.
1. Di Android Mobile karena aplikasi mobile collection dapat bekerja secara online-offline, maka OTA update hanya terjadi pada saat login online, sehingga tidak mengganggu operasional collector dalam melakukan kunjungan.

Login online hanya terjadi jika kondisi berikut :
1. Pertama kali penggunaan aplikasi
1. Pasca Closebatch
1. Reset Local Data

---
## Mesin Staging

Di bagian staging ini terdiri atas:
Database SQL Server
Beberapa microservice seperti Gateway Service, Collector Service, Database Service, Media Service, dan APK-OTA Service

### Gateway Service
Service ini merupakan layanan terdepan dan diakses oleh publik untuk melayani request/response dengan aplikasi di mobile dan web monitoring.  

Gateway-Service akan meneruskan request ke beberapa service yang aktif di mesin staging.  

Tanpa service ini, aplikasi mobile masih dapat beroperasi secara offline. 
Service ini juga sudah menggunakan SSL untuk mengamankan komunikasi ke client.

Menggunakan Port Public `7443`

### Collector Service
Service ini berfungsi untuk melakukan proses bisnis collection . Di dalamnya terdapat proses sinkronisasi data, mengambil LKH harian, dan  

Service ini berkomunikasi dengan Media-Service untuk layanan multimedia dan Database-Service untuk menyimpan data.

Menggunakan Port Private `8081`

### Media Service
Service ini berjalan sendiri tanpa tergantung dengan service lainnya dan hanya diperuntukkan untuk melayani data multimedia seperti foto, gambar dan logo. 

Tanpa service ini, aplikasi mobile tidak dapat menampilkan upload/download foto-foto yang diperlukan selama kunjungan. 

Menggunakan Port Private `8083`

### Database Service
Service ini merupakan layanan terpenting dalam menyediakan data bisnis dan berjalan sendiri tanpa tergantung dengan service lainnya.

Tanpa service ini, aplikasi mobile tidak dapat melakukan sinkronisasi data dengan baik.

Menggunakan Port Private `8082`

Di production, database SQL Server dapat berada di mesin terpisah dengan mesin microservices. Sedangkan development biasanya masih berada di mesin yang sama dengan microservices.

### APK-OTA Service
Service ini khusus disediakan untuk proses OTA(Over-The-Air) update jika ada permintaan dari mobile.

Tanpa service ini, aplikasi mobile tidak dapat dilakukan pembaruan jika ada.
Menggunakan Port public `8000`

Microservice dapat berjalan secara independen, loose coupling dan scalability.  Karena ada beberapa service yang berjalan, bisa saja salah satu service mengalami gangguan sehingga perlu dilakukan maintenance untuk service tersebut tanpa mengganggu service lainnya.

Sistem Mobile Collection membutuhkan server staging untuk query dan menyimpan data collection dari / dan ke mobile. 

Proses dari core nantinya bertanggung jawab untuk menyuplai / mengambil data via database staging.

---
## Mesin Core
Bagian ini berisi database core dan banyak proses yang bertugas untuk mengambil dan menyuplai data dari / ke mesin staging.



