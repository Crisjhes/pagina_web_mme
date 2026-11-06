document.addEventListener('DOMContentLoaded', () => {
  const $ = id => document.getElementById(id);
  // Menú adaptable
  const toggle=$('menuToggle'), links=$('menuLinks');
  if(toggle&&links){const close=()=>{links.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='☰';};toggle.addEventListener('click',()=>{const open=links.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'×':'☰';});links.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});}
  // Volver arriba
  const up=$('backTop');if(up){const update=()=>up.classList.toggle('visible',window.scrollY>330);window.addEventListener('scroll',update,{passive:true});up.addEventListener('click',()=>window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'}));update();}
  // Noticias: búsqueda y categoría
  const search=$('newsSearch'),category=$('newsCategory'),grid=$('newsGrid'),none=$('noNews');
  if(search&&category&&grid&&none){const cards=[...grid.querySelectorAll('.news-card')];const filter=()=>{const query=norm(search.value);let visible=0;cards.forEach(c=>{const yes=(category.value==='todas'||c.dataset.category===category.value)&&norm(c.dataset.search).includes(query);c.hidden=!yes;if(yes)visible++;});none.hidden=visible>0;};search.addEventListener('input',filter);category.addEventListener('change',filter);}
  // Directorio: 5 cursos por página
  const tSearch=$('teacherSearch'),rows=$('teacherRows'),prev=$('prevTeachers'),next=$('nextTeachers'),pageInfo=$('teacherPage'),noTeachers=$('noTeachers');
  if(tSearch&&rows&&prev&&next&&pageInfo&&noTeachers&&Array.isArray(window.DATOS_ASESORES)){
    let current=0;const pageSize=5;const render=()=>{
      const q=norm(tSearch.value);const filtered=window.DATOS_ASESORES.filter(r=>norm([r.curso,...r.docentes.flatMap(d=>[d.nombre,d.comision])].join(' ')).includes(q));const maxPages=Math.max(1,Math.ceil(filtered.length/pageSize));current=Math.min(current,maxPages-1);rows.replaceChildren();
      filtered.slice(current*pageSize,(current+1)*pageSize).forEach(r=>{const tr=document.createElement('tr');const c=document.createElement('td');c.textContent=r.curso;c.className='course-name';const names=document.createElement('td'),comm=document.createElement('td');r.docentes.forEach(d=>{const a=document.createElement('span'),b=document.createElement('span');a.className=b.className='teacher-entry';a.textContent=d.nombre;b.textContent=d.comision;names.append(a);comm.append(b);});tr.append(c,names,comm);rows.append(tr);});pageInfo.textContent=`Página ${current+1} de ${maxPages}`;prev.disabled=current===0;next.disabled=current>=maxPages-1;noTeachers.hidden=filtered.length>0;};
    tSearch.addEventListener('input',()=>{current=0;render();});prev.addEventListener('click',()=>{if(current>0){current--;render();}});next.addEventListener('click',()=>{current++;render();});render();
  }
  // Galería: filtros y ampliación
  const filterBtns=[...document.querySelectorAll('.gallery-filter')],photos=[...document.querySelectorAll('.photo-card')],noPhotos=$('noPhotos');
  if(filterBtns.length&&noPhotos){filterBtns.forEach(btn=>btn.addEventListener('click',()=>{const category=btn.dataset.filter;let count=0;photos.forEach(f=>{const show=category==='todas'||f.dataset.cat===category;f.hidden=!show;if(show)count++;});filterBtns.forEach(b=>b.classList.toggle('active',b===btn));noPhotos.hidden=count>0;}));}
  const viewer=$('photoViewer'),vImg=$('viewerImage'),vText=$('viewerText'),closeViewer=$('closeViewer');let previousFocus=null;
  if(viewer&&vImg&&vText&&closeViewer){const close=()=>{viewer.hidden=true;vImg.removeAttribute('src');document.body.style.overflow='';if(previousFocus)previousFocus.focus();};document.querySelectorAll('.open-photo').forEach(button=>button.addEventListener('click',()=>{const img=button.querySelector('img');previousFocus=button;vImg.src=img.src;vImg.alt=img.alt;vText.textContent=button.closest('figure').querySelector('figcaption').textContent;viewer.hidden=false;document.body.style.overflow='hidden';closeViewer.focus();}));closeViewer.addEventListener('click',close);viewer.addEventListener('click',e=>{if(e.target===viewer)close();});document.addEventListener('keydown',e=>{if(viewer.hidden)return;if(e.key==='Escape')close();if(e.key==='Tab'){e.preventDefault();closeViewer.focus();}});}
});
function norm(text){return String(text).toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim();}
