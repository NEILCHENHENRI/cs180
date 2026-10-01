window.project2Metrics = {
  part11: {
    image_shape: [720, 405],
    boundary_handling: "same-size output with explicit zero padding",
    kernel_handling: "kernel flipped vertically and horizontally",
    comparison_implementation: "scipy.signal.convolve2d",
    seconds: {
      four_loops_9x9: 6.8224374579731375,
      two_loops_9x9: 0.632674666994717,
      scipy_9x9: 0.028767416020855308
    },
    max_abs_error_vs_scipy: {
      four_loops_9x9: 1.7763568394002505e-15,
      two_loops_9x9: 6.661338147750939e-16,
      four_loops_asymmetric_test: 0,
      two_loops_asymmetric_test: 0
    }
  },
  part12: {
    image_shape: [542, 540],
    edge_threshold: 0.2,
    edge_pixel_fraction: 0.04245250785841192,
    gradient_magnitude_max: 1.4142135623730951
  },
  part13: {
    gaussian_kernel_size: 9,
    gaussian_sigma: 2,
    edge_threshold: 0.08,
    smoothed_edge_pixel_fraction: 0.047273472734727345,
    dog_edge_pixel_fraction: 0.047246139128057946,
    max_magnitude_difference_all_pixels: 0.3979181556424163,
    max_magnitude_difference_interior: 6.800116025829084e-16,
    mean_magnitude_difference_interior: 7.168249354967616e-17,
    edge_map_disagreement_fraction_interior: 0
  },
  part21: {
    gaussian_kernel_size: 13,
    gaussian_sigma: 2,
    sharpen_amount: 1.5,
    palace_blur_sigma: 3,
    palace_resharpen_amount: 3,
    palace_mean_absolute_error: 0.03707317663196269
  },
  part22: {
    output_size: [700, 800],
    pairs: 4,
    color_strategy: "low-frequency image only"
  },
  part23: {
    levels: 5,
    base_sigma: 2,
    apple_reconstruction_max_error: 1.1102230246251565e-16,
    orange_reconstruction_max_error: 2.7755575615628914e-17
  },
  part24: {
    oraple_levels: 5,
    oraple_sigma: 2,
    custom_levels: 6,
    custom_sigma: 3
  }
}
