#!/usr/bin/env python3
"""Build FitCue flow mockups.

Each screen lives in screens/NN-slug.html as an HTML fragment whose first line is
a JSON comment with metadata:

    <!-- {"title": "Paywall", "stage": 1, "tab": null, "flush": false,
          "caption": "What this screen does", "pay": "Paywall rule (optional)"} -->

Placeholders inside fragments:
    {{i:name}} / {{i:name:16}}   inline icon (24px grid, stroke) at a given size
    {{fig:pose}}                 pictogram athlete used in place of video stills

Output: flow.html (every screen on one board, grouped by stage).
Run export.py afterwards to render PNGs.
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).parent
SCREENS = ROOT / "screens"

APP = "FitCue"

STAGES = {
    1: ("Acquire", "Quiz → personal plan → account → paywall. Free users keep Week 1."),
    2: ("Train", "The daily loop: home → program → follow-along video → log → finish."),
    3: ("Retain", "Progress, streaks and challenges that bring people back."),
    4: ("Monetize & account", "Upsells beyond the subscription, account and win-back."),
}

# ---------------------------------------------------------------- icons
S = 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"'
F = 'fill="currentColor"'
ICONS = {
    "home": f'<path {S} d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    "library": f'<rect {S} x="3" y="4" width="18" height="16" rx="3"/><path {F} d="M10 8.8v6.4a.6.6 0 0 0 .9.5l5-3.2a.6.6 0 0 0 0-1l-5-3.2a.6.6 0 0 0-.9.5z"/>',
    "chart": f'<path {S} d="M5 20V11M12 20V5M19 20v-6"/>',
    "trophy": f'<path {S} d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>',
    "user": f'<circle {S} cx="12" cy="8" r="4"/><path {S} d="M4 21a8 8 0 0 1 16 0"/>',
    "users": f'<circle {S} cx="9" cy="8" r="3.5"/><path {S} d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"/>',
    "play": f'<path {F} d="M8 5.6v12.8a1 1 0 0 0 1.5.86l10.6-6.4a1 1 0 0 0 0-1.72L9.5 4.74A1 1 0 0 0 8 5.6z"/>',
    "pause": f'<rect {F} x="6" y="4.5" width="4.2" height="15" rx="1.2"/><rect {F} x="13.8" y="4.5" width="4.2" height="15" rx="1.2"/>',
    "next": f'<path {F} d="M5 5.5v13a.8.8 0 0 0 1.2.7l9.6-6.5a.8.8 0 0 0 0-1.4L6.2 4.8A.8.8 0 0 0 5 5.5z"/><rect {F} x="17" y="5" width="2.6" height="14" rx="1"/>',
    "prev": f'<path {F} d="M19 5.5v13a.8.8 0 0 1-1.2.7L8.2 12.7a.8.8 0 0 1 0-1.4l9.6-6.5a.8.8 0 0 1 1.2.7z"/><rect {F} x="4.4" y="5" width="2.6" height="14" rx="1"/>',
    "lock": f'<rect {S} x="5" y="11" width="14" height="10" rx="2.5"/><path {S} d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    "crown": f'<path {F} d="M3 8.2 7.4 12 12 5l4.6 7L21 8.2 19.2 18H4.8z"/><rect {F} x="5" y="19" width="14" height="2" rx="1"/>',
    "bell": f'<path {S} d="M6 9a6 6 0 0 1 12 0c0 6 2.5 8 2.5 8h-17S6 15 6 9M10 21a2 2 0 0 0 4 0"/>',
    "search": f'<circle {S} cx="11" cy="11" r="7"/><path {S} d="m20 20-3.6-3.6"/>',
    "filter": f'<path {S} d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle {S} cx="16" cy="6" r="2"/><circle {S} cx="10" cy="12" r="2"/><circle {S} cx="18" cy="18" r="2"/>',
    "clock": f'<circle {S} cx="12" cy="12" r="9"/><path {S} d="M12 7v5l3 2"/>',
    "flame": f'<path {S} d="M12 22c4.2 0 7-2.9 7-6.8 0-4-3-6.2-4.2-10.2-1.9 1.6-2.9 3.7-2.9 5.8-1-.7-1.8-2-1.9-3.6C7.4 9.6 5 12.4 5 15.2 5 19.1 7.8 22 12 22z"/>',
    "dumbbell": f'<path {S} d="M6.5 7v10M3.5 9.5v5M17.5 7v10M20.5 9.5v5M6.5 12h11"/>',
    "download": f'<path {S} d="M12 4v11M7 10.5l5 5 5-5M5 20h14"/>',
    "cast": f'<path {S} d="M3 8V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-5M3 13a8 8 0 0 1 8 8M3 17a4 4 0 0 1 4 4"/><circle {F} cx="3.5" cy="20.5" r="1"/>',
    "check": f'<path {S} d="m5 12.5 4.5 4.5L19 7.5"/>',
    "chev-r": f'<path {S} d="m9 6 6 6-6 6"/>',
    "chev-l": f'<path {S} d="m15 6-6 6 6 6"/>',
    "chev-d": f'<path {S} d="m6 9 6 6 6-6"/>',
    "x": f'<path {S} d="M6 6l12 12M18 6 6 18"/>',
    "heart": f'<path {S} d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z"/>',
    "pulse": f'<path {S} d="M3 12h4l2-5 4 10 2-5h6"/>',
    "star": f'<path {F} d="m12 3 2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.4l-5.6 3 1.1-6.3L2.9 9.7l6.3-.9z"/>',
    "share": f'<path {S} d="M12 3v12M7.5 7.5 12 3l4.5 4.5M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/>',
    "plus": f'<path {S} d="M12 5v14M5 12h14"/>',
    "minus": f'<path {S} d="M5 12h14"/>',
    "calendar": f'<rect {S} x="3" y="5" width="18" height="16" rx="2.5"/><path {S} d="M3 10h18M8 3v4M16 3v4"/>',
    "settings": f'<circle {S} cx="12" cy="12" r="3"/><path {S} d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>',
    "apple": f'<path {F} d="M16.4 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9-.7 0-1.8-.8-3-.8-1.6 0-3 .9-3.8 2.3-1.6 2.8-.4 6.9 1.2 9.2.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.3.9-1.3 1.3-2.6 1.3-2.6s-2.5-1-2.5-3.7zM14.2 5.8c.6-.8 1.1-1.9 1-3-.9 0-2.1.6-2.7 1.4-.6.7-1.1 1.8-1 2.9 1 .1 2.1-.5 2.7-1.3z"/>',
    "phone": f'<rect {S} x="7" y="2.5" width="10" height="19" rx="2.5"/><path {S} d="M11 18h2"/>',
    "video": f'<rect {S} x="2.5" y="6" width="13" height="12" rx="2.5"/><path {S} d="m15.5 10.5 6-3v9l-6-3"/>',
    "message": f'<path {S} d="M4 5h16v11H9l-5 4z"/>',
    "timer": f'<circle {S} cx="12" cy="13" r="8"/><path {S} d="M12 9v4l2.5 2M9 2.5h6"/>',
    "bolt": f'<path {S} d="M13 2.5 4.5 14H11l-1 7.5L18.5 10H12z"/>',
    "upload": f'<path {S} d="M12 20V9M7 13.5l5-5 5 5M5 4h14"/>',
    "shield": f'<path {S} d="M12 3 20 6v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path {S} d="m8.5 12 2.5 2.5 4.5-5"/>',
    "refresh": f'<path {S} d="M4 12a8 8 0 0 1 14-5.3L20 9M20 4v5h-5M20 12a8 8 0 0 1-14 5.3L4 15M4 20v-5h5"/>',
    "more": f'<circle {F} cx="5" cy="12" r="1.8"/><circle {F} cx="12" cy="12" r="1.8"/><circle {F} cx="19" cy="12" r="1.8"/>',
    "target": f'<circle {S} cx="12" cy="12" r="9"/><circle {S} cx="12" cy="12" r="5"/><circle {F} cx="12" cy="12" r="1.5"/>',
    "stretch": f'<circle {F} cx="7" cy="6" r="2"/><path {S} d="M4 20 8 11l5 3 3-5 4 11"/>',
    "cc": f'<rect {S} x="3" y="5" width="18" height="14" rx="3"/><path {S} d="M10.5 10a2 2 0 1 0 0 4M16.5 10a2 2 0 1 0 0 4"/>',
    "gift": f'<rect {S} x="3.5" y="8" width="17" height="4" rx="1"/><path {S} d="M5 12v8.5h14V12M12 8v12.5M12 8S10.5 3.5 8 4.5 9.5 8 12 8zm0 0s1.5-4.5 4-3.5S14.5 8 12 8z"/>',
    "scale": f'<rect {S} x="3" y="3.5" width="18" height="17" rx="4"/><path {S} d="M8 9.5a5 5 0 0 1 8 0L13 12"/>',
    "logo": f'<path {S} d="M3 9.5h3.5M2 12.5h4.5M3 15.5h3.5"/><path {F} d="M9.5 6.3v11.4a1 1 0 0 0 1.55.83l8.6-5.7a1 1 0 0 0 0-1.66l-8.6-5.7a1 1 0 0 0-1.55.83z"/>',
    "google": '<circle cx="12" cy="12" r="10" fill="#fff"/><path fill="#4285F4" d="M17.6 12.2c0-.4 0-.8-.1-1.2H12v2.3h3.1a2.7 2.7 0 0 1-1.2 1.7v1.5h1.9c1.1-1 1.8-2.5 1.8-4.3z"/><path fill="#34A853" d="M12 18c1.6 0 2.9-.5 3.9-1.4L14 15.1c-.5.4-1.2.6-2 .6-1.5 0-2.8-1-3.3-2.4H6.8v1.5A6 6 0 0 0 12 18z"/><path fill="#FBBC05" d="M8.7 13.3a3.6 3.6 0 0 1 0-2.3V9.5H6.8a6 6 0 0 0 0 5.3z"/><path fill="#EA4335" d="M12 8.4c.9 0 1.6.3 2.2.9l1.7-1.7A6 6 0 0 0 6.8 9.5L8.7 11c.5-1.5 1.8-2.6 3.3-2.6z"/>',
}


def icon(name, size=22):
    return (f'<svg width="{size}" height="{size}" viewBox="0 0 24 24" '
            f'aria-hidden="true">{ICONS[name]}</svg>')


# ------------------------------------------------- pictogram athletes
# Original, deliberately simple figures (viewBox 200x200) that stand in for
# video stills until real footage is shot.
L = 'stroke-width="15"'   # legs
A = 'stroke-width="12"'   # arms
T = 'stroke-width="24"'   # torso
FIGS = {
    "squat": f'''
      <rect x="22" y="44" width="14" height="42" rx="4" fill="currentColor"/>
      <rect x="164" y="44" width="14" height="42" rx="4" fill="currentColor"/>
      <rect x="37" y="52" width="8" height="26" rx="3" fill="currentColor"/>
      <rect x="155" y="52" width="8" height="26" rx="3" fill="currentColor"/>
      <path stroke-width="7" d="M36 65h128"/>
      <circle cx="100" cy="38" r="15" fill="currentColor" stroke="none"/>
      <path {A} d="M86 70 72 88 66 66M114 70 128 88 134 66"/>
      <path stroke-width="14" d="M85 69h30"/>
      <path {T} d="M100 62v44"/>
      <path {L} d="M93 110 64 132 70 174M107 110 136 132 130 174"/>
      <path stroke-width="10" d="M70 175 56 177M130 175 144 177"/>''',
    "curl": f'''
      <circle cx="100" cy="32" r="15" fill="currentColor" stroke="none"/>
      <path stroke-width="14" d="M84 62h32"/>
      <path {T} d="M100 58v50"/>
      <path {A} d="M84 64 78 94 76 120M116 64 126 96 136 70"/>
      <path stroke-width="6" d="M64 124h24M124 66h24"/>
      <rect x="58" y="115" width="9" height="18" rx="3" fill="currentColor"/>
      <rect x="85" y="115" width="9" height="18" rx="3" fill="currentColor"/>
      <rect x="118" y="57" width="9" height="18" rx="3" fill="currentColor"/>
      <rect x="145" y="57" width="9" height="18" rx="3" fill="currentColor"/>
      <path {L} d="M94 110 88 174M106 110 112 174"/>
      <path stroke-width="10" d="M88 175 76 177M112 175 124 177"/>''',
    "pushup": f'''
      <path stroke-width="3" opacity=".35" d="M14 176h172"/>
      <circle cx="158" cy="100" r="13" fill="currentColor" stroke="none"/>
      <path stroke-width="22" d="M142 114 96 128"/>
      <path {L} d="M96 128 40 148"/>
      <path {A} d="M140 118 147 146 145 170"/>
      <path stroke-width="10" d="M40 149 36 170"/>''',
    "lunge": f'''
      <path stroke-width="3" opacity=".35" d="M14 176h172"/>
      <circle cx="102" cy="30" r="14" fill="currentColor" stroke="none"/>
      <path {T} d="M101 50v52"/>
      <path {L} d="M100 106 136 118 136 168M100 106 82 156 46 164"/>
      <path stroke-width="10" d="M136 170 152 172"/>
      <path {A} d="M101 58 108 84 110 108"/>
      <rect x="100" y="108" width="20" height="11" rx="3" fill="currentColor"/>''',
    "run": f'''
      <circle cx="120" cy="32" r="14" fill="currentColor" stroke="none"/>
      <path stroke-width="22" d="M113 52 97 102"/>
      <path {L} d="M96 104 130 118 120 156M96 104 82 142 54 130"/>
      <path stroke-width="10" d="M120 157 136 160M54 130 46 120"/>
      <path {A} d="M110 58 128 78 142 64M110 58 90 78 78 96"/>''',
    "stretch": f'''
      <path stroke-width="3" opacity=".35" d="M14 176h172"/>
      <circle cx="72" cy="132" r="13" fill="currentColor" stroke="none"/>
      <path {A} d="M44 170 82 120"/>
      <path {T} d="M82 118 122 72"/>
      <path {L} d="M122 72 158 168"/>
      <path stroke-width="10" d="M158 170 172 172"/>''',
    "jump": f'''
      <circle cx="100" cy="28" r="14" fill="currentColor" stroke="none"/>
      <path {T} d="M100 48v50"/>
      <path {A} d="M90 56 66 38 50 18M110 56 134 38 150 18"/>
      <path {L} d="M94 100 74 134 60 168M106 100 126 134 140 168"/>''',
    "deadlift": f'''
      <path stroke-width="3" opacity=".35" d="M14 176h172"/>
      <circle cx="118" cy="148" r="26" stroke-width="8"/>
      <circle cx="118" cy="148" r="6" fill="currentColor" stroke="none"/>
      <circle cx="146" cy="70" r="13" fill="currentColor" stroke="none"/>
      <path stroke-width="22" d="M132 82 86 100"/>
      <path {L} d="M86 102 96 136 90 172"/>
      <path stroke-width="10" d="M90 173 106 175"/>
      <path {A} d="M128 88 122 118 118 142"/>''',
}


def fig(name):
    return ('<svg class="fig" viewBox="0 0 200 200" fill="none" stroke="currentColor" '
            f'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{FIGS[name]}</svg>')


# ------------------------------------------------------------ chrome
STATUS = (
    '<div class="island"></div><div class="status"><span>9:41</span><span class="icons">'
    '<svg width="18" height="12" viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx="1" fill="currentColor"/>'
    '<rect x="5" y="5.5" width="3" height="6.5" rx="1" fill="currentColor"/><rect x="10" y="3" width="3" height="9" rx="1" fill="currentColor"/>'
    '<rect x="15" y="0" width="3" height="12" rx="1" fill="currentColor"/></svg>'
    '<svg width="16" height="12" viewBox="0 0 16 12"><path d="M8 11.5 5.6 9a3.4 3.4 0 0 1 4.8 0zM3.4 6.8a6.6 6.6 0 0 1 9.2 0l-1.4 1.4a4.6 4.6 0 0 0-6.4 0zM1 4.4a10 10 0 0 1 14 0l-1.4 1.4a8 8 0 0 0-11.2 0z" fill="currentColor"/></svg>'
    '<svg width="26" height="12" viewBox="0 0 26 12"><rect x=".5" y=".5" width="22" height="11" rx="3.5" fill="none" stroke="currentColor" opacity=".45"/>'
    '<rect x="2" y="2" width="19" height="8" rx="2" fill="currentColor"/><rect x="23.5" y="4" width="1.8" height="4" rx=".9" fill="currentColor" opacity=".45"/></svg>'
    '</span></div>'
)
TABS = [("home", "Home", "home"), ("library", "Library", "library"), ("progress", "Progress", "chart"),
        ("community", "Challenges", "trophy"), ("profile", "Profile", "user")]


def tabbar(active):
    items = "".join(
        f'<div class="tab{" on" if key == active else ""}">{icon(ic, 24)}<span>{label}</span></div>'
        for key, label, ic in TABS)
    return f'<nav class="tabbar">{items}</nav>'


PH = re.compile(r"\{\{(i|fig):([a-z0-9-]+)(?::(\d+))?\}\}")


def render(fragment):
    def sub(m):
        kind, name, size = m.group(1), m.group(2), m.group(3)
        if kind == "i":
            return icon(name, int(size) if size else 22)
        return fig(name)
    return PH.sub(sub, fragment)


def load_screens():
    out = []
    for path in sorted(SCREENS.glob("*.html")):
        text = path.read_text()
        first, _, body = text.partition("\n")
        meta = json.loads(first.strip()[4:-3])
        meta["id"] = path.stem
        meta["html"] = render(body)
        out.append(meta)
    return out


def phone(s):
    flush = " flush" if s.get("flush") else ""
    tab = tabbar(s["tab"]) if s.get("tab") else ""
    under = " under" if s.get("under") else ""
    return (f'<div class="phone{under}" data-id="{s["id"]}">{STATUS}'
            f'<main class="screen{flush}">{s["html"]}</main>{tab}<div class="home-ind"></div></div>')


ARROW = f'<div class="arrow">{icon("chev-r", 34)}</div>'


def board(screens):
    parts = []
    for num, (name, desc) in STAGES.items():
        cells = []
        for s in [s for s in screens if s["stage"] == num]:
            pay = f'<span class="pay">{s["pay"]}</span>' if s.get("pay") else ""
            n = s["id"].split("-")[0]
            cells.append(f'<div class="cell">{phone(s)}<div class="cell-cap"><b>{n} · {s["title"]}</b>'
                         f'<span>{s["caption"]}</span>{pay}</div></div>')
        parts.append(f'<section class="stage"><div class="stage-head"><span class="stage-num">Stage {num}</span>'
                     f'<span class="stage-name">{name}</span><span class="stage-desc">{desc}</span></div>'
                     f'<div class="lane">{ARROW.join(cells)}</div></section>')
    head = (f'<header class="board-head"><div><div class="board-title">{APP} <span>·</span> complete app flow</div>'
            '<div class="board-sub">Video-first gym app. Dark + ember direction. Original mockups — '
            'pictogram figures stand in for real video stills.</div></div>'
            '<div class="legend"><span><i style="background:var(--ember)"></i>Primary action</span>'
            '<span><i style="background:var(--gold)"></i>Premium / paywall touchpoint</span></div></header>')
    return "".join(parts), head


def main():
    screens = load_screens()
    body, head = board(screens)
    html = ('<!doctype html><html lang="en"><head><meta charset="utf-8">'
            f'<meta name="viewport" content="width=device-width, initial-scale=1"><title>{APP} — flow mockups</title>'
            '<link rel="preconnect" href="https://fonts.googleapis.com">'
            '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">'
            '<link rel="stylesheet" href="styles.css"></head>'
            f'<body><div class="board">{head}{body}</div></body></html>')
    (ROOT / "flow.html").write_text(html)
    print(f"built flow.html with {len(screens)} screens")


if __name__ == "__main__":
    main()
