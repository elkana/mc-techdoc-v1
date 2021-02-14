---
title: Install Java & Python
sidebar_label: Install Java&Python
---

## Prerequisites
1. JDK 11 Offline Installer. Unduh di https://jdk.java.net/java-se-ri/11
1. Python 3 Offline Installer. Unduh di https://www.python.org/downloads/windows/

---
## Introduction
Panduan saat dokumen ini dibuat menggunakan versi minimum (JDK 11 dan Python 3).

Dengan alasan keamanan versi terbaru dari JDK dan Python biasanya direkomendasikan. Silahkan konsultasi dengan vendor apakah versi terbaru dapat mendukung kompatibilitas dengan sistem Mobile Collection.

Anda dapat langsung lompat ke bagian [Cek Instalasi Berhasil](#cek-instalasi-berhasil) untuk memastikan Java & Python telah terinstal di mesin.

>Instalasi Java & Python dilakukan di mesin aplikasi (bukan mesin database).

---
## Instalasi Java
1. Extract file `openjdk.zip` ke `c:\Program Files\`
1. Cek Java sudah terinstall di lokasi 


### Edit Environment Variables `PATH`

1. Tekan kombinasi keyboard `Win + R`
1. Paste perintah cepat berikut untuk membuka layar `Environment Variables`

    ```
    rundll32.exe sysdm.cpl,EditEnvironmentVariables
    ```

1. Di layar Environment Variables, klik tombol `Edit`
1. Di layar Edit User Variable, sisipkan `C:\Program Files\jdk-11\bin`  di bagian depan sehingga menyerupai tampilan berikut :

    Edit variable Path

1. Klik Ok, Selesai.



### Create Environment Variables `JAVA_HOME`

1. Tekan kombinasi keyboard `Win + R`
1. Paste perintah cepat berikut untuk membuka layar `Environment Variables`

    ```
    rundll32.exe sysdm.cpl,EditEnvironmentVariables
    ```

1. Di layar Environment Variables, klik tombol `New`
1. Di layar Edit User Variable, buat System Variable baru :

    | Name | Value |
    | - | - |
    | JAVA_HOME | C:\Program Files\jdk-11\ |

1. Klik Ok, Selesai.

---
## Instalasi Python

Klik ganda file `python.exe`

- Centang Add Python to PATH
- Klik Install Now

## Cek Instalasi Berhasil

```sh
$ java -version
```

```sh
$ python --version
```



