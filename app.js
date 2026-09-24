function onReady(fn){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fn);else fn()}

onReady(() => {
  initTheme();
  initHeader();
  initMobileMenu();
  initModals();
  initForms();
  initFilters();
  initFaq();
  initTabs();
  initSmoothScroll();
  initAdmin();
  initLightbox();
  initImageFallback();
  initBrokenImages();
  renderDynamicTours();
  initSearchForm();
  initLoadMoreReviews();
});

function renderDynamicTours(){
  const allToursEl=document.getElementById('all-tours');
  if(allToursEl){
    if(!window.TOURS){allToursEl.innerHTML='<div style="grid-column:1/-1;padding:60px;text-align:center;background:#FBEEEE;border-radius:16px;"><h3 style="color:#B85C58;">⚠ Данные туров не загружены</h3><p style="color:#6B6B6B;">Проверьте файл tours-data.js</p></div>';return}
    renderAllTours(allToursEl);initFilters();initImageFallback();
  }
  const tourContent=document.getElementById('tour-content');
  if(tourContent){
    if(!window.TOURS){const l=document.getElementById('tour-loading'),e=document.getElementById('tour-error');if(l)l.style.display='none';if(e)e.style.display='';return}
    renderTourDetail();
  }
}

function initHeader(){const h=document.querySelector('.header');if(!h)return;window.addEventListener('scroll',()=>h.classList.toggle('scrolled',window.scrollY>10))}

function initMobileMenu(){
  const b=document.querySelector('.burger');if(!b)return;
  const m=document.createElement('div');m.className='mobile-menu';
  m.innerHTML=`<button class="close">×</button><nav>
    <a href="destinations.html">Направления</a>
    <a href="tours.html">Туры</a>
    <a href="weekly.html">Туры недели</a>
    <a href="reviews.html">Отзывы</a>
    <a href="about.html">О нас</a>
    <a href="contacts.html">Контакты</a>
    <a href="faq.html">Помощь</a>
    <a href="account.html">Личный кабинет</a>
  </nav>
  <a href="#" class="btn btn-primary" data-modal="booking">Забронировать тур</a>
  <a href="tel:+74951204580" class="btn btn-outline" style="margin-top:12px;">+7 495 120-45-80</a>`;
  document.body.appendChild(m);
  b.addEventListener('click',()=>m.classList.add('open'));
  m.querySelector('.close').addEventListener('click',()=>m.classList.remove('open'));
  m.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>m.classList.remove('open')));
}

function initModals(){
  const html=`
  <div class="modal-overlay" id="modal-booking"><div class="modal">
    <button class="modal-close">×</button>
    <h3>Заявка на подбор тура</h3><p>Оставьте контакты — менеджер свяжется в течение 15 минут.</p>
    <form data-form="booking">
      <div class="form-group"><label>Имя и телефон</label><input type="text" name="name" placeholder="Иван Иванов, +7 ..." required></div>
      <div class="form-group"><label>Направление</label><input type="text" name="direction" placeholder="Например: Тоскана"></div>
      <div class="form-group"><label>Комментарий</label><textarea name="comment" placeholder="Даты, количество гостей"></textarea></div>
      <button type="submit" class="btn btn-primary" style="width:100%;">Отправить заявку</button>
    </form>
  </div></div>
  <div class="modal-overlay" id="modal-callback"><div class="modal">
    <button class="modal-close">×</button>
    <h3>Обратный звонок</h3><p>Перезвоним в течение 15 минут.</p>
    <form data-form="callback">
      <div class="form-group"><label>Ваше имя</label><input type="text" name="name" required></div>
      <div class="form-group"><label>Телефон</label><input type="tel" name="phone" placeholder="+7 (___) ___-__-__" required></div>
      <button type="submit" class="btn btn-primary" style="width:100%;">Жду звонка</button>
    </form>
  </div></div>
  <div class="modal-overlay" id="modal-tour"><div class="modal">
    <button class="modal-close">×</button>
    <h3>Забронировать тур</h3><p>Забронируем место и пришлём договор.</p>
    <form data-form="tour">
      <div class="form-group"><label>Имя и фамилия</label><input type="text" name="name" required></div>
      <div class="form-group"><label>Телефон</label><input type="tel" name="phone" required></div>
      <div class="form-group"><label>Дата вылета</label><input type="date" name="date"></div>
      <div class="form-group"><label>Гостей</label><select name="guests"><option>2 гостя</option><option>1 гость</option><option>3 гостя</option><option>4+ гостей</option></select></div>
      <button type="submit" class="btn btn-primary" style="width:100%;">Забронировать</button>
    </form>
  </div></div>`;
  document.body.insertAdjacentHTML('beforeend',html);
  document.addEventListener('click',e=>{
    const t=e.target.closest('[data-modal]');
    if(t){e.preventDefault();openModal('modal-'+t.dataset.modal)}
    if(e.target.classList.contains('modal-overlay')){e.target.classList.remove('open');document.body.style.overflow=''}
    if(e.target.classList.contains('modal-close')){e.target.closest('.modal-overlay').classList.remove('open');document.body.style.overflow=''}
  });
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){document.querySelectorAll('.modal-overlay.open').forEach(m=>m.classList.remove('open'));document.body.style.overflow=''}
  });
}

