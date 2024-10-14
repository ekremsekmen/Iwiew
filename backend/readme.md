# GÜNCELLEME !!! YENİ İŞLEV EKLENDİ !


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
