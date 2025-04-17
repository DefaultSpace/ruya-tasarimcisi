# Rüya Tasarımcısı - Kurulum Kılavuzu

## Genel Bakış

Rüya Tasarımcısı, düşüncelerinizi ve hislerinizi rüyalara dönüştüren interaktif bir web uygulamasıdır. Bu uygulama, Google'ın Gemini API'sini kullanarak çeşitli rüya modlarında içerik oluşturur ve gelişmiş özellikler sunar.

## Kurulum Adımları

### 1. Dosyaları İndirme

Rüya Tasarımcısı uygulamasını kullanmak için tüm dosyaları bilgisayarınıza indirin ve bir klasöre çıkarın.

### 2. Gemini API Anahtarı Alma

Uygulamanın gelişmiş özelliklerini kullanabilmek için bir Gemini API anahtarına ihtiyacınız vardır. API anahtarını şu adımları izleyerek alabilirsiniz:

1. [Google AI Studio](https://makersuite.google.com/app/apikey) adresine gidin
2. Google hesabınızla giriş yapın (yoksa yeni bir hesap oluşturun)
3. "Get API key" (API anahtarı al) butonuna tıklayın
4. Yeni bir API anahtarı oluşturun veya mevcut bir anahtarı kullanın
5. Oluşturulan API anahtarını kopyalayın

### 3. Uygulamayı Çalıştırma

1. İndirdiğiniz klasördeki `index.html` dosyasını bir web tarayıcısında açın
2. Sağ üst köşedeki dişli simgesine tıklayarak API ayarları penceresini açın
3. Kopyaladığınız Gemini API anahtarını ilgili alana yapıştırın ve "Kaydet" butonuna tıklayın
4. API anahtarınız başarıyla kaydedildiğinde, gelişmiş özellikleri kullanmaya başlayabilirsiniz

## Önemli Notlar

- API anahtarınız yerel olarak tarayıcınızda saklanır ve hiçbir sunucuya gönderilmez
- Gelişmiş özellikler (Rüya Görseli Oluşturucu, Rüya Analizi, Rüya Serisi) yalnızca geçerli bir API anahtarı ile kullanılabilir
- API anahtarı olmadan da temel rüya oluşturma özelliğini kullanabilirsiniz, ancak bu durumda uygulama çevrimdışı modda çalışır ve önceden tanımlanmış içerikler kullanılır
- API anahtarınızın kullanım limitleri Google tarafından belirlenir, aşırı kullanım durumunda kısıtlamalar olabilir

## Sorun Giderme

- API anahtarı ayarlandığı halde gelişmiş özellikler çalışmıyorsa:
  - API anahtarınızın doğru olduğundan emin olun
  - İnternet bağlantınızı kontrol edin
  - Tarayıcınızın çerezleri ve yerel depolamayı desteklediğinden emin olun
  - Tarayıcınızı yenileyin veya farklı bir tarayıcı deneyin

- "API yanıtı beklenen formatta değil" hatası alıyorsanız:
  - API anahtarınızın aktif olduğundan emin olun
  - Google AI Studio'da anahtarınızın durumunu kontrol edin
  - Kısa bir süre bekleyip tekrar deneyin

## İletişim ve Destek

Herhangi bir sorunla karşılaşırsanız veya geri bildirimde bulunmak isterseniz, lütfen uygulama geliştiricisiyle iletişime geçin.

---

Keyifli rüyalar dileriz! ✨
