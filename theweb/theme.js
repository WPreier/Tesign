(function () {
  "use strict";

  var KEY = "tesign-theme";

  function readStored() {
    try {
      var value = localStorage.getItem(KEY);
      if (value === "light" || value === "dark") {
        return value;
      }
    } catch (err) {
      return null;
    }
    return null;
  }

  function systemTheme() {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  }

  function currentTheme() {
    var explicit = document.documentElement.getAttribute("data-theme");
    if (explicit === "light" || explicit === "dark") {
      return explicit;
    }
    return systemTheme();
  }

  function syncButton(theme) {
    var button = document.getElementById("theme-toggle");
    if (!button) {
      return;
    }
    var dark = theme === "dark";
    button.setAttribute("aria-pressed", dark ? "true" : "false");
    button.textContent = dark ? "Hell" : "Dunkel";
    button.setAttribute(
      "aria-label",
      dark ? "Helles Design verwenden" : "Dunkles Design verwenden"
    );
  }

  var stored = readStored();
  if (stored) {
    document.documentElement.setAttribute("data-theme", stored);
  }

  document.addEventListener("DOMContentLoaded", function () {
    syncButton(currentTheme());

    var button = document.getElementById("theme-toggle");
    if (button) {
      button.addEventListener("click", function () {
        var next = currentTheme() === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        try {
          localStorage.setItem(KEY, next);
        } catch (err) {
          /* Darstellung bleibt für diese Sitzung gesetzt. */
        }
        syncButton(next);
      });
    }

    if (window.matchMedia) {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
        if (readStored()) {
          return;
        }
        document.documentElement.removeAttribute("data-theme");
        syncButton(currentTheme());
      });
    }
  });
})();
