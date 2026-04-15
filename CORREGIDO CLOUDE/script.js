// ═══════════════════════════════════════════════════════════
//  LODA Uniformes — script.js
//  Persistencia compartida via JSONBin.io
//  Los cambios del admin se ven para TODOS los visitantes.
// ═══════════════════════════════════════════════════════════

// ── CONFIGURACIÓN JSONBIN ──────────────────────────────────
// 1. Ve a https://jsonbin.io  →  crea cuenta gratis
// 2. Crea un nuevo Bin con el JSON de DEFAULTS (abajo)
// 3. Copia el BIN_ID y tu API_KEY aquí:
const BIN_ID  = '69df1696856a68218935fa5f';        // ej: 6650f3abc123456789abcdef
const API_KEY = '$2a$10$haSUQabjyy/A3qN2.0WUCOrm60sgMwOYNyfzte7pY8qXf0QJ1/.RC';       // ej: $2a$10$abc...

const BIN_URL  = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
const HEADERS_READ  = { 'X-Master-Key': API_KEY };
const HEADERS_WRITE = { 'Content-Type': 'application/json', 'X-Master-Key': API_KEY };

// ── PÁGINA ACTUAL ─────────────────────────────────────────
let currentPage = window.location.pathname.split('/').pop().split('?')[0].split('#')[0];
if (!currentPage || currentPage === '') currentPage = 'index.html';

// ── PALETA DE COLORES ──────────────────────────────────────
const COLOR_OPTIONS = `
  <option value="var(--primary-dark)">Azul Fuerte</option>
  <option value="var(--primary)">Azul Brillante</option>
  <option value="var(--accent)">Rosa Sandía</option>
  <option value="var(--text-main)">Gris Oscuro</option>
  <option value="var(--text-muted)">Gris Claro</option>
`;

// ── DATOS POR DEFECTO ─────────────────────────────────────
// Este objeto es el "estado inicial". Cuando crees tu Bin en JSONBin,
// pega exactamente este JSON como contenido del Bin.
const DEFAULTS = {
  index: {
    heroTag: "Uniformes cómodos y duraderos",
    title: "Listos para su Aventura Escolar",
    titleColor: "var(--primary-dark)",
    sub: "Sabemos que buscas calidad y resistencia para el día a día de tus hijos. En LODA Uniformes te ofrecemos prendas hechas para durar todo el ciclo escolar, con más de 3 sucursales cerca de ti.",
    subColor: "var(--text-muted)",
    imgUrl: "",
    imgCaption: "",
    aboutTitle: "Hechos por familias, para familias",
    aboutP1: "LODA Uniformes nace pensando en la tranquilidad de las mamás. Sabemos lo importante que es que la ropa resista juegos, lavadas y el ritmo escolar.",
    aboutP2: "Nuestra misión es que cada inicio de clases sea menos estresante para ti, ofreciéndote todo en un solo lugar y con atención cálida.",
    aboutColor: "var(--text-muted)",
    sucursales: [
      { name: "Matriz (Tampico)", addr: "Carretera Tampico-Mante #310, Col. México", phone: "(833) 224-7171" },
      { name: "Calzada San Pedro", addr: "Calzada San Pedro #500, Col. Las Violetas", phone: "(833) 132-6815" }
    ]
  },
  servicios: {
    title: "Todo lo que necesitan para triunfar",
    titleColor: "var(--primary-dark)",
    sub: "Desde la playera del kínder hasta el bordado de su equipo favorito. Encuentra calidad y resistencia.",
    subColor: "var(--text-muted)",
    imgUrl: "",
    imgCaption: "",
    items: [
      { icon: "🎒", title: "Uniformes Escolares Oficiales", desc: "Cumplimos con los lineamientos de los principales colegios desde kínder hasta prepa." },
      { icon: "👖", title: "Pants y Ropa Deportiva", desc: "Para esos días de deportes. Materiales flexibles que soportan las caídas y los juegos rudos." },
      { icon: "✂️", title: "Bordados Personalizados", desc: "Nombre, número o logo del equipo favorito. Hacemos bordados profesionales en todo tipo de prenda." },
      { icon: "👕", title: "Playeras y Camisas", desc: "Telas de alta calidad que resisten lavadas intensas sin desteñirse ni perder su forma." }
    ]
  },
  tips: {
    title: "Tips y Consejos Útiles",
    titleColor: "var(--primary-dark)",
    sub: "Sabemos que ser mamá es un trabajo de tiempo completo. Aquí te dejamos algunos datos interesantes y trucos para cuidar la ropa de tus peques.",
    subColor: "var(--text-muted)",
    imgUrl: "",
    imgCaption: "",
    items: [
      { icon: "✨", title: "Para manchas difíciles", desc: "Un poco de jabón de pasta antes de meter a la lavadora hace maravillas en los cuellos de las camisas blancas." },
      { icon: "📏", title: "Comprando inteligentemente", desc: "Te sugerimos pedir los pants o faldas con un dobladillo ligeramente más largo. ¡Los niños crecen muy rápido!" },
      { icon: "🌡️", title: "Temperatura correcta", desc: "Lava los uniformes a 30°C para conservar los colores más tiempo. El agua muy caliente desgasta las telas." },
      { icon: "☀️", title: "Secado al aire", desc: "Siempre que puedas, seca la ropa al aire libre. La secadora desgasta los tejidos más rápido." }
    ]
  },
  contact: {
    tel1: "(833) 224-7171",
    whatsapp: "(833) 118-9461"
  }
};

