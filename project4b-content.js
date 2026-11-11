window.project4bContent = {
  sections: {
    b1: {
      label: 'B.1',
      title: 'Harris corners and ANMS',
      description: 'I detected Harris corners in each grayscale image at a single scale using the supplied detector. For adaptive non-maximal suppression (ANMS), I took the 8,000 strongest Harris candidates and ranked each by its distance to the nearest corner whose response was more than its own divided by 0.9. Keeping the 1,500 largest radii spreads the selected corners across the image.',
    },
    b2: {
      label: 'B.2',
      title: 'Feature descriptors',
      description: 'I blurred the grayscale image and sampled a grid around each selected corner. The 40 × 40 window gives eight samples per axis, spaced five pixels apart. I subtracted the mean of the 64 samples and divided by their standard deviation so the descriptor captures the local brightness pattern under changes in brightness and contrast.',
      caption: 'Eight examples per scene. The upper row shows 40 × 40 source windows. The lower row shows their normalized 8 × 8 descriptors.',
    },
    b3: {
      label: 'B.3',
      title: 'Feature matching',
      description: 'I compared each descriptor with its two nearest neighbors by Euclidean distance. I kept the match if the nearest distance was less than 0.8 times the second-nearest distance. If multiple features chose the same target, I kept the lowest ratio.',
      legend: 'Each line connects two features. Green matches agree with the RANSAC homography and orange matches were rejected. The figures show a subset of lines for readability.',
    },
    b4: {
      label: 'B.4',
      title: 'Automatic mosaics',
      description: 'Each RANSAC trial fits a homography from four matches and counts the matches within three pixels at the feature detection resolution. I refit using the best set of inliers, then warp each frame into the second frame’s coordinates and feather the overlaps using the Part A code.',
      comparison: 'Each pair below uses the same input frames, output canvas, and blend. The left mosaic uses the Part A points and the right mosaic uses automatically matched features.',
      observation: 'At this scale, the overlapping areas look nearly identical in the Waterfronts and Berkeley from Emeryville comparisons. The clearest difference is in Mountains, where the automatic warp makes the left edge more upright and shows less sky above the peaks.',
    },
  },
  scenes: [
    {
      id: 'mountains',
      title: 'Mountains',
      corners: '10,249',
      cornerSize: [800, 566],
      matchSize: [1618, 566],
      mosaicSize: [1614, 889],
      pairs: [{ matches: 147, inliers: 86, error: '1.20' }],
    },
    {
      id: 'waterfronts',
      title: 'Waterfronts',
      corners: '29,939',
      cornerSize: [1400, 788],
      matchSize: [2818, 788],
      mosaicSize: [2400, 1008],
      pairs: [
        { matches: 317, inliers: 247, error: '1.28' },
        { matches: 507, inliers: 417, error: '1.08' },
      ],
    },
    {
      id: 'berkeley-from-emeryville',
      title: 'Berkeley from Emeryville',
      corners: '28,009',
      cornerSize: [1400, 788],
      matchSize: [2818, 788],
      mosaicSize: [2400, 930],
      pairs: [
        { matches: 488, inliers: 451, error: '0.91' },
        { matches: 492, inliers: 437, error: '0.92' },
      ],
    },
  ],
}
