---
title: Collector Service
sidebar_label: Collector Service
---

Port : `8093`

## Photo Contract


### Get A Photo

```
GET /collector/media/v1/photo_contract/:officeId/:collId/:lkhNo/:contractNo/:fileName
```

#### Description : 

Akses file foto dari suatu kontrak berdasarkan nama filenya

#### Properties :

|Name|Description|
|-|-|
|:officeId|Kode Branch Office|
|:collId|Collector ID|
|:lkhNo|Nomor LKH|
|:contractNo|Nomor contract|
|:fileName|Nama File|

#### Example : 
```
/collector/media/v1/photo_contract/0001/0016074932/DCR.2012.0012342/17387654/:fileName
```

---
### Get List Of Photo

```
GET /collector/media/v1/photo_list/:contractNo
```

#### Description :
Mendapatkan daftar foto suatu contract

#### Properties :

|Name|Description|
|-|-|
|:contractNo|Nomor contract|

#### Example : 
```
/collector/media/v1/photo_list/0016074932
```

---
## Photo Copy Contract

### Get Photo Of Copy Contract

```
GET /collector/document/v1/photo/cc
```

#### Description :

Mengambil foto copy contract

#### Properties :

|Name|Description|
|-|-|
|cc_no|Nomor Copy Contract|
|contract_no|Nomor Contract|
|photo_id|Photo Id|

#### Example : 
```
/collector/document/v1/photo/cc?cc_no=CCNo.123-345&contract_no=0016074932&photo_id=foto_bukti
```

---
### Get Photo List of Copy Contract

```
GET /collector/document/v1/photo/cc_list
```

#### Description :

Mendapatkan daftar foto copy contract

#### Properties :

|Name|Description|
|-|-|
|cc_no|Nomor Copy Contract|
|photo_id|Photo Id|

#### Example : 
```
/collector/document/v1/photo/cc_list?cc_no=CCNo.123-345&photo_id=foto_bukti
```

---
## Photo Profile

```
GET /collector/media/v1/profile_pic/:officeId/:collId
```

#### Description :

Mendapatkan profil foto collector

#### Properties :

|Name|Description|
|-|-|
|:officeId|Kode Branch Office|
|:collId|Collector ID|

#### Example : 
```
/collector/media/v1/profile_pic/0001/0016074932
```