// ── ESTADO GLOBAL ─────────────────────────────────────────
let data = JSON.parse(JSON.stringify(DEFAULTS));
const ADMIN_PASS = 'loda2025';
let adminUnlocked = false;
let isSaving = false;

// ── CARGA DE DATOS DESDE JSONBIN ──────────────────────────
async function loadData() {
  // Siempre mostramos los defaults mientras carga
  renderUI();

  // Si no hay BIN configurado, usamos localStorage como fallback
  if (BIN_ID === 'TU_BIN_ID_AQUI') {
    try {
      const saved = localStorage.getItem('loda_data_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        data = deepMerge(JSON.parse(JSON.stringify(DEFAULTS)), parsed);
        renderUI();
      }
    } catch(e) {}
    return;
  }

  try {
    const res = await fetch(BIN_URL + '/latest', { headers: HEADERS_READ });
    if (res.ok) {
      const json = await res.json();
      if (json && json.record) {
        data = deepMerge(JSON.parse(JSON.stringify(DEFAULTS)), json.record);
        renderUI();
      }
    }
  } catch(e) {
    // Si falla la red, intentar localStorage como respaldo
    try {
      const saved = localStorage.getItem('loda_data_v2');
      if (saved) {
        data = deepMerge(JSON.parse(JSON.stringify(DEFAULTS)), JSON.parse(saved));
        renderUI();
      }
    } catch(e2) {}
  }
}

