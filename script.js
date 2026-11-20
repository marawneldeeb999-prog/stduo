const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");
const filterButtons = document.querySelectorAll(".filter-button");
const galleryCards = document.querySelectorAll(".gallery-card");
const filterSuggestions = document.querySelector(".filter-suggestions");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxCaption = lightbox.querySelector("figcaption");
const lightboxClose = lightbox.querySelector(".lightbox-close");
const lightboxPrev = lightbox.querySelector(".lightbox-prev");
const lightboxNext = lightbox.querySelector(".lightbox-next");
const lightboxThumbnails = lightbox.querySelector(".lightbox-thumbnails");
let previouslyFocused;
let currentGallery = [];
let currentIndex = 0;

const photoAlbums = {
  portrait: [
    ["https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1600&q=90", "بورتريه فني — نور"],
    ["https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=90", "بورتريه شخصي — استوديو"],
    ["https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1600&q=90", "دراسة شخصية"],
    ["https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1600&q=90", "لقطة طبيعية"],
    ["https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=1600&q=90", "بورتريه طبيعي"],
    ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1600&q=90", "جلسة رجالية"],
    ["https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1600&q=90", "إضاءة هادئة"],
    ["https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1600&q=90", "جلسة شخصية"],
    ["https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1600&q=90", "بورتريه قريب"],
    ["https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1600&q=90", "لقطة خارجية"]
  ],
  wedding: [
    ["https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=90", "حكاية يوم — حفل زفاف"],
    ["https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=90", "لحظات الزفاف"],
    ["https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1600&q=90", "تفاصيل مميزة"],
    ["https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1600&q=90", "ذكريات مشتركة"],
    ["https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=90", "لحظة جميلة"],
    ["https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?auto=format&fit=crop&w=1600&q=90", "الزفاف والفرح"],
    ["https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=90", "القاعة والتفاصيل"],
    ["https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1600&q=90", "الطاولة والورد"],
    ["https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1600&q=90", "احتفال الأهل"],
    ["https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1600&q=90", "لحظة العروسين"]
  ],
  commercial: [
    ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=90", "تصوير منتجات"],
    ["https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1600&q=90", "هوية علامة تجارية"],
    ["https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?auto=format&fit=crop&w=1600&q=90", "تصوير تجاري"],
    ["https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1600&q=90", "تفاصيل وخامات"],
    ["https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1600&q=90", "منتج تقني"],
    ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1600&q=90", "تصوير أحذية"],
    ["https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1600&q=90", "تصميم وإضاءة"],
    ["https://images.unsplash.com/photo-1496180470114-6a2c7b1b1fe4?auto=format&fit=crop&w=1600&q=90", "تصوير عطر"],
    ["https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1600&q=90", "كاميرا واحتراف"],
    ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=90", "مشهد علامة تجارية"]
  ],
  architecture: [
    ["https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=90", "مساحات عمل"],
    ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=90", "تصميم داخلي"],
    ["https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1600&q=90", "عمارة حديثة"],
    ["https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=90", "ضوء ومساحة"],
    ["https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=90", "غرفة معاصرة"],
    ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=90", "واجهة معمارية"],
    ["https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=90", "تفاصيل غرفة"],
    ["https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=90", "تصميم داخلي دافئ"],
    ["https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1600&q=90", "مساحة وزوايا"],
    ["https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=90", "منزل حديث"]
  ],
  romance: [
    ["https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1600&q=90", "حب ورومانسية"],
    ["https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1600&q=90", "لحظة زوجية"],
    ["https://images.unsplash.com/photo-1517842264405-72bb906a1936?auto=format&fit=crop&w=1600&q=90", "جلسة رومانسية"],
    ["https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&w=1600&q=90", "قرب ودفء"],
    ["https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1600&q=90", "حب في الهواء"],
    ["https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?auto=format&fit=crop&w=1600&q=90", "لحظات شخصية"],
    ["https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1600&q=90", "جلسة حبيبين"],
    ["https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1600&q=90", "ذكرى عاطفية"]
  ],
  villas: [
    ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=90", "فيلا عصرية"],
    ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=90", "فيلا داخلية"],
    ["https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=90", "تفاصيل الفيلا"],
    ["https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=90", "مشروع سكني"],
    ["https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=90", "تصميم فيلا"],
    ["https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=90", "فيلا ومصمم داخلي"],
    ["https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1600&q=90", "المسبح والحديقة"],
    ["https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=90", "واجهة منزل فاخر"]
  ],
  buildings: [
    ["https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1600&q=90", "عمارة حديثة"],
    ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=90", "برج ومبنى"],
    ["https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=90", "واجهات تجارية"],
    ["https://images.unsplash.com/photo-1486718448742-163732cd1544?auto=format&fit=crop&w=1600&q=90", "تصميم مبنى"],
    ["https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1600&q=90", "عمارة عالية"],
    ["https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=90", "مبنى سكني"],
    ["https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=90", "مبنى ومساحات"],
    ["https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=1600&q=90", "واجهة هندسية"]
  ],
  hotels: [
    ["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=90", "فندق فاخر"],
    ["https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1600&q=90", "غرفة فندق"],
    ["https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=90", "منتجع ومسبح"],
    ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=90", "جناح ضيافة"],
    ["https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=90", "منتجع شاطئي"],
    ["https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1600&q=90", "ردهة فندق"],
    ["https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1600&q=90", "غرفة ملكية"],
    ["https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1600&q=90", "منتجع ومنظر"]
  ]
};

