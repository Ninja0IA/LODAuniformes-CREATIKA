// ═══════════════════════════════════════════════════════════
//  LODA Uniformes — script.js  v3
//  Persistencia compartida via JSONBin.io
// ═══════════════════════════════════════════════════════════

const BIN_ID  = '69df1696856a68218935fa5f';
const API_KEY = '$2a$10$haSUQabjyy/A3qN2.0WUCOrm60sgMwOYNyfzte7pY8qXf0QJ1/.RC';

const BIN_URL       = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
const HEADERS_READ  = { 'X-Master-Key': API_KEY };
const HEADERS_WRITE = { 'Content-Type': 'application/json', 'X-Master-Key': API_KEY };

let currentPage = window.location.pathname.split('/').pop().split('?')[0].split('#')[0];
if (!currentPage || currentPage === '') currentPage = 'index.html';

const COLOR_OPTIONS = `
  <option value="var(--primary-dark)">Azul Fuerte</option>
  <option value="var(--primary)">Azul Brillante</option>
  <option value="var(--accent)">Rosa Sandía</option>
  <option value="var(--text-main)">Gris Oscuro</option>
  <option value="var(--text-muted)">Gris Claro</option>
`;

const DEFAULTS = {
  index: {
    heroTag: "Uniformes cómodos y duraderos",
    title: "Propuesta de valor",
    titleColor: "var(--primary-dark)",
    sub: "En Loda Uniformes, transformamos la identidad de tu institución o empresa en prendas de alta resistencia. Combinamos más de 30 años de tradición manufacturera con tecnología de punta en bordado y sublimado, garantizando el equilibrio perfecto entre precio competitivo, durabilidad textil y un servicio personalizado que se adapta desde emprendedores independientes hasta grandes corporativos.",
    subColor: "var(--text-muted)",
    imgUrl: "",
    imgCaption: "",
    aboutTitle: "Sobre Nosotros",
    aboutP1: "En LODA nos especializamos en la venta de uniformes diseñados para brindar comodidad, durabilidad y una imagen profesional impecable. Creemos que un uniforme no es solo una prenda, sino una representación de identidad, compromiso y pertenencia.",
    aboutP2: "Desde nuestros inicios, trabajamos con el objetivo de ofrecer productos de alta calidad que se adapten a las necesidades de empresas, instituciones educativas y organizaciones de distintos sectores. Cada diseño está pensado para combinar funcionalidad, resistencia y estilo.",
    aboutColor: "var(--text-muted)",
    sucursales: [
      { name: "Matriz (Tampico)", addr: "Carretera Tampico-Mante #310, Col. México", phone: "(833) 224-7171" },
      { name: "Sucursal Calzada San Pedro", addr: "Calzada San Pedro #500, Col. Las Violetas", phone: "(833) 132-6815" },
      { name: "Sucursal Ciudad Madero", addr: "Av. Constitución #210, Col. Centro, Cd. Madero", phone: "(833) 215-4400" }
    ]
  },
  servicios: {
    title: "Nuestros Servicios",
    titleColor: "var(--primary-dark)",
    sub: "Desde la playera del kínder hasta el bordado de tu empresa. Calidad, resistencia y atención personalizada.",
    subColor: "var(--text-muted)",
    imgUrl: "",
    imgCaption: "",
    items: [
      { icon: "👕", title: "Bordado Profesional", desc: "Ofrecemos personalización de prendas laborales y escolares mediante técnicas de hilos y agujas que crean logotipos con relieve, alta durabilidad y un acabado profesional." },
      { icon: "⭐", title: "Sublimación de Alta Definición", desc: "Técnica de impresión digital que fija diseños en la tela mediante calor. Al integrarse directamente en las fibras, el diseño no se percibe al tacto, garantizando imágenes nítidas, colores vibrantes y excelente resistencia al uso. Se aplica principalmente en prendas de poliéster de tonos blancos o claros." },
      { icon: "📐", title: "Corte y Confección Especializada", desc: "Contamos con procesos de corte a gran escala y confección profesional bajo estrictos controles de calidad para asegurar la resistencia de cada prenda." },
      { icon: "🏭", title: "Línea Industrial", desc: "Diseñamos prendas de alta resistencia que transforman la identidad de tu empresa, adaptándonos desde emprendedores independientes hasta grandes corporativos." },
      { icon: "🎒", title: "Línea Escolar", desc: "Atendemos todos los niveles, desde jardín de niños hasta universidades (incluyendo CONALEP, CETis, CBTis y COBAT), tanto en el sector público como privado. Nuestras sucursales en la zona sur de Tamaulipas distribuyen uniformes para todas las comunidades estudiantiles." },
      { icon: "❄️", title: "Uniformes de Invierno 'Todo el Año'", desc: "Gracias a la alta calidad y versatilidad de nuestros materiales, estas prendas ofrecen comodidad y estilo en cualquier temporada, siendo una opción funcional durante todo el año." },
      { icon: "💼", title: "Embajadoras Loda — Apoyo a Mamás Emprendedoras", desc: "Este programa invita a las madres de familia a convertir su entorno escolar en una oportunidad de negocio. Al ser embajadoras, acceden a precios de mayoreo con descuentos de hasta el 30%, permitiéndoles emprender con una inversión baja y el respaldo de una marca consolidada." },
      { icon: "🤝", title: "Compromiso Social y Donaciones", desc: "En Loda Uniformes retribuimos a nuestra comunidad mediante programas de responsabilidad social. Realizamos donaciones de uniformes a escuelas y apoyamos a niños que lo necesitan para asegurar que cuenten con el equipo adecuado para sus estudios." },
      { icon: "🔧", title: "Suministros y Producción (Maquila)", desc: "Brindamos servicios de producción, insumos y maquila a otras empresas, aprovechando nuestra capacidad de fabricación propia y 30 años de tradición manufacturera." }
    ]
  },
  tips: {
    title: "Tips y Consejos Útiles",
    titleColor: "var(--primary-dark)",
    sub: "Sabemos que ser mamá es un trabajo de tiempo completo. Aquí te dejamos algunos trucos para cuidar la ropa de tus peques y aprovechar al máximo tus uniformes.",
    subColor: "var(--text-muted)",
    imgUrl: "",
    imgCaption: "",
    items: [
      { icon: "🔄", title: "Lavado del Revés", desc: "Voltea la prenda antes de lavarla para proteger la integridad del bordado y el diseño sublimado." },
      { icon: "🔥", title: "Cuidado con el Calor", desc: "Para mantener la nitidez de la sublimación, evita pasar la plancha directamente sobre el diseño; hazlo siempre por el reverso." },
      { icon: "🌿", title: "Secado a la Sombra", desc: "Evita la exposición prolongada al sol para prevenir que los colores de las telas industriales y escolares se degraden." },
      { icon: "💧", title: "Agua Fría", desc: "Utiliza ciclos de lavado con agua fría para conservar la forma de la prenda y evitar el desgaste prematuro de las fibras de poliéster." }
    ]
  },
  contact: {
    tel1: "(833) 224-7171",
    whatsapp: "(833) 118-9461"
  }
};

