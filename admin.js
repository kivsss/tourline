/* ============================================================
   TOURLINE ADMIN — ЛОГИКА АДМИН-ПАНЕЛИ
   Все данные сохраняются в localStorage
============================================================ */

(function () {
  'use strict';

  /* ============================================================
     КОНСТАНТЫ И ХРАНИЛИЩЕ
  ============================================================ */
  const DATA_VERSION = 'v3';  // ↑ меняйте при обновлении структуры данных
  const KEYS = {
    version: 'tl-admin-data-version',
    users: 'tl-users',
    current: 'tl-current-user',
    adminSession: 'tl-admin-session',
    bookings: 'tl-bookings',
    clients: 'tl-clients',
    tours: 'tl-tours',
    reviews: 'tl-reviews',
    settings: 'tl-settings',
    adminProfile: 'tl-admin-profile',
    log: 'tl-admin-log'
  };
/* ============================================================
   ВАЛЮТЫ
============================================================ */
const CURRENCIES = {
  RUB: { code: 'RUB', symbol: '₽', label: 'российский рубль', rate: 1 },
  USD: { code: 'USD', symbol: '$', label: 'доллар США',       rate: 0.011 },  // 1 ₽ ≈ 0.011 $
  EUR: { code: 'EUR', symbol: '€', label: 'евро',             rate: 0.010 }   // 1 ₽ ≈ 0.010 €
};

/* Базовая валюта хранения — рубли */
const BASE_CURRENCY = 'RUB';

/* Возвращает объект текущей валюты */
function getCurrency() {
  const s = load(KEYS.settings, {});
  return CURRENCIES[s.currency] || CURRENCIES.RUB;
}

/* Символ валюты (₽ / $ / €) */
function getCurrencySymbol() {
  return getCurrency().symbol;
}

/* Форматирует число с учётом валюты */
function formatMoney(amountInBase) {
  const cur = getCurrency();
  const value = Math.round((amountInBase || 0) * cur.rate);
  return value.toLocaleString('ru-RU') + ' ' + cur.symbol;
}

/* Форматирует число БЕЗ символа (для случаев, где символ уже в шаблоне) */
function formatMoneyNumber(amountInBase) {
  const cur = getCurrency();
  return Math.round((amountInBase || 0) * cur.rate).toLocaleString('ru-RU');
}
  const ADMIN_LOGIN = 'admin';
  const ADMIN_PASSWORD = 'tourline2025';

  /* ============================================================
     ХЕЛПЕРЫ
  ============================================================ */
  /**
 * Читает значение из localStorage
 * @param {string} key
 * @param {any} fallback
 * @returns {any}
 */
function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (e) { return fallback; }
}
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }
  function uid(p) { return (p || 'id') + '_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6); }
  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function initials(n) {
    return (n || '').trim().split(/\s+/).map(w => w[0] || '').slice(0, 2).join('').toUpperCase();
  }
 function fmtMoney(n) {
  return formatMoney(n);
}

  /* ============================================================
     АВТОРИЗАЦИЯ
  ============================================================ */
  function isAuthorized() {
    try {
      const u = load(KEYS.current, null);
      if (u && u.role === 'admin') return true;
      const s = load(KEYS.adminSession, null);
      if (s && s.expires && Date.now() < s.expires) return true;
    } catch (e) {}
    return false;
  }

  if (!isAuthorized()) {
    renderLoginScreen();
    return;
  }

  /* ============================================================
     INIT
  ============================================================ */
  document.addEventListener('DOMContentLoaded', init);
  if (document.readyState !== 'loading') init();

  function init() {
    ensureSeedData();
    initSidebar();
    initContentTabs();
    initSettingsTabs();
    initModals();
    initForms();
    initToggles();
    initSearchAndFilters();
    initExport();
    initLogout();
    initMobileMenu();
    initTheme();
    initGlobalSearch();
    initFilterChips();
    initRowActions();
    initPhotoUploaders();
    initNotifications(); 
    initSalesPeriodSelect();
    updateAllMoneyDisplays(); 
    initAdminAvatar();

    renderAll();

    if (location.hash) {
      const name = location.hash.slice(1);
      if (document.querySelector(`.admin-pane[data-pane-content="${name}"]`)) switchPane(name);
    }
  }

  /* ============================================================
     ЖЁСТКИЙ RE-SEED
  ============================================================ */
  function ensureSeedData() {
    const version = localStorage.getItem(KEYS.version);

    // Сбрасываем данные при смене версии
    if (version !== DATA_VERSION) {
      [KEYS.bookings, KEYS.clients, KEYS.tours, KEYS.reviews,
       KEYS.settings, KEYS.adminProfile, KEYS.log].forEach(k => {
        localStorage.removeItem(k);
      });
      localStorage.setItem(KEYS.version, DATA_VERSION);
    }

    // Также проверяем: если данные повреждены — пересоздаём
    const bookings = load(KEYS.bookings, []);
    const invalidBookings = bookings.filter(b => !b || !b.num || !b.client || !b.tour);
    if (bookings.length < 4 || invalidBookings.length > 0) {
      save(KEYS.bookings, getSeedBookings());
    }

    if (!load(KEYS.clients, null) || load(KEYS.clients, []).length < 4) save(KEYS.clients, getSeedClients());
    if (!load(KEYS.tours, null) || load(KEYS.tours, []).length < 4) save(KEYS.tours, getSeedTours());
    if (!load(KEYS.reviews, null) || load(KEYS.reviews, []).length < 3) save(KEYS.reviews, getSeedReviews());
    if (!load(KEYS.settings, null)) save(KEYS.settings, getSeedSettings());
    if (!load(KEYS.adminProfile, null)) save(KEYS.adminProfile, getSeedAdminProfile());
    if (!load(KEYS.log, null)) save(KEYS.log, getSeedLog());
  }

  /* ============================================================
     SEED DATA
  ============================================================ */
  function getSeedBookings() {
    return [
      { id: 'b1', num: 'TL-2418', client: 'Мария Орлова', phone: '+7 916 224-18-04', tour: 'Италия, Рим', date: '12.06.2025', amount: 1240, status: 'paid' },
      { id: 'b2', num: 'TL-2417', client: 'Игорь Лебедев', phone: '+7 921 108-71-32', tour: 'Турция, Анталия', date: '12.06.2025', amount: 980, status: 'pending' },
      { id: 'b3', num: 'TL-2416', client: 'Ольга Ким', phone: '+7 903 550-91-17', tour: 'ОАЭ, Дубай', date: '11.06.2025', amount: 2180, status: 'prepay' },
      { id: 'b4', num: 'TL-2415', client: 'Дмитрий Соловьёв', phone: '+7 925 331-08-56', tour: 'Испания, Барселона', date: '11.06.2025', amount: 1460, status: 'paid' },
      { id: 'b5', num: 'TL-2414', client: 'Елена Гусева', phone: '+7 912 774-20-76', tour: 'Египет, Хургада', date: '10.06.2025', amount: 840, status: 'refund' },
      { id: 'b6', num: 'TL-2413', client: 'Павел Смирнов', phone: '+7 913 402-66-81', tour: 'Греция, Крит', date: '10.06.2025', amount: 1190, status: 'pending' }
    ];
  }

  function getSeedClients() {
    return [
      { id: 'c1', name: 'Мария Орлова', email: 'm.orlova@mail.ru', phone: '+7 916 224-18-04', city: 'Москва', trips: 12, status: 'vip' },
      { id: 'c2', name: 'Игорь Лебедев', email: 'i.lebedev@gmail.com', phone: '+7 921 108-71-32', city: 'СПб', trips: 5, status: 'active' },
      { id: 'c3', name: 'Ольга Ким', email: 'o.kim@yandex.ru', phone: '+7 903 550-91-17', city: 'Москва', trips: 8, status: 'active' },
      { id: 'c4', name: 'Дмитрий Соловьёв', email: 'd.solovyev@mail.ru', phone: '+7 925 331-08-56', city: 'Казань', trips: 3, status: 'active' },
      { id: 'c5', name: 'Елена Гусева', email: 'e.guseva@inbox.ru', phone: '+7 912 774-20-76', city: 'Москва', trips: 6, status: 'active' },
      { id: 'c6', name: 'Павел Смирнов', email: 'p.smirnov@mail.ru', phone: '+7 913 402-66-81', city: 'Новосибирск', trips: 2, status: 'active' }
    ];
  }

  function getSeedTours() {
    const base = [
      { id: 't1', title: 'Италия, Рим', country: 'Италия', duration: '8 дней · Экскурсионный', dates: '07.06 – 14.06', price: 1240, spots: '18/24', status: 'published', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=200&q=80' },
      { id: 't2', title: 'Турция, Анталия', country: 'Турция', duration: '7 дней · Пляжный', dates: '12.06 – 19.06', price: 980, spots: '22/30', status: 'published', image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=200&q=80' },
      { id: 't3', title: 'Египет, Хургада', country: 'Египет', duration: '10 дней · Всё включено', dates: '03.07 – 13.07', price: 840, spots: '9/28', status: 'draft', image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73d95?w=200&q=80' },
      { id: 't4', title: 'ОАЭ, Дубай', country: 'ОАЭ', duration: '6 дней · Городской', dates: '18.06 – 24.06', price: 2180, spots: '26/30', status: 'published', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=200&q=80' },
      { id: 't5', title: 'Испания, Барселона', country: 'Испания', duration: '9 дней · Экскурсионный', dates: '02.07 – 11.07', price: 1460, spots: '14/20', status: 'published', image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=200&q=80' },
      { id: 't6', title: 'Греция, Крит', country: 'Греция', duration: '8 дней · Пляжный', dates: '21.06 – 29.06', price: 1190, spots: '12/24', status: 'published', image: 'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=200&q=80' }
    ];
    // Дополняем из tours-data.js
    if (window.TOURS) {
      Object.values(window.TOURS).slice(0, 20).forEach(t => {
        if (!base.some(b => b.id === t.id)) {
          base.push({
            id: t.id, title: t.title, country: t.country,
            duration: t.days || '', dates: '', price: t.price,
            spots: '12/24', status: 'published', image: t.image
          });
        }
      });
    }
    return base;
  }

  function getSeedReviews() {
    return [
      { id: 'r1', client: 'Мария Орлова', tour: 'Италия, Рим', text: 'Отель и гид — выше ожиданий', rating: 5, date: '14.06.2025', status: 'published' },
      { id: 'r2', client: 'Игорь Лебедев', tour: 'Турция, Анталия', text: 'Хотелось бы больше экскурсий', rating: 4, date: '13.06.2025', status: 'moderation' },
      { id: 'r3', client: 'Ольга Ким', tour: 'ОАЭ, Дубай', text: 'Идеальный отпуск с семьёй', rating: 5, date: '12.06.2025', status: 'published' }
    ];
  }

  function getSeedSettings() {
    return {
      agencyName: 'Tourline Travel',
      agencyCity: 'Москва, ул. Тверская, 18',
      agencyPhone: '+7 495 120-45-90',
      agencyEmail: 'hello@tourline.ru',
      currency: 'EUR',
      cardPayments: true,
      autoConfirm: false,
      emailNotify: true,
      metrica: true,
      ga: false,
      telegram: true,
      notifBooking: true,
      notifPayment: true,
      notifReview: false
    };
  }

  function getSeedAdminProfile() {
    return {
      name: 'Администратор',
      email: 'admin@tourline.ru',
      role: 'Главный администратор',
      phone: '',
      password: ADMIN_PASSWORD
    };
  }

  function getSeedLog() {
    return [
      { time: '14.06.2025 18:20', action: 'Опубликована главная страница', user: 'Анна Соколова' },
      { time: '14.06.2025 16:05', action: 'Создана бронь TL-2418', user: 'Анна Соколова' },
      { time: '13.06.2025 11:42', action: 'Изменены настройки оплаты', user: 'Игорь Лапин' }
    ];
  }

  /* ============================================================
     RENDER ALL
  ============================================================ */
  function renderAll() {
    renderDashboardBookings();
    renderUpcomingTours();
    renderSalesChart();
    renderPendingBookings();
    renderToursTable();
    renderBookingsTable();
    renderClientsTable();
    renderClientDetail();
    renderMediaGrid();
    renderReviewsTable();
    renderUsersList();
    renderLogList();
    loadSettingsIntoForms();
    updateTopbarUser();
    updateBookingsBadge();
  }

  /* ============================================================
     DASHBOARD
  ============================================================ */
  function renderDashboardBookings() {
    const tbody = document.getElementById('dashboard-bookings');
    if (!tbody) return;
    const bookings = load(KEYS.bookings, []).slice(0, 4);
    if (!bookings.length) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:32px;color:var(--text-muted);">Заявок пока нет</td></tr>`;
      return;
    }
    tbody.innerHTML = bookings.map(b => `
      <tr>
        <td><span class="cell-id">${escapeHtml(b.num)}</span></td>
        <td>${escapeHtml(b.client)}</td>
        <td>${escapeHtml(b.tour)}</td>
        <td><strong>${fmtMoney(b.amount)}</strong></td>
        <td>${statusBadge(b.status)}</td>
      </tr>
    `).join('');
  }

  function renderUpcomingTours() {
    const wrap = document.getElementById('upcoming-tours');
    if (!wrap) return;
    const tours = load(KEYS.tours, []).slice(0, 4);
    if (!tours.length) { wrap.innerHTML = `<p style="color:var(--text-muted);font-size:13px;">Туров пока нет</p>`; return; }
    wrap.innerHTML = tours.map(t => `
      <div style="padding:12px 0;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;gap:12px;">
        <div>
          <div style="font-weight:500;color:var(--text);font-size:14px;">${escapeHtml(t.title)}</div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:2px;">${escapeHtml(t.dates || 'Даты не указаны')}</div>
        </div>
        <div style="font-size:12px;color:var(--text-muted);">${escapeHtml(t.spots || '—')}</div>
      </div>
    `).join('');
  }

  function renderSalesChart() {
    const chart = document.getElementById('sales-chart');
    if (!chart) return;
    const months = ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'];
    const heights = [35, 45, 52, 48, 60, 55, 72, 68, 62, 74, 82, 90];
    chart.innerHTML = months.map((m, i) => `
      <div class="bar-col">
        <div class="bar" style="height:${heights[i]}%;"></div>
        <span class="bar-label">${m}</span>
      </div>
    `).join('');
  }

  function renderPendingBookings() {
  const wrap = document.getElementById('pending-bookings');
  if (!wrap) return;

  const pending = load(KEYS.bookings, []).filter(b => b.status === 'pending').slice(0, 5);

  if (!pending.length) {
    wrap.innerHTML = `<div style="padding:24px;text-align:center;color:var(--text-muted);font-size:14px;">Все заявки обработаны ✓</div>`;
    return;
  }

  wrap.innerHTML = pending.map(b => `
    <div class="pending-item" data-pending-id="${b.id}">
      <div class="pending-info">
        <div class="pending-title">
          <span class="pending-num">${escapeHtml(b.num)}</span>
          <span class="pending-sep">·</span>
          <span>${escapeHtml(b.client)}</span>
        </div>
        <div class="pending-meta">
          ${escapeHtml(b.tour)} · ${fmtMoney(b.amount)}
        </div>
      </div>
      <div class="pending-actions">
        <button type="button" class="btn btn-outline btn-sm" data-view="${b.id}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          Просмотреть
        </button>
        <button type="button" class="btn btn-primary btn-sm" data-approve="${b.id}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Подтвердить
        </button>
      </div>
    </div>
  `).join('');

  // Кнопка «Подтвердить»
  wrap.querySelectorAll('[data-approve]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      approveBooking(btn.dataset.approve);
    });
  });

  // Кнопка «Просмотреть»
  wrap.querySelectorAll('[data-view]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      viewBooking(btn.dataset.view);
    });
  });

  // Клик по всей строке — открывает просмотр
  wrap.querySelectorAll('[data-pending-id]').forEach(row => {
    row.addEventListener('click', () => {
      viewBooking(row.dataset.pendingId);
    });
  });
}
  /* ============================================================
     ТУРЫ
  ============================================================ */
  function renderToursTable() {
    const tbody = document.getElementById('tours-tbody');
    if (!tbody) return;

    const search = (document.getElementById('tours-search')?.value || '').toLowerCase().trim();
    const country = document.getElementById('tours-filter-country')?.value || 'all';
    const status = document.getElementById('tours-filter-status')?.value || 'all';

    let tours = load(KEYS.tours, []);
    if (search) tours = tours.filter(t => (t.title || '').toLowerCase().includes(search));
    if (country !== 'all') tours = tours.filter(t => t.country === country);
    if (status !== 'all') tours = tours.filter(t => t.status === status);

    const countEl = document.getElementById('tours-count');
    if (countEl) countEl.textContent = `${tours.length} туров`;

    if (!tours.length) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:40px;color:var(--text-muted);">Ничего не найдено</td></tr>`;
      return;
    }

    tbody.innerHTML = tours.slice(0, 30).map(t => `
      <tr>
        <td>
          <td>
  <div class="cell-tour">
    ${t.image ? `<img src="${t.image}" alt="" loading="lazy" onerror="this.style.display='none'">` : `<div style="width:44px;height:44px;border-radius:8px;background:var(--beige);flex-shrink:0;"></div>`}
    <div>
      <strong title="${escapeHtml(t.title)}">${escapeHtml(t.title)}</strong>
      <div class="tour-meta" title="${escapeHtml(t.duration || '')}">${escapeHtml(t.duration || '')}</div>
    </div>
  </div>
</td>
        <td>${escapeHtml(t.dates || '—')}</td>
        <td><strong>${fmtMoney(t.price)}</strong></td>
        <td>${escapeHtml(t.spots || '—')}</td>
        <td>${statusBadge(t.status)}</td>
        <td>
          <div class="row-actions">
            <button class="row-action-btn" title="Редактировать" data-edit-tour="${t.id}">
              <svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5Z"/></svg>
            </button>
            <button class="row-action-btn" title="Удалить" data-del-tour="${t.id}">
              <svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </div>
        </td>
      </tr>
    `).join('');

    tbody.querySelectorAll('[data-del-tour]').forEach(btn => {
      btn.addEventListener('click', () => deleteTour(btn.dataset.delTour));
    });
    tbody.querySelectorAll('[data-edit-tour]').forEach(btn => {
      btn.addEventListener('click', () => editTour(btn.dataset.editTour));
    });
  }

  function deleteTour(id) {
    if (!confirm('Удалить тур?')) return;
    save(KEYS.tours, load(KEYS.tours, []).filter(t => t.id !== id));
    addLog('Удалён тур ' + id);
    renderToursTable();
    showToast('✓ Тур удалён');
  }

  function editTour(id) {
  const tours = load(KEYS.tours, []);
  const t = tours.find(x => x.id === id);
  if (!t) return;

  const modal = document.getElementById('modal-edit-tour');
  if (!modal) return;

  const form = document.getElementById('form-edit-tour');
  form.elements.id.value = t.id;
  form.elements.title.value = t.title || '';
  form.elements.country.value = t.country || '';
  form.elements.duration.value = t.duration || '';
  form.elements.dates.value = t.dates || '';
  form.elements.price.value = t.price || '';
  form.elements.spots.value = t.spots || '';
  form.elements.status.value = t.status || 'published';
    // Заполняем загрузчик фото
  fillUploader('#modal-edit-tour .photo-uploader', t.image || null);
  // Синхронизируем hidden input
  const imgInput = document.querySelector('#modal-edit-tour [name="image"]');
  if (imgInput) imgInput.value = t.image || '';

  document.getElementById('et-title').textContent = 'Редактирование: ' + (t.title || '');

  openModal('modal-edit-tour');
}

  /* ============================================================
     БРОНИ
  ============================================================ */
  function renderBookingsTable() {
    const tbody = document.getElementById('bookings-tbody');
    if (!tbody) return;

    const search = (document.getElementById('bookings-search')?.value || '').toLowerCase().trim();
    const status = document.getElementById('bookings-filter-status')?.value || 'all';

    let bookings = load(KEYS.bookings, []);
    if (search) {
      bookings = bookings.filter(b =>
        (b.num || '').toLowerCase().includes(search) ||
        (b.client || '').toLowerCase().includes(search) ||
        (b.tour || '').toLowerCase().includes(search)
      );
    }
    if (status !== 'all') bookings = bookings.filter(b => b.status === status);

    if (!bookings.length) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:40px;color:var(--text-muted);">Ничего не найдено</td></tr>`;
      return;
    }

    tbody.innerHTML = bookings.map(b => `
      <tr>
        <td><span class="cell-id">${escapeHtml(b.num)}</span></td>
        <td><strong>${escapeHtml(b.client)}</strong></td>
        <td>${escapeHtml(b.tour)}</td>
        <td>${escapeHtml(b.date)}</td>
        <td><strong>${fmtMoney(b.amount)}</strong></td>
        <td>${statusBadge(b.status)}</td>
        <td>
          <div class="row-actions">
            <button class="row-action-btn" title="Открыть" data-view-booking="${b.id}">
              <svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
            <button class="row-action-btn" title="Удалить" data-del-booking="${b.id}">
              <svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>
            </button>
          </div>
        </td>
      </tr>
    `).join('');

    tbody.querySelectorAll('[data-del-booking]').forEach(btn => {
      btn.addEventListener('click', () => deleteBooking(btn.dataset.delBooking));
    });
    tbody.querySelectorAll('[data-view-booking]').forEach(btn => {
      btn.addEventListener('click', () => viewBooking(btn.dataset.viewBooking));
    });
  }

 function viewBooking(id) {
  const b = load(KEYS.bookings, []).find(x => x.id === id);
  if (!b) return;

  const modal = document.getElementById('modal-view-booking');
  if (!modal) return;

  const statusMap = {
    paid: { text: 'Оплачено', cls: 'value--paid' },
    pending: { text: 'Ожидает оплаты', cls: 'value--pending' },
    prepay: { text: 'Предоплата', cls: 'value--prepay' },
    refund: { text: 'Возврат', cls: 'value--refund' }
  };
  const st = statusMap[b.status] || { text: b.status, cls: '' };

  document.getElementById('vb-title').textContent = b.num;
  document.getElementById('vb-subtitle').textContent = b.tour + ' · ' + b.date;

  document.getElementById('vb-info').innerHTML = `
    <div class="modal-info-row">
      <span class="label">Клиент</span>
      <span class="value">${escapeHtml(b.client)}</span>
    </div>
    <div class="modal-info-row">
      <span class="label">Телефон</span>
      <span class="value value--mono">${escapeHtml(b.phone || '—')}</span>
    </div>
    <div class="modal-info-row">
      <span class="label">Тур</span>
      <span class="value">${escapeHtml(b.tour)}</span>
    </div>
    <div class="modal-info-row">
      <span class="label">Дата брони</span>
      <span class="value value--mono">${escapeHtml(b.date)}</span>
    </div>
    <div class="modal-info-row">
      <span class="label">Сумма</span>
      <span class="value value--big">${fmtMoney(b.amount)}</span>
    </div>
    <div class="modal-info-row">
      <span class="label">Статус</span>
      <span class="value--status ${st.cls}">${st.text}</span>
    </div>
  `;

  const confirmBtn = document.getElementById('vb-confirm');
  if (b.status === 'pending') {
    confirmBtn.style.display = '';
    confirmBtn.dataset.bookingId = b.id;
    confirmBtn.onclick = () => {
      approveBooking(b.id);
      closeModal('modal-view-booking');
    };
  } else {
    confirmBtn.style.display = 'none';
  }

  openModal('modal-view-booking');
}

  function deleteBooking(id) {
    if (!confirm('Удалить бронь?')) return;
    save(KEYS.bookings, load(KEYS.bookings, []).filter(b => b.id !== id));
    addLog('Удалена бронь');
    renderBookingsTable();
    renderDashboardBookings();
    renderPendingBookings();
    updateBookingsBadge();
    showToast('✓ Бронь удалена');
  }

  function approveBooking(id) {
    const bookings = load(KEYS.bookings, []);
    const b = bookings.find(x => x.id === id);
    if (!b) return;
    b.status = 'paid';
    save(KEYS.bookings, bookings);
    addLog(`Подтверждена бронь ${b.num}`);
    renderPendingBookings();
    renderBookingsTable();
    renderDashboardBookings();
    updateBookingsBadge();
    showToast('✓ Бронь подтверждена');
  }

  function updateBookingsBadge() {
    const badge = document.getElementById('bookings-badge');
    if (badge) {
      const count = load(KEYS.bookings, []).filter(b => b.status === 'pending').length;
      badge.textContent = count;
      badge.style.display = count > 0 ? '' : 'none';
    }
  }

  /* ============================================================
     КЛИЕНТЫ
  ============================================================ */
  let selectedClientId = null;

  function renderClientsTable() {
    const tbody = document.getElementById('clients-tbody');
    if (!tbody) return;

    const search = (document.getElementById('clients-search')?.value || '').toLowerCase().trim();
    let clients = load(KEYS.clients, []);
    if (search) {
      clients = clients.filter(c =>
        (c.name || '').toLowerCase().includes(search) ||
        (c.email || '').toLowerCase().includes(search) ||
        (c.phone || '').includes(search)
      );
    }

    if (!clients.length) {
      tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;padding:40px;color:var(--text-muted);">Не найдено</td></tr>`;
      return;
    }

    tbody.innerHTML = clients.map(c => `
      <tr style="cursor:pointer;" data-client-row="${c.id}">
        <td>
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#E8C56B,#B8860B);display:flex;align-items:center;justify-content:center;font-weight:600;font-size:13px;color:#1A1A1A;text-transform:uppercase;flex-shrink:0;">${escapeHtml(initials(c.name))}</div>
            <div>
              <strong>${escapeHtml(c.name)}</strong>
              <div style="font-size:12px;color:var(--text-muted);">${escapeHtml(c.email)}</div>
            </div>
          </div>
        </td>
        <td>${escapeHtml(c.phone)}</td>
        <td>${c.trips || 0}</td>
        <td>${c.status === 'vip' ? '<span class="status status-prepay">VIP</span>' : '<span class="status status-paid">Активный</span>'}</td>
      </tr>
    `).join('');

    tbody.querySelectorAll('[data-client-row]').forEach(row => {
      row.addEventListener('click', () => {
        selectedClientId = row.dataset.clientRow;
        renderClientDetail();
      });
    });
  }

  function renderClientDetail() {
    const wrap = document.getElementById('client-detail');
    if (!wrap) return;
    const clients = load(KEYS.clients, []);
    const c = clients.find(x => x.id === selectedClientId) || clients[0];
    if (!c) { wrap.innerHTML = ''; return; }
    selectedClientId = c.id;

    wrap.innerHTML = `
      <div class="client-card">
        <div class="client-card-avatar">${escapeHtml(initials(c.name))}</div>
        <h3>${escapeHtml(c.name)}</h3>
        <div class="client-meta">Клиент с 2021 года · ${escapeHtml(c.city || '—')}</div>
        <div class="client-stats">
          <div class="client-stat-item">
            <div class="label">Телефон</div>
            <div class="value">${escapeHtml(c.phone)}</div>
          </div>
          <div class="client-stat-item">
            <div class="label">E-mail</div>
            <div class="value" style="font-size:13px;">${escapeHtml(c.email)}</div>
          </div>
          <div class="client-stat-item">
            <div class="label">Статус</div>
            <div class="value">${c.status === 'vip' ? 'VIP-клиент' : 'Активный'}</div>
          </div>
          <div class="client-stat-item">
            <div class="label">Поездок</div>
            <div class="value big">${c.trips || 0}</div>
          </div>
        </div>
        <div class="client-history">
          <h4>История поездок</h4>
          <div class="client-trip"><span class="trip-name">Италия, Рим</span><span class="trip-date">07.06.2025 · 8 дней</span></div>
          <div class="client-trip"><span class="trip-name">Испания, Барселона</span><span class="trip-date">02.05.2025 · 9 дней</span></div>
          <div class="client-trip"><span class="trip-name">ОАЭ, Дубай</span><span class="trip-date">14.02.2025 · 6 дней</span></div>
        </div>
        <div class="client-actions">
          <button class="btn btn-primary btn-sm" data-write="${c.id}">
            <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            Написать
          </button>
          <button class="btn btn-outline btn-sm" data-profile="${c.id}">
            <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Профиль
          </button>
        </div>
      </div>
    `;

    wrap.querySelector('[data-write]')?.addEventListener('click', () => {
      window.location.href = 'mailto:' + c.email;
    });
        wrap.querySelector('[data-profile]')?.addEventListener('click', () => {
  window.location.href = 'client.html?id=' + encodeURIComponent(c.id);
});
  }

  /* ============================================================
     МЕДИАТЕКА
  ============================================================ */
  function renderMediaGrid() {
    const grid = document.getElementById('media-grid');
    if (!grid) return;
    const images = [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80',
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=400&q=80',
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&q=80',
      'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&q=80',
      'https://images.unsplash.com/photo-1533165850316-b1c8c4b1b8ba?w=400&q=80',
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80',
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80'
    ];
    grid.innerHTML = images.map((url, i) => `
      <div class="media-item">
        <img src="${url}" alt="Фото ${i+1}" loading="lazy">
        <div class="media-overlay">img-${String(i+1).padStart(3, '0')}.jpg</div>
      </div>
    `).join('');
  }

  /* ============================================================
     ОТЗЫВЫ
  ============================================================ */
  function renderReviewsTable() {
    const tbody = document.getElementById('reviews-tbody');
    if (!tbody) return;
    const reviews = load(KEYS.reviews, []);
    if (!reviews.length) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:40px;color:var(--text-muted);">Отзывов нет</td></tr>`;
      return;
    }
    tbody.innerHTML = reviews.map(r => `
      <tr>
        <td><strong>${escapeHtml(r.client)}</strong><br><span style="font-size:12px;color:var(--text-muted);">«${escapeHtml(r.text)}»</span></td>
        <td>${escapeHtml(r.tour)}</td>
        <td style="color:#E8B44A;">${'★'.repeat(r.rating || 5)}</td>
        <td>${escapeHtml(r.date)}</td>
        <td>${statusBadge(r.status === 'moderation' ? 'moderation' : 'published')}</td>
        <td>
          <div class="row-actions">
            <button class="row-action-btn" title="Одобрить" data-approve-review="${r.id}">
              <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
            </button>
            <button class="row-action-btn" title="Удалить" data-del-review="${r.id}">
              <svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>
            </button>
          </div>
        </td>
      </tr>
    `).join('');

    tbody.querySelectorAll('[data-approve-review]').forEach(btn => {
      btn.addEventListener('click', () => {
        const reviews = load(KEYS.reviews, []);
        const r = reviews.find(x => x.id === btn.dataset.approveReview);
        if (r) { r.status = 'published'; save(KEYS.reviews, reviews); renderReviewsTable(); showToast('✓ Отзыв опубликован'); }
      });
    });
    tbody.querySelectorAll('[data-del-review]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!confirm('Удалить отзыв?')) return;
        save(KEYS.reviews, load(KEYS.reviews, []).filter(x => x.id !== btn.dataset.delReview));
        renderReviewsTable();
        showToast('✓ Отзыв удалён');
      });
    });
  }

  /* ============================================================
     ПОЛЬЗОВАТЕЛИ
  ============================================================ */
  function renderUsersList() {
    const wrap = document.getElementById('users-list');
    if (!wrap) return;
    const users = [
      { name: 'Анна Соколова', email: 'a.sokolova@tourline.ru', role: 'Администратор' },
      { name: 'Игорь Лапин', email: 'i.lapin@tourline.ru', role: 'Менеджер туров' },
      { name: 'Светлана Гринёва', email: 's.grineva@tourline.ru', role: 'Контент-редактор' },
      { name: 'Дмитрий Ковалёв', email: 'd.kovalev@tourline.ru', role: 'Менеджер туров' }
    ];
    wrap.innerHTML = users.map(u => `
      <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-bottom:1px solid var(--border);gap:12px;">
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="width:38px;height:38px;border-radius:50%;background:var(--green-light);display:flex;align-items:center;justify-content:center;color:var(--green);font-weight:600;font-size:13px;">${escapeHtml(initials(u.name))}</div>
          <div>
            <div style="font-weight:500;font-size:14px;color:var(--text);">${escapeHtml(u.name)}</div>
            <div style="font-size:12px;color:var(--text-muted);">${escapeHtml(u.email)}</div>
          </div>
        </div>
        <span class="status status-published">${escapeHtml(u.role)}</span>
      </div>
    `).join('');
  }

  /* ============================================================
     ЖУРНАЛ
  ============================================================ */
  function renderLogList() {
    const wrap = document.getElementById('log-list');
    if (!wrap) return;
    const log = load(KEYS.log, []);
    if (!log.length) {
      wrap.innerHTML = `<div style="padding:20px;color:var(--text-muted);text-align:center;">Журнал пуст</div>`;
      return;
    }
    wrap.innerHTML = log.map(item => `
      <div style="display:flex;justify-content:space-between;gap:12px;padding:12px 0;border-bottom:1px solid var(--border);font-size:14px;">
        <div>
          <div style="color:var(--text);">${escapeHtml(item.action)}</div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:2px;">${escapeHtml(item.user || 'Система')}</div>
        </div>
        <div style="font-size:12px;color:var(--text-light);white-space:nowrap;">${escapeHtml(item.time)}</div>
      </div>
    `).join('');
  }

  function addLog(action, user) {
    const log = load(KEYS.log, []);
    const now = new Date();
    const time = now.toLocaleDateString('ru-RU') + ' ' + now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    const profile = load(KEYS.adminProfile, { name: 'Администратор' });
    log.unshift({ time, action, user: user || profile.name });
    save(KEYS.log, log.slice(0, 100));
    renderLogList();
  }

  /* ============================================================
     НАСТРОЙКИ
  ============================================================ */
 function loadSettingsIntoForms() {
  const s = load(KEYS.settings, {});
  const p = load(KEYS.adminProfile, {});

  setVal('agency-name', s.agencyName);
  setVal('agency-city', s.agencyCity);
  setVal('agency-phone', s.agencyPhone);
  setVal('agency-email', s.agencyEmail);
  setVal('payment-currency', s.currency);

  setVal('admin-name', p.name);
  setVal('admin-email', p.email);
  setVal('admin-role', p.role);
  setVal('admin-phone', p.phone);

  const toggleMap = {
    'card-payments': 'cardPayments',
    'auto-confirm': 'autoConfirm',
    'email-notify': 'emailNotify',
    'metrica': 'metrica',
    'ga': 'ga',
    'telegram': 'telegram',
    'notif-booking': 'notifBooking',
    'notif-payment': 'notifPayment',
    'notif-review': 'notifReview'
  };

  document.querySelectorAll('[data-toggle]').forEach(t => {
    const settingKey = toggleMap[t.dataset.toggle];
    if (settingKey && s[settingKey] !== undefined) {
      t.classList.toggle('on', !!s[settingKey]);
    }
  });
}

