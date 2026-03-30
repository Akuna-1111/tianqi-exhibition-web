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

    // 近期业务活动轮播
    const newsSlides = document.querySelectorAll('.news-slide');
    const newsDots = document.querySelectorAll('.news-dot');
    const newsPrevBtn = document.querySelector('.news-prev');
    const newsNextBtn = document.querySelector('.news-next');

    if (newsSlides.length > 0) {
        let currentNewsSlide = 1;
        const totalNewsSlides = newsSlides.length;

        // 初始化显示第一张幻灯片
        updateNewsCarousel();

        // 切换幻灯片函数
        function goToNewsSlide(slideIndex) {
            if (slideIndex < 1) slideIndex = totalNewsSlides;
            if (slideIndex > totalNewsSlides) slideIndex = 1;
            currentNewsSlide = slideIndex;
            updateNewsCarousel();
        }

        // 更新轮播显示
        function updateNewsCarousel() {
            // 更新幻灯片
            newsSlides.forEach((slide, index) => {
                if (index + 1 === currentNewsSlide) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });

            // 更新分页指示器
            newsDots.forEach((dot, index) => {
                if (index + 1 === currentNewsSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        // 上一张按钮事件
        if (newsPrevBtn) {
            newsPrevBtn.addEventListener('click', function() {
                goToNewsSlide(currentNewsSlide - 1);
            });
        }

        // 下一张按钮事件
        if (newsNextBtn) {
            newsNextBtn.addEventListener('click', function() {
                goToNewsSlide(currentNewsSlide + 1);
            });
        }

        // 分页指示器点击事件
        if (newsDots.length > 0) {
            newsDots.forEach(dot => {
                dot.addEventListener('click', function() {
                    const slideIndex = parseInt(this.getAttribute('data-slide'));
                    goToNewsSlide(slideIndex);
                });
            });
        }

        // 自动轮播
        let newsAutoSlideInterval = setInterval(() => {
            goToNewsSlide(currentNewsSlide + 1);
        }, 4000); // 每4秒自动切换

        // 鼠标悬停时暂停自动轮播
        const newsCarousel = document.querySelector('.news-carousel');
        if (newsCarousel) {
            newsCarousel.addEventListener('mouseenter', () => {
                clearInterval(newsAutoSlideInterval);
            });

            newsCarousel.addEventListener('mouseleave', () => {
                newsAutoSlideInterval = setInterval(() => {
                    goToNewsSlide(currentNewsSlide + 1);
                }, 4000);
            });
        }
    }

    // 意向合作模态框功能
    const cooperationBtn = document.getElementById('cooperationBtn');
    const cooperationModal = document.getElementById('cooperationModal');
    const modalClose = document.getElementById('modalClose');
    const cancelBtn = document.getElementById('cancelBtn');
    const cooperationForm = document.getElementById('cooperationForm');

    if (cooperationBtn && cooperationModal) {
        // 打开模态框
        cooperationBtn.addEventListener('click', () => {
            cooperationModal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // 防止背景滚动
        });

        // 关闭模态框
        const closeModal = () => {
            cooperationModal.style.display = 'none';
            document.body.style.overflow = '';
        };

        if (modalClose) modalClose.addEventListener('click', closeModal);
        if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

        // 点击模态框外部关闭
        cooperationModal.addEventListener('click', (e) => {
            if (e.target === cooperationModal) {
                closeModal();
            }
        });

        // 表单提交
        if (cooperationForm) {
            cooperationForm.addEventListener('submit', async (e) => {
                e.preventDefault();

                // 收集表单数据
                const formData = new FormData(cooperationForm);
                const data = Object.fromEntries(formData);

                // 这里应该发送到后端API
                // 由于没有后端，我们模拟提交并显示提示
                try {
                    // 模拟API调用
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    // 显示成功消息
                    alert('提交成功！我们会尽快与您联系。');
                    cooperationForm.reset();
                    closeModal();

                    // 在实际应用中，这里应该发送到服务器
                    // fetch('/api/cooperation', {
                    //     method: 'POST',
                    //     headers: { 'Content-Type': 'application/json' },
                    //     body: JSON.stringify(data)
                    // })
                } catch (error) {
                    alert('提交失败，请稍后重试。');
                    console.error('Form submission error:', error);
                }
            });
        }
    }

    // 搜索功能
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');

    if (searchInput && searchBtn) {
        // 项目数据索引
        const projectIndex = [
            {
                title: '2023上海国际汽车展',
                description: '为知名汽车品牌设计搭建2000㎡展台，融合科技与艺术元素',
                url: 'project1.html',
                keywords: ['汽车', '展台', '科技', '艺术', '上海']
            },
            {
                title: '全球科技峰会',
                description: '为科技公司打造沉浸式产品发布舞台，运用全息投影技术',
                url: 'project2.html',
                keywords: ['科技', '峰会', '全息投影', '沉浸式', '产品发布']
            },
            {
                title: '集团品牌展厅',
                description: '设计建造1000㎡企业品牌展厅，展现企业发展历程与成就',
                url: 'project3.html',
                keywords: ['品牌展厅', '企业', '展厅', '历程', '成就']
            },
            {
                title: '历史文化博物馆',
                description: '策划设计博物馆常设展览，运用多媒体交互技术增强体验',
                url: 'project4.html',
                keywords: ['博物馆', '历史', '文化', '多媒体', '交互']
            },
            {
                title: '党政主题教育馆',
                description: '设计建设党政主题教育展厅，融合现代科技与传统元素',
                url: 'project5.html',
                keywords: ['党政', '教育馆', '主题教育', '科技', '传统']
            },
            {
                title: '科技创新主题馆',
                description: '打造互动式科技主题体验馆，运用VR/AR技术增强参观体验',
                url: 'project6.html',
                keywords: ['科技', '创新', '主题馆', 'VR', 'AR', '互动']
            }
        ];

        // 搜索函数
        const performSearch = (query) => {
            if (!query.trim()) return;
            const normalizedQuery = query.toLowerCase().trim();

            // 查找匹配的项目
            const matches = projectIndex.filter(project => {
                const titleMatch = project.title.toLowerCase().includes(normalizedQuery);
                const descMatch = project.description.toLowerCase().includes(normalizedQuery);
                const keywordMatch = project.keywords.some(keyword =>
                    keyword.toLowerCase().includes(normalizedQuery)
                );
                return titleMatch || descMatch || keywordMatch;
            });

            if (matches.length > 0) {
                // 跳转到第一个匹配的项目页面
                window.location.href = matches[0].url;
            } else {
                alert('未找到相关项目，请尝试其他关键词。');
            }
        };

        // 按钮点击搜索
        searchBtn.addEventListener('click', () => {
            performSearch(searchInput.value);
        });

        // 回车键搜索
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });
    }
});