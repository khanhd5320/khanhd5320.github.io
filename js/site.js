// Audio player and menu functionality
document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("bgAudio");
    const button1 = document.getElementById("playerVolumeOff");
    const button2 = document.getElementById("playerVolumeOn");

    if (button1 != null && audio != null && button2 != null) {
        const playAudioOnce = (e) => {
            audio.play().catch(() => {});
            button1.style.display = "none";
            button2.style.display = "inline";
            document.removeEventListener("click", playAudioOnce);
            document.removeEventListener("pointerdown", playAudioOnce);
        };
        document.addEventListener("click", playAudioOnce);
        document.addEventListener("pointerdown", playAudioOnce);
        button1.onclick = () => {
            audiochangestatus(audio, false);
            button1.style.display = "none";
            button2.style.display = "inline";
        };
        button2.onclick = () => {
            audiochangestatus(audio, true);
            button1.style.display = "inline";
            button2.style.display = "none";
        };
    }

    const toggleBtn = document.getElementById('menuToggle');
    const menu = document.getElementById('floatingMenu');
    const icon = document.getElementById('menuIcon');

    let opened = false;

    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        opened = !opened;
        menu.classList.toggle('hidden');
        icon.style.transform = opened ? 'rotate(90deg)' : 'rotate(0deg)';
    }, true);

    document.querySelectorAll('.menu-row').forEach(item => {
        item.addEventListener('click', () => {
            const id = item.getAttribute('data-target');
            const target = document.getElementById(id);

            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            menu.classList.add('hidden');
            opened = false;
            icon.style.transform = 'rotate(0deg)';
        });
    });

    const popup = document.getElementById("image-popup");
    const popupImg = document.getElementById("image-popup-content");
    const closeBtn = document.querySelector(".image-popup-close");
    
    if (popup != null && popupImg != null && closeBtn != null) {
        document.querySelectorAll(".zoomable").forEach(img => {
            img.addEventListener("click", () => {
                popup.style.display = "flex";
                popupImg.src = img.src;
                document.body.style.overflow = "hidden";
                document.body.style.position = "fixed";
                document.body.style.width = "100%";
            });
        });

        const closePopup = () => {
            popup.style.display = "none";
            popupImg.src = "";
            document.body.style.overflow = "";
            document.body.style.position = "";
            document.body.style.width = "";
        };

        closeBtn.onclick = closePopup;

        popup.onclick = (e) => {
            if (e.target === popup) {
                closePopup();
            }
        };

        document.addEventListener("keydown", e => {
            if (e.key === "Escape") {
                popup.style.display = "none";
                popupImg.src = "";
            }
        });
    }
});

function audiochangestatus(audio, isPlaying) {
    if (!isPlaying) {
        audio.play();
    } else {
        audio.pause();
    }
    isPlaying = !isPlaying;
}