function openModal(id){const m=document.getElementById(id);if(!m)return;m.classList.add('open');document.body.style.overflow='hidden'}

function initForms(){
  document.addEventListener('submit',e=>{
    const form=e.target.closest('form');if(!form)return;
    const type=form.dataset.form;
    if(type==='search')return;
    e.preventDefault();
    const required=form.querySelectorAll('[required]');let valid=true;
    required.forEach(i=>{if(!i.value.trim()){i.style.borderColor='#B85C58';valid=false}else i.style.borderColor=''});
    if(!valid){showToast('Заполните обязательные поля');return}
    const btn=form.querySelector('button[type="submit"]');const txt=btn.textContent;btn.textContent='Отправляем...';btn.disabled=true;
    setTimeout(()=>{
      btn.textContent=txt;btn.disabled=false;
      const user=typeof getCurrentUser==='function'?getCurrentUser():null;
      if(user){
        const tourId=new URLSearchParams(location.search).get('id');
        const tour=tourId&&window.TOURS?window.TOURS[tourId]:null;
        const data=new FormData(form);
        const bookings=typeof getBookings==='function'?getBookings():[];
        bookings.push({id:'b_'+Date.now(),userId:user.id,tourId:tour?tour.id:null,tourTitle:tour?tour.title:'Индивидуальный подбор',dates:(data.get('date')||'').toString()||'Даты уточняются',guests:(data.get('guests')||'2 гостя').toString(),name:(data.get('name')||user.name).toString(),phone:(data.get('phone')||'').toString(),createdAt:new Date().toISOString(),status:'pending'});
        saveBookings(bookings);
      }
      form.reset();
      const modal=form.closest('.modal-overlay');
      if(modal){modal.classList.remove('open');document.body.style.overflow=''}
      showToast('✓ Заявка отправлена! Мы свяжемся с вами.');
    },800);
  });
}

function showToast(msg){
  let t=document.querySelector('.toast');
  if(!t){t=document.createElement('div');t.className='toast';document.body.appendChild(t)}
  t.textContent=msg;t.classList.add('show');
  clearTimeout(t._timer);t._timer=setTimeout(()=>t.classList.remove('show'),3500);
}
window.showToast=showToast;

function initFilters(){
  const chips=document.querySelectorAll('.filter-chip[data-filter]');if(!chips.length)return;
  const cards=document.querySelectorAll('[data-tour]');const countEl=document.querySelector('[data-count]');
  function apply(){
    const active={};
    document.querySelectorAll('.filter-chip.active[data-filter]').forEach(c=>{const k=c.dataset.filter;if(!active[k])active[k]=[];active[k].push(c.dataset.value)});
    let v=0;
    cards.forEach(card=>{
      let show=true;
      Object.keys(active).forEach(k=>{const vals=active[k];if(vals.includes('all'))return;if(!vals.includes(card.dataset[k]))show=false});
      card.style.display=show?'':'none';if(show)v++;
    });
    if(countEl)countEl.textContent=`Найдено ${v} туров`;
  }
  chips.forEach(chip=>chip.addEventListener('click',()=>{
    const g=chip.dataset.filter;
    document.querySelectorAll(`.filter-chip[data-filter="${g}"]`).forEach(c=>c.classList.remove('active'));
    chip.classList.add('active');apply();
  }));
  const reset=document.querySelector('[data-reset]');
  if(reset)reset.addEventListener('click',e=>{
    e.preventDefault();
    document.querySelectorAll('.filter-chip[data-filter]').forEach(c=>c.classList.remove('active'));
    document.querySelectorAll('.filter-chip[data-filter="type"]')[0]?.classList.add('active');
    document.querySelectorAll('.filter-chip[data-filter="season"]')[0]?.classList.add('active');
    apply();
  });
}

