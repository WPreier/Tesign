# Changelog

Alle wesentlichen Änderungen an diesem Repository.

Das Format orientiert sich an [Keep a Changelog](https://keepachangelog.com/de/1.1.0/).
Versionierung folgt [Semantic Versioning](https://semver.org/lang/de/).

## [1.1.1] – 2026-11-27

### Security
- CSP in allen HTML-Seiten verschärft (`child-src`, `worker-src`, `manifest-src`, `upgrade-insecure-requests`)
- Meta `X-Content-Type-Options: nosniff` ergänzt (Fallback; wirksam vor allem als HTTP-Header)
- Externe Links mit `rel="noopener noreferrer"` und `referrerpolicy`
- HTTP-Security-Header für Apache (`.htaccess`), Netlify/Cloudflare Pages (`_headers`) und nginx (`nginx-security.conf`): CSP inkl. `frame-ancestors`, HSTS, COOP/COEP/CORP, Permissions-Policy, X-Frame-Options, X-Permitted-Cross-Domain-Policies

## [1.1.0] – 2026-11-22

### Changed
- Website-Dateien und Assets in das Unterverzeichnis `theweb/` verschoben
- README an die neue Projektstruktur und lokale Startanweisung angepasst

## [1.0.0] – 2026-11-22

### Added
- Statische Präsentationswebsite (HTML, CSS, Theme-Schalter, Bilder)
- Sicherheits-Header-Dokumentation und Content-Security-Policy
- Impressum, Datenschutz, Planung, Referenzen, Anfrage
