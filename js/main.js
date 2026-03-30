// 移动端菜单切换
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('show');
            // 切换菜单图标
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // 点击链接后关闭菜单（移动端）
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                navLinks.classList.remove('show');
                // 恢复菜单图标
                const icon = menuToggle.querySelector('i');
                if (icon.classList.contains('fa-times')) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // 平滑滚动（如果浏览器不支持CSS scroll-behavior）
    if (!('scrollBehavior' in document.documentElement.style)) {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // 合作伙伴轮播切换
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const pageDots = document.querySelectorAll('.page-dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');

    if (carouselSlides.length > 0) {
        let currentSlide = 1;
        const totalSlides = carouselSlides.length;

        // 初始化显示第一张幻灯片
        updateCarousel();

        // 切换幻灯片函数
        function goToSlide(slideIndex) {
            if (slideIndex < 1) slideIndex = totalSlides;
            if (slideIndex > totalSlides) slideIndex = 1;
            currentSlide = slideIndex;
            updateCarousel();
        }

        // 更新轮播显示
        function updateCarousel() {
            // 更新幻灯片
            carouselSlides.forEach((slide, index) => {
                if (index + 1 === currentSlide) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });

            // 更新分页指示器
            pageDots.forEach((dot, index) => {
                if (index + 1 === currentSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });

            // 更新按钮状态（如果需要可禁用）
            if (prevBtn && nextBtn) {
                prevBtn.disabled = false;
                nextBtn.disabled = false;
                // 如果需要，可以在第一张和最后一张时禁用按钮
                // if (currentSlide === 1) prevBtn.disabled = true;
                // if (currentSlide === totalSlides) nextBtn.disabled = true;
            }
        }

        // 上一张按钮事件
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                goToSlide(currentSlide - 1);
            });
        }

        // 下一张按钮事件
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                goToSlide(currentSlide + 1);
            });
        }

        // 分页指示器点击事件
        if (pageDots.length > 0) {
            pageDots.forEach(dot => {
                dot.addEventListener('click', function() {
                    const slideIndex = parseInt(this.getAttribute('data-page'));
                    goToSlide(slideIndex);
                });
            });
        }

        // 触摸滑动支持
        const carousel = document.querySelector('.partners-carousel');
        if (carousel) {
            let startX = 0;
            let endX = 0;
            const swipeThreshold = 50; // 滑动阈值（像素）

            carousel.addEventListener('touchstart', function(e) {
                startX = e.touches[0].clientX;
            }, { passive: true });

            carousel.addEventListener('touchmove', function(e) {
                endX = e.touches[0].clientX;
            }, { passive: true });

            carousel.addEventListener('touchend', function() {
                const diffX = startX - endX;

                // 向右滑动（显示上一张）
                if (diffX > swipeThreshold) {
                    goToSlide(currentSlide - 1);
                }
                // 向左滑动（显示下一张）
                else if (diffX < -swipeThreshold) {
                    goToSlide(currentSlide + 1);
                }

                // 重置触摸位置
                startX = 0;
                endX = 0;
            });
        }

        // 自动轮播（可选）
        // let autoSlideInterval = setInterval(() => {
        //     goToSlide(currentSlide + 1);
        // }, 5000); // 每5秒自动切换

        // 鼠标悬停时暂停自动轮播
        // if (carousel) {
        //     carousel.addEventListener('mouseenter', () => {
        //         clearInterval(autoSlideInterval);
        //     });
        //
        //     carousel.addEventListener('mouseleave', () => {
        //         autoSlideInterval = setInterval(() => {
        //             goToSlide(currentSlide + 1);
        //         }, 5000);
        //     });
        // }
    }
});