const contactPage = document.querySelector(".contact-page");
const contactCard = document.querySelector(".contact-card");

if (contactPage && contactCard && window.matchMedia("(pointer: fine)").matches) {
  contactPage.addEventListener("pointermove", (event) => {
    const bounds = contactPage.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    contactCard.style.transform = `perspective(1200px) rotateY(${x * 3.5}deg) rotateX(${y * -3.5}deg) translateY(${-y * 3}px)`;
  });

  contactPage.addEventListener("pointerleave", () => {
    contactCard.style.transform = "";
  });
}
