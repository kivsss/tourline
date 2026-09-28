function onReady(fn){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fn);else fn()}
function escapeHtml(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
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
    renderAllTours(allToursEl);initFilters();initImageFallback();markFavoriteHearts();
  }
  const tourContent=document.getElementById('tour-content');
  if(tourContent){
    if(!window.TOURS){const l=document.getElementById('tour-loading'),e=document.getElementById('tour-error');if(l)l.style.display='none';if(e)e.style.display='';return}
    renderTourDetail();
  }
}

function initHeader(){const h=document.querySelector('.header');if(!h)return;window.addEventListener('scroll',()=>h.classList.toggle('scrolled',window.scrollY>10))}

function initMobileMenu() {
  const burger = document.querySelector('.burger');
  if (!burger) return;

  // Если меню ещё не создано
  if (!document.querySelector('.mobile-menu')) {
    const menu = document.createElement('div');
    menu.className = 'mobile-menu';
    menu.innerHTML = `
      <button class="close" aria-label="Закрыть">×</button>
      <nav>
        <a href="index.html">Главная</a>
        <a href="destinations.html">Направления</a>
        <a href="tours.html">Туры</a>
        <a href="weekly.html">Туры недели</a>
        <a href="reviews.html">Отзывы</a>
        <a href="about.html">О нас</a>
        <a href="contacts.html">Контакты</a>
        <a href="faq.html">Частые вопросы</a>
        <a href="admin.html">Админ-панель</a>
      </nav>
      <a href="#" class="btn btn-primary" data-modal="booking">Забронировать тур</a>
      <a href="tel:+74951204580" class="btn btn-outline" style="margin-top:12px;">+7 495 120-45-80</a>
    `;
    document.body.appendChild(menu);

    burger.addEventListener('click', () => menu.classList.add('open'));
    menu.querySelector('.close').addEventListener('click', () => menu.classList.remove('open'));
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => menu.classList.remove('open'));
    });
  }
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
      ${datepickerFieldHTML('date', 'Дата вылета')}
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
     <button type="button" class="fav-toggle" data-fav-id="${t.id}" aria-label="В избранное">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
  </svg>
</button>
    </div>
    <div class="tour-card-body">
      <div class="tour-card-top"><h4>${t.title}</h4><span class="tour-rating">★ ${t.rating}</span></div>
      <p class="tour-card-desc">${t.shortDesc}</p>
      <div class="tour-card-price"><strong>от ${formatPrice(t.price)} ₽</strong><span>→</span></div>
    </div>
  </a>`;
}

function renderAllTours(c){c.innerHTML=Object.values(window.TOURS).map(tourCardHTML).join('');markFavoriteHearts();}

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
  // Инициализация кнопки избранного для этого тура
const favBtn = document.getElementById('tour-fav-btn');
if (favBtn) {
  favBtn.dataset.favId = tour.id;
  
  // Проверяем, в избранном ли тур
  const user = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
  if (user) {
    const favs = typeof getFavorites === 'function' ? getFavorites() : [];
    const isFav = favs.some(f => f.userId === user.id && f.tourId === tour.id);
    if (isFav) {
      favBtn.classList.add('favorited');
      const svg = favBtn.querySelector('svg');
      if (svg) svg.setAttribute('fill', 'currentColor');
    }
  }
}
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
 document.getElementById('t-manager').innerHTML = `
  <div class="manager-head">
    <img src="${tour.manager.avatar}" alt="${tour.manager.name}">
    <div>
      <h4>${tour.manager.name}</h4>
      <p>${tour.manager.role}</p>
    </div>
  </div>
  <div class="manager-contacts">
    <a href="tel:${tour.manager.phone.replace(/\s/g,'')}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/>
      </svg>
      ${tour.manager.phone}
    </a>
    <a href="mailto:${tour.manager.email}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
      ${tour.manager.email}
    </a>
    <span class="manager-note">На связи с 9:00 до 21:00</span>
  </div>