function setVal(id, v) {
  const el = document.getElementById(id);
  if (el && v !== undefined) el.value = v;
}

function initProfileSave() {
  const btn = document.getElementById('admin-save');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const profile = load(KEYS.adminProfile, {}) || {};
    profile.name = (document.getElementById('admin-name')?.value || '').trim() || 'Администратор';
    profile.email = (document.getElementById('admin-email')?.value || '').trim();
    profile.role = (document.getElementById('admin-role')?.value || '').trim();
    profile.phone = (document.getElementById('admin-phone')?.value || '').trim();

    const newPass = document.getElementById('admin-password')?.value;
    if (newPass && newPass.length >= 6) profile.password = newPass;

    save(KEYS.adminProfile, profile);

    const current = load(KEYS.current, null);
    if (current && current.role === 'admin') {
      current.name = profile.name;
      current.email = profile.email;
      save(KEYS.current, current);
    }

    updateTopbarUser();
    addLog('Обновлён профиль администратора');
    showToast('✓ Профиль сохранён');

    const passInput = document.getElementById('admin-password');
    if (passInput) passInput.value = '';
  });
}

 function initSettingsSave() {
  // ====== 1. Автосохранение селекта валюты ======
  const currencySelect = document.getElementById('payment-currency');
  if (currencySelect) {
    // Загружаем текущее значение при инициализации
    const s = load(KEYS.settings, {});
    if (s.currency) currencySelect.value = s.currency;

    // Сохраняем при изменении
    currencySelect.addEventListener('change', () => {
  const settings = load(KEYS.settings, {});
  settings.currency = currencySelect.value;
  save(KEYS.settings, settings);
  addLog('Изменена валюта: ' + currencySelect.value);
  showToast('✓ Валюта изменена на ' + getCurrency().label);

  // Обновляем все числа во всей админке
  updateAllMoneyDisplays();
});
  }

  // ====== 2. Автосохранение полей "Профиль агентства" ======
  const agencyFields = [
    { id: 'agency-name', key: 'agencyName' },
    { id: 'agency-city', key: 'agencyCity' },
    { id: 'agency-phone', key: 'agencyPhone' },
    { id: 'agency-email', key: 'agencyEmail' }
  ];

  agencyFields.forEach(({ id, key }) => {
    const el = document.getElementById(id);
    if (!el) return;

    // Загружаем текущее значение
    const s = load(KEYS.settings, {});
    if (s[key]) el.value = s[key];

    // Debounce — сохраняем через 600 мс после окончания ввода
    let timer = null;
    el.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const settings = load(KEYS.settings, {});
        settings[key] = el.value.trim();
        save(KEYS.settings, settings);
      }, 600);
    });

    // При потере фокуса — сохраняем сразу
    el.addEventListener('blur', () => {
      clearTimeout(timer);
      const settings = load(KEYS.settings, {});
      settings[key] = el.value.trim();
      save(KEYS.settings, settings);
    });
  });

  // ====== 3. Автосохранение профиля администратора ======
  const adminFields = [
    { id: 'admin-name', key: 'name' },
    { id: 'admin-email', key: 'email' },
    { id: 'admin-role', key: 'role' },
    { id: 'admin-phone', key: 'phone' }
  ];

  adminFields.forEach(({ id, key }) => {
    const el = document.getElementById(id);
    if (!el) return;

    const p = load(KEYS.adminProfile, {});
    if (p[key]) el.value = p[key];

    let timer = null;
    el.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const profile = load(KEYS.adminProfile, {});
        profile[key] = el.value.trim();
        save(KEYS.adminProfile, profile);
        // Обновляем имя в топбаре сразу
        if (key === 'name') updateTopbarUser();
      }, 600);
    });
  });

  // ====== 4. Кнопка "Сохранить" (осталась на всякий случай) ======
  const btn = document.getElementById('settings-save');
  if (btn) {
    btn.addEventListener('click', () => {
      const s = load(KEYS.settings, {});
      s.agencyName = document.getElementById('agency-name')?.value || s.agencyName;
      s.agencyCity = document.getElementById('agency-city')?.value || s.agencyCity;
      s.agencyPhone = document.getElementById('agency-phone')?.value || s.agencyPhone;
      s.agencyEmail = document.getElementById('agency-email')?.value || s.agencyEmail;
      s.currency = document.getElementById('payment-currency')?.value || s.currency;
      save(KEYS.settings, s);
      addLog('Изменены настройки агентства');
      showToast('✓ Настройки сохранены');
    });
  }

  // ====== 5. Кнопка "Отменить" — возвращает сохранённые значения ======
  const reset = document.getElementById('settings-reset');
  if (reset) {
    reset.addEventListener('click', () => {
      loadSettingsIntoForms();
      showToast('Изменения отменены');
    });
  }
}

  function updateTopbarUser() {
    const current = load(KEYS.current, null);
    const p = load(KEYS.adminProfile, { name: 'Администратор', role: 'Главный администратор' });

    let name = 'Администратор';
    let role = 'Главный администратор';

    if (current && current.role === 'admin') {
      name = current.name || p.name || 'Администратор';
      role = 'Главный администратор';
    } else {
      name = p.name || 'Администратор';
      role = p.role || 'Главный администратор';
    }

    const nameEl = document.getElementById('topbar-name');
    const avEl = document.getElementById('topbar-avatar');
    const roleEl = document.querySelector('.topbar-user-role');
    if (nameEl) nameEl.textContent = name;
    if (avEl) avEl.textContent = initials(name);
    if (roleEl) roleEl.textContent = role;
  }

  /* ============================================================
     ПЕРЕКЛЮЧЕНИЕ ПАНЕЛЕЙ
  ============================================================ */
  function initSidebar() {
    document.querySelectorAll('.sidebar-nav button').forEach(btn => {
      btn.addEventListener('click', () => switchPane(btn.dataset.pane));
    });
  }

  function switchPane(name) {
    document.querySelectorAll('.sidebar-nav button').forEach(b => {
      b.classList.toggle('active', b.dataset.pane === name);
    });
    document.querySelectorAll('.admin-pane').forEach(p => {
      p.classList.toggle('active', p.dataset.paneContent === name);
    });
    const bc = document.getElementById('breadcrumb-current');
    if (bc) {
      const map = { dashboard: 'Дашборд', tours: 'Туры', bookings: 'Бронирования', clients: 'Клиенты', content: 'Контент', settings: 'Настройки' };
      bc.textContent = map[name] || name;
    }
    try { history.replaceState(null, '', '#' + name); } catch (e) {}
    document.getElementById('sidebar')?.classList.remove('open');
    document.getElementById('sidebar-overlay')?.classList.remove('show');
    // Дополнительно перерисовываем контент панели
    if (name === 'bookings') renderBookingsTable();
    if (name === 'tours') renderToursTable();
    if (name === 'clients') { renderClientsTable(); renderClientDetail(); }
  }

  function initContentTabs() {
    document.querySelectorAll('#content-tabs button').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#content-tabs button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.content-pane').forEach(p => {
          p.classList.toggle('active', p.dataset.contentPane === btn.dataset.contentTab);
        });
      });
    });
  }

  function initSettingsTabs() {
    document.querySelectorAll('#settings-nav button').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#settings-nav button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.settings-pane').forEach(p => {
          p.classList.toggle('active', p.dataset.settingsPane === btn.dataset.settingsTab);
        });
      });
    });
  }

  /* ============================================================
     МОДАЛКИ
  ============================================================ */
  function initModals() {
    document.querySelectorAll('[data-new-booking]').forEach(b => {
      b.addEventListener('click', () => openModal('modal-booking-admin'));
    });
    document.querySelectorAll('[data-new-tour]').forEach(b => {
      b.addEventListener('click', () => openModal('modal-tour-admin'));
    });
    document.querySelectorAll('[data-new-client]').forEach(b => {
      b.addEventListener('click', () => openModal('modal-client-admin'));
    });

    document.querySelectorAll('.modal-overlay').forEach(o => {
      o.addEventListener('click', e => { if (e.target === o) closeModal(o); });
      o.querySelector('.modal-close')?.addEventListener('click', () => closeModal(o));
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') document.querySelectorAll('.modal-overlay.open').forEach(closeModal);
    });
  }

  function openModal(id) {
    const m = document.getElementById(id);
    if (m) { m.classList.add('open'); document.body.style.overflow = 'hidden'; }
  }
  function closeModal(el) {
    const m = typeof el === 'string' ? document.getElementById(el) : el;
    if (m) { m.classList.remove('open'); document.body.style.overflow = ''; }
  }

  /* ============================================================
     ФОРМЫ
  ============================================================ */
  function initForms() {
    const bForm = document.getElementById('form-new-booking');
    if (bForm) {
      bForm.addEventListener('submit', e => {
        e.preventDefault();
        const fd = new FormData(bForm);
        const bookings = load(KEYS.bookings, []);
        const num = 'TL-' + (2419 + bookings.length);
        bookings.unshift({
          id: uid('b'), num,
          client: fd.get('client'), phone: fd.get('phone'),
          tour: fd.get('tour'),  date: formatDate(fd.get('date') || fd.get('dateFrom')),
          amount: Number(fd.get('amount')), status: fd.get('status')
        });
        save(KEYS.bookings, bookings);
        addLog(`Создана бронь ${num}`);
        closeModal('modal-booking-admin');
        bForm.reset();
        renderBookingsTable();
        renderDashboardBookings();
        renderPendingBookings();
        updateBookingsBadge();
        showToast('✓ Бронь ' + num + ' создана');
            // Форма редактирования тура
    const etForm = document.getElementById('form-edit-tour');
    if (etForm) {
      etForm.addEventListener('submit', e => {
        e.preventDefault();
        const fd = new FormData(etForm);
        const id = fd.get('id');
        const tours = load(KEYS.tours, []);
        const idx = tours.findIndex(t => t.id === id);
        if (idx === -1) { showToast('Тур не найден', 'error'); return; }

        tours[idx].title = (fd.get('title') || '').trim();
        tours[idx].country = (fd.get('country') || '').trim();
        tours[idx].duration = (fd.get('duration') || '').trim();
        tours[idx].dates = (fd.get('dates') || '').trim();
        tours[idx].price = Number(fd.get('price')) || 0;
        tours[idx].spots = (fd.get('spots') || '').trim();
        tours[idx].status = fd.get('status');
        // Берём значение из загрузчика
const imgVal = document.querySelector('#modal-edit-tour [data-image-value]')?.value || '';
tours[idx].image = imgVal;

        save(KEYS.tours, tours);
        addLog('Изменён тур: ' + tours[idx].title);
        closeModal('modal-edit-tour');
        fillUploader('#modal-edit-tour .photo-uploader', null);
        renderToursTable();
        showToast('✓ Тур сохранён');
      });
    }
      });
    }

    const tForm = document.getElementById('form-new-tour');
    if (tForm) {
      tForm.addEventListener('submit', e => {
        e.preventDefault();
        const fd = new FormData(tForm);
        const tours = load(KEYS.tours, []);
        tours.unshift({
          id: uid('t'), title: fd.get('title'), duration: fd.get('duration'),
          dates: fd.get('dates'), price: Number(fd.get('price')),
          spots: '0/24', status: fd.get('status'), image: document.querySelector('#modal-tour-admin [data-image-value]')?.value || '',
          country: (fd.get('title') || '').split(',')[0] || ''
        });
        save(KEYS.tours, tours);
        addLog('Добавлен тур: ' + fd.get('title'));
        closeModal('modal-tour-admin');
        tForm.reset();
        fillUploader('#modal-tour-admin .photo-uploader', null);
        renderToursTable();
        showToast('✓ Тур добавлен');
      });
    }

    const cForm = document.getElementById('form-new-client');
    if (cForm) {
      cForm.addEventListener('submit', e => {
        e.preventDefault();
        const fd = new FormData(cForm);
        const clients = load(KEYS.clients, []);
        clients.unshift({
          id: uid('c'), name: fd.get('name'), email: fd.get('email'),
          phone: fd.get('phone'), city: fd.get('city'), trips: 0, status: 'active'
        });
        save(KEYS.clients, clients);
        addLog('Добавлен клиент: ' + fd.get('name'));
        closeModal('modal-client-admin');
        cForm.reset();
        renderClientsTable();
        renderClientDetail();
        showToast('✓ Клиент добавлен');
      });
    }
  }

  function formatDate(iso) {
    if (!iso) return '';
    const [y, m, d] = iso.split('-');
    return `${d}.${m}.${y}`;
  }

  /* ============================================================
     ПЕРЕКЛЮЧАТЕЛИ
  ============================================================ */
