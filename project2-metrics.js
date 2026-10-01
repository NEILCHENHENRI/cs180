(() => {
  const setMetric = (name, value) => {
    const element = document.querySelector(`[data-metric="${name}"]`)
    if (element) element.textContent = value
  }

  const scientific = value => value === 0 ? '0' : value.toExponential(2)
  const percent = value => `${(value * 100).toFixed(2)}%`

  const { part11, part12, part13, part21, part22, part23, part24 } = window.project2Metrics || {}

  if (part11 && part12 && part13 && part21 && part22 && part23 && part24) {
    setMetric('part11.fourSeconds', `${part11.seconds.four_loops_9x9.toFixed(2)} s`)
    setMetric('part11.twoSeconds', `${part11.seconds.two_loops_9x9.toFixed(2)} s`)
    setMetric('part11.scipySeconds', `${part11.seconds.scipy_9x9.toFixed(3)} s`)
    setMetric('part11.fourError', scientific(part11.max_abs_error_vs_scipy.four_loops_9x9))
    setMetric('part11.twoError', scientific(part11.max_abs_error_vs_scipy.two_loops_9x9))
    setMetric('part11.fourTest', scientific(part11.max_abs_error_vs_scipy.four_loops_asymmetric_test))
    setMetric('part11.twoTest', scientific(part11.max_abs_error_vs_scipy.two_loops_asymmetric_test))

    setMetric('part12.threshold', part12.edge_threshold.toFixed(2))
    setMetric('part12.edgeFraction', percent(part12.edge_pixel_fraction))
    setMetric('part12.gradientMax', part12.gradient_magnitude_max.toFixed(3))

    setMetric('part13.kernel', `${part13.gaussian_kernel_size} × ${part13.gaussian_kernel_size}`)
    setMetric('part13.sigma', part13.gaussian_sigma.toFixed(1))
    setMetric('part13.threshold', part13.edge_threshold.toFixed(2))
    setMetric('part13.interiorError', scientific(part13.max_magnitude_difference_interior))
    setMetric('part13.edgeDisagreement', percent(part13.edge_map_disagreement_fraction_interior))

    setMetric('part21.kernel', `${part21.gaussian_kernel_size} × ${part21.gaussian_kernel_size}`)
    setMetric('part21.sigma', part21.gaussian_sigma.toFixed(1))
    setMetric('part21.alpha', part21.sharpen_amount.toFixed(1))
    setMetric('part21.palaceError', part21.palace_mean_absolute_error.toFixed(4))

    setMetric('part22.size', `${part22.output_size[1]} × ${part22.output_size[0]}`)
    setMetric('part22.pairs', String(part22.pairs))

    setMetric('part23.levels', String(part23.levels))
    setMetric('part23.sigma', part23.base_sigma.toFixed(1))
    setMetric('part23.appleError', scientific(part23.apple_reconstruction_max_error))
    setMetric('part23.orangeError', scientific(part23.orange_reconstruction_max_error))

    setMetric('part24.orapleLevels', String(part24.oraple_levels))
    setMetric('part24.orapleSigma', part24.oraple_sigma.toFixed(1))
    setMetric('part24.customLevels', String(part24.custom_levels))
    setMetric('part24.customSigma', part24.custom_sigma.toFixed(1))
  } else {
    document.querySelectorAll('[data-metric]').forEach(element => {
      element.textContent = 'Unavailable'
    })
  }
})()