function initFaq(){
  document.querySelectorAll('.faq-question').forEach(q=>q.addEventListener('click',()=>{
    const it=q.closest('.faq-item');const open=it.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i=>i.classList.remove('open'));
    if(!open)it.classList.add('open');
  }));
}

function initTabs(){
  document.querySelectorAll('[data-tabs]').forEach(tabs=>{
    const btns=tabs.querySelectorAll('.tab');
    const conts=document.querySelectorAll(`[data-tab-content="${tabs.dataset.tabs}"] [data-tab-pane]`);
    btns.forEach(b=>b.addEventListener('click',()=>{
      btns.forEach(x=>x.classList.remove('active'));b.classList.add('active');
      conts.forEach(c=>c.style.display=c.dataset.tabPane===b.dataset.tab?'':'none');
    }));
  });
}

function initSmoothScroll(){
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
    const id=a.getAttribute('href');if(id==='#'||id.length<2)return;
    const t=document.querySelector(id);if(!t)return;
    e.preventDefault();window.scrollTo({top:t.offsetTop-80,behavior:'smooth'});
  }));
}

function initAdmin(){
  document.querySelectorAll('.admin-nav a').forEach(a=>a.addEventListener('click',e=>{
    e.preventDefault();
    document.querySelectorAll('.admin-nav a').forEach(x=>x.classList.remove('active'));a.classList.add('active');
    const title=document.querySelector('.admin-header h1');
    if(title)title.textContent=a.textContent.trim().replace(/^[^\s]+\s/,'');
  }));
  const nb=document.querySelector('[data-admin-new]');
  if(nb)nb.addEventListener('click',()=>openModal('modal-booking'));
  const eb=document.querySelector('[data-admin-export]');
  if(eb)eb.addEventListener('click',()=>{
    const rows=[['Заявка','Клиент','Тур','Дата','Сумма','Статус']];
    document.querySelectorAll('.admin-table tbody tr').forEach(tr=>{rows.push([...tr.querySelectorAll('td')].map(td=>td.textContent.trim()))});
    const csv=rows.map(r=>r.map(c=>`"${c}"`).join(',')).join('\n');
    const blob=new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8'});
    const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='tourline-заявки.csv';a.click();URL.revokeObjectURL(url);
    showToast('✓ Файл экспортирован');
  });
}

function formatPrice(n){return n.toLocaleString('ru-RU')}

function tourCardHTML(t){
  return `<a href="tour.html?id=${t.id}" class="tour-card" data-tour data-type="${t.type}" data-season="${t.season}">
    <div class="tour-card-img">
    <img src="${t.image}" alt="${t.title}" data-fallback-src="https://picsum.photos/seed/tl-${t.id}/800/600">
      ${t.badge?`<span class="tour-badge">${t.badge}</span>`:''}
      <button type="button" class="fav-toggle" data-fav-id="${t.id}" style="position:absolute;top:12px;right:12px;width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.9);border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#3D5A40;transition:all .2s;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
      </button>
    </div>
    <div class="tour-card-body">
      <div class="tour-card-top"><h4>${t.title}</h4><span class="tour-rating">★ ${t.rating}</span></div>
      <p class="tour-card-desc">${t.shortDesc}</p>
      <div class="tour-card-price"><strong>от ${formatPrice(t.price)} ₽</strong><span>→</span></div>
    </div>
  </a>`;
}

function renderAllTours(c){c.innerHTML=Object.values(window.TOURS).map(tourCardHTML).join('')}