let data = JSON.parse(JSON.stringify(DEFAULTS));
const ADMIN_PASS = 'loda2025';
let adminUnlocked = false;
let isSaving = false;

// ═══════════════════════════════════════════════════════════
//  CARGA DE DATOS — ANTI-FLASH
//  body arranca con opacity:0 (CSS).
//  1) Se intenta localStorage al instante → sin parpadeo.
//  2) Se revela la página con lo que haya.
//  3) En paralelo se consulta JSONBin; si hay diferencia se actualiza.
// ═══════════════════════════════════════════════════════════
async function loadData() {
  try {
    const saved = localStorage.getItem('loda_data_v2');
    if (saved) {
      data = deepMerge(JSON.parse(JSON.stringify(DEFAULTS)), JSON.parse(saved));
    }
  } catch(e) {}

  renderUI();
  revealPage();

  // Sync con la nube en segundo plano
  try {
    const res = await fetch(BIN_URL + '/latest', { headers: HEADERS_READ });
    if (res.ok) {
      const json = await res.json();
      if (json && json.record) {
        const merged = deepMerge(JSON.parse(JSON.stringify(DEFAULTS)), json.record);
        if (JSON.stringify(merged) !== JSON.stringify(data)) {
          data = merged;
          localStorage.setItem('loda_data_v2', JSON.stringify(data));
          renderUI();
        }
      }
    }
  } catch(e) {}
}

