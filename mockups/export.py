#!/usr/bin/env python3
"""Render flow.html to PNGs with Playwright.

    python3 build.py && python3 export.py            # every screen + overview
    python3 export.py 09-paywall 14-player           # just these screens

Outputs:
    png/<id>.png          one phone per file (2x, for docs and dev handoff)
    png/flow-overview.png the whole board, downscaled
"""
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).parent
OUT = ROOT / "png"
OUT.mkdir(exist_ok=True)
only = set(sys.argv[1:])

with sync_playwright() as p:
    browser = p.chromium.launch()
    url = (ROOT / "flow.html").resolve().as_uri()

    # Per-screen, high resolution
    page = browser.new_page(viewport={"width": 1600, "height": 1000}, device_scale_factor=2)
    page.goto(url)
    page.evaluate("document.fonts.ready")
    for el in page.query_selector_all(".phone[data-id]"):
        sid = el.get_attribute("data-id")
        if only and sid not in only:
            continue
        el.screenshot(path=str(OUT / f"{sid}.png"), omit_background=True)
        print("wrote", sid)
    page.close()

    # Overview board, downscaled so it stays a reasonable file size
    if not only:
        page = browser.new_page(viewport={"width": 1600, "height": 1000}, device_scale_factor=0.5)
        page.goto(url)
        page.evaluate("document.fonts.ready")
        page.screenshot(path=str(OUT / "flow-overview.png"), full_page=True)
        print("wrote flow-overview")
    browser.close()