function renderTourDetail(){
  const params=new URLSearchParams(location.search);const id=params.get('id');
  const tour=id&&window.TOURS?window.TOURS[id]:null;
  const loading=document.getElementById('tour-loading');
  const errorEl=document.getElementById('tour-error');
  const content=document.getElementById('tour-content');
  if(!id){location.replace('tours.html');return}
  if(!tour){if(loading)loading.style.display='none';if(errorEl)errorEl.style.display='';return}
  if(loading)loading.style.display='none';if(content)content.style.display='';
  ['tour-body','tour-included','tour-pricing'].forEach(elId=>{const el=document.getElementById(elId);if(el)el.hidden=false});
  document.title=tour.title+' — Tourline';
  document.getElementById('bc-tour').textContent=tour.region;
  document.getElementById('t-title').textContent=tour.title;
  document.getElementById('t-days').textContent=tour.days;
  document.getElementById('t-region').textContent=tour.country+', '+tour.region;
  document.getElementById('t-group').textContent=tour.group;
  document.getElementById('t-rating').textContent=tour.rating;
  document.getElementById('t-reviews').textContent=tour.reviews;
  document.getElementById('t-price').textContent=formatPrice(tour.price);
  document.getElementById('t-info-days').textContent=tour.days;
  document.getElementById('t-info-group').textContent=tour.group;
  document.getElementById('t-info-meals').textContent=tour.meals;
  document.getElementById('t-info-transport').textContent=tour.transport;
  document.getElementById('t-gallery').innerHTML = tour.gallery.map((s, i) => {
  const fallback = `https://picsum.photos/seed/tl-${tour.id}-${i}/800/600`;
  return `<img class="${i===0?'main':''}" src="${s}" alt="${tour.title} ${i+1}" loading="lazy" data-fallback-src="${fallback}">`;
}).join('');
  document.getElementById('t-description').textContent=tour.description;
  document.getElementById('t-itinerary').innerHTML=tour.itinerary.map(d=>`<div class="itinerary-item"><div class="itinerary-num">${d.n}</div><div class="itinerary-content"><h4>${d.title}</h4><p>${d.text}</p><div class="itinerary-tags">${d.tags.map(t=>`<span class="itinerary-tag">${t}</span>`).join('')}</div></div></div>`).join('');
  document.getElementById('t-included').innerHTML=tour.included.map(x=>`<li><span class="check">✓</span> ${x}</li>`).join('');
  document.getElementById('t-excluded').innerHTML=tour.excluded.map(x=>`<li><span class="cross">✕</span> ${x}</li>`).join('');
  document.getElementById('t-pricing').innerHTML=tour.pricing.map(p=>`<div class="pricing-card ${p.featured?'featured':''}">${p.featured?'<div class="pricing-badge">Популярный</div>':''}<div class="pricing-name">${p.name}</div><div class="pricing-desc">${p.desc}</div><div class="pricing-price">${formatPrice(p.price)} ₽</div><div class="pricing-note">${p.note}</div><ul class="pricing-features">${p.features.map(f=>`<li><span>✓</span> ${f}</li>`).join('')}</ul><button class="btn ${p.featured?'btn-white':'btn-outline'}" data-modal="tour">Выбрать вариант</button></div>`).join('');
  document.getElementById('t-manager').innerHTML=`<div class="manager-head"><img src="${tour.manager.avatar}" alt="${tour.manager.name}"><div><h4>${tour.manager.name}</h4><p>${tour.manager.role}</p></div></div><div class="manager-contacts"><a href="tel:${tour.manager.phone.replace(/\s/g,'')}">📞 ${tour.manager.phone}</a><a href="mailto:${tour.manager.email}">✉️ ${tour.manager.email}</a><span style="font-size:12px;color:var(--text-muted);">На связи с 9:00 до 21:00</span></div>`;
  const similar=Object.values(window.TOURS).filter(x=>x.season===tour.season&&x.id!==tour.id).slice(0,3);
  document.getElementById('t-similar').innerHTML=similar.map(tourCardHTML).join('');

  initImageFallback();
  initBrokenImages();
}

