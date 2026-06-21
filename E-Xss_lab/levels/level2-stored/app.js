document.addEventListener('DOMContentLoaded', () => {
  Utils.hookAlert(() => {});
});

function showSub(num){
  if(num === '2.2' && !isCompleted('2.1')){
    alert('⛔ Əvvəlcə 2.1-i bitir!');
    return;
  }
  
  document.getElementById('sub21').style.display = num === '2.1' ? 'block' : 'none';
  document.getElementById('sub22').style.display = num === '2.2' ? 'block' : 'none';
  document.getElementById('btn21').classList.toggle('active', num === '2.1');
  document.getElementById('btn22').classList.toggle('active', num === '2.2');
  
  const btn22 = document.getElementById('btn22');
  if(isCompleted('2.1')){
    btn22.disabled = false;
    btn22.innerHTML = '2.2';
    btn22.classList.remove('locked');
  }
  
  document.getElementById('levelTitle').textContent = 
    num === '2.1' ? 'Level 2.1 — Comment XSS' : 'Level 2.2 — Profile XSS';
  
  if(num === '2.1') renderComments();
  else renderProfile();
}

function postComment(){
  const a = document.getElementById('cAuthor').value || 'Anonim';
  const b = document.getElementById('cBody').value;
  if(!b) return alert('Boşdur');
  FakeDB.push('comments', {author:a, body:b});
  renderComments();
  document.getElementById('cBody').value = '';
}

function renderComments(){
  const list = FakeDB.get('comments');
  const box = document.getElementById('comments');
  box.innerHTML = list.map(c => 
    `<div class="comment"><div class="author">${c.author}</div><div>${c.body}</div></div>`
  ).join('') || '<p style="color:var(--text-muted)">Şərh yoxdur</p>';
  
  // Hər render-dən əvvəl hook et
  Utils.hookAlert(() => {
    Utils.triggerSuccess('level2-stored', '2.1',
      '<b>Nə baş verdi?</b><br>Şərh localStorage-da saxlanıldı və innerHTML ilə göstərildi.<br><br><b>Payload:</b> <code>&lt;img src=x onerror=alert(1)&gt;</code>',
      () => showSub('2.2')
    );
  });
}

function saveProfile(){
  const name = document.getElementById('pName').value;
  const bio = document.getElementById('pBio').value;
  localStorage.setItem('profile', JSON.stringify({name, bio}));
  renderProfile();
}

function renderProfile(){
  const p = JSON.parse(localStorage.getItem('profile') || '{}');
  
  Utils.hookAlert(() => {
    Utils.triggerSuccess('level2-stored', '2.2',
      '<b>Nə baş verdi?</b><br>Profil məlumatları innerHTML ilə göstərildi.<br><br><b>Payload:</b> <code>&lt;svg onload=alert(1)&gt;</code>',
      '../level3-dom/'
    );
  });
  
  document.getElementById('dName').innerHTML = p.name || '—';
  document.getElementById('dBio').innerHTML = p.bio || '—';
}

function isCompleted(id){
  try{return JSON.parse(localStorage.getItem('xss_completed')||'[]').includes(id)}catch(e){return false}
}

window.showSub = showSub;
renderComments();