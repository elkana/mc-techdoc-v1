---
title: Installation and Configuration
sidebar_label: Installation & Configuration
---

## Prerequisites

1. 1 (satu) file<code>mc-installation.zip</code>
1. Windows Server 2012
1. JDK 11 & Python 3 (Lihat [Installation Java & Python](install_java_python))
1. SQL Server Database, database collmobile. (Lihat [Installation Database CollMobile](#))

---

## Tools

1. Windows Explorer
1. SSMS (SQL Server Management Studio) v17.9.1
1. Notepad
1. <code>curl</code> atau browser Chrome
 
---

## Introduction

Panduan ini di-instal di mesin aplikasi yang memiliki drive <code>C:</code> dan <code>E:</code>.  
Drive <code>C:</code> dipakai untuk menyimpan APK, Microservices dan System Logs.  
Drive <code>E:</code> dipakai untuk menyimpan foto-foto yang diupload oleh mobile collection dan backup.

---

## Step-by-step

1. Buat 2 direktori baru, <code>c:\u11\</code> & <code>e:\u01\</code>
1. Extract file <code>mc-installation.zip</code> ke <code>c:\u11\</code>
1. Instalasi selesai ! Cek isi folder <code>c:\u11\</code> seperti berikut:
```text
c:/u11/
├── installer
│   └── apk
│   |   └── coll
│   |       ├── arm32
│   |       ├── arm64
|   |       ├── x86_64
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
## CONFIGURE ANDROID MOBILE

Konfigurasi Android mobile dilakukan di table setup supaya service APK-OTA dapat mengaktifkan versi APK terbaru.
1. Login ke database menggunakan aplikasi SSMS.
1. Cek table [<code>dbo.mc_mst_mobile_setup</code>](lampiran_tbl_setup) lalu konfigurasi untuk parameter berikut :

|keyname |value1 | value2 | description |
|-|:-:|-|-|
| VERSION_COLL_FL_ANDROID | 5 |http://202.59.166.132:8000/apk/coll/app-release.apk |Lokasi file apk generic |
| VERSION_COLL_FL_ANDROID_ARM32 | 5 |http://202.59.166.132:8000/apk/coll/arm32/app-armeabi-v7a-release.apk |Lokasi file apk 32 bit |
| VERSION_COLL_FL_ANDROID_ARM64 | 5 |http://202.59.166.132:8000/apk/coll/arm64/app-arm64-v8a-release.apk |Lokasi file apk 64 bit |
| VERSION_COLL_FL_ANDROID_X86_64 | 5 |http://202.59.166.132:8000/apk/coll/x86_64/app-x86_64-release.apk |Lokasi file apk untuk processor intel |

###
Perhatikan di kolom value1 dan value2 dimana :
- value1 : menunjukkan angka build number yang terbaru. Angka ini dipakai untuk dibandingkan dengan versi APK yang terinstal di piranti Android.
- value2 : menunjukkan public URL dari apk tertentu yang akan diunduh oleh mobile.


---
## CONFIGURE MICROSERVICE

1. Di sisi layanan server, sistem Mobile Collection menggunakan microservices yang saling terintegrasi namun dapat berjalan secara independen.
Untuk menjalankan sebuah service nantinya cukup dengan klik ganda file batch (<code>*.bat</code>)

1. Masing-masing service berjalan menggunakan port yang telah ditentukan.

  :::caution

  Pastikan jangan sampai terdapat lebih dari satu service yang sama karena dapat terjadi bentrokan antar port.

  :::

Berikut ini ada 5 (lima) file batch yang wajib dijalankan:
  1. [svc.database-xxx.bat](#svcdatabase-xxxbat)
  1. [svc.media.bat](#svcmediabat)
  1. [svc.collector.bat](#svccollectorbat)
  1. [svc.gateway.bat](#svcgatewaybat)
  1. [svc.apk-ota.bat](#svcapk-otabat)

---
### svc.database-xxx.bat

XXX menunjukkan mesin database yang dituju apakah development / uat / production. Gunakan aplikasi Notepad untuk melihat isi file.
```
@echo off
set file=installer/mcservices/mcgateway-service.jar
start "GATEWAY-service" java -jar -Dlocalhost=localhost -Dlogging.file.name
```
|Key |Deskripsi | 
|-|-|
| file   | Lokasi file <code>.jar</code> untuk service database. Biasanya mengacu ke versi terbaru. | 
| dbip   | Nama database    |
| dbname | Login user database    |
| dbname | Login user database    |
| dbddl  | Create : skema database akan di drop untuk kemudian di create ulang. <br/> Update : skema database akan di update. (production only).<br/><br/>Defaultnya update.    |
| start ... | Susunan perintah Windows untuk mengeksekusi file <code>.jar</code> |

Jika ada perubahan konfigurasi database, cukup diubah variable <code>dbip</code>, <code>dbname</code>, <code>dbuser</code>, <code>dbpwd</code>.

Konsultasikan dengan **Database Administrator** untuk informasi aksesnya.
Setiap perubahan variabel harus dilakukan restart service.

---
### svc.media.bat
```
@echo off
set file=installer/mcservices/mcgateway-service.jar
start "GATEWAY-service" java -jar -Dlocalhost=localhost -Dlogging.file.name
```
Script di atas menunjukkan beberapa variabel sbb :

|Key |Deskripsi | 
|-|-|
| file      | Lokasi file jar untuk service media. Biasanya mengacu ke versi terbaru. | 
| dircontract      | Lokasi direktori untuk foto-foto contract, documents |
| dirpoa | Lokasi direktori untuk foto saat tiba di lokasi penagihan |
| dircollectorprofile | Lokasi direktori untuk foto-foto collector |
| dirsupervisorprofile | Lokasi direktori untuk foto-foto supervisor |
| dircustomerprofile | Lokasi direktori untuk foto-foto customer |
| start ... | Susunan perintah Windows untuk mengeksekusi file <code>.jar</code> |

Seperti terlihat, root direktori untuk menampung foto-foto berada di lokasi <code>E:/u01/</code>. Setiap perubahan variabel harus dilakukan restart service.

---
### svc.collector.bat
```
@echo off
set file=installer/mcservices/mcgateway-service.jar
start "GATEWAY-service" java -jar -Dlocalhost=localhost -Dlogging.file.name
```
Script di atas menunjukkan beberapa variabel sbb :

|Key |Deskripsi | 
|-|-|
| file      | Lokasi file jar untuk service media. Biasanya mengacu ke versi terbaru. | 
| start ... | Susunan perintah Windows untuk mengeksekusi file <code>.jar</code> |

Setiap perubahan variabel harus dilakukan restart service.

---
### svc.gateway.bat
```
@echo off
set file=installer/mcservices/mcgateway-service.jar
start "GATEWAY-service" java -jar -Dlocalhost=localhost -Dlogging.file.name
```
Script di atas menunjukkan beberapa variabel sbb :

|Key |Deskripsi | 
|-|-|
| file      | Lokasi file jar untuk service gateway. Biasanya mengacu ke versi terbaru. | 
| start ... | Susunan perintah Windows untuk mengeksekusi file <code>.jar</code> |

Setiap perubahan variabel harus dilakukan restart service.

---
### svc.APK-OTA.bat

Untuk file batch ini tidak ada yang perlu dikonfigurasi.

---
## CONFIGURE PORT

Diperlukan 2 (dua) port yang perlu dibuka untuk public di mesin aplikasi. Kedua port tersebut akan di mapping ke _private_ port oleh Network Administrator.

Sebagai contoh lihat tabel port berikut :

|Port Public|Port Private<br/>(Tidak boleh diubah)|Nama Service|
|-|:-:|-|
|8000 (contoh)|8000|[apk-ota service](#svcapk-otabat)|
|7043 (contoh)|7443|[gateway-service](#svcgatewaybat)|
|blocked|8093|[collector-service](#svccollectorbat)|
|blocked|8123|[media-service](#svcmediabat)|
|blocked|8092|[database-service](#svcdatabase-xxxbat)|

Maka berdasarkan port public di atas untuk pengecekan public URL yang harus dapat diakses sebagai berikut :

```sh
$ curl --insecure https://112.78.148.118:7043/collector/v1/get_server_info

$ curl http://112.78.148.118:8000/apk/coll/app-release.apk
```
>  Jika tidak ada curl, bisa paste URL di browser Chrome)

<br/>

:::important

Jika ada masalah dengan port, konsultasikan dengan Network Administrator.

:::

---
## Questions

Q: Apakah versi SSMS bisa menggunakan versi terbaru ?  
A: Belum tentu, biasanya tergantung versi Operating Systems yang dipakai. Dokumen ini pada saat dibuat dikondisikan menggunakan Windows Server 2012 dan database SQL Server 2016.