// ── GUARDAR DATOS EN JSONBIN ──────────────────────────────
async function persistData() {
  // Guardar siempre en localStorage como respaldo rápido
  localStorage.setItem('loda_data_v2', JSON.stringify(data));

  // Si no hay BIN configurado, solo localStorage
  if (BIN_ID === 'TU_BIN_ID_AQUI') return;

  try {
    const res = await fetch(BIN_URL, {
      method: 'PUT',
      headers: HEADERS_WRITE,
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('JSONBin write failed');
  } catch(e) {
    console.warn('No se pudo guardar en la nube. Los cambios se guardaron solo localmente.', e);
    throw e; // Para que saveData() sepa que hubo error
  }
}

// ── UTILIDAD: MERGE PROFUNDO ──────────────────────────────
function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (!target[key]) target[key] = {};
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

// ── RENDERIZAR UI ─────────────────────────────────────────
function renderUI() {
  if (currentPage === 'index.html') {
    const d = data.index;

    setEl('hero-tag-display',   d.heroTag);
    setElStyle('hero-title-display', d.title, 'color', d.titleColor);
    setElStyleCond('hero-sub-display', d.sub, 'color', d.subColor);

    // Imagen hero
    renderImage('hero-image-display', 'hero-caption-display', d.imgUrl, d.imgCaption);

    // Nosotros
    setElStyle('about-title-display', d.aboutTitle, 'color', d.titleColor);
    setElStyle('about-p1-display',    d.aboutP1,    'color', d.aboutColor);
    setElStyle('about-p2-display',    d.aboutP2,    'color', d.aboutColor);

    // Sucursales
    const sucEl = document.getElementById('sucursales-container');
    if (sucEl) {
      sucEl.innerHTML = d.sucursales.map(s => `
        <div class="sucursal-card">
          <h4>📍 ${s.name}</h4>
          <div class="addr">${s.addr}</div>
          <div class="phone">📞 ${s.phone}</div>
        </div>
      `).join('');
    }

    // Contacto
    const ctEl = document.getElementById('contact-info-display');
    if (ctEl) {
      ctEl.innerHTML = `
        <a class="contact-item" href="tel:${data.contact.tel1}">📞 ${data.contact.tel1}</a>
        <a class="contact-item" href="https://wa.me/52${data.contact.whatsapp.replace(/\D/g,'')}" target="_blank">💬 WhatsApp: ${data.contact.whatsapp}</a>
      `;
    }
  }
  else if (currentPage === 'servicios.html' || currentPage === 'tips.html') {
    const key = currentPage === 'servicios.html' ? 'servicios' : 'tips';
    const d = data[key];

    setElStyle('page-title-display', d.title, 'color', d.titleColor);
    setElStyleCond('page-sub-display', d.sub, 'color', d.subColor);
    renderImage('page-image-display', 'page-caption-display', d.imgUrl, d.imgCaption);

    const isServ = currentPage === 'servicios.html';
    const containerId = isServ ? 'services-container' : 'tips-container';
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = d.items.map(item => `
        <div class="${isServ ? 'service-card' : 'tip-card'}">
          <div class="${isServ ? 'svc-icon' : 'tip-icon'}">${item.icon}</div>
          <h3 class="${isServ ? 'svc-title' : 'tip-title'}">${item.title}</h3>
          <p class="${isServ ? 'svc-desc' : 'tip-desc'}">${item.desc}</p>
        </div>
      `).join('');
    }
  }
}

// ── HELPERS DE RENDER ─────────────────────────────────────
function setEl(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}
function setElStyle(id, val, prop, propVal) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = val;
  el.style[prop] = propVal;
}
function setElStyleCond(id, val, prop, propVal) {
  const el = document.getElementById(id);
  if (!el) return;
  if (!val || val.trim() === '') { el.style.display = 'none'; }
  else { el.style.display = ''; el.textContent = val; el.style[prop] = propVal; }
}
function renderImage(imgId, capId, url, caption) {
  const imgEl = document.getElementById(imgId);
  const capEl = document.getElementById(capId);
  if (!imgEl || !capEl) return;
  if (!url || url.trim() === '') {
    imgEl.style.display = 'none'; capEl.style.display = 'none';
  } else {
    imgEl.style.display = 'block'; imgEl.src = url;
    capEl.style.display = caption && caption.trim() ? 'block' : 'none';
    capEl.textContent = caption || '';
  }
}

// ═══════════════════════════════════════════════════════════
//  PANEL DE ADMINISTRACIÓN
// ═══════════════════════════════════════════════════════════

function injectAdminPanel() {
  const container = document.getElementById('admin-container');
  if (!container) return;

  container.innerHTML = `
  <div id="admin-overlay">
    <div id="admin-panel">
      <div class="admin-header">
        <h2>⚙ Editor de Página — ${getPageLabel()}</h2>
        <button id="admin-close" onclick="closeAdmin()">✕</button>
      </div>

      <div id="admin-login">
        <div style="font-size: 3rem; margin-bottom: 15px;">🔒</div>
        <h3 style="margin-bottom: 10px; color: var(--primary-dark);">Acceso restringido</h3>
        <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 25px;">
          Ingresa la contraseña para editar el contenido de esta página.
        </p>
        <div class="field-group" style="max-width:300px; margin: 0 auto 15px;">
          <input type="password" id="admin-pass-input" placeholder="Contraseña..."
                 onkeydown="if(event.key==='Enter') checkPass()" />
        </div>
        <button class="admin-save-btn" style="max-width:300px; margin: 0 auto; display: block;" onclick="checkPass()">
          Entrar →
        </button>
      </div>

      <div id="admin-content" style="display:none">
        <div class="admin-body" id="admin-body-content">
          <!-- Se llenará dinámicamente al hacer login -->
        </div>
      </div>
    </div>
  </div>`;

  document.getElementById('admin-overlay').addEventListener('click', function(e) {
    if (e.target === this) closeAdmin();
  });
}

function getPageLabel() {
  if (currentPage === 'index.html') return 'Inicio';
  if (currentPage === 'servicios.html') return 'Servicios';
  if (currentPage === 'tips.html') return 'Tips';
  return currentPage;
}