const hero = document.querySelector(".hero");

if (hero && window.matchMedia("(pointer: fine)").matches) {
  hero.addEventListener("pointermove", (event) => {
    const bounds = hero.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 16;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 12;
    hero.style.setProperty("--scene-x", `${x}px`);
    hero.style.setProperty("--scene-y", `${y}px`);
    hero.classList.add("is-pointer-active");
  });

  hero.addEventListener("pointerleave", () => {
    hero.classList.remove("is-pointer-active");
  });
}

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "فتح القائمة" : "إغلاق القائمة");
  navigation.classList.toggle("is-open", !isOpen);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navigation.classList.contains("is-open")) {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "فتح القائمة");
    navigation.classList.remove("is-open");
    menuButton.focus();
  }
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "فتح القائمة");
    navigation.classList.remove("is-open");
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });

    galleryCards.forEach((card) => {
      const isVisible = filter === "all" || card.dataset.category === filter;
      card.hidden = !isVisible;
    });
    const suggestedImages = filter === "all"
      ? Object.values(photoAlbums).flat()
      : (photoAlbums[filter] || []);
    renderFilterSuggestions(suggestedImages);
  });
});

function renderFilterSuggestions(items) {
  filterSuggestions.replaceChildren();
  items.forEach(([src, caption], index) => {
    const suggestion = document.createElement("button");
    suggestion.type = "button";
    suggestion.className = "suggestion-card";
    suggestion.setAttribute("aria-label", `تكبير ${caption}`);
    suggestion.innerHTML = `<img src="${src}" alt="${caption}" loading="lazy">`;
    suggestion.querySelector("img").onerror = (event) => {
      event.currentTarget.src = "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85";
    };
    suggestion.addEventListener("click", () => openGallery(items, index, suggestion));
    filterSuggestions.append(suggestion);
  });
}

renderFilterSuggestions(Object.values(photoAlbums).flat());

function closeLightbox() {
  if (lightbox.hidden) return;
  lightbox.hidden = true;
  document.body.classList.remove("lightbox-open");
  lightboxImage.src = "";
  lightboxThumbnails.replaceChildren();
  if (previouslyFocused) previouslyFocused.focus();
}

galleryCards.forEach((card) => {
  card.addEventListener("click", () => {
    previouslyFocused = card;
    openGallery(photoAlbums[card.dataset.category] || [[card.dataset.image, card.dataset.title]], 0);
  });
});

document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("click", () => openGallery(photoAlbums[card.dataset.gallery], 0, card));
});

function openGallery(items, index, trigger = null) {
  currentGallery = items;
  currentIndex = index;
  previouslyFocused = trigger || document.activeElement;
  lightbox.hidden = false;
  document.body.classList.add("lightbox-open");
  renderGalleryImage();
  lightboxThumbnails.replaceChildren();
  items.forEach(([src, caption], itemIndex) => {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", `عرض ${caption}`);
    button.innerHTML = `<img src="${src}" alt="">`;
    const thumbnailImage = button.querySelector("img");
    thumbnailImage.onerror = () => {
      thumbnailImage.onerror = null;
      thumbnailImage.src = "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=300&q=75";
    };
    button.addEventListener("click", () => {
      currentIndex = itemIndex;
      renderGalleryImage();
    });
    lightboxThumbnails.append(button);
  });
  lightboxClose.focus();
}

function renderGalleryImage() {
  const [src, caption] = currentGallery[currentIndex];
  lightboxImage.src = src;
  lightboxImage.alt = caption;
  lightboxImage.onerror = () => {
    lightboxImage.onerror = null;
    lightboxImage.src = "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=90";
  };
  lightboxCaption.textContent = `${caption} — ${currentIndex + 1} / ${currentGallery.length}`;
  const thumbnails = lightboxThumbnails.querySelectorAll("button");
  thumbnails.forEach((thumbnail, index) => thumbnail.classList.toggle("is-active", index === currentIndex));
  lightboxPrev.hidden = currentGallery.length < 2;
  lightboxNext.hidden = currentGallery.length < 2;
}

function moveGallery(direction) {
  if (!currentGallery.length) return;
  currentIndex = (currentIndex + direction + currentGallery.length) % currentGallery.length;
  renderGalleryImage();
}

lightboxPrev.addEventListener("click", () => moveGallery(-1));
lightboxNext.addEventListener("click", () => moveGallery(1));

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
  if (!lightbox.hidden && event.key === "ArrowRight") moveGallery(-1);
  if (!lightbox.hidden && event.key === "ArrowLeft") moveGallery(1);
});
