(() => {
  const config = window.SITE_CONFIG || {};
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  // Apply shared brand/contact configuration.
  $$("[data-brand]").forEach(el => el.textContent = config.brandName || "FutureLearn");
  $$("[data-email]").forEach(el => el.textContent = config.email || "hello@example.com");
  $$("[data-email-link]").forEach(el => el.href = `mailto:${config.email || "hello@example.com"}`);
  $$("[data-phone]").forEach(el => el.textContent = config.phoneDisplay || "+91 00000 00000");
  $$("[data-phone-link]").forEach(el => el.href = `tel:${config.phoneLink || "+910000000000"}`);
  $$("[data-address]").forEach(el => el.textContent = config.address || "Your Coaching Centre, Your City, India");
  $$("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
  $$("[data-map]").forEach(el => el.src = `https://www.google.com/maps?q=${encodeURIComponent(config.mapQuery || "India")}&output=embed`);

  const waMessage = encodeURIComponent(config.whatsappGreeting || "Hello, I would like to enquire.");
  $$("[data-whatsapp]").forEach(el => {
    const number = (config.whatsappNumber || "").replace(/\D/g, "");
    el.href = `https://wa.me/${number || "910000000000"}?text=${waMessage}`;
  });

  // Mobile navigation.
  const toggle = $(".menu-toggle");
  const nav = $(".nav-links");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("nav-open", open);
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    }));
  }

  // Animated counters only animate illustrative numeric values.
  const counters = $$("[data-count]");
  if ("IntersectionObserver" in window && counters.length) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count || 0);
      const start = performance.now();
      const duration = 900;
      const tick = now => {
        const progress = Math.min((now - start) / duration, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3)));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.unobserve(el);
    }), { threshold: 0.45 });
    counters.forEach(el => observer.observe(el));
  } else counters.forEach(el => el.textContent = el.dataset.count);

  // Course filter.
  const filterButtons = $$("[data-filter]");
  const courseItems = $$(".course-item");
  filterButtons.forEach(button => button.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.toggle("active", b === button));
    const filter = button.dataset.filter;
    courseItems.forEach(card => card.hidden = !(filter === "all" || card.dataset.category === filter));
  }));

  // Preselect course when a course card links to contact.html?course=...
  const courseSelect = $("#course-select");
  if (courseSelect) {
    const params = new URLSearchParams(window.location.search);
    const course = params.get("course");
    if (course) {
      const option = [...courseSelect.options].find(opt => opt.text.toLowerCase() === course.replace(/-/g, " ").toLowerCase());
      if (option) courseSelect.value = option.value;
      else {
        const match = [...courseSelect.options].find(opt => course.toLowerCase().includes(opt.text.toLowerCase()));
        if (match) courseSelect.value = match.value;
      }
    }
  }

  // Static demo enquiry: validate, then ask before opening WhatsApp. No backend or storage.
  const form = $("#enquiry-form");
  if (form) form.addEventListener("submit", event => {
    event.preventDefault();
    const status = $("#form-status");
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const lines = [
      `Hello ${config.brandName || "FutureLearn"}, I would like to enquire about admission.`,
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      data.get("email") ? `Email: ${data.get("email")}` : "",
      `Course: ${data.get("course")}`,
      data.get("level") ? `Class/level: ${data.get("level")}` : "",
      data.get("time") ? `Preferred time: ${data.get("time")}` : "",
      data.get("message") ? `Message: ${data.get("message")}` : ""
    ].filter(Boolean);
    const number = (config.whatsappNumber || "").replace(/\D/g, "");
    if (!number || number === "910000000000") {
      status.textContent = "Demo mode: please edit js/config.js and add the institute's real WhatsApp number before using this enquiry flow.";
      status.className = "form-status error";
      return;
    }
    status.textContent = "Your message is ready. WhatsApp will open in a new tab after you confirm.";
    status.className = "form-status success";
    const url = `https://wa.me/${number}?text=${encodeURIComponent(lines.join("\n"))}`;
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) status.textContent = "Your browser blocked the new tab. Use the WhatsApp button on this page or allow pop-ups for this site.";
  });
})();