function openAdminGate() {
  const overlay = document.getElementById('admin-overlay');
  if (!overlay) return;
  overlay.classList.add('open');
  if (adminUnlocked) {
    showAdminContent();
  } else {
    document.getElementById('admin-login').style.display = 'block';
    document.getElementById('admin-content').style.display = 'none';
    setTimeout(() => {
      const inp = document.getElementById('admin-pass-input');
      if (inp) inp.focus();
    }, 150);
  }
}

function closeAdmin() {
  const overlay = document.getElementById('admin-overlay');
  if (overlay) overlay.classList.remove('open');
}

function checkPass() {
  const val = document.getElementById('admin-pass-input').value;
  if (val === ADMIN_PASS) {
    adminUnlocked = true;
    showAdminContent();
    showToast('🔓 Acceso concedido');
  } else {
    showToast('❌ Contraseña incorrecta', true);
    document.getElementById('admin-pass-input').value = '';
    document.getElementById('admin-pass-input').focus();
  }
}

function showAdminContent() {
  document.getElementById('admin-login').style.display = 'none';
  document.getElementById('admin-content').style.display = 'block';

  const body = document.getElementById('admin-body-content');
  body.innerHTML = buildAdminForms();
  fillAdminForms();
}

// ── CONSTRUIR FORMULARIOS DEL ADMIN ───────────────────────
function buildAdminForms() {
  if (currentPage === 'index.html') {
    return `
      <h3 style="margin-bottom:20px; color:var(--primary-dark);">🏠 Sección Hero (Portada)</h3>
      <div class="field-group"><label>Etiqueta pequeña (badge rosa)</label><input type="text" id="f-hero-tag" /></div>
      <div class="field-group"><label>Título principal</label><input type="text" id="f-idx-title" /></div>
      <div class="color-row">
        <div class="field-group"><label>Color del Título</label><select id="c-idx-title">${COLOR_OPTIONS}</select></div>
        <div class="field-group"><label>Color del Subtítulo</label><select id="c-idx-sub">${COLOR_OPTIONS}</select></div>
      </div>
      <div class="field-group"><label>Subtítulo (deja en blanco para ocultar)</label><textarea id="f-idx-sub" rows="3"></textarea></div>
      <div class="field-group"><label>URL de imagen hero (jpg, png, webp — deja en blanco para ocultar)</label><input type="text" id="f-idx-img" placeholder="https://..." /></div>
      <div class="field-group"><label>Pie de foto (opcional)</label><input type="text" id="f-idx-cap" /></div>

      <hr>
      <h3 style="margin-bottom:20px; color:var(--primary-dark);">👨‍👩‍👧 Sección Nosotros</h3>
      <div class="field-group"><label>Título de la sección</label><input type="text" id="f-about-title" /></div>
      <div class="field-group"><label>Color del texto</label><select id="c-idx-about">${COLOR_OPTIONS}</select></div>
      <div class="field-group"><label>Párrafo 1</label><textarea id="f-idx-p1" rows="3"></textarea></div>
      <div class="field-group"><label>Párrafo 2</label><textarea id="f-idx-p2" rows="3"></textarea></div>

      <hr>
      <h3 style="margin-bottom:20px; color:var(--primary-dark);">📍 Sucursales</h3>
      <div id="sucursales-editor"></div>
      <button type="button" class="admin-add-btn" onclick="addSucursal()">+ Agregar Sucursal</button>

      <hr>
      <h3 style="margin-bottom:20px; color:var(--primary-dark);">📞 Contacto</h3>
      <div class="field-group"><label>Teléfono principal</label><input type="text" id="f-tel1" /></div>
      <div class="field-group"><label>WhatsApp (solo números con lada, ej: 8331189461)</label><input type="text" id="f-whatsapp" /></div>

      <button class="admin-save-btn" onclick="saveData()" id="save-btn">💾 Guardar y Publicar</button>
    `;
  }
  else {
    const key = currentPage === 'servicios.html' ? 'servicios' : 'tips';
    const label = currentPage === 'servicios.html' ? 'Servicio' : 'Tip';
    return `
      <h3 style="margin-bottom:20px; color:var(--primary-dark);">📄 Encabezado de la Página</h3>
      <div class="field-group"><label>Título de la página</label><input type="text" id="f-pg-title" /></div>
      <div class="color-row">
        <div class="field-group"><label>Color del Título</label><select id="c-pg-title">${COLOR_OPTIONS}</select></div>
        <div class="field-group"><label>Color del Subtítulo</label><select id="c-pg-sub">${COLOR_OPTIONS}</select></div>
      </div>
      <div class="field-group"><label>Subtítulo introductorio (deja en blanco para ocultar)</label><textarea id="f-pg-sub" rows="3"></textarea></div>
      <div class="field-group"><label>URL de imagen destacada (deja en blanco para ocultar)</label><input type="text" id="f-pg-img" placeholder="https://..." /></div>
      <div class="field-group"><label>Pie de foto</label><input type="text" id="f-pg-cap" /></div>

      <hr>
      <h3 style="margin-bottom:20px; color:var(--primary-dark);">🃏 Tarjetas de ${label}s</h3>
      <div id="list-editor"></div>
      <button type="button" class="admin-add-btn" onclick="addItem('${key}')">+ Agregar ${label}</button>

      <button class="admin-save-btn" onclick="saveData()" id="save-btn">💾 Guardar y Publicar</button>
    `;
  }
}

