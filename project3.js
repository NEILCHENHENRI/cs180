(() => {
  const content = window.project3Content;
  document.querySelectorAll('[data-content]').forEach(element => {
    element.textContent = content[element.dataset.content];
  });
  document.querySelectorAll('[data-content-html]').forEach(element => {
    element.innerHTML = content[element.dataset.contentHtml];
  });
  document.querySelectorAll('[data-content-attrs]').forEach(element => {
    Object.entries(content[element.dataset.contentAttrs]).forEach(([name, value]) => {
      element.setAttribute(name, value);
    });
  });

  const dialog = document.querySelector('.lightbox');
  const image = dialog.querySelector('.lightbox-image');
  const caption = dialog.querySelector('.lightbox-caption');
  const comparison = dialog.querySelector('.lightbox-comparison');
  const zoomControls = dialog.querySelector('.lightbox-zoom');
  const slider = zoomControls.querySelector('input');
  const stage = dialog.querySelector('.lightbox-stage');
  const updateZoom = () => stage.style.setProperty('--image-size', `${slider.value}%`);
  slider.addEventListener('input', updateZoom);

  document.querySelectorAll('a[data-image]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const thumbnail = link.querySelector('img');
      const width = thumbnail.naturalWidth || Number(thumbnail.getAttribute('width'));
      const height = thumbnail.naturalHeight || Number(thumbnail.getAttribute('height'));
      const epoch = link.dataset.compareEpoch;
      const isHybrid = link.hasAttribute('data-hybrid-zoom');
      dialog.classList.toggle('is-wide', !epoch && !isHybrid && (link.dataset.viewLayout === 'stacked' || width / height >= 2.5));
      dialog.classList.toggle('is-comparison', Boolean(epoch));
      dialog.classList.toggle('is-hybrid', isHybrid);
      image.hidden = Boolean(epoch);
      comparison.hidden = !epoch;
      zoomControls.hidden = !isHybrid;

      if (epoch) {
        ['scheduled', 'constant-lr'].forEach(mode => {
          const source = document.querySelector(`[data-compare-epoch="${epoch}"][data-compare-mode="${mode}"]`);
          const target = comparison.querySelector(`[data-comparison-image="${mode}"]`);
          target.src = source.href;
          target.alt = source.querySelector('img').alt;
        });
        caption.textContent = content.viewerEpochCaption.replace('{epoch}', epoch);
      } else {
        image.src = link.href;
        image.alt = thumbnail.alt;
        caption.textContent = link.closest('figure')?.querySelector('figcaption')?.textContent || image.alt;
      }
      slider.value = '100';
      updateZoom();
      dialog.showModal();
      dialog.scrollTop = 0;
    });
  });
  dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
})();
