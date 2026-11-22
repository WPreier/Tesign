# Tesign

Statische Präsentationswebsite für TESIGN – ALU | STAHL | GLAS | DESIGN GmbH, Stoob.

**Version:** siehe [`VERSION`](VERSION) (aktuell **1.1.0**) · Änderungen: [`CHANGELOG.md`](CHANGELOG.md)

Es gibt keinen Baukasten, kein Backend und keine Abhängigkeiten. Live-Referenz: [https://www.tesign.at](https://www.tesign.at).

## Projektstruktur

```
.
├── VERSION                 # aktuelle SemVer-Versionsnummer
├── CHANGELOG.md            # Änderungsprotokoll
├── README.md
├── .gitignore
└── theweb/                 # auslieferbare Website (Document Root)
    ├── index.html
    ├── planung.html
    ├── referenzen.html
    ├── anfrage.html
    ├── impressum.html
    ├── datenschutz.html
    ├── styles.css
    ├── theme.js
    └── bilder/
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

- Keine Drittanbieter-Skripte, Schriften oder Analysedienste
- CSP und weitere Header per Meta-Tag bzw. Server (siehe unten)
- Anfragen nur per `mailto:office@tesign.at` — kein Formular, kein Backend
- Theme-Wahl nur lokal in `localStorage`

## Header für den Betrieb

Die Seiten setzen eine Content-Security-Policy bereits per Meta-Tag. Der Webserver sollte dieselben Grenzen zusätzlich als HTTP-Header senden. `frame-ancestors` wirkt nur als HTTP-Header, nicht im Meta-Tag.

```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; connect-src 'self'; media-src 'none'; object-src 'none'; base-uri 'self'; form-action 'none'; frame-src 'none'; frame-ancestors 'none'
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
X-Frame-Options: DENY
Permissions-Policy: accelerometer=(), autoplay=(), camera=(), display-capture=(), geolocation=(), gyroscope=(), microphone=(), payment=(), usb=()
```

Beispiel für nginx:

```nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; connect-src 'self'; media-src 'none'; object-src 'none'; base-uri 'self'; form-action 'none'; frame-src 'none'; frame-ancestors 'none'" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header X-Frame-Options "DENY" always;
add_header Permissions-Policy "accelerometer=(), autoplay=(), camera=(), display-capture=(), geolocation=(), gyroscope=(), microphone=(), payment=(), usb=()" always;
```

Es werden keine Geheimnisse, keine Analysedienste und keine Schriften von Dritten verwendet. Anfragen laufen über `mailto:office@tesign.at`. Es gibt kein Formular und kein Backend.
