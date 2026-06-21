const LEVELS = [
  {id:'level1-reflected', name:'Level 1', title:'Reflected XSS', subs:['1.1','1.2']},
  {id:'level2-stored',    name:'Level 2', title:'Stored XSS',    subs:['2.1','2.2']},
  {id:'level3-dom',       name:'Level 3', title:'DOM XSS',       subs:['3.1','3.2']},
  {id:'level4-filter',    name:'Level 4', title:'Filter Bypass', subs:['4.1','4.2']}
];

function getCompleted(){
  try{return JSON.parse(localStorage.getItem('xss_completed')||'[]')}catch(e){return []}
}
function markCompleted(id){
  const list=getCompleted();
  if(!list.includes(id)){list.push(id);localStorage.setItem('xss_completed',JSON.stringify(list))}
}
function isCompleted(id){return getCompleted().includes(id)}
function allCompleted(){return LEVELS.every(l=>l.subs.every(s=>isCompleted(s)))}
function resetProgress(){localStorage.removeItem('xss_completed');location.reload()}

function renderLevels(){
  const grid=document.getElementById('levelsGrid');
  if(!grid)return;
  const completed=getCompleted();
  grid.innerHTML='';

  LEVELS.forEach((lv,idx)=>{
    const prevCompleted = idx===0 ? true : LEVELS[idx-1].subs.every(s=>completed.includes(s));
    const allDone = lv.subs.every(s=>completed.includes(s));

    const card=document.createElement('div');
    card.className='level-card'+(prevCompleted?'':' locked')+(allDone?' completed':'');
    card.innerHTML=`
      <h3>${lv.name}</h3>
      <div class="desc">${lv.title}</div>
      <div class="sub-levels">
        ${lv.subs.map((s,si)=>{
          const done=completed.includes(s);
          const subUnlocked = prevCompleted && (si===0 || completed.includes(lv.subs[si-1]));
          return `<div class="sub-item ${done?'done':''} ${!subUnlocked?'locked':''}">
            <span>${s}</span>
            <span class="status">${done?'✅':(subUnlocked?'⬜':'')}</span>
          </div>`;
        }).join('')}
      </div>
      <a href="${prevCompleted?`levels/${lv.id}/`:'#'}" class="level-btn" ${prevCompleted?'':'onclick="event.preventDefault();alert(\'⛔ Əvvəlcə əvvəlki level-i bitir!\')"'}>
        ${allDone?'TAMAMLANDI ✅':'DAVAM ET →'}
      </a>
    `;
    grid.appendChild(card);
  });

  const total=LEVELS.reduce((a,l)=>a+l.subs.length,0);
  const done=completed.length;
  const pt=document.getElementById('progressText');
  const pb=document.getElementById('progressBar');
  if(pt)pt.textContent=`${done}/${total}`;
  if(pb)pb.style.width=`${(done/total)*100}%`;

  renderFinalCard();
}

function renderFinalCard(){
  const wrap=document.getElementById('finalCardWrap');
  if(!wrap)return;
  const done=allCompleted();
  wrap.innerHTML=`
    <div class="final-card ${done?'unlocked':'locked'}">
      <div class="final-icon">${done?'🏆':'🔒'}</div>
      <div>
        <h3>${done?'FİNAL AÇIQDIR':'FİNAL KİLİDLİ'}</h3>
        <p>${done?'Bütün səviyyələri bitirdin. İndi finala keç!':'Bütün 8 alt səviyyəni bitirdikdən sonra açılacaq.'}</p>
      </div>
      <a href="${done?'finish.html':'#'}" class="final-btn" ${done?'':'onclick="event.preventDefault();alert(\'⛔ Əvvəlcə bütün səviyyələri bitir!\')"'}>
        ${done?'FİNALA KEÇ →':'KİLİDLİ'}
      </a>
    </div>
  `;
}

function showSuccess(explanation, nextUrl){
  const modal=document.createElement('div');
  modal.className='success-modal show';
  modal.innerHTML=`
    <div class="success-content">
      <div class="check">🎉</div>
      <h2>TƏBRİK EDİRİK!</h2>
      <p>XSS uğurla icra edildi.</p>
      <div class="explain">${explanation}</div>
      <a href="${nextUrl}" class="next-btn">DAVAM ET →</a>
    </div>
  `;
  document.body.appendChild(modal);
}

document.addEventListener('DOMContentLoaded',()=>{
  if(document.getElementById('levelsGrid'))renderLevels();
});