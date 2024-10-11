# GÜNCELLEME !!!

### Interview Bütün İşlevler Postman ile Test Edildi, Çalışıyor  

Interview yönetim rotaları `/api/interviews` altında toplandı:

---

### **Interview Yönetim Rotaları:**

- **(POST)** `/api/interviews`:  
  **Yeni mülakat oluşturma**  
  - Mevcut soru paketlerinden biri seçilerek POST isteği yapılır.
  - Yani, backend'den mevcut soru paketleri alınır ve bu listeden mülakat için istenen soru paketi seçilir.
  - Seçildikten sonra, `/api/interviews` yoluna seçilen soru paketi POST isteği olarak atılır ve yeni mülakat oluşturulur.

  _**Not:** Backend'den mevcut soru paketlerini çekip, question management ekranında görebiliriz. `/api/packages` rotasına GET isteği yaparak tüm soru paketlerini listeleyebiliriz._

- **(GET)** `/api/interviews`:  
  **Tüm mülakatları listeleme** 

 ### Tüm Mülakatları Listeleme

**BURADA DÖNEN CEVAP BU ŞEKİLDEDİR, (ÖRNEK OLARAK) BURAYA DİKKAT!! MÜLAKAT SÜRESİ DE DÖNDÜRÜLÜYOR.**

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

- **(GET)** `/api/interviews/:link`:  
  **Belirli bir mülakatı link ile getirme**  
  - _Link, adaylara iletilebilecek mülakatın linkidir._

- **(DELETE)** `/api/interviews/:id`:  
  **Belirli bir mülakatı silme**

- **(PATCH)** `/api/interviews/:id/status`:  
  **Mülakatın durumunu güncelleme (yayında/yayında değil durumu)**

---

### **Rotalarda Yapılan İşlemler:**

#### 1. **Kimlik Doğrulama (Authentication) Rotaları**
- **POST** `/api/auth/login`:  
  Kullanıcı girişini gerçekleştirir. Kullanıcı adı ve şifre doğrulaması yapılır.

- **POST** `/api/auth/logout`:  
  Kullanıcı oturumunu sonlandırır ve başarılı bir çıkış mesajı döner.

#### 2. **Soru Paketleri (Question Packages) Rotaları**
- **POST** `/api/packages/`:  
  Yeni bir soru paketi oluşturur.

- **GET** `/api/packages/`:  
  Tüm soru paketlerini listeler.

- **PUT** `/api/packages/:id`:  
  Belirtilen paket `id` ile soru paketini günceller.

- **DELETE** `/api/packages/:id`:  
  Belirtilen paket `id` ile soru paketini siler.

- **DELETE** `/api/packages/:packageId/questions/:questionId`:  
  Belirtilen paket `packageId` ve soru `questionId` ile bir paketten soruyu siler.

#### 3. **Mülakat (Interview) Rotaları**
- **POST** `/api/interviews/`:  
  Yeni bir mülakat oluşturur.

- **GET** `/api/interviews/`:  
  Tüm mülakatları listeler.

- **DELETE** `/api/interviews/:id`:  
  Belirtilen `id` ile mülakatı siler.

- **GET** `/api/interviews/:link`:  
  Belirtilen link ile mülakat bilgilerini getirir.

- **PATCH** `/api/interviews/:id/status`:  
  Belirtilen mülakatın yayında olup olmadığını günceller.



