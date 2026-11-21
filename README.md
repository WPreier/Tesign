# Tesign

Statische Präsentationswebsite für TESIGN – ALU | STAHL | GLAS | DESIGN GmbH, Stoob.

Die Seiten liegen als HTML-Dateien im Projektroot. Es gibt keinen Baukasten, kein Backend und keine Abhängigkeiten. Der Ordner `archiv/` ist eine heruntergeladene Referenz der bisherigen öffentlichen Seiten und wird nicht als Website ausgeliefert.

## Lokal öffnen

Im Projektordner einen lokalen Webserver starten und die Startseite im Browser aufrufen:

```bash
python3 -m http.server 8080
```

Dann [http://localhost:8080/](http://localhost:8080/) öffnen.

Ein lokaler Server ist nötig, damit die Content-Security-Policy die eigene Stylesheet- und Scriptdatei zulässt. Die Datei `index.html` direkt vom Dateisystem zu öffnen blockiert diese Dateien in vielen Browsern.

Die Darstellung folgt zunächst der Systemeinstellung (`prefers-color-scheme`). Der Schalter im Kopf speichert die Wahl unter dem Schlüssel `tesign-theme` in `localStorage`.

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
