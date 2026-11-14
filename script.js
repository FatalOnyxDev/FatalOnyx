(() => {
  const config = window.FATALONYX_CONFIG || {};
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

  // Header treatment and accessible mobile navigation.
  const header = $(".site-header");
  const menu = $(".menu-toggle");
  const navLinks = $(".nav-links");
  const closeMenu = () => { navLinks.classList.remove("open"); menu.setAttribute("aria-expanded", "false"); menu.setAttribute("aria-label", "Open navigation menu"); };
  menu.addEventListener("click", () => {
    const open = !navLinks.classList.contains("open");
    navLinks.classList.toggle("open", open);
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
  });
  $$(".nav-link, .nav-hire").forEach(link => link.addEventListener("click", closeMenu));
  window.addEventListener("scroll", () => header.classList.toggle("scrolled", window.scrollY > 20), { passive: true });

  // Active section tracking.
  const sections = $$("main section[id]");
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          $$(".nav-link").forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
        }
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach(section => sectionObserver.observe(section));
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("visible"); revealObserver.unobserve(entry.target); }
    }), { threshold: .08 });
    $$(".reveal").forEach(el => revealObserver.observe(el));
  } else {
    $$(".reveal").forEach(el => el.classList.add("visible"));
  }

  // Centralized editable content.
  $("#availability-text").textContent = config.availability || "Availability not specified";
  $("#year").textContent = new Date().getFullYear();
  const stack = $("#stack-tags");
  (config.technologies || []).forEach(name => {
    const tag = document.createElement("span"); tag.textContent = name; stack.appendChild(tag);
  });

  // Render review cards from the editable portfolio content.
  const reviewGrid = $("#reviews-grid");
  (Array.isArray(config.testimonials) ? config.testimonials : []).forEach(review => {
    const card = document.createElement("article"); card.className = "review-card";
    const quoteMark = document.createElement("span"); quoteMark.className = "review-quote"; quoteMark.textContent = "“";
    const quote = document.createElement("p"); quote.className = "review-text"; quote.textContent = review.text || "";
    const person = document.createElement("div"); person.className = "review-person";
    const avatar = document.createElement("span"); avatar.className = "review-avatar"; avatar.textContent = (review.name || "S").trim().charAt(0).toUpperCase();
    const identity = document.createElement("div");
    const name = document.createElement("b"); name.textContent = review.name || "Client";
    const location = document.createElement("small"); location.textContent = review.location || "";
    identity.append(name, location); person.append(avatar, identity);
    card.append(quoteMark, quote, person); reviewGrid.appendChild(card);
  });

  // Contact links: only configured details are rendered.
  const methods = $("#contact-methods");
  const addMethod = (label, value, href, icon) => {
    if (!value) return;
    const item = href ? document.createElement("a") : document.createElement("div");
    item.className = "contact-method";
    if (href) {
      item.href = href;
      if (href.startsWith("http")) { item.target = "_blank"; item.rel = "noopener noreferrer"; }
    }
    const symbol = document.createElement("span"); symbol.textContent = icon;
    const text = document.createElement("span"); text.innerHTML = `<small>${label}</small>`;
    const strong = document.createElement("b"); strong.textContent = value; text.appendChild(strong);
    item.append(symbol, text); methods.appendChild(item);
  };
  const c = config.contact || {};
  addMethod("DISCORD SERVER", c.discordUrl ? "Join the FatalOnyx Discord" : "", c.discordUrl || "", "◈");
  addMethod("DISCORD USERNAME", c.discordUsername, "", "@ ");
  addMethod("EMAIL", c.email, `mailto:${c.email}`, "✉");
  addMethod("GITHUB", c.github ? c.github.replace(/^https?:\/\//, "") : "", c.github || "#", "⌘");
  (c.otherLinks || []).forEach(item => addMethod(item.label || "LINK", item.value, item.url, "↗"));
  if (!methods.children.length) {
    const p = document.createElement("p"); p.className = "muted"; p.textContent = "Use the Discord contact options on this page to get in touch."; methods.appendChild(p);
  }
  const socials = $("#footer-socials");
  const socialLinks = [c.discordUrl ? ["Discord Server", c.discordUrl] : null, c.github ? ["GitHub", c.github] : null, c.email ? ["Email", `mailto:${c.email}`] : null].filter(Boolean);
  if (socialLinks.length) {
    socials.innerHTML = "";
    socialLinks.forEach(([label, url]) => { const a = document.createElement("a"); a.href = url; a.textContent = label; if (url.startsWith("http")) {a.target="_blank";a.rel="noopener noreferrer";} socials.appendChild(a); });
  }

  // Project cards and filtering. No fabricated sample projects are shown.
  const projectGrid = $("#project-grid"), emptyState = $("#empty-projects");
  const projects = Array.isArray(config.projects) ? config.projects : [];
  const renderProjects = filter => {
    projectGrid.innerHTML = "";
    const visible = projects.filter(p => filter === "all" || p.category === filter);
    $("#project-count").textContent = `${visible.length} PROJECT${visible.length === 1 ? "" : "S"}`;
    emptyState.hidden = visible.length > 0;
    visible.forEach(project => {
      const card = document.createElement("article"); card.className = "project-card";
      const media = document.createElement("div"); media.className = "project-image";
      const projectImages = Array.isArray(project.images) && project.images.length ? project.images : (project.image ? [project.image] : []);
      if (projectImages.length) {
        const gallery = document.createElement("div"); gallery.className = "project-image-gallery";
        projectImages.forEach((src, index) => { const img = document.createElement("img"); img.src = src; img.alt = `${project.imageAlt || project.title || "Project"} screenshot ${index + 1}`; img.loading = "lazy"; gallery.appendChild(img); });
        media.appendChild(gallery);
      } else media.textContent = "PROJECT PREVIEW";
      const body = document.createElement("div"); body.className = "project-body";
      const title = document.createElement("h3"); title.textContent = project.title || "Untitled project";
      const desc = document.createElement("p"); desc.textContent = project.description || "";
      const tags = document.createElement("div"); tags.className = "project-tags";
      (project.technologies || []).forEach(t => { const tag = document.createElement("span"); tag.textContent = t; tags.appendChild(tag); });
      body.append(title, desc, tags);
      if (project.url) { const a = document.createElement("a"); a.className = "card-link"; a.href = project.url; a.target = "_blank"; a.rel = "noopener noreferrer"; a.textContent = "View project ↗"; body.appendChild(a); }
      card.append(media, body); projectGrid.appendChild(card);
    });
  };
  renderProjects("all");
  $$(".filter").forEach(button => button.addEventListener("click", () => {
    $$(".filter").forEach(b => b.classList.toggle("active", b === button));
    renderProjects(button.dataset.filter);
  }));

  // Contact form: real submission only when a real endpoint is configured.
  const form = $("#contact-form"), message = $("#form-message"), notice = $("#form-notice");
  const endpoint = (config.formEndpoint || "").trim();
  if (endpoint) notice.textContent = "Your enquiry will be submitted securely to the configured form endpoint.";
  form.addEventListener("submit", async event => {
    event.preventDefault(); message.textContent = "";
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form).entries());
    const submit = $("button[type=submit]", form);
    if (!endpoint) {
      const summary = [`Name: ${data.name}`, `Email: ${data.email}`, `Discord: ${data.discord || "Not provided"}`, `Service: ${data.service}`, `Budget: ${data.budget || "Not provided"}`, `Description: ${data.description}`].join("\n");
      try {
        await navigator.clipboard.writeText(summary);
        message.textContent = "Enquiry prepared and copied to your clipboard. Demo mode is active: it has NOT been sent.";
      } catch {
        message.textContent = "Demo mode: no endpoint is configured, so this enquiry has NOT been sent. Connect the contact form to a submission service before accepting enquiries here.";
      }
      return;
    }
    submit.disabled = true; submit.textContent = "Sending…";
    try {
      const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(data) });
      if (!response.ok) throw new Error(`Request failed (${response.status})`);
      message.textContent = "Your enquiry was submitted successfully. Thank you!";
      form.reset();
    } catch (error) {
      message.textContent = `Submission failed: ${error.message}. Please use a configured direct contact method instead.`;
    } finally {
      submit.disabled = false; submit.innerHTML = 'Prepare enquiry <span>↗</span>';
    }
  });
})();