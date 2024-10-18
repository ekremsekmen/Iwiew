# TITLE ALANI GÜNCELLEMESİ : 19 EKİM CUMARTESİ

- Tabii, title ile ilgili yapılan değişiklikleri aşağıda detaylı bir şekilde not aldım:

## Title Alanı ile İlgili Yapılan Değişiklikler

### Yeni Mülakat Oluşturma

**Endpoint:** `POST /api/interviews`

#### Yapılan Değişiklikler:
- **Yeni Alan:** `title` alanı eklendi.
- Mülakat oluştururken `title` alanı da artık gereklidir ve kullanıcıdan alınacaktır.

#### Örnek İstek:
```json
{
  "title": "Yeni Mülakat Başlığı",   // Yeni eklenen title alanı
  "questionPackageId": "670d100045785130b35d8010",   
  "canSkip": true,
  "showAtOnce": true,
  "expireDate": "2024-12-31T23:59:59Z"
}
```

#### Dönen Veri:
```json
{
  "title": "Yeni Mülakat Başlığı",  // Yeni eklenen title alanı
  "questionPackageId": "670d100045785130b35d8010",
  "totalDuration": 75,
  "link": "7dfe1473-65fc-4291-9ce9-7d0c54b21def",
  "status": "pending",
  "canSkip": true,
  "showAtOnce": true,
  "expireDate": "2024-12-31T23:59:59.000Z",
  "_id": "670d53d2bac3d2ffe5535710",
  "createdAt": "2024-10-14T17:24:34.802Z",
  "updatedAt": "2024-10-14T17:24:34.802Z",
  "__v": 0
}
```

### Tüm Mülakatları Listeleme

**Endpoint:** `GET /api/interviews`

#### Yapılan Değişiklikler:
- **Dönen Veri:** Artık her mülakatın `title` alanı da dönen veriye eklendi.

#### Örnek Dönen Veri:
```json
[
  {
    "_id": "652c95f3c3d3d053f0a3b5f2",
    "title": "Yeni Mülakat Başlığı",  // Yeni eklenen title alanı
    "questionPackageId": "652c95f3c3d3d053f0a3b5a1",
    "totalDuration": 3600,
    "link": "http://example.com/interview/abc123",
    "status": "pending",
    "createdAt": "2024-10-11T10:05:00.123Z",
    "updatedAt": "2024-10-11T10:05:00.123Z"
  }
]
```

### Belirli Bir Mülakatı ID ile Getirme

**Endpoint:** `GET /api/interviews/:id`

#### Yapılan Değişiklikler:
- **Dönen Veri:** Artık mülakatın `title` alanı da dönen veriye eklendi.

#### Örnek Dönen Veri:
```json
{
  "_id": "670b19f11a5fad306cb602f9",
  "title": "Yeni Mülakat Başlığı",  // Yeni eklenen title alanı
  "questionPackageId": {
    "_id": "6709264fcb0376a8b8b08913",
    "packageName": "ikinci soru paketi",
    "questions": [
      {
        "content": "Soru a",
        "duration": 10,
        "_id": "6709264fcb0376a8b8b08914"
      },
      {
        "content": "Soru b",
        "duration": 12,
        "_id": "6709264fcb0376a8b8b08915"
      },
      {
        "content": "backend developer",
        "duration": 2,
        "_id": "670b12200efbaeda8eb02cfb"
      }
    ]
  }
}
```

### Belirli Bir Mülakatı Link ile Getirme

**Endpoint:** `GET /api/interviews/link/:link`

#### Yapılan Değişiklikler:
- **Dönen Veri:** Artık mülakatın `title` alanı da dönen veriye eklendi.

#### Örnek Dönen Veri:
```json
{
  "title": "Yeni Mülakat Başlığı",  // Yeni eklenen title alanı
  "questions": [
    {
      "content": "Soru 1",
      "duration": 30
    },
    {
      "content": "Soru 2",
      "duration": 45
    }
  ],
  "canSkip": true,
  "showAtOnce": false,
  "totalDuration": 75
}
```

### Belirli Bir Mülakatı Silme

**Endpoint:** `DELETE /api/interviews/:id`

#### Yapılan Değişiklikler:
- Herhangi bir değişiklik yok.

### Mülakatın Durumunu Güncelleme

**Endpoint:** `PATCH /api/interviews/:id/status`

#### Yapılan Değişiklikler:
- **Dönen Veri:** Artık mülakatın `title` alanı da dönen veriye eklendi.