function revealPage() {
  document.body.style.opacity = '1';
  document.body.style.transition = 'opacity 0.18s ease';
}

async function persistData() {
  localStorage.setItem('loda_data_v2', JSON.stringify(data));
  const res = await fetch(BIN_URL, {
    method: 'PUT',
    headers: HEADERS_WRITE,
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('JSONBin write failed');
}

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
    setEl('hero-tag-display', d.heroTag);
    setElStyle('hero-title-display', d.title, 'color', d.titleColor);
    setElStyleCond('hero-sub-display', d.sub, 'color', d.subColor);
    renderImage('hero-image-display', 'hero-caption-display', d.imgUrl, d.imgCaption);
    setElStyle('about-title-display', d.aboutTitle, 'color', d.titleColor);
    setElStyle('about-p1-display', d.aboutP1, 'color', d.aboutColor);
    setElStyle('about-p2-display', d.aboutP2, 'color', d.aboutColor);

    const sucEl = document.getElementById('sucursales-container');
    if (sucEl) {
      sucEl.innerHTML = d.sucursales.map(s => `
        <div class="sucursal-card">
          <h4>📍 ${s.name}</h4>
          <div class="addr">${s.addr}</div>
          <div class="phone">📞 ${s.phone}</div>
        </div>`).join('');
    }

    const ctEl = document.getElementById('contact-info-display');
    if (ctEl) {
      ctEl.innerHTML = `
        <a class="contact-item" href="tel:${data.contact.tel1}">📞 ${data.contact.tel1}</a>
        <a class="contact-item" href="https://wa.me/52${data.contact.whatsapp.replace(/\D/g,'')}" target="_blank">💬 WhatsApp: ${data.contact.whatsapp}</a>`;
    }
  }
  else if (currentPage === 'servicios.html' || currentPage === 'tips.html') {
    const key = currentPage === 'servicios.html' ? 'servicios' : 'tips';
    const d = data[key];
    setElStyle('page-title-display', d.title, 'color', d.titleColor);
    setElStyleCond('page-sub-display', d.sub, 'color', d.subColor);
    renderImage('page-image-display', 'page-caption-display', d.imgUrl, d.imgCaption);

    const isServ = currentPage === 'servicios.html';
    const container = document.getElementById(isServ ? 'services-container' : 'tips-container');
    if (container) {
      container.innerHTML = d.items.map(item => `
        <div class="${isServ ? 'service-card' : 'tip-card'}">
          <div class="${isServ ? 'svc-icon' : 'tip-icon'}">${item.icon}</div>
          <h3 class="${isServ ? 'svc-title' : 'tip-title'}">${item.title}</h3>
          <p class="${isServ ? 'svc-desc' : 'tip-desc'}">${item.desc}</p>
        </div>`).join('');
    }
  }
}

function setEl(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }
function setElStyle(id, val, prop, propVal) {
  const el = document.getElementById(id); if (!el) return;
  el.textContent = val; el.style[prop] = propVal;
}
function setElStyleCond(id, val, prop, propVal) {
  const el = document.getElementById(id); if (!el) return;
  if (!val || val.trim() === '') { el.style.display = 'none'; }
  else { el.style.display = ''; el.textContent = val; el.style[prop] = propVal; }
}
function renderImage(imgId, capId, url, caption) {
  const imgEl = document.getElementById(imgId), capEl = document.getElementById(capId);
  if (!imgEl || !capEl) return;
  if (!url || url.trim() === '') { imgEl.style.display = 'none'; capEl.style.display = 'none'; }
  else {
    imgEl.style.display = 'block'; imgEl.src = url;
    capEl.style.display = caption && caption.trim() ? 'block' : 'none';
    capEl.textContent = caption || '';
  }
}

