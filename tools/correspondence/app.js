'use strict';
(() => {
  const $ = id => document.getElementById(id);
  const views = [0, 1].map(side => ({side, canvas: $(`canvas-${side}`), host: $(`view-${side}`), image: null, name: '', scale: 1, x: 0, y: 0, width: 0, height: 0, loadId: 0}));
  let pairs = [], pending = null, editing = null, deleting = false, history = [];
  const ready = () => views.every(v => v.image);
  const remember = () => { history.push(JSON.stringify({pairs, pending, editing})); if (history.length > 100) history.shift(); };
  const message = text => { $('status').textContent = text; };
  const pointOK = (p, v) => Array.isArray(p) && p.length === 2 && p.every(Number.isFinite) && p[0] >= 0 && p[1] >= 0 && p[0] <= v.image.naturalWidth - 1 && p[1] <= v.image.naturalHeight - 1;
  const screen = (v, p) => [v.x + p[0] * v.scale, v.y + p[1] * v.scale];
  const original = (v, x, y) => [(x - v.x) / v.scale, (y - v.y) / v.scale];
  function fit(v) {
    if (!v.image) return;
    v.scale = Math.min((v.width - 32) / v.image.naturalWidth, (v.height - 32) / v.image.naturalHeight);
    v.x = (v.width - v.image.naturalWidth * v.scale) / 2;
    v.y = (v.height - v.image.naturalHeight * v.scale) / 2;
    draw(v);
  }
  function marker(v, point, index, temporary = false) {
    const ctx = v.canvas.getContext('2d'), [x, y] = screen(v, point);
    const selected = editing && editing.index === index && editing.side === v.side;
    ctx.strokeStyle = '#13241c'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(x-8,y);ctx.lineTo(x+8,y);ctx.moveTo(x,y-8);ctx.lineTo(x,y+8);ctx.stroke();
    ctx.strokeStyle = temporary || selected ? '#ffd16b' : '#9dffc7';ctx.lineWidth = 1.5;ctx.stroke();
    ctx.beginPath();ctx.arc(x,y,11,0,Math.PI*2);ctx.stroke();
    ctx.font = 'bold 11px sans-serif';ctx.fillStyle = '#152b21';ctx.fillRect(x+10,y-23,26,19);
    ctx.fillStyle = temporary || selected ? '#ffd16b' : '#bbffd6';ctx.fillText(`${index+1}${temporary ? '?' : ''}`,x+14,y-10);
  }
  function draw(v) {
    const dpr = window.devicePixelRatio || 1, ctx = v.canvas.getContext('2d');
    if (v.canvas.width !== Math.round(v.width*dpr) || v.canvas.height !== Math.round(v.height*dpr)) {
      v.canvas.width = Math.round(v.width*dpr);v.canvas.height = Math.round(v.height*dpr);
    }
    ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,v.width,v.height);
    if (!v.image) return;
    ctx.drawImage(v.image,v.x,v.y,v.image.naturalWidth*v.scale,v.image.naturalHeight*v.scale);
    pairs.forEach((pair,i) => marker(v,pair[v.side],i));
    if (pending && v.side === 0) marker(v,pending,pairs.length,true);
    $(`zoom-${v.side}`).textContent = `${Math.round(v.scale*100)}%`;
  }
  function update() {
    views.forEach(v => {
      draw(v);
      $(`panel-${v.side}`).classList.toggle('active', ready() && !deleting && v.side === (editing ? editing.side : pending ? 1 : 0));
    });
    $('count').textContent = `${pairs.length} pair${pairs.length === 1 ? '' : 's'}`;
    $('undo').disabled = !history.length; $('clear').disabled = !pairs.length && !pending;
    $('export').disabled = !ready() || !pairs.length || !!pending || !!editing;
    $('delete-mode').setAttribute('aria-pressed',String(deleting));
    $('table-empty').hidden = !!pairs.length;
    const body = $('points-body');body.replaceChildren();
    pairs.forEach((pair,i) => {
      const tr = document.createElement('tr'); if (editing && editing.index === i) tr.className = 'selected';
      [String(i+1),...pair.map(p => p.map(n=>n.toFixed(2)).join(', '))].forEach(value => { const td = document.createElement('td');td.textContent = value;tr.append(td); });
      const td = document.createElement('td'), button = document.createElement('button');
      button.textContent = '×';button.setAttribute('aria-label',`Delete pair ${i+1}`);button.onclick = () => remove(i);td.append(button);tr.append(td);body.append(tr);
    });
    message(!ready() ? 'Load two photos to begin.' : deleting ? 'Click a marker or a row’s × to delete its pair.' : editing ? `Adjusting pair ${editing.index+1}: click the corrected location in the ${editing.side ? 'reference' : 'source'} photo. Esc cancels.` : pending ? `Pair ${pairs.length+1}: click the same landmark in the reference photo →` : `Pair ${pairs.length+1}: click a landmark in the source photo ←`);
  }
  function remove(index) { remember();pairs.splice(index,1);editing=null;update(); }
  function undo() { if (!history.length) return;({pairs,pending,editing}=JSON.parse(history.pop()));update(); }
  function zoom(v, factor, cx=v.width/2, cy=v.height/2) {
    if (!v.image) return;
    const next = Math.max(.005,Math.min(32,v.scale*factor)), ratio=next/v.scale;
    v.x = cx-(cx-v.x)*ratio;v.y = cy-(cy-v.y)*ratio;v.scale=next;draw(v);
  }
  function click(v,x,y) {
    if (!ready()) return;
    const p=original(v,x,y);
    if (editing && !deleting) {
      if (editing.side !== v.side || !pointOK(p,v)) return;
      remember();pairs[editing.index][v.side]=p;editing=null;update();return;
    }
    const hit = pairs.findIndex(pair => {const [px,py]=screen(v,pair[v.side]);return Math.hypot(px-x,py-y)<13;});
    if (hit !== -1) { if (deleting) remove(hit); else {editing={side:v.side,index:hit};update();} return; }
    if (deleting || !pointOK(p,v)) return;
    if (!pending && v.side === 0) {remember();pending=p;update();}
    else if (pending && v.side === 1) {remember();pairs.push([pending,p]);pending=null;update();}
  }
  async function load(v,file) {
    if (!file) return;
    const loadId = ++v.loadId, url = URL.createObjectURL(file), image = new Image();
    try {
      image.src=url;await image.decode();
      if (loadId !== v.loadId) return;
      if ((pairs.length || pending) && !confirm('Changing a photo clears the current correspondences. Continue?')) return;
      v.image=image;v.name=file.name;pairs=[];pending=null;editing=null;history=[];
      $(`name-${v.side}`).textContent=`${file.name} · ${image.naturalWidth} × ${image.naturalHeight}`;
      v.host.querySelector('.empty').hidden=true;v.host.querySelector('.empty').style.display='none';fit(v);update();
    } catch { message('That image could not be opened. Try a JPG, PNG, or WebP file.'); }
    finally { URL.revokeObjectURL(url); }
  }
  views.forEach(v => {
    $(`file-${v.side}`).addEventListener('change',e=>{load(v,e.target.files[0]);e.target.value='';});
    new ResizeObserver(() => {
      const oldW=v.width,oldH=v.height;v.width=v.host.clientWidth;v.height=v.host.clientHeight;
      if (!oldW) fit(v);else {v.x+=(v.width-oldW)/2;v.y+=(v.height-oldH)/2;}
      draw(v);
    }).observe(v.host);
    v.canvas.addEventListener('wheel',e=>{e.preventDefault();const r=v.canvas.getBoundingClientRect();zoom(v,Math.exp(-e.deltaY*.0015),e.clientX-r.left,e.clientY-r.top);},{passive:false});
    let drag=null;
    v.canvas.addEventListener('pointerdown',e=>{
      if (e.button!==0) return;v.canvas.focus();
      drag={id:e.pointerId,x:e.clientX,y:e.clientY,ox:v.x,oy:v.y,moved:false};v.canvas.setPointerCapture(e.pointerId);
    });
    v.canvas.addEventListener('pointermove',e=>{
      const r=v.canvas.getBoundingClientRect(),p=original(v,e.clientX-r.left,e.clientY-r.top);
      if (v.image) v.canvas.title=`x: ${p[0].toFixed(2)}, y: ${p[1].toFixed(2)}`;
      if (!drag || drag.id!==e.pointerId) return;
      if (Math.hypot(e.clientX-drag.x,e.clientY-drag.y)>4) drag.moved=true;
      if (drag.moved) {v.x=drag.ox+e.clientX-drag.x;v.y=drag.oy+e.clientY-drag.y;draw(v);}
    });
    v.canvas.addEventListener('pointerup',e=>{
      if (!drag || drag.id!==e.pointerId) return;
      const moved=drag.moved;drag=null;
      if (v.canvas.hasPointerCapture(e.pointerId)) v.canvas.releasePointerCapture(e.pointerId);
      if (!moved) {const r=v.canvas.getBoundingClientRect();click(v,e.clientX-r.left,e.clientY-r.top);}
    });
    v.canvas.addEventListener('pointercancel',()=>{drag=null;});
  });
  document.querySelectorAll('[data-zoom]').forEach(b=>b.onclick=()=>zoom(views[Number(b.dataset.side)],Number(b.dataset.zoom)));
  $('fit').onclick=()=>views.forEach(fit);$('undo').onclick=undo;
  $('delete-mode').onclick=()=>{deleting=!deleting;editing=null;update();};
  $('clear').onclick=()=>{if (confirm('Clear all points? You can undo this.')) {remember();pairs=[];pending=null;editing=null;update();}};
  function payload() {
    return {version:1,coordinate_system:'original_image_pixels',origin:'top_left_pixel_center',
      im1_name:views[0].name.replace(/\.[^.]+$/,''),im2_name:views[1].name.replace(/\.[^.]+$/,''),
      images:views.map(v=>({name:v.name,width:v.image.naturalWidth,height:v.image.naturalHeight})),
      im1Points:pairs.map(p=>p[0]),im2Points:pairs.map(p=>p[1])};
  }
  $('export').onclick=()=>{
    if (!ready() || !pairs.length || pending || editing) return;
    const data=payload(),url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'})),a=document.createElement('a');
    a.href=url;a.download=`${data.im1_name}_${data.im2_name}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
    message(`Exported ${pairs.length} pairs.${pairs.length<4 ? ' At least 4 pairs are needed for a homography.' : pairs.length<8 ? ' More than 4 well-spread pairs improve stability.' : ''}`);
  };
  $('import').onchange=async e=>{
    const file=e.target.files[0];e.target.value='';if (!file) return;
    try {
      if (!ready()) throw new Error('Load the two original photos before importing points.');
      const data=JSON.parse(await file.text());
      if (data.coordinate_system && data.coordinate_system!=='original_image_pixels') throw new Error('Unsupported coordinate system.');
      if (!Array.isArray(data.im1Points) || !Array.isArray(data.im2Points) || data.im1Points.length!==data.im2Points.length || !data.im1Points.length) throw new Error('JSON must contain equal, nonempty im1Points and im2Points arrays.');
      if (data.images && (!Array.isArray(data.images) || data.images.length!==2 || data.images.some((im,i)=>!im || im.width!==views[i].image.naturalWidth || im.height!==views[i].image.naturalHeight))) throw new Error('Image dimensions do not match the export. Load the original photos in the original order.');
      const imported=data.im1Points.map((p,i)=>[p,data.im2Points[i]]);
      if (imported.some(pair=>pair.some((p,i)=>!pointOK(p,views[i])))) throw new Error('Some coordinates are invalid or outside the loaded photos.');
      const names=[data.im1_name,data.im2_name];
      const mismatch=names.some((name,i)=>name && name!==views[i].name.replace(/\.[^.]+$/,''));
      if ((mismatch || !data.coordinate_system) && !confirm('Check these points belong to the loaded photos in the same order and use original pixel coordinates. The older course tool may save display coordinates. Import as-is?')) return;
      if ((pairs.length || pending) && !confirm('Replace the current points with the imported points? You can undo this.')) return;
      remember();pairs=imported;pending=null;editing=null;update();message(`Imported ${pairs.length} pairs. Check the numbered markers on both photos.`);
    } catch(error) {message(`Import failed: ${error.message}`);}
  };
  window.addEventListener('keydown',e=>{
    if (/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase()==='z') {e.preventDefault();undo();}
    if (e.key==='Escape') {if (editing) editing=null;else if (pending) {remember();pending=null;}deleting=false;update();}
    if (e.key.toLowerCase()==='f' && !e.metaKey && !e.ctrlKey) views.forEach(fit);
  });
  window.addEventListener('beforeunload',e=>{if(pairs.length || pending){e.preventDefault();e.returnValue='';}});
  update();
})();
