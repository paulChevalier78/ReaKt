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
      alert('Veuillez remplir tous les champs.');
      return false;
    }

    // Send email via Formspree (service gratuit, pas de backend nécessaire)
    const formspreeUrl = 'https://formspree.io/f/xyeoqqkq';
    
    fetch(formspreeUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    })
    .then(() => {
      alert('Merci! Votre message a été reçu.');
      form.reset();
    })
    .catch(() => {
      alert('Une erreur est survenue. Veuillez réessayer.');
    });

    return false;
  }

  function initLightbox(){
    const modal = qs('#lightbox-modal');
    const closeBtn = qs('.lightbox-close');
    if(!modal) return;
    
    qsa('.clickable-image').forEach(img => {
      img.addEventListener('click', () => {
        const lightboxImg = qs('#lightbox-image');
        lightboxImg.src = img.src;
        modal.classList.add('open');
      });
    });
    
    closeBtn.addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', (e) => {
      if(e.target === modal) modal.classList.remove('open');
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if(e.key === 'Escape' && modal.classList.contains('open')) {
        modal.classList.remove('open');
      }
    });
  }

  function init(){
    initYear();
    initNav();
    initSmoothScroll();
    initLightbox();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }

  return api;
})();
