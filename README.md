# Tesign

Statische Präsentationswebsite für TESIGN – ALU | STAHL | GLAS | DESIGN GmbH, Stoob.

**Version:** siehe [`VERSION`](VERSION) (aktuell **1.1.1**) · Änderungen: [`CHANGELOG.md`](CHANGELOG.md)

Es gibt keinen Baukasten, kein Backend und keine Abhängigkeiten. Live-Referenz: [https://www.tesign.at](https://www.tesign.at).

## Projektstruktur

```
.
├── VERSION                 # aktuelle SemVer-Versionsnummer
├── CHANGELOG.md            # Änderungsprotokoll
├── README.md
├── .gitignore
└── theweb/                 # auslieferbare Website (Document Root)
    ├── index.html …        # Seiten inkl. Meta-CSP
    ├── styles.css
    ├── theme.js
    ├── bilder/
    ├── .htaccess           # Apache-Security-Header
    ├── _headers            # Netlify / Cloudflare Pages
    └── nginx-security.conf # nginx-Snippet
```

Der Webserver muss auf `theweb/` als Document Root zeigen. Relative Pfade in den HTML-Dateien beziehen sich auf diesen Ordner.

## Lokal öffnen

Im Ordner `theweb/` einen lokalen Webserver starten und die Startseite im Browser aufrufen:

```bash
cd theweb
python3 -m http.server 8080
```

Alternativ mit Node.js:

```bash
npx serve -l 8765 theweb
```

Dann [http://localhost:8080/](http://localhost:8080/) bzw. [http://localhost:8765/](http://localhost:8765/) öffnen.

Ein lokaler Server ist nötig, damit die Content-Security-Policy die eigene Stylesheet- und Scriptdatei zulässt. Die Datei `index.html` direkt vom Dateisystem zu öffnen blockiert diese Dateien in vielen Browsern.

Die Darstellung folgt zunächst der Systemeinstellung (`prefers-color-scheme`). Der Schalter im Kopf speichert die Wahl unter dem Schlüssel `tesign-theme` in `localStorage`.

## Sicherheit

Maßnahmen in den HTML-Seiten (Meta / Markup):

- `Content-Security-Policy` (ohne `frame-ancestors` – das wirkt nur als HTTP-Header)
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Content-Type-Options: nosniff` (Meta als zusätzlicher Hinweis; Browser werten es zuverlässig nur als HTTP-Header)
- Keine Inline-Skripte/-Styles, keine Drittanbieter-Ressourcen
- Externe Links: `rel="noopener noreferrer"`
- Anfragen nur per `mailto:` — kein Formular, kein Backend
- Theme nur in `localStorage`

Vollständige Header (Server – empfohlen zusätzlich zur Meta-CSP):

```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; connect-src 'self'; media-src 'none'; object-src 'none'; child-src 'none'; worker-src 'none'; manifest-src 'none'; base-uri 'self'; form-action 'none'; frame-src 'none'; frame-ancestors 'none'; upgrade-insecure-requests
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
X-Frame-Options: DENY
Permissions-Policy: accelerometer=(), autoplay=(), bluetooth=(), camera=(), display-capture=(), encrypted-media=(), fullscreen=(), geolocation=(), gyroscope=(), hid=(), interest-cohort=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), serial=(), sync-xhr=(), usb=(), web-share=(), xr-spatial-tracking=()
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
X-Permitted-Cross-Domain-Policies: none
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

Bereitgestellte Server-Dateien in `theweb/`:

| Datei | Einsatz |
|-------|---------|
| `.htaccess` | Apache mit `AllowOverride` + `mod_headers` |
| `_headers` | Netlify, Cloudflare Pages |
| `nginx-security.conf` | per `include` in den nginx-`server`-Block |

## Server aktualisieren

1. Neueste Version holen:
   ```bash
   git pull origin main
   ```
2. Inhalt von `theweb/` in das Document Root der Domain legen (Dateien ersetzen, nicht den Ordnernamen `theweb` mit ausliefern, sofern Root = Site-Root ist).
3. Security-Header aktivieren:
   - **Apache:** `.htaccess` liegt bereits in `theweb/` – `AllowOverride All` und `mod_headers` prüfen, danach Config neu laden (`apachectl graceful` / Dienstneustart).
   - **nginx:** `include` auf `nginx-security.conf` setzen, `nginx -t` und `nginx -s reload`.
   - **Netlify / Cloudflare Pages:** `_headers` wird beim Deploy automatisch gelesen.
4. HTTPS sicherstellen (HSTS setzt voraus, dass die Seite nur über TLS erreichbar ist).
5. Kurz prüfen: Startseite, Navigation, Dark-Mode-Schalter; optional Header mit den Entwicklertools oder [securityheaders.com](https://securityheaders.com) kontrollieren.

Es werden keine Geheimnisse, keine Analysedienste und keine Schriften von Dritten verwendet.
