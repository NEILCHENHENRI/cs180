window.project3Content = {
  "pageDocumentTitle": "Project 3 — Fun with Flow Models · Neil Chen",
  "pageAccessibility": {
    "content": "CS 180 Project 3: PixNerd image editing, visual anagrams, hybrid images, and flow matching on MNIST from scratch."
  },
  "skipLink": "Skip to results",
  "headerLabel": "CS 180 / Fall 2026 / Neil Chen",
  "headerLink": "All Projects ↗",
  "heroEyebrow": "Project 3",
  "heroTitle": "Fun with<br>Flow Models",
  "partADescription": "Part A",
  "partAHeading": "Exploring the power<br>of flow models",
  "partADescription2": "I use the pretrained PixNerd-XXL-P16-T2I model to reconstruct images, sample from noise, and combine text conditions. All images are processed at 512 × 512 pixels in [−1, 1]. Flow time runs from noise at t = 0 to data at t = 1.",
  "aInputsLabel": "A / 1.1<span>Training inputs</span>",
  "aInputsHeading": "One photograph, three noise levels",
  "aInputsDescription": "My input is an upward-looking photograph of the Lujiazui towers in Shanghai. I reuse the same Gaussian noise tensor, sampled with seed 42, for all three interpolation times.",
  "aInputsEquation": "x<sub>t</sub> = (1 − t)ε + t x<sub>1</sub>, &nbsp; ε ∼ N(0, I)",
  "aInputsImage": {
    "alt": "Original Lujiazui photograph and interpolated noisy inputs at times 0.25, 0.50, and 0.75"
  },
  "aInputsCaption": "Left to right: original, t = 0.25, 0.50, and 0.75. Higher t retains more of the photograph, while lower t suppresses the buildings beneath Gaussian noise.",
  "aBlurLabel": "A / 1.2<span>Classical denoising</span>",
  "aBlurHeading": "A Gaussian baseline",
  "aBlurDescription": "I first divide the input by t to restore the image amplitude, then blur it. For each noise level, I sweep Gaussian standard deviations {1, 2, 4, 8, 16} and choose the result with the lowest MSE against the clean image.",
  "aBlurEquation": "x̂<sub>1</sub> = G<sub>σ</sub>(x<sub>t</sub> / t), &nbsp; t &gt; 0",
  "aBlurImage": {
    "alt": "Noisy input and Gaussian blur at t 0.25, selected sigma 8"
  },
  "aBlurCaption": "t = 0.25 · selected σ = 8. Strong blur reduces grain, but smears the tower edges and lighting.",
  "aBlurImage2": {
    "alt": "Noisy input and Gaussian blur at t 0.50, selected sigma 2"
  },
  "aBlurCaption2": "t = 0.50 · selected σ = 2. More structure survives, though fine architectural detail remains soft.",
  "aBlurImage3": {
    "alt": "Noisy input and Gaussian blur at t 0.75, selected sigma 1"
  },
  "aBlurCaption3": "t = 0.75 · selected σ = 1. A lighter filter is sufficient because the input contains less noise relative to the signal.",
  "aOneStepLabel": "A / 1.3<span>One-step denoising</span>",
  "aOneStepHeading": "Predict the remaining update",
  "aOneStepDescription": "With the prompt “a high quality photo,” I predict velocity once and extrapolate to t = 1. The network predicts a direction of motion, so I add the velocity (scaled to the remaining time) to the input. The estimates recover sharp building boundaries far more effectively than Gaussian averaging, although the weakest input loses some fine structure.",
  "aOneStepEquation": "x̂<sub>1</sub> = x<sub>t</sub> + (1 − t)v<sub>θ</sub>(x<sub>t</sub>, t, c)",
  "aOneStepImage": {
    "alt": "Original, noisy input, and one-step reconstruction at t 0.25"
  },
  "aOneStepCaption": "t = 0.25 · original / noisy input / one-step estimate.",
  "aOneStepImage2": {
    "alt": "Original, noisy input, and one-step reconstruction at t 0.50"
  },
  "aOneStepCaption2": "t = 0.50 · original / noisy input / one-step estimate.",
  "aOneStepImage3": {
    "alt": "Original, noisy input, and one-step reconstruction at t 0.75"
  },
  "aOneStepCaption3": "t = 0.75 · original / noisy input / one-step estimate.",
  "aVelocityLabel": "A / 1.4<span>Velocity diagnostics</span>",
  "aVelocityHeading": "What does the model add?",
  "aVelocityDescription": "The known image–noise pair gives the target velocity v<sub>gt</sub> = x<sub>1</sub> − ε. The model predicts v̂<sub>t</sub> = v<sub>θ</sub>(x<sub>t</sub>, t, c). I compare its update (1 − t)v̂<sub>t</sub> with the exact update (1 − t)v<sub>gt</sub> = x<sub>1</sub> − x<sub>t</sub>. The heatmap measures the root mean square (RMS) update error across RGB at each pixel, before any display scaling.",
  "aVelocityEquation": "<math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mrow><msub><mi>E</mi><mi>t</mi></msub><mo>=</mo><msqrt><mrow><msub><mtext>mean</mtext><mtext>RGB</mtext></msub><mo>{</mo><msup><mrow><mo>[</mo><mo>(</mo><mn>1</mn><mo>−</mo><mi>t</mi><mo>)</mo><mo>(</mo><msub><mover><mi>v</mi><mo>^</mo></mover><mi>t</mi></msub><mo>−</mo><msub><mi>v</mi><mtext>gt</mtext></msub><mo>)</mo><mo>]</mo></mrow><mn>2</mn></msup><mo>}</mo></mrow></msqrt></mrow></math>",
  "aVelocityImage": {
    "alt": "Clean Lujiazui photograph used as the velocity ground truth"
  },
  "aVelocityCaption": "The clean reference used for all three diagnostics.",
  "aVelocityImage2": {
    "alt": "Velocity diagnostics at time 0.25: noisy image, predicted update, target update, RGB RMS error"
  },
  "aVelocityCaption2": "t = 0.25 · noisy input / predicted update / ground-truth update / error.",
  "aVelocityImage3": {
    "alt": "Velocity diagnostics at time 0.50"
  },
  "aVelocityCaption3": "t = 0.50 · same column order and display scales.",
  "aVelocityImage4": {
    "alt": "Velocity diagnostics at time 0.75"
  },
  "aVelocityCaption4": "t = 0.75 · same column order and display scales.",
  "aVelocityDescription2": "All predicted and ground-truth updates share a symmetric display scale [−L, L], where L is the largest absolute update value across all three times. This range is mapped to RGB values in [0, 1], with zero at middle gray. The scaling is for visualization only. All error maps also share a linear scale from zero to the largest error across the three maps, with purple indicating lower error and yellow higher error. Architectural outlines remain visible in the errors, showing imperfect recovery of reference details. The update errors become less pronounced as less time remains.",
  "aEulerLabel": "A / 1.5<span>Euler sampling</span>",
  "aEulerHeading": "Recompute the direction as we go",
  "aEulerDescription": "I start from the saved t = 0.50 input and take 25 Euler updates of size h = 0.02, using the generic photo prompt without classifier-free guidance. Each update queries the model at the new state. This follows changes in the velocity field along the trajectory rather than extrapolating one direction all the way to the endpoint.",
  "aEulerEquation": "x<sub>t+hₜ</sub> = x<sub>t</sub> + h<sub>t</sub> v<sub>θ</sub>(x<sub>t</sub>, t, c), &nbsp; where h<sub>t</sub> = min(h, 1 − t)",
  "aEulerImage": {
    "alt": "Euler reconstruction trajectory at t 0.50, 0.60, 0.70, 0.80, 0.90 and 1.00"
  },
  "aEulerCaption": "Initial state and every fifth update: t = 0.50, 0.60, 0.70, 0.80, 0.90, 1.00. Noise progressively disappears while the tower edges become distinct.",
  "aEulerImage2": {
    "alt": "Original photograph compared with Gaussian blur, one-step reconstruction, and Euler reconstruction"
  },
  "aEulerCaption2": "All three methods use the same t = 0.50 input. Left to right: original / Gaussian blur / one-step / Euler.",
  "aEulerMetricsCaption": "Reconstruction MSE recorded in the notebook, in normalized [−1, 1] image space.",
  "aEulerBlurMse": "0.058052",
  "aEulerBlurLabel": "Gaussian blur",
  "aEulerOneStepMse": "0.012597",
  "aEulerOneStepLabel": "One-step denoising",
  "aEulerIterativeMse": "0.015622",
  "aEulerIterativeLabel": "Euler denoising",
  "aEulerDescription2": "Both learned reconstructions preserve much more detail than blur. In this experiment, one-step denoising has the lowest MSE. Iterative integration can follow the learned image prior and change small details, so extra steps do not guarantee better pixel agreement with this particular reference.",
  "aGuidanceLabel": "A / 1.6 &amp; 2.1<span>Generation &amp; guidance</span>",
  "aGuidanceHeading": "From noise to portraits",
  "aGuidanceDescription": "I generate five images from independent Gaussian states using the generic prompt “a high quality photo.” Each image takes 50 Euler updates with h = 0.02 from t = 0 to t = 1, initially without classifier-free guidance. Despite the broad prompt, all five outputs are head-and-shoulders portraits, suggesting a strong portrait bias and possibly reflecting a large proportion of portrait images in the model's training data.",
  "aGuidanceImage": {
    "alt": "Five ordinary conditional samples using seeds 42 through 46, all portraits"
  },
  "aGuidanceCaption": "Ordinary conditional sampling · seeds 42, 43, 44, 45, 46, in reading order.",
  "aGuidanceDescription2": "For classifier-free guidance, I evaluate the same state and time with the photo prompt and the empty prompt. I amplify their difference with w = 7 and repeat the experiment with the same five initial noises and Euler step size h = 0.02. In this convention, w = 0 recovers ordinary conditional sampling. The notebook checks this numerically.",
  "aGuidanceEquation": "v<sub>CFG</sub> = v<sub>c</sub> + w(v<sub>c</sub> − v<sub>u</sub>), &nbsp; where w = 7",
  "aGuidanceImage2": {
    "alt": "Five guided samples at w 7 using the same seeds 42 through 46"
  },
  "aGuidanceCaption2": "CFG sampling · w = 7 · same seeds and layout as above.",
  "aGuidanceDescription3": "The guided portraits have stronger contrast, cleaner backgrounds, more polished lighting, and, most noticeably, more natural-looking skin tones. Their identities and appearances also change, even with matching initial noise. Guidance does not overcome the portrait bias here.",
  "aEditLabel": "A / 3.1<span>Image-to-image editing</span>",
  "aEditHeading": "How much of the input survives?",
  "aEditDescription": "I interpolate each input with seed 42 noise, then integrate back to t = 1 with the generic photo prompt, Euler step size h = 0.02, and CFG weight w = 7. Every sweep below contains the original followed by starting times 0.02, 0.04, 0.06, 0.10, 0.14, 0.25, and 0.50, in reading order. Small starting times retain little image information and allow large changes. Conversely, larger starting times preserve more of the input.",
  "aEditSubheading": "Campanile",
  "aEditImage": {
    "alt": "Campanile original and seven generic photo edits"
  },
  "aEditCaption": "At t = 0.02 the tower is replaced by a portrait. Subsequent outputs recover a vertical structure against blue sky, and higher starting times restore recognizable Campanile details.",
  "aEditSubheading2": "Personal Image 1 · Lujiazui",
  "aEditImage2": {
    "alt": "Lujiazui original and seven generic photo edits"
  },
  "aEditCaption2": "The lowest times produce portraits and abstract metallic forms. Building geometry returns around the middle of the sweep. The latest starting times closely preserve the original upward perspective.",
  "aEditSubheading3": "Personal Image 2 · Wukang Mansion",
  "aEditImage3": {
    "alt": "Wukang Mansion original and seven generic photo edits"
  },
  "aEditCaption3": "A portrait and simplified modern structures appear at low times. Later times retain the wedge-shaped building, street, and masonry façade.",
  "aEditSubheading4": "Web Image · Everett’s Cottage",
  "aEditImage4": {
    "alt": "Cottage painting and seven edits with a photo prompt"
  },
  "aEditCaption4": "The notebook’s web image input is a cottage painting. Low-time edits drift into a portrait and some other unrecognizable forms. At t = 0.10 and t = 0.14, the landscape looks most realistic, although its content differs from the original painting. At high times, much of the painted appearance persists despite the photo prompt.<br>Source: <a href=\"https://www.thomaskinkade.com/collections/everetts-cottage-by-thomas-kinkade\" target=\"_blank\" rel=\"noopener noreferrer\">Everett’s Cottage by Thomas Kinkade</a>.",
  "aEditSubheading5": "Hand Drawing 1 · Lighthouse (w/ AI-assisted colorization)",
  "aEditImage5": {
    "alt": "Hand-drawn lighthouse and seven image-to-image edits"
  },
  "aEditCaption5": "At low times, the sparse drawing becomes a frame or broad color bands. As more signal survives, the lighthouse and shoreline return. The final results remain closer to illustrations than fully realistic photographs.",
  "aEditSubheading6": "Hand Drawing 2 · Mountains (w/ AI-assisted colorization)",
  "aEditImage6": {
    "alt": "Hand-drawn mountains and river with seven image-to-image edits"
  },
  "aEditCaption6": "The earliest edits reinterpret the flat shapes as graphic objects. Mountain and river structure emerges as the starting time rises, with the original colors and drawn outlines increasingly preserved. We can see a glimpse of realistic landscapes at t = 0.06.",
  "aTextLabel": "A / 3.2<span>Text-guided editing</span>",
  "aTextHeading": "Give the transformation a direction",
  "aTextDescription": "I keep the same images, seed 42, Euler step size h = 0.02, CFG weight w = 7, and seven starting times, but replace the generic prompt with a specific description. The sweeps show the balance between the requested subject and the surviving input geometry.",
  "aTextSubheading": "Campanile → rocket",
  "aTextPrompt": "<b>Prompt</b>a photograph of a rocket on a launch pad",
  "aTextImage": {
    "alt": "Campanile transformed into rockets across seven starting times"
  },
  "aTextCaption": "Original, then t = 0.02, 0.04, 0.06, 0.10, 0.14, 0.25, 0.50. Low times allow a complete rocket. Intermediate times keep the tower’s placement while adopting a rocket-like surface. High times retain the original tower.",
  "aTextSubheading2": "Lujiazui → crystalline towers",
  "aTextPrompt2": "<b>Prompt</b>three magnificent crystalline towers rising above a futuristic city at sunrise, beautiful golden lighting, highly detailed",
  "aTextImage2": {
    "alt": "Lujiazui edited into crystalline skyscrapers at sunrise"
  },
  "aTextCaption2": "The low-time outputs create a new skyline at sunrise. Around t of 0.06 to 0.14, the composition moves back toward the original low viewpoint while the buildings become faceted crystal. At t = 0.25 and 0.50, the photograph dominates.",
  "aTextSubheading3": "Wukang Mansion → Parisian apartment building",
  "aTextPrompt3": "<b>Prompt</b>a beautiful historic Parisian apartment building at a triangular street intersection",
  "aTextImage3": {
    "alt": "Wukang Mansion reinterpreted as a Parisian building at a triangular intersection"
  },
  "aTextCaption3": "The prompt is compatible with the existing wedge-shaped architecture, so even strongly edited outputs retain a related street-corner composition. Lower times change rooflines and façade ornament. Higher times preserve Wukang Mansion’s original form.",
  "aAnagramsLabel": "A / 3.3<span>Visual anagrams</span>",
  "aAnagramsHeading": "Two readings, one image",
  "aAnagramsDescription": "I average a guided velocity prediction in the upright view with a second prediction on the 180° rotated image, rotated back into the original coordinates. Both prompts therefore influence every Euler update, using h = 0.02 and CFG weight w = 7. The two panels in each figure are the same generated image in opposite orientations.",
  "aAnagramsEquation": "v = ½[v<sub>CFG</sub>(x, t, c<sub>a</sub>) + F(v<sub>CFG</sub>(F(x), t, c<sub>b</sub>))], &nbsp; where F = rotation by 180°",
  "aAnagramsPrompt": "<b>Upright / rotated prompts · seed 42</b>a watercolor painting of a blooming pink lotus with layered petals<br>a watercolor painting of an ornate chandelier with dangling crystal droplets",
  "aAnagramsImage": {
    "alt": "Pink lotus and chandelier visual anagram, shown upright and rotated 180 degrees"
  },
  "aAnagramsCaption": "Pink petal-like forms become hanging ornaments when rotated. The chandelier reading is stronger. Curls and droplet shapes persist in both views, while the upright lotus is only partly convincing.",
  "aAnagramsPrompt2": "<b>Upright / rotated prompts · seed 43</b>a watercolor painting of branching staghorn coral underwater<br>a watercolor painting of a colorful bouquet of blooming flowers",
  "aAnagramsImage2": {
    "alt": "Branching coral and flower bouquet anagram shown in two orientations"
  },
  "aAnagramsCaption2": "Branching pale stems and colorful clusters support both coral and bouquet interpretations. The result blends the two subjects rather than creating a completely separate scene in each orientation.",
  "aHybridsLabel": "A / 3.4<span>Hybrid images</span>",
  "aHybridsHeading": "Different subjects at different scales",
  "aHybridsDescription": "I combine low frequencies of one guided velocity with high frequencies of another at every Euler step, using h = 0.02 and CFG weight w = 7. The low-pass filter uses a 265 × 265 Gaussian kernel with σ = 16. The reduced views below are the notebook’s 64 × 64 outputs, displayed at their native size to approximate seeing the image from farther away.",
  "aHybridsEquation": "v = G<sub>σ</sub>(v<sub>distant</sub>) + v<sub>close</sub> − G<sub>σ</sub>(v<sub>close</sub>)",
  "aHybridsSubheading": "Eye / galaxy",
  "aHybridsPrompt": "<b>Distant / close prompts · seed 42</b>a close-up human eye<br>a colorful spiral galaxy filled with stars",
  "aHybridsImage": {
    "alt": "Eye-shaped galaxy hybrid with stars and a dark pupil"
  },
  "aHybridsCaption": "Full-size result · close-view detail.",
  "aHybridsImage2": {
    "alt": "Eye and galaxy hybrid reduced to 64 pixels"
  },
  "aHybridsCaption2": "Distant view<br>64 × 64",
  "aHybridsDescription2": "The dark center and surrounding iris-like ring produce a strong eye reading at reduced size. Close inspection reveals stars and a luminous spiral, though the eye remains visible up close too. The two perceptions are not fully isolated.",
  "aHybridsSubheading2": "Diamond / snowflakes",
  "aHybridsPrompt2": "<b>Distant / close prompts · seed 43</b>a large sparkling diamond<br>intricate crystalline snowflakes",
  "aHybridsImage3": {
    "alt": "Blue crystalline diamond and snowflake hybrid on a white background"
  },
  "aHybridsCaption3": "Full-size result · fine crystalline branches.",
  "aHybridsImage4": {
    "alt": "Diamond and snowflake hybrid reduced to 64 pixels"
  },
  "aHybridsCaption4": "Distant view<br>64 × 64",
  "aHybridsDescription3": "Fine blue branches and repeated crystalline facets strongly resemble a snowflake. Reduction emphasizes a compact, sparkling central mass, but the diamond silhouette is less distinct than the eye in the first hybrid. This is a partial scale-dependent effect rather than an equally strong reading of both prompts.",
  "partBDescription": "Part B",
  "partBHeading": "Flow matching<br>from scratch",
  "partBDescription2": "I build UNets for 28 × 28 grayscale MNIST images, beginning with single-step reconstruction and then learning time- and class-conditioned velocity fields. The experiments show why denoising an existing signal is easier than producing a diverse image from independent noise.",
  "bDenoisingLabel": "B / 1.1–1.2.1<span>A denoising UNet</span>",
  "bDenoisingHeading": "Learn to recover a digit",
  "bDenoisingDescription": "The UNet downsamples from 28 × 28 to 14 × 14 and 7 × 7, pools to a 1 × 1 bottleneck, then upsamples back to the input resolution. Skip connections concatenate encoder features with decoder features at matching resolutions. Convolutional blocks use batch normalization and GELU. The final convolution predicts the clean image.",
  "bDenoisingDescription2": "I corrupt clean digits with z = x + σε and train with MSE between D<sub>θ</sub>(z) and x. Training uses fresh Gaussian noise whenever a batch is fetched. The following visualization keeps the digit columns fixed while increasing σ.",
  "bDenoisingImage": {
    "alt": "Five MNIST digits corrupted at sigma 0, 0.2, 0.4, 0.5, 0.6, 0.8 and 1.0"
  },
  "bDenoisingCaption": "Rows: σ = 0.0, 0.2, 0.4, 0.5, 0.6, 0.8, 1.0. Display values are limited to [0, 1], while the noisy tensors themselves are not clipped before inference.",
  "bDenoisingMetricsLabel": "Single-step denoiser settings",
  "bDenoisingNoiseValue": "0.5",
  "bDenoisingNoiseLabel": "Training noise σ",
  "bDenoisingHiddenValue": "128",
  "bDenoisingHiddenLabel": "Hidden channels D",
  "bDenoisingBatchValue": "256",
  "bDenoisingBatchLabel": "Batch size",
  "bDenoisingOptimizerValue": "Adam",
  "bDenoisingOptimizerLabel": "Optimizer",
  "bDenoisingLearningRateValue": "10<sup>−4</sup>",
  "bDenoisingLearningRateLabel": "Learning rate",
  "bDenoisingEpochValue": "5",
  "bDenoisingEpochLabel": "Epochs w/ shuffled MNIST training set",
  "bDenoisingImage2": {
    "alt": "Denoising training loss over all five epochs"
  },
  "bDenoisingCaption2": "MSE recorded at every training iteration. The loss falls rapidly and then improves more gradually.",
  "bDenoisingImage3": {
    "alt": "Test denoising results at epochs 1 and 5, with original, noisy and reconstructed rows"
  },
  "bDenoisingCaption3": "Left group: epoch 1. Right group: epoch 5. Rows show clean test digits, the same fixed σ = 0.5 noisy inputs, and reconstructions.",
  "bDenoisingDescription3": "Recognizable digits already appear after one epoch. By epoch five, the reconstructions have cleaner backgrounds and more continuous strokes, although ambiguous fine details can still be smoothed away.",
  "bOodLabel": "B / 1.2.2<span>Out-of-distribution noise</span>",
  "bOodHeading": "Vary the noise, keep the digit fixed",
  "bOodDescription": "I evaluate the five-epoch model on one held-out digit using the same Gaussian noise pattern scaled by each σ. Only σ changes, which isolates sensitivity to noise strength. The network receives no explicit noise-level input and was trained only at σ = 0.5.",
  "bOodImage": {
    "alt": "A fixed test digit seven denoised across seven noise levels from sigma zero to one"
  },
  "bOodCaption": "Columns: σ = 0.0, 0.2, 0.4, 0.5, 0.6, 0.8, 1.0. Rows: original / noisy / denoised.",
  "bOodDescription2": "The digit remains legible over much of the sweep, including noise levels outside training. At the largest σ, background artifacts and distorted strokes become more apparent as the surviving image evidence weakens. A fixed-noise denoiser can generalize to nearby noise strengths, but this one-digit example does not establish reliability over the full test set.",
  "bPureLabel": "B / 1.2.3<span>Denoising pure noise</span>",
  "bPureHeading": "Why the outputs become an average",
  "bPureDescription": "I train a fresh D = 128 UNet for five epochs with the same batch size and Adam learning rate, replacing the input with independent Gaussian noise. The target remains a clean training digit, but there is now no relationship between that digit and the input.",
  "bPureImage": {
    "alt": "Pure-noise reconstruction loss drops then plateaus above the ordinary denoising loss"
  },
  "bPureCaption": "The loss drops quickly, then levels off near a nonzero floor as the model learns a broadly shared output.",
  "bPureImage2": {
    "alt": "Pure-noise outputs at epochs one and five collapse to similar blurry digit-shaped averages"
  },
  "bPureCaption2": "Epoch 1 on the left, epoch 5 on the right. Rows: example clean targets / independent noise inputs / predictions. The clean targets are shown for context. They cannot be inferred from the independent noise.",
  "bPureDescription2": "The predictions are nearly identical blurry, oval digit-like blobs, with a bright central region and overlapping curved strokes. They resemble a superposition of MNIST digits rather than distinct samples of 0 through 9. Training longer reinforces that shared pattern instead of selecting a different digit for each noise input.",
  "bPureEquation": "D*(z) = E[x | z] = E[x]   when z and x are independent",
  "bPureDescription3": "Under squared error, the optimal prediction is the conditional mean. Because pure noise carries no information about the target, the conditional mean reduces to the dataset mean: the pixelwise centroid of all training digits. This explains both the averaging and the lack of sample diversity. A one-step regression objective with independent input–target pairs provides no incentive to assign different noise states to different digit identities.",
  "bTimeLabel": "B / 2.1–2.3<span>Time-conditioned flow</span>",
  "bTimeHeading": "Learn motion instead of an endpoint",
  "bTimeDescription": "I sample independent Gaussian x<sub>0</sub>, a clean digit x<sub>1</sub>, and a time on a 100-point grid t ∈ {0, 0.01, …, 0.99}. The network receives the interpolated state and normalized time, and learns the target velocity x<sub>1</sub> − x<sub>0</sub>. Two fully connected blocks embed time and multiplicatively modulate the unflattened features and first upsampling block.",
  "bTimeEquation": "x<sub>t</sub> = (1 − t)x<sub>0</sub> + t x<sub>1</sub><br>L = E[mean<sub>pixels</sub>{[u<sub>θ</sub>(x<sub>t</sub>, t) − (x<sub>1</sub> − x<sub>0</sub>)]²}]",
  "bTimeDescription2": "Training uses D = 64, batch size 64, Adam at an initial learning rate of 10<sup>−2</sup>, and 10 epochs. An exponential scheduler multiplies the learning rate by 0.1<sup>1/10</sup> after each epoch. Sampling starts from Gaussian noise and performs 100 Euler updates. The plotted checkpoints reuse seeds 0–15.",
  "bTimeImage": {
    "alt": "Time-conditioned digit generation at epochs one, five and ten, with full training loss curve"
  },
  "bTimeCaption": "Top left: epoch 1. Top right: epoch 5. Bottom left: epoch 10. Bottom right: loss over the complete training run.",
  "bTimeDescription3": "After one epoch, many outputs are fragmented or difficult to read. By epoch 5, clear digit structures emerge, and epoch 10 produces a more coherent set with varied stroke styles. Some samples remain ambiguous, but the model generates distinct digits instead of collapsing to the dataset average. The logged last-batch loss falls from 0.1557 at epoch 1 to 0.0900 at epoch 10.",
  "bClassLabel": "B / 2.4–2.6<span>Class-conditioned flow</span>",
  "bClassHeading": "Choose which digit to generate",
  "bClassDescription": "I add two fully connected embeddings of a ten-dimensional one-hot class vector. At the two conditioning locations, class embeddings scale the features and time embeddings supply an additive term: c<sub>1</sub> ⊙ features + t<sub>1</sub>, and similarly at the next block. During training, I zero the class vector with probability 0.1 so the same network learns an unconditional branch.",
  "bClassDescription2": "The model uses D = 64, batch size 64, and 10 epochs, with 938 batches per epoch. Training times are sampled from a 300-point grid t ∈ {0, 1/300, …, 299/300}. The scheduled run starts Adam at 10<sup>−2</sup> with the same exponential decay as above. Sampling uses 300 Euler steps and guidance scale γ = 5, with seed 42 held fixed across all checkpoints and both training variants.",
  "bClassEquation": "v = v<sub>u</sub> + γ(v<sub>c</sub> − v<sub>u</sub>), &nbsp; γ = 5",
  "bClassDescription3": "This is Part B’s guidance convention. Part A instead uses v<sub>c</sub> + w(v<sub>c</sub> − v<sub>u</sub>).",
  "bClassImage": {
    "alt": "Scheduled class-conditioned model after epoch one, four samples per digit"
  },
  "bClassCaption": "Epoch 1 · scheduled learning rate.",
  "bClassImage2": {
    "alt": "Scheduled class-conditioned model after epoch five"
  },
  "bClassCaption2": "Epoch 5 · scheduled learning rate.",
  "bClassImage3": {
    "alt": "Scheduled class-conditioned model after epoch ten"
  },
  "bClassCaption3": "Epoch 10 · scheduled learning rate.",
  "bClassDescription4": "Rows correspond to classes 0 to 9, with four independently initialized instances per row. Most classes are recognizable after one epoch, though some strokes are rough or ambiguous, particularly among the 5s and 8s. By epochs 5 and 10, the digits have cleaner, more continuous strokes while retaining variation in shape and slant.",
  "bClassSubheading": "Remove the learning-rate scheduler",
  "bClassDescription5": "For an independent comparison, I train a fresh class-conditioned model at a constant learning rate of 10<sup>−3</sup>. I reduce the initial step size by a factor of ten to compensate for losing the scheduler’s later small updates. The architecture, training duration, batch size, conditioning dropout, and sampling settings stay the same.",
  "bClassImage4": {
    "alt": "Training loss curves comparing scheduled Adam with constant learning rate Adam"
  },
  "bClassCaption4": "Training loss over all 9,380 iterations per model: scheduled 10<sup>−2</sup> Adam versus constant 10<sup>−3</sup> Adam. Both descend to a similar range. The constant-rate model has a smaller initial spike and generally lower loss through much of training. The curves become closer toward the end.",
  "bClassImage5": {
    "alt": "Constant learning rate class-conditioned model after epoch one"
  },
  "bClassCaption5": "Epoch 1 · constant learning rate.",
  "bClassImage6": {
    "alt": "Constant learning rate class-conditioned model after epoch five"
  },
  "bClassCaption6": "Epoch 5 · constant learning rate.",
  "bClassImage7": {
    "alt": "Constant learning rate class-conditioned model after epoch ten"
  },
  "bClassCaption7": "Epoch 10 · constant learning rate.",
  "bClassDescription6": "The constant-rate model produces mostly legible classes after one epoch and clear digits by epochs 5 and 10. Both models show variation within each requested class, and the final fixed-seed grids have broadly comparable visual quality. The logged last-batch losses at epoch 10 are 0.0872 for the scheduled model and 0.0915 for the constant-rate model. Note that these are individual batch values, not epoch means. A smaller constant learning rate works well in this experiment, though the samples alone do not establish equal performance across repeated runs or a quantitative image-quality metric.",
  "viewerAccessibility": {
    "aria-label": "Expanded notebook figure"
  },
  "viewerButton": "Close ×",
  "viewerFarLabel": "Far",
  "viewerNearLabel": "Near",
  "viewerZoomAccessibility": {
    "aria-label": "Hybrid image viewing size"
  },
  "viewerEpochCaption": "Epoch {epoch} · four samples per digit, with rows corresponding to classes 0–9."
};
