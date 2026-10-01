window.project2Content = {
  eyebrow: "Project 2",
  title: "Fun with Filters<br>and Frequencies",
  subtitle: "Convolution, sharpening, hybrid images, and multiresolution blending",

  part11Heading: "1.1 →<br>Convolutions from Scratch",
  part11Lead: `I implemented zero-padded, same-size 2D convolution twice using only NumPy: first with four explicit loops, then with two loops and a vectorized inner product.`,
  part11Method: `Both implementations convert their inputs to floating point, pad the image with zeros, and flip the kernel vertically and horizontally. The flip distinguishes convolution from cross-correlation. For odd kernels such as the 9 × 9 box filter, the padding is symmetric. For even kernels such as \\(D_x\\), the extra zero column or row is placed consistently with SciPy’s <span class="inline-code">mode="same"</span>.`,
  part11Caption: `The color source is converted to grayscale only in memory.`,
  fourLoopLabel: "Four-loop convolution",
  twoLoopLabel: "Two-loop convolution",
  scipyLabel: `SciPy <code>convolve2d</code>`,
  fourLoopErrorLabel: "Four-loop maximum error vs. SciPy",
  twoLoopErrorLabel: "Two-loop maximum error vs. SciPy",
  fourLoopTestLabel: "Four-loop asymmetric-kernel error",
  twoLoopTestLabel: "Two-loop asymmetric-kernel error",
  part11Runtime: `The four-loop implementation performs every multiplication and addition in Python. The two-loop version delegates each kernel-sized inner product to NumPy, making it about an order of magnitude faster. SciPy is another order of magnitude faster because the convolution runs in optimized compiled code. Both custom results agree with <code>scipy.signal.convolve2d</code> to within \\(1.8\\times10^{-15}\\). A separate asymmetric kernel test confirms that the kernel is actually flipped.`,
  part11Boundary: `At the boundary, all three methods assume pixels outside the image are zero. This creates a dark frame for averaging filters and strong derivative responses where a bright image edge meets the padded zeros.`,

  part12Heading: "1.2 →<br>Finite Difference Operator",
  part12Lead: `Finite differences approximate the horizontal and vertical image derivatives. Combining them produces a direction-independent measure of local change.`,
  part12Equation: `\\[D_x=\\begin{bmatrix}1&-1\\end{bmatrix},\\qquad D_y=\\begin{bmatrix}1\\\\-1\\end{bmatrix},\\qquad \\|\\nabla I\\|=\\sqrt{(I*D_x)^2+(I*D_y)^2}.\\]`,
  part12Caption: "Finite-difference responses and the resulting edge map.",
  part12ThresholdLabel: "Selected edge threshold",
  part12EdgeFractionLabel: "Pixels retained as edges",
  part12GradientMaxLabel: "Maximum gradient magnitude",
  part12Threshold: `I binarized the gradient magnitude at 0.20. Lower thresholds keep more faint texture but turn much of the grass and sky into noise. Higher thresholds clean up those regions but begin to erase the cameraman’s outline and details in the camera. At 0.20, the subject, camera, tripod, and horizon remain while most weak texture disappears. About 4.25% of the pixels remain as edges.`,

  part13Heading: "1.3 →<br>Derivative of Gaussian",
  part13Lead: `The raw finite difference is sensitive to high-frequency texture. I first smooth the image with a 9 × 9 Gaussian with \\(\\sigma=2\\), then differentiate the smoother signal.`,
  part13Method: `I construct the 2D Gaussian as the outer product of the 1D vector returned by <code>cv2.getGaussianKernel</code>. Because its individual unit-sum weights are small, I divide the kernel by its maximum only for visualization. The convolution still uses the original normalized kernel. After smoothing, a lower threshold of 0.08 recovers the important boundaries. Compared with Part 1.2, the response contains fewer isolated grass and sky edges, and the principal contours are thicker, cleaner, and more continuous.`,
  part13SmoothCaption: "Gaussian smoothing followed by finite differences.",
  part13DogHeading: "One convolution instead of two",
  part13DogMethod: `Convolution is associative, so I can convolve the Gaussian with each finite difference operator once, creating two derivative-of-Gaussian filters. I use full convolution while constructing these filters so no derivative coefficient is cropped. The resulting filters have sizes 9 × 10 and 10 × 9.`,
  part13DogCaption: "The two DoG filters, followed by the two-step and single-convolution gradient results.",
  part13KernelLabel: "Gaussian kernel size",
  part13SigmaLabel: "Gaussian sigma",
  part13ThresholdLabel: "Smoothed edge threshold",
  part13InteriorErrorLabel: "Maximum interior magnitude difference",
  part13DisagreementLabel: "Interior edge map disagreement",
  part13Comparison: `Away from the zero-padded boundary, the two gradient magnitudes agree to within \\(6.8\\times10^{-16}\\), and their thresholded edge maps agree at every interior pixel. Differences occur only near the image boundary because the two-step route encounters padding once during smoothing and again during differentiation, whereas the combined DoG route encounters it once.`,

  part21Heading: `2.1 →<br>Image “Sharpening”`,
  part21Lead: `Unsharp masking makes an image appear sharper by amplifying the detail removed by a Gaussian low-pass filter. If \\(G_\\sigma\\) is the Gaussian, then \\(I-G_\\sigma*I\\) is the high-frequency residual.`,
  part21Equation: `\\[I_{\\mathrm{sharp}}=I+\\alpha(I-G_\\sigma*I)=\\bigl((1+\\alpha)\\delta-\\alpha G_\\sigma\\bigr)*I.\\]`,
  part21Method: `I use a 13 × 13 Gaussian with \\(\\sigma=2\\) and \\(\\alpha=1.5\\) for the main examples. Writing the operation as the single kernel \\((1+\\alpha)\\delta-\\alpha G_\\sigma\\) produces the same result as blurring, subtracting, and adding the residual, with maximum discrepancies below \\(2.3\\times10^{-15}\\).`,
  part21KernelLabel: "Unsharp Gaussian",
  part21SigmaLabel: "Gaussian sigma",
  part21AlphaLabel: "Default sharpening amount",
  part21PalaceErrorLabel: "Palace recovery mean absolute error",
  tajHeading: "Taj Mahal",
  tajExplanation: `The blur removes stone texture and fine architectural edges. The residual picks out those details around the dome, arches, and minarets. Adding it back increases local contrast without changing the broad structure of the image.`,
  processStripLabel: "Frequency components",
  directComparisonLabel: "Original and sharpened comparison",
  tajAlphaHeading: "Varying the sharpening amount",
  tajAlphaExplanation: `At \\(\\alpha=0.5\\), the change is subtle. Values of 1 and 2 make the masonry and silhouette progressively stronger. At \\(\\alpha=4\\), the edges look outlined and the image starts to look processed. Sharpening increases contrast, but it does not recover detail that was never there.`,
  sfStreetHeading: "San Francisco, 1967",
  sfStreetExplanation: `The filter emphasizes lettering, window frames, cables, and the street car. It also strengthens film grain, a reminder that high-frequency enhancement cannot distinguish texture from noise.`,
  sfSatelliteHeading: "San Francisco Bay from orbit",
  sfSatelliteExplanation: `Shorelines, bridges, runways, and salt-pond boundaries become easier to distinguish after sharpening. The broad atmospheric and water gradients remain in the low-frequency component.`,
  palaceHeading: "Blur, then recover",
  palaceExplanation: `For this test, I start with my sharp Palace of Fine Arts photograph, blur it with a 19 × 19 Gaussian at \\(\\sigma=3\\), then apply unsharp masking with \\(\\alpha=3\\). The result restores some edge contrast around the columns and dome, but it is still softer than the original. Its mean absolute error is 0.0371 because the lost frequencies cannot be reconstructed. Unsharp masking can only amplify what remains.`,

  part22Heading: "2.2 →<br>Hybrid Images",
  part22Lead: `A hybrid image combines the low frequencies of one aligned image with the high frequencies of another. Fine detail dominates up close. From farther away, that detail fades and the smooth low-frequency subject takes over.`,
  part22Method: `I align every pair by mapping two eye landmarks to a shared output geometry, then apply Gaussian low-pass and high-pass filters with independently chosen cutoffs. All hybrids are 800 × 700 pixels. I retain color only in the low-frequency image and use a grayscale high-frequency component. This keeps the distant identity vivid while preventing colored high-frequency fringes from competing at close range.`,
  hybridZoomExplanation: `Viewing distance changes which spatial frequencies survive. Use each scale control to enlarge the hybrid for its high-frequency identity or shrink it until the low-frequency identity takes over.`,
  hybridFarLabel: "Far / smaller",
  hybridNearLabel: "Near / larger",
  hybridScaleLabel: "Displayed size",
  part22SizeLabel: "Aligned output size",
  part22PairsLabel: "Hybrid pairs explored",
  derekHeading: "Derek and Nutmeg",
  derekExplanation: `The assignment pair uses \\(\\sigma_{low}=12\\), \\(\\sigma_{high}=8\\), a 1.45 high-frequency gain, and a 0.55 final blend gain. Like the reference example, it combines Derek’s low-pass portrait with Nutmeg’s high-pass portrait across the entire frame. The stronger blur softens Derek’s mouth and shirt while preserving his broad facial structure. Up close, Nutmeg’s fur, eyes, whiskers, and coat dominate. Farther away, those details fade and Derek’s face emerges.`,
  cruyffHeading: "Johan Cruyff and Luka Modrić",
  cruyffExplanation: `Some footballers look alike! One of such examples is Johan Cruyff and Luka Modric, two influential players of their generations. Johan Cruyff is a Netherlands national team icon in the 1970s and three-time Ballon d’Or winner, while Luka Modrić is an active player who once captained the Croatia national team to the 2018 world cup final and won the Ballon d’Or in the same year. The Cruyff portrait here supplies the smooth distant structure with \\(\\sigma_{low}=10\\), and Modric portrait supplies the close-range detail with \\(\\sigma_{high}=4\\). Up close, we see Modrić. Farther away, we see Cruyff. This is my favorite hybrid and the one I use for the frequency analysis. Matching their eyes and face scale keeps the outline stable as the viewing distance changes.`,
  cruyffCutoffHeading: "Choosing the cutoff frequencies",
  cruyffCutoffExplanation: `I selected the cutoffs with two controlled sweeps, judging every result both at full size and as a small thumbnail. Since Gaussian \\(\\sigma\\) controls the amount of smoothing, changing it changes the effective cutoff frequency. I varied only one filter at a time so I could attribute each visual change to that filter.`,
  cruyffLowSweepHeading: "1. Low-pass sweep for Cruyff",
  cruyffLowSweepExplanation: `I first held Modrić’s high-pass setting at \\(\\sigma_{high}=4\\) and tried \\(\\sigma_{low}=6,10,14\\) for Cruyff. At 6, Cruyff keeps too much fine facial and hair detail, which competes with Modrić up close. At 14, Cruyff becomes overly diffuse and loses useful distant structure. I kept 10 as the middle ground.`,
  cruyffHighSweepHeading: "2. High-pass sweep for Modrić",
  cruyffHighSweepExplanation: `With Cruyff fixed at \\(\\sigma_{low}=10\\), I then tried \\(\\sigma_{high}=2,4,6\\) for Modrić. At 2, too little detail survives and Modrić is hard to recognize up close. At 6, broader features survive shrinking and interfere with Cruyff from far away. I therefore selected \\(\\sigma_{high}=4\\). The final pair is \\(\\sigma_{low}=10\\), \\(\\sigma_{high}=4\\).`,
  cruyffFinalHeading: "Final results",
  finalBlendSubtitle: "Final blend",
  cruyffProcessHeading: "Alignment and filtering",
  cruyffFourierHeading: "Fourier-domain explanation",
  cruyffFourierExplanation: `The centered bright region in each log-magnitude spectrum represents low spatial frequencies. Gaussian filtering concentrates Cruyff’s spectrum near that center, while subtracting the Gaussian suppresses Modrić’s center and retains energy farther out. The hybrid spectrum contains both structures: a bright low-frequency core plus the distributed high-frequency detail.`,
  mounetHeading: "Paul Mounet and Keanu Reeves",
  mounetExplanation: `A tighter eye spacing crops both faces to a comparable scale. The painted portrait supplies the low frequencies at \\(\\sigma=11\\), while Reeves supplies the high-frequency expression at \\(\\sigma=5\\). Up close, we see Keanu Reeves. Farther away, we see Paul Mounet.`,
  morraHeading: "Sebastián de Morra and Peter Dinklage",
  morraExplanation: `I enlarge the painting around the face so the eyes, nose, and beard region line up. I reduce Dinklage’s high-frequency gain to 0.6 because his beard and photographic texture otherwise overpower the painted portrait. Up close, we see Peter Dinklage. Farther away, we see Sebastián de Morra.`,

  part23Heading: "2.3 →<br>Gaussian & Laplacian Stacks",
  part23Lead: `A stack separates an image into frequency bands without downsampling: every level retains the original 300 × 300 dimensions.`,
  part23Method: `Starting from the image, I repeatedly apply a Gaussian with base \\(\\sigma=2\\) to form five Gaussian levels. Each Laplacian level is the difference between adjacent Gaussian levels, and the final residual is the coarsest Gaussian. Summing the Laplacian levels reconstructs the input to floating-point precision.`,
  part23LevelsLabel: "Stack levels",
  part23SigmaLabel: "Base Gaussian sigma",
  part23AppleErrorLabel: "Apple reconstruction error",
  part23OrangeErrorLabel: "Orange reconstruction error",
  gaussianStacksHeading: "Gaussian stacks",
  gaussianStacksExplanation: `Successive smoothing removes progressively broader detail while every image remains the same size.`,
  laplacianStacksHeading: "Laplacian stacks",
  laplacianStacksExplanation: `The fine bands isolate edges and texture. Later bands contain broader lighting and color changes. The final level holds the low-frequency residual needed to reconstruct the image.`,
  figure342Heading: "Recreating Figure 3.42",
  figure342Explanation: `At fine, middle, and coarse scales, I multiply the apple and orange Laplacian bands by the corresponding levels of a Gaussian-blurred vertical mask. Adding the two masked contributions produces each blended band. The bottom row reconstructs the masked apple, masked orange, and final oraple.`,

  part24Heading: "2.4 →<br>Multiresolution Blending",
  part24Lead: `Multiresolution blending gives each frequency band its own softened seam. A Gaussian stack of the mask controls where the Laplacian bands from images \\(A\\) and \\(B\\) contribute.`,
  part24Equation: `\\[L_k^{\\mathrm{blend}}=G_k(M)L_k(A)+(1-G_k(M))L_k(B),\\qquad I^{\\mathrm{blend}}=\\sum_k L_k^{\\mathrm{blend}}.\\]`,
  part24Method: `The oraple uses five levels with base \\(\\sigma=2\\). The two irregular-mask examples use six levels with \\(\\sigma=3\\), giving their larger images a wider transition region. All processing is performed in color.`,
  part24OrapleLevelsLabel: "Oraple stack levels",
  part24OrapleSigmaLabel: "Oraple base sigma",
  part24CustomLevelsLabel: "Custom blend levels",
  part24CustomSigmaLabel: "Custom blend sigma",
  orapleHeading: "The oraple",
  orapleExplanation: `A vertical step mask chooses apple on the left and orange on the right. Blurring that mask separately at every stack level removes the hard center seam while retaining sharp texture away from it.`,
  eyeHandHeading: "Eye in the palm",
  eyeHandExplanation: `This is my favorite custom blend. I crop below the brow, rotate the complete eye patch with its elliptical mask, and center both on the palm. The mask follows the eyeball more naturally than a line, while its Gaussian stack transfers sharp eyelashes at fine scales and soft illumination at coarse scales.`,
  eyeHandStackHeading: "Eye-in-the-palm stack breakdown",
  eyeHandStackExplanation: `This follows Figure 10 in Burt and Adelson. The first three rows show levels 0, 2, and 4 as representative high-, medium-, and low-frequency bands. The columns show the masked eye contribution, masked hand contribution, and their sum. The remaining stack levels are included in reconstruction even though they are not displayed. The bottom row reconstructs the masked eye, reconstructs the masked hand, and adds them to produce the final blend.`,
  moonFrameHeading: "Moon in an empty frame",
  moonFrameExplanation: `A circular mask places the Moon inside the frame. Multiresolution blending softens the lunar boundary into the wall’s lighting while preserving crater detail and the frame’s ornate texture.`,

  lessonHeading: "What I Learned →",
  lesson: `The main thing I learned is that frequency gives a useful way to decide what an image operation should keep. The same idea came up throughout the project. Sharpening adds selected high frequencies, hybrid images give low and high frequencies different subjects, and multiresolution blending handles a seam at several scales. Breaking an image into frequency bands made each of these operations easier to reason about.`,

  sourcesHeading: "Image Sources →",
  sourceLinks: [
    {
      label: "NASA · San Francisco Bay from STS-58",
      resolution: "640 × 480 pixels",
      url: "https://eol.jsc.nasa.gov/searchphotos/photo.pl?frame=23&mission=STS058&roll=83"
    },
    {
      label: "Vintag.es · San Francisco in 1967",
      url: "https://www.vintag.es/2022/02/san-francisco-1967.html"
    },
    {
      label: "Wikimedia Commons · Johan Cruyff in 1974",
      resolution: "Full resolution",
      url: "https://commons.wikimedia.org/wiki/File:Johan_Cruyff_en_1974.jpg"
    },
    {
      label: "NTT Docomo · Luka Modrić",
      url: "https://soccer.sports.smt.docomo.ne.jp/wc2018/img/player/603356.jpg"
    },
    {
      label: "Wikimedia Commons · Portrait of Paul Mounet",
      resolution: "Full resolution",
      url: "https://commons.wikimedia.org/wiki/File:Portrait_de_Paul_Mounet_By_Louis-Maurice_Boutet_de_Montvel.jpg"
    },
    {
      label: "The Guardian · Keanu Reeves",
      url: "https://www.theguardian.com/film/2019/may/18/keanu-reeves-grief-loss--bill-ted-john-wick-actor-tragedy"
    },
    {
      label: "Wikimedia Commons · Sebastián de Morra",
      resolution: "Full resolution",
      url: "https://commons.wikimedia.org/wiki/File:Sebasti%C3%A1n_Morra_(Vel%C3%A1zquez)_detail.jpg"
    },
    {
      label: "Wikimedia Commons · Peter Dinklage",
      resolution: "960px",
      url: "https://commons.wikimedia.org/wiki/File:Peter_Dinklage_by_Gage_Skidmore.jpg"
    },
    {
      label: "Wikimedia Commons · Hand at the Beach",
      resolution: "Full resolution",
      url: "https://commons.wikimedia.org/wiki/File:Hand_at_beach_photographed_in_light_from_sunrise.jpg"
    },
    {
      label: "Wikimedia Commons · Brown Eye",
      resolution: "1,280 × 911 pixels",
      url: "https://commons.wikimedia.org/wiki/File:Brown_Eye_(33298147).jpeg"
    },
    {
      label: "Wikimedia Commons · Copped Hall Empty Picture Frame",
      resolution: "1,280 × 1,045 pixels",
      url: "https://commons.wikimedia.org/wiki/File:Copped_Hall_interior_empty_picture_frame,_Epping,_Essex,_England_01.jpg"
    },
    {
      label: "Wikimedia Commons · Large Panorama of the Full Moon",
      resolution: "1,280 × 1,280 pixels",
      url: "https://commons.wikimedia.org/wiki/File:Large_panorama_of_the_full_moon.jpg"
    }
  ],

  hybridDemos: {
    derek: {
      image: "part-2-2/derek_nutmeg_hybrid.jpg",
      alt: "Derek and Nutmeg hybrid image",
      close: "Close: Nutmeg",
      far: "Far: Derek",
      start: 58
    },
    cruyff: {
      image: "part-2-2/cruyff_modric_hybrid.jpg",
      alt: "Johan Cruyff and Luka Modrić hybrid image",
      close: "Close: Luka Modrić",
      far: "Far: Johan Cruyff",
      start: 58
    },
    mounet: {
      image: "part-2-2/mounet_keanu_hybrid.jpg",
      alt: "Paul Mounet and Keanu Reeves hybrid image",
      close: "Close: Keanu Reeves",
      far: "Far: Paul Mounet",
      start: 58
    },
    morra: {
      image: "part-2-2/morra_dinklage_hybrid.jpg",
      alt: "Sebastián de Morra and Peter Dinklage hybrid image",
      close: "Close: Peter Dinklage",
      far: "Far: Sebastián de Morra",
      start: 58
    }
  },

  galleries: {
    tajProcess: [
      ["part-2-1/taj_original.jpg", "Original"],
      ["part-2-1/taj_blurred.jpg", "Gaussian low frequencies"],
      ["part-2-1/taj_high_frequency.jpg", "High-frequency residual (centered for display)"],
      ["part-2-1/taj_sharpened.jpg", "Sharpened, α = 1.5"]
    ],
    tajComparison: [
      ["part-2-1/taj_original.jpg", "Original"],
      ["part-2-1/taj_sharpened.jpg", "Sharpened, α = 1.5"],
      ["part-2-1/taj_blurred.jpg", "Gaussian low frequencies"],
      ["part-2-1/taj_high_frequency.jpg", "High-frequency residual (centered for display)"]
    ],
    tajAlpha: [
      ["part-2-1/taj_alpha_0.5.jpg", "α = 0.5"],
      ["part-2-1/taj_alpha_1.jpg", "α = 1"],
      ["part-2-1/taj_alpha_2.jpg", "α = 2"],
      ["part-2-1/taj_alpha_4.jpg", "α = 4"]
    ],
    sfStreet: [
      ["part-2-1/sf_street_original.jpg", "Original"],
      ["part-2-1/sf_street_blurred.jpg", "Gaussian low frequencies"],
      ["part-2-1/sf_street_high_frequency.jpg", "High-frequency residual"],
      ["part-2-1/sf_street_sharpened.jpg", "Sharpened"]
    ],
    sfStreetComparison: [
      ["part-2-1/sf_street_original.jpg", "Original"],
      ["part-2-1/sf_street_sharpened.jpg", "Sharpened"],
      ["part-2-1/sf_street_blurred.jpg", "Gaussian low frequencies"],
      ["part-2-1/sf_street_high_frequency.jpg", "High-frequency residual"]
    ],
    sfSatellite: [
      ["part-2-1/sf_satellite_original.jpg", "Original"],
      ["part-2-1/sf_satellite_blurred.jpg", "Gaussian low frequencies"],
      ["part-2-1/sf_satellite_high_frequency.jpg", "High-frequency residual"],
      ["part-2-1/sf_satellite_sharpened.jpg", "Sharpened"]
    ],
    sfSatelliteComparison: [
      ["part-2-1/sf_satellite_original.jpg", "Original"],
      ["part-2-1/sf_satellite_sharpened.jpg", "Sharpened"],
      ["part-2-1/sf_satellite_blurred.jpg", "Gaussian low frequencies"],
      ["part-2-1/sf_satellite_high_frequency.jpg", "High-frequency residual"]
    ],
    palaceRecovery: [
      ["part-2-1/palace_original.jpg", "Original sharp photograph"],
      ["part-2-1/palace_blurred.jpg", "Artificially blurred, σ = 3"],
      ["part-2-1/palace_resharpened.jpg", "Resharpened, α = 3"]
    ],
    derekHybrid: [
      ["part-2-2/originals/derek.jpg", "Original Derek"],
      ["part-2-2/originals/nutmeg.jpg", "Original Nutmeg"],
      ["part-2-2/derek_nutmeg_hybrid.jpg?v=10", "Color hybrid"],
      ["part-2-2/derek_nutmeg_hybrid_gray.jpg?v=10", "Grayscale hybrid"]
    ],
    cruyffOriginals: [
      ["part-2-2/originals/cruyff.jpg", "Original Johan Cruyff"],
      ["part-2-2/originals/modric.jpg", "Original Luka Modrić"]
    ],
    cruyffAlignment: [
      ["part-2-2/cruyff_modric_low_aligned.jpg", "Cruyff aligned"],
      ["part-2-2/cruyff_modric_high_aligned.jpg", "Modrić aligned"]
    ],
    cruyffFiltered: [
      ["part-2-2/cruyff_modric_low_filtered.jpg", "Cruyff low-pass, σ = 10"],
      ["part-2-2/cruyff_modric_high_filtered.jpg", "Modrić high-pass, σ = 4"]
    ],
    cruyffLowCutoffSweep: [
      ["part-2-2/cruyff_modric_cutoff_low_6_high_4.jpg", "σ low = 6, σ high fixed at 4"],
      ["part-2-2/cruyff_modric_cutoff_low_10_high_4.jpg", "Selected low-pass: σ low = 10"],
      ["part-2-2/cruyff_modric_cutoff_low_14_high_4.jpg", "σ low = 14, σ high fixed at 4"]
    ],
    cruyffHighCutoffSweep: [
      ["part-2-2/cruyff_modric_cutoff_low_10_high_2.jpg", "σ high = 2, σ low fixed at 10"],
      ["part-2-2/cruyff_modric_cutoff_low_10_high_4.jpg", "Selected high-pass: σ high = 4"],
      ["part-2-2/cruyff_modric_cutoff_low_10_high_6.jpg", "σ high = 6, σ low fixed at 10"]
    ],
    cruyffFinal: [
      ["part-2-2/cruyff_modric_hybrid.jpg", "Color hybrid"],
      ["part-2-2/cruyff_modric_hybrid_gray.jpg", "Grayscale hybrid"]
    ],
    cruyffFourier: [
      ["part-2-2/cruyff_modric_fft_low_input.jpg", "Cruyff input spectrum"],
      ["part-2-2/cruyff_modric_fft_high_input.jpg", "Modrić input spectrum"],
      ["part-2-2/cruyff_modric_fft_low_filtered.jpg", "Low-pass spectrum"],
      ["part-2-2/cruyff_modric_fft_high_filtered.jpg", "High-pass spectrum"],
      ["part-2-2/cruyff_modric_fft_hybrid.jpg", "Hybrid spectrum"]
    ],
    mounetHybrid: [
      ["part-2-2/originals/mounet.jpg", "Original Paul Mounet portrait"],
      ["part-2-2/originals/keanu.avif", "Original Keanu Reeves"],
      ["part-2-2/mounet_keanu_hybrid.jpg", "Color hybrid"],
      ["part-2-2/mounet_keanu_hybrid_gray.jpg", "Grayscale hybrid"]
    ],
    morraHybrid: [
      ["part-2-2/originals/morra.jpg", "Original Sebastián de Morra detail"],
      ["part-2-2/originals/dinklage.jpg", "Original Peter Dinklage"],
      ["part-2-2/morra_dinklage_hybrid.jpg", "Color hybrid"],
      ["part-2-2/morra_dinklage_hybrid_gray.jpg", "Grayscale hybrid"]
    ],
    appleGaussian: [
      ["part-2-3/apple_gaussian_0.jpg", "Level 0"],
      ["part-2-3/apple_gaussian_1.jpg", "Level 1"],
      ["part-2-3/apple_gaussian_2.jpg", "Level 2"],
      ["part-2-3/apple_gaussian_3.jpg", "Level 3"],
      ["part-2-3/apple_gaussian_4.jpg", "Level 4"]
    ],
    orangeGaussian: [
      ["part-2-3/orange_gaussian_0.jpg", "Level 0"],
      ["part-2-3/orange_gaussian_1.jpg", "Level 1"],
      ["part-2-3/orange_gaussian_2.jpg", "Level 2"],
      ["part-2-3/orange_gaussian_3.jpg", "Level 3"],
      ["part-2-3/orange_gaussian_4.jpg", "Level 4"]
    ],
    appleLaplacian: [
      ["part-2-3/apple_laplacian_0.jpg", "Level 0"],
      ["part-2-3/apple_laplacian_1.jpg", "Level 1"],
      ["part-2-3/apple_laplacian_2.jpg", "Level 2"],
      ["part-2-3/apple_laplacian_3.jpg", "Level 3"],
      ["part-2-3/apple_laplacian_4.jpg", "Low-frequency residual"]
    ],
    orangeLaplacian: [
      ["part-2-3/orange_laplacian_0.jpg", "Level 0"],
      ["part-2-3/orange_laplacian_1.jpg", "Level 1"],
      ["part-2-3/orange_laplacian_2.jpg", "Level 2"],
      ["part-2-3/orange_laplacian_3.jpg", "Level 3"],
      ["part-2-3/orange_laplacian_4.jpg", "Low-frequency residual"]
    ],
    figure342: [
      ["part-2-3/figure_3_42_a.jpg", "(a) Apple contribution · fine"],
      ["part-2-3/figure_3_42_b.jpg", "(b) Orange contribution · fine"],
      ["part-2-3/figure_3_42_c.jpg", "(c) Blended band · fine"],
      ["part-2-3/figure_3_42_d.jpg", "(d) Apple contribution · middle"],
      ["part-2-3/figure_3_42_e.jpg", "(e) Orange contribution · middle"],
      ["part-2-3/figure_3_42_f.jpg", "(f) Blended band · middle"],
      ["part-2-3/figure_3_42_g.jpg", "(g) Apple contribution · coarse"],
      ["part-2-3/figure_3_42_h.jpg", "(h) Orange contribution · coarse"],
      ["part-2-3/figure_3_42_i.jpg", "(i) Blended band · coarse"],
      ["part-2-3/figure_3_42_j.jpg", "(j) Reconstructed masked apple"],
      ["part-2-3/figure_3_42_k.jpg", "(k) Reconstructed masked orange"],
      ["part-2-3/figure_3_42_l.jpg", "(l) Final oraple"]
    ],
    orapleBlend: [
      ["part-2-4/oraple_input_a.jpg", "Apple"],
      ["part-2-4/oraple_input_b.jpg", "Orange"],
      ["part-2-4/oraple_mask.jpg", "Vertical mask"],
      ["part-2-4/oraple_masked_a.jpg", "Masked apple"],
      ["part-2-4/oraple_masked_b.jpg", "Masked orange"],
      ["part-2-4/oraple_blend.jpg", "Multiresolution blend"]
    ],
    eyeHandBlend: [
      ["part-2-4/eye_hand_input_a.jpg", "Eye placement preview"],
      ["part-2-4/eye_hand_input_b.jpg", "Hand"],
      ["part-2-4/eye_hand_mask.jpg", "Rotated elliptical mask"],
      ["part-2-4/eye_hand_masked_a.jpg", "Masked eye"],
      ["part-2-4/eye_hand_masked_b.jpg", "Masked hand"],
      ["part-2-4/eye_hand_blend.jpg", "Final blend"]
    ],
    eyeHandStack: [
      ["part-2-4/eye_hand_figure_a.jpg", "(a) Eye contribution · fine"],
      ["part-2-4/eye_hand_figure_e.jpg", "(e) Hand contribution · fine"],
      ["part-2-4/eye_hand_figure_i.jpg", "(i) Blended band · fine"],
      ["part-2-4/eye_hand_figure_b.jpg", "(b) Eye contribution · middle"],
      ["part-2-4/eye_hand_figure_f.jpg", "(f) Hand contribution · middle"],
      ["part-2-4/eye_hand_figure_j.jpg", "(j) Blended band · middle"],
      ["part-2-4/eye_hand_figure_c.jpg", "(c) Eye contribution · coarse"],
      ["part-2-4/eye_hand_figure_g.jpg", "(g) Hand contribution · coarse"],
      ["part-2-4/eye_hand_figure_k.jpg", "(k) Blended band · coarse"],
      ["part-2-4/eye_hand_figure_d.jpg", "(d) Reconstructed masked eye"],
      ["part-2-4/eye_hand_figure_h.jpg", "(h) Reconstructed masked hand"],
      ["part-2-4/eye_hand_figure_l.jpg", "(l) Final eye-in-palm blend"]
    ],
    moonFrameBlend: [
      ["part-2-4/moon_frame_input_a.jpg", "Moon canvas"],
      ["part-2-4/moon_frame_input_b.jpg", "Empty frame"],
      ["part-2-4/moon_frame_mask.jpg", "Circular mask"],
      ["part-2-4/moon_frame_blend.jpg", "Final blend"]
    ]
  }
}