/* ---------- ЛАЙТБОКС С ЗУМОМ ---------- */
function initLightbox() {
  let lb = document.getElementById('lightbox');
  if (!lb) {
    lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.className = 'lightbox';
    lb.innerHTML = `
      <button class="lightbox-close" aria-label="Закрыть">×</button>
      <button class="lightbox-nav lightbox-prev" aria-label="Назад">‹</button>
      <div class="lightbox-img-wrap"><img src="" alt=""></div>
      <button class="lightbox-nav lightbox-next" aria-label="Вперёд">›</button>
      <div class="lightbox-counter"></div>
      <div class="lightbox-zoom-hint">Кликните по фото, чтобы приблизить</div>
    `;
    document.body.appendChild(lb);
  }

  const wrap = lb.querySelector('.lightbox-img-wrap');
  const imgEl = lb.querySelector('img');
  const counter = lb.querySelector('.lightbox-counter');
  const prevBtn = lb.querySelector('.lightbox-prev');
  const nextBtn = lb.querySelector('.lightbox-next');
  const closeBtn = lb.querySelector('.lightbox-close');

  let items = [], index = 0, zoomed = false;
  let panX = 0, panY = 0, isDragging = false;
  let startX = 0, startY = 0, startPanX = 0, startPanY = 0;

  function updateTransform() {
    if (!zoomed) {
      imgEl.style.transform = '';
      panX = panY = 0;
    } else {
      imgEl.style.transform = `scale(2.2) translate(${panX}px, ${panY}px)`;
    }
  }

  function open(srcList, i) {
    items = srcList;
    index = i;
    resetZoom();
    imgEl.src = items[index];
    counter.textContent = (index + 1) + ' / ' + items.length;
    counter.style.display = items.length > 1 ? '' : 'none';
    prevBtn.style.display = items.length > 1 ? '' : 'none';
    nextBtn.style.display = items.length > 1 ? '' : 'none';
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    resetZoom();
  }

  function next() { index = (index + 1) % items.length; resetZoom(); imgEl.src = items[index]; counter.textContent = (index + 1) + ' / ' + items.length; }
  function prev() { index = (index - 1 + items.length) % items.length; resetZoom(); imgEl.src = items[index]; counter.textContent = (index + 1) + ' / ' + items.length; }

  function resetZoom() {
    zoomed = false;
    panX = panY = 0;
    wrap.classList.remove('zoomed', 'dragging');
    updateTransform();
  }

  function toggleZoom() {
    zoomed = !zoomed;
    panX = panY = 0;
    wrap.classList.toggle('zoomed', zoomed);
    updateTransform();
  }

  // Клик по фото — зум
  wrap.addEventListener('click', (e) => {
    if (isDragging) return;
    e.stopPropagation();
    toggleZoom();
  });

  // Таскание картинки при зуме
  wrap.addEventListener('mousedown', (e) => {
    if (!zoomed) return;
    isDragging = false;
    startX = e.clientX;
    startY = e.clientY;
    startPanX = panX;
    startPanY = panY;
    wrap.classList.add('dragging');
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!zoomed || !wrap.classList.contains('dragging')) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) isDragging = true;
    panX = startPanX + dx / 2.2;
    panY = startPanY + dy / 2.2;
    updateTransform();
  });

  document.addEventListener('mouseup', () => {
    wrap.classList.remove('dragging');
    setTimeout(() => { isDragging = false; }, 50);
  });

  // Колесо мыши — зум
  wrap.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (e.deltaY < 0 && !zoomed) toggleZoom();
    if (e.deltaY > 0 && zoomed) toggleZoom();
  }, { passive: false });

  // Тач-жесты
  let lastTouchDist = 0;
  wrap.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
      lastTouchDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
    }
  }, { passive: true });

  wrap.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2 && !zoomed) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      if (dist - lastTouchDist > 40) { toggleZoom(); lastTouchDist = dist; }
    }
  }, { passive: true });

  closeBtn.addEventListener('click', close);
  nextBtn.addEventListener('click', (e) => { e.stopPropagation(); next(); });
  prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prev(); });

  lb.addEventListener('click', (e) => {
    if (e.target === lb) close();
  });

  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') { zoomed ? resetZoom() : close(); }
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });

  // Делегирование — открытие по клику на картинки
  document.addEventListener('click', (e) => {
    const target = e.target.closest('img');
    if (!target) return;
    const container = target.closest('.tour-gallery, .tour-card-img, .hero-visual, .features-visual, .seasonal-card');
    if (!container) return;
    if (target.closest('.lightbox')) return;

    const imgs = [...container.querySelectorAll('img')].map(i => i.currentSrc || i.src);
    const startIndex = imgs.indexOf(target.currentSrc || target.src);
    if (startIndex === -1) return;

    e.preventDefault();
    open(imgs, startIndex);
  });
}

