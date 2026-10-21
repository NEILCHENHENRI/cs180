"""Export saved notebook figures without running or modifying the notebooks."""
import base64
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT.parent / "proj3"
DEST = ROOT / "assets/images/projects/project-3"
NAMES = {
    "parta": {
        8: ["original"], 10: ["training-inputs"],
        12: ["blur-025", "blur-050", "blur-075"],
        14: ["one-step-025", "one-step-050", "one-step-075"],
        17: ["velocity-original", "velocity-025", "velocity-050", "velocity-075"],
        19: ["euler-trajectory", "denoising-comparison"],
        21: ["conditional-samples"], 24: ["cfg-samples"],
        27: ["edit-campanile", "edit-lujiazui", "edit-wukang"],
        29: ["edit-cottage", "edit-lighthouse", "edit-mountains"],
        31: ["text-campanile", "text-lujiazui", "text-wukang"],
        33: ["anagram-lotus-chandelier", "anagram-coral-bouquet"],
        35: ["hybrid-eye-galaxy", "hybrid-eye-galaxy-distant",
             "hybrid-diamond-snowflakes", "hybrid-diamond-snowflakes-distant"],
    },
    "partb": {
        14: ["noising-process"], 22: ["denoising-loss"],
        23: ["denoising-epochs"], 25: ["ood-noise"],
        28: ["pure-noise-loss"], 29: ["pure-noise-epochs"],
        41: ["time-conditioned-epochs-loss"], 51: ["class-conditioned-loss"],
        53: [f"{mode}-epoch-{epoch}" for mode in ("scheduled", "constant-lr")
             for epoch in (1, 5, 10)],
    },
}

manifest = []
for part, filename in [("parta", "parta_updated.ipynb"), ("partb", "partb.ipynb")]:
    notebook = json.loads((SOURCE / filename).read_text())
    folder = DEST / part
    folder.mkdir(parents=True, exist_ok=True)
    for cell_index, names in NAMES[part].items():
        outputs = [(i, o["data"]) for i, o in enumerate(notebook["cells"][cell_index].get("outputs", []))
                   if "image/png" in o.get("data", {})]
        assert len(outputs) == len(names), (part, cell_index, len(outputs), names)
        for name, (output_index, data) in zip(names, outputs):
            raw = data["image/png"]
            content = base64.b64decode("".join(raw) if isinstance(raw, list) else raw)
            path = folder / (name + ".png")
            path.write_bytes(content)
            manifest.append({"path": str(path.relative_to(ROOT)), "notebook": filename,
                             "cell": cell_index, "output": output_index,
                             "sha256": hashlib.sha256(content).hexdigest()})
    all_images = sum("image/png" in o.get("data", {}) for c in notebook["cells"]
                     for o in c.get("outputs", []))
    assert all_images == sum(map(len, NAMES[part].values())), (part, all_images)
(DEST / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
print(f"Exported {len(manifest)} original PNG outputs to {DEST}")
