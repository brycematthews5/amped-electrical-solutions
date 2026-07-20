// Amped Electrical Solutions — site behavior
(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  // Footer year
  var yearEl = document.querySelector("[data-current-year]");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Contact form validation + friendly inline feedback
  var form = document.querySelector("#contact-form");
  if (form) {
    var statusEl = form.querySelector(".form-status");

    function setError(field, message) {
      var wrapper = field.closest(".field");
      if (!wrapper) return;
      wrapper.classList.add("has-error");
      var errorEl = wrapper.querySelector(".field-error");
      if (errorEl) errorEl.textContent = message;
    }

    function clearError(field) {
      var wrapper = field.closest(".field");
      if (!wrapper) return;
      wrapper.classList.remove("has-error");
    }

    function isValidEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    form.querySelectorAll("input, textarea").forEach(function (field) {
      field.addEventListener("blur", function () {
        validateField(field);
      });
    });

    function validateField(field) {
      var value = field.value.trim();
      if (field.hasAttribute("required") && !value) {
        setError(field, "Please fill in this field.");
        return false;
      }
      if (field.type === "email" && value && !isValidEmail(value)) {
        setError(field, "Please enter a valid email address.");
        return false;
      }
      if (field.type === "tel" && value && value.replace(/\D/g, "").length < 7) {
        setError(field, "Please enter a valid phone number.");
        return false;
      }
      clearError(field);
      return true;
    }

    // Client-side validation only. On a valid submit we do NOT fake success —
    // the form lets its native POST go through to the configured endpoint
    // (see README.md "Connecting the contact form"). Until that endpoint is
    // set up, submissions will not reach an inbox, so we deliberately avoid
    // showing a false "message sent" confirmation.
    form.addEventListener("submit", function (e) {
      var fields = form.querySelectorAll("input[required], textarea[required], input[type=email], input[type=tel]");
      var allValid = true;

      fields.forEach(function (field) {
        if (!validateField(field)) {
          allValid = false;
        }
      });

      if (!allValid) {
        e.preventDefault();
        if (statusEl) {
          statusEl.className = "form-status is-error";
          statusEl.textContent = "Please fix the highlighted fields below and try again.";
        }
        var firstInvalid = form.querySelector(".has-error input, .has-error textarea");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var submitBtn = form.querySelector("button[type=submit]");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending…";
      }
      // Native submission proceeds from here to the form's action URL.
    });
  }
})();
