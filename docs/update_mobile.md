---
title: Update Mobile
sidebar_label: Update Mobile
---

## Prerequisites
1. File `patch-apk-buildnumber-6.zip`
1. Informasi build number: 6 (enam)

## Tools
* Windows Explorer
* SSMS

## Step-by-step

1. Akses ke mesin aplikasi, pastikan direktori `C:\u11\` masih ada. Jika tidak ada, lihat Panduan Instalasi Aplikasi.
1. Backup folder `C:\U11\installer\apk` ke lokasi lain
1. Extract file `patch-apk.zip` ke direktori `C:\u11\`

1. Pastikan terdapat 4 (empat) file di lokasi berikut:

    |No|Nama file|Estimasi ukuran|Penempatan direktori|
    |--|---------|---------------|--------------------|
    |1|app-arm64-v8a-release.apk|14 MB|C:\u11\installer\apk\coll\arm64|
    |2|app-armeabi-v7a-release.apk|14 MB|C:\u11\installer\apk\coll\arm32|
    |3|app-release.apk|37 MB|C:\u11\installer\apk\coll|
    |4|app-x86_64-release.apk|14 MB|C:\u11\installer\apk\coll\x86_64|

1. Persiapkan informasi build number seperti di prasyarat no 2.
1. Login ke aplikasi SSMS, buka koneksi ke database `collmobile`, cari table `[dbo].[mc_mst_mobile_setup]`
1. Klik kanan table `dbo.mc_mst` → Edit Top 200 Rows
1. Cari 4 keyname berikut, ubah angka yang berwarna merah di kolom value1 disesuaikan dengan informasi build number di prasyarat nomor 2.

    |keyname|value1|value2|
    |-------|------|------|
    |VERSION_COLL_FL_ANDROID|6|http://112.78.148.118:****/apk/coll/app-release.apk|
    |VERSION_COLL_FL_ANDROID_ARM32|6|http://112.78.148.118:****/apk/coll/arm32/app-armeabi-v7a-release.apk|
    |VERSION_COLL_FL_ANDROID_ARM64|6|http://112.78.148.118:****/apk/coll/arm64/app-arm64-v8a-release.apk|
    |VERSION_COLL_FL_ANDROID_X86_64|6|http://112.78.148.118:****/apk/coll/x86_64/app-x86_64-release.apk|

    #### Deskripsi kolom :
    1. keyname (text / readonly) : nama parameter yang merepresentasikan jenis-jenis APK berdasarkan arsitekturnya. 
    1. value1 (numeric) untuk informasi build number. angka ini biasanya akan selalu bertambah sejalan dengan update aplikasi
    1. value2 (text / readonly) : link URL supaya bisa diunduh oleh aplikasi mobile. Pastikan URLnya valid dan bisa diunduh. Lihat Penjelasan URL di bawah.

    #### Penjelasan URL :
    Format URL berbentuk seperti berikut:
    ```
    http://[*IP-Publik]:8000/apk/coll/[subpath]/[namafile.apk]
    ```

    >IP-Publik bisa saja berubah-ubah tergantung kebijakan Network Administrator.  Penggunaan IP akan dipakai oleh mobile untuk memperbarui dirinya sendiri (self-update) pada saat login online.
    
    Untuk memastikan URL benar bisa menggunakan tools seperti curl atau browser Chrome seperti contoh berikut:
    ```sh
    $ curl http://112.78.148.118:8000/apk/coll/app-release.apk
    ```
    
    Peringatan ! Jangan membagikan informasi URL ini kepada siapapun yang tidak berkeperluan. 

    URL tersebut hanya diakses oleh aplikasi mobile.


---
## Questions

Q: Apakah perlu restart mesin server ?  
A: Tidak diperlukan.

Q: Apakah perlu restart service ?  
A: Tidak diperlukan.

Q: Bagaimana cara menutup microservice ?  
A: Misalkan mau menutup service Collector, lihat bagian TaskBar dan lihat judul COLLECTOR-service -> Close Window


---
## Lampiran

Opsi Update table via SQL Query
```
update mc_mst_mobile_setup set value1 = @buildnumber value2 = 'http://112.78.148.118:8000/apk/coll/app-release.apk' where keyname = 'VERSION_COLL_FL_ANDROID'
 
update mc_mst_mobile_setup set value1 = @buildnumber value2 = 'http://112.78.148.118:8000/apk/coll/arm32/app-armeabi-v7a-release.apk' where keyname = 'VERSION_COLL_FL_ANDROID_ARM32'
 
update mc_mst_mobile_setup set value1 = @buildnumber value2 = 'http://112.78.148.118:8000/apk/coll/arm64/app-arm64-v8a-release.apk' where keyname = 'VERSION_COLL_FL_ANDROID_ARM64'
 
update mc_mst_mobile_setup set value1 = @buildnumber value2 = 'http://112.78.148.118:8000/apk/coll/x86_64/app-x86_64-release.apk' where keyname = 'VERSION_COLL_FL_ANDROID_X86_64'
```