#### Örnek Dönen Veri:
```json
{
  "_id": "670ee871082b77ac4cc33fcb",
  "title": "Yeni Mülakat Başlığı",  // Yeni eklenen title alanı
  "questionPackageId": "670e69a8d4424e77e890ed3a",
  "totalDuration": 6,
  "link": "c4fc2fd0-ac7b-4403-98dc-69350f9705b5",
  "status": "published",
  "canSkip": true,
  "showAtOnce": true,
  "expireDate": "2024-10-15T00:00:00.000Z",
  "createdAt": "2024-10-15T22:10:57.201Z",
  "updatedAt": "2024-10-15T22:23:26.087Z",
  "__v": 0
}
```

### BU KISMI MUTLAKA OKUMALISIN ###

- İnterview oluştururken title alanı da girilmeli artık front end interview oluştururken böyle bir alan oluşturulmalı title girilebilen.
- Bu titlelar interviewların listelendiği ana sayfada her interview ın title ı olarak görüntülenecek artık.
- Sonuç olarak sadece tıtle alanını ekledik , mülakat oluşturulurken giriliyor ve bu title mülakatları listelerken görüntülerken alınıyor. 



---
---
### END ###
---
---
























---
---
---
---
---
---
---




















# ÇOK KRİTİK GÜNCELLEME !! 

- Burada kullandığımız link az önceki güncellemede interview dan aldığımız linktir. **GET** /api/interviews ile bütün mülakatları
ve mülakatın linkini alabiliriz.

- AŞAĞIDAKİNİ ÇALIŞTIRMAK İÇİN ÖNCE COPY LİNK İŞLEVİNİ YAPIP LİNKİ ALMAMIZ GEREKLİ.!

**GET** "api/interviews/link/:link"

- Amaç
- Bu rota, belirli bir mülakata ait bilgileri, mülakata özel bir bağlantı (link) kullanarak almak için kullanılır.

- İstek
- URL: GET /api/interviews/link/:link
- Parametre: :link (Mülakatın benzersiz bağlantısı, örneğin: 8d1e9be0-bd25-48a8-bef9-9c4cb0dbd9cc)

- GET /api/interviews/link/8d1e9be0-bd25-48a8-bef9-9c4cb0dbd9cc
- Cevap:

Dönen Veri:

```json
{
  "questions": [
    {
      "content": "Soru 1",
      "duration": 30
    },
    {
      "content": "Soru 2",
      "duration": 45
    }
  ],
  "canSkip": true,
  "showAtOnce": false,
  "totalDuration": 75
}
```



## END ## 


--- 
--- 
---


---
---
---
---
---
---
  -   ###### DONE ######



# İNTERVİEW STATE UPDATE OPERATİON 

- Mülakatın Durumunu Güncelleme İşlevi:  **!! PATCH İSTEĞİ ATILIYOR DİKKAT !!**

  -	**(PATCH)** /api/interviews/:id/status:
	-	Bu rota, belirli bir mülakatın durumunu güncellemeyi sağlar (örneğin, pending, published, unpublished).
	-	İstek örneği aşağıdaki gibi olabilir:

```json 
{
  "status": "published"
}
```

•	İstek atıldığında dönen cevap:

```json 
{
  "_id": "670ee871082b77ac4cc33fcb",
  "questionPackageId": "670e69a8d4424e77e890ed3a",
  "totalDuration": 6,
  "link": "c4fc2fd0-ac7b-4403-98dc-69350f9705b5",
  "status": "published",
  "canSkip": true,
  "showAtOnce": true,
  "expireDate": "2024-10-15T00:00:00.000Z",
  "createdAt": "2024-10-15T22:10:57.201Z",
  "updatedAt": "2024-10-15T22:23:26.087Z",
  "__v": 0
}
```
  - •	ÖNEMLİ NOT: İstek body’sinde “status” alanı published ya da unpublished olarak belirtilmelidir. Eğer farklı bir değer verilirse, sistem hata dönecektir:
	- "Geçersiz durum değeri" şeklinde hata alırsınız.

  - Bu işlev sayesinde mülakatlar üzerinde yayında olup olmadığını kontrol etme ve değiştirme gibi işlemler yapılabilir.


---
---
---
---