// ── LLENAR FORMULARIOS CON LOS DATOS ACTUALES ─────────────
function fillAdminForms() {
  if (currentPage === 'index.html') {
    const d = data.index;
    setVal('f-hero-tag',    d.heroTag);
    setVal('f-idx-title',   d.title);
    setVal('f-idx-sub',     d.sub);
    setVal('f-idx-img',     d.imgUrl);
    setVal('f-idx-cap',     d.imgCaption);
    setVal('f-about-title', d.aboutTitle);
    setVal('f-idx-p1',      d.aboutP1);
    setVal('f-idx-p2',      d.aboutP2);
    setVal('f-tel1',        data.contact.tel1);
    setVal('f-whatsapp',    data.contact.whatsapp);
    setSelectVal('c-idx-title', d.titleColor);
    setSelectVal('c-idx-sub',   d.subColor);
    setSelectVal('c-idx-about', d.aboutColor);
    renderSucursalesEditor();
  } else {
    const key = currentPage === 'servicios.html' ? 'servicios' : 'tips';
    const d = data[key];
    setVal('f-pg-title', d.title);
    setVal('f-pg-sub',   d.sub);
    setVal('f-pg-img',   d.imgUrl);
    setVal('f-pg-cap',   d.imgCaption);
    setSelectVal('c-pg-title', d.titleColor);
    setSelectVal('c-pg-sub',   d.subColor);
    renderListEditor(key);
  }
}

function setVal(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val || '';
}
function setSelectVal(id, val) {
  const el = document.getElementById(id);
  if (!el) return;
  // Intentar match exacto, si no, dejar primer opción
  for (let opt of el.options) { if (opt.value === val) { el.value = val; return; } }
}

// ── EDITORES DINÁMICOS ────────────────────────────────────
function renderSucursalesEditor() {
  const ed = document.getElementById('sucursales-editor');
  if (!ed) return;
  ed.innerHTML = data.index.sucursales.map((s, i) => `
    <div class="list-item-editor" id="suc-block-${i}">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
        <strong style="color:var(--primary-dark);">📍 Sucursal ${i + 1}</strong>
        <button type="button" class="admin-del-btn" onclick="removeSucursal(${i})">🗑 Eliminar</button>
      </div>
      <div class="field-group"><label>Nombre</label><input type="text" id="suc-n-${i}" value="${escHtml(s.name)}" /></div>
      <div class="field-group"><label>Dirección</label><input type="text" id="suc-a-${i}" value="${escHtml(s.addr)}" /></div>
      <div class="field-group"><label>Teléfono</label><input type="text" id="suc-p-${i}" value="${escHtml(s.phone)}" /></div>
    </div>
  `).join('');
}

function addSucursal() {
  data.index.sucursales.push({ name: "Nueva Sucursal", addr: "Dirección aquí", phone: "(000) 000-0000" });
  renderSucursalesEditor();
}
function removeSucursal(i) {
  data.index.sucursales.splice(i, 1);
  renderSucursalesEditor();
}

