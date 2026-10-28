window.project4Content = {
  "pageDocumentTitle": "Project 4A · Image Warping and Mosaicing · Neil Chen",
  "pageAccessibility": {
    "content": "Manual homographies, inverse warping, image rectification, and feather-blended panoramas."
  },
  "pageLink": "Skip to results",
  "headerLabel": "Neil Chen · CS 180 · Fall 2026",
  "headerLink": "← Back",
  "heroDescription": "Project 4 · Part A",
  "heroTitle": "Image Warping<br>&amp; Mosaicing",
  "a1SectionLabel": "A.1<span>Shoot the pictures</span>",
  "a1Description": "I photographed two overlapping sequences: a bay view toward the Golden Gate Bridge and Sausalito, and a view from Emeryville toward Berkeley and the Berkeley Hills. A supplemental mountain pair provides a third mosaic.",
  "a1Heading": "Mountains",
  "a1Description2": "Supplemental images from the <a href=\"https://github.com/opencv/opencv_extra/tree/4.x/testdata/stitching\" target=\"_blank\" rel=\"noopener noreferrer\">OpenCV stitching dataset ↗</a>.",
  "a1Image": {
    "alt": "Source 1"
  },
  "a1Caption": "Source 1",
  "a1Image2": {
    "alt": "Source 2"
  },
  "a1Caption2": "Source 2",
  "a1Heading2": "Waterfronts",
  "a1Image3": {
    "alt": "Source 1"
  },
  "a1Caption3": "Source 1",
  "a1Image4": {
    "alt": "Source 2"
  },
  "a1Caption4": "Source 2",
  "a1Image5": {
    "alt": "Source 3"
  },
  "a1Caption5": "Source 3",
  "a1Heading3": "Berkeley from Emeryville",
  "a1Image6": {
    "alt": "Source 1"
  },
  "a1Caption6": "Source 1",
  "a1Image7": {
    "alt": "Source 2"
  },
  "a1Caption7": "Source 2",
  "a1Image8": {
    "alt": "Source 3"
  },
  "a1Caption8": "Source 3",
  "a2SectionLabel": "A.2<span>Recover homographies</span>",
  "a2Description": "I used a <a href=\"tools/correspondence/index.html\" target=\"_blank\" rel=\"noopener\">correspondence tool ↗</a> to select matching landmarks and export their coordinates.",
  "a2Description2": "I manually selected corresponding landmarks. A homography maps a source point (x, y) to its target (u, v). With h₃₃ fixed to 1, each pair gives two equations for eight unknowns.",
  "a2Accessibility": {
    "aria-label": "Two linear equations per correspondence"
  },
  "a2Description3": "x h₁₁ + y h₁₂ + h₁₃ − u x h₃₁ − u y h₃₂ = u",
  "a2Description4": "x h₂₁ + y h₂₂ + h₂₃ − v x h₃₁ − v y h₃₂ = v",
  "a2Description5": "Stacking these equations gives A h = b. I normalize both point sets, solve the overdetermined system using least squares, and transform the matrix back to the original pixel coordinates.",
  "a2PairLabel": "Mountains · pair 1 · 5 matches",
  "a2Image": {
    "alt": "Mountains · source points"
  },
  "a2Caption": "Mountains · source points",
  "a2Image2": {
    "alt": "Mountains · target points"
  },
  "a2Caption2": "Mountains · target points",
  "a2Description6": "Recovered source-to-target homography matrix:",
  "a2Matrix": " 2.072933   0.1910949  -813.4251\n 0.1327716   2.030395  -316.6558\n 0.0009769153   0.0008091107   1",
  "a2Description7": "Mean fitting residual: 0.55 px, measured at the same points used to estimate H.",
  "a2PairLabel2": "Waterfronts · pair 1 · 5 matches",
  "a2Image3": {
    "alt": "Waterfronts · source points"
  },
  "a2Caption3": "Waterfronts · source points",
  "a2Image4": {
    "alt": "Waterfronts · target points"
  },
  "a2Caption4": "Waterfronts · target points",
  "a2Description8": "Recovered source-to-target homography matrix:",
  "a2Matrix2": " 1.915475  -0.1071809  -2639.886\n 0.2845918   1.501706  -571.8445\n 0.000237318  -4.738674e-05   1",
  "a2Description9": "Mean fitting residual: 0.16 px, measured at the same points used to estimate H.",
  "a2PairLabel3": "Waterfronts · pair 2 · 5 matches",
  "a2Image5": {
    "alt": "Waterfronts · source points"
  },
  "a2Caption5": "Waterfronts · source points",
  "a2Image6": {
    "alt": "Waterfronts · target points"
  },
  "a2Caption6": "Waterfronts · target points",
  "a2Description10": "Recovered source-to-target homography matrix:",
  "a2Matrix3": " 1.614859  -0.04019244  -1818.142\n 0.1912184   1.360977  -478.078\n 0.0001545311  -9.494628e-06   1",
  "a2Description11": "Mean fitting residual: 2.03 px, measured at the same points used to estimate H.",
  "a2PairLabel4": "Berkeley from Emeryville · pair 1 · 6 matches",
  "a2Image7": {
    "alt": "Berkeley from Emeryville · source points"
  },
  "a2Caption7": "Berkeley from Emeryville · source points",
  "a2Image8": {
    "alt": "Berkeley from Emeryville · target points"
  },
  "a2Caption8": "Berkeley from Emeryville · target points",
  "a2Description12": "Recovered source-to-target homography matrix:",
  "a2Matrix4": " 2.100449  -0.06326782  -3103.704\n 0.3551228   1.73452  -891.3084\n 0.0002687541   3.154872e-06   1",
  "a2Description13": "Mean fitting residual: 0.57 px, measured at the same points used to estimate H.",
  "a2PairLabel5": "Berkeley from Emeryville · pair 2 · 5 matches",
  "a2Image9": {
    "alt": "Berkeley from Emeryville · source points"
  },
  "a2Caption9": "Berkeley from Emeryville · source points",
  "a2Image10": {
    "alt": "Berkeley from Emeryville · target points"
  },
  "a2Caption10": "Berkeley from Emeryville · target points",
  "a2Description14": "Recovered source-to-target homography matrix:",
  "a2Matrix5": " 1.956223  -0.05592368  -2728.891\n 0.308112   1.613942  -787.6986\n 0.0002358146  -5.613538e-07   1",
  "a2Description15": "Mean fitting residual: 1.28 px, measured at the same points used to estimate H.",
  "a3SectionLabel": "A.3<span>Warp the images</span>",
  "a3Description": "For every output pixel, I use H⁻¹ to find its source location. Nearest neighbor takes the closest pixel. Bilinear interpolation blends the four surrounding pixels. Both samplers are implemented directly in NumPy.",
  "a3Description2": "For rectification, I select the four corners of a flat object and map them to a rectangle. Its width comes from the longer of the photographed top and bottom edges, and its height from the longer of the left and right edges. Both dimensions are scaled together to cap the longest output edge at 2400 pixels.",
  "a3Heading": "Laptop lid",
  "a3Description3": "The measured image-edge ratio is 1.791:1. The rectified output is 2400 × 1340 pixels.",
  "a3Image": {
    "alt": "Original"
  },
  "a3Caption": "Original",
  "a3Image2": {
    "alt": "Nearest neighbor"
  },
  "a3Caption2": "Nearest neighbor",
  "a3Image3": {
    "alt": "Bilinear"
  },
  "a3Caption3": "Bilinear",
  "a3PairLabel": "Selected corners",
  "a3Image4": {
    "alt": "Laptop lid · selected corners"
  },
  "a3Caption4": "Laptop lid · selected corners",
  "a3Heading2": "Book cover",
  "a3Description4": "The measured image-edge ratio is 1.298:1. The rectified output is 2309 × 1778 pixels.",
  "a3Image5": {
    "alt": "Original"
  },
  "a3Caption5": "Original",
  "a3Image6": {
    "alt": "Nearest neighbor"
  },
  "a3Caption6": "Nearest neighbor",
  "a3Image7": {
    "alt": "Bilinear"
  },
  "a3Caption7": "Bilinear",
  "a3PairLabel2": "Selected corners",
  "a3Image8": {
    "alt": "Book cover · selected corners"
  },
  "a3Caption8": "Book cover · selected corners",
  "a3Heading3": "Speed and quality",
  "a3TableHeading": "Image",
  "a3TableHeading2": "Output",
  "a3TableHeading3": "Nearest neighbor",
  "a3TableHeading4": "Bilinear",
  "a3TableValue": "Laptop lid",
  "a3TableValue2": "2400 × 1340",
  "a3TableValue3": "178.0 ms",
  "a3TableValue4": "451.2 ms",
  "a3TableValue5": "Book cover",
  "a3TableValue6": "2309 × 1778",
  "a3TableValue7": "231.5 ms",
  "a3TableValue8": "612.8 ms",
  "a3Description5": "Median of three runs at the same output size, excluding file loading and saving.",
  "a3Description6": "Nearest neighbor preserves discrete pixel values and can make slanted edges look jagged. Bilinear interpolation gives smoother edges and lettering, with some softening, and takes longer because it combines four samples.",
  "a4SectionLabel": "A.4<span>Blend the mosaics</span>",
  "a4Description": "I leave the reference image in its own perspective and warp the other photos onto a shared canvas. For three photos, the middle image is the reference. The right image uses the inverse of the middle-to-right homography.",
  "a4Description2": "Each valid pixel is weighted by its distance from the edges of its original image. The final color is the weighted average of all contributing images. This feathering reduces abrupt seams. Areas outside every image remain transparent.",
  "a4Heading": "Mountains",
  "a4Image": {
    "alt": "Mountain source 1 in grayscale"
  },
  "a4Caption": "Source 1 · grayscale",
  "a4Image2": {
    "alt": "Mountain source 2 in grayscale"
  },
  "a4Caption2": "Source 2 · grayscale",
  "a4Image4": {
    "alt": "Grayscale mountain mosaic"
  },
  "a4Caption4": "Grayscale mountain mosaic.",
  "a4Heading2": "Waterfronts",
  "a4Image5": {
    "alt": "Source 1"
  },
  "a4Caption5": "Source 1",
  "a4Image6": {
    "alt": "Source 2"
  },
  "a4Caption6": "Source 2",
  "a4Image7": {
    "alt": "Source 3"
  },
  "a4Caption7": "Source 3",
  "a4Image8": {
    "alt": "View toward the Golden Gate Bridge and Sausalito. Some distant skyline features remain misaligned."
  },
  "a4Caption8": "View toward the Golden Gate Bridge and Sausalito. Some distant skyline features remain misaligned.",
  "a4Heading3": "Berkeley from Emeryville",
  "a4Image9": {
    "alt": "Source 1"
  },
  "a4Caption9": "Source 1",
  "a4Image10": {
    "alt": "Source 2"
  },
  "a4Caption10": "Source 2",
  "a4Image11": {
    "alt": "Source 3"
  },
  "a4Caption11": "Source 3",
  "a4Image12": {
    "alt": "Berkeley and the Berkeley Hills, viewed from Emeryville. Some ghosting remains around the nearby tree and structures."
  },
  "a4Caption12": "Berkeley and the Berkeley Hills, viewed from Emeryville. Some ghosting remains around the nearby tree and structures.",
  "a4Description4": "Blending softens transitions, but it cannot correct geometric mismatch. Manual point placement, nearby objects, and differences between views can still leave doubled edges.",
  "viewerAccessibility": {
    "aria-label": "Image viewer"
  },
  "viewerButton": "Close ×",
  "matrixSymbol": "H =",
  "matrixAccessibility": {
    "aria-label": "Recovered homography matrix H"
  },
  "matrixValuesAccessibility": {
    "aria-label": "3 by 3 homography matrix"
  },
  "a1CaptionFullView": "Mountains · Source 1",
  "a1Caption2FullView": "Mountains · Source 2",
  "a1Caption3FullView": "Waterfronts · Source 1",
  "a1Caption4FullView": "Waterfronts · Source 2",
  "a1Caption5FullView": "Waterfronts · Source 3",
  "a1Caption6FullView": "Berkeley from Emeryville · Source 1",
  "a1Caption7FullView": "Berkeley from Emeryville · Source 2",
  "a1Caption8FullView": "Berkeley from Emeryville · Source 3",
  "a2CaptionFullView": "Mountains · pair 1 · source points",
  "a2Caption2FullView": "Mountains · pair 1 · target points",
  "a2Caption3FullView": "Waterfronts · pair 1 · source points",
  "a2Caption4FullView": "Waterfronts · pair 1 · target points",
  "a2Caption5FullView": "Waterfronts · pair 2 · source points",
  "a2Caption6FullView": "Waterfronts · pair 2 · target points",
  "a2Caption7FullView": "Berkeley from Emeryville · pair 1 · source points",
  "a2Caption8FullView": "Berkeley from Emeryville · pair 1 · target points",
  "a2Caption9FullView": "Berkeley from Emeryville · pair 2 · source points",
  "a2Caption10FullView": "Berkeley from Emeryville · pair 2 · target points",
  "a3CaptionFullView": "Laptop lid · Original",
  "a3Caption2FullView": "Laptop lid · Nearest neighbor",
  "a3Caption3FullView": "Laptop lid · Bilinear",
  "a3Caption4FullView": "Laptop lid · selected corners",
  "a3Caption5FullView": "Book cover · Original",
  "a3Caption6FullView": "Book cover · Nearest neighbor",
  "a3Caption7FullView": "Book cover · Bilinear",
  "a3Caption8FullView": "Book cover · selected corners",
  "a4CaptionFullView": "Mountains · Source 1 · grayscale",
  "a4Caption2FullView": "Mountains · Source 2 · grayscale",
  "a4Caption4FullView": "Grayscale mountain mosaic.",
  "a4Caption5FullView": "Waterfronts · Source 1",
  "a4Caption6FullView": "Waterfronts · Source 2",
  "a4Caption7FullView": "Waterfronts · Source 3",
  "a4Caption8FullView": "View toward the Golden Gate Bridge and Sausalito. Some distant skyline features remain misaligned.",
  "a4Caption9FullView": "Berkeley from Emeryville · Source 1",
  "a4Caption10FullView": "Berkeley from Emeryville · Source 2",
  "a4Caption11FullView": "Berkeley from Emeryville · Source 3",
  "a4Caption12FullView": "Berkeley and the Berkeley Hills, viewed from Emeryville. Some ghosting remains around the nearby tree and structures.",
  "linearSystems": {
    "pair1": {
      "titleKey": "a2PairLabel",
      "A": [
        [
          482.501671608,
          293.828725238,
          1.0,
          0.0,
          0.0,
          0.0,
          -68264.4466629,
          -41570.955133
        ],
        [
          0.0,
          0.0,
          0.0,
          482.501671608,
          293.828725238,
          1.0,
          -97229.8833459,
          -59210.0180364
        ],
        [
          497.462748123,
          334.470344991,
          1.0,
          0.0,
          0.0,
          0.0,
          -80337.8771736,
          -54015.3762176
        ],
        [
          0.0,
          0.0,
          0.0,
          497.462748123,
          334.470344991,
          1.0,
          -121087.41746,
          -81413.4333573
        ],
        [
          547.492108776,
          374.489028379,
          1.0,
          0.0,
          0.0,
          0.0,
          -116847.117305,
          -79924.3728393
        ],
        [
          0.0,
          0.0,
          0.0,
          547.492108776,
          374.489028379,
          1.0,
          -154064.148233,
          -105381.12286
        ],
        [
          684.475912072,
          371.511935484,
          1.0,
          0.0,
          0.0,
          0.0,
          -235139.383258,
          -127626.240518
        ],
        [
          0.0,
          0.0,
          0.0,
          684.475912072,
          371.511935484,
          1.0,
          -183638.284506,
          -99673.0685515
        ],
        [
          403.526691133,
          455.590616602,
          1.0,
          0.0,
          0.0,
          0.0,
          -25178.6208562,
          -28427.2234108
        ],
        [
          0.0,
          0.0,
          0.0,
          403.526691133,
          455.590616602,
          1.0,
          -151512.593039,
          -171061.090139
        ]
      ],
      "AUrl": "assets/images/projects/project-4/parta/a2_homographies/mountains/pair_1/A.txt",
      "b": [
        [
          141.480228318
        ],
        [
          201.512013465
        ],
        [
          161.495262664
        ],
        [
          243.410019981
        ],
        [
          213.422468438
        ],
        [
          281.399760404
        ],
        [
          343.532006183
        ],
        [
          268.290353638
        ],
        [
          62.3964198887
        ],
        [
          375.471056483
        ]
      ],
      "bUrl": "assets/images/projects/project-4/parta/a2_homographies/mountains/pair_1/b.txt"
    },
    "pair2": {
      "titleKey": "a2PairLabel2",
      "A": [
        [
          2816.67241636,
          1077.04805842,
          1.0,
          0.0,
          0.0,
          0.0,
          -4597220.24856,
          -1757899.53922
        ],
        [
          0.0,
          0.0,
          0.0,
          2816.67241636,
          1077.04805842,
          1.0,
          -3217110.88886,
          -1230168.98112
        ],
        [
          3712.32207054,
          1167.12738496,
          1.0,
          0.0,
          0.0,
          0.0,
          -8836476.02885,
          -2778124.57105
        ],
        [
          0.0,
          0.0,
          0.0,
          3712.32207054,
          1167.12738496,
          1.0,
          -4549148.6476,
          -1430219.64797
        ],
        [
          3734.5286054,
          1358.50012275,
          1.0,
          0.0,
          0.0,
          0.0,
          -8953608.28515,
          -3257031.67378
        ],
        [
          0.0,
          0.0,
          0.0,
          3734.5286054,
          1358.50012275,
          1.0,
          -5188764.01297,
          -1887503.69681
        ],
        [
          3597.47232156,
          1642.50778454,
          1.0,
          0.0,
          0.0,
          0.0,
          -8254318.99145,
          -3768697.01493
        ],
        [
          0.0,
          0.0,
          0.0,
          3597.47232156,
          1642.50778454,
          1.0,
          -5912149.43775,
          -2699326.25101
        ],
        [
          3336.44311306,
          1302.45638615,
          1.0,
          0.0,
          0.0,
          0.0,
          -6965060.25808,
          -2718969.54501
        ],
        [
          0.0,
          0.0,
          0.0,
          3336.44311306,
          1302.45638615,
          1.0,
          -4499467.22572,
          -1756469.27696
        ]
      ],
      "AUrl": "assets/images/projects/project-4/parta/a2_homographies/waterfronts/pair_1/A.txt",
      "b": [
        [
          1632.14586896
        ],
        [
          1142.16721482
        ],
        [
          2380.30964473
        ],
        [
          1225.41863587
        ],
        [
          2397.52033823
        ],
        [
          1389.40266931
        ],
        [
          2294.4774146
        ],
        [
          1643.4176303
        ],
        [
          2087.57051209
        ],
        [
          1348.5820298
        ]
      ],
      "bUrl": "assets/images/projects/project-4/parta/a2_homographies/waterfronts/pair_1/b.txt"
    },
    "pair3": {
      "titleKey": "a2PairLabel3",
      "A": [
        [
          2104.03683028,
          1395.0013883,
          1.0,
          0.0,
          0.0,
          0.0,
          -2439905.26043,
          -1617686.14343
        ],
        [
          0.0,
          0.0,
          0.0,
          2104.03683028,
          1395.0013883,
          1.0,
          -2924507.3203,
          -1938983.06018
        ],
        [
          3463.4228613,
          1290.5745504,
          1.0,
          0.0,
          0.0,
          0.0,
          -8455805.63122,
          -3150885.11794
        ],
        [
          0.0,
          0.0,
          0.0,
          3463.4228613,
          1290.5745504,
          1.0,
          -4410786.69396,
          -1643590.54105
        ],
        [
          3897.41115082,
          1340.57359222,
          1.0,
          0.0,
          0.0,
          0.0,
          -10848439.5108,
          -3731485.07106
        ],
        [
          0.0,
          0.0,
          0.0,
          3897.41115082,
          1340.57359222,
          1.0,
          -5131115.08226,
          -1764924.74408
        ],
        [
          3600.35728227,
          2119.47703908,
          1.0,
          0.0,
          0.0,
          0.0,
          -9164660.96435,
          -5395100.25312
        ],
        [
          0.0,
          0.0,
          0.0,
          3600.35728227,
          2119.47703908,
          1.0,
          -7253083.12926,
          -4269782.67704
        ],
        [
          2523.49449286,
          1359.4153851,
          1.0,
          0.0,
          0.0,
          0.0,
          -4043893.56465,
          -2178459.72838
        ],
        [
          0.0,
          0.0,
          0.0,
          2523.49449286,
          1359.4153851,
          1.0,
          -3397733.36025,
          -1830370.9469
        ]
      ],
      "AUrl": "assets/images/projects/project-4/parta/a2_homographies/waterfronts/pair_2/A.txt",
      "b": [
        [
          1159.63048998
        ],
        [
          1389.95063119
        ],
        [
          2441.45920664
        ],
        [
          1273.53397797
        ],
        [
          2783.498864
        ],
        [
          1316.54446598
        ],
        [
          2545.48652976
        ],
        [
          2014.54537998
        ],
        [
          1602.49747962
        ],
        [
          1346.43977622
        ]
      ],
      "bUrl": "assets/images/projects/project-4/parta/a2_homographies/waterfronts/pair_2/b.txt"
    },
    "pair4": {
      "titleKey": "a2PairLabel4",
      "A": [
        [
          2715.57148158,
          1750.36280585,
          1.0,
          0.0,
          0.0,
          0.0,
          -3895619.00016,
          -2510980.34057
        ],
        [
          0.0,
          0.0,
          0.0,
          2715.57148158,
          1750.36280585,
          1.0,
          -4864810.37035,
          -3135687.34521
        ],
        [
          1874.48327082,
          1168.44413458,
          1.0,
          0.0,
          0.0,
          0.0,
          -943733.495408,
          -588268.716228
        ],
        [
          0.0,
          0.0,
          0.0,
          1874.48327082,
          1168.44413458,
          1.0,
          -2238969.21615,
          -1395643.52952
        ],
        [
          3968.42944926,
          1203.39140644,
          1.0,
          0.0,
          0.0,
          0.0,
          -9883310.69583,
          -2997027.23976
        ],
        [
          0.0,
          0.0,
          0.0,
          3968.42944926,
          1203.39140644,
          1.0,
          -4994396.11356,
          -1514506.79425
        ],
        [
          3114.40342148,
          1149.32151468,
          1.0,
          0.0,
          0.0,
          0.0,
          -5691622.45214,
          -2100403.59337
        ],
        [
          0.0,
          0.0,
          0.0,
          3114.40342148,
          1149.32151468,
          1.0,
          -3735205.46753,
          -1378418.72892
        ],
        [
          2171.50992683,
          1527.4269421,
          1.0,
          0.0,
          0.0,
          0.0,
          -1859942.78818,
          -1308272.50215
        ],
        [
          0.0,
          0.0,
          0.0,
          2171.50992683,
          1527.4269421,
          1.0,
          -3458102.90083,
          -2432408.65446
        ],
        [
          2333.50024933,
          1210.49341908,
          1.0,
          0.0,
          0.0,
          0.0,
          -2465295.34023,
          -1278861.56699
        ],
        [
          0.0,
          0.0,
          0.0,
          2333.50024933,
          1210.49341908,
          1.0,
          -2915610.90053,
          -1512460.8659
        ]
      ],
      "AUrl": "assets/images/projects/project-4/parta/a2_homographies/berkeley-from-emeryville/pair_1/A.txt",
      "b": [
        [
          1434.5485017
        ],
        [
          1791.44994096
        ],
        [
          503.463279774
        ],
        [
          1194.44609136
        ],
        [
          2490.48416312
        ],
        [
          1258.5321668
        ],
        [
          1827.51611846
        ],
        [
          1199.33257258
        ],
        [
          856.52050916
        ],
        [
          1592.48772391
        ],
        [
          1056.47957009
        ],
        [
          1249.45814828
        ]
      ],
      "bUrl": "assets/images/projects/project-4/parta/a2_homographies/berkeley-from-emeryville/pair_1/b.txt"
    },
    "pair5": {
      "titleKey": "a2PairLabel5",
      "A": [
        [
          3674.50690196,
          1740.55856262,
          1.0,
          0.0,
          0.0,
          0.0,
          -8589319.46846,
          -4068631.2332
        ],
        [
          0.0,
          0.0,
          0.0,
          3674.50690196,
          1740.55856262,
          1.0,
          -6212207.25094,
          -2942628.98721
        ],
        [
          3128.53571407,
          1268.5071139,
          1.0,
          0.0,
          0.0,
          0.0,
          -5980292.04386,
          -2424790.28344
        ],
        [
          0.0,
          0.0,
          0.0,
          3128.53571407,
          1268.5071139,
          1.0,
          -3999649.51535,
          -1621711.98511
        ],
        [
          1458.48057732,
          1818.52783752,
          1.0,
          0.0,
          0.0,
          0.0,
          -24001.3672306,
          -29926.4557416
        ],
        [
          0.0,
          0.0,
          0.0,
          1458.48057732,
          1818.52783752,
          1.0,
          -2818543.89914,
          -3514342.68069
        ],
        [
          2336.44346055,
          1350.55314662,
          1.0,
          0.0,
          0.0,
          0.0,
          -2662271.80938,
          -1538894.31953
        ],
        [
          0.0,
          0.0,
          0.0,
          2336.44346055,
          1350.55314662,
          1.0,
          -3188090.2293,
          -1842837.3567
        ],
        [
          3209.56937847,
          1879.5329326,
          1.0,
          0.0,
          0.0,
          0.0,
          -6298996.31543,
          -3688710.11063
        ],
        [
          0.0,
          0.0,
          0.0,
          3209.56937847,
          1879.5329326,
          1.0,
          -5914085.45108,
          -3463305.2166
        ]
      ],
      "AUrl": "assets/images/projects/project-4/parta/a2_homographies/berkeley-from-emeryville/pair_2/A.txt",
      "b": [
        [
          2337.54343035
        ],
        [
          1690.62337252
        ],
        [
          1911.53069373
        ],
        [
          1278.4413799
        ],
        [
          16.4564188264
        ],
        [
          1932.52069514
        ],
        [
          1139.45483995
        ],
        [
          1364.50561854
        ],
        [
          1962.56742655
        ],
        [
          1842.64141188
        ]
      ],
      "bUrl": "assets/images/projects/project-4/parta/a2_homographies/berkeley-from-emeryville/pair_2/b.txt"
    }
  },
  "a4BlendEquation": "<math xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\" aria-label=\"The blended image is the sum of weighted image colors divided by the sum of weights\"><mrow><mi>I</mi><mo>(</mo><mi>p</mi><mo>)</mo><mo>=</mo><mfrac><mrow><munder><mo>∑</mo><mi>i</mi></munder><msub><mi>w</mi><mi>i</mi></msub><mo>(</mo><mi>p</mi><mo>)</mo><msub><mi>I</mi><mi>i</mi></msub><mo>(</mo><mi>p</mi><mo>)</mo></mrow><mrow><munder><mo>∑</mo><mi>i</mi></munder><msub><mi>w</mi><mi>i</mi></msub><mo>(</mo><mi>p</mi><mo>)</mo></mrow></mfrac></mrow></math>",
  "a4WeightEquation": "<math xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\" aria-label=\"The feather weight is the minimum distance to the four source image edges\"><mrow><msub><mi>w</mi><mi>i</mi></msub><mo>(</mo><mi>p</mi><mo>)</mo><mo>=</mo><mi>min</mi><mo>(</mo><msub><mi>x</mi><mi>i</mi></msub><mo>+</mo><mn>1</mn><mo>,</mo><msub><mi>W</mi><mi>i</mi></msub><mo>−</mo><msub><mi>x</mi><mi>i</mi></msub><mo>,</mo><msub><mi>y</mi><mi>i</mi></msub><mo>+</mo><mn>1</mn><mo>,</mo><msub><mi>H</mi><mi>i</mi></msub><mo>−</mo><msub><mi>y</mi><mi>i</mi></msub><mo>)</mo></mrow></math>",
  "a4WeightExplanation": "(xᵢ, yᵢ) is the inverse-warped location in source image i, whose size is Wᵢ × Hᵢ. The weight is zero outside that image.",
  "compareWarpLabel": "Compare nearest neighbor + bilinear ↗",
  "viewerSingleLabel": "Single image",
  "viewerCompareLabel": "Side by side",
  "viewMatrixA": "View A",
  "viewMatrixb": "View b",
  "matrixNameA": "A",
  "matrixNameb": "b",
  "systemEquation": "A h = b",
  "systemDownloadLabel": "Download full-precision values ↗",
  "systemDimensionsTemplate": "{rows} rows × {columns} columns",
  "viewerComparisonCaption": "{left} / {right}",
  "systemMatrixLabel": "Matrix {name}",
  "comparePointsLabel": "Compare correspondences ↗"
}