function initImageFallback(){
  const FALLBACK='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#E8F0E9"/><stop offset="100%" stop-color="#F5F1E8"/></linearGradient></defs><rect width="400" height="300" fill="url(#g)"/><g transform="translate(200 145)"><circle r="60" fill="#3D5A40"/><g transform="translate(-13 -13)" fill="none" stroke="white" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></g></g><text x="200" y="245" text-anchor="middle" fill="#3D5A40" font-family="Georgia, serif" font-size="24" font-weight="500">Tourline</text></svg>`);
  document.querySelectorAll('img').forEach(img=>{
    if(img.dataset.fallbackBound)return;img.dataset.fallbackBound='1';
    img.addEventListener('error',function(){if(this.src===FALLBACK)return;this.src=FALLBACK;this.classList.add('img-fallback');this.alt='Tourline'});
    if(img.complete&&img.naturalWidth===0){img.src=FALLBACK;img.classList.add('img-fallback')}
  });
}

function initSearchForm(){
  const form=document.querySelector('.search-form[data-form="search"]');if(!form)return;
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const data=new FormData(form);
    const dest=(data.get('dest')||'').toString().trim().toLowerCase();
    if(!dest){showToast('Укажите направление');return}
    const q=dest.split(/[\s,]+/).filter(Boolean);
    let matched=null;
    if(window.TOURS){
      matched=Object.values(window.TOURS).find(t=>{
        const hay=(t.title+' '+t.country+' '+t.region+' '+t.shortDesc).toLowerCase();
        return q.some(x=>x.length>2&&hay.includes(x));
      });
    }
    if(matched){showToast('✓ Нашли: '+matched.title);setTimeout(()=>location.href='tour.html?id='+matched.id,600)}
    else{showToast('Открываем каталог…');setTimeout(()=>location.href='destinations.html',600)}
  });
}

const EXTRA_REVIEWS=[
  {text:'«Гид показал места, куда не водят туристов.»',name:'Екатерина Волкова',meta:'Киото, апрель 2025',avatar:'https://i.pravatar.cc/80?img=33'},
  {text:'«Лофотены в июне: солнце не заходит, фьорды невероятные.»',name:'Игорь Семёнов',meta:'Лофотены, июнь 2025',avatar:'https://i.pravatar.cc/80?img=14'},
  {text:'«Прованс в сезон лаванды — сказка.»',name:'Ольга Кузнецова',meta:'Прованс, июль 2024',avatar:'https://i.pravatar.cc/80?img=45'},
  {text:'«Рим за 5 дней — всё успели, Ватикан без очередей.»',name:'Сергей Петров',meta:'Рим, октябрь 2024',avatar:'https://i.pravatar.cc/80?img=68'},
  {text:'«Были с детьми, менеджер учёл всё.»',name:'Наталья Орлова',meta:'Лигурия, август 2024',avatar:'https://i.pravatar.cc/80?img=20'},
  {text:'«Санторини в бархатный сезон — лучшее решение.»',name:'Павел Никитин',meta:'Санторини, сентябрь 2025',avatar:'https://i.pravatar.cc/80?img=25'}
];

function initLoadMoreReviews(){
  const btn=document.querySelector('[data-load-more-reviews]');if(!btn)return;
  const grid=document.querySelector('.reviews-grid-full');if(!grid)return;
  let n=0;const B=6;
  btn.addEventListener('click',()=>{
    const next=EXTRA_REVIEWS.slice(n,n+B);
    if(!next.length){btn.disabled=true;btn.textContent='Больше отзывов нет';return}
    next.forEach(r=>{
      grid.insertAdjacentHTML('beforeend',`<div class="review-card fade-in"><div class="review-stars">★★★★★</div><p class="review-text">${r.text}</p><div class="review-author"><img src="${r.avatar}" alt=""><div><strong>${r.name}</strong><span>${r.meta}</span></div></div></div>`);
    });
    n+=next.length;
    if(n>=EXTRA_REVIEWS.length){btn.disabled=true;btn.textContent='Больше отзывов нет'}
    showToast('✓ Загружено ещё '+next.length+' отзывов');
  });
}

