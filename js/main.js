function renderUndangan(data) {
    document.title = data.siteTitle;
    document.getElementById("page-title").textContent = data.siteTitle;
    document.getElementById("invitation-title").textContent = data.title;

    // Nama pasangan di semua elemen yang butuh
    document.querySelectorAll(".couple-names").forEach(el => {
        el.textContent = data.coupleNames;
    });

    document.getElementById("wedding-date").textContent = data.date;

    // Gambar background & pasangan
    const bgImg = document.getElementById("background-img");
    if (bgImg) {
        bgImg.src = "./assets/images/placeholder.webp";
        bgImg.setAttribute("data-src", data.backgroundImage);
    }

    const coupleImg = document.getElementById("couple-img");
    if (coupleImg) {
        coupleImg.src = "./assets/images/placeholder.webp";
        coupleImg.setAttribute("data-src", data.coupleImage);
    }

    // Data Mempelai Pria
    const groom = data.groom;
    document.getElementById("groom-name").textContent = groom.name;
    document.getElementById("groom-child").textContent = groom.childOrder;
    document.getElementById("groom-parents").textContent = groom.parents;
    const groomImg = document.getElementById("groom-img");
    groomImg.src = "./assets/images/placeholder.webp";
    groomImg.setAttribute("data-src", groom.image);

    // Data Mempelai Wanita
    const bride = data.bride;
    document.getElementById("bride-name").textContent = bride.name;
    document.getElementById("bride-child").textContent = bride.childOrder;
    document.getElementById("bride-parents").textContent = bride.parents;
    const brideImg = document.getElementById("bride-img");
    brideImg.src = "./assets/images/placeholder.webp";
    brideImg.setAttribute("data-src", bride.image);

    const countDownDate = () => {
        const until = document.getElementById('count-down')?.getAttribute('data-time')?.replace(' ', 'T');
        if (!until) {
            alert('Invalid countdown date.');
            return;
        }

        const count = (new Date(until)).getTime();

        const updateCountdown = () => {
            const distance = Math.abs(count - Date.now());

            document.getElementById('day').innerText = Math.floor(distance / (1000 * 60 * 60 * 24)).toString();
            document.getElementById('hour').innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString();
            document.getElementById('minute').innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString();
            document.getElementById('second').innerText = Math.floor((distance % (1000 * 60)) / 1000).toString();

            setTimeout(updateCountdown, 1000 - (Date.now() % 1000));
        };

        requestAnimationFrame(updateCountdown);
    };

    // Set waktu untuk hitung mundur
    const countdown = document.getElementById("count-down");
    if (countdown && data.event?.countdown) {
        countdown.setAttribute("data-time", data.event.countdown);
        countDownDate();
    }

    // Alamat dan Maps
    const mapLink = document.querySelector("a[href*='maps']");
    if (mapLink && data.location) {
        mapLink.href = data.location.maps;
        const addressEl = mapLink.nextElementSibling;
        if (addressEl) {
            addressEl.textContent = data.location.alamat;
        }
    }

    // Jam acara Akad & Resepsi
    const akadEl = document.getElementById("akad");
    const resepsiEl = document.getElementById("resepsi");

    if (akadEl && data.event?.akad) {
        const p = akadEl.querySelector("p");
        if (p) {
            p.textContent = `Pukul ${data.event.akad.waktu} - ${data.event.akad.ket}`;
        }
    }

    if (resepsiEl && data.event?.resepsi) {
        const p = resepsiEl.querySelector("p");
        if (p) {
            p.textContent = `Pukul ${data.event.resepsi.waktu} - ${data.event.resepsi.ket}`;
        }
    }

    // Dresscode
    const dressEl = document.getElementById("dress");
    if (dressEl && data.dresscode) {
        const title = dressEl.querySelector("h2");
        const desc = dressEl.querySelector("p");
        if (title && desc) {
            title.textContent = data.dresscode.nama;
            desc.textContent = data.dresscode.deskripsi;
        }
    }

    // Ganti galeri dinamis dari JSON
    const galleryOne = data.gallery?.galleryOne || [];
    const galleryTwo = data.gallery?.galleryTwo || [];

    const carouselOneInner = document.querySelector("#carousel-image-one .carousel-inner");
    const carouselTwoInner = document.querySelector("#carousel-image-two .carousel-inner");

    if (carouselOneInner && galleryOne.length > 0) {
        carouselOneInner.innerHTML = ""; // kosongkan dulu
        galleryOne.forEach((url, i) => {
            const item = document.createElement("div");
            item.className = `carousel-item${i === 0 ? " active" : ""}`;
            item.innerHTML = `
            <img src="${url}" alt="image ${i + 1}" class="d-block img-fluid" onclick="undangan.guest.modal(this)">
        `;
            carouselOneInner.appendChild(item);
        });
    }

    if (carouselTwoInner && galleryTwo.length > 0) {
        carouselTwoInner.innerHTML = ""; // kosongkan dulu
        galleryTwo.forEach((url, i) => {
            const item = document.createElement("div");
            item.className = `carousel-item${i === 0 ? " active" : ""}`;
            item.innerHTML = `
            <img src="${url}" alt="image ${i + 1 + galleryOne.length}" class="d-block img-fluid" onclick="undangan.guest.modal(this)">
        `;
            carouselTwoInner.appendChild(item);
        });
    }

    // Love Gift - Rekening
    const giftContainer = document.getElementById("gift-container");
    if (giftContainer && data.gifts?.length > 0) {
        giftContainer.innerHTML = `
        <h2 class="font-esthetic pt-2 mb-4" style="font-size: 2.25rem;">Love Gift</h2>
        <p class="mb-3" style="font-size: 0.95rem;">Dengan hormat, bagi Anda yang ingin memberikan tanda kasih kepada kami, dapat melalui:</p>
    `;

        data.gifts.forEach(gift => {
            const giftEl = document.createElement("div");
            giftEl.className = "bg-theme-auto rounded-4 shadow p-4 mx-4 mt-2 mb-4 text-start";
            giftEl.setAttribute("data-aos", "fade-up");
            giftEl.setAttribute("data-aos-duration", "2500");

            giftEl.innerHTML = `
            <img src="./assets/images/placeholder.webp"
                data-src="${gift.logo}"
                class="img-fluid p-1 rounded"
                style="max-width: 9vh; background-color: var(--bs-gray-300);" alt="${gift.bank}">

            <div class="d-flex justify-content-between align-items-center mt-1">
                <p class="m-0 p-0" style="font-size: 0.95rem;">${formatRekening(gift.rekening)}</p>
                <button class="btn btn-outline-auto btn-sm shadow-sm rounded-4"
                    style="font-size: 0.75rem;" data-copy="${gift.rekening}"
                    onclick="undangan.util.copy(this, 'Copied')">
                    <i class="fa-solid fa-copy me-1"></i>Copy
                </button>
            </div>

            <p class="mt-1 mb-0 p-0" style="font-size: 0.9rem;">${gift.nama}</p>
        `;

            giftContainer.appendChild(giftEl);
        });
    }

    window.undangan = window.undangan || {};
    undangan.util = undangan.util || {};

    // Fungsi copy ke clipboard
    undangan.util.copy = function (el, label = "Disalin") {
        const value = el.getAttribute("data-copy");
        if (!value) return;

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(value)
                .then(() => {
                    const original = el.innerHTML;
                    el.innerHTML = `<i class="fa-solid fa-check me-1"></i>${label}`;
                    setTimeout(() => el.innerHTML = original, 1500);
                })
                .catch(err => {
                    console.error("Clipboard API failed", err);
                    fallbackCopy(value, el, label);
                });
        } else {
            fallbackCopy(value, el, label);
        }
    };

    // Fallback manual pakai input tersembunyi
    function fallbackCopy(value, el, label) {
        const textarea = document.createElement("textarea");
        textarea.value = value;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand("copy");
            const original = el.innerHTML;
            el.innerHTML = `<i class="fa-solid fa-check me-1"></i>${label}`;
            setTimeout(() => el.innerHTML = original, 1500);
        } catch (err) {
            console.error("Fallback copy failed", err);
            alert("Gagal menyalin. Silakan salin manual.");
        }
        document.body.removeChild(textarea);
    }

    // Replace all data-src to src to force load images (lazy-load fallback)
    document.querySelectorAll('img[data-src]').forEach(img => {
        img.setAttribute('src', img.getAttribute('data-src'));
    });

    // Fungsi bantu buat format nomor rekening: #### #### ####
    function formatRekening(nomor) {
        return nomor.replace(/(\d{4})(?=\d)/g, "$1 ");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id") || "default";

    fetch(`js/data/${id}.json`)
        .then(res => {
            if (!res.ok) {
                window.location.href = "/404.html";
                throw new Error("Data undangan tidak ditemukan.");
            }
            return res.json();
        })
        .then(data => renderUndangan(data))
        .catch(err => console.error(err));
});
