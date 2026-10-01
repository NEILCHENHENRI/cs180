(() => {
  const storageKey = 'cs180-theme'
  const root = document.documentElement
  const stored = localStorage.getItem(storageKey)
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const initialTheme = stored || (systemDark ? 'dark' : 'light')

  root.dataset.theme = initialTheme

  const createToggle = () => {
    const topbar = document.querySelector('.topbar')
    if (!topbar || topbar.querySelector('.theme-toggle')) return

    const toggle = document.createElement('button')
    toggle.className = 'theme-toggle'
    toggle.type = 'button'
    toggle.innerHTML = `
      <svg class="moon-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 15.2A8.5 8.5 0 0 1 8.8 4a8.5 8.5 0 1 0 11.2 11.2Z"></path>
      </svg>
      <svg class="sun-icon" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="3.5"></circle>
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path>
      </svg>`

    const updateLabel = () => {
      const dark = root.dataset.theme === 'dark'
      toggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode')
      toggle.setAttribute('aria-pressed', String(dark))
      toggle.title = dark ? 'Light mode' : 'Dark mode'
    }

    toggle.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark'
      root.dataset.theme = next
      localStorage.setItem(storageKey, next)
      updateLabel()
    })

    const back = topbar.querySelector('.back')
    if (back) {
      const actions = document.createElement('div')
      actions.className = 'topbar-actions'
      topbar.insertBefore(actions, back)
      actions.append(back, toggle)
    } else {
      topbar.append(toggle)
    }
    updateLabel()
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createToggle, { once: true })
  } else {
    createToggle()
  }
})()
