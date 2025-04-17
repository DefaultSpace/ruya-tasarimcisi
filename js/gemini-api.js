// Gemini API Integration for Dream Generation
let GEMINI_API_KEY = '';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

// Function to set API key
function setGeminiApiKey(apiKey) {
  GEMINI_API_KEY = apiKey;
  localStorage.setItem('gemini_api_key', apiKey);
  return GEMINI_API_KEY !== '';
}

// Function to get API key
function getGeminiApiKey() {
  if (!GEMINI_API_KEY) {
    GEMINI_API_KEY = localStorage.getItem('gemini_api_key') || '';
  }
  return GEMINI_API_KEY;
}

// Function to check if API key is set
function isApiKeySet() {
  return getGeminiApiKey() !== '';
}

// Function to generate dream content using Gemini API
async function generateDreamWithGeminiAPI(seed, mode) {
  try {
    if (!isApiKeySet()) {
      throw new Error('API anahtarı ayarlanmamış');
    }
    
    const prompt = createDreamPrompt(seed, mode);
    
    const response = await fetch(`${GEMINI_API_URL}?key=${getGeminiApiKey()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error('API yanıtı beklenen formatta değil');
    }
  } catch (error) {
    console.error('Gemini API hatası:', error);
    // Fallback to mock content if API fails
    return generateMockDreamContent(seed, mode);
  }
}

// Create dream prompt based on seed and mode
function createDreamPrompt(seed, mode) {
  let prompt = '';
  
  // Base instructions for all modes
  const basePrompt = `
  Bir rüya tasarımcısı olarak görev yapıyorsun. Kullanıcının verdiği tohum düşünceyi kullanarak detaylı ve etkileyici bir rüya senaryosu oluştur.
  
  Rüya tohumu: "${seed}"
  
  Rüya, Türkçe dilinde olmalı ve en az 200 kelime uzunluğunda olmalıdır. Rüya anlatımı birinci şahıs bakış açısıyla olmalı.
  Rüya içeriği yaratıcı, detaylı ve duygu yüklü olmalı. Rüyada görsel, işitsel ve duygusal detaylar bulunmalı.
  `;
  
  // Mode-specific instructions
  switch(mode) {
    case 'classic':
      prompt = `${basePrompt}
      Rüya modu: Klasik Rüya
      
      Bu klasik bir rüya olmalı. Normal bir rüya akışı içermeli, günlük yaşamdan unsurlar ve semboller içerebilir.
      Rüya, gerçekçi ama aynı zamanda hafif sürreal öğeler içerebilir. Rüyanın sonunda, rüyanın anlamı üzerine kısa bir düşünce ekle.
      `;
      break;
    case 'lucid':
      prompt = `${basePrompt}
      Rüya modu: Lucid Rüya
      
      Bu bir lucid (bilinçli) rüya olmalı. Rüya gören kişi rüyada olduğunun farkında olmalı ve rüyayı kontrol edebilmeli.
      Rüyada uçma, nesneleri değiştirme veya imkansız şeyleri yapma gibi lucid rüya özellikleri bulunmalı.
      Rüya, özgürlük ve kontrol hissi vermeli. Rüyanın sonunda, lucid rüya deneyiminin kişiye kattıkları hakkında kısa bir düşünce ekle.
      `;
      break;
    case 'nightmare':
      prompt = `${basePrompt}
      Rüya modu: Kabus Dönüşümü
      
      Bu rüya, bir kabus olarak başlamalı ancak olumlu bir deneyime dönüşmeli. Başlangıçta korku, endişe veya tehdit unsurları içermeli.
      Rüyanın ortasında bir dönüm noktası olmalı ve rüya gören kişi korkularıyla yüzleşip onları olumlu bir deneyime dönüştürmeli.
      Rüyanın sonunda, korkuların üstesinden gelme ve dönüşüm hakkında kısa bir düşünce ekle.
      `;
      break;
    case 'complex':
      prompt = `${basePrompt}
      Rüya modu: Karmaşık Evren
      
      Bu rüya, karmaşık ve fantastik bir evren içermeli. Bilim kurgu veya fantezi öğeleri, paralel evrenler, zaman yolculuğu veya gerçeküstü manzaralar içerebilir.
      Rüya, normal gerçekliğin ötesinde, zengin ve detaylı bir dünya sunmalı. Fizik kurallarına meydan okuyan unsurlar içerebilir.
      Rüyanın sonunda, bu karmaşık evrenin anlamı ve rüya gören kişiye etkisi hakkında kısa bir düşünce ekle.
      `;
      break;
    default:
      prompt = `${basePrompt}
      Rüya modu: Genel Rüya
      
      Genel bir rüya oluştur. Rüya, kişinin tohum düşüncesini temel almalı ve çeşitli duygular ve deneyimler içerebilir.
      Rüyanın sonunda, rüyanın anlamı üzerine kısa bir düşünce ekle.
      `;
  }
  
  return prompt;
}

// Function to analyze dream using Gemini API
async function analyzeDreamWithGeminiAPI(dreamContent, mode) {
  try {
    if (!isApiKeySet()) {
      throw new Error('API anahtarı ayarlanmamış');
    }
    
    const prompt = createAnalysisPrompt(dreamContent, mode);
    
    const response = await fetch(`${GEMINI_API_URL}?key=${getGeminiApiKey()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error('API yanıtı beklenen formatta değil');
    }
  } catch (error) {
    console.error('Gemini API hatası:', error);
    // Fallback to mock analysis if API fails
    return generateMockDreamAnalysis(dreamContent, mode);
  }
}

// Create analysis prompt based on dream content
function createAnalysisPrompt(dreamContent, mode) {
  return `
  Bir rüya psikoloğu olarak görev yapıyorsun. Aşağıdaki rüyayı analiz et ve psikolojik bir yorum yap.
  
  Rüya içeriği:
  "${dreamContent}"
  
  Rüya modu: ${getDreamModeName(mode)}
  
  Analiz şunları içermeli:
  1. Rüyanın genel bir yorumu
  2. Rüyada görünen önemli semboller ve anlamları (en az 3-4 sembol)
  3. Rüyanın bilinçaltı mesajları
  4. Rüya sahibine öneriler
  
  Analizi HTML formatında döndür. Başlıklar için <h4> etiketini, paragraflar için <p> etiketini kullan.
  Her sembol için <div class="analysis-item"> içinde ayrı bir bölüm oluştur.
  
  Yanıt Türkçe dilinde olmalı ve profesyonel, bilgilendirici bir ton kullanmalı.
  `;
}

// Function to generate dream image prompt using Gemini API
async function generateImagePromptWithGeminiAPI(dreamContent, mode) {
  try {
    if (!isApiKeySet()) {
      throw new Error('API anahtarı ayarlanmamış');
    }
    
    const prompt = `
    Bir görsel sanatçı olarak görev yapıyorsun. Aşağıdaki rüya içeriğine dayanarak, bir görsel oluşturmak için detaylı bir prompt yaz.
    
    Rüya içeriği:
    "${dreamContent}"
    
    Rüya modu: ${getDreamModeName(mode)}
    
    Prompt, bir görsel AI modeli için uygun olmalı ve rüyanın ana temalarını, atmosferini ve önemli unsurlarını içermeli.
    Prompt en fazla 100 kelime uzunluğunda olmalı ve görsel stil, renkler, kompozisyon hakkında bilgiler içermeli.
    Prompt İngilizce dilinde olmalı.
    `;
    
    const response = await fetch(`${GEMINI_API_URL}?key=${getGeminiApiKey()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 256,
        }
      })
    });

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error('API yanıtı beklenen formatta değil');
    }
  } catch (error) {
    console.error('Gemini API hatası:', error);
    // Fallback to mock image prompt if API fails
    return getMockImagePrompt(mode);
  }
}

// Get mock image prompt based on mode
function getMockImagePrompt(mode) {
  const prompts = {
    classic: "A dreamy landscape with soft clouds and gentle light, showing a path winding through a misty forest. Realistic style with muted colors and ethereal atmosphere.",
    lucid: "A vibrant scene of a person floating above a colorful landscape, with swirling patterns and impossible architecture. Surreal style with bright colors and dream-like quality.",
    nightmare: "A dark corridor transforming into a bright garden, with shadows receding and flowers blooming. Dramatic lighting with contrast between dark and light elements.",
    complex: "A cosmic scene with multiple suns, floating islands, and strange creatures in an alien landscape. Science fiction style with rich details and fantasy elements."
  };
  
  return prompts[mode] || prompts.classic;
}

// Helper function to get dream mode name
function getDreamModeName(mode) {
  switch(mode) {
    case 'classic': return 'Klasik Rüya';
    case 'lucid': return 'Lucid Rüya';
    case 'nightmare': return 'Kabus Dönüşümü';
    case 'complex': return 'Karmaşık Evren';
    default: return 'Bilinmeyen Mod';
  }
}

// Function to generate dream series using Gemini API
async function generateDreamSeriesWithGeminiAPI(seed, mode) {
  try {
    if (!isApiKeySet()) {
      throw new Error('API anahtarı ayarlanmamış');
    }
    
    const prompt = createDreamSeriesPrompt(seed, mode);
    
    const response = await fetch(`${GEMINI_API_URL}?key=${getGeminiApiKey()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      })
    });

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error('API yanıtı beklenen formatta değil');
    }
  } catch (error) {
    console.error('Gemini API hatası:', error);
    // Fallback to mock content if API fails
    return "Rüya serisi oluşturulamadı. Lütfen daha sonra tekrar deneyin.";
  }
}

