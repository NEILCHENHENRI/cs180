(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const reveals = document.querySelectorAll('.reveal')

  if (reduced) {
    reveals.forEach(element => element.classList.add('in'))
    return
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('in')
    })
  }, { threshold: .04 })

  reveals.forEach(element => observer.observe(element))

  if (window.Lenis && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    new Lenis({
      autoRaf: true,
      smoothWheel: true,
      lerp: .1,
      wheelMultiplier: 1
    })
  }
})()
