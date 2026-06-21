document.addEventListener('DOMContentLoaded', () => {
  Utils.hookAlert(() => {});
});

function showSub(num){
  if(num === '4.2' && !isCompleted('4.1')){
    alert('⛔ Əvvəlcə 4.1-i bitir!');
    return;
  }
  
  document.getElementById('sub41').style.display = num === '4.1' ? 'block' : 'none';
  document.getElementById('sub42').style.display = num === '4.2' ? 'block' : 'none';
  document.getElementById('btn41').classList.toggle('active', num === '4.1');
  document.getElementById('btn42').classList.toggle('active', num === '4.2');
  
  const btn42 = document.getElementById('btn42');
  if(isCompleted('4.1')){
    btn42.disabled = false;
    btn42.innerHTML = '4.2';
    btn42.classList.remove('locked');
  }
  
  document.getElementById('levelTitle').textContent = 
    num === '4.1' ? 'Level 4.1 — Script Tag Bloklanıb' : 'Level 4.2 — Advanced Bypass';
}

function runBP1(){
  let v = document.getElementById('bp1').value;
  
  Utils.hookAlert(() => {
    Utils.triggerSuccess('level4-filter-bypass', '4.1',
      '<b>Bypass!</b><br>Script tag bloklanıb amma digər tag-lər işləyir.<br><br><b>Payload:</b> <code>&lt;img src=x onerror=alert(1)&gt;</code>',
      () => showSub('4.2')
    );
  });
  
  v = v.replace(/<\s*script[^>]*>.*?<\s*\/\s*script\s*>/gi, '[BLOKLANDI]');
  v = v.replace(/<\s*script[^>]*\/?>/gi, '[BLOKLANDI]');
  document.getElementById('bp1Out').innerHTML = v;
}

function runBP2(){
  let v = document.getElementById('bp2').value;
  
  Utils.hookAlert(() => {
    Utils.triggerSuccess('level4-filter-bypass', '4.2',
      '<b>Bypass!</b><br>Regex filter-ləri bypass olundu.<br><br><b>Payload:</b> <code>&lt;svg/onload=alert(1)&gt;</code>',
      '../../finish.html'
    );
  });
  
  v = v.replace(/<\s*script/gi, '');
  v = v.replace(/on\w+\s*=/gi, '');
  v = v.replace(/javascript\s*:/gi, '');
  document.getElementById('bp2Out').innerHTML = v;
}

function isCompleted(id){
  try{return JSON.parse(localStorage.getItem('xss_completed')||'[]').includes(id)}catch(e){return false}
}

window.showSub = showSub;
window.runBP1 = runBP1;
window.runBP2 = runBP2;