`;
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

document.addEventListener('click', e => {
  const btn = e.target.closest('[data-fav-id]');
  if (!btn) return;
  e.preventDefault();
  e.stopPropagation();

  const user = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
  if (!user) {
    showToast('Войдите, чтобы добавить в избранное');
    setTimeout(() => window.location.href = 'auth.html', 700);
    return;
  }

  const tourId = btn.dataset.favId;
  const tour = window.TOURS ? window.TOURS[tourId] : null;
  if (!tour) return;

  let favs = getFavorites();
  const ex = favs.find(f => f.userId === user.id && f.tourId === tourId);
  const svg = btn.querySelector('svg');

  if (ex) {
    favs = favs.filter(f => !(f.userId === user.id && f.tourId === tourId));
    saveFavorites(favs);
    btn.classList.remove('favorited');
    if (svg) svg.setAttribute('fill', 'none');
    showToast('Удалено из избранного');
  } else {
    favs.push({
      userId: user.id,
      tourId: tour.id,
      tourTitle: tour.title,
      shortDesc: tour.shortDesc,
      image: tour.image,
      price: tour.price
    });
    saveFavorites(favs);
    btn.classList.add('favorited');
    if (svg) svg.setAttribute('fill', 'currentColor');
    btn.classList.add('just-clicked');
setTimeout(() => btn.classList.remove('just-clicked'), 500);
    showToast('♥ Добавлено в избранное');
  }
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
/* ============================================
   ОТМЕТКА ИЗБРАННЫХ СЕРДЕЦ ПРИ ЗАГРУЗКЕ
============================================ */
function markFavoriteHearts() {
  const user = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
  if (!user) return;

  const favs = typeof getFavorites === 'function' ? getFavorites() : [];
  const userFavIds = favs
    .filter(f => f.userId === user.id)
    .map(f => f.tourId);

  document.querySelectorAll('[data-fav-id]').forEach(btn => {
    const id = btn.dataset.favId;
    const isFav = userFavIds.includes(id);

    btn.classList.toggle('favorited', isFav);
    const svg = btn.querySelector('svg');
    if (svg) {
      svg.setAttribute('fill', isFav ? 'currentColor' : 'none');
    }
  });
}

// Перепроверяем после каждой отрисовки карточек
window.markFavoriteHearts = markFavoriteHearts;
/* ============================================================
   УВЕДОМЛЕНИЯ ДЛЯ АДМИНИСТРАТОРА
   Все формы на сайте отправляют сюда
============================================================ */
(function () {
  'use strict';

  const NOTIF_KEY = 'tl-notifications';
  const MAX_NOTIF = 100;

  function loadNotifs() {
    try { return JSON.parse(localStorage.getItem(NOTIF_KEY)) || []; }
    catch (e) { return []; }
  }
  function saveNotifs(list) {
    try { localStorage.setItem(NOTIF_KEY, JSON.stringify(list.slice(0, MAX_NOTIF))); }
    catch (e) {}
  }

  // Универсальная функция — кладёт уведомление
  window.addNotification = function (opts) {
    const notifs = loadNotifs();
    const item = {
      id: 'n_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
      type: opts.type || 'info',
      title: opts.title || 'Новое событие',
      message: opts.message || '',
      data: opts.data || {},
      createdAt: new Date().toISOString(),
      read: false
    };
    notifs.unshift(item);
    saveNotifs(notifs);

    // Обновляем счётчики, если админка открыта
    if (typeof window.updateAdminNotifBadge === 'function') {
      window.updateAdminNotifBadge();
    }
    if (typeof window.renderAdminNotifications === 'function') {
      window.renderAdminNotifications();
    }
    return item;
  };

  // Читаем данные из формы
  function extractFormData(form) {
    const fd = new FormData(form);
    const data = {};
    for (const [k, v] of fd.entries()) {
      if (typeof v === 'string' && v.trim()) data[k] = v.trim();
    }
    return data;
  }

  // Метаданные для каждого типа формы
  const FORM_META = {
    'booking':      { type: 'booking',   title: 'Новая заявка на подбор тура',     icon: '🏝' },
    'callback':     { type: 'callback',  title: 'Запрос обратного звонка',           icon: '📞' },
    'tour':         { type: 'booking',   title: 'Бронирование тура',                 icon: '✈️' },
    'tour-detail':  { type: 'booking',   title: 'Заявка на бронь с карточки тура',   icon: '✈️' },
    'cta':          { type: 'cta',       title: 'Заявка из блока «Не нашли тур?»',   icon: '💬' },
    'contact':      { type: 'contact',   title: 'Сообщение с формы «Контакты»',      icon: '✉️' },
    'about-contact':{ type: 'contact',   title: 'Сообщение с формы «О нас»',         icon: '✉️' },
    'resume':       { type: 'resume',    title: 'Отклик на вакансию',                icon: '📋' },
    'review':       { type: 'review',    title: 'Новый отзыв от клиента',            icon: '⭐' }
  };

  // Перехватываем отправку всех форм
  document.addEventListener('submit', function (e) {
    const form = e.target.closest('form');
    if (!form) return;
    const key = form.dataset.form;
    if (!key || key === 'search') return;
    if (key === 'auth-login' || key === 'auth-register') return;
    const meta = FORM_META[key];
    if (!meta) return;

    // Небольшая задержка — чтобы данные успели записаться в другие обработчики
    setTimeout(function () {
      const data = extractFormData(form);
      const tourParam = new URLSearchParams(location.search).get('id');
      if (tourParam && window.TOURS && window.TOURS[tourParam]) {
        data.tour = data.tour || window.TOURS[tourParam].title;
        data.tourId = tourParam;
      }

      // Собираем читаемый текст
      const parts = [];
      if (data.name) parts.push('от ' + data.name);
      if (data.contact) parts.push(data.contact);
      if (data.phone) parts.push(data.phone);
      if (data.tour || data.direction) parts.push('Тур: ' + (data.tour || data.direction));
      if (data.date) parts.push('Дата: ' + data.date);
      if (data.guests) parts.push(data.guests);
      if (data.subject) parts.push('Тема: ' + data.subject);
      if (data.message) parts.push('«' + data.message.slice(0, 120) + '»');

      window.addNotification({
        type: meta.type,
        title: meta.title,
        message: parts.join(' · ') || 'Без подробностей',
        data: data
      });
    }, 100);
  }, true);
})();
function setVal(id, v) {
  const el = document.getElementById(id);
  if (el && v !== undefined) el.value = v;
}
/* ============================================================
   КАСТОМНЫЕ ВЫПАДАЮЩИЕ СПИСКИ
============================================================ */
function initCustomSelects() {
  const selects = document.querySelectorAll('.custom-select');

  selects.forEach(select => {
    const trigger = select.querySelector('.custom-select-trigger');
    const dropdown = select.querySelector('.custom-select-dropdown');
    const options = select.querySelectorAll('.custom-select-option');
    const valueEl = select.querySelector('.custom-select-value');
    const hiddenInput = select.querySelector('input[type="hidden"]');
    const searchInput = select.querySelector('[data-select-search]');
    const emptyMsg = select.querySelector('[data-select-empty]');

    if (!trigger || !dropdown) return;

    // ===== Открыть / закрыть =====
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = select.classList.contains('open');

      document.querySelectorAll('.custom-select.open').forEach(s => {
        if (s !== select) s.classList.remove('open');
      });

      select.classList.toggle('open', !isOpen);
      trigger.setAttribute('aria-expanded', !isOpen);

      // Фокус на поиск, если есть
      if (!isOpen && searchInput) {
        setTimeout(() => searchInput.focus(), 100);
      }
    });

    // ===== Выбор опции =====
    options.forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        const value = option.dataset.value;

        options.forEach(o => o.classList.remove('active'));
        option.classList.add('active');

        if (valueEl) {
          valueEl.textContent = value;
          valueEl.classList.remove('placeholder');
        }
        if (hiddenInput) hiddenInput.value = value;

        select.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');

        // Сброс поиска
        if (searchInput) {
          searchInput.value = '';
          filterOptions('');
        }

        select.dispatchEvent(new CustomEvent('change', { detail: { value } }));
      });
    });

    // ===== Фильтрация через поиск =====
    function filterOptions(query) {
      const q = query.trim().toLowerCase();
      let visibleCount = 0;

      options.forEach(opt => {
        const text = (opt.textContent || '').toLowerCase();
        const tags = (opt.dataset.tags || '').toLowerCase();
        const match = !q || text.includes(q) || tags.includes(q);
        opt.style.display = match ? '' : 'none';
        if (match) visibleCount++;
      });

      if (emptyMsg) {
        emptyMsg.style.display = visibleCount === 0 ? '' : 'none';
      }
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        filterOptions(e.target.value);
      });

      // Enter не должен отправлять форму
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          // Автовыбор первой видимой опции
          const firstVisible = [...options].find(o => o.style.display !== 'none');
          if (firstVisible) firstVisible.click();
        }
        if (e.key === 'Escape') {
          select.classList.remove('open');
          trigger.setAttribute('aria-expanded', 'false');
        }
      });
    }
  });

  // Закрытие по клику вне
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.custom-select')) {
      document.querySelectorAll('.custom-select.open').forEach(s => {
        s.classList.remove('open');
        const t = s.querySelector('.custom-select-trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
        const si = s.querySelector('[data-select-search]');
        if (si) {
          si.value = '';
          // Сброс фильтра
          s.querySelectorAll('.custom-select-option').forEach(o => o.style.display = '');
          const empty = s.querySelector('[data-select-empty]');
          if (empty) empty.style.display = 'none';
        }
      });
    }
  });

  // Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.custom-select.open').forEach(s => {
        s.classList.remove('open');
        const t = s.querySelector('.custom-select-trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    }
  });
}
// Вызов при загрузке
onReady(() => {
  initCustomSelects();
});
/* ============================================================
   КАЛЕНДАРЬ ВЫБОРА ДАТ
============================================================ */
function initDatepickers() {
  const pickers = document.querySelectorAll('[data-datepicker]');

  const MONTH_NAMES = [
    'Январь','Февраль','Март','Апрель','Май','Июнь',
    'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'
  ];

  pickers.forEach(picker => {
    const trigger = picker.querySelector('.datepicker-trigger');
    const dropdown = picker.querySelector('.datepicker-dropdown');
    const valueEl = picker.querySelector('.datepicker-value');
    const monthEl = picker.querySelector('[data-dp-month]');
    const grid = picker.querySelector('[data-dp-grid]');
    const prevBtn = picker.querySelector('[data-dp-prev]');
    const nextBtn = picker.querySelector('[data-dp-next]');
    const clearBtn = picker.querySelector('[data-dp-clear]');
    const applyBtn = picker.querySelector('[data-dp-apply]');
    const hiddenValue = picker.querySelector('[data-dp-value]');
    const hiddenFrom = picker.querySelector('[data-dp-from]');
    const hiddenTo = picker.querySelector('[data-dp-to]');

    if (!trigger || !grid) return;

    // Текущий отображаемый месяц
    const today = new Date();
    let viewYear = today.getFullYear();
    let viewMonth = today.getMonth();

    // Выбранный диапазон
    let rangeStart = null;
    let rangeEnd = null;

    // ===== Отрисовка календаря =====
    function renderCalendar() {
      // Заголовок
      monthEl.textContent = MONTH_NAMES[viewMonth] + ' ' + viewYear;

      // Сетка
      grid.innerHTML = '';

      // Первый день месяца
      const firstDay = new Date(viewYear, viewMonth, 1);
      // День недели первого дня (0 = Вс, 1 = Пн, ...). Переводим в формат Пн = 0
      let startDay = firstDay.getDay() - 1;
      if (startDay < 0) startDay = 6;

      // Дней в месяце
      const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

      // Дней в предыдущем месяце
      const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

      // Пустые ячейки до начала месяца + дни предыдущего месяца
      for (let i = 0; i < startDay; i++) {
        const dayNum = daysInPrevMonth - startDay + i + 1;
        const btn = createDayButton(dayNum, true, viewYear, viewMonth - 1, dayNum);
        grid.appendChild(btn);
      }

      // Дни текущего месяца
      for (let d = 1; d <= daysInMonth; d++) {
        const btn = createDayButton(d, false, viewYear, viewMonth, d);
        grid.appendChild(btn);
      }

      // Дни следующего месяца — чтобы заполнить последнюю неделю
      const totalCells = startDay + daysInMonth;
      const remaining = (7 - (totalCells % 7)) % 7;
      for (let i = 1; i <= remaining; i++) {
        const btn = createDayButton(i, true, viewYear, viewMonth + 1, i);
        grid.appendChild(btn);
      }
    }

    // ===== Создание кнопки дня =====
    function createDayButton(day, isOtherMonth, y, m, d) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'datepicker-day';
      btn.textContent = day;

      // Нормализуем месяц
      const realDate = new Date(y, m, d);
      const dateStr = realDate.toISOString().slice(0, 10);

      // Прошедшие дни — недоступны
      const todayMidnight = new Date();
      todayMidnight.setHours(0, 0, 0, 0);
      if (realDate < todayMidnight) {
        btn.classList.add('disabled');
        btn.disabled = true;
      }

      // Сегодняшний день
      if (
        realDate.getDate() === today.getDate() &&
        realDate.getMonth() === today.getMonth() &&
        realDate.getFullYear() === today.getFullYear()
      ) {
        btn.classList.add('today');
      }

      // Дни другого месяца
      if (isOtherMonth) {
        btn.classList.add('other-month');
      }

      // Подсветка выбранного диапазона
      if (rangeStart && rangeEnd) {
        const start = new Date(rangeStart);
        const end = new Date(rangeEnd);
        if (realDate.getTime() === start.getTime()) {
          btn.classList.add('range-start');
          if (start.getTime() === end.getTime()) btn.classList.add('range-end');
        } else if (realDate.getTime() === end.getTime()) {
          btn.classList.add('range-end');
        } else if (realDate > start && realDate < end) {
          btn.classList.add('in-range');
        }
      } else if (rangeStart) {
        const start = new Date(rangeStart);
        if (realDate.getTime() === start.getTime()) {
          btn.classList.add('range-start', 'range-end');
        }
      }

      // Клик
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        selectDate(dateStr);
      });

      return btn;
    }

    // ===== Выбор даты =====
    function selectDate(dateStr) {
      const date = new Date(dateStr);

      // Логика диапазона:
      // 1. Если нет начала — устанавливаем начало
      // 2. Если есть начало, но нет конца — устанавливаем конец
      // 3. Если есть оба — начинаем новый диапазон
      if (!rangeStart || (rangeStart && rangeEnd)) {
        rangeStart = dateStr;
        rangeEnd = null;
      } else if (rangeStart && !rangeEnd) {
        if (dateStr < rangeStart) {
          // Пользователь выбрал дату раньше начала — меняем местами
          rangeEnd = rangeStart;
          rangeStart = dateStr;
        } else if (dateStr === rangeStart) {
          // Тот же день — считаем одиночным выбором
          rangeEnd = dateStr;
        } else {
          rangeEnd = dateStr;
        }
      }

      renderCalendar();
    }

    // ===== Форматирование даты для отображения =====
    function formatDate(dateStr) {
      if (!dateStr) return '';
      const d = new Date(dateStr);
      const day = d.getDate();
      const month = MONTH_NAMES[d.getMonth()].toLowerCase();
      return day + ' ' + month.slice(0, 3) + '.';
    }

    function formatRange() {
      if (!rangeStart) return 'Любые даты';
      if (rangeStart && rangeEnd && rangeStart !== rangeEnd) {
        return formatDate(rangeStart) + ' — ' + formatDate(rangeEnd);
      }
      return formatDate(rangeStart);
    }

    // ===== Открытие / закрытие =====
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = picker.classList.contains('open');

      document.querySelectorAll('[data-datepicker].open').forEach(p => {
        if (p !== picker) p.classList.remove('open');
      });

      picker.classList.toggle('open', !isOpen);
      trigger.setAttribute('aria-expanded', !isOpen);

      if (!isOpen) renderCalendar();
    });

    // ===== Навигация =====
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      viewMonth--;
      if (viewMonth < 0) { viewMonth = 11; viewYear--; }
      renderCalendar();
    });

    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      viewMonth++;
      if (viewMonth > 11) { viewMonth = 0; viewYear++; }
      renderCalendar();
    });

    // ===== Сброс =====
    clearBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      rangeStart = null;
      rangeEnd = null;
      valueEl.textContent = 'Любые даты';
      if (hiddenValue) hiddenValue.value = '';
      if (hiddenFrom) hiddenFrom.value = '';
      if (hiddenTo) hiddenTo.value = '';
      renderCalendar();
    });

    // ===== Применить =====
    applyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (rangeStart) {
        valueEl.textContent = formatRange();
        if (hiddenValue) hiddenValue.value = formatRange();
        if (hiddenFrom) hiddenFrom.value = rangeStart;
        if (hiddenTo) hiddenTo.value = rangeEnd || rangeStart;
      } else {
        valueEl.textContent = 'Любые даты';
        if (hiddenValue) hiddenValue.value = '';
      }

      picker.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');

      picker.dispatchEvent(new CustomEvent('change', {
        detail: { from: rangeStart, to: rangeEnd }
      }));
    });

    // Начальная отрисовка
    renderCalendar();
  });

  // Закрытие по клику вне
  document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-datepicker]')) {
      document.querySelectorAll('[data-datepicker].open').forEach(p => {
        p.classList.remove('open');
        const t = p.querySelector('.datepicker-trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('[data-datepicker].open').forEach(p => {
        p.classList.remove('open');
        const t = p.querySelector('.datepicker-trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    }
  });
}

// Вызов при загрузке
onReady(() => {
  initDatepickers();
});
/* ============================================================
   ШАБЛОН КАЛЕНДАРЯ (для повторного использования)
============================================================ */
function datepickerFieldHTML(fieldName, label) {
  const id = 'dp-' + fieldName + '-' + Math.random().toString(36).slice(2, 6);
  return `
    <div class="form-group">
      <label>${label}</label>
      <div class="datepicker" data-datepicker data-name="${fieldName}">
        <button type="button" class="datepicker-trigger datepicker-trigger--field" aria-haspopup="dialog" aria-expanded="false">
          <span class="datepicker-value placeholder">дд.мм.гггг</span>
          <svg class="datepicker-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
        <div class="datepicker-dropdown" role="dialog">
          <div class="datepicker-header">
            <button type="button" class="datepicker-nav" data-dp-prev aria-label="Назад">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <div class="datepicker-month" data-dp-month>Месяц</div>
            <button type="button" class="datepicker-nav" data-dp-next aria-label="Вперёд">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>
          <div class="datepicker-weekdays">
            <span>Пн</span><span>Вт</span><span>Ср</span><span>Чт</span><span>Пт</span><span>Сб</span><span>Вс</span>
          </div>
          <div class="datepicker-grid" data-dp-grid></div>
          <div class="datepicker-footer">
            <button type="button" class="datepicker-btn datepicker-btn--clear" data-dp-clear>Очистить</button>
            <button type="button" class="datepicker-btn datepicker-btn--apply" data-dp-apply>Сегодня</button>
          </div>
        </div>
        <input type="hidden" name="${fieldName}" data-dp-value>
        <input type="hidden" name="${fieldName}From" data-dp-from>
        <input type="hidden" name="${fieldName}To" data-dp-to>
      </div>
    </div>
  `;
}
/* ============================================================
   АВТОЗАМЕНА ВСЕХ <input type="date"> НА КАСТОМНЫЙ КАЛЕНДАРЬ
   Работает на всех страницах: index, tour, admin
============================================================ */

const DP_MONTHS = [
  'Январь','Февраль','Март','Апрель','Май','Июнь',
  'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'
];

/**
 * Конвертирует один <input type="date"> в кастомный календарь
 */
function convertDateInput(input) {
  if (input.dataset.dpConverted === '1') return;
  input.dataset.dpConverted = '1';

  const name = input.name || '';
  const label = input.getAttribute('placeholder') || 'дд.мм.гггг';

  // ===== Собираем wrapper =====
  const wrapper = document.createElement('div');
  wrapper.className = 'datepicker datepicker--inline';
  wrapper.dataset.datepicker = '';
  wrapper.dataset.name = name;

  wrapper.innerHTML = `
    <button type="button" class="datepicker-trigger datepicker-trigger--field"
            aria-haspopup="dialog" aria-expanded="false">
      <span class="datepicker-value placeholder">${label}</span>
      <svg class="datepicker-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    </button>

    <div class="datepicker-dropdown" role="dialog">
      <div class="datepicker-header">
        <button type="button" class="datepicker-nav" data-dp-prev aria-label="Назад">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <div class="datepicker-month" data-dp-month>Месяц</div>
        <button type="button" class="datepicker-nav" data-dp-next aria-label="Вперёд">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>

      <div class="datepicker-weekdays">
        <span>Пн</span><span>Вт</span><span>Ср</span><span>Чт</span>
        <span>Пт</span><span>Сб</span><span>Вс</span>
      </div>

      <div class="datepicker-grid" data-dp-grid></div>

      <div class="datepicker-footer">
        <button type="button" class="datepicker-btn datepicker-btn--clear" data-dp-clear>Очистить</button>
        <button type="button" class="datepicker-btn datepicker-btn--apply" data-dp-today>Сегодня</button>
      </div>
    </div>

    <input type="hidden" name="${name}" value="" data-dp-value>
  `;

  // ===== Вставляем перед оригинальным input и скрываем =====
  input.parentNode.insertBefore(wrapper, input);
  input.style.display = 'none';
  input.setAttribute('data-original-date-input', '1');

  // ===== Привязываем обработчики =====
  bindDatepicker(wrapper, input);
}

/**
 * Обработчики для одного календаря
 */
function bindDatepicker(picker, originalInput) {
  const trigger     = picker.querySelector('.datepicker-trigger');
  const dropdown    = picker.querySelector('.datepicker-dropdown');
  const valueEl     = picker.querySelector('.datepicker-value');
  const monthEl     = picker.querySelector('[data-dp-month]');
  const grid        = picker.querySelector('[data-dp-grid]');
  const prevBtn     = picker.querySelector('[data-dp-prev]');
  const nextBtn     = picker.querySelector('[data-dp-next]');
  const clearBtn    = picker.querySelector('[data-dp-clear]');
  const todayBtn    = picker.querySelector('[data-dp-today]');
  const hiddenInput = picker.querySelector('[data-dp-value]');

  if (!trigger || !grid) return;

  // ===== Текущий отображаемый месяц =====
  const today = new Date();
  let viewYear  = today.getFullYear();
  let viewMonth = today.getMonth();

  // ===== Выбранная дата =====
  let selectedDate = null;

  // ===== Отрисовка сетки =====
  function renderCalendar() {
    monthEl.textContent = DP_MONTHS[viewMonth] + ' ' + viewYear;
    grid.innerHTML = '';

    const firstDay = new Date(viewYear, viewMonth, 1);
    let startDay = firstDay.getDay() - 1;
    if (startDay < 0) startDay = 6;

    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const daysInPrev = new Date(viewYear, viewMonth, 0).getDate();

    // Дни предыдущего месяца
    for (let i = 0; i < startDay; i++) {
      const d = daysInPrev - startDay + i + 1;
      grid.appendChild(createDayButton(d, true, viewYear, viewMonth - 1, d));
    }

    // Дни текущего месяца
    for (let d = 1; d <= daysInMonth; d++) {
      grid.appendChild(createDayButton(d, false, viewYear, viewMonth, d));
    }

    // Дни следующего месяца
    const totalCells = startDay + daysInMonth;
    const remaining = (7 - (totalCells % 7)) % 7;
    for (let i = 1; i <= remaining; i++) {
      grid.appendChild(createDayButton(i, true, viewYear, viewMonth + 1, i));
    }
  }

  // ===== Кнопка дня =====
  function createDayButton(day, isOtherMonth, y, m, d) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'datepicker-day';
    btn.textContent = day;

    const realDate = new Date(y, m, d);
    const yyyy = realDate.getFullYear();
    const mm = String(realDate.getMonth() + 1).padStart(2, '0');
    const dd = String(realDate.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;

    // Прошедшие дни — недоступны
    const todayMidnight = new Date();
    todayMidnight.setHours(0, 0, 0, 0);
    if (realDate < todayMidnight) {
      btn.classList.add('disabled');
      btn.disabled = true;
    }

    // Сегодня
    if (
      realDate.getDate() === today.getDate() &&
      realDate.getMonth() === today.getMonth() &&
      realDate.getFullYear() === today.getFullYear()
    ) {
      btn.classList.add('today');
    }

    if (isOtherMonth) btn.classList.add('other-month');

    // Выбранный день
    if (selectedDate === dateStr) {
      btn.classList.add('selected');
    }

    // ===== Клик =====
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      selectedDate = dateStr;
      renderCalendar();

      // Подсвечиваем выбранное
      const dObj = new Date(y, m, d);
      const display = dObj.getDate() + ' ' +
                     DP_MONTHS[dObj.getMonth()].toLowerCase().slice(0, 3) + '. ' +
                     dObj.getFullYear();

      valueEl.textContent = display;
      valueEl.classList.remove('placeholder');
      if (hiddenInput) hiddenInput.value = dateStr;

      // Синхронизируем с оригинальным input
      if (originalInput) {
        originalInput.value = dateStr;
        originalInput.dispatchEvent(new Event('change', { bubbles: true }));
      }

      // Событие для внешних обработчиков
      picker.dispatchEvent(new CustomEvent('dateChange', {
        detail: { value: dateStr },
        bubbles: true
      }));

      // Закрываем
      picker.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
    });

    return btn;
  }

  // ===== Открытие / закрытие =====
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = picker.classList.contains('open');

    document.querySelectorAll('.datepicker.open').forEach(p => {
      if (p !== picker) p.classList.remove('open');
    });

    picker.classList.toggle('open', !isOpen);
    trigger.setAttribute('aria-expanded', String(!isOpen));

    if (!isOpen) renderCalendar();
  });

  // ===== Навигация по месяцам =====
  prevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    viewMonth--;
    if (viewMonth < 0) { viewMonth = 11; viewYear--; }
    renderCalendar();
  });

  nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    viewMonth++;
    if (viewMonth > 11) { viewMonth = 0; viewYear++; }
    renderCalendar();
  });

  // ===== Очистить =====
  clearBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    selectedDate = null;
    valueEl.textContent = 'дд.мм.гггг';
    valueEl.classList.add('placeholder');
    if (hiddenInput) hiddenInput.value = '';
    if (originalInput) {
      originalInput.value = '';
      originalInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
    renderCalendar();
  });

  // ===== Сегодня =====
  todayBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const t = new Date();
    const yyyy = t.getFullYear();
    const mm = String(t.getMonth() + 1).padStart(2, '0');
    const dd = String(t.getDate()).padStart(2, '0');
    selectedDate = `${yyyy}-${mm}-${dd}`;

    viewYear = t.getFullYear();
    viewMonth = t.getMonth();

    const display = t.getDate() + ' ' +
                    DP_MONTHS[t.getMonth()].toLowerCase().slice(0, 3) + '. ' +
                    t.getFullYear();
    valueEl.textContent = display;
    valueEl.classList.remove('placeholder');
    if (hiddenInput) hiddenInput.value = selectedDate;
    if (originalInput) {
      originalInput.value = selectedDate;
      originalInput.dispatchEvent(new Event('change', { bubbles: true }));
    }

    renderCalendar();
    picker.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
  });

  // Первая отрисовка
  renderCalendar();
}

/**
 * Найти и заменить ВСЕ <input type="date">
 */
function convertAllDateInputs() {
  const dateInputs = document.querySelectorAll('input[type="date"]:not([data-dp-converted])');
  dateInputs.forEach(convertDateInput);
}

/**
 * Глобальный запуск + слежение за DOM
 */
(function initAutoDateConvert() {
  function run() {
    convertAllDateInputs();

    const observer = new MutationObserver(() => {
      convertAllDateInputs();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }

  window.convertAllDateInputs = convertAllDateInputs;
})();
/* ============================================================
   АВТОЗАМЕНА ВСЕХ <select> НА КАСТОМНЫЕ ДРОПДАУНЫ
   Работает на всех страницах: index, tour, admin, auth, account
============================================================ */

/**
 * Конвертирует один <select> в кастомный дропдаун
 */
function convertSelect(select) {
  if (select.dataset.customConverted === '1') return;
  select.dataset.customConverted = '1';

  // ===== Собираем опции =====
  const options = Array.from(select.options).map(opt => ({
    value: opt.value !== '' ? opt.value : opt.textContent.trim(),
    text: opt.textContent.trim(),
    selected: opt.selected,
    disabled: opt.disabled
  }));

  if (!options.length) return;

  // ===== Текущее значение =====
  const selectedOpt = options.find(o => o.selected) || options[0];
  const currentValue = selectedOpt.value;
  const currentText = selectedOpt.text;
  const name = select.name || '';

  // ===== Определяем тип оформления =====
  // Если у select класс filter-select → оформляем как фильтр в админке
  // Если chip → как чип
  // Иначе → как обычный селект в форме
  let variantClass = '';
  if (select.classList.contains('filter-select')) {
    variantClass = 'custom-select--filter';
  } else if (select.classList.contains('filter-chip')) {
    variantClass = 'custom-select--chip';
  } else {
    variantClass = 'custom-select--form';
  }

  // ===== Собираем опции для дропдауна =====
  const optionsHTML = options.map(opt => `
    <div class="custom-select-option${opt.value === currentValue ? ' active' : ''}${opt.disabled ? ' disabled' : ''}"
         data-value="${escapeHtml(opt.value)}">
      ${escapeHtml(opt.text)}
    </div>
  `).join('');

  // ===== Строим wrapper =====
  const wrapper = document.createElement('div');
  wrapper.className = `custom-select ${variantClass}`;
  wrapper.dataset.selectName = name;

  wrapper.innerHTML = `
    <button type="button" class="custom-select-trigger" aria-haspopup="listbox" aria-expanded="false">
      <span class="custom-select-value">${escapeHtml(currentText)}</span>
      <svg class="custom-select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    </button>
    <div class="custom-select-dropdown" role="listbox">
      ${optionsHTML}
    </div>
    <input type="hidden" name="${escapeHtml(name)}" value="${escapeHtml(currentValue)}">
  `;

  // ===== Вставляем wrapper перед select и скрываем select =====
  select.parentNode.insertBefore(wrapper, select);
  select.style.display = 'none';

  // ===== Навешиваем обработчики =====
  bindSelectHandlers(wrapper, select);
}

/**
 * Обработчики для одного дропдауна
 */
function bindSelectHandlers(wrapper, originalSelect) {
  const trigger = wrapper.querySelector('.custom-select-trigger');
  const valueEl = wrapper.querySelector('.custom-select-value');
  const hiddenInput = wrapper.querySelector('input[type="hidden"]');
  const options = wrapper.querySelectorAll('.custom-select-option');

  if (!trigger) return;

  // ===== Открытие / закрытие =====
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = wrapper.classList.contains('open');

    // Закрываем все остальные
    document.querySelectorAll('.custom-select.open').forEach(s => {
      if (s !== wrapper) s.classList.remove('open');
    });

    wrapper.classList.toggle('open', !isOpen);
    trigger.setAttribute('aria-expanded', String(!isOpen));
  });

  // ===== Выбор опции =====
  options.forEach(option => {
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      if (option.classList.contains('disabled')) return;

      const value = option.dataset.value;
      const text = option.textContent.trim();

      // Обновляем активный
      options.forEach(o => o.classList.remove('active'));
      option.classList.add('active');

      // Обновляем видимое значение и hidden input
      if (valueEl) valueEl.textContent = text;
      if (hiddenInput) hiddenInput.value = value;

      // Синхронизируем с оригинальным select
      if (originalSelect) {
        originalSelect.value = value;
        originalSelect.dispatchEvent(new Event('change', { bubbles: true }));
      }

      // Кастомное событие
      wrapper.dispatchEvent(new CustomEvent('selectChange', {
        detail: { value, text },
        bubbles: true
      }));

      // Закрываем
      wrapper.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
    });
  });
}

/**
 * Найти и заменить ВСЕ <select> на странице
 */
function convertAllSelects() {
  const selects = document.querySelectorAll('select:not([data-custom-converted])');
  selects.forEach(convertSelect);
}

/**
 * Запуск при загрузке страницы + слежение за DOM
 */
(function initAutoConvert() {
  function run() {
    convertAllSelects();

    // Следим за появлением новых <select> (например, в модалках)
    const observer = new MutationObserver(() => {
      convertAllSelects();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }

  // Делаем доступной глобально (на случай ручного вызова)
  window.convertAllSelects = convertAllSelects;
})();