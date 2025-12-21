window.reakt = (function(){
  const api = {};

  function qs(sel, el=document){ return el.querySelector(sel); }
  function qsa(sel, el=document){ return Array.from(el.querySelectorAll(sel)); }

  function initYear(){
    const y = new Date().getFullYear();
    const el = qs('#year');
    if(el) el.textContent = y;
  }

  function initNav(){
    const btn = qs('.nav-toggle');
    const menu = qs('#nav-menu');
    if(!btn || !menu) return;
    btn.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
    // close on link click (mobile)
    qsa('#nav-menu a').forEach(a => a.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }));
  }

  function initSmoothScroll(){
    qsa('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        try{
          if(id && id.length > 1){
            const target = qs(id);
            if(target){
              e.preventDefault();
              target.scrollIntoView({behavior:'smooth', block:'start'});
            }
          }
        }catch(_){/* noop */}
      });
    });
  }

  api.handleContactSubmit = function(e){
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const name = (data.get('name')||'').toString().trim();
    const email = (data.get('email')||'').toString().trim();
    const message = (data.get('message')||'').toString().trim();

    if(!name || !email || !message){
      alert('Please fill out all fields.');
      return false;
    }

    // Fallback: mailto (may open your email client).
    const subject = encodeURIComponent('ReaKt demo request');
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:contact@reakt.ai?subject=${subject}&body=${body}`;

    setTimeout(() => {
      alert('Thanks! Your request has been received.');
      form.reset();
    }, 250);

    return false;
  }

  function init(){
    initYear();
    initNav();
    initSmoothScroll();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }

  return api;
})();
