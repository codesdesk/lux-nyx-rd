document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.slide_details.show_more').forEach(function (btn) {
        btn.addEventListener('click', function () {
        // Toggle overlay class
        document.querySelectorAll('.overlay').forEach(function (overlay) {
        overlay.classList.toggle('clr');
        });
        // Toggle svg class
        const svg = btn.querySelector('svg');
        if (svg) {
        svg.classList.toggle('selected');
        }
        // Toggle button text
        const btnLabel = btn.querySelector('a');
        if (btnLabel) {
        btnLabel.textContent =
            btnLabel.textContent.trim() === 'Show more'
            ? 'Show less'
            : 'Show more';
        }
        // Find the text box
        const detailedBox = btn.closest('.detailed-box');
        if (!detailedBox) return;
        const box = detailedBox.querySelector('.text');
        if (!box) return;
        const minimumHeight = 63;
        // Get current height
        const currentHeight = box.offsetHeight;
        // Get auto height
        box.style.height = 'auto';
        const autoHeight = box.scrollHeight;
        // Reset height before animation
        box.style.height = currentHeight + 'px';
        // Animate height
        const targetHeight =
        currentHeight === autoHeight ? minimumHeight : autoHeight;
        box.style.transition = 'height 0.4s ease';
        requestAnimationFrame(() => {
        box.style.height = targetHeight + 'px';
        });
    });
    });
});