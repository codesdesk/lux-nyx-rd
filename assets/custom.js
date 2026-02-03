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

    // Collection grid 1 or 2 
    const allProductsBtns = document.querySelectorAll('.icon-product-grid > .all-products');
    const productsGridBtns = document.querySelectorAll('.icon-product-grid > .products-grid');
    const productGrid = document.querySelector('#product-grid');

    // Guard — do NOT return
    if (productGrid && (allProductsBtns.length || productsGridBtns.length)) {

        // Default state
        productsGridBtns.forEach(item => item.classList.add('active'));

        // Grid classes to toggle
        const ALL_PRODUCTS_CLASSES = [
            'grid--3-col-desktop',
            'grid--2-col-tablet',
            'grid--1-col',
            'grid',
            'product-grid'
        ];

        function enableAllProducts() {
            ALL_PRODUCTS_CLASSES.forEach(cls => productGrid.classList.add(cls));

            allProductsBtns.forEach(b => b.classList.add('active'));
            productsGridBtns.forEach(b => b.classList.remove('active'));
        }

        function disableAllProducts() {
            ALL_PRODUCTS_CLASSES.forEach(cls => productGrid.classList.remove(cls));

            allProductsBtns.forEach(b => b.classList.remove('active'));
            productsGridBtns.forEach(b => b.classList.add('active'));
        }

        // Events
        allProductsBtns.forEach(btn =>
            btn.addEventListener('click', enableAllProducts)
        );

        productsGridBtns.forEach(btn =>
            btn.addEventListener('click', disableAllProducts)
        );
    }




        // go to top button
        const scrollBtn = document.getElementById('scrollToTop');
        const footer = document.querySelector('footer'); // adjust selector if needed

        window.addEventListener('scroll', () => {
        const footerTop = footer.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        // Show / hide button
        if (window.scrollY > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }

        // When footer comes into view
        if (footerTop < windowHeight) {
            scrollBtn.style.position = 'static';
            scrollBtn.classList.add('stay_btn');
        } else {
            scrollBtn.style.position = 'fixed';
            scrollBtn.style.bottom = '80px';
            scrollBtn.classList.remove('stay_btn');
        }
        });

        // Scroll to top on click
        scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        });

/*------------------      VARIABLE POPUP        ----------------------*/
       
        const compareBox = document.querySelectorAll(".custom_sizes-popup_wrapper.variable_popup");
    if (!compareBox || compareBox.length === 0) return;

    function getActiveSlug() {
        const checkActive = document.querySelector('.option-color [data-selected-value]');
        if (!checkActive) return null;
        return checkActive.innerText.trim().toLowerCase().replace(/\s+/g, '_');
    }

    function updateCompareButtons() {
        const slug = getActiveSlug();
        if (!slug) return;

        const updatedSlug = `popup_${slug}`;

        const container = Array.from(compareBox).find(c =>
            c.classList.contains(updatedSlug)
        );

        const hideBtn = !container || container.classList.contains('hidden');

        document.querySelectorAll(".option-size .compare_size_btn").forEach(btn => {
            btn.classList.toggle('hidden', hideBtn);
        });
    }

    /* ---------------- SLUG CHANGE WATCHER ---------------- */

    let lastSlug = null;

    function watchSlug() {
        const currentSlug = getActiveSlug();
        if (currentSlug !== lastSlug) {
            lastSlug = currentSlug;
            updateCompareButtons();
        }
    }

    setInterval(watchSlug, 250);

    /* ---------------- DOM UPDATE WATCHER ---------------- */

    const observer = new MutationObserver(() => {
        updateCompareButtons();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class']
    });

    /* ---------------- BUTTON CLICK HANDLER ---------------- */

    document.addEventListener("click", (e) => {
        const btn = e.target.closest(".option-size .compare_size_btn");
        if (!btn) return;

        const slug = getActiveSlug();
        if (!slug) return;

        const updatedSlug = `popup_${slug}`;

        compareBox.forEach(container => {
            container.classList.toggle("active", container.classList.contains(updatedSlug));
        });
    });

    /* ---------------- POPUP CLOSE HANDLER ---------------- */

    document.addEventListener("click", (e) => {
        const btn = e.target.closest(".custom_sizes-popup_wrapper.variable_popup .compare_size_btn");
        if (!btn) return;

        compareBox.forEach(container => {
            container.classList.remove("active");
        });
    });

    /* ---------------- INITIAL RUN ---------------- */

    updateCompareButtons();

        // CUSTOM POPUP
        const customCompareBtns = document.querySelectorAll(".custom_product-size-wrapper .compare_size_btn");
        const customCompareBox = document.querySelector(".custom_sizes-popup_wrapper.custom_popup");
        const customCloseCompareBtns = customCompareBox ? customCompareBox.querySelectorAll(".compare_size_btn") : [];

        customCompareBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            customCompareBox?.classList.toggle("active");
        });
        });

        customCloseCompareBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            customCompareBox?.classList.toggle("active");
        });
        });



});