/* ══════════════════════════════════════════════════════════ */
/* ══ Toggle sections ══════════════════════════════════════ */
function toggleSec(id) { document.getElementById(id).classList.toggle('closed'); }

/* ══ Upload ═══════════════════════════════════════════════ */
var upzEl = document.getElementById('upz');
var fDoc = document.getElementById('f-doc');
fDoc.addEventListener('change', function(){ if(fDoc.files[0]) document.getElementById('upz-name').textContent='📎 '+fDoc.files[0].name; });
upzEl.addEventListener('dragover', function(e){ e.preventDefault(); upzEl.classList.add('drag'); });
upzEl.addEventListener('dragleave', function(){ upzEl.classList.remove('drag'); });
upzEl.addEventListener('drop', function(e){ e.preventDefault(); upzEl.classList.remove('drag'); if(e.dataTransfer.files[0]){ fDoc.files=e.dataTransfer.files; document.getElementById('upz-name').textContent='📎 '+e.dataTransfer.files[0].name; }});

/* ══ Toast ════════════════════════════════════════════════ */
function toast(msg,isErr){ var el=document.getElementById('toast'); el.textContent=msg; el.className='toast on'+(isErr?' err':''); clearTimeout(toast._t); toast._t=setTimeout(function(){el.classList.remove('on');},3800); }
function esc(s){return(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}

/* ══ Modules ══════════════════════════════════════════════ */
var mc=0;
function addModItem(num,area,nombre,desc){
  mc++;
  var n=num||String(mc).padStart(2,'0');
  var d=document.createElement('div'); d.className='mod-item';
  d.style.gridTemplateColumns='32px 100px 1fr 1fr 28px';
  d.innerHTML='<div class="mod-n">'+esc(n)+'</div>'+
    '<input type="text" data-field="area" placeholder="Área" value="'+esc(area)+'">'+
    '<input type="text" data-field="nombre" placeholder="Nombre del módulo" value="'+esc(nombre)+'">'+
    '<input type="text" data-field="desc" placeholder="Descripción breve" value="'+esc(desc||'')+'">'+
    '<button class="mod-del" onclick="this.closest(\'.mod-item\').remove();updCounts();" title="Eliminar">×</button>';
  document.getElementById('mod-list').appendChild(d);
  updCounts();
}
function addMod(){ addModItem('','','',''); }

/* ══ IA Topics ════════════════════════════════════════════ */
var ic=0;
function addIaItem(nombre,desc){
  ic++;
  var n=String(ic).padStart(2,'0');
  var d=document.createElement('div'); d.className='mod-item';
  d.style.gridTemplateColumns='32px 1fr 1fr 28px';
  d.innerHTML='<div class="mod-n">'+n+'</div>'+
    '<input type="text" data-field="nombre" placeholder="Nombre del tema" value="'+esc(nombre)+'">'+
    '<input type="text" data-field="desc" placeholder="Descripción" value="'+esc(desc||'')+'">'+
    '<button class="mod-del" onclick="this.closest(\'.mod-item\').remove();updCounts();" title="Eliminar">×</button>';
  document.getElementById('ia-list').appendChild(d);
  updCounts();
}
function addIa(){ addIaItem('',''); }

/* ══ Bullets (perfil) ═════════════════════════════════════ */
function addBulItem(text){
  var d=document.createElement('div'); d.className='bul-item';
  d.innerHTML='<div class="bul-dot"></div><input type="text" value="'+esc(text)+'" placeholder="Perfil de alumno…"><button class="bul-del" onclick="this.closest(\'.bul-item\').remove();">×</button>';
  document.getElementById('bul-list').appendChild(d);
}
function addBul(){ addBulItem(''); }

/* ══ Empresas ═════════════════════════════════════════════ */
function addEmpItem(data){
  if(typeof data === 'string') data = { nombre: data, logo: '' };
  data = data || { nombre: '', logo: '' };
  var d=document.createElement('div'); d.className='bul-item';
  d.style.display = 'flex'; d.style.alignItems = 'center'; d.style.gap = '8px';
  d.innerHTML=`
    <div class="bul-dot"></div>
    <input type="text" class="emp-name" value="${esc(data.nombre)}" placeholder="Nombre de empresa…" style="flex:1;">
    <div style="position:relative; width:40px; height:40px; border:1px dashed hsla(0,0%,100%,.2); border-radius:4px; overflow:hidden; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
      <img src="${esc(data.logo)}" class="emp-logo-preview" style="max-width:100%; max-height:100%; object-fit:contain; display:${data.logo ? 'block' : 'none'};">
      <input type="hidden" class="emp-logo-val" value="${esc(data.logo)}">
      <input type="file" accept="image/*" title="Subir Logo" onchange="uploadEmpLogo(this)" style="position:absolute; inset:0; opacity:0; cursor:pointer;">
      <span class="msym" style="font-size:16px; color:var(--text-muted); position:absolute; z-index:-1; display:${data.logo ? 'none' : 'block'};">add_photo_alternate</span>
    </div>
    <button class="bul-del" onclick="this.closest('.bul-item').remove();">×</button>
  `;
  document.getElementById('emp-list').appendChild(d);
}
function addEmp(){ addEmpItem(''); }

async function uploadEmpLogo(input) {
  var file = input.files[0]; if(!file) return;
  var container = input.closest('div');
  var prev = container.querySelector('.emp-logo-preview');
  var val = container.querySelector('.emp-logo-val');
  var icon = container.querySelector('.msym');
  var formData = new FormData();
  formData.append('imagen', file);
  try {
    var res = await fetch('/api/upload-image', { method: 'POST', body: formData });
    var data = await res.json();
    if(data.url) {
      prev.src = data.url;
      prev.style.display = 'block';
      val.value = data.url;
      icon.style.display = 'none';
    }
  } catch(e) { console.error('Error uploading logo:', e); }
}

/* ══ Imágenes (portada / qué es / metodología) ════════════ */
var heroImgs = { portada:'', quees:'', metodo:'' };
async function uploadHero(input, slot, previewId){
  var file = input.files[0]; if(!file) return;
  var prev = document.getElementById(previewId);
  prev.classList.remove('empty'); prev.style.opacity='.5';
  try {
    var url = await uploadImage(file, slot);
    heroImgs[slot] = url.relPath;
    prev.style.backgroundImage = "url('"+url.url+"')";
    prev.style.opacity='1';
    toast('Imagen subida ✓');
  } catch(e){ prev.style.opacity='1'; toast('Error: '+e.message, true); }
}

/* ══ Subida genérica de imagen al servidor ════════════════ */
async function uploadImage(file, slot){
  var fd = new FormData();
  fd.append('slot', slot || 'img');   // slot antes del archivo para nombrarlo bien
  fd.append('imagen', file);
  var res = await fetch('/api/upload-image', { method:'POST', body:fd });
  var data = await res.json();
  if(!res.ok) throw new Error(data.error || 'Error al subir');
  return data; // { url, relPath }
}

/* ══ Profesores ═══════════════════════════════════════════ */
var profPhotos = []; // relPath por índice (paralelo al DOM)
function addProfItem(nombre, rol, area, fotoUrl, fotoRel, linkedin, biografia){
  var d = document.createElement('div'); d.className='prof-item';
  var bg = fotoUrl ? "background-image:url('"+fotoUrl+"');" : "";
  d.innerHTML =
    '<label class="prof-photo'+(fotoUrl?' has':'')+'" style="'+bg+'">'+
      '<input type="file" accept="image/*" onchange="uploadProfPhoto(this)">'+
      '<span class="prof-up"></span>'+
    '</label>'+
    '<div class="prof-fields">'+
      '<input class="full" type="text" data-f="nombre" placeholder="Nombre completo" value="'+esc(nombre)+'">'+
      '<input type="text" data-f="rol" placeholder="Cargo / rol" value="'+esc(rol)+'">'+
      '<input type="text" data-f="area" placeholder="Área (etiqueta)" value="'+esc(area)+'">'+
      '<input class="full" type="text" data-f="linkedin" placeholder="Enlace de LinkedIn" value="'+esc(linkedin||'')+'">'+
      '<textarea class="full" data-f="biografia" placeholder="Breve biografía..." rows="2" style="font-size:12px; resize:vertical; padding:8px; background:hsla(0,0%,100%,.04); color:#fff; border:1px solid hsla(0,0%,100%,.1); border-radius:4px; font-family:var(--font-base); line-height:1.4;">'+esc(biografia||'')+'</textarea>'+
    '</div>'+
    '<button class="prof-del" onclick="this.closest(\'.prof-item\').remove();updProfCount();" title="Eliminar">×</button>';
  d.dataset.foto = fotoRel || '';
  document.getElementById('prof-list').appendChild(d);
  updProfCount();
}
function addProf(){ addProfItem('','','','','','',''); }

async function uploadProfPhoto(input){
  var file = input.files[0]; if(!file) return;
  var photo = input.closest('.prof-photo');
  var item = input.closest('.prof-item');
  photo.classList.add('loading');
  try {
    var url = await uploadImage(file, 'prof');
    photo.style.backgroundImage = "url('"+url.url+"')";
    photo.classList.add('has');
    item.dataset.foto = url.relPath;
    toast('Foto subida ✓');
  } catch(e){ toast('Error: '+e.message, true); }
  finally { photo.classList.remove('loading'); }
}

function updProfCount(){
  var n = document.querySelectorAll('#prof-list .prof-item').length;
  document.getElementById('prof-count').textContent = n ? n+' profesores' : '';
}

/* ══ Counters ═════════════════════════════════════════════ */
function updCounts(){
  var mc=document.querySelectorAll('#mod-list .mod-item').length;
  var ic=document.querySelectorAll('#ia-list .mod-item').length;
  document.getElementById('mod-count').textContent=mc?mc+' módulos':'';
  document.getElementById('ia-count').textContent=ic?ic+' temas':'';
  // renumber
  document.querySelectorAll('#mod-list .mod-n').forEach(function(el,i){ el.textContent=String(i+1).padStart(2,'0'); });
  document.querySelectorAll('#ia-list .mod-n').forEach(function(el,i){ el.textContent=String(i+1).padStart(2,'0'); });
}

/* ══ AI Generate ══════════════════════════════════════════ */
async function generateContent(){
  var nombre=document.getElementById('f-nombre').value.trim();
  if(!nombre){ toast('El nombre del programa es obligatorio.',true); document.getElementById('f-nombre').focus(); return; }
  var btn=document.getElementById('btn-gen');
  btn.disabled=true; btn.innerHTML='<div class="spin"></div>Generando…';
  var fd=new FormData();
  fd.append('nombre',nombre); fd.append('tipo',document.getElementById('f-tipo').value);
  fd.append('area',document.getElementById('f-area').value); fd.append('meses',document.getElementById('f-meses').value);
  fd.append('ects',document.getElementById('f-ects').value); fd.append('modal',document.querySelector('input[name="mod"]:checked').value);
  fd.append('precio',document.getElementById('f-precio').value); fd.append('notas',document.getElementById('f-notas').value);
  if(fDoc.files[0]) fd.append('documento',fDoc.files[0]);
  try{
    var res=await fetch('/api/generate-dossier',{method:'POST',body:fd});
    var data=await res.json();
    if(!res.ok) throw new Error(data.error||'Error en el servidor');
    // Fill description
    var plain=function(h){var t=document.createElement('div');t.innerHTML=h||'';return t.textContent;};
    document.getElementById('f-intro-t1').value=plain(data.intro_t1||'El Máster que');
    document.getElementById('f-intro-t2').value=plain(data.intro_t2||'necesitas hoy.');
    document.getElementById('f-cv-label').value=plain(data.cv_label||'Cadena de valor del marketing digital');
    document.getElementById('e-desc').value=plain(data.descripcion||'');
    if(data.cadena_valor && data.cadena_valor.length === 5) {
      for(var i=1; i<=5; i++) {
        document.getElementById('f-cv'+i+'-l').value=plain(data.cadena_valor[i-1].label||'');
        document.getElementById('f-cv'+i+'-s').value=plain(data.cadena_valor[i-1].sub||'');
      }
    }
    // Fill modules
    document.getElementById('mod-list').innerHTML=''; mc=0;
    (data.modulos||[]).forEach(function(m){addModItem(m.num,m.area,m.nombre,m.desc||'');});
    // Fill IA topics
    document.getElementById('ia-list').innerHTML=''; ic=0;
    (data.ia_temario||data.ia_asignaturas||[]).forEach(function(t){
      if(typeof t==='string') addIaItem(t,'');
      else addIaItem(t.nombre||'',t.desc||'');
    });
    // Fill perfil
    document.getElementById('bul-list').innerHTML='';
    (data.perfil_bullets||[]).forEach(function(b){addBulItem(b);});
    // Fill empresas
    document.getElementById('emp-list').innerHTML='';
    (data.empresas||[]).forEach(function(e){addEmpItem(e);});
    // Fill profesores (sin foto — el usuario las sube después)
    if(data.profesores && data.profesores.length){
      document.getElementById('prof-list').innerHTML='';
      data.profesores.forEach(function(p){ addProfItem(p.nombre||'', p.rol||'', p.area||'', '', '', p.linkedin||'', p.biografia||''); });
    }
    // Mark badges as AI-generated
    document.querySelectorAll('.badge-manual').forEach(function(b){b.className='badge badge-ai';b.textContent='IA';});
    // Open all sections
    document.querySelectorAll('.sec.closed').forEach(function(s){s.classList.remove('closed');});
    toast('Contenido generado ✓ — edita lo que necesites');
  }catch(e){ toast('Error: '+e.message,true); }
  finally{ btn.disabled=false; btn.innerHTML='<span class="msym" style="font-size:16px;">smart_toy</span>Autocompletar con IA'; }
}

/* ══ Save ═════════════════════════════════════════════════ */
async function saveDossier(){
  var nombre=document.getElementById('f-nombre').value.trim();
  if(!nombre){toast('El nombre del programa es obligatorio.',true);document.getElementById('f-nombre').focus();return;}
  var btn=document.getElementById('btn-save');
  btn.disabled=true; btn.innerHTML='<div class="spin"></div>Guardando…';
  var idioma=document.getElementById('f-idioma').value||'es';
  var isEn=idioma==='en';
  var tipo=document.getElementById('f-tipo').value;
  var meses=parseInt(document.getElementById('f-meses').value)||12;
  var ects=parseInt(document.getElementById('f-ects').value)||60;
  var modulos=Array.from(document.querySelectorAll('#mod-list .mod-item')).map(function(el){
    return{num:el.querySelector('.mod-n').textContent,area:el.querySelector('[data-field="area"]').value.trim(),nombre:el.querySelector('[data-field="nombre"]').value.trim(),desc:(el.querySelector('[data-field="desc"]')||{}).value||''};
  });
  var ia_temario=Array.from(document.querySelectorAll('#ia-list .mod-item')).map(function(el){
    return{nombre:el.querySelector('[data-field="nombre"]').value.trim(),desc:(el.querySelector('[data-field="desc"]')||{}).value||''};
  });
  var perfil_bullets=Array.from(document.querySelectorAll('#bul-list input')).map(function(el){return el.value.trim();}).filter(Boolean);
  // Empresas
  var empresas=Array.from(document.querySelectorAll('#emp-list .bul-item')).map(function(c){
    var n = c.querySelector('.emp-name').value.trim();
    var l = c.querySelector('.emp-logo-val').value.trim();
    if(!n && !l) return null;
    if(l) return { nombre: n, logo: l };
    return n;
  }).filter(Boolean);
  var dobleRaw=document.getElementById('f-doble').value;
  var doble_titulo=null;
  if(dobleRaw){
    var titulos = {
      umu: { tipo: 'umu', nombre: 'Universidad de Murcia', pais: isEn ? 'Murcia, Spain' : 'Murcia, España', logo: '../src/logos/Logo UMU@2x.png', label: isEn ? 'Official Degree' : 'Título oficial' },
      upct: { tipo: 'upct', nombre: 'Universidad Politécnica de Cartagena', pais: isEn ? 'Cartagena, Spain' : 'Cartagena, España', logo: '../src/logos/Logo UPCT@2x.png', label: isEn ? 'Official Degree' : 'Título oficial' },
      panamerican: { tipo: 'panamerican', nombre: 'Panamerican University', pais: isEn ? 'Florida, USA' : 'Florida, EE.UU.', logo: '../src/logos/Panamerican-University-W-T.png', label: isEn ? 'Dual Degree with' : 'Doble título con' },
      enae: { tipo: 'enae', nombre: 'ENAE Business School', pais: isEn ? 'Own Degree' : 'Título propio', logo: '../src/logos/LOGO_ENAE_HORIZONTAL.svg', label: isEn ? 'Own Degree by' : 'Título propio de' }
    };
    doble_titulo = titulos[dobleRaw];
  }
  var tipoLabels={master:'Máster en',mba:'MBA',ejecutivo:'Programa Ejecutivo en',curso:'Curso en',directivo:'Programa Directivo en'};
  var tipoCat={master:'Programa de Posgrado · Máster Internacional',mba:'Programa de Posgrado · MBA Internacional',ejecutivo:'Programa Ejecutivo · ENAE',curso:'Curso Especializado · ENAE',directivo:'Programa Directivo · ENAE'};
  // Profesores (con sus fotos subidas)
  var profesores=Array.from(document.querySelectorAll('#prof-list .prof-item')).map(function(el){
    return {
      nombre:el.querySelector('[data-f="nombre"]').value.trim(),
      rol:el.querySelector('[data-f="rol"]').value.trim(),
      area:el.querySelector('[data-f="area"]').value.trim(),
      linkedin:el.querySelector('[data-f="linkedin"]') ? el.querySelector('[data-f="linkedin"]').value.trim() : '',
      biografia:el.querySelector('[data-f="biografia"]') ? el.querySelector('[data-f="biografia"]').value.trim() : '',
      foto:el.dataset.foto || '',
      obj_pos:'50% 18%'
    };
  }).filter(function(p){ return p.nombre; });
  // Imágenes — usa las subidas o las del template por defecto (existentes)
  var DEF_PORTADA='../doc/Marketing Digital/10042023-317A7390.jpg';
  var DEF_QUEES='../doc/Marketing Digital/Sesion_innegociable_-61.jpg';
  var DEF_METODO='../doc/Marketing Digital/10042023-317A8264.jpg';
  // KPIs de portada
  var kpis_portada=Array.from(document.querySelectorAll('#kpi-portada .kpi-cell')).map(function(c){
    return { n:c.querySelector('[data-f="n"]').value.trim(), l:c.querySelector('[data-f="l"]').value.trim() };
  }).filter(function(k){ return k.n; });
  // Datos de la promoción (con <span>% para el render del dossier)
  var demo_stats=Array.from(document.querySelectorAll('#demo-stats .kpi-cell')).map(function(c){
    var raw=c.querySelector('[data-f="n"]').value.trim();
    var n=raw.replace(/%/g,'<span>%</span>'); // convierte 44% → 44<span>%</span>
    return { n:n, l:c.querySelector('[data-f="l"]').value.trim(), pct:parseInt(c.querySelector('[data-f="pct"]').value)||0 };
  }).filter(function(s){ return s.l; });
  // KPIs de empleabilidad
  var kpi1={ valor:parseInt(document.getElementById('kpi1-val').value)||91, label:document.getElementById('kpi1-lbl').value.trim()||'trabajando al terminar' };
  var kpi2={ valor:parseInt(document.getElementById('kpi2-val').value)||82, label:document.getElementById('kpi2-lbl').value.trim()||'mejora profesional demostrada' };
  // Derive title lines from nombre
  var words=nombre.replace(/^(máster|master|mba|programa|curso)\s*(en|de|internacional)?\s*/i,'').trim().split(/\s+/);
  var mid=Math.ceil(words.length/2);
  var payload={
    idioma:idioma,
    nombre:nombre, programa:nombre,
    titulo_l:tipoLabels[tipo]||'Programa en',
    titulo_b1:words.slice(0,mid).join(' '),
    titulo_b2:words.slice(mid).join(' ')+'.',
    subtitulo:document.getElementById('f-mencion').value.trim(),
    categoria:tipoCat[tipo]||'Programa Académico ENAE',
    doble_titulo:doble_titulo,
    foto_portada:heroImgs.portada||DEF_PORTADA, foto_que_es:heroImgs.quees||DEF_QUEES, foto_metodologia:heroImgs.metodo||DEF_METODO,
    kpis_portada:kpis_portada,
    descripcion:document.getElementById('e-desc').value.trim(),
    intro_t1:document.getElementById('f-intro-t1').value.trim()||'El Máster que',
    intro_t2:document.getElementById('f-intro-t2').value.trim()||'necesitas hoy.',
    cv_label:document.getElementById('f-cv-label').value.trim()||'Cadena de valor del programa',
    cadena_valor:[
      {label:document.getElementById('f-cv1-l').value.trim()||'Fase 1', sub:document.getElementById('f-cv1-s').value.trim()||'Fundamentos'},
      {label:document.getElementById('f-cv2-l').value.trim()||'Fase 2', sub:document.getElementById('f-cv2-s').value.trim()||'Especialización'},
      {label:document.getElementById('f-cv3-l').value.trim()||'Fase 3', sub:document.getElementById('f-cv3-s').value.trim()||'Práctica'},
      {label:document.getElementById('f-cv4-l').value.trim()||'Fase 4', sub:document.getElementById('f-cv4-s').value.trim()||'Proyecto'},
      {label:document.getElementById('f-cv5-l').value.trim()||'Fase 5', sub:document.getElementById('f-cv5-s').value.trim()||'Inserción'}
    ],
    modulos:modulos, ia_temario:ia_temario,
    ects:ects, meses:meses,
    kpi1:kpi1, kpi2:kpi2,
    empresas:empresas, profesores:profesores, perfil_bullets:perfil_bullets,
    demo_stats:demo_stats
  };
  try{
    var res=await fetch('/api/dossiers',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    var result=await res.json();
    if(!res.ok) throw new Error(result.error||'Error al guardar');
    document.getElementById('ok-msg').textContent='"'+nombre+'" guardado como '+result.fileName;
    document.getElementById('ok-ver').href=result.path;
    document.getElementById('sec-ok').classList.add('on');
    document.getElementById('sec-ok').scrollIntoView({behavior:'smooth'});
    toast('Dossier guardado ✓');
  }catch(e){ toast('Error: '+e.message,true); }
  finally{ btn.disabled=false; btn.innerHTML='<span class="msym" style="font-size:16px;">save</span>Guardar dossier'; }
}

/* ══ Init: defaults or edit mode ══════════════════════════ */
function loadDefaults(){
  // Default modules
  addModItem('01','Estrategia','Dirección Estratégica','');
  addModItem('02','Digital','Marketing Digital','');
  addModItem('03','Datos','Analítica y Data Science','');
  addModItem('04','Comunicación','Comunicación Corporativa','');
  // Default IA topics
  addIaItem('Introducción a la IA','');
  addIaItem('IA Aplicada','');
  // Default perfil
  addBulItem('Directivos y ejecutivos');
  addBulItem('Profesionales en transición digital');
  addBulItem('Recién graduados');
  // Default empresas
  addEmpItem(''); addEmpItem('');
  // Default profesores (2 vacíos para empezar)
  addProfItem('','','','','','',''); addProfItem('','','','','','','');
}

async function loadExistingDossier(fileName) {
  try {
    var res = await fetch('/dossiers/' + fileName);
    if (!res.ok) throw new Error('No se pudo cargar el archivo');
    var htmlText = await res.text();
    var match = htmlText.match(/<script id="dossier-data" type="application\/json">([\s\S]*?)<\/script>/);
    if (!match) throw new Error('No se encontraron datos en el dossier');
    var data = JSON.parse(match[1]);
    
    // Rellenar formulario
    if(data.idioma) document.getElementById('f-idioma').value = data.idioma;
    document.getElementById('f-nombre').value = data.programa || data.nombre || '';
    document.getElementById('f-mencion').value = data.subtitulo || '';
    document.getElementById('f-meses').value = data.meses || 12;
    document.getElementById('f-ects').value = data.ects || 60;
    
    // Mapear f-tipo
    if (data.titulo_l) {
      var tipoMap = {
        'Máster en': 'master',
        'MBA': 'mba',
        'Programa Ejecutivo en': 'ejecutivo',
        'Curso en': 'curso',
        'Programa Directivo en': 'directivo'
      };
      var matchingTipo = tipoMap[data.titulo_l];
      if (matchingTipo) document.getElementById('f-tipo').value = matchingTipo;
    }

    // Mapear f-area
    if (data.categoria) {
      var areaOptions = Array.from(document.getElementById('f-area').options).map(function(o){ return o.value; });
      var matchingArea = areaOptions.find(function(opt){
        var word = opt.split(' ')[0];
        return data.categoria.indexOf(word) !== -1 || (data.programa && data.programa.indexOf(word) !== -1);
      });
      if (matchingArea) document.getElementById('f-area').value = matchingArea;
    }

    // Mapear modalidad
    if (data.modalidad) {
      var radio = Array.from(document.querySelectorAll('input[name="mod"]')).find(function(r){ return r.value === data.modalidad; });
      if (radio) radio.checked = true;
    }

    // Mapear precio
    if (data.precio) {
      document.getElementById('f-precio').value = data.precio;
    }

    // Doble título
    if (data.doble_titulo && data.doble_titulo.tipo) {
      document.getElementById('f-doble').value = data.doble_titulo.tipo;
    } else if (data.doble_titulo && data.doble_titulo.nombre) {
      var nombreLower = data.doble_titulo.nombre.toLowerCase();
      if (nombreLower.indexOf('murcia') !== -1) document.getElementById('f-doble').value = 'umu';
      else if (nombreLower.indexOf('cartagena') !== -1 || nombreLower.indexOf('upct') !== -1) document.getElementById('f-doble').value = 'upct';
      else if (nombreLower.indexOf('panamerican') !== -1) document.getElementById('f-doble').value = 'panamerican';
      else if (nombreLower.indexOf('enae') !== -1) document.getElementById('f-doble').value = 'enae';
    } else {
      document.getElementById('f-doble').value = '';
    }

    // Rellenar descripción
    var plain = function(h){var t=document.createElement('div');t.innerHTML=h||'';return t.textContent;};
    document.getElementById('f-intro-t1').value = plain(data.intro_t1 || 'El Máster que');
    document.getElementById('f-intro-t2').value = plain(data.intro_t2 || 'necesitas hoy.');
    document.getElementById('f-cv-label').value = plain(data.cv_label || 'Cadena de valor del marketing digital');
    document.getElementById('e-desc').value = plain(data.descripcion || '');
    if(data.cadena_valor && data.cadena_valor.length === 5) {
      for(var i=1; i<=5; i++) {
        document.getElementById('f-cv'+i+'-l').value=plain(data.cadena_valor[i-1].label||'');
        document.getElementById('f-cv'+i+'-s').value=plain(data.cadena_valor[i-1].sub||'');
      }
    }

    // Módulos
    document.getElementById('mod-list').innerHTML = ''; mc = 0;
    if (data.modulos && data.modulos.length) {
      data.modulos.forEach(function(m){ addModItem(m.num, m.area, m.nombre, m.desc || ''); });
    } else {
      addModItem('01','Estrategia','Dirección Estratégica','');
    }

    // Temas IA
    document.getElementById('ia-list').innerHTML = ''; ic = 0;
    if (data.ia_temario && data.ia_temario.length) {
      data.ia_temario.forEach(function(t){ addIaItem(t.nombre, t.desc || ''); });
    } else if (data.ia_asignaturas && data.ia_asignaturas.length) {
      data.ia_asignaturas.forEach(function(t){
        if (typeof t === 'string') addIaItem(t, '');
        else addIaItem(t.nombre || '', t.desc || '');
      });
    }

    // Perfil
    document.getElementById('bul-list').innerHTML = '';
    if (data.perfil_bullets && data.perfil_bullets.length) {
      data.perfil_bullets.forEach(function(b){ addBulItem(b); });
    }

    // Empresas
    document.getElementById('emp-list').innerHTML = '';
    if (data.empresas && data.empresas.length) {
      data.empresas.forEach(function(e){ addEmpItem(e); });
    }

    // Profesores
    document.getElementById('prof-list').innerHTML = '';
    if (data.profesores && data.profesores.length) {
      data.profesores.forEach(function(p){
        var fotoUrl = p.foto ? (p.foto.indexOf('http') === 0 || p.foto.indexOf('/') === 0 ? p.foto : '/' + p.foto.replace(/^\.\.\//, '')) : '';
        addProfItem(p.nombre || '', p.rol || '', p.area || '', fotoUrl, p.foto || '', p.linkedin||'', p.biografia||'');
      });
    }

    // Fotos Hero/Portada
    if (data.foto_portada) {
      heroImgs.portada = data.foto_portada;
      var prevP = document.getElementById('prev-portada');
      prevP.classList.remove('empty');
      prevP.style.backgroundImage = "url('" + (data.foto_portada.indexOf('http') === 0 || data.foto_portada.indexOf('/') === 0 ? data.foto_portada : '/' + data.foto_portada.replace(/^\.\.\//, '')) + "')";
    }
    if (data.foto_que_es) {
      heroImgs.quees = data.foto_que_es;
      var prevQ = document.getElementById('prev-quees');
      prevQ.classList.remove('empty');
      prevQ.style.backgroundImage = "url('" + (data.foto_que_es.indexOf('http') === 0 || data.foto_que_es.indexOf('/') === 0 ? data.foto_que_es : '/' + data.foto_que_es.replace(/^\.\.\//, '')) + "')";
    }
    if (data.foto_metodologia) {
      heroImgs.metodo = data.foto_metodologia;
      var prevM = document.getElementById('prev-metodo');
      prevM.classList.remove('empty');
      prevM.style.backgroundImage = "url('" + (data.foto_metodologia.indexOf('http') === 0 || data.foto_metodologia.indexOf('/') === 0 ? data.foto_metodologia : '/' + data.foto_metodologia.replace(/^\.\.\//, '')) + "')";
    }

    // KPIs de Portada
    if (data.kpis_portada && data.kpis_portada.length) {
      var cells = document.querySelectorAll('#kpi-portada .kpi-cell');
      data.kpis_portada.forEach(function(k, idx) {
        if (cells[idx]) {
          cells[idx].querySelector('[data-f="n"]').value = k.n;
          cells[idx].querySelector('[data-f="l"]').value = k.l;
        }
      });
    }

    // Datos Promoción
    if (data.demo_stats && data.demo_stats.length) {
      var cells = document.querySelectorAll('#demo-stats .kpi-cell');
      data.demo_stats.forEach(function(s, idx) {
        if (cells[idx]) {
          var cleanN = s.n.replace(/<\/?span[^>]*>/g, '');
          cells[idx].querySelector('[data-f="n"]').value = cleanN;
          cells[idx].querySelector('[data-f="l"]').value = s.l;
          cells[idx].querySelector('[data-f="pct"]').value = s.pct || 0;
        }
      });
    }

    // KPIs Empleabilidad
    if (data.kpi1) {
      document.getElementById('kpi1-val').value = data.kpi1.valor || 91;
      document.getElementById('kpi1-lbl').value = data.kpi1.label || 'trabajando al terminar';
    }
    if (data.kpi2) {
      document.getElementById('kpi2-val').value = data.kpi2.valor || 82;
      document.getElementById('kpi2-lbl').value = data.kpi2.label || 'mejora profesional demostrada';
    }

    updCounts();
    toast('Dossier cargado para edición ✓');
  } catch(e) {
    toast('Error al cargar datos del dossier: ' + e.message, true);
    loadDefaults();
  }
}

/* ══ Init: defaults or edit mode ══════════════════════════ */
(function(){
  // Edit mode?
  var params=new URLSearchParams(window.location.search);
  var editFile=params.get('edit');
  if(editFile){
    document.querySelector('.hdr-title').innerHTML='ENAE <span>Editor</span>';
    document.querySelector('.mode-bar p').innerHTML='<strong>Modo edición.</strong> Modifica los campos y guarda. El archivo existente será sobrescrito.';
    var label=editFile.replace('.html','').replace(/-/g,' ').replace(/\b\w/g,function(c){return c.toUpperCase();});
    document.getElementById('f-nombre').value=label;
    loadExistingDossier(editFile);
  } else {
    loadDefaults();
  }
})();