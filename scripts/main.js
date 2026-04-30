/* ─── Reveal + Parallax ─── */
// Scroll reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Parallax — image is 130% tall and starts at top:-15%; slides ±13% safely
  const parallaxItems = Array.from(document.querySelectorAll('.parallax'));
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Max travel as fraction of container height (must stay <= 15% to avoid exposing edges)
  const STRENGTH = 0.13;

  function updateParallax() {
    const vh = window.innerHeight;
    for (const el of parallaxItems) {
      const rect = el.getBoundingClientRect();
      if (rect.bottom < -200 || rect.top > vh + 200) continue;
      const elCenter = rect.top + rect.height / 2;
      const progress = (elCenter - vh / 2) / (vh / 2 + rect.height / 2);
      const p = Math.max(-1, Math.min(1, progress));
      // when element is below viewport (p<0), image sits lower; when above (p>0), image rides up
      const offset = -p * rect.height * STRENGTH;
      el.style.setProperty('--py', offset.toFixed(1) + 'px');
    }
  }

  if (!prefersReduced && parallaxItems.length) {
    let ticking = false;
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateParallax();
          ticking = false;
        });
        ticking = true;
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateParallax);
    updateParallax();
  }

/* ─── Leaflet map ─── */
(function () {
    if (typeof L === 'undefined') return; // leaflet didn't load (offline)
    const el = document.getElementById('leaflet-map');
    if (!el) return;

    const lat = 47.04922, lon = 8.26305;
    const map = L.map(el, { scrollWheelZoom: false, zoomControl: true, attributionControl: true })
      .setView([lat, lon], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>'
    }).addTo(map);

    const customIcon = L.divIcon({
      className: 'lr-pin-wrapper',
      html: '<div class="lr-pin"></div>',
      iconSize: [40, 40],
      iconAnchor: [20, 40]
    });
    L.marker([lat, lon], { icon: customIcon })
      .addTo(map)
      .bindPopup('<strong>The Livingroom</strong><br>Luzernerstrasse 141c<br>6014 Luzern');

    // Enable scroll-zoom only after click, so page scroll isn't hijacked
    map.on('click', () => map.scrollWheelZoom.enable());
    map.on('mouseout', () => map.scrollWheelZoom.disable());
  })();

/* ─── Pending links ─── */
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[data-pending]');
  if (!a) return;
  e.preventDefault();
  alert('Diese Seite wird noch erstellt.');
});

/* ─── Smooth-scroll fallback for browsers without CSS scroll-behavior ─── */
document.querySelectorAll('a[href^="#"]:not([data-pending])').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href === '#' || href.length < 2) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
