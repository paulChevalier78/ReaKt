window.reakt = (function(){
  const api = {};

  // Sélecteurs rapides
  function qs(sel, el=document){ return el.querySelector(sel); }
  function qsa(sel, el=document){ return Array.from(el.querySelectorAll(sel)); }

  // Mettre à jour l'année dans le footer
  function initYear(){
    const y = new Date().getFullYear();
    const el = qs('#year');
    if(el) el.textContent = y;
  }

  // Menu mobile
  function initNav(){
    const btn = qs('.nav-toggle');
    const menu = qs('#nav-menu');
    if(!btn || !menu) return;
    btn.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
    qsa('#nav-menu a').forEach(a => a.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }));
  }

  // Smooth scroll pour les ancres
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

  // Envoi du formulaire vers Formspree
  api.handleContactSubmit = function(e){
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const name = (data.get('name')||'').toString().trim();
    const email = (data.get('email')||'').toString().trim();
    const message = (data.get('message')||'').toString().trim();
    const statusEl = qs('#form-status');

    if(!name || !email || !message){
      statusEl.textContent = 'Veuillez remplir tous les champs.';
      statusEl.style.color = 'red';
      return false;
    }

    const formspreeUrl = 'https://formspree.io/f/mykgpyed';

    fetch(formspreeUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message, _replyto: email })
    })
    .then(res => {
      if(res.ok){
        statusEl.textContent = 'Merci! Votre message a été envoyé.';
        statusEl.style.color = 'green';
        form.reset();
      } else {
        throw new Error('Erreur serveur');
      }
    })
    .catch(() => {
      statusEl.textContent = 'Une erreur est survenue. Veuillez réessayer.';
      statusEl.style.color = 'red';
    });

    return false;
  }

  // Lightbox pour les images
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
    
    document.addEventListener('keydown', (e) => {
      if(e.key === 'Escape' && modal.classList.contains('open')) {
        modal.classList.remove('open');
      }
    });
  }

  // Initialisation globale
  function init(){
    initYear();
    initNav();
    initSmoothScroll();
    initLightbox();

    // Attache le handler Formspree
    const form = qs('#contact-form');
    if(form){
      form.addEventListener('submit', api.handleContactSubmit);
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }

  return api;
})();