function initToggles() {
  // Единый маппинг ключей из data-toggle в объект settings
  const TOGGLE_MAP = {
    'card-payments': 'cardPayments',
    'auto-confirm': 'autoConfirm',
    'email-notify': 'emailNotify',
    'metrica': 'metrica',
    'ga': 'ga',
    'telegram': 'telegram',
    'notif-booking': 'notifBooking',
    'notif-payment': 'notifPayment',
    'notif-review': 'notifReview'
  };

  document.querySelectorAll('[data-toggle]').forEach(btn => {
    const key = btn.dataset.toggle;
    const settingKey = TOGGLE_MAP[key];
    if (!settingKey) return;

    // Загрузка текущего состояния из localStorage
    const settings = load(KEYS.settings, {});
    if (settings[settingKey] !== undefined) {
      btn.classList.toggle('on', !!settings[settingKey]);
    }

    // Обновление обработчика — сохраняем сразу
    btn.addEventListener('click', () => {
      btn.classList.toggle('on');
      const s = load(KEYS.settings, {});
      s[settingKey] = btn.classList.contains('on');
      save(KEYS.settings, s);
      addLog(`Изменён параметр: ${key} → ${s[settingKey] ? 'вкл' : 'выкл'}`);
      showToast('✓ Настройка сохранена');
    });
  });
}

  /* ============================================================
     ПОИСК И ФИЛЬТРЫ
  ============================================================ */
  function initSearchAndFilters() {
    const toursSearch = document.getElementById('tours-search');
    const toursCountry = document.getElementById('tours-filter-country');
    const toursStatus = document.getElementById('tours-filter-status');
    [toursSearch, toursCountry, toursStatus].forEach(el => {
      if (el) el.addEventListener('input', renderToursTable);
      if (el) el.addEventListener('change', renderToursTable);
    });

    const bookingsSearch = document.getElementById('bookings-search');
    const bookingsStatus = document.getElementById('bookings-filter-status');
    [bookingsSearch, bookingsStatus].forEach(el => {
      if (el) el.addEventListener('input', renderBookingsTable);
      if (el) el.addEventListener('change', renderBookingsTable);
    });

    const clientsSearch = document.getElementById('clients-search');
    if (clientsSearch) clientsSearch.addEventListener('input', renderClientsTable);
  }

  function initGlobalSearch() {
    const input = document.getElementById('global-search');
    if (!input) return;
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const q = input.value.trim();
        if (!q) return;
        if (/^\d|TL-/i.test(q)) {
          switchPane('bookings');
          const bs = document.getElementById('bookings-search');
          if (bs) { bs.value = q; renderBookingsTable(); }
        } else {
          switchPane('tours');
          const ts = document.getElementById('tours-search');
          if (ts) { ts.value = q; renderToursTable(); }
        }
      }
    });
  }

  function initFilterChips() {
    // Обработчик для кликов по чипам фильтра (Все города/Активные/VIP)
    document.querySelectorAll('.filter-chip:not([data-export])').forEach(chip => {
      chip.addEventListener('click', () => {
        if (chip.classList.contains('active')) return;
        // Внутри одной группы
        const parent = chip.parentElement;
        parent.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        // Для клиентов — фильтрация
        const filterText = chip.textContent.trim();
        if (filterText === 'VIP') {
          const clients = load(KEYS.clients, []).filter(c => c.status === 'vip');
          renderClientsTableFiltered(clients);
        } else if (filterText === 'Активные') {
          const clients = load(KEYS.clients, []).filter(c => c.status === 'active');
          renderClientsTableFiltered(clients);
        } else {
          renderClientsTable();
        }
      });
    });
  }

  function renderClientsTableFiltered(list) {
    const tbody = document.getElementById('clients-tbody');
    if (!tbody) return;
    if (!list.length) {
      tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;padding:40px;color:var(--text-muted);">Не найдено</td></tr>`;
      return;
    }
    tbody.innerHTML = list.map(c => `
      <tr style="cursor:pointer;" data-client-row="${c.id}">
        <td>
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#E8C56B,#B8860B);display:flex;align-items:center;justify-content:center;font-weight:600;font-size:13px;color:#1A1A1A;text-transform:uppercase;">${escapeHtml(initials(c.name))}</div>
            <div>
              <strong>${escapeHtml(c.name)}</strong>
              <div style="font-size:12px;color:var(--text-muted);">${escapeHtml(c.email)}</div>
            </div>
          </div>
        </td>
        <td>${escapeHtml(c.phone)}</td>
        <td>${c.trips || 0}</td>
        <td>${c.status === 'vip' ? '<span class="status status-prepay">VIP</span>' : '<span class="status status-paid">Активный</span>'}</td>
      </tr>
    `).join('');
    tbody.querySelectorAll('[data-client-row]').forEach(row => {
      row.addEventListener('click', () => {
        selectedClientId = row.dataset.clientRow;
        renderClientDetail();
      });
    });
  }

  function initRowActions() {
    // Универсальный обработчик на все row-action-btn без специфичного data-атрибута
    document.addEventListener('click', e => {
      const btn = e.target.closest('.row-action-btn');
      if (!btn) return;
      if (btn.dataset.editTour || btn.dataset.delTour) return;
      if (btn.dataset.viewBooking || btn.dataset.delBooking) return;
      if (btn.dataset.approveReview || btn.dataset.delReview) return;
      // Кнопки в контенте (страницы) — редактирование
      if (btn.closest('.content-pane')) {
        showToast('Редактирование страницы — демо');
      }
    });
  }

  /* ============================================================
     ЭКСПОРТ
  ============================================================ */
  function initExport() {
    document.querySelectorAll('[data-export]').forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.dataset.export;
        let rows = [];
        let name = 'export';

        if (type === 'bookings') {
          rows = [['Номер','Клиент','Телефон','Тур','Дата','Сумма','Статус']];
          load(KEYS.bookings, []).forEach(b => rows.push([b.num, b.client, b.phone, b.tour, b.date, b.amount, b.status]));
          name = 'tourline-bookings';
        } else if (type === 'tours') {
          rows = [['Тур','Страна','Длительность','Даты','Цена','Места','Статус']];
          load(KEYS.tours, []).forEach(t => rows.push([t.title, t.country, t.duration, t.dates, t.price, t.spots, t.status]));
          name = 'tourline-tours';
        } else if (type === 'clients') {
          rows = [['Имя','Email','Телефон','Город','Поездок']];
          load(KEYS.clients, []).forEach(c => rows.push([c.name, c.email, c.phone, c.city, c.trips]));
          name = 'tourline-clients';
        } else if (type === 'dashboard') {
          rows = [['Метрика','Значение']];
          rows.push(['Доход за месяц', '186400']);
          rows.push(['Новые брони', '36']);
          rows.push(['Активные туры', '24']);
          rows.push(['Клиенты', '2340']);
          name = 'tourline-dashboard';
        }

        const csv = rows.map(r => r.map(v => `"${String(v == null ? '' : v).replace(/"/g, '""')}"`).join(',')).join('\n');
        const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${name}-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
        showToast('✓ Файл выгружен');
      });
    });

    document.querySelector('[data-clear-log]')?.addEventListener('click', () => {
      if (!confirm('Очистить журнал действий?')) return;
      save(KEYS.log, []);
      renderLogList();
      showToast('✓ Журнал очищен');
    });

    document.querySelector('[data-upload]')?.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.multiple = true;
      input.addEventListener('change', () => {
        showToast(`✓ Выбрано файлов: ${input.files.length}`);
      });
      input.click();
    });

    document.querySelector('[data-publish]')?.addEventListener('click', () => {
      addLog('Опубликованы изменения контента');
      showToast('✓ Изменения опубликованы');
    });

    document.querySelectorAll('[data-goto]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        switchPane(btn.dataset.goto);
      });
    });

    document.querySelector('[data-invite-user]')?.addEventListener('click', () => {
      const email = prompt('E-mail нового пользователя:');
      if (email && email.includes('@')) showToast('✓ Приглашение отправлено на ' + email);
    });
  }

  /* ============================================================
     ВЫХОД
  ============================================================ */
  function initLogout() {
    const btn = document.getElementById('logout-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      if (!confirm('Выйти из админ-панели?')) return;
      localStorage.removeItem(KEYS.adminSession);
      try { localStorage.removeItem(KEYS.current); } catch (e) {}
      window.location.href = 'index.html';
    });
  }

  /* ============================================================
     ЭКРАН ВХОДА
  ============================================================ */
  function renderLoginScreen() {
    document.body.innerHTML = `
      <div class="admin-login-page">
        <div class="admin-login-card">
          <h1>Вход в админ-панель</h1>
          <p>Введите логин и пароль администратора</p>
          <form id="admin-login-form" style="text-align:left;">
            <label style="display:block;font-size:12px;color:#9FAAA2;margin-bottom:6px;">Логин</label>
            <input type="text" name="login" required style="width:100%;padding:12px 16px;border:1px solid #26302A;border-radius:10px;background:#0D1210;color:#E6EBE7;font-size:14px;outline:none;margin-bottom:16px;font-family:inherit;">
            <label style="display:block;font-size:12px;color:#9FAAA2;margin-bottom:6px;">Пароль</label>
            <input type="password" name="password" required style="width:100%;padding:12px 16px;border:1px solid #26302A;border-radius:10px;background:#0D1210;color:#E6EBE7;font-size:14px;outline:none;margin-bottom:20px;font-family:inherit;">
            <button type="submit" style="width:100%;padding:14px;border-radius:10px;background:#7EA882;color:#0D1210;font-size:15px;font-weight:600;border:none;cursor:pointer;font-family:inherit;">Войти</button>
          </form>
          <p style="margin-top:20px;font-size:12px;color:#6F7A73;">Или войдите через <a href="auth.html" style="color:#7EA882;">обычную форму</a></p>
        </div>
      </div>
    `;
    document.getElementById('admin-login-form').addEventListener('submit', e => {
      e.preventDefault();
      const f = e.target;
      const profile = load(KEYS.adminProfile, { password: ADMIN_PASSWORD });
      if (f.login.value === ADMIN_LOGIN && (f.password.value === profile.password || f.password.value === ADMIN_PASSWORD)) {
        save(KEYS.adminSession, { loggedIn: true, expires: Date.now() + 8 * 3600 * 1000 });
        location.reload();
      } else {
        alert('Неверный логин или пароль');
      }
    });
  }

  /* ============================================================
     МОБИЛЬНОЕ МЕНЮ
  ============================================================ */
 function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (!btn || !sidebar) return;

  btn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay?.classList.toggle('show');
  });

  overlay?.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
  });

  // Закрытие при выборе пункта
  sidebar.querySelectorAll('button').forEach(b => {
    b.addEventListener('click', () => {
      if (window.innerWidth <= 1024) {
        sidebar.classList.remove('open');
        overlay?.classList.remove('show');
      }
    });
  });
}

  /* ============================================================
     ТЕМА
  ============================================================ */
  function initTheme() {
    const btn = document.getElementById('theme-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('tl-theme', next);
    });
  }

  /* ============================================================
     СТАТУС-БЕЙДЖ
  ============================================================ */
  function statusBadge(status) {
    const map = {
      paid: { cls: 'paid', text: 'Оплачено' },
      pending: { cls: 'pending', text: 'Ожидает' },
      prepay: { cls: 'prepay', text: 'Предоплата' },
      refund: { cls: 'refund', text: 'Возврат' },
      draft: { cls: 'draft', text: 'Черновик' },
      published: { cls: 'published', text: 'Опубликован' },
      moderation: { cls: 'moderation', text: 'На модерации' }
    };
    const s = map[status] || { cls: 'draft', text: status };
    return `<span class="status status-${s.cls}">${s.text}</span>`;
  }

  /* ============================================================
     TOAST
  ============================================================ */
  function showToast(msg, type) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.remove('toast--error');
  if (type === 'error') toast.classList.add('toast--error');
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3000);
}
window.adminToast = showToast;

  /* ============================================================
     ЗАПУСК СОХРАНЕНИЯ ПРОФИЛЯ
  ============================================================ */
  // initProfileSave и initSettingsSave вызываются в init() — здесь дубль для страховки
  document.addEventListener('DOMContentLoaded', () => {
    initProfileSave();
    initSettingsSave();
  });
