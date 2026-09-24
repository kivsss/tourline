/* ============================================
   TOURLINE — АВТОРИЗАЦИЯ
============================================ */

const AUTH_KEYS = {
  users: 'tl-users',
  current: 'tl-current-user',
  bookings: 'tl-bookings',
  favorites: 'tl-favorites'
};

/* ============================================
   АДМИНИСТРАТОР — логин и пароль
============================================ */
const ADMIN_CREDENTIALS = {
  login: 'admin',
  email: 'admin@tourline.ru',
  password: 'tourline2026',
  name: 'Администратор'
};

function isAdminCredentials(loginOrEmail, password) {
  const l = (loginOrEmail || '').trim().toLowerCase();
  const p = (password || '').trim();
  return (l === ADMIN_CREDENTIALS.login.toLowerCase()
       || l === ADMIN_CREDENTIALS.email.toLowerCase())
       && p === ADMIN_CREDENTIALS.password;
}

function isCurrentUserAdmin() {
  const u = getCurrentUser();
  return !!(u && u.role === 'admin');
}

/* ---------- ХЕЛПЕРЫ ---------- */
function getUsers() {
  try { return JSON.parse(localStorage.getItem(AUTH_KEYS.users)) || []; }
  catch { return []; }
}
function saveUsers(list) {
  localStorage.setItem(AUTH_KEYS.users, JSON.stringify(list));
}
function getCurrentUser() {
  try { return JSON.parse(localStorage.getItem(AUTH_KEYS.current)); }
  catch { return null; }
}
function setCurrentUser(user) {
  if (user) localStorage.setItem(AUTH_KEYS.current, JSON.stringify(user));
  else localStorage.removeItem(AUTH_KEYS.current);
}
function getBookings() {
  try { return JSON.parse(localStorage.getItem(AUTH_KEYS.bookings)) || []; }
  catch { return []; }
}
function saveBookings(list) {
  localStorage.setItem(AUTH_KEYS.bookings, JSON.stringify(list));
}
function getFavorites() {
  try { return JSON.parse(localStorage.getItem(AUTH_KEYS.favorites)) || []; }
  catch { return []; }
}
function saveFavorites(list) {
  localStorage.setItem(AUTH_KEYS.favorites, JSON.stringify(list));
}
function userInitials(n) {
  return (n || '').trim().split(/\s+/).map(w => w[0] || '').slice(0, 2).join('').toUpperCase();
}
function escapeHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ============================================
   РЕГИСТРАЦИЯ
============================================ */
function registerUser({ name, email, phone, password }) {
  const users = getUsers();
  const emailLower = email.trim().toLowerCase();

  if (emailLower === ADMIN_CREDENTIALS.email.toLowerCase()) {
    return { ok: false, error: 'Этот email зарезервирован' };
  }
  if (users.some(u => u.email === emailLower)) {
    return { ok: false, error: 'Пользователь с таким email уже зарегистрирован' };
  }

  const user = {
    id: 'u_' + Date.now(),
    name: name.trim(),
    email: emailLower,
    phone: phone.trim(),
    password: password,
    role: 'user',
    createdAt: new Date().toISOString()
  };
  users.push(user);
  saveUsers(users);
  setCurrentUser({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: 'user'
  });
  return { ok: true, user };
}

/* ============================================
   ВХОД — пользователь ИЛИ админ
============================================ */
function loginUser({ email, password }) {
  // 1. Проверка админа
  if (isAdminCredentials(email, password)) {
    const adminUser = {
      id: 'admin',
      name: ADMIN_CREDENTIALS.name,
      email: ADMIN_CREDENTIALS.email,
      phone: '',
      role: 'admin'
    };
    setCurrentUser(adminUser);
    return { ok: true, user: adminUser, isAdmin: true };
  }

  // 2. Обычный пользователь
  const users = getUsers();
  const user = users.find(u => u.email === email.trim().toLowerCase());
  if (!user) return { ok: false, error: 'Пользователь не найден' };
  if (user.password !== password) return { ok: false, error: 'Неверный пароль' };

  setCurrentUser({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role || 'user'
  });
  return { ok: true, user };
}

/* ============================================
   ВЫХОД
============================================ */
function logoutUser() {
  setCurrentUser(null);
}

/* ============================================
   ОБНОВЛЕНИЕ ПРОФИЛЯ
============================================ */
function updateProfile(updates) {
  const current = getCurrentUser();
  if (!current) return { ok: false };
  if (current.role === 'admin') return { ok: false, error: 'Профиль администратора не редактируется' };

  const users = getUsers();
  const idx = users.findIndex(u => u.id === current.id);
  if (idx === -1) return { ok: false };

  if (updates.name) users[idx].name = updates.name.trim();
  if (updates.phone !== undefined) users[idx].phone = updates.phone.trim();
  if (updates.password) users[idx].password = updates.password;

  saveUsers(users);
  setCurrentUser({
    id: users[idx].id,
    name: users[idx].name,
    email: users[idx].email,
    phone: users[idx].phone,
    role: users[idx].role || 'user'
  });
  return { ok: true };
}

/* ============================================
   РЕНДЕР КНОПКИ В ШАПКЕ
============================================ */
function renderAuthButton() {
  const containers = document.querySelectorAll('[data-auth-slot]');
  if (!containers.length) return;

  const user = getCurrentUser();

  containers.forEach(container => {
    if (!user) {
      container.innerHTML = `
        <a href="auth.html" class="auth-btn">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          Войти
        </a>
      `;
        } else {
      const isAdmin = user.role === 'admin';

      const menuItems = isAdmin
        ? `
          <a href="admin.html" class="user-dropdown-admin">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <rect width="18" height="11" x="3" y="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            Админ-панель
          </a>
          <div class="divider"></div>
          <button type="button" data-logout>
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" x2="9" y1="12" y2="12"/>
            </svg>
            Выйти
          </button>
        `
        : `
          <a href="account.html">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Личный кабинет
          </a>
          <a href="account.html#bookings">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            Мои заявки
          </a>
          <a href="account.html#favorites">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            Избранное
          </a>
          <div class="divider"></div>
          <button type="button" data-logout>
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
            Выйти
          </button>
        `;

      container.innerHTML = `
        <div class="user-menu" data-user-menu>
          <button class="user-trigger" type="button" data-user-trigger>
            <span class="user-avatar ${isAdmin ? 'user-avatar-admin' : ''}">${escapeHtml(userInitials(user.name))}</span>
            <span>${escapeHtml(user.name.split(' ')[0] || 'Профиль')}</span>
            <svg class="icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" style="stroke:var(--text-muted);"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div class="user-dropdown" data-user-dropdown>
            ${menuItems}
          </div>
        </div>
      `;
    }
  });

  document.querySelectorAll('[data-user-trigger]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const dd = btn.nextElementSibling;
      document.querySelectorAll('.user-dropdown.open').forEach(d => {
        if (d !== dd) d.classList.remove('open');
      });
      dd.classList.toggle('open');
    });
  });

  document.querySelectorAll('[data-logout]').forEach(btn => {
    btn.addEventListener('click', () => {
      logoutUser();
      if (typeof showToast === 'function') showToast('Вы вышли из аккаунта');
      setTimeout(() => window.location.href = 'index.html', 500);
    });
  });
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.user-menu')) {
    document.querySelectorAll('.user-dropdown.open').forEach(d => d.classList.remove('open'));
  }
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderAuthButton);
} else {
  renderAuthButton();
}