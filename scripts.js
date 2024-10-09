document.addEventListener('DOMContentLoaded', function() {
  const tabLinks = document.querySelectorAll('.tab-link');
  const tabContents = document.querySelectorAll('.tab-content');

  // Função para esconder todas as seções de conteúdo
  function hideAllTabs() {
      tabContents.forEach(function(content) {
          content.style.display = 'none'; // Oculta todo o conteúdo
      });
  }

  // Função para mostrar uma aba específica
  function showTab(tabId) {
      hideAllTabs(); // Esconde todas as abas
      const tab = document.getElementById(tabId);
      if (tab) {
          tab.style.display = 'block'; // Mostra a aba correspondente
      }
  }

  // Define a aba "about" como a padrão
  showTab('about');

  // Adiciona evento de clique em cada link de aba
  tabLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
          e.preventDefault(); // Impede o comportamento padrão do link

          // Remove a classe 'active' de todos os links
          tabLinks.forEach(link => link.classList.remove('active'));

          // Adiciona a classe 'active' ao link clicado
          this.classList.add('active');

          // Mostra a aba correspondente ao link clicado
          const tabId = this.getAttribute('data-tab');
          showTab(tabId); // Exibe o conteúdo da aba correspondente
      });
  });
});

// Configuração para o Particles.js
particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    }
  },
  "retina_detect": true
});
const form = document.getElementById('contact-form');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Aqui você pode adicionar a lógica para enviar os dados do formulário
    // por exemplo, usando fetch ou XMLHttpRequest

    // Exemplo simples de alerta:
    alert('Mensagem enviada com sucesso!');
});