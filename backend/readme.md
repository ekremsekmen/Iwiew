Updates : 

***Soru paketindeki soruyu silme işlevi eklendi ,postman ile test edildi çalışıyor..


Authentication Rotaları /api/auth altında toplandı:

/api/auth/login: Giriş işlemi
/api/auth/logout: Çıkış işlemi

Question Paket Yönetim Rotaları /api/packages altında toplandı:
/api/packages (POST): Yeni bir soru paketi oluşturma
/api/packages (GET): Tüm soru paketlerini listeleme
/api/packages/:id (PUT): Mevcut bir soru paketini güncelleme
/api/packages/:id (DELETE): Bir soru paketini silme
/api/packages/:packageId/questions/:questionId (DELETE): Belirli bir paketteki soruyu silme 

********************************************************************************************
 

GÜNCELLEME !!!

**** Interview bütün işlevler Postman ile test edildi çalışıyor..
 
Intervıew yönetim rotaları /api/interviews altında toplandı: 

(POST)    /api/interviews: Yeni mülakat oluşturma
(GET)     /api/interviews: Tüm mülakatları listeleme
(GET)     /api/interviews/:link: Belirli bir mülakatı link ile getirme
(DELETE)  /api/interviews/:id: Belirli bir mülakatı silme
(PATCH)   /api/interviews/:id/status: Mülakatın durumunu güncelleme (yayında/yayında değil)

