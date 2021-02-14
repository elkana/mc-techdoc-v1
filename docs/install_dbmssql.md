---
title: Install Database CollMobile
sidebar_label: Install DB CollMobile
---

## Prerequisites
* SQL Server Database 2014

## Tools
* SSMS (SQL Server Management Studio) v17.9.1

---
## Introduction
Panduan ini berisi cara :
1. Membuat database dengan nama `collmobile`
1. Membuat user baru dengan nama `verenamc`

---
## Create `collmobile`
1. Login ke aplikasi SSMS menggunakan Windows Authentication
1. Setup Database Properties, ke bagian Security
1. Klik kanan Database di Object Explorer, pilih **New Database....**
1. Di layar New Daatbase, isi di kotak Database name: `collmobile`


## Create User `verenamc`
1. via Object Explorer, klik kanan Security --> Logins, pilih **New Login...**
1. Di layar Login, isi di Login name: `verenamc`  
    Centang **SQL Server authentication**  
    Silakan isi password: ********
1. Pilih User Mapping, pastikan database `collmobile` tercentang  
    Database role membership: `db_owner` & `public`
1. Klik OK, selesai.

---
## Ganti Port ke 9022
1. Buka aplikasi SQL Server Configuration Manager
1. Akses menu SQL Server Network Configuration -> Protocols for SQLEXPRESS  
    Pastikan TCP/IP Enabled  
    Akses TCP/IP Properties, pilih Tab IP Addresses, scroll ke bawah sampai ke bagian IPALL, isi/ganti TCP Port ke 9022, seperti terlihat gambar berikut :
1. Selesai ganti port, lakukan [Restart Database](#restart-database)

---
## Restart Database
Untuk merestart database SQLServer ada 2 cara :
1. Login ke SSMS, di Object Explorer, klik kanan Server Database, pilih menu **Restart**
1. Atau, via aplikasi SQL Server Configuration Manager.  
    Pilih SQL Server Services -> klik kanan SQL Server -> pilih menu **Restart**




