/**
 * Marcelo da Silva Viana - Portfolio Scripts
 * Handles project filtering, modal interactions, mobile menu, and contact form
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons if available
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // --- Mobile Menu Toggle ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function toggleMobileMenu() {
    const isOpen = !mobileMenu.classList.contains('hidden');
    if (isOpen) {
      mobileMenu.classList.add('hidden');
      mobileMenuOverlay.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    } else {
      mobileMenu.classList.remove('hidden');
      mobileMenuOverlay.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  }
  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', toggleMobileMenu);
  }
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (!mobileMenu.classList.contains('hidden')) {
        toggleMobileMenu();
      }
    });
  });

  // --- Projects Filtering ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active styles from all buttons
      filterBtns.forEach(b => {
        b.classList.remove('bg-sky-500', 'text-slate-950', 'font-semibold', 'shadow-lg', 'shadow-sky-500/20');
        b.classList.add('bg-slate-900/80', 'text-slate-400', 'hover:text-slate-200', 'border-slate-800');
      });

      // Apply active style to clicked button
      btn.classList.remove('bg-slate-900/80', 'text-slate-400', 'hover:text-slate-200', 'border-slate-800');
      btn.classList.add('bg-sky-500', 'text-slate-950', 'font-semibold', 'shadow-lg', 'shadow-sky-500/20');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // --- Certifications Modal Data & Logic ---
  const certData = {
    'bootcamp-java': {
      title: 'Santander Bootcamp 2024 - Backend com Java',
      institution: 'Digital Innovation One (DIO) & Santander',
      hours: '87 horas',
      date: '2024',
      badge: 'Backend & Java',
      image: 'bootcamp.png',
      description: 'Imersão técnica com foco em arquitetura backend utilizando Java. Abrangeu desde os pilares de POO, estruturas de dados, Collections API, até o desenvolvimento de APIs RESTful com Spring Boot, injeção de dependências, tratamento robusto de exceções e persistência em banco de dados.'
    },
    'bradesco-bd': {
      title: 'Administração de Banco de Dados e Modelagem SQL',
      institution: 'Fundação Bradesco - Escola Virtual',
      hours: '38 horas',
      date: '2024',
      badge: 'Bancos de Dados',
      image: 'banco-dados.jpeg',
      description: 'Fundamentos de administração e modelagem de dados relacionais. Estudo aprofundado dos modelos conceituais e lógicos, normalização de tabelas (1FN, 2FN, 3FN), criação de índices, integridade referencial, e consultas SQL de alta complexidade com junções e agregações.'
    },
    'bradesco-python': {
      title: 'Linguagem de Programação Python & POO',
      institution: 'Fundação Bradesco - Escola Virtual',
      hours: '53 horas',
      date: '2024',
      badge: 'Python & POO',
      image: 'trilha-python.png',
      description: 'Domínio dos fundamentos do ecossistema Python, sintaxe moderna, lógica de programação avançada e Programação Orientada a Objetos (abstração, encapsulamento, herança e polimorfismo). Prática na resolução de problemas computacionais e manipulação de arquivos.'
    },
    'enap-dados': {
      title: 'Análise de Dados como Suporte à Tomada de Decisão',
      institution: 'ENAP - Escola Nacional de Administração Pública',
      hours: '30 horas',
      date: '2024',
      badge: 'Ciência de Dados',
      image: 'analise-dados.png',
      description: 'Abordagem orientada à inteligência de dados: pré-processamento, limpeza e saneamento de grandes bases, análise descritiva, criação de métricas de negócio e estruturação de painéis gerenciais (BI) voltados a insights estratégicos.'
    },
    'enap-lideranca': {
      title: 'Liderança e Gestão Estratégica de Equipes',
      institution: 'ENAP - Escola Nacional de Administração Pública',
      hours: '30 horas',
      date: '2024',
      badge: 'Liderança & Gestão',
      image: 'lideranca.png',
      description: 'Gestão de pessoas em contextos dinâmicos e colaborativos. Técnicas para mediação de conflitos, comunicação assertiva, engajamento de equipes multidisciplinares e fortalecimento do clima organizacional para máxima produtividade técnica.'
    },
    'ifrs-html': {
      title: 'HTML5: Fundamentos para Construção de Páginas Web Modernas',
      institution: 'IFRS - Instituto Federal do Rio Grande do Sul',
      hours: '30 horas',
      date: '2024',
      badge: 'Desenvolvimento Web',
      image: 'html5.png',
      description: 'Padrões da W3C, estruturação de documentos com HTML5 semântico, boas práticas de acessibilidade (ARIA), formulários interativos com validações nativas e fundamentos de responsividade moderna.'
    }
  };

  const certModal = document.getElementById('cert-modal');
  const certModalOverlay = document.getElementById('cert-modal-overlay');
  const certModalClose = document.getElementById('cert-modal-close');
  const certModalImg = document.getElementById('cert-modal-img');
  const certModalTitle = document.getElementById('cert-modal-title');
  const certModalInstitution = document.getElementById('cert-modal-institution');
  const certModalHours = document.getElementById('cert-modal-hours');
  const certModalBadge = document.getElementById('cert-modal-badge');
  const certModalDesc = document.getElementById('cert-modal-desc');

  function openModal(certKey) {
    const data = certData[certKey];
    if (!data) return;

    certModalTitle.textContent = data.title;
    certModalInstitution.textContent = data.institution;
    certModalHours.textContent = data.hours;
    certModalBadge.textContent = data.badge;
    certModalDesc.textContent = data.description;
    certModalImg.src = data.image;
    certModalImg.alt = data.title;

    certModal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }

  function closeModal() {
    certModal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  document.querySelectorAll('.open-cert-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const certId = btn.getAttribute('data-cert');
      openModal(certId);
    });
  });

  if (certModalClose) {
    certModalClose.addEventListener('click', closeModal);
  }
  if (certModalOverlay) {
    certModalOverlay.addEventListener('click', closeModal);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !certModal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // --- Copy Email Action ---
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'marceloviana836@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const copyText = document.getElementById('copy-email-text');
        if (copyText) {
          const original = copyText.textContent;
          copyText.textContent = 'Copiado!';
          setTimeout(() => {
            copyText.textContent = original;
          }, 2500);
        }
      });
    });
  }

  // --- Contact Form AJAX Handling (Formspree) ---
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-slate-900 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        Enviando...
      `;

      try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          contactForm.reset();
          formStatus.innerHTML = `
            <div class="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Mensagem enviada com sucesso! Retornarei o mais breve possível.</span>
            </div>
          `;
        } else {
          throw new Error('Falha ao enviar formulário');
        }
      } catch (err) {
        formStatus.innerHTML = `
          <div class="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>Houve um erro no envio. Se preferir, envie diretamente para marceloviana836@gmail.com ou pelo WhatsApp.</span>
          </div>
        `;
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });
  }

  // --- Scroll spy for navbar links ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = sectionId;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-sky-400', 'font-semibold');
      link.classList.add('text-slate-300');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-sky-400', 'font-semibold');
        link.classList.remove('text-slate-300');
      }
    });
  });
});