onReady(()=>{
  document.addEventListener('click',e=>{
    const btn=e.target.closest('[data-fav-id]');if(!btn)return;
    e.preventDefault();e.stopPropagation();
    const user=typeof getCurrentUser==='function'?getCurrentUser():null;
    if(!user){showToast('Войдите, чтобы добавить в избранное');setTimeout(()=>location.href='auth.html',700);return}
    const tourId=btn.dataset.favId;const tour=window.TOURS?window.TOURS[tourId]:null;if(!tour)return;
    let favs=getFavorites();
    const ex=favs.find(f=>f.userId===user.id&&f.tourId===tourId);
    if(ex){favs=favs.filter(f=>!(f.userId===user.id&&f.tourId===tourId));saveFavorites(favs);btn.style.color='#3D5A40';btn.querySelector('svg').setAttribute('fill','none');showToast('Удалено из избранного')}
    else{favs.push({userId:user.id,tourId:tour.id,tourTitle:tour.title,shortDesc:tour.shortDesc,image:tour.image,price:tour.price});saveFavorites(favs);btn.style.color='#B85C58';btn.querySelector('svg').setAttribute('fill','#B85C58');showToast('♥ Добавлено в избранное')}
  });
});
/* ============================================
   УМНЫЙ ФОЛБЭК КАРТИНОК
============================================ */
function initBrokenImages() {
  // Тематические seed-ы для категорий туров
  const seedMap = {
    'beach': 'sea-coast-sand',
    'mountains': 'mountain-peaks-fog',
    'cities': 'city-street-architecture',
    'excursion': 'old-town-culture',
    'cruise': 'ocean-yacht'
  };

  document.querySelectorAll('img[data-fallback-src], .tour-card-img img, .seasonal-card img, .hero-img').forEach(img => {
    if (img.dataset.brokenBound) return;
    img.dataset.brokenBound = '1';

    // Если у картинки нет data-fallback-src — подставляем универсальный picsum
    if (!img.dataset.fallbackSrc) {
      const card = img.closest('[data-tour]');
      const type = card ? card.dataset.type : '';
      const seed = seedMap[type] || 'travel-scene';
      const unique = 'tl-' + Math.random().toString(36).slice(2, 8);
      img.dataset.fallbackSrc = `https://picsum.photos/seed/${seed}-${unique}/800/600`;
    }

    img.addEventListener('error', function () {
      if (this.dataset.triedFallback) return;
      this.dataset.triedFallback = '1';
      this.src = this.dataset.fallbackSrc;
    });

    // Если картинка уже не загрузилась до навешивания обработчика
    if (img.complete && img.naturalWidth === 0) {
      img.dataset.triedFallback = '1';
      img.src = img.dataset.fallbackSrc;
    }
  });
}
/* ============================================
   ТЁМНАЯ ТЕМА
============================================ */
function initTheme() {
  const KEY = 'tl-theme';
  const saved = localStorage.getItem(KEY);

  // Определяем тему: сохранённую или системную
  const systemDark = window.matchMedia &&
                     window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (systemDark ? 'dark' : 'light');

  applyTheme(theme);
  injectToggleButton();
  bindToggle();
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('tl-theme', theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

function injectToggleButton() {
  // Если кнопка уже есть — не дублировать
  if (document.querySelector('.theme-toggle')) return;

  const actions = document.querySelector('.header-actions');
  if (!actions) return;

  const btn = document.createElement('button');
  btn.className = 'theme-toggle';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Переключить тему');
  btn.title = 'Светлая / тёмная тема';
  btn.innerHTML = `
    <svg class="icon-sun" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2"/>
      <path d="M12 20v2"/>
      <path d="m4.93 4.93 1.41 1.41"/>
      <path d="m17.66 17.66 1.41 1.41"/>
      <path d="M2 12h2"/>
      <path d="M20 12h2"/>
      <path d="m6.34 17.66-1.41 1.41"/>
      <path d="m19.07 4.93-1.41 1.41"/>
    </svg>
    <svg class="icon-moon" viewBox="0 0 24 24">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/>
    </svg>
  `;

  // Вставляем перед кнопкой "Войти" или перед кнопкой "Забронировать"
  const authSlot = actions.querySelector('[data-auth-slot]');
  if (authSlot) {
    actions.insertBefore(btn, authSlot);
  } else {
    actions.insertBefore(btn, actions.firstChild);
  }
}

function bindToggle() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.theme-toggle');
    if (!btn) return;
    btn.style.transform = 'rotate(180deg) scale(0.9)';
    setTimeout(() => { btn.style.transform = ''; }, 250);
    toggleTheme();
  });
}