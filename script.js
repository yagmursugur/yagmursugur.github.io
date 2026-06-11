const projects = {
  pan: {
    title: "PAN",
    count: 8,
    captions: [
      "PAN ürün ailesi",
      "PAN konsept sunumu",
      "PAN form ve detay çalışması",
      "PAN kullanım senaryosu",
      "PAN parça ve görünüm detayları",
      "PAN teknik anlatım",
      "PAN aksesuar ve ürün ailesi",
      "PAN eskiz ve araştırma",
    ],
  },
  circlence: {
    title: "Circlence",
    count: 4,
    captions: [
      "Circlence ürün konsepti",
      "Circlence ölçülendirme ve teknik detay",
      "Circlence kullanım senaryosu",
      "Circlence sunum görseli",
    ],
  },
  scooter: {
    title: "Scooter Parça Tasarımı",
    count: 7,
    captions: [
      "Scooter parça çözümü",
      "Scooter ölçülendirme",
      "Bağlantı parçası ürün detayı",
      "Mikro mobilite sistem anlatımı",
      "Uygulama ekranları",
      "Scooter ürün anlatımı",
      "Mikro mobilite sunum sayfası",
    ],
  },
  campot: {
    title: "Campot",
    count: 4,
    captions: [
      "Campot konsept render",
      "Campot eskiz ve form araştırması",
      "Campot ürün görselleştirme",
      "Campot sunum sayfası",
    ],
  },
  eskiz: {
    title: "Eskiz ve İdeasyon",
    count: 6,
    captions: [
      "Eskiz çalışmaları",
      "Form araştırması",
      "Ürün eskizleri",
      "Konsept geliştirme",
      "Oran ve detay denemeleri",
      "İdeasyon panosu",
    ],
  },
};

const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxCaption = document.querySelector("#lightboxCaption");
const closeButton = document.querySelector(".lightbox-close");

function openLightbox(src, caption) {
  lightboxImage.src = src;
  lightboxImage.alt = caption;
  lightboxCaption.textContent = caption;
  lightbox.showModal();
}

Object.entries(projects).forEach(([key, project]) => {
  const container = document.querySelector(`[data-project="${key}"]`);
  if (!container) return;

  for (let index = 1; index <= project.count; index += 1) {
    const number = String(index).padStart(2, "0");
    const src = `assets/portfolio/${key}-${number}.webp`;
    const caption = project.captions[index - 1] || `${project.title} ${index}`;
    const button = document.createElement("button");
    const image = document.createElement("img");

    image.src = src;
    image.alt = caption;
    image.loading = index <= 2 ? "eager" : "lazy";
    button.type = "button";
    button.setAttribute("aria-label", `${caption} görselini aç`);
    button.append(image);
    button.addEventListener("click", () => openLightbox(src, caption));
    container.append(button);
  }
});

const cards = Array.from(document.querySelectorAll("[data-project-card]"));
const dotsContainer = document.querySelector(".carousel-dots");
const prevButton = document.querySelector(".carousel-control.prev");
const nextButton = document.querySelector(".carousel-control.next");
const carousel = document.querySelector(".project-carousel");
let activeIndex = 0;
let timer;

function wrap(index) {
  return (index + cards.length) % cards.length;
}

function renderCarousel() {
  cards.forEach((card, index) => {
    card.classList.remove("is-active", "is-prev", "is-next", "is-far");
    if (index === activeIndex) {
      card.classList.add("is-active");
    } else if (index === wrap(activeIndex - 1)) {
      card.classList.add("is-prev");
    } else if (index === wrap(activeIndex + 1)) {
      card.classList.add("is-next");
    } else {
      card.classList.add("is-far");
    }
  });

  Array.from(dotsContainer.children).forEach((dot, index) => {
    dot.classList.toggle("is-active", index === activeIndex);
    dot.setAttribute("aria-current", index === activeIndex ? "true" : "false");
  });
}

function goTo(index) {
  activeIndex = wrap(index);
  renderCarousel();
}

function startTimer() {
  window.clearInterval(timer);
  timer = window.setInterval(() => goTo(activeIndex + 1), 5200);
}

cards.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.setAttribute("aria-label", `${index + 1}. projeye git`);
  dot.addEventListener("click", () => {
    goTo(index);
    startTimer();
  });
  dotsContainer.append(dot);
});

prevButton.addEventListener("click", () => {
  goTo(activeIndex - 1);
  startTimer();
});

nextButton.addEventListener("click", () => {
  goTo(activeIndex + 1);
  startTimer();
});

carousel.addEventListener("mouseenter", () => window.clearInterval(timer));
carousel.addEventListener("mouseleave", startTimer);

renderCarousel();
startTimer();

closeButton.addEventListener("click", () => {
  lightbox.close();
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.close();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.open) {
    lightbox.close();
  }
});
