// ── Zooni — Configurações do Veterinário (JS) ──────────────────────
const SUPABASE_URL = 'https://xqtbtggmwejnkhckduti.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxdGJ0Z2dtd2VqbmtoY2tkdXRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2OTU5NjEsImV4cCI6MjA4MzI3MTk2MX0.G1wG0UC6sF7r6tMxGdqLGvsHa_dxlVD1-j6QNEw32IM';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let VET_USER_ID = null;
let currentTags = [];

const DAYS = ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'];

// ── AUTH ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => initAuth());

async function initAuth() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session) { window.location.href = 'login.html?role=veterinario'; return; }
    VET_USER_ID = session.user.id;
    document.getElementById('inputEmail').value = session.user.email;

    // Load vet data
    const { data: vet } = await supabaseClient.from('veterinarios').select('*').eq('user_id', VET_USER_ID).single();
    if (vet) {
        document.getElementById('inputNome').value = vet.nome || '';
        document.getElementById('inputOMV').value = vet.numero_omv || '';
        document.getElementById('inputBio').value = vet.biografia || '';
        document.getElementById('inputMargem').value = vet.margem_minutos ?? 10;
        currentTags = vet.especialidades || [];
        renderTags();
        if (vet.foto_url) document.getElementById('avatarPreview').src = vet.foto_url;
        else {
            const name = encodeURIComponent(vet.nome || 'Vet');
            document.getElementById('avatarPreview').src = `https://ui-avatars.com/api/?name=${name}&background=1E4D1E&color=fff`;
        }
    }
    buildWeekSchedule();
    await loadHorarios();
    await loadServicos();
    await loadNotifPrefs();
}

// ── SECTION SWITCHER ─────────────────────────────────────────
function switchSection(id, btn) {
    document.querySelectorAll('.settings-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.settings-nav-item').forEach(b => b.classList.remove('active'));
    document.getElementById('panel-' + id).classList.add('active');
    if (btn) btn.classList.add('active');
}

// ── TOAST ────────────────────────────────────────────────────
function showToast(msg, type = 'success') {
    const c = document.getElementById('toastContainer');
    const t = document.createElement('div');
    t.className = `toast-custom ${type === 'error' ? 'error' : ''}`;
    t.innerHTML = `<span class="toast-icon ${type}"><i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-xmark'}"></i></span><span class="toast-text">${msg}</span>`;
    c.appendChild(t);
    setTimeout(() => { t.style.animation = 'slideOutRight .3s ease forwards'; setTimeout(() => t.remove(), 300); }, 3000);
}

// ── TAGS ─────────────────────────────────────────────────────
function renderTags() {
    const c = document.getElementById('tagsContainer');
    c.innerHTML = '';
    currentTags.forEach((tag, i) => {
        const d = document.createElement('span');
        d.className = 'tag-pill';
        d.innerHTML = `${tag} <i class="fa-solid fa-xmark remove-tag" onclick="removeTag(${i})"></i>`;
        c.appendChild(d);
    });
}
function addTag() {
    const input = document.getElementById('tagInput');
    const v = input.value.trim();
    if (v && !currentTags.includes(v)) { currentTags.push(v); renderTags(); }
    input.value = '';
}
function removeTag(i) { currentTags.splice(i, 1); renderTags(); }

// ── SAVE PERFIL ──────────────────────────────────────────────
async function savePerfil() {
    const nome = document.getElementById('inputNome').value.trim();
    const omv = document.getElementById('inputOMV').value.trim();
    const bio = document.getElementById('inputBio').value.trim();
    if (!nome) { showToast('Introduza o nome clínico.', 'error'); return; }

    const { error } = await supabaseClient.from('veterinarios').update({
        nome, numero_omv: omv, biografia: bio, especialidades: currentTags
    }).eq('user_id', VET_USER_ID);

    if (error) showToast('Erro: ' + error.message, 'error');
    else showToast('Perfil guardado com sucesso!');
}

