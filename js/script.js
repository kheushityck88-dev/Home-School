// =========================================================
// HOME SCHOOL — script.js
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Icônes Lucide ---------- */
  if (window.lucide) { lucide.createIcons(); }


  /* ---------- Menu mobile ---------- */
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const open = mobileMenu.classList.contains('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuBtn.querySelector('.icon-open').classList.toggle('hidden', open);
      menuBtn.querySelector('.icon-close').classList.toggle('hidden', !open);
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        menuBtn.querySelector('.icon-open').classList.remove('hidden');
        menuBtn.querySelector('.icon-close').classList.add('hidden');
      });
    });
  }

  /* ---------- Bouton retour en haut ---------- */
  const backToTop = document.getElementById('backToTop');
  const backToTopRing = document.getElementById('backToTopRing');
  const RING_CIRCUMFERENCE = 141.4;
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('show', window.scrollY > 480);
      if (backToTopRing) {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? Math.min(window.scrollY / docHeight, 1) : 0;
        backToTopRing.style.strokeDashoffset = RING_CIRCUMFERENCE * (1 - progress);
      }
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Révélation au défilement ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });
    revealEls.forEach(el => io.observe(el));
    // Filet de sécurité : si un élément n'est jamais détecté comme visible
    // (bug de layout, image très grande, etc.), on le révèle quand même.
    setTimeout(() => revealEls.forEach(el => el.classList.add('in')), 1200);
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---------- (signature du hero gérée en CSS pur : voir .hero-photo) ---------- */

  /* ---------- Accordéon FAQ ---------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    question && question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i !== item && i.classList.remove('open'));
      item.classList.toggle('open', !isOpen);
    });
  });

  /* ---------- Lightbox galerie ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  document.querySelectorAll('[data-gallery-img]').forEach(img => {
    img.addEventListener('click', () => {
      if (!lightbox) return;
      lightboxImg.src = img.getAttribute('data-full') || img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('show');
    });
  });
  lightbox && lightbox.addEventListener('click', () => lightbox.classList.remove('show'));

  /* ---------- Formulaire de contact (démo) ---------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const feedback = document.getElementById('formFeedback');
      feedback.textContent = 'Merci ! Votre message a bien été envoyé. Notre équipe vous répond sous 24 à 48h.';
      feedback.classList.remove('hidden');
      contactForm.reset();
    });
  }

  /* ---------- Filtre formations ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const formationCards = document.querySelectorAll('[data-category]');
  if (filterBtns.length && formationCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('filter-active'));
        btn.classList.add('filter-active');
        const cat = btn.getAttribute('data-filter');
        formationCards.forEach(card => {
          const show = cat === 'all' || card.getAttribute('data-category') === cat;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* ---------- Modal détails formation ---------- */
  const FORMATIONS_DATA = {
    bureautique: {
      cat: 'Bureautique', title: 'Informatique Bureautique',
      tagline: "Les bases de l'informatique et de la suite bureautique, pour être opérationnel au travail dès la fin de la formation.",
      modules: ["Bases de l'informatique", 'Google Docs, Sheets & Slides', 'Microsoft PowerPoint', 'Microsoft Access', 'Microsoft Excel', 'Microsoft Word', 'Microsoft Publisher', 'Internet & Emails'],
      meta: ['Durée : 3 mois', 'Présentiel & en ligne', 'Inscription : 15 000 F', 'Mensualité : 13 000 F'],
    },
    illustrator: {
      cat: 'Design Graphique', title: 'Adobe Illustrator',
      tagline: 'Deviens pro du vectoriel créatif : à la fin de cette formation, tu sauras créer tes propres visuels de A à Z.',
      modules: ['Logos vectoriels adaptables', 'Affiches et flyers publicitaires clé en main', 'Design typographique créatif', 'Effets vectoriels : ombre, flou, 3D'],
      meta: ['Durée : 30 jours', 'Présentiel', 'Coût : 25 000 F'],
    },
    photoshop: {
      cat: 'Design Graphique', title: 'Photoshop',
      tagline: 'Maîtrise Photoshop et deviens pro de la conception de logos, affiches et de la retouche photo.',
      modules: ['Conception de logos', 'Création d\'affiches', 'Retouche photo professionnelle', 'Création de visuels indépendants'],
      meta: ['Durée : 30 jours', 'Présentiel', 'Coût : 25 000 F'],
    },
    wordpress: {
      cat: 'Web', title: 'Création de site WordPress',
      tagline: "Crée ton propre site e-commerce professionnel avec WordPress, de l'installation à la mise en ligne.",
      modules: ['Installation & Configuration', 'Gestion de boutique', 'Performance & Sécurité', 'Design & Expérience Utilisateur', 'Paramètres essentiels', 'Mise en ligne & Bonus'],
      meta: ['2h/jour, 4 jours/semaine', '100% en ligne', 'Coût : 30 000 F', 'Certificat de fin de formation'],
    },
  };

  const formationModal = document.getElementById('formationModal');
  if (formationModal) {
    const mCat = document.getElementById('formationModalCat');
    const mTitle = document.getElementById('formationModalTitle');
    const mTagline = document.getElementById('formationModalTagline');
    const mModules = document.getElementById('formationModalModules');
    const mMeta = document.getElementById('formationModalMeta');
    const mClose = document.getElementById('formationModalClose');

    function openFormationModal(id) {
      const data = FORMATIONS_DATA[id];
      if (!data) return;
      mCat.textContent = data.cat;
      mTitle.textContent = data.title;
      mTagline.textContent = data.tagline;
      mModules.innerHTML = data.modules.map(m => `<li>${m}</li>`).join('');
      mMeta.innerHTML = data.meta.map(t => `<span class="tag">${t}</span>`).join('');
      formationModal.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
    function closeFormationModal() {
      formationModal.classList.remove('show');
      document.body.style.overflow = '';
    }

    document.querySelectorAll('[data-formation]').forEach(card => {
      card.addEventListener('click', () => openFormationModal(card.getAttribute('data-formation')));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openFormationModal(card.getAttribute('data-formation')); }
      });
    });
    mClose && mClose.addEventListener('click', closeFormationModal);
    formationModal.addEventListener('click', (e) => { if (e.target === formationModal) closeFormationModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeFormationModal(); });
  }

  /* ---------- Compteurs animés ---------- */
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const io2 = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let current = 0;
          const step = Math.max(1, Math.ceil(target / 60));
          const timer = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(timer); }
            el.textContent = current.toLocaleString('fr-FR');
          }, 20);
          io2.unobserve(el);
        }
      });
    }, { threshold: 0.4 });
    io2.observe(el);
  });

});
