const Utils = {
  // Alert-u hook et - SƏHİFƏ YÜKLƏNƏNDƏ ÇAĞIRILMALIDIR
  hookAlert(callback){
    const orig = window.alert;
    let triggered = false;
    window.alert = function(msg){
      if(triggered) return orig.call(window, msg);
      triggered = true;
      window.alert = orig; // bərpa et
      if(callback) callback();
      return orig.call(window, `[XSS LAB] ${msg}`);
    };
  },

  // Uğuru qeyd et və modal göstər
  triggerSuccess(levelId, subId, explanation, nextAction){
    // LocalStorage-a yaz
    try{
      const list = JSON.parse(localStorage.getItem('xss_completed')||'[]');
      if(!list.includes(subId)){
        list.push(subId);
        localStorage.setItem('xss_completed', JSON.stringify(list));
      }
    }catch(e){}

    // Modal göstər
    this.showSuccessModal(explanation, nextAction);
  },

  // Təbrik modalı
  showSuccessModal(explanation, nextAction){
    // Əgər artıq modal varsa, sil
    const existing = document.querySelector('.success-modal');
    if(existing) existing.remove();

    const modal = document.createElement('div');
    modal.className = 'success-modal show';
    modal.innerHTML = `
      <div class="success-content">
        <div class="check">🎉</div>
        <h2>TƏBRİK EDİRİK!</h2>
        <p>XSS uğurla icra edildi!</p>
        <div class="explain">${explanation}</div>
        <button class="next-btn" id="nextBtn">DAVAM ET →</button>
      </div>
    `;
    document.body.appendChild(modal);

    // DAVAM ET düyməsi
    document.getElementById('nextBtn').onclick = () => {
      modal.remove();
      if(typeof nextAction === 'function'){
        nextAction();
      } else if(typeof nextAction === 'string' && nextAction.startsWith('http')){
        window.location.href = nextAction;
      } else if(typeof nextAction === 'string' && nextAction.includes('showSub')){
        // "showSub('1.2')" kimi string-i parse et
        const match = nextAction.match(/showSub\(['"](.+?)['"]\)/);
        if(match && typeof window.showSub === 'function'){
          window.showSub(match[1]);
        }
      } else if(typeof nextAction === 'string'){
        window.location.href = nextAction;
      }
    };
  },

  // URL parametri al
  getParam(name){
    return new URLSearchParams(window.location.search).get(name) || '';
  }
};