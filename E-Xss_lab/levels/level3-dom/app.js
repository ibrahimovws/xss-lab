document.addEventListener('DOMContentLoaded', () => {
  Utils.hookAlert(() => {});
});

function showSub(num){
  if(num === '3.2' && !isCompleted('3.1')){
    alert('⛔ Əvvəlcə 3.1-i bitir!');
    return;
  }
  
  document.getElementById('sub31').style.display = num === '3.1' ? 'block' : 'none';
  document.getElementById('sub32').style.display = num === '3.2' ? 'block' : 'none';
  document.getElementById('btn31').classList.toggle('active', num === '3.1');
  document.getElementById('btn32').classList.toggle('active', num === '3.2');
  
  const btn32 = document.getElementById('btn32');
  if(isCompleted('3.1')){
    btn32.disabled = false;
    btn32.innerHTML = '3.2';
    btn32.classList.remove('locked');
  }
  
  document.getElementById('levelTitle').textContent = 
    num === '3.1' ? 'Level 3.1 — Hash DOM XSS' : 'Level 3.2 — document.write XSS';
  
  if(num === '3.1'){
    renderHash();
    window.addEventListener('hashchange', renderHash);
  }
}

function renderHash(){
  const h = decodeURIComponent(location.hash.slice(1));
  
  Utils.hookAlert(() => {
    Utils.triggerSuccess('level3-dom', '3.1',
      '<b>Nə baş verdi?</b><br>location.hash birbaşa innerHTML-ə yazıldı.<br><br><b>Payload:</b> <code>#&lt;img src=x onerror=alert(1)&gt;</code>',
      () => showSub('3.2')
    );
  });
  
  document.getElementById('hashOut').innerHTML = h || '<i>Hash yoxdur</i>';
}

function runWrite(){
  const v = document.getElementById('dwInput').value;
  const target = document.getElementById('dwOut');
  target.innerHTML = '';
  const frame = document.createElement('iframe');
  frame.style.width = '100%';
  frame.style.height = '100px';
  frame.style.border = 'none';
  target.appendChild(frame);
  
  Utils.hookAlert(() => {
    Utils.triggerSuccess('level3-dom', '3.2',
      '<b>Nə baş verdi?</b><br>document.write birbaşa HTML parse edir.<br><br><b>Payload:</b> <code>&lt;script&gt;alert(1)&lt;/script&gt;</code>',
      '../level4-filter-bypass/'
    );
  });
  
  frame.contentDocument.open();
  frame.contentDocument.write('<div style="padding:10px;color:#00ff9c">Nəticə: ' + v + '</div>');
  frame.contentDocument.close();
}

function isCompleted(id){
  try{return JSON.parse(localStorage.getItem('xss_completed')||'[]').includes(id)}catch(e){return false}
}

window.showSub = showSub;
window.runWrite = runWrite;

if(window.location.hash){
  setTimeout(() => {
    if(!isCompleted('3.1')) showSub('3.1');
  }, 100);
}