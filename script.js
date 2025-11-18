document.addEventListener("DOMContentLoaded", () => {

    const bgVideo = document.getElementById("bg-video");
    const sourceEl = bgVideo.querySelector("source");
    const fadeLayer = document.querySelector(".video-fade");
    const paletteRadios = document.querySelectorAll('input[name="palette"]');
    const paletteSummary = document.querySelector(".checkout-summary .pill");
    const body = document.body;

    // Palette label text
    const paletteNames = {
        base:   "Original Kaleidoscope",
        aurora: "Aurora Dream",
        neon:   "Neon Arcade",
        sunset: "Solar Sunset",
        ocean:  "Deep Ocean"
    };

    // Video paths
    const videoSources = {
        base:   "kaleidoscope.mp4",
        aurora: "videos/aurora.mp4",
        neon:   "videos/neon.mp4",
        sunset: "videos/sunset.mp4",
        ocean:  "videos/ocean.mp4"
    };

    function applyVideoSource(src) {
        if (!sourceEl) {
            bgVideo.src = src;
        } else {
            if (sourceEl.getAttribute("src") === src) return;
            sourceEl.setAttribute("src", src);
        }
        bgVideo.load();
        bgVideo.play().catch(() => {});
    }

    let firstLoad = true;

    function setBackgroundPalette(paletteId) {
        // Change overlay tint
        body.setAttribute("data-theme", paletteId);

        // Update checkout text
        if (paletteSummary && paletteNames[paletteId]) {
            paletteSummary.textContent = paletteNames[paletteId];
        }

        const src = videoSources[paletteId];
        if (!src) return;

        // First load: no fade
        if (firstLoad) {
            firstLoad = false;
            applyVideoSource(src);
            return;
        }

        // Fade to black, swap, fade back
        if (fadeLayer) {
            fadeLayer.style.opacity = "1";

            setTimeout(() => {
                applyVideoSource(src);
                setTimeout(() => {
                    fadeLayer.style.opacity = "0";
                }, 120);
            }, 280);
        } else {
            applyVideoSource(src);
        }
    }

    // When user clicks a palette label
    paletteRadios.forEach(radio => {
        radio.addEventListener("change", () => {
            const id = radio.id.replace("pal-", ""); // "aurora", "neon", etc.
            setBackgroundPalette(id);
        });
    });

    // Initial default state: base kaleidoscope
    setBackgroundPalette("base");

});