// Create dream series prompt based on seed and mode
function createDreamSeriesPrompt(seed, mode) {
  return `
  Bir rüya yazarı olarak görev yapıyorsun. Kullanıcının verdiği tohum düşünceyi kullanarak, devam eden bir rüya hikayesi oluştur.
  
  Rüya tohumu: "${seed}"
  
  Rüya modu: ${getDreamModeName(mode)}
  
  Hikaye, Türkçe dilinde olmalı ve en az 5 bölümden oluşmalıdır. Her bölüm yaklaşık 200-300 kelime uzunluğunda olmalıdır.
  Hikaye, sürükleyici ve merak uyandırıcı olmalı, karakterler ve olaylar arasında bağlantılar bulunmalıdır.
  Hikaye, okuyucunun rüyayı yaşamasına olanak tanımalı, görsel ve duygusal detaylar içermelidir.
  
  Yanıt, her bölümü <div class="dream-series-part"> etiketi içinde olacak şekilde HTML formatında olmalıdır.
  Her bölümün başlığı <h4> etiketi içinde olmalıdır.
  `;
}

// Generate mock dream content as fallback
function generateMockDreamContent(seed, mode) {
  const modeTexts = {
    classic: `Kendimi bir sahilde yürürken buldum. Kumlar ayaklarımın altında yumuşacıktı ve denizin sesi beni sakinleştiriyordu. Gökyüzü berrak ve maviydi, birkaç beyaz bulut yavaşça süzülüyordu. İlerledikçe sahilde tanıdık bir figür gördüm, yaklaştığımda bunun çocukluk arkadaşım olduğunu fark ettim. Beni görünce gülümsedi ve el salladı.

    Birlikte sahilde yürümeye başladık, eski günlerden bahsettik. Konuşurken etrafımızdaki manzara yavaşça değişti. Artık bir ormanın içindeydik, ama bu bize garip gelmedi. Ağaçların arasından süzülen güneş ışığı, yerdeki yaprakları altın rengine boyuyordu. Bir patikayı takip ettik ve küçük bir açıklığa ulaştık.

    Açıklıkta küçük bir kulübe vardı. İçeri girdiğimizde, masanın üzerinde bir mektup bulduk. Mektubu açtığımda, kendi el yazımla yazılmış olduğunu gördüm, ancak içeriğini okuyamadım. Harfler sürekli değişiyor, anlamları kaçıyordu. Arkadaşıma baktığımda, onun yerinde artık yaşlı bir bilge duruyordu. Bana gülümsedi ve "Cevaplar her zaman içindeydi" dedi.

    Uyandığımda, bu rüyanın hayatımdaki bir dönüm noktasını temsil ettiğini düşündüm. Sahil geçmişimi, orman şu anki yolculuğumu, kulübe ise geleceğimi simgeliyordu. Mektup ise henüz keşfetmediğim potansiyelimi temsil ediyordu.`,
    
    lucid: `Rüyamda olduğumu anladığım an, etrafımdaki dünya daha canlı ve parlak hale geldi. Bir apartman dairesinin balkonundaydım, şehrin ışıkları ayaklarımın altında uzanıyordu. "Bu bir rüya" diye düşündüm ve ellerime baktım - gerçekten oradaydılar, ama hafifçe parlıyorlardı.

    Balkonun korkuluğuna yaklaştım ve aşağı baktım. Yükseklik beni korkutmadı, çünkü bunun bir rüya olduğunu biliyordum. Derin bir nefes aldım ve kendimi boşluğa bıraktım. Düşmek yerine, havada süzülmeye başladım. Kollarımı yana açtım ve şehrin üzerinde uçtum. Rüzgarın yüzümde hissettirdiği his inanılmazdı, gerçekti.

    İstediğim yöne gidebiliyordum. Yüksek binaların arasından geçtim, bulutlara dokundum. Aşağıda bir park gördüm ve oraya inmeye karar verdim. Düşüncemle birlikte, yavaşça parka indim. Çimenlere ayak bastığımda, onların yumuşaklığını hissedebiliyordum. Bir ağaca yaklaştım ve elimi gövdesine koydum. "Renk değiştir" diye düşündüm, ve ağaç maviye dönüştü. Gülümsedim ve tüm parkı bir gökkuşağı renklerine boyadım.

    Bir göl gördüm ve suyun üzerinde yürümeyi denedim. Su, ayaklarımın altında katı bir zemin gibiydi. Gölün ortasına kadar yürüdüm ve oturdum, suyun üzerinde bağdaş kurdum. Gözlerimi kapattım ve etrafımdaki dünyayı hissettim - benim yarattığım, benim kontrol ettiğim bir dünya.

    Bu lucid rüya deneyimi bana, zihnimin sınırlarının sandığımdan çok daha geniş olduğunu gösterdi. Gerçek hayatta da, düşüncelerimizin ve inançlarımızın deneyimlerimizi şekillendirdiğini hatırlattı.`,
    
    nightmare: `Karanlık bir koridorda koşuyordum. Arkamdan bir şey beni kovalıyordu, ne olduğunu göremiyordum ama varlığını hissedebiliyordum. Kalbim göğsümden fırlayacak gibi atıyordu. Koridor sonsuzmuş gibi uzanıyordu, ne kadar koşarsam koşayım sonu gelmiyordu.

    Aniden önümde bir kapı belirdi. Hızla açıp içeri girdim ve kapıyı arkamdan kapattım. Kendimi eski evimizin bodrumunda buldum. Loş ışıkta, köşelerde hareket eden gölgeler gördüm. Bir köşeden diğerine koştum, saklanacak bir yer arıyordum. Gölgeler yaklaşıyordu.

    Tam o sırada, bodrumun ortasında küçük bir ışık belirdi. Işığa doğru ilerledim. Yaklaştıkça, bunun küçük bir çiçek olduğunu gördüm - karanlığın ortasında büyüyen, parlayan bir çiçek. Çiçeğe dokunduğumda, bir şeyin değiştiğini hissettim. Korku yerini meraka bıraktı.

    Etrafımdaki gölgeler artık tehditkar görünmüyordu. Onlara yaklaştım ve her birinin aslında hayatımın farklı dönemlerinden korkularımı temsil ettiğini anladım. İşte o zaman, onlarla yüzleşmeye karar verdim. Her bir gölgeye yaklaştım ve onunla konuştum. Konuştukça, gölgeler şekil değiştirdi ve sonunda ışığa dönüştü.

    Bodrum artık karanlık değildi, her köşesi aydınlanmıştı. Merdivenlerden yukarı çıktım ve kendimi güneşli bir bahçede buldum. Arkama baktığımda, kovalayan şeyin artık orada olmadığını gördüm.

    Bu rüya bana, korkularımızla yüzleşmenin onları dönüştürebileceğini hatırlattı. Karanlıktan kaçmak yerine, onu anlamak ve kabul etmek, içimizdeki ışığı bulmamıza yardımcı olabilir.`,
    
    complex: `Çok katmanlı bir gerçeklikte uyanmıştım. Gökyüzünde üç güneş vardı - biri mavi, biri altın sarısı, biri de kırmızı. Bulunduğum şehir, yerçekimine meydan okuyan bir mimariye sahipti. Binalar havada asılı duruyor, köprüler imkansız açılarla birbirine bağlanıyordu. İnsanlar değil, yarı saydam varlıklar etrafta dolaşıyordu.

    Bir varlık bana yaklaştı ve telepati yoluyla iletişim kurdu: "Hoş geldin, Gezgin. Seni bekliyorduk." Beni takip etmemi istedi. Havada süzülen bir platforma bindik ve şehrin üzerinde uçmaya başladık. Aşağıda, farklı zaman dilimlerinin bir arada var olduğunu görebiliyordum - bir bölgede ilkel insanlar ateş etrafında toplanmış, hemen yanında fütüristik bir toplum kuantum bilgisayarlarla çalışıyordu.

    Platform, devasa bir kristal yapının önünde durdu. İçeri girdiğimizde, kristal duvarların her birinde farklı bir gerçeklik yansıyordu. Rehberim, "Bunlar senin yaşayabileceğin potansiyel hayatlar" dedi. Bir duvara dokundum ve aniden o gerçekliğin içine çekildim.

    Kendimi bir okyanus gezegeninde buldum. Suyun altında nefes alabiliyordum. Etrafımda biyolüminesan yaratıklar yüzüyordu. Derinlere indikçe, okyanus tabanında antik bir uygarlığın kalıntılarını keşfettim. Yapılar, tanıdık gelen sembollerle kaplıydı, sanki onları daha önce görmüştüm.

    Bir sembolü incelediğimde, yeniden kristal odaya döndüm. Rehberim, "Her gerçeklik bir diğeriyle bağlantılı. Sembolleri çözersen, evrenler arası geçişin anahtarını bulacaksın" dedi.

    Başka bir duvara dokundum ve kendimi çöl bir gezegende buldum. Gökyüzünde devasa bir halka vardı. Kumların üzerinde, düşüncelerimle hareket ettirebildiğim bir araçla ilerliyordum. Ufukta, piramit şeklinde bir yapı gördüm. Yaklaştıkça, bunun aslında bir uzay gemisi olduğunu anladım.

    Geminin içine girdiğimde, kontrol odasında aynı sembolleri gördüm. Sembollere dokunduğumda, gemi canlandı ve yükselmeye başladı. Uzayın derinliklerine doğru ilerlerken, yıldızların arasında bir geçit açıldı.

    Bu karmaşık rüya deneyimi, gerçekliğin sandığımızdan çok daha katmanlı ve bağlantılı olabileceğini düşündürdü. Belki de farklı boyutlar ve zaman dilimleri arasında görünmez bağlantılar vardır, ve bilinçaltımız bu bağlantıları rüyalarımızda keşfetmemize izin verir.`
  };
  
  return modeTexts[mode] || modeTexts.classic;
}

