export function popover() {
  const btn = document.getElementById("popoverBtn");
  let popover = null;
  let isVisible = false;

  btn.addEventListener("click", () => {
    if (isVisible) {
      hidePopover();
    } else {
      showPopover();
    }
  });

  function showPopover() {
    popover = document.createElement("div");
    popover.className = "popover";
    popover.style.display = "block";
    popover.innerHTML = `
      <div class="popover-header">Popover title</div>
      <div class="popover-body">And here's some amazing content. It's very engaging. Right?</div>
    `;
    document.body.appendChild(popover);

    const rect = btn.getBoundingClientRect();
    const popoverWidth = popover.offsetWidth;
    const left = rect.left + rect.width / 2 - popoverWidth / 2;
    const top = rect.top + rect.height + window.scrollY + 10 - 135;

    popover.style.left = `${left}px`;
    popover.style.top = `${top}px`;
    popover.style.display = "block";

    isVisible = true;
  }

  function hidePopover() {
    if (popover) {
      popover.remove();
      popover = null;
    }
    isVisible = false;
  }
}