// ═══════════════════════════════════════════════════════════
//  PANEL ADMIN
// ═══════════════════════════════════════════════════════════
function injectAdminPanel() {
  const container = document.getElementById('admin-container');
  if (!container) return;
  container.innerHTML = `
  <div id="admin-overlay">
    <div id="admin-panel">
      <div class="admin-header">
        <h2>⚙ Editor — ${getPageLabel()}</h2>
        <button id="admin-close" onclick="closeAdmin()">✕</button>
      </div>
      <div id="admin-login">
        <div style="font-size:3rem;margin-bottom:15px">🔒</div>
        <h3 style="margin-bottom:10px;color:var(--primary-dark)">Acceso restringido</h3>
        <p style="font-size:.9rem;color:var(--text-muted);margin-bottom:25px">Ingresa la contraseña para editar el contenido de esta página.</p>
        <div class="field-group" style="max-width:320px;margin:0 auto 15px">
          <input type="password" id="admin-pass-input" placeholder="Contraseña..." onkeydown="if(event.key==='Enter')checkPass()" />
        </div>
        <button class="admin-save-btn" style="max-width:320px;margin:0 auto;display:block" onclick="checkPass()">Entrar →</button>
      </div>
      <div id="admin-content" style="display:none">
        <div class="admin-body" id="admin-body-content"></div>
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
  if (adminUnlocked) { showAdminContent(); }
  else {
    document.getElementById('admin-login').style.display = 'block';
    document.getElementById('admin-content').style.display = 'none';
    setTimeout(() => { const inp = document.getElementById('admin-pass-input'); if (inp) inp.focus(); }, 150);
  }
}

function closeAdmin() {
  const overlay = document.getElementById('admin-overlay');
  if (overlay) overlay.classList.remove('open');
}

function checkPass() {
  const val = document.getElementById('admin-pass-input').value;
  if (val === ADMIN_PASS) { adminUnlocked = true; showAdminContent(); showToast('🔓 Acceso concedido'); }
  else {
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

function buildAdminForms() {
  if (currentPage === 'index.html') {
    return `
      <div class="admin-section">
        <div class="admin-section-title">🏠 Sección Hero (Portada)</div>
        <div class="field-group"><label>Etiqueta pequeña (badge rosa)</label><input type="text" id="f-hero-tag" /></div>
        <div class="field-group"><label>Título principal</label><input type="text" id="f-idx-title" /></div>
        <div class="color-row">
          <div class="field-group"><label>Color del Título</label><select id="c-idx-title">${COLOR_OPTIONS}</select></div>
          <div class="field-group"><label>Color del Subtítulo</label><select id="c-idx-sub">${COLOR_OPTIONS}</select></div>
        </div>
        <div class="field-group"><label>Subtítulo / Propuesta de valor</label><textarea id="f-idx-sub" rows="5"></textarea></div>
        <div class="field-group"><label>URL de imagen hero (deja en blanco para ocultar)</label><input type="text" id="f-idx-img" placeholder="https://..." /></div>
        <div class="field-group"><label>Pie de foto (opcional)</label><input type="text" id="f-idx-cap" /></div>
      </div>
      <div class="admin-section">
        <div class="admin-section-title">👨‍👩‍👧 Sección Nosotros</div>
        <div class="field-group"><label>Título de la sección</label><input type="text" id="f-about-title" /></div>
        <div class="field-group"><label>Color del texto</label><select id="c-idx-about">${COLOR_OPTIONS}</select></div>
        <div class="field-group"><label>Párrafo 1</label><textarea id="f-idx-p1" rows="4"></textarea></div>
        <div class="field-group"><label>Párrafo 2</label><textarea id="f-idx-p2" rows="4"></textarea></div>
      </div>
      <div class="admin-section">
        <div class="admin-section-title">📍 Sucursales</div>
        <p class="admin-hint">✅ Agregar o eliminar sucursales NO borra los cambios que ya escribiste.</p>
        <div id="sucursales-editor"></div>
        <button type="button" class="admin-add-btn" onclick="addSucursal()">+ Agregar Sucursal</button>
      </div>
      <div class="admin-section">
        <div class="admin-section-title">📞 Contacto</div>
        <div class="field-group"><label>Teléfono principal</label><input type="text" id="f-tel1" /></div>
        <div class="field-group"><label>WhatsApp (números con lada, ej: 8331189461)</label><input type="text" id="f-whatsapp" /></div>
      </div>
      <div class="admin-save-area">
        <button class="admin-save-btn" onclick="saveData()" id="save-btn">💾 Guardar y Publicar</button>
      </div>`;
  } else {
    const key = currentPage === 'servicios.html' ? 'servicios' : 'tips';
    const label = currentPage === 'servicios.html' ? 'Servicio' : 'Tip';
    return `
      <div class="admin-section">
        <div class="admin-section-title">📄 Encabezado de la Página</div>
        <div class="field-group"><label>Título de la página</label><input type="text" id="f-pg-title" /></div>
        <div class="color-row">
          <div class="field-group"><label>Color del Título</label><select id="c-pg-title">${COLOR_OPTIONS}</select></div>
          <div class="field-group"><label>Color del Subtítulo</label><select id="c-pg-sub">${COLOR_OPTIONS}</select></div>
        </div>
        <div class="field-group"><label>Subtítulo introductorio (deja en blanco para ocultar)</label><textarea id="f-pg-sub" rows="3"></textarea></div>
        <div class="field-group"><label>URL de imagen destacada (deja en blanco para ocultar)</label><input type="text" id="f-pg-img" placeholder="https://..." /></div>
        <div class="field-group"><label>Pie de foto</label><input type="text" id="f-pg-cap" /></div>
      </div>
      <div class="admin-section">
        <div class="admin-section-title">🃏 Tarjetas de ${label}s</div>
        <p class="admin-hint">✅ Agregar o eliminar tarjetas NO borra los cambios que ya escribiste.</p>
        <div id="list-editor"></div>
        <button type="button" class="admin-add-btn" onclick="addItem('${key}')">+ Agregar ${label}</button>
      </div>
      <div class="admin-save-area">
        <button class="admin-save-btn" onclick="saveData()" id="save-btn">💾 Guardar y Publicar</button>
      </div>`;
  }
}

function fillAdminForms() {
  if (currentPage === 'index.html') {
    const d = data.index;
    setVal('f-hero-tag', d.heroTag); setVal('f-idx-title', d.title);
    setVal('f-idx-sub', d.sub); setVal('f-idx-img', d.imgUrl);
    setVal('f-idx-cap', d.imgCaption); setVal('f-about-title', d.aboutTitle);
    setVal('f-idx-p1', d.aboutP1); setVal('f-idx-p2', d.aboutP2);
    setVal('f-tel1', data.contact.tel1); setVal('f-whatsapp', data.contact.whatsapp);
    setSelectVal('c-idx-title', d.titleColor); setSelectVal('c-idx-sub', d.subColor);
    setSelectVal('c-idx-about', d.aboutColor);
    renderSucursalesEditor();
  } else {
    const key = currentPage === 'servicios.html' ? 'servicios' : 'tips';
    const d = data[key];
    setVal('f-pg-title', d.title); setVal('f-pg-sub', d.sub);
    setVal('f-pg-img', d.imgUrl); setVal('f-pg-cap', d.imgCaption);
    setSelectVal('c-pg-title', d.titleColor); setSelectVal('c-pg-sub', d.subColor);
    renderListEditor(key);
  }
}

function setVal(id, val) { const el = document.getElementById(id); if (el) el.value = val || ''; }
function setSelectVal(id, val) {
  const el = document.getElementById(id); if (!el) return;
  for (let opt of el.options) { if (opt.value === val) { el.value = val; return; } }
}

// ── SYNC DOM → DATA (anti-pérdida de cambios) ────────────
function syncSucursalesFromDOM() {
  data.index.sucursales.forEach((s, i) => {
    const n = document.getElementById(`suc-n-${i}`);
    const a = document.getElementById(`suc-a-${i}`);
    const p = document.getElementById(`suc-p-${i}`);
    if (n) s.name = n.value; if (a) s.addr = a.value; if (p) s.phone = p.value;
  });
}

function syncItemsFromDOM(key) {
  data[key].items.forEach((item, i) => {
    const ic = document.getElementById(`list-i-${i}`);
    const t  = document.getElementById(`list-t-${i}`);
    const d  = document.getElementById(`list-d-${i}`);
    if (ic) item.icon = ic.value; if (t) item.title = t.value; if (d) item.desc = d.value;
  });
}

function renderSucursalesEditor() {
  const ed = document.getElementById('sucursales-editor'); if (!ed) return;
  ed.innerHTML = data.index.sucursales.map((s, i) => `
    <div class="list-item-editor">
      <div class="list-item-header"><strong>📍 Sucursal ${i+1}</strong>
        <button type="button" class="admin-del-btn" onclick="removeSucursal(${i})">🗑 Eliminar</button></div>
      <div class="field-group"><label>Nombre</label><input type="text" id="suc-n-${i}" value="${escHtml(s.name)}" /></div>
      <div class="field-group"><label>Dirección</label><input type="text" id="suc-a-${i}" value="${escHtml(s.addr)}" /></div>
      <div class="field-group"><label>Teléfono</label><input type="text" id="suc-p-${i}" value="${escHtml(s.phone)}" /></div>
    </div>`).join('');
}

function addSucursal() {
  syncSucursalesFromDOM();
  data.index.sucursales.push({ name: "Nueva Sucursal", addr: "Dirección aquí", phone: "(000) 000-0000" });
  renderSucursalesEditor();
  const ed = document.getElementById('sucursales-editor');
  if (ed && ed.lastElementChild) ed.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function removeSucursal(i) {
  syncSucursalesFromDOM();
  data.index.sucursales.splice(i, 1);
  renderSucursalesEditor();
}

function renderListEditor(key) {
  const ed = document.getElementById('list-editor'); if (!ed) return;
  const isServ = key === 'servicios';
  ed.innerHTML = data[key].items.map((item, i) => `
    <div class="list-item-editor">
      <div class="list-item-header"><strong>${isServ ? '🛍' : '💡'} Tarjeta ${i+1}</strong>
        <button type="button" class="admin-del-btn" onclick="removeItem('${key}',${i})">🗑 Eliminar</button></div>
      <div class="field-group"><label>Emoji / Ícono</label><input type="text" id="list-i-${i}" value="${escHtml(item.icon)}" /></div>
      <div class="field-group"><label>Título</label><input type="text" id="list-t-${i}" value="${escHtml(item.title)}" /></div>
      <div class="field-group"><label>Descripción</label><textarea id="list-d-${i}" rows="3">${escHtml(item.desc)}</textarea></div>
    </div>`).join('');
}

function addItem(key) {
  syncItemsFromDOM(key);
  const isServ = key === 'servicios';
  data[key].items.push({ icon: isServ ? '⭐' : '💡', title: 'Nuevo elemento', desc: 'Descripción aquí.' });
  renderListEditor(key);
  const ed = document.getElementById('list-editor');
  if (ed && ed.lastElementChild) ed.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function removeItem(key, i) {
  syncItemsFromDOM(key);
  data[key].items.splice(i, 1);
  renderListEditor(key);
}

function escHtml(s) {
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── GUARDAR ───────────────────────────────────────────────
async function saveData() {
  if (isSaving) return;
  isSaving = true;
  const btn = document.getElementById('save-btn');
  if (btn) { btn.textContent = '⏳ Guardando...'; btn.disabled = true; }

  if (currentPage === 'index.html') {
    syncSucursalesFromDOM();
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
  } else {
    const key = currentPage === 'servicios.html' ? 'servicios' : 'tips';
    syncItemsFromDOM(key);
    data[key].title      = getVal('f-pg-title');
    data[key].titleColor = getSelectVal('c-pg-title');
    data[key].sub        = getVal('f-pg-sub');
    data[key].subColor   = getSelectVal('c-pg-sub');
    data[key].imgUrl     = getVal('f-pg-img');
    data[key].imgCaption = getVal('f-pg-cap');
  }

  try {
    await persistData();
    renderUI(); closeAdmin();
    showToast('✅ ¡Cambios guardados y publicados!');
  } catch(e) {
    renderUI(); closeAdmin();
    showToast('⚠️ Guardado localmente (sin conexión a la nube)', true);
  } finally {
    isSaving = false;
    if (btn) { btn.textContent = '💾 Guardar y Publicar'; btn.disabled = false; }
  }
}

function getVal(id) { const el = document.getElementById(id); return el ? el.value.trim() : ''; }
function getSelectVal(id) { const el = document.getElementById(id); return el ? el.value : ''; }

let toastTimer;
function showToast(msg, isErr=false) {
  const t = document.getElementById('toast'); if (!t) return;
  t.textContent = msg; t.className = isErr ? 'show error' : 'show';
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.className='', 3500);
}

function toggleMenu() {
  const nl = document.getElementById('navLinks'); if (nl) nl.classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', () => {
  injectAdminPanel();
  loadData();
});
