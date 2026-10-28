(() => {
  const content = window.project4Content || {}
  document.querySelectorAll('[data-content]').forEach(element => {
    const value = content[element.dataset.content]
    if (value !== undefined) element.textContent = value
  })
  document.querySelectorAll('[data-content-html]').forEach(element => {
    const value = content[element.dataset.contentHtml]
    if (value !== undefined) element.innerHTML = value
  })
  document.querySelectorAll('[data-content-attrs]').forEach(element => {
    const values = content[element.dataset.contentAttrs]
    if (values) Object.entries(values).forEach(([name, value]) => element.setAttribute(name, value))
  })
  document.querySelectorAll('[data-matrix]').forEach(element => {
    const rows = content[element.dataset.matrix].trim().split('\n').map(row => row.trim().split(/\s+/))
    element.replaceChildren(...rows.map(values => {
      const row = document.createElement('div')
      row.className = 'matrix-row'
      row.setAttribute('role', 'row')
      values.forEach(value => {
        const cell = document.createElement('span')
        cell.className = 'matrix-value'
        cell.setAttribute('role', 'cell')
        cell.textContent = value
        row.append(cell)
      })
      return row
    }))
  })
  const dialog = document.querySelector('.viewer')
  const image = dialog.querySelector('.viewer-image')
  const caption = dialog.querySelector('.viewer-details p')
  const controls = dialog.querySelector('.viewer-controls')
  const comparison = dialog.querySelector('.viewer-comparison')
  let selectedLink = null
  let comparedLinks = []
  const description = link => content[link.dataset.viewerCaption] || link.closest('figure').querySelector('figcaption')?.textContent || link.querySelector('img').alt
  const lockPage = () => {
    const open = Boolean(document.querySelector('dialog[open]'))
    document.documentElement.classList.toggle('viewer-open', open)
    if (open) window.projectPageScroll?.stop()
    else window.projectPageScroll?.start()
  }
  const setView = compare => {
    const active = compare && comparedLinks.length === 2
    image.hidden = active
    comparison.hidden = !active
    dialog.classList.toggle('is-comparing', active)
    controls.querySelectorAll('[data-view-mode]').forEach(button => button.setAttribute('aria-pressed', String((button.dataset.viewMode === 'compare') === active)))
    if (active) {
      comparison.querySelectorAll('figure').forEach((figure, index) => {
        const link = comparedLinks[index]
        const target = figure.querySelector('img')
        target.src = link.href
        target.alt = description(link)
        figure.querySelector('figcaption').textContent = description(link)
      })
      caption.textContent = content.viewerComparisonCaption.replace('{left}', description(comparedLinks[0])).replace('{right}', description(comparedLinks[1]))
    } else {
      image.src = selectedLink.href
      image.alt = description(selectedLink)
      caption.textContent = description(selectedLink)
    }
  }
  const openImages = (link, pair, compare = false) => {
    selectedLink = link
    comparedLinks = pair
    controls.hidden = pair.length !== 2
    dialog.classList.toggle('is-panorama', link.closest('figure').classList.contains('panorama'))
    setView(compare)
    dialog.showModal()
    lockPage()
  }
  const pairFor = link => {
    const gallery = link.closest('.gallery[data-compare-type]')
    if (!gallery) return []
    const links = [...gallery.querySelectorAll('a[data-image]')]
    if (gallery.dataset.compareType === 'warps') return links.filter(item => /\/(nearest|bilinear)\.png$/.test(item.getAttribute('href')))
    const start = Math.min(links.indexOf(link), links.length - 2)
    return links.slice(start, start + 2)
  }
  document.querySelectorAll('a[data-image]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return
      event.preventDefault()
      openImages(link, pairFor(link))
    })
  })
  document.querySelectorAll('[data-compare-group]').forEach(button => {
    button.addEventListener('click', () => {
      const links = document.getElementById(button.dataset.compareGroup).querySelectorAll('a[data-image]')
      const pair = [links[Number(button.dataset.compareLeft)], links[Number(button.dataset.compareRight)]]
      openImages(pair[0], pair, true)
    })
  })
  controls.querySelectorAll('[data-view-mode]').forEach(button => button.addEventListener('click', () => setView(button.dataset.viewMode === 'compare')))
  dialog.querySelector('.close').addEventListener('click', () => dialog.close())
  dialog.addEventListener('close', lockPage)
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close() })
  dialog.addEventListener('wheel', event => event.preventDefault(), { passive: false })
  dialog.addEventListener('touchmove', event => event.preventDefault(), { passive: false })
  dialog.addEventListener('keydown', event => {
    const isButtonSpace = event.key === ' ' && event.target.closest('button')
    if (!isButtonSpace && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) event.preventDefault()
  })

  const systemDialog = document.querySelector('.system-dialog')
  let selectedSystem = null
  const displaySystem = name => {
    const data = content.linearSystems[selectedSystem]
    const rows = data[name]
    systemDialog.querySelector('.system-title').textContent = content[data.titleKey]
    systemDialog.querySelector('.numeric-symbol').textContent = `${name} =`
    const matrix = systemDialog.querySelector('.numeric-matrix')
    matrix.style.setProperty('--columns', rows[0].length)
    matrix.setAttribute('aria-label', content.systemMatrixLabel.replace('{name}', name))
    matrix.replaceChildren(...rows.map(values => {
      const row = document.createElement('div')
      row.className = 'numeric-row'
      row.setAttribute('role', 'row')
      values.forEach(value => {
        const cell = document.createElement('span')
        cell.setAttribute('role', 'cell')
        cell.textContent = Number.isInteger(value) && Math.abs(value) < 100000 ? String(value) : value.toExponential(2)
        row.append(cell)
      })
      return row
    }))
    systemDialog.querySelector('.system-dimensions').textContent = content.systemDimensionsTemplate.replace('{rows}', rows.length).replace('{columns}', rows[0].length)
    systemDialog.querySelector('.system-download').href = data[`${name}Url`]
    systemDialog.querySelectorAll('[data-system-tab]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.systemTab === name)))
  }
  document.querySelectorAll('[data-system]').forEach(button => button.addEventListener('click', () => {
    selectedSystem = button.dataset.system
    displaySystem(button.dataset.systemMatrix)
    systemDialog.showModal()
    lockPage()
  }))
  systemDialog.querySelectorAll('[data-system-tab]').forEach(button => button.addEventListener('click', () => displaySystem(button.dataset.systemTab)))
  systemDialog.querySelector('.close').addEventListener('click', () => systemDialog.close())
  systemDialog.addEventListener('close', lockPage)
  systemDialog.addEventListener('click', event => { if (event.target === systemDialog) systemDialog.close() })
})()