// ── AVATAR ───────────────────────────────────────────────────
async function previewAvatar(event) {
    const file = event.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { showToast('Máximo 5MB.', 'error'); return; }
    const reader = new FileReader();
    reader.onload = async (e) => {
        const img = new Image();
        img.onload = async () => {
            const canvas = document.createElement('canvas');
            const MAX = 300;
            let w = img.width, h = img.height;
            if (w > h) { if (w > MAX) { h = Math.round(h * MAX / w); w = MAX; } }
            else { if (h > MAX) { w = Math.round(w * MAX / h); h = MAX; } }
            canvas.width = w; canvas.height = h;
            canvas.getContext('2d').drawImage(img, 0, 0, w, h);
            const base64 = canvas.toDataURL('image/jpeg', 0.82);
            document.getElementById('avatarPreview').src = base64;
            const { error } = await supabaseClient.from('veterinarios').update({ foto_url: base64 }).eq('user_id', VET_USER_ID);
            if (!error) showToast('Foto atualizada!');
            else showToast('Erro ao guardar foto.', 'error');
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// ── WEEK SCHEDULE ────────────────────────────────────────────
function buildWeekSchedule() {
    const container = document.getElementById('weekSchedule');
    container.innerHTML = '';
    // Skip Sunday (0), start from Monday (1) to Saturday (6), then Sunday
    const order = [1, 2, 3, 4, 5, 6, 0];
    order.forEach(d => {
        const div = document.createElement('div');
        div.className = 'day-schedule';
        div.id = `day-${d}`;
        div.innerHTML = `
            <div class="day-header">
                <span class="day-name">${DAYS[d]}</span>
                <button class="day-toggle" onclick="addBlock(${d})"><i class="fa-solid fa-plus me-1"></i>Bloco</button>
            </div>
            <div class="blocks-container" id="blocks-${d}">
                <p class="text-muted small mb-0"><i class="fa-solid fa-moon me-1"></i>Sem horários definidos (dia livre)</p>
            </div>`;
        container.appendChild(div);
    });
}

function addBlock(day, start = '09:00', end = '13:00') {
    const c = document.getElementById(`blocks-${day}`);
    // Remove "day off" message
    const msg = c.querySelector('p.text-muted');
    if (msg) msg.remove();
    const row = document.createElement('div');
    row.className = 'block-row';
    row.innerHTML = `
        <input type="time" value="${start}" class="block-start">
        <span class="text-muted fw-bold">→</span>
        <input type="time" value="${end}" class="block-end">
        <button class="remove-block" onclick="removeBlock(this,${day})"><i class="fa-solid fa-trash"></i></button>`;
    c.appendChild(row);
}

function removeBlock(btn, day) {
    btn.parentElement.remove();
    const c = document.getElementById(`blocks-${day}`);
    if (c.children.length === 0) {
        c.innerHTML = '<p class="text-muted small mb-0"><i class="fa-solid fa-moon me-1"></i>Sem horários definidos (dia livre)</p>';
    }
}

async function loadHorarios() {
    const { data } = await supabaseClient.from('zooni_horarios_padrao').select('*').eq('id_vet', VET_USER_ID).order('dia_semana').order('hora_inicio');
    if (data && data.length > 0) {
        data.forEach(h => addBlock(h.dia_semana, h.hora_inicio.substring(0, 5), h.hora_fim.substring(0, 5)));
    }
}

async function saveHorarios() {
    // Collect all blocks from the UI
    const blocks = [];
    const margem = parseInt(document.getElementById('inputMargem').value) || 10;
    [1, 2, 3, 4, 5, 6, 0].forEach(d => {
        const rows = document.querySelectorAll(`#blocks-${d} .block-row`);
        rows.forEach(row => {
            const start = row.querySelector('.block-start').value;
            const end = row.querySelector('.block-end').value;
            if (start && end) blocks.push({ id_vet: VET_USER_ID, dia_semana: d, hora_inicio: start, hora_fim: end });
        });
    });

    // Delete old, insert new
    const { error: delErr } = await supabaseClient.from('zooni_horarios_padrao').delete().eq('id_vet', VET_USER_ID);
    if (delErr) { showToast('Erro ao limpar horários: ' + delErr.message, 'error'); return; }

    if (blocks.length > 0) {
        const { error: insErr } = await supabaseClient.from('zooni_horarios_padrao').insert(blocks);
        if (insErr) { showToast('Erro ao guardar horários: ' + insErr.message, 'error'); return; }
    }

    // Save margin
    await supabaseClient.from('veterinarios').update({ margem_minutos: margem }).eq('user_id', VET_USER_ID);
    showToast('Horários guardados com sucesso!');
}

// ── SERVICES ─────────────────────────────────────────────────
async function loadServicos() {
    const { data } = await supabaseClient.from('zooni_servicos').select('*').eq('id_vet', VET_USER_ID).order('criado_em');
    const tbody = document.getElementById('servicosTableBody');
    tbody.innerHTML = '';
    if (data && data.length > 0) {
        data.forEach(s => addServiceRowData(s.id, s.nome_servico, s.duracao_minutos, s.preco));
    }
}

function addServiceRow() {
    addServiceRowData(null, '', 30, 0);
}

function addServiceRowData(id, nome, duracao, preco) {
    const tbody = document.getElementById('servicosTableBody');
    const tr = document.createElement('tr');
    tr.dataset.serviceId = id || '';
    tr.innerHTML = `
        <td><input type="text" class="form-control form-control-sm srv-nome" value="${nome}" placeholder="Ex: Vacinação Raiva"></td>
        <td><div class="d-flex align-items-center gap-2"><input type="number" class="form-control form-control-sm srv-duracao" value="${duracao}" min="5" max="480" style="width:80px"><span class="text-muted small">min</span></div></td>
        <td><div class="d-flex align-items-center gap-2"><input type="number" class="form-control form-control-sm srv-preco" value="${Number(preco).toFixed(2)}" min="0" step="0.01" style="width:100px"><span class="text-muted small">€</span></div></td>
        <td><button class="btn btn-sm text-danger border-0" onclick="this.closest('tr').remove()"><i class="fa-solid fa-trash"></i></button></td>`;
    tbody.appendChild(tr);
}

async function saveServicos() {
    const rows = document.querySelectorAll('#servicosTableBody tr');
    const services = [];
    let valid = true;
    rows.forEach(tr => {
        const nome = tr.querySelector('.srv-nome').value.trim();
        const duracao = parseInt(tr.querySelector('.srv-duracao').value) || 30;
        const preco = parseFloat(tr.querySelector('.srv-preco').value) || 0;
        if (!nome) { valid = false; return; }
        services.push({ id_vet: VET_USER_ID, nome_servico: nome, duracao_minutos: duracao, preco: preco });
    });

    if (!valid) { showToast('Preencha o nome de todos os serviços.', 'error'); return; }

    // Delete old, insert new
    const { error: delErr } = await supabaseClient.from('zooni_servicos').delete().eq('id_vet', VET_USER_ID);
    if (delErr) { showToast('Erro: ' + delErr.message, 'error'); return; }

    if (services.length > 0) {
        const { error: insErr } = await supabaseClient.from('zooni_servicos').insert(services);
        if (insErr) { showToast('Erro: ' + insErr.message, 'error'); return; }
    }
    showToast('Serviços guardados com sucesso!');
    await loadServicos(); // Reload to get IDs
}

// ── PASSWORD ─────────────────────────────────────────────────
async function changePassword() {
    const nova = document.getElementById('inputPasswordNova').value;
    const conf = document.getElementById('inputPasswordConfirm').value;
    if (!nova) { showToast('Introduza a nova password.', 'error'); return; }
    if (nova !== conf) { showToast('As passwords não coincidem.', 'error'); return; }
    if (nova.length < 6) { showToast('Mínimo 6 caracteres.', 'error'); return; }

    const { error } = await supabaseClient.auth.updateUser({ password: nova });
    if (error) showToast('Erro: ' + error.message, 'error');
    else {
        document.getElementById('inputPasswordNova').value = '';
        document.getElementById('inputPasswordConfirm').value = '';
        document.getElementById('pwBar').style.width = '0%';
        document.getElementById('pwText').textContent = '';
        showToast('Password alterada com sucesso!');
    }
}

function checkPwStrength(pw) {
    const bar = document.getElementById('pwBar');
    const text = document.getElementById('pwText');
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    const lvls = [
        { w: '0%', c: '', l: '' },
        { w: '25%', c: '#ef4444', l: 'Fraca' },
        { w: '50%', c: '#f97316', l: 'Razoável' },
        { w: '75%', c: '#eab308', l: 'Boa' },
        { w: '100%', c: '#22c55e', l: 'Forte' }
    ];
    const l = pw.length === 0 ? 0 : s;
    bar.style.width = lvls[l].w;
    bar.style.backgroundColor = lvls[l].c;
    text.textContent = lvls[l].l;
    text.style.color = lvls[l].c;
}

// ── NOTIFICATION PREFS ───────────────────────────────────────
async function loadNotifPrefs() {
    const { data } = await supabaseClient.from('preferencias_vet').select('*').eq('user_id', VET_USER_ID).single();
    if (data && data.notificacoes) {
        Object.keys(data.notificacoes).forEach(key => {
            const el = document.getElementById('notif_' + key);
            if (el) el.checked = data.notificacoes[key];
        });
    }
}

async function saveNotifPref(key, value) {
    const { data: existing } = await supabaseClient.from('preferencias_vet').select('notificacoes').eq('user_id', VET_USER_ID).single();
    const notifs = existing?.notificacoes || {};
    notifs[key] = value;
    const { error } = await supabaseClient.from('preferencias_vet').upsert({ user_id: VET_USER_ID, notificacoes: notifs }, { onConflict: 'user_id' });
    if (!error) showToast('Preferência atualizada!');
    else showToast('Erro ao guardar.', 'error');
}

// ── LOGOUT ───────────────────────────────────────────────────
document.getElementById('btnLogout').addEventListener('click', async (e) => {
    e.preventDefault();
    await supabaseClient.auth.signOut();
    window.location.href = 'index.html';
});
