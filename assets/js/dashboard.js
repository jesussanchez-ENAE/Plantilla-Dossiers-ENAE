function toast(msg, isErr) {
  var el = document.getElementById('toast');
  el.textContent = msg;
  el.className = 'toast on' + (isErr ? ' err' : '');
  clearTimeout(toast._t);
  toast._t = setTimeout(function() { el.classList.remove('on'); }, 3500);
}

async function loadDossiers() {
  var grid = document.getElementById('grid');
  try {
    var res  = await fetch('/api/dossiers');
    var data = await res.json();

    document.getElementById('count').textContent =
      data.length + (data.length === 1 ? ' dossier' : ' dossiers');

    if (!data.length) {
      grid.innerHTML =
        '<div class="empty-state">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>' +
        '<h4>No hay dossiers creados aún</h4>' +
        '<p>Crea tu primer dossier interactivo con la identidad corporativa de ENAE.</p>' +
        '<a href="/index.html" class="btn btn-primary"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Crear Nuevo Dossier</a>' +
        '</div>';
      return;
    }

    grid.innerHTML = data.map(function(d) {
      var date = new Date(d.createdAt).toLocaleDateString('es-ES', { year:'numeric', month:'short', day:'numeric' });
      var desc = d.descripcion || 'Dossier corporativo ENAE.';
      var current = d.tituloOficial || '';
      function opt(val, txt) {
        return '<option value="' + val + '"' + (val === current ? ' selected' : '') + '>' + txt + '</option>';
      }
      var tituloSelect =
        '<label class="titulo-oficial" title="Titulación con la que se emite el diploma">' +
          '<span class="titulo-oficial-lbl">Titulación oficial</span>' +
          '<select onchange="setTituloOficial(\'' + d.fileName + '\', this.value, this)">' +
            '<option value="" disabled' + (current ? '' : ' selected') + '>— sin definir —</option>' +
            opt('umu', 'Universidad de Murcia') +
            opt('upct', 'Universidad Politécnica de Cartagena') +
            opt('panamerican', 'Panamerican University (doble título)') +
            opt('enae', 'Título propio de ENAE') +
          '</select>' +
        '</label>';
      return '' +
        '<div class="saved-card">' +
          '<div class="saved-thumbnail">' +
            '<span class="dossier-tag">' + esc(d.categoria) + '</span>' +
            '<h5 class="mixed-title">' + (d.titleHtml || esc(d.programa)) + '</h5>' +
            '<span class="date">Creado: ' + date + '</span>' +
          '</div>' +
          '<div class="saved-body">' +
            '<p class="saved-desc">' + esc(desc) + '</p>' +
            tituloSelect +
            '<div class="saved-actions">' +
              '<a href="' + d.url + '" target="_blank" class="btn btn-secondary" aria-label="Ver dossier ' + esc(d.programa) + '" title="Ver dossier"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg><span>Ver</span></a>' +
              '<a href="/index.html?edit=' + encodeURIComponent(d.fileName) + '" class="btn btn-secondary" aria-label="Editar dossier ' + esc(d.programa) + '" title="Editar"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg><span>Editar</span></a>' +
              '<button onclick="delDossier(\'' + d.fileName + '\')" class="btn btn-danger btn-icon-only" aria-label="Eliminar dossier ' + esc(d.programa) + '" title="Eliminar"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>' +
            '</div>' +
            '<div class="saved-actions" style="margin-top: 8px;">' +
              '<a href="/api/dossiers/' + encodeURIComponent(d.fileName) + '/pdf?mode=portrait" class="btn btn-secondary" style="font-size: 0.78rem; display: inline-flex; align-items: center; justify-content: center; gap: 4px;" aria-label="Descargar PDF A4 de ' + esc(d.programa) + '" title="Descargar PDF Vertical (A4)">' +
                '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="width: 14px; height: 14px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg><span>PDF A4</span>' +
              '</a>' +
              '<a href="/api/dossiers/' + encodeURIComponent(d.fileName) + '/pdf?mode=landscape" class="btn btn-secondary" style="font-size: 0.78rem; display: inline-flex; align-items: center; justify-content: center; gap: 4px;" aria-label="Descargar PDF Slide de ' + esc(d.programa) + '" title="Descargar PDF Horizontal (Presentación)">' +
                '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="width: 14px; height: 14px;"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg><span>PDF Slide</span>' +
              '</a>' +
            '</div>' +
          '</div>' +
        '</div>';
    }).join('');

    // Setup search functionality
    setupSearch();

  } catch(e) {
    console.error(e);
    grid.innerHTML = '<div class="loading" style="color:#ef4444;">Error al cargar los dossiers. ¿Está el servidor activo?</div>';
  }
}

function setupSearch() {
  var searchInput = document.getElementById('search-dossiers');
  if (!searchInput) return;

  searchInput.addEventListener('input', function(e) {
    var term = e.target.value.toLowerCase();
    var cards = document.querySelectorAll('.saved-card');
    var visibleCount = 0;

    cards.forEach(function(card) {
      var title = card.querySelector('h5').textContent.toLowerCase();
      var tag = card.querySelector('.dossier-tag').textContent.toLowerCase();
      if (title.indexOf(term) !== -1 || tag.indexOf(term) !== -1) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    var countSpan = document.getElementById('count');
    if (term) {
      countSpan.textContent = visibleCount + ' coincidencia' + (visibleCount !== 1 ? 's' : '');
    } else {
      countSpan.textContent = cards.length + (cards.length === 1 ? ' dossier' : ' dossiers');
    }
  });
}

async function setTituloOficial(fileName, tipo, selectEl) {
  if (!tipo) return;
  var prev = selectEl && selectEl.dataset.prev ? selectEl.dataset.prev : '';
  if (selectEl) selectEl.disabled = true;
  try {
    var res = await fetch('/api/dossiers/' + encodeURIComponent(fileName) + '/titulo-oficial', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tipo: tipo })
    });
    if (res.ok) {
      toast('Titulación oficial actualizada');
      if (selectEl) selectEl.dataset.prev = tipo;
    } else {
      var err = await res.json().catch(function(){return{};});
      toast(err.error || 'No se pudo actualizar la titulación', true);
      if (selectEl && prev) selectEl.value = prev;
    }
  } catch (e) {
    toast('Error de conexión.', true);
    if (selectEl && prev) selectEl.value = prev;
  } finally {
    if (selectEl) selectEl.disabled = false;
  }
}

async function delDossier(fileName) {
  if (!confirm('¿Eliminar "' + fileName + '" de forma permanente?')) return;
  try {
    var res = await fetch('/api/dossiers/' + encodeURIComponent(fileName), { method:'DELETE' });
    if (res.ok) { toast('Dossier eliminado'); loadDossiers(); }
    else toast('No se pudo eliminar el archivo.', true);
  } catch(e) { toast('Error de conexión.', true); }
}

function esc(s) { return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

loadDossiers();