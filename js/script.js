       const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');

        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Smooth scrolling for navigation links
        document.addEventListener('DOMContentLoaded', () => {
            // Theme toggle setup - Fixed dark mode
            const themeToggle = document.getElementById('theme-icon');
            const currentTheme = localStorage.getItem('theme') || 'light';

            // Apply theme immediately
            document.documentElement.setAttribute('data-theme', currentTheme);
            document.body.setAttribute('data-theme', currentTheme);
            updateThemeIcon(currentTheme);

            themeToggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

                document.documentElement.setAttribute('data-theme', newTheme);
                document.body.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                updateThemeIcon(newTheme);
            });

            function updateThemeIcon(theme) {
                themeToggle.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }

            // Loader fade out on page load - Faster loading
            setTimeout(() => {
                const loader = document.querySelector('.loader');
                if (loader) {
                    loader.classList.add('fade-out');
                    setTimeout(() => {
                        loader.style.display = 'none';
                    }, 300);
                }
            }, 800); // Reduced from 1000ms to 800ms

            // Scroll Progress Bar
            window.addEventListener('scroll', () => {
                const scrollTop = window.pageYOffset;
                const docHeight = document.body.scrollHeight - window.innerHeight;
                const scrollPercent = (scrollTop / docHeight) * 100;

                const progressBar = document.querySelector('.progress-bar');
                if (progressBar) {
                    progressBar.style.width = scrollPercent + '%';
                }
            });

            // Smooth scrolling
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });

            // Contact form
            const contactForm = document.querySelector('.contact-form');
            if (contactForm) {
                contactForm.addEventListener('submit', (e) => {
                    e.preventDefault();

                    const formData = new FormData(contactForm);
                    const name = formData.get('name');
                    const email = formData.get('email');
                    const message = formData.get('message');

                    if (name && email && message) {
                        alert('Thank you for your message! I will get back to you soon.');
                        contactForm.reset();
                    } else {
                        alert('Please fill in all fields.');
                    }
                });
            }

            // Navbar background on scroll
            window.addEventListener('scroll', function() {
                const navbar = document.querySelector('.navbar');
                const currentTheme = document.documentElement.getAttribute('data-theme');
                
                if (window.scrollY > 100) {
                    if (currentTheme === 'dark') {
                        navbar.style.background = 'rgba(26, 26, 26, 0.98)';
                    } else {
                        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                    }
                } else {
                    if (currentTheme === 'dark') {
                        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
                    } else {
                        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                    }
                }
            });
        });

        // Preload critical resources
        function preloadResources() {
            const preloadLinks = [
                'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
                'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
            ];

            preloadLinks.forEach(href => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'style';
                link.href = href;
                document.head.appendChild(link);
            });
        }