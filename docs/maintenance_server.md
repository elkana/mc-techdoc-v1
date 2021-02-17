---
title: Maintenance Server
sidebar_label: Maintenance Server
---

## Restart Services
Temukan service dari daftar berikut yang ingin dilakukan restart :
1. Database Service
1. Media Service
1. Collector Service
1. Gateway Service
1. APK-OTA (Over-The-Air) Service

Di Windows, masing-masing service berjalan di atas console, tutup console dengan mengklik tombol X di kanan atas.

atau...

via **Task Manager**, dengan klik kanan service yang diinginkan, lalu **End Task**

Setelah itu jalankan kembali file `svc.[nama service].bat` yang diinginkan.

---
## Questions

Q: Apakah aman jika restart suatu service tidak akan mengganggu service lainnya ?  
A: Cukup cek via Task Manager, jika proses CPU idle / CPU 0%, maka service yang akan di restart dapat dimatikan.

Q: Jika mesin server mati atau di restart, service apa saja yang harus dinyalakan setelah login OS ?  
A: Total ada 5 (lima) file batch yang harus dijalankan :
1. c:\u11\svc.database-xxx.bat
1. c:\u11\svc.media.bat
1. c:\u11\svc.collector.bat
1. c:\u11\svc.gateway.bat
1. c:\u11\svc.apk-ota.bat
1. c:\u11\apache-tomcat-9.0.37\bin\startup.bat

---
## Clean up Cache Data Master

Dengan alasan performance, data-data master akan di refresh oleh Job scheduler yang aktif tiap hari pukul tengah malam. 

Sehingga jika ada perubahan di data master akan efektif di **H+1**.
Job ini dijalankan oleh Database Service.

Untuk kondisi tertentu yang memerlukan refresh secepatnya, bisa dilakukan dengan cara memanggil url API intranet:

```ssh
$ curl http://192.168.100.26:[port-db]/data/setup/v1/clean_cache
```
Lihat [port-db](installation#configure-port)

Jika berhasil akan tampak responnya seperti :
```
Run Clean Cache at 2020-12-16T13:47:26.446466
```

---
## Update Per-Service

Anda juga dapat melakukan update suatu service saja tanpa perlu me-restart semua service.  

Masing-masing service dapat berjalan secara loose coupling / portable sehingga suatu service dapat di-update tanpa harus mematikan service yang lainnya.  

Untuk panduan update lihat Dokumen Panduan [Update Android](update_mobile) dan Dokumen Panduan [Update Service](update_microsvc).

---
## Restart Database SQL Server Instance

Login via SSMS, via Object Explorer, klik kanan nama Instance, pilih menu **Restart**