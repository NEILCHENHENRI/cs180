"""Check static references and verify unchanged notebook image exports."""
import hashlib
import json
import re
from html.parser import HTMLParser
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
browser_content = (ROOT / "project3-content.js").read_text()
CONTENT = json.loads(browser_content.split("window.project3Content = ", 1)[1].rstrip(";\n"))

class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids, self.links, self.images = [], [], []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "data-content-attrs" in attrs:
            attrs.update(CONTENT[attrs["data-content-attrs"]])
        if "data-content" in attrs:
            assert attrs["data-content"] in CONTENT
        if "data-content-html" in attrs:
            markup = CONTENT[attrs["data-content-html"]]
            nested = PageParser()
            nested.feed(markup)
            self.ids.extend(nested.ids)
            self.links.extend(nested.links)
            self.images.extend(nested.images)
        if "id" in attrs:
            self.ids.append(attrs["id"])
        if "href" in attrs:
            self.links.append(attrs["href"])
        if tag == "img" and "src" in attrs:
            assert attrs.get("alt"), attrs
            self.images.append(attrs["src"])
        elif "src" in attrs:
            self.links.append(attrs["src"])

page = ROOT / "project3.html"
source = page.read_text()
parser = PageParser()
parser.feed(source)
assert len(parser.ids) == len(set(parser.ids)), "Duplicate section ID"
for link in parser.links + parser.images:
    if link.startswith(("https:", "http:")):
        continue
    if link.startswith("#"):
        assert len(link) == 1 or link[1:] in parser.ids, link
    else:
        assert (ROOT / link.split("?", 1)[0]).is_file(), link
manifest = json.loads((ROOT / "assets/images/projects/project-3/manifest.json").read_text())
for item in manifest:
    content = (ROOT / item["path"]).read_bytes()
    assert hashlib.sha256(content).hexdigest() == item["sha256"]

def dimensions(match):
    tag = match[0]
    src = re.search(r'src="([^"]+)"', tag)[1]
    with Image.open(ROOT / src.split("?", 1)[0]) as im:
        width, height = im.size
    tag = re.sub(r' (width|height)="[^"]*"', '', tag)
    return tag[:-1] + f' width="{width}" height="{height}">'

page.write_text(re.sub(r'<img\b[^>]*src="[^"]+"[^>]*>', dimensions, source))
print(f"Passed: local links, section anchors, alt text, and {len(manifest)} source image hashes.")
print(f"{len(set(parser.images))} unique result figures displayed; image dimensions set to prevent layout shifts.")
