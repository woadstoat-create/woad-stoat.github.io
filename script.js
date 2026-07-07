/* ============================================================
   RENDER — pulls everything from SITE_DATA (see data.js)
   ============================================================ */
(function render() {
  const { profile, projects } = SITE_DATA;

  // --- Nav resume link ---
  document.getElementById('nav-resume').href = profile.resumeUrl;

  // --- Hero ---
  document.getElementById('hero-name').textContent = profile.name;
  document.getElementById('hero-roles').textContent = profile.roles.join('  //  ');
  document.getElementById('hero-tagline').textContent = profile.tagline;

  // --- About ---
  document.getElementById('about-photo').src = profile.photo;
  document.getElementById('about-photo').alt = `Portrait of ${profile.name}`;
  document.getElementById('about-bio').innerHTML = profile.bio.trim().replace(/\s+/g, ' ');

  const skillsList = document.getElementById('skills-list');
  skillsList.innerHTML = profile.skills.map(s => `<li>${escapeHtml(s)}</li>`).join('');

  // --- Projects + Filters ---
  const grid = document.getElementById('project-grid');
  const filtersWrap = document.getElementById('filters');
  const tags = ['All', ...Array.from(new Set(projects.map(p => p.tag)))];

  filtersWrap.innerHTML = tags.map((tag, i) =>
    `<button class="filter-chip${i === 0 ? ' is-active' : ''}" data-tag="${escapeHtml(tag)}">${escapeHtml(tag)}</button>`
  ).join('');

  function renderProjects(activeTag) {
    const list = activeTag === 'All' ? projects : projects.filter(p => p.tag === activeTag);
    grid.innerHTML = list.map(projectCard).join('');
  }

  function projectCard(p) {
    const linkBlock = p.link
      ? `<a class="card__link" href="${escapeAttr(p.link)}" target="_blank" rel="noopener">
           ${escapeHtml(p.linkLabel || 'View project')}
           <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 9l6-6M4 3h5v5" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
         </a>`
      : `<span class="card__no-link">// no external link</span>`;

    return `
      <article class="card bracketed">
        <div class="card__media">
          <img src="${escapeAttr(p.image)}" alt="${escapeAttr(p.title)}" loading="lazy">
          <span class="card__tag">${escapeHtml(p.tag)}</span>
        </div>
        <div class="card__body">
          <h3 class="card__title">${escapeHtml(p.title)}</h3>
          <p class="card__desc">${escapeHtml(p.description)}</p>
          ${linkBlock}
        </div>
      </article>`;
  }

  filtersWrap.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-chip');
    if (!btn) return;
    filtersWrap.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('is-active'));
    btn.classList.add('is-active');
    renderProjects(btn.dataset.tag);
  });

  renderProjects('All');

  // --- Contact ---
  const contactGrid = document.getElementById('contact-grid');
  const contactItems = [
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { label: 'Location', value: profile.location, href: null },
    { label: 'LinkedIn', value: prettyUrl(profile.linkedin), href: profile.linkedin },
    { label: 'GitHub', value: prettyUrl(profile.github), href: profile.github },
    { label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s+/g, '')}` },
    { label: 'Resume', value: 'Download PDF', href: profile.resumeUrl }
  ].filter(item => item.value);

  contactGrid.innerHTML = contactItems.map(item => `
    <div class="contact-card bracketed">
      <p class="contact-card__label">${escapeHtml(item.label)}</p>
      ${item.href
        ? `<a class="contact-card__value" href="${escapeAttr(item.href)}" target="_blank" rel="noopener">${escapeHtml(item.value)}</a>`
        : `<p class="contact-card__value">${escapeHtml(item.value)}</p>`
      }
    </div>
  `).join('');

  // --- Footer year ---
  document.getElementById('footer-year').textContent = new Date().getFullYear();

  // --- helpers ---
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function escapeAttr(str) { return escapeHtml(str); }
  function prettyUrl(url) {
    try { return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''); }
    catch { return url; }
  }
})();

/* ============================================================
   NAV — mobile toggle + active link on scroll
   ============================================================ */
(function nav() {
  const toggle = document.getElementById('nav-toggle');
  const links = document.querySelector('.nav__links');
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open);
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', false);
  }));
})();

/* ============================================================
   BOIDS — ambient hero animation (a nod to the Boids project)
   Lightweight flocking sim on canvas. Pauses / simplifies for
   users who prefer reduced motion.
   ============================================================ */
(function boids() {
  const canvas = document.getElementById('boids-canvas');
  const ctx = canvas.getContext('2d');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let w, h, dpr;
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.offsetWidth;
    h = canvas.offsetHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', resize);
  resize();

  const COUNT = prefersReducedMotion ? 0 : 26;
  const boidsList = [];
  for (let i = 0; i < COUNT; i++) {
    boidsList.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6
    });
  }

  const MAX_SPEED = 0.9;
  const NEIGHBOR_R = 90;
  const SEP_R = 32;

  function step() {
    for (const b of boidsList) {
      let ax = 0, ay = 0, cx = 0, cy = 0, sx = 0, sy = 0, n = 0;

      for (const o of boidsList) {
        if (o === b) continue;
        const dx = o.x - b.x, dy = o.y - b.y;
        const d = Math.hypot(dx, dy);
        if (d < NEIGHBOR_R) {
          cx += o.x; cy += o.y;
          ax += o.vx; ay += o.vy;
          n++;
          if (d < SEP_R) { sx -= dx / (d || 1); sy -= dy / (d || 1); }
        }
      }

      if (n > 0) {
        cx /= n; cy /= n; ax /= n; ay /= n;
        b.vx += (cx - b.x) * 0.0006 + (ax - b.vx) * 0.02 + sx * 0.02;
        b.vy += (cy - b.y) * 0.0006 + (ay - b.vy) * 0.02 + sy * 0.02;
      }

      // gentle pull toward center to avoid drifting off-canvas
      b.vx += (w / 2 - b.x) * 0.00003;
      b.vy += (h / 2 - b.y) * 0.00003;

      const speed = Math.hypot(b.vx, b.vy);
      if (speed > MAX_SPEED) { b.vx = (b.vx / speed) * MAX_SPEED; b.vy = (b.vy / speed) * MAX_SPEED; }

      b.x += b.vx * 4;
      b.y += b.vy * 4;

      if (b.x < -20) b.x = w + 20; if (b.x > w + 20) b.x = -20;
      if (b.y < -20) b.y = h + 20; if (b.y > h + 20) b.y = -20;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    ctx.strokeStyle = 'rgba(95, 212, 208, 0.12)';
    ctx.lineWidth = 1;
    for (let i = 0; i < boidsList.length; i++) {
      for (let j = i + 1; j < boidsList.length; j++) {
        const a = boidsList[i], b = boidsList[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 70) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    for (const b of boidsList) {
      const angle = Math.atan2(b.vy, b.vx);
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(6, 0);
      ctx.lineTo(-5, 3.5);
      ctx.lineTo(-5, -3.5);
      ctx.closePath();
      ctx.fillStyle = 'rgba(255, 180, 84, 0.75)';
      ctx.fill();
      ctx.restore();
    }
  }

  function loop() {
    step();
    draw();
    requestAnimationFrame(loop);
  }

  if (!prefersReducedMotion) {
    loop();
  } else {
    draw();
  }
})();