# SEO / routing regression tests for Khai Huynh portfolio (Next.js frontend, no backend)
import os
import re
import xml.etree.ElementTree as ET

import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")


@pytest.fixture(scope="module")
def home():
    if not BASE_URL:
        pytest.skip("REACT_APP_BACKEND_URL not set")
    r = requests.get(f"{BASE_URL}/", timeout=30)
    assert r.status_code == 200
    return r.text


# Home metadata
def test_home_meta(home):
    assert len(re.findall(r"<title>", home)) == 1
    assert len(re.findall(r'<meta name="description"', home)) == 1
    assert '<link rel="canonical" href="https://khaigpt.vercel.app"/>' in home
    assert '<meta name="robots" content="index, follow"/>' in home
    assert 'property="og:title"' in home and 'name="twitter:card"' in home
    assert '"@type":"Person"' in home or "Person" in home


# Alt text on all images
def test_home_img_alts(home):
    imgs = re.findall(r"<img[^>]*>", home)
    assert len(imgs) == 12
    for i in imgs:
        m = re.search(r'alt="([^"]+)"', i)
        assert m and len(m.group(1)) > 20


# robots / sitemap / manifest
def test_robots():
    t = requests.get(f"{BASE_URL}/robots.txt", timeout=30).text
    assert "User-Agent: *" in t and "Allow: /" in t and "Sitemap: https://khaigpt.vercel.app/sitemap.xml" in t
    assert "Host" not in t


def test_sitemap():
    r = requests.get(f"{BASE_URL}/sitemap.xml", timeout=30)
    root = ET.fromstring(r.content)
    locs = [e.text for e in root.iter("{http://www.sitemaps.org/schemas/sitemap/0.9}loc")]
    assert locs == ["https://khaigpt.vercel.app"]


def test_manifest():
    d = requests.get(f"{BASE_URL}/manifest.webmanifest", timeout=30).json()
    assert d["name"] == "Khai Huynh" and d["start_url"] == "/" and d["icons"]


# 404 page
def test_404():
    r = requests.get(f"{BASE_URL}/some-missing-page", timeout=30)
    assert r.status_code == 404
    h = r.text
    assert len(re.findall(r'<meta name="robots"', h)) == 1 and 'content="noindex"' in h
    assert 'rel="canonical"' not in h
    for c in ["about", "work", "writing", "ask", "hi"]:
        assert f'href="/#{c}"' in h
    assert 'data-testid="not-found-home"' in h