/* ============================================================
   ЗАГРУЗКА ФОТО В МОДАЛКАХ
============================================================ */
function initPhotoUploaders() {
  document.querySelectorAll('.photo-uploader').forEach(uploader => {
    const preview = uploader.querySelector('[data-preview]');
    const fileInput = uploader.querySelector('[data-file-input]');
    const hiddenInput = uploader.querySelector('[data-image-value]');
    const removeBtn = uploader.querySelector('[data-remove]');
    if (!preview || !fileInput || !hiddenInput) return;

    // --- Открыть диалог по клику на превью ---
    preview.addEventListener('click', () => fileInput.click());

    // --- Обработка выбранного файла ---
    fileInput.addEventListener('change', e => {
      const file = e.target.files && e.target.files[0];
      if (file) handleFile(file);
    });

    // --- Drag & Drop ---
    ['dragenter', 'dragover'].forEach(evt => {
      preview.addEventListener(evt, e => {
        e.preventDefault();
        e.stopPropagation();
        preview.classList.add('drag-over');
      });
    });
    ['dragleave', 'drop'].forEach(evt => {
      preview.addEventListener(evt, e => {
        e.preventDefault();
        e.stopPropagation();
        preview.classList.remove('drag-over');
      });
    });
    preview.addEventListener('drop', e => {
      const file = e.dataTransfer.files && e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) handleFile(file);
    });

    // --- Удалить фото ---
    removeBtn?.addEventListener('click', e => {
      e.stopPropagation();
      setImage(null);
      fileInput.value = '';
    });

    // --- Обработка файла: сжатие + превью ---
    function handleFile(file) {
      // Проверка размера (10 МБ исходный)
      if (file.size > 10 * 1024 * 1024) {
        showToast('Файл слишком большой (макс. 10 МБ)', 'error');
        return;
      }

      // Показываем индикатор загрузки
      let loading = preview.querySelector('.photo-loading');
      if (!loading) {
        loading = document.createElement('div');
        loading.className = 'photo-loading';
        loading.innerHTML = 'Обработка…';
        preview.appendChild(loading);
      }

      const reader = new FileReader();
      reader.onload = ev => {
        const img = new Image();
        img.onload = () => {
          // Сжимаем через canvas
          const MAX_W = 800;
          const MAX_H = 600;
          let w = img.width;
          let h = img.height;
          const ratio = Math.min(MAX_W / w, MAX_H / h, 1);
          w = Math.round(w * ratio);
          h = Math.round(h * ratio);

          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);

          // Качество зависит от размера
          const quality = w > 600 ? 0.78 : 0.85;
          const dataUrl = canvas.toDataURL('image/jpeg', quality);

          // Проверка размера итоговой строки (< 500 КБ)
          if (dataUrl.length > 500 * 1024) {
            const smallUrl = canvas.toDataURL('image/jpeg', 0.6);
            setImage(smallUrl);
          } else {
            setImage(dataUrl);
          }

          loading?.remove();

          // Показываем галочку
          const ok = document.createElement('div');
          ok.className = 'photo-success';
          ok.textContent = '✓ Загружено';
          preview.appendChild(ok);
          setTimeout(() => ok.remove(), 1500);
        };
        img.onerror = () => {
          loading?.remove();
          showToast('Не удалось загрузить фото', 'error');
        };
        img.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    }

    // --- Установка картинки ---
    function setImage(dataUrl) {
      if (dataUrl) {
        preview.classList.add('has-image');
        preview.innerHTML = `<img src="${dataUrl}" alt="">`;
        hiddenInput.value = dataUrl;
        removeBtn.hidden = false;
      } else {
        preview.classList.remove('has-image');
        preview.innerHTML = `
          <div class="photo-placeholder">
            <svg viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
            <span>Перетащите фото сюда или нажмите</span>
          </div>
        `;
        hiddenInput.value = '';
        removeBtn.hidden = true;
      }
    }

    // --- Публичный метод: установить фото извне (при открытии формы) ---
    uploader._setImage = setImage;
        // Стартовое состояние: если картинки нет — кнопка удаления скрыта
    if (!hiddenInput.value) {
      removeBtn.hidden = true;
    } else {
      removeBtn.hidden = false;
    }
  });
}