function renderListEditor(key) {
  const ed = document.getElementById('list-editor');
  if (!ed) return;
  const isServ = key === 'servicios';
  ed.innerHTML = data[key].items.map((item, i) => `
    <div class="list-item-editor">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
        <strong style="color:var(--primary-dark);">${isServ ? '🛍' : '💡'} Tarjeta ${i + 1}</strong>
        <button type="button" class="admin-del-btn" onclick="removeItem('${key}', ${i})">🗑 Eliminar</button>
      </div>
      <div class="field-group"><label>Emoji / Ícono</label><input type="text" id="list-i-${i}" value="${escHtml(item.icon)}" /></div>
      <div class="field-group"><label>Título</label><input type="text" id="list-t-${i}" value="${escHtml(item.title)}" /></div>
      <div class="field-group"><label>Descripción</label><textarea id="list-d-${i}" rows="2">${escHtml(item.desc)}</textarea></div>
    </div>
  `).join('');
}

function addItem(key) {
  const isServ = key === 'servicios';
  data[key].items.push({ icon: isServ ? '⭐' : '💡', title: 'Nuevo elemento', desc: 'Descripción aquí.' });
  renderListEditor(key);
  // Scroll al final del editor
  const ed = document.getElementById('list-editor');
  if (ed) ed.lastElementChild.scrollIntoView({ behavior: 'smooth' });
}
function removeItem(key, i) {
  data[key].items.splice(i, 1);
  renderListEditor(key);
}

function escHtml(s) {
  return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── GUARDAR CAMBIOS ────────────────────────────────────────
async function saveData() {
  if (isSaving) return;
  isSaving = true;

  const btn = document.getElementById('save-btn');
  if (btn) { btn.textContent = '⏳ Guardando...'; btn.disabled = true; }

  // Leer valores del formulario
  if (currentPage === 'index.html') {
    data.index.heroTag    = getVal('f-hero-tag');
    data.index.title      = getVal('f-idx-title');
    data.index.titleColor = getSelectVal('c-idx-title');
    data.index.sub        = getVal('f-idx-sub');
    data.index.subColor   = getSelectVal('c-idx-sub');
    data.index.imgUrl     = getVal('f-idx-img');
    data.index.imgCaption = getVal('f-idx-cap');
    data.index.aboutTitle = getVal('f-about-title');
    data.index.aboutColor = getSelectVal('c-idx-about');
    data.index.aboutP1    = getVal('f-idx-p1');
    data.index.aboutP2    = getVal('f-idx-p2');
    data.contact.tel1     = getVal('f-tel1');
    data.contact.whatsapp = getVal('f-whatsapp');

    // Sucursales
    data.index.sucursales.forEach((s, i) => {
      s.name  = getVal(`suc-n-${i}`);
      s.addr  = getVal(`suc-a-${i}`);
      s.phone = getVal(`suc-p-${i}`);
    });
  } else {
    const key = currentPage === 'servicios.html' ? 'servicios' : 'tips';
    data[key].title      = getVal('f-pg-title');
    data[key].titleColor = getSelectVal('c-pg-title');
    data[key].sub        = getVal('f-pg-sub');
    data[key].subColor   = getSelectVal('c-pg-sub');
    data[key].imgUrl     = getVal('f-pg-img');
    data[key].imgCaption = getVal('f-pg-cap');
    data[key].items.forEach((item, i) => {
      item.icon  = getVal(`list-i-${i}`);
      item.title = getVal(`list-t-${i}`);
      item.desc  = getVal(`list-d-${i}`);
    });
  }

  try {
    await persistData();
    renderUI();
    closeAdmin();
    showToast('✅ ¡Cambios guardados y publicados!');
  } catch(e) {
    // Si JSONBin falla pero localStorage funcionó
    renderUI();
    closeAdmin();
    showToast('⚠️ Guardado localmente (revisa la conexión a internet)', true);
  } finally {
    isSaving = false;
    if (btn) { btn.textContent = '💾 Guardar y Publicar'; btn.disabled = false; }
  }
}

function getVal(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}
function getSelectVal(id) {
  const el = document.getElementById(id);
  return el ? el.value : '';
}

// ── UTILIDADES ─────────────────────────────────────────────
let toastTimer;
function showToast(msg, isErr = false) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className = isErr ? 'show error' : 'show';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.className = '', 3500);
}

function toggleMenu() {
  const nl = document.getElementById('navLinks');
  if (nl) nl.classList.toggle('open');
}

// ── INIT ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  injectAdminPanel();
  loadData(); // carga async: primero muestra defaults, luego actualiza con cloud data
});
