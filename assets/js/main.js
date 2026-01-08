/**
* Template Name: Green
* Template URL: https://bootstrapmade.com/green-free-one-page-bootstrap-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Auto generate the carousel indicators
   */
  document.querySelectorAll('.carousel-indicators').forEach((carouselIndicator) => {
    carouselIndicator.closest('.carousel').querySelectorAll('.carousel-item').forEach((carouselItem, index) => {
      if (index === 0) {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}" class="active"></li>`;
      } else {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}"></li>`;
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();
// Topbar: aparece al scrollear y EMPUJA el header (no lo tapa)
(function () {
  const topbar = document.querySelector('.header .topbar');
  const header = document.getElementById('header');        // <- selector exacto
  if (!topbar || !header || !header.classList.contains('sticky-top')) return;

  const THRESHOLD = 120;   // px de scroll para mostrar la topbar
  let visible = false;

  function setHeaderOffset(px){
    // offset que usa el CSS: #header.sticky-top { top: var(--header-offset) }
    document.documentElement.style.setProperty('--header-offset', px + 'px');
  }

  function showTopbar(show){
    if (show === visible) return;
    visible = show;

    if (show){
      topbar.classList.add('is-visible');
      const h = topbar.offsetHeight || 40;
      setHeaderOffset(h);                    // empuja el header
    }else{
      topbar.classList.remove('is-visible');
      setHeaderOffset(0);
    }
  }

  function onScroll(){ showTopbar(window.scrollY > THRESHOLD); }
  function onResize(){
    if (visible){
      const h = topbar.offsetHeight || 40;
      setHeaderOffset(h);
    }
  }

  window.addEventListener('scroll', onScroll, { passive:true });
  window.addEventListener('resize', onResize);
  onScroll();  // estado inicial
  onResize();
})();
// ===== Service Details dinámico (tabs + detalles ampliados) =====
(function(){
  const tabsWrap = document.getElementById('services-tabs');
  const content  = document.getElementById('service-content');
  if(!tabsWrap || !content) return;

  const img   = document.getElementById('svc-img');
  const title = document.getElementById('svc-title');
  const intro = document.getElementById('svc-intro');
  const list  = document.getElementById('svc-list');
  const extra = document.getElementById('svc-extra');
  const detailsWrap = document.getElementById('svc-details');

  // DATA (mapeo de tu listado a las 4 categorías)
  const SVC = {
    /* =================== REGISTROS Y NORMATIVA =================== */
    registros: {
      img: 'assets/img/services/registros.jpg',
      alt: 'Registros y normativa',
      title: 'Registros y normativa',
      intro: 'Cumplí con ANMAT, SENASA y requisitos municipales/provinciales. Preparamos manuales, implementamos HACCP y gestionamos trámites RNE/RNPA con documentación lista para auditorías.',
      bullets: [
        'Asesoría técnica y diagnósticos; auditorías BPM/POES/MIP/HACCP/ISO.',
        'Manuales e instructivos (BPM, POES, MIP, HACCP, plan de retiro).',
        'Trámites y habilitaciones: RNE, RNPA, memoria descriptiva, etiquetado legal, Carnet de manipulación de alimentos.'
      ],
      extra: 'Detectamos no conformidades y definimos acciones correctivas con seguimiento documentado para minimizar riesgos regulatorios.',
      details: [
        // Asesoría técnica y diagnóstico
        { icon:'bi-search',                title:'Diagnóstico higiénico-sanitario', desc:'Relevamiento integral y evaluación de riesgos alimentarios.' },
        { icon:'bi-clipboard2-check',     title:'Auditorías internas',             desc:'BPM, POES, MIP, HACCP e ISO con plan de acción.' },
        { icon:'bi-exclamation-octagon',  title:'No conformidades',                desc:'Detección, recomendaciones y verificación de cierre.' },
        { icon:'bi-bag-check',            title:'Evaluación de proveedores',       desc:'Criterios de homologación y seguimiento de desempeño.' },

        // Manuales / Documentación
        { icon:'bi-journal-text',         title:'Manuales BPM',                    desc:'Buenas Prácticas de Manufactura adaptadas a tu planta.' },
        { icon:'bi-file-earmark-ruled',   title:'POES & MIP',                      desc:'Procedimientos de limpieza y control de plagas.' },
        { icon:'bi-diagram-3',            title:'HACCP completo',                  desc:'Análisis de peligros, PCC, límites críticos y verificación.' },
        { icon:'bi-arrow-repeat',         title:'Plan de retiro',                   desc:'Procedimiento documentado y simulacros de recall.' },
        { icon:'bi-archive',              title:'Trazabilidad y registros',        desc:'Diseño de matrices y control documental.' },

        // Trámites / Habilitaciones
        { icon:'bi-building-lock',        title:'RNE y habilitaciones',            desc:'Inscripción y renovación con memoria descriptiva.' },
        { icon:'bi-file-earmark-medical', title:'RNPA de productos',               desc:'Armado de legajos y presentación ante organismos.' },
        { icon:'bi-person-badge',         title:'Carnet de manipulación de alimentos', desc:'Capacitación obligatoria, evaluación y certificación. Vigencia por 3 años.' },


        // Rotulado / Legal (vinculado también a Diseño)
        { icon:'bi-tag',                  title:'Rotulado CAA',                    desc:'Cumplimiento Código Alimentario Argentino.' },
        { icon:'bi-clipboard-data',       title:'Ley 27.642 – Rotulado frontal',   desc:'Sellos, nutricional y leyendas obligatorias.' },
        { icon:'bi-emoji-smile',          title:'Alérgenos y leyendas',            desc:'Declaraciones “Sin TACC”, vegano, orgánico, Kosher/Halal.' }
      ]
    },

    /* =================== PROCESOS Y PRODUCCIÓN =================== */
    procesos: {
      img: 'assets/img/services/procesos.jpg',
      alt: 'Procesos y producción',
      title: 'Procesos y producción',
      intro: 'Mejorá productividad, calidad y seguridad: control de materias primas y procesos, indicadores, balance de línea, innovación y trazabilidad.',
      bullets: [
        'Control de producción y calidad (materias primas, procesos y PCC).',
        'Ensayos de laboratorio: microbiológicos/fisicoquímicos y ambiente.',
        'Mejora de procesos, Lean/5S/Kaizen y trazabilidad logística.'
      ],
      extra: 'Reducí desperdicios, mejorá tiempos y asegurá la identificación por lote con sistemas de control visual y sensores.',
      details: [
        // Control de producción y calidad
        { icon:'bi-box-seam',             title:'Control de insumos y PT',         desc:'Recepción, especificaciones y liberación de lotes.' },
        { icon:'bi-droplet',              title:'Agua: físico-químico y micro',    desc:'Ensayos para uso industrial y potable.' },
        { icon:'bi-calendar2-week',       title:'FIFO / FEFO',                      desc:'Gestión de vencimientos y rotación segura.' },
        { icon:'bi-thermometer-half',     title:'Almacenamiento',                   desc:'Condiciones de cámaras, depósito y transporte.' },
        { icon:'bi-check2-circle',        title:'Puntos críticos',                  desc:'Verificación de PCC y registros asociados.' },

        // Ensayos de laboratorio
        { icon:'bi-flask',                title:'Micro y fisicoquímicos',          desc:'Derivación, seguimiento e interpretación de resultados.' },
        { icon:'bi-clipboard2-data',      title:'Acciones correctivas',            desc:'Definición y seguimiento de CAPA.' },
        { icon:'bi-wind',                 title:'Ambiente y superficies',          desc:'Hisopados, aire y validaciones de limpieza.' },

        // Innovación / Mejora
        { icon:'bi-lightbulb',            title:'Reformulación y nuevos productos', desc:'Desarrollo y validación técnico-normativa.' },
        { icon:'bi-graph-up-arrow',       title:'Mejora de procesos',               desc:'Reducción de desperdicios y variabilidad.' },
        { icon:'bi-cpu',                  title:'Controles visuales y sensores',    desc:'Alarmas, poka-yoke y monitoreo crítico.' },
        { icon:'bi-recycle',              title:'Lean, 5S, Kaizen, HACCP',          desc:'Metodologías para mejora continua.' },

        // Trazabilidad y logística
        { icon:'bi-qr-code-scan',         title:'Sistemas de trazabilidad',         desc:'Codificación por lote/fecha y recall efectivo.' },
        { icon:'bi-grid-3x3-gap',         title:'Sectorización y layout higiénico', desc:'Flujos limpios/sucios y prevención de cruces.' },
        { icon:'bi-house-gear',           title:'Depósitos y cámaras',              desc:'Organización y mapeo de ubicaciones.' },
        { icon:'bi-box',                  title:'Stock seguro',                      desc:'Políticas bajo normas de inocuidad.' }
      ]
    },

    /* =================== CAPACITACIÓN Y SEGURIDAD =================== */
    capacitacion: {
      img: 'assets/img/services/capacitacion.jpg',
      alt: 'Capacitación y seguridad',
      title: 'Capacitación y seguridad',
      intro: 'Formación presencial/virtual y entrenamiento en planta: manipuladores, BPM/POES/MIP/HACCP, seguridad e higiene.',
      bullets: [
        'Cursos para manipuladores y programas modulares por rubro.',
        'Jornadas prácticas en planta con material y certificados.',
        'Higiene, mantenimiento y seguridad alimentaria.'
      ],
      extra: 'Diseñamos cronogramas de capacitación y seguimiento por puesto, con registros listos para auditorías.',
      details: [
        // Capacitación
        { icon:'bi-mortarboard',          title:'BPM · POES · MIP · HACCP',        desc:'Capacitación presencial/virtual adaptada a tu proceso.' },
        { icon:'bi-people',               title:'Jornadas prácticas',              desc:'Entrenamiento en planta, por tarea y responsable.' },
        { icon:'bi-journal-check',        title:'Material y certificados',         desc:'Didácticos descargables y constancias individuales.' },
        { icon:'bi-briefcase',            title:'Formación continua',              desc:'Plan anual por rubro y necesidades del cliente.' },

        // Higiene, mantenimiento y seguridad
        { icon:'bi-bucket',               title:'Limpieza y desinfección',         desc:'Cronogramas, validaciones y químicos aptos.' },
        { icon:'bi-tools',                title:'Mantenimiento preventivo',        desc:'Planificación, registros y criterios de aceptación.' },
        { icon:'bi-recycle',              title:'Gestión de residuos',             desc:'Segregación, almacenamiento y control ambiental.' },

        // Inducción
        { icon:'bi-clipboard-data',       title:'Inducción a nuevos ingresos',     desc:'Onboarding ágil con foco en seguridad e higiene.' }
      ]
    },

    /* =================== DISEÑO Y COMUNICACIÓN VISUAL =================== */
diseno: {
  img: 'assets/img/services/diseno.jpg',
  alt: 'Diseño y comunicación visual',
  title: 'Diseño y comunicación visual',
  intro: 'Etiquetado legal, comunicación para planta y materiales visuales para capacitación y auditorías, alineados a tu identidad. Sumamos branding (logo), packaging y comunicación orientada a clientes.',
  bullets: [
    'Rotulado conforme CAA y Ley 27.642 (frontal, nutricional y leyendas).',
    'Identidad visual (logo) y packaging funcional alineado a la normativa.',
    'Señalética, instructivos y comunicación orientada a clientes (POS, RRSS, brochures).'
  ],
  extra: 'Integramos diseño, normativa y experiencia de usuario para que la información sea clara, cumplible y fácil de auditar, a la vez que comunica valor a tus clientes.',
  details: [
    /* Rotulado y normativa legal */
    { icon:'bi-tag',                title:'Diseño de rótulos CAA',      desc:'Composición, declaraciones y lenguaje legal acorde al CAA.' },
    { icon:'bi-clipboard-data',     title:'Ley 27.642 (frontal)',       desc:'Aplicación de sellos, tabla nutricional y leyendas obligatorias.' },
    { icon:'bi-emoji-smile',        title:'Alérgenos y leyendas',       desc:'Advertencias, claims aprobados y buenas prácticas de rotulado.' },
    { icon:'bi-patch-check',        title:'Certificaciones',            desc:'Sin TACC, vegano, orgánico, Kosher, Halal y más.' },

    /* Comunicación visual de planta */
    { icon:'bi-signpost',           title:'Señalética e instructivos',  desc:'Carteles, láminas e instructivos visuales (incluye QR y formatos digitales).' },
    { icon:'bi-bounding-box',       title:'Diagramas y layouts',        desc:'Flujos, PCC, rutas, mapas de proceso y layouts higiénicos.' },
    { icon:'bi-qr-code-scan',       title:'Recursos digitales',         desc:'Micrositios, repositorios y PDFs para capacitación y auditorías.' },

    /* NUEVOS: Branding & Marketing */
    { icon:'bi-vector-pen',         title:'Diseño de logo',             desc:'Creación/rediseño de marca, sistema visual y manual de uso.' },
    { icon:'bi-box',                title:'Packaging',                  desc:'Desarrollo de envases y etiquetas: materiales, legibilidad, normativa y usabilidad.' },
    { icon:'bi-megaphone',          title:'Comunicación orientada a clientes', desc:'Piezas para punto de venta, redes sociales, brochures y catálogos.' }
  ]
}

  };

  function buildDetails(cards){
    return cards.map(c => `
      <div class="col-12 col-sm-6">
        <div class="detail-card">
          <div class="detail-icon"><i class="bi ${c.icon}"></i></div>
          <div>
            <h5>${c.title}</h5>
            <p>${c.desc}</p>
          </div>
        </div>
      </div>
    `).join('');
  }

  function render(serviceKey){
    const data = SVC[serviceKey]; if(!data) return;

    content.classList.add('is-changing');

    // tabs activos
    tabsWrap.querySelectorAll('a').forEach(a => {
      a.classList.toggle('active', a.dataset.service === serviceKey);
    });

    // contenido
    img.src = data.img;
    img.alt = data.alt;
    title.textContent = data.title;
    intro.textContent = data.intro;

    list.innerHTML = data.bullets
      .map(item => `<li><i class="bi bi-check-circle"></i> <span>${item}</span></li>`)
      .join('');

    extra.textContent = data.extra;

    // detalles
    detailsWrap.innerHTML = buildDetails(data.details);

    setTimeout(() => content.classList.remove('is-changing'), 150);
  }

  // eventos
  tabsWrap.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-service]');
    if(!a) return;
    e.preventDefault();
    render(a.dataset.service);
  });

  // estado inicial (si querés con hash: lee location.hash y llamá render(hash))
  render('registros');
})();