/* ---- Публичная функция: заполнить загрузчик ---- */
function fillUploader(selector, imageUrl) {
  const uploader = document.querySelector(selector);
  if (!uploader || !uploader._setImage) return;
  uploader._setImage(imageUrl || null);
}
/* ============================================================
   УВЕДОМЛЕНИЯ АДМИНА
============================================================ */
const NOTIF_KEY = 'tl-notifications';

function loadNotifs() {
  try { return JSON.parse(localStorage.getItem(NOTIF_KEY)) || []; }
  catch (e) { return []; }
}
function saveNotifs(list) {
  try { localStorage.setItem(NOTIF_KEY, JSON.stringify(list.slice(0, 100))); }
  catch (e) {}
}

function timeAgo(iso) {
  const d = new Date(iso);
  const diff = (Date.now() - d.getTime()) / 1000;
  if (diff < 60) return 'только что';
  if (diff < 3600) return Math.floor(diff / 60) + ' мин назад';
  if (diff < 86400) return Math.floor(diff / 3600) + ' ч назад';
  if (diff < 604800) return Math.floor(diff / 86400) + ' дн назад';
  return d.toLocaleDateString('ru-RU') + ' ' + d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}

const NOTIF_ICONS = {
  booking:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>`,
  callback: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>`,
  cta:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  contact:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  resume:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" x2="15" y1="13" y2="13"/><line x1="9" x2="15" y1="17" y2="17"/><line x1="9" x2="13" y1="9" y2="9"/></svg>`,
  review:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  info:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>`
};
window.renderAdminNotifications = function () {
  const list = document.getElementById('notif-list');
  const sub = document.getElementById('notif-sub');
  if (!list) return;

  const notifs = loadNotifs();
  const unread = notifs.filter(n => !n.read).length;

  if (sub) {
    sub.textContent = unread > 0 ? unread + ' новых' : 'Нет новых';
  }

  if (!notifs.length) {
    list.innerHTML = '<div class="notif-empty">Пока нет уведомлений</div>';
    return;
  }

  list.innerHTML = notifs.map(n => `
  <div class="notif-item ${n.read ? '' : 'unread'}" data-notif-id="${n.id}">
    <div class="notif-item-icon">${NOTIF_ICONS[n.type] || NOTIF_ICONS.info}</div>
    <div class="notif-item-body">
      <div class="notif-item-title">${escapeHtml(n.title)}</div>
      <div class="notif-item-msg">${escapeHtml(n.message)}</div>
      <div class="notif-item-date">${timeAgo(n.createdAt)}</div>
    </div>
    <button type="button" class="notif-item-del" data-notif-del="${n.id}" title="Удалить">×</button>
  </div>
`).join('');

  // Клик по уведомлению — открыть раздел
  list.querySelectorAll('[data-notif-id]').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target.closest('[data-notif-del]')) return;
      const id = el.dataset.notifId;
      const n = loadNotifs().find(x => x.id === id);
      if (!n) return;

      // Пометить как прочитанное
      const notifs = loadNotifs();
      const target = notifs.find(x => x.id === id);
      if (target) { target.read = true; saveNotifs(notifs); }

      // Перейти в нужный раздел
      const map = {
        booking: 'bookings',
        callback: 'bookings',
        cta: 'bookings',
        contact: 'clients',
        resume: 'clients',
        review: 'content'
      };
      const pane = map[n.type];
      if (pane) switchPane(pane);

      // Закрыть дропдаун
      document.getElementById('notif-dropdown')?.classList.remove('open');
      window.renderAdminNotifications();
      window.updateAdminNotifBadge();
    });
  });

  // Удаление одного
  list.querySelectorAll('[data-notif-del]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.notifDel;
      saveNotifs(loadNotifs().filter(x => x.id !== id));
      window.renderAdminNotifications();
      window.updateAdminNotifBadge();
    });
  });
};

window.updateAdminNotifBadge = function () {
  const notifs = loadNotifs();
  const unread = notifs.filter(n => !n.read).length;
  const dot = document.getElementById('notif-dot');
  const count = document.getElementById('notif-count');
  if (count) {
    if (unread > 0) {
      count.textContent = unread > 99 ? '99+' : unread;
      count.style.display = '';
      if (dot) dot.style.display = 'none';
    } else {
      count.style.display = 'none';
      if (dot) dot.style.display = 'none';
    }
  }
};

function initNotifications() {
  const btn = document.getElementById('notif-btn');
  const dd = document.getElementById('notif-dropdown');
  const markAll = document.getElementById('notif-mark-all');
  const clearAll = document.getElementById('notif-clear');
  if (!btn || !dd) return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    dd.classList.toggle('open');
    if (dd.classList.contains('open')) {
      window.renderAdminNotifications();
    }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.notif-wrap')) {
      dd.classList.remove('open');
    }
  });

  markAll?.addEventListener('click', () => {
    const list = loadNotifs().map(n => ({ ...n, read: true }));
    saveNotifs(list);
    window.renderAdminNotifications();
    window.updateAdminNotifBadge();
  });

  clearAll?.addEventListener('click', () => {
    if (!confirm('Очистить все уведомления?')) return;
    saveNotifs([]);
    window.renderAdminNotifications();
    window.updateAdminNotifBadge();
  });

  window.updateAdminNotifBadge();

  // Автообновление каждые 5 секунд (на случай, если сайт открыт в другой вкладке)
  setInterval(() => {
    window.updateAdminNotifBadge();
  }, 5000);
}
/* ============================================================
   ГРАФИК ДИНАМИКИ ПРОДАЖ
============================================================ */
let currentSalesPeriod = '12m';

const SALES_DATA = {
  '12m': {
    labels: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
    heights: [35, 45, 52, 48, 60, 55, 72, 68, 62, 74, 82, 90],
    revenue: 186400,
    tours: 412
  },
  '6m': {
    labels: ['Июл','Авг','Сен','Окт','Ноя','Дек'],
    heights: [72, 68, 62, 74, 82, 90],
    revenue: 112800,
    tours: 248
  },
  '30d': {
    labels: ['1','5','10','15','20','25','30'],
    heights: [40, 55, 48, 72, 65, 88, 95],
    revenue: 28400,
    tours: 62
  }
};
function renderSalesChart(period) {
  const chart = document.getElementById('sales-chart');
  const subtitle = document.getElementById('sales-subtitle');
  if (!chart) return;

  if (period) currentSalesPeriod = period;
 const data = SALES_DATA[currentSalesPeriod] || SALES_DATA['12m'];
const periodLabel = currentSalesPeriod === '12m' ? 'за год' :
                    currentSalesPeriod === '6m' ? 'за 6 месяцев' :
                    'за 30 дней';
const tourWord = data.tours === 1 ? 'путёвка' :
                 data.tours < 5 ? 'путёвки' : 'путёвок';
if (subtitle) {
  subtitle.textContent = `${formatMoney(data.revenue)} · ${data.tours} ${tourWord} ${periodLabel}`;
}

  const maxHeight = Math.max(...data.heights, 1);

  chart.innerHTML = data.labels.map((label, i) => {
    const heightPct = Math.round((data.heights[i] / maxHeight) * 95);
    return `
      <div class="bar-col">
        <div class="bar" style="height:${heightPct}%;"></div>
        <span class="bar-label">${label}</span>
      </div>
    `;
  }).join('');

  // Плавное появление столбцов
  chart.querySelectorAll('.bar').forEach((bar, i) => {
    bar.style.opacity = '0';
    bar.style.transform = 'scaleY(0)';
    bar.style.transformOrigin = 'bottom';
    setTimeout(() => {
      bar.style.transition = 'opacity .4s ease, transform .5s cubic-bezier(.2,.9,.3,1)';
      bar.style.opacity = '1';
      bar.style.transform = 'scaleY(1)';
    }, i * 30);
  });
}

/* ---- Инициализация кнопок-периодов ---- */
function initSalesPeriodSelect() {
  const container = document.getElementById('sales-period');
  if (!container) return;

  // Если это группа кнопок
  if (container.classList.contains('period-switch')) {
    container.querySelectorAll('.period-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderSalesChart(btn.dataset.period);
      });
    });
  } else if (container.tagName === 'SELECT') {
    // Старый вариант — селект
    container.value = currentSalesPeriod;
    container.addEventListener('change', (e) => {
      renderSalesChart(e.target.value);
    });
  }
}
/* ============================================================
   ОБНОВЛЕНИЕ ВСЕХ СУММ ПРИ СМЕНЕ ВАЛЮТЫ
============================================================ */
function updateAllMoneyDisplays() {
  const sym = getCurrencySymbol();

  // ===== 1. KPI-карточки на Дашборде =====
  const kpiMap = {
    'kpi-revenue': 186400,
    'kpi-bookings': null,
    'kpi-tours': null,
    'kpi-clients': null
  };
  Object.entries(kpiMap).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el && value !== null) {
      el.textContent = formatMoney(value);
    }
  });

  // ===== 2. KPI на странице «Бронирования» =====
  const bookingKpis = [
    { value: 148200, label: 'Оплачено за июнь' },
    { value: 24900,  label: 'Ожидает оплаты' },
    { value: 3400,   label: 'Возвраты' },
    { value: 1240,   label: 'Средний чек' }
  ];
  document.querySelectorAll('.admin-pane[data-pane-content="bookings"] .kpi-value').forEach((el, i) => {
    if (bookingKpis[i]) el.textContent = formatMoney(bookingKpis[i].value);
  });

  // ===== 3. KPI на странице «Туры» =====
  const toursKpis = [
    { value: 148,    isMoney: false, suffix: '' },        // количество
    { value: 132,    isMoney: false, suffix: '' },        // количество
    { value: 16,     isMoney: false, suffix: '' },        // количество
    { value: 1280,   isMoney: true }                       // средняя цена
  ];
  document.querySelectorAll('.admin-pane[data-pane-content="tours"] .kpi-value').forEach((el, i) => {
    const k = toursKpis[i];
    if (!k) return;
    el.textContent = k.isMoney ? formatMoney(k.value) : (k.value + (k.suffix || ''));
  });

  // ===== 4. Подзаголовки в HTML, где цифры прописаны статично =====
  // Динамика продаж
  const salesChart = document.getElementById('sales-chart');
  if (salesChart) {
    renderSalesChart();
  }

  // ===== 5. Все остальные блоки — перерисовываем полностью =====
  try { renderDashboardBookings(); } catch (e) {}
  try { renderPendingBookings(); } catch (e) {}
  try { renderBookingsTable(); } catch (e) {}
  try { renderToursTable(); } catch (e) {}
  try { renderClientDetail(); } catch (e) {}

  addLog('Отображение валюты обновлено: ' + sym);
}
})();
/* ============================================================
   УНИВЕРСАЛЬНОЕ ЗАКРЫТИЕ ВСЕХ МОДАЛОК
   Работает на любой кнопке и любом фоне
============================================================ */

// Делегирование: клик по кнопке закрытия или фону
document.addEventListener('click', (e) => {
  // 1. Кнопка "×" (.modal-close)
  const closeBtn = e.target.closest('.modal-close');
  if (closeBtn) {
    const modal = closeBtn.closest('.modal-overlay');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
    return;
  }

  // 2. Кнопка "Закрыть" / "Отмена" ([data-close])
  const dataCloseBtn = e.target.closest('[data-close]');
  if (dataCloseBtn) {
    e.preventDefault();
    const modal = dataCloseBtn.closest('.modal-overlay');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
    return;
  }

  // 3. Клик по фону модалки (сам .modal-overlay)
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// Escape закрывает все открытые модалки
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => {
      m.classList.remove('open');
    });
    document.body.style.overflow = '';
  }
  /* ============================================================
   ЗАГРУЗКА АВАТАРКИ АДМИНА
============================================================ */
function initAdminAvatar() {
  console.log('initAdminAvatar: запуск');

  const preview = document.getElementById('admin-avatar-preview');
  const letter = document.getElementById('admin-avatar-letter');
  const fileInput = document.getElementById('admin-avatar-input');
  const pickBtn = document.getElementById('admin-avatar-pick');
  const removeBtn = document.getElementById('admin-avatar-remove');

  console.log('Элементы найдены:', {
    preview: !!preview,
    fileInput: !!fileInput,
    pickBtn: !!pickBtn,
    removeBtn: !!removeBtn
  });

  if (!preview || !fileInput || !pickBtn) {
    console.warn('initAdminAvatar: не все элементы найдены');
    return;
  }

  // Загружаем текущий аватар
  loadCurrentAvatar();

  function loadCurrentAvatar() {
    const profile = load(KEYS.adminProfile, {});
    const avatar = profile.avatar || '';
    const name = profile.name || 'А';

    if (avatar) {
      preview.style.backgroundImage = 'url(' + avatar + ')';
      preview.classList.add('has-image');
      if (removeBtn) removeBtn.style.display = '';
    } else {
      preview.style.backgroundImage = '';
      preview.classList.remove('has-image');
      if (letter) letter.textContent = initials(name) || 'А';
      if (removeBtn) removeBtn.style.display = 'none';
    }
  }

  // Клик по кнопке → открываем выбор файла
  pickBtn.onclick = function (e) {
    e.preventDefault();
    console.log('Клик по "Загрузить фото"');
    fileInput.click();
  };

  // Обработка файла
  fileInput.onchange = function (e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    console.log('Файл выбран:', file.name, file.size, 'байт');

    if (file.size > 5 * 1024 * 1024) {
      if (window.showToast) showToast('Файл слишком большой (макс. 5 МБ)', 'error');
      else alert('Файл слишком большой (макс. 5 МБ)');
      return;
    }
    if (!file.type.startsWith('image/')) {
      if (window.showToast) showToast('Только изображения', 'error');
      else alert('Только изображения');
      return;
    }

    const reader = new FileReader();
    reader.onload = function (ev) {
      const img = new Image();
      img.onload = function () {
        // Сжимаем до 400×400 квадрат
        const MAX = 400;
        let w = img.width, h = img.height;
        const ratio = Math.min(MAX / w, MAX / h, 1);
        w = Math.round(w * ratio);
        h = Math.round(h * ratio);

        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);

        // Квадрат по центру
        const size = Math.min(w, h);
        const sq = document.createElement('canvas');
        sq.width = size;
        sq.height = size;
        sq.getContext('2d').drawImage(canvas, (w - size) / 2, (h - size) / 2, size, size, 0, 0, size, size);

        const dataUrl = sq.toDataURL('image/jpeg', 0.82);
        console.log('Аватар сжат до', dataUrl.length, 'символов');

        // Сохраняем
        const profile = load(KEYS.adminProfile, {});
        profile.avatar = dataUrl;
        save(KEYS.adminProfile, profile);

        // Обновляем UI
        preview.style.backgroundImage = 'url(' + dataUrl + ')';
        preview.classList.add('has-image');
        if (removeBtn) removeBtn.style.display = '';

        // Обновляем шапку
        if (typeof updateTopbarUser === 'function') updateTopbarUser();

        if (typeof addLog === 'function') addLog('Обновлена аватарка администратора');
        if (window.showToast) showToast('✓ Аватар обновлён');
        else alert('✓ Аватар обновлён');
      };
      img.onerror = function () {
        console.error('Ошибка загрузки изображения');
        if (window.showToast) showToast('Не удалось загрузить фото', 'error');
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
    fileInput.value = '';
  };

  // Удаление
  if (removeBtn) {
    removeBtn.onclick = function (e) {
      e.preventDefault();
      if (!confirm('Удалить аватарку?')) return;
      const profile = load(KEYS.adminProfile, {});
      delete profile.avatar;
      save(KEYS.adminProfile, profile);
      loadCurrentAvatar();
      if (typeof updateTopbarUser === 'function') updateTopbarUser();
      if (window.showToast) showToast('✓ Аватар удалён');
    };
  }
}

// Экспортируем наружу, чтобы можно было вызывать вручную
window.initAdminAvatar = initAdminAvatar;
});
