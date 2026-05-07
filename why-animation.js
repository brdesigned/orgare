function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
  
  function smoothstep(t) {
    return t * t * (3 - 2 * t);
  }
  
  function setFade(element, progress) {
    if (!element) return;
    const eased = smoothstep(progress);
    element.style.opacity = 0 + 0.8 * eased;
  }
  
  function setupPath(path) {
    if (!path) return;
    const length = path.getTotalLength();
    path.dataset.length = length;
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
    path.style.opacity = 0;
  }
  
  function revealPath(path, progress) {
    if (!path) return;
    const length = Number(path.dataset.length);
    const eased = smoothstep(progress);
    path.style.strokeDashoffset = length * (1 - eased);
    path.style.opacity = 0 + 0.8 * eased;
  }
  
  function initWhyAnimation() {
    const whyAnimSection = document.getElementById("why-animation-block");
    if (!whyAnimSection) return;

    // ── MOBILE PATH OVERRIDE (desktop paths stay untouched in the HTML) ──
  if (window.innerWidth <= 768) {
    document.getElementById("whyLine1").setAttribute("d", "M 440 165 C 320 260, 280 380, 320 520");
    document.getElementById("whyLine2").setAttribute("d", "M 337 550 C 450 720, 760 585, 850 575");
    document.getElementById("whyLine3").setAttribute("d", "M 950 575 C 1125 580, 1140 675, 710 860");
  }

  if (window.innerWidth <= 440) {
    document.getElementById("whyLine1").setAttribute("d", "M 440 185 C 10 260, 100 400, 500 500");
    document.getElementById("whyLine2").setAttribute("d", "M 110 41a0 C 250 620, 760 585, 750 500");
    document.getElementById("whyLine3").setAttribute("d", "M 970 58a5 C 1125 580, 1240 875, 710 860");
  }

  // ... rest of your existing code unchanged
  
    const whyAnimTitle = document.getElementById("whyAnimTitle");
    const whyAnimParagraph = document.getElementById("whyAnimParagraph");
    const whyAnimImageWrap = document.getElementById("whyAnimImageWrap");
    const whyAnimBottomWrap = document.getElementById("whyAnimBottomWrap");
  
    const whyLine1 = document.getElementById("whyLine1");
    const whyLine2 = document.getElementById("whyLine2");
    const whyLine3 = document.getElementById("whyLine3");
  
    setupPath(whyLine1);
    setupPath(whyLine2);
    setupPath(whyLine3);
  
    function updateWhyAnimation() {
      const rect = whyAnimSection.getBoundingClientRect();
      const viewportH = window.innerHeight;
  
      /* starts earlier */
      const start = viewportH * 0.85;
      const end = Math.max(rect.height + viewportH * 0.15, 1);
      const passed = start - rect.top;
      const sectionProgress = clamp(passed / end, 0, 1);
  
      const titleProgress = clamp((sectionProgress - 0.02) / 0.10, 0, 1);
      const line1Progress = clamp((sectionProgress - 0.12) / 0.16, 0, 1);
      const paragraphProgress = clamp((sectionProgress - 0.26) / 0.10, 0, 1);
      const line2Progress = clamp((sectionProgress - 0.36) / 0.18, 0, 1);
      const imageProgress = clamp((sectionProgress - 0.46) / 0.11, 0, 1);
      const line3Progress = clamp((sectionProgress - 0.66) / 0.14, 0, 1);
      const bottomProgress = clamp((sectionProgress - 0.80) / 0.10, 0, 1);
  
      setFade(whyAnimTitle, titleProgress);
      setFade(whyAnimParagraph, paragraphProgress);
      setFade(whyAnimImageWrap, imageProgress);
      setFade(whyAnimBottomWrap, bottomProgress);
  
      revealPath(whyLine1, line1Progress);
      revealPath(whyLine2, line2Progress);
      revealPath(whyLine3, line3Progress);
    }
  
    updateWhyAnimation();
    window.addEventListener("scroll", updateWhyAnimation, { passive: true });
    window.addEventListener("resize", updateWhyAnimation);
  }
  
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initWhyAnimation);
  } else {
    initWhyAnimation();
  }