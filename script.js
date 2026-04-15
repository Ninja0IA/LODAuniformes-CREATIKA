// Obtener el nombre del archivo actual (index.html, servicios.html, etc.)
let currentPage = window.location.pathname.split('/').pop().split('?')[0].split('#')[0];
if (!currentPage || currentPage === '') currentPage = 'index.html';

// Paleta de colores para que el equipo seleccione
const COLOR_OPTIONS = `
  <option value="var(--primary-dark)">Azul Fuerte</option>
  <option value="var(--primary)">Azul Brillante</option>
  <option value="var(--accent)">Rosa Sandía</option>
  <option value="var(--text-main)">Gris Oscuro</option>
  <option value="var(--text-muted)">Gris Claro</option>
`;

const DEFAULTS = {
  index: {
    title: "Listos para su Aventura Escolar",
    titleColor: "var(--primary-dark)",
    sub: "Sabemos que buscas calidad y resistencia para el día a día de tus hijos. En LODA Uniformes te ofrecemos prendas hechas para durar todo el ciclo escolar, con más de 3 sucursales cerca de ti.",
    subColor: "var(--text-muted)",
    imgUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop", // Imagen de ejemplo
    imgCaption: "Todo listo para el regreso a clases.",
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
      { icon: "👖", title: "Pants y Ropa Deportiva", desc: "Para esos días de deportes. Materiales flexibles que soportan las caídas y los juegos rudos." }
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
      { icon: "📏", title: "Comprando inteligentemente", desc: "Te sugerimos pedir los pants o faldas con un dobladillo ligeramente más largo." }
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

/* INYECTAR PANEL ADMIN ESPECÍFICO POR PÁGINA */
function injectAdminPanel() {
  const container = document.getElementById('admin-container');
  if(!container) return;
  
  let adminForms = '';

  // Formulario para index.html
  if (currentPage === 'index.html') {
    adminForms = `
      <div class="field-group"><label>Título Principal</label><input type="text" id="f-idx-title" /></div>
      <div class="color-row">
        <div class="field-group"><label>Color del Título</label><select id="c-idx-title">${COLOR_OPTIONS}</select></div>
        <div class="field-group"><label>Color del Subtítulo</label><select id="c-idx-sub">${COLOR_OPTIONS}</select></div>
      </div>
      <div class="field-group"><label>Subtítulo (Déjalo en blanco para ocultar)</label><textarea id="f-idx-sub" rows="3"></textarea></div>
      
      <div class="field-group"><label>Enlace de la Imagen (URL jpg, png. Déjalo en blanco para ocultar)</label><input type="text" id="f-idx-img" placeholder="Ej: https://midominio.com/foto.jpg" /></div>
      <div class="field-group"><label>Pie de foto (Opcional)</label><input type="text" id="f-idx-cap" /></div>
      
      <hr>
      <h3>Sección Nosotros</h3>
      <div class="field-group"><label>Color del texto</label><select id="c-idx-about">${COLOR_OPTIONS}</select></div>
      <div class="field-group"><label>Párrafo 1</label><textarea id="f-idx-p1" rows="3"></textarea></div>
      <div class="field-group"><label>Párrafo 2</label><textarea id="f-idx-p2" rows="3"></textarea></div>
    `;
  } 
  // Formulario para servicios.html o tips.html
  else if (currentPage === 'servicios.html' || currentPage === 'tips.html') {
    let key = currentPage === 'servicios.html' ? 'servicios' : 'tips';
    let labelItems = currentPage === 'servicios.html' ? 'Servicios' : 'Tips';
    
    adminForms = `
      <div class="field-group"><label>Título de la página</label><input type="text" id="f-pg-title" /></div>
      <div class="color-row">
        <div class="field-group"><label>Color del Título</label><select id="c-pg-title">${COLOR_OPTIONS}</select></div>
        <div class="field-group"><label>Color del Subtítulo</label><select id="c-pg-sub">${COLOR_OPTIONS}</select></div>
      </div>
      <div class="field-group"><label>Subtítulo / Texto introductorio (Déjalo en blanco para ocultar)</label><textarea id="f-pg-sub" rows="3"></textarea></div>
      
      <div class="field-group"><label>Enlace de la Imagen Destacada (URL. Déjalo en blanco para ocultar)</label><input type="text" id="f-pg-img" /></div>
      <div class="field-group"><label>Pie de foto (Opcional)</label><input type="text" id="f-pg-cap" /></div>
      
      <hr>
      <h3>Lista de ${labelItems}</h3>
      <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:15px;">Edita la información de las tarjetas que aparecen abajo.</p>
      <div id="list-editor"></div>
    `;
  }

  container.innerHTML = `
  <div id="admin-overlay">
    <div id="admin-panel">
      <div class="admin-header">
        <h2>⚙ Editor de Página</h2>
        <button id="admin-close" onclick="closeAdmin()">✕</button>
      </div>
      
      <div id="admin-login">
        <h3>🔒 Acceso restringido</h3>
        <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom:20px;">Ingresa la contraseña para editar esta sección.</p>
        <div class="field-group" style="max-width:300px; margin: 0 auto;">
          <input type="password" id="admin-pass-input" placeholder="Contraseña..." onkeydown="if(event.key==='Enter')checkPass()" />
          <button class="admin-save-btn" onclick="checkPass()">Entrar</button>
        </div>
      </div>
      
      <div id="admin-content" style="display:none">
        <div class="admin-body">
          ${adminForms}
          <button class="admin-save-btn" onclick="saveData()">💾 Guardar Cambios</button>
        </div>
      </div>
    </div>
  </div>`;
  
  document.getElementById('admin-overlay').addEventListener('click', function(e) {
    if (e.target === this) closeAdmin();
  });
}

function loadData() {
  try {
    const saved = localStorage.getItem('loda_dynamic_data');
    if (saved) data = Object.assign({}, JSON.parse(JSON.stringify(DEFAULTS)), JSON.parse(saved));
  } catch(e) {}
}
function persistData() { localStorage.setItem('loda_dynamic_data', JSON.stringify(data)); }

/* ACTUALIZAR LA INTERFAZ CON LOS DATOS */
function renderUI() {
  if (currentPage === 'index.html') {
    const d = data.index;
    const titleEl = document.getElementById('hero-title-display');
    const subEl = document.getElementById('hero-sub-display');
    
    if(titleEl) { titleEl.textContent = d.title; titleEl.style.color = d.titleColor; }
    
    if(subEl) { 
      if(d.sub.trim() === '') { subEl.style.display = 'none'; }
      else { subEl.style.display = 'block'; subEl.textContent = d.sub; subEl.style.color = d.subColor; }
    }

    // Imagen Hero
    const imgEl = document.getElementById('hero-image-display');
    const capEl = document.getElementById('hero-caption-display');
    if (imgEl && capEl) {
      if(d.imgUrl.trim() === '') {
        imgEl.style.display = 'none';
        capEl.style.display = 'none';
      } else {
        imgEl.style.display = 'block';
        imgEl.src = d.imgUrl;
        if(d.imgCaption.trim() === '') { capEl.style.display = 'none'; }
        else { capEl.style.display = 'block'; capEl.textContent = d.imgCaption; }
      }
    }

    // Nosotros
    const p1El = document.getElementById('about-p1-display');
    const p2El = document.getElementById('about-p2-display');
    if(p1El) { p1El.textContent = d.aboutP1; p1El.style.color = d.aboutColor; }
    if(p2El) { p2El.textContent = d.aboutP2; p2El.style.color = d.aboutColor; }

    // Sucursales
    if(document.getElementById('sucursales-container')) {
      document.getElementById('sucursales-container').innerHTML = d.sucursales.map(s => `
        <div class="sucursal-card">
          <h4>📍 ${s.name}</h4><div class="addr">${s.addr}</div><div class="phone">📞 ${s.phone}</div>
        </div>
      `).join('');
    }

    // Contacto info (compartido pero se renderiza aquí)
    if(document.getElementById('contact-info-display')) {
      document.getElementById('contact-info-display').innerHTML = `
        <div class="contact-item">📞 Llámanos: ${data.contact.tel1}</div>
        <div class="contact-item">💬 WhatsApp: ${data.contact.whatsapp}</div>
      `;
    }

  } 
  else if (currentPage === 'servicios.html' || currentPage === 'tips.html') {
    let key = currentPage === 'servicios.html' ? 'servicios' : 'tips';
    const d = data[key];
    
    const titleEl = document.getElementById('page-title-display');
    const subEl = document.getElementById('page-sub-display');
    
    if(titleEl) { titleEl.textContent = d.title; titleEl.style.color = d.titleColor; }
    
    if(subEl) { 
      if(d.sub.trim() === '') { subEl.style.display = 'none'; }
      else { subEl.style.display = 'block'; subEl.textContent = d.sub; subEl.style.color = d.subColor; }
    }

    // Imagen General
    const imgEl = document.getElementById('page-image-display');
    const capEl = document.getElementById('page-caption-display');
    if (imgEl && capEl) {
      if(d.imgUrl.trim() === '') {
        imgEl.style.display = 'none';
        capEl.style.display = 'none';
      } else {
        imgEl.style.display = 'block';
        imgEl.src = d.imgUrl;
        if(d.imgCaption.trim() === '') { capEl.style.display = 'none'; }
        else { capEl.style.display = 'block'; capEl.textContent = d.imgCaption; }
      }
    }

    // Tarjetas
    const containerId = currentPage === 'servicios.html' ? 'services-container' : 'tips-container';
    const container = document.getElementById(containerId);
    if(container) {
      container.innerHTML = d.items.map(item => `
        <div class="${currentPage === 'servicios.html' ? 'service-card' : 'tip-card'}">
          <div class="${currentPage === 'servicios.html' ? 'svc-icon' : 'tip-icon'}">${item.icon}</div>
          <h3 class="${currentPage === 'servicios.html' ? 'svc-title' : 'tip-title'}">${item.title}</h3>
          <p class="${currentPage === 'servicios.html' ? 'svc-desc' : 'tip-desc'}">${item.desc}</p>
        </div>
      `).join('');
    }
  }
}

/* FUNCIONES DE ADMINISTRADOR */
function openAdminGate() {
  document.getElementById('admin-overlay').classList.add('open');
  if (adminUnlocked) showAdminContent();
  else setTimeout(() => document.getElementById('admin-pass-input').focus(), 100);
}

function closeAdmin() { document.getElementById('admin-overlay').classList.remove('open'); }

function checkPass() {
  const val = document.getElementById('admin-pass-input').value;
  if (val === ADMIN_PASS) {
    adminUnlocked = true;
    showAdminContent();
    showToast('🔓 Acceso concedido');
  } else {
    showToast('❌ Contraseña incorrecta', true);
  }
}

function showAdminContent() {
  document.getElementById('admin-login').style.display = 'none';
  document.getElementById('admin-content').style.display = 'block';
  
  if (currentPage === 'index.html') {
    const d = data.index;
    document.getElementById('f-idx-title').value = d.title;
    document.getElementById('c-idx-title').value = d.titleColor;
    document.getElementById('f-idx-sub').value = d.sub;
    document.getElementById('c-idx-sub').value = d.subColor;
    document.getElementById('f-idx-img').value = d.imgUrl;
    document.getElementById('f-idx-cap').value = d.imgCaption;
    
    document.getElementById('c-idx-about').value = d.aboutColor;
    document.getElementById('f-idx-p1').value = d.aboutP1;
    document.getElementById('f-idx-p2').value = d.aboutP2;
  } 
  else if (currentPage === 'servicios.html' || currentPage === 'tips.html') {
    let key = currentPage === 'servicios.html' ? 'servicios' : 'tips';
    const d = data[key];
    
    document.getElementById('f-pg-title').value = d.title;
    document.getElementById('c-pg-title').value = d.titleColor;
    document.getElementById('f-pg-sub').value = d.sub;
    document.getElementById('c-pg-sub').value = d.subColor;
    document.getElementById('f-pg-img').value = d.imgUrl;
    document.getElementById('f-pg-cap').value = d.imgCaption;

    document.getElementById('list-editor').innerHTML = d.items.map((item, i) => `
      <div style="background:#f8fafc; padding:15px; border-radius:10px; margin-bottom:15px; border: 1px solid var(--border);">
        <div class="field-group"><label>Emoji / Ícono</label><input type="text" id="list-i-${i}" value="${item.icon}"></div>
        <div class="field-group"><label>Título</label><input type="text" id="list-t-${i}" value="${item.title}"></div>
        <div class="field-group"><label>Descripción</label><textarea id="list-d-${i}" rows="2">${item.desc}</textarea></div>
      </div>
    `).join('');
  }
}

function saveData() {
  if (currentPage === 'index.html') {
    data.index.title = document.getElementById('f-idx-title').value;
    data.index.titleColor = document.getElementById('c-idx-title').value;
    data.index.sub = document.getElementById('f-idx-sub').value;
    data.index.subColor = document.getElementById('c-idx-sub').value;
    data.index.imgUrl = document.getElementById('f-idx-img').value;
    data.index.imgCaption = document.getElementById('f-idx-cap').value;
    
    data.index.aboutColor = document.getElementById('c-idx-about').value;
    data.index.aboutP1 = document.getElementById('f-idx-p1').value;
    data.index.aboutP2 = document.getElementById('f-idx-p2').value;
  } 
  else if (currentPage === 'servicios.html' || currentPage === 'tips.html') {
    let key = currentPage === 'servicios.html' ? 'servicios' : 'tips';
    data[key].title = document.getElementById('f-pg-title').value;
    data[key].titleColor = document.getElementById('c-pg-title').value;
    data[key].sub = document.getElementById('f-pg-sub').value;
    data[key].subColor = document.getElementById('c-pg-sub').value;
    data[key].imgUrl = document.getElementById('f-pg-img').value;
    data[key].imgCaption = document.getElementById('f-pg-cap').value;

    data[key].items.forEach((item, i) => {
      item.icon = document.getElementById(`list-i-${i}`).value;
      item.title = document.getElementById(`list-t-${i}`).value;
      item.desc = document.getElementById(`list-d-${i}`).value;
    });
  }

  persistData();
  renderUI();
  closeAdmin();
  showToast('✅ Cambios guardados correctamente');
}

/* UTILIDADES */
let toastTimer;
function showToast(msg, isErr=false) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.className = isErr ? 'show error' : 'show';
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.className='', 3000);
}

function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

/* INIT */
injectAdminPanel();
loadData();
renderUI();