# * OLD *

 **(POST)** `/api/interviews`: Bu rotaya aşağıdaki gibi içerikle post isteği atıldığında yeni bir mülakat oluşturulur.
 - Önceden "canSkip" , "showAtOnce" ,  "expireDate" gibi alanlarımız yoktu mülakat oluştururken bunları ekledik.
 - Artık mülakat oluşturma ekranında bu parametreler de verilerek mülakat oluşturulur. 

 - !! ÖNEMLİ NOT : Buradaki expireDate parametresi expireDate: { type: Date, required: true }, olarak oluşturulmuştur.Yani değer girilmezse ya da  yanlış girilirse , hata verecektir.
 - !! ÖNEMLİ NOT : canSkip parametresi ;  default: false olarak ayarlanmıştır.        // Varsayılan: Geçme hakkı yok
 - !! ÖNEMLİ NOT : showAtOnce , parametresi ; default: false olarak ayarlanmıştır.     // Varsayılan: Sıralı göster
    

```json 
{
  "questionPackageId": "670d100045785130b35d8010",   
  "canSkip": true,
  "showAtOnce": true,
  "expireDate": "2024-12-31T23:59:59Z"
}
```

- İstek atıldığında dönen veri budur : 

```json 

{
    "questionPackageId": "670d100045785130b35d8010",
    "totalDuration": 2,
    "link": "7dfe1473-65fc-4291-9ce9-7d0c54b21def",
    "status": "pending",
    "canSkip": true,
    "showAtOnce": true,
    "expireDate": "2024-12-31T23:59:59.000Z",
    "_id": "670d53d2bac3d2ffe5535710",
    "createdAt": "2024-10-14T17:24:34.802Z",
    "updatedAt": "2024-10-14T17:24:34.802Z",
    "__v": 0
}

```


---

---





- **Interview Soru Paket Bilgisi Dönme İşlevi:**

  - Postman ile test edildi çalışıyor.
  - Interview ekranındaki herhangi bir karttaki soru işareti butonuna tıklandığında, interview'a ait soru paketi ismi ve içerdiği sorular döner.
  - **(GET)** `/api/interviews/:id`: Bu API, belirli bir mülakata ait bilgileri ve soru paketini döner.
  - **İstek:** GET `/api/interviews/:id`
    - Buradaki `id`, mülakatın ID'sidir.
  - **Dönen Cevap:**

    ```json
    {
      "_id": "670b19f11a5fad306cb602f9",
      "questionPackageId": {
        "_id": "6709264fcb0376a8b8b08913",
        "packageName": "ikinci soru paketi",
        "questions": [
          {
            "content": "Soru a",
            "duration": 10,
            "_id": "6709264fcb0376a8b8b08914"
          },
          {
            "content": "Soru b",
            "duration": 12,
            "_id": "6709264fcb0376a8b8b08915"
          },
          {
            "content": "backend developer",
            "duration": 2,
            "_id": "670b12200efbaeda8eb02cfb"
          }
        ]
      }
    }
    ```

---

## **Interview Yönetim Rotaları:**

- **(POST)** `/api/interviews`:  
  - **Yeni mülakat oluşturma.**
  - Mevcut soru paketlerinden biri seçilerek mülakat oluşturulur.

- **(GET)** `/api/interviews`:  
  - **Tüm mülakatları listeleme.**
  - **Dönen Cevap:**
  
    ```json
    {
      "_id": "652c95f3c3d3d053f0a3b5f2",
      "questionPackageId": "652c95f3c3d3d053f0a3b5a1",
      "totalDuration": 3600,
      "link": "http://example.com/interview/abc123",
      "status": "pending",
      "createdAt": "2024-10-11T10:05:00.123Z",
      "updatedAt": "2024-10-11T10:05:00.123Z"
    }
    ```

- **(GET)** `/api/interviews/:link`:  
  - **Belirli bir mülakatı link ile getirme.**

- **(DELETE)** `/api/interviews/:id`:  
  - **Belirli bir mülakatı silme.**

- **(PATCH)** `/api/interviews/:id/status`:  
  - **Mülakatın durumunu (yayında/yayında değil) güncelleme.**

---

### **Kimlik Doğrulama Rotaları:**
- **POST** `/api/auth/login`:  
  Kullanıcı girişini gerçekleştirir.
- **POST** `/api/auth/logout`:  
  Kullanıcı oturumunu sonlandırır.

---

### **Soru Paketleri Rotaları:**

- **POST** `/api/packages/`:  
  Yeni bir soru paketi oluşturur.

- **GET** `/api/packages/`:  
  Tüm soru paketlerini listeler.

- **PUT** `/api/packages/:id`:  
  Belirtilen paket `id` ile güncelleme yapar.

- **DELETE** `/api/packages/:id`:  
  Belirtilen paket `id` ile siler.

- **DELETE** `/api/packages/:packageId/questions/:questionId`:  
  Paketten soruyu siler.
