// SƏHİFƏ YÜKLƏNƏNDƏ hookAlert quraşdır - BU ƏSAS HƏLL!
document.addEventListener('DOMContentLoaded', () => {
  Utils.hookAlert(() => {
    // Alert çağırıldıqda avtomatik işləyəcək
  });
});

let currentSub = '1.1';

function showSub(num){
  if(num === '1.2' && !isCompleted('1.1')){
    alert('⛔ Əvvəlcə 1.1-i bitir!');
    return;
  }
  
  document.getElementById('sub11').style.display = num === '1.1' ? 'block' : 'none';
  document.getElementById('sub12').style.display = num === '1.2' ? 'block' : 'none';
  document.getElementById('btn11').classList.toggle('active', num === '1.1');
  document.getElementById('btn12').classList.toggle('active', num === '1.2');
  
  const btn12 = document.getElementById('btn12');
  if(isCompleted('1.1')){
    btn12.disabled = false;
    btn12.innerHTML = '1.2';
    btn12.classList.remove('locked');
  }
  
  currentSub = num;
  document.getElementById('levelTitle').textContent = 
    num === '1.1' ? 'Level 1.1 — Sadə Reflected XSS' : 'Level 1.2 — URL Reflected XSS';
  
  if(num === '1.2') checkURLParam();
}

function doSearch(){
  const val = document.getElementById('search').value;
  
  // YENİDƏN hook et - hər search-dən əvvəl
  Utils.hookAlert(() => {
    Utils.triggerSuccess('level1-reflected', '1.1',
      '<b>Nə baş verdi?</b><br>Input birbaşa <code>innerHTML</code>-ə yazıldı.<br><br><b>Payload:</b> <code>&lt;img src=x onerror=alert(1)&gt;</code><br><br><b>Müdafiə:</b> <code>textContent</code> istifadə et.',
      () => showSub('1.2')  // ← FUNKSİYA KİMİ KEÇİR!
    );
  });
  
  // innerHTML yaz - bu zaman onerror işləyəcək və alert() çağırılacaq
  document.getElementById('result').innerHTML = 'Axtarış: <b>' + val + '</b>';
}

function checkURLParam(){
  const name = new URLSearchParams(window.location.search).get('name');
  if(name){
    // YENİDƏN hook et
    Utils.hookAlert(() => {
      Utils.triggerSuccess('level1-reflected', '1.2',
        '<b>Nə baş verdi?</b><br>URL parametri birbaşa səhifəyə yazıldı.<br><br><b>Payload:</b> <code>?name=&lt;script&gt;alert(1)&lt;/script&gt;</code>',
        '../level2-stored/'
      );
    });
    
    document.getElementById('greeting').innerHTML = 'Xoş gəldin, <b>' + name + '</b>!';
  }
}

function isCompleted(id){
  try{return JSON.parse(localStorage.getItem('xss_completed')||'[]').includes(id)}catch(e){return false}
}

// Global-a çıxar
window.showSub = showSub;

// URL-də name varsa avtomatik 1.2-yə keç
if(window.location.search.includes('name=')){
  setTimeout(() => showSub('1.2'), 100);
}