// Generate mock dream analysis as fallback
function generateMockDreamAnalysis(dreamContent, mode) {
  return `
  <h4>Rüya Analizi</h4>
  <p>Bu rüya, bilinçaltınızdaki düşünce ve duygularınızın bir yansımasıdır. Rüyanızda görülen semboller ve olaylar, günlük yaşamınızdaki deneyimlerinizle ilişkili olabilir.</p>
  
  <h4>Önemli Semboller</h4>
  
  <div class="analysis-item">
    <h4>Sembol 1</h4>
    <p>Bu sembol, hayatınızdaki bir geçiş dönemini temsil ediyor olabilir. Değişime açık olmanız ve yeni fırsatları değerlendirmeniz öneriliyor.</p>
  </div>
  
  <div class="analysis-item">
    <h4>Sembol 2</h4>
    <p>Bu sembol, içsel gücünüzü ve potansiyelinizi simgeliyor. Kendinize olan güveninizi artırmanız ve yeteneklerinizi daha fazla kullanmanız faydalı olabilir.</p>
  </div>
  
  <div class="analysis-item">
    <h4>Sembol 3</h4>
    <p>Bu sembol, çözülmemiş duygusal meselelerinizi temsil ediyor olabilir. Bu duygularla yüzleşmek ve onları ifade etmek, içsel huzurunuza katkıda bulunabilir.</p>
  </div>
  
  <h4>Bilinçaltı Mesajları</h4>
  <p>Rüyanız, bilinçaltınızın size iletmek istediği bazı mesajlar içeriyor. Bu mesajlar, kişisel gelişiminiz ve hayatınızdaki kararlarınız için rehberlik sağlayabilir.</p>
  
  <h4>Öneriler</h4>
  <p>Rüyanızın mesajlarını günlük yaşamınıza entegre etmek için, düzenli olarak meditasyon yapabilir, bir rüya günlüğü tutabilir ve bilinçaltınızla daha fazla bağlantı kurabilirsiniz.</p>
  `;
}

// Export functions for use in main app.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    setGeminiApiKey,
    getGeminiApiKey,
    isApiKeySet,
    generateDreamWithGeminiAPI,
    analyzeDreamWithGeminiAPI,
    generateImagePromptWithGeminiAPI,
    generateDreamSeriesWithGeminiAPI
  };
}
