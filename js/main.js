/* ============================================
   光遇攻略站 - 交互逻辑
   ============================================ */

(function() {
  'use strict';

  /* --- 1. 导航栏滚动效果 --- */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /* --- 2. 移动端菜单切换 --- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
    // 点击链接后关闭菜单
    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  /* --- 3. 标签切换 --- */
  const tabNav = document.getElementById('tabNav');
  if (tabNav) {
    const tabBtns = tabNav.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        const targetTab = btn.getAttribute('data-tab');

        // 移除所有激活状态
        tabBtns.forEach(function(b) { b.classList.remove('active'); });
        tabContents.forEach(function(c) { c.classList.remove('active'); });

        // 激活当前标签
        btn.classList.add('active');
        const targetContent = document.getElementById('tab-' + targetTab);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      });
    });
  }

  /* --- 4. 滚动入场动画 --- */
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(function(el) {
      observer.observe(el);
    });
  } else {
    // 降级：直接显示
    revealElements.forEach(function(el) {
      el.classList.add('visible');
    });
  }

  /* --- 5. 返回顶部按钮 --- */
  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --- 6. 漂浮光粒生成 --- */
  var particleContainer = document.getElementById('particles');
  if (particleContainer) {
    var particleCount = 18;
    for (var i = 0; i < particleCount; i++) {
      var particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.width = (3 + Math.random() * 5) + 'px';
      particle.style.height = particle.style.width;
      particle.style.animationDuration = (8 + Math.random() * 12) + 's';
      particle.style.animationDelay = (Math.random() * 10) + 's';
      particle.style.opacity = (0.3 + Math.random() * 0.4);
      particleContainer.appendChild(particle);
    }
  }

  /* --- 7. 首页日期显示 --- */
  var dateBadge = document.getElementById('todayDate');
  if (dateBadge) {
    var now = new Date();
    var months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    var days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    dateBadge.textContent = now.getFullYear() + '年' + months[now.getMonth()] + now.getDate() + '日 · ' + days[now.getDay()];
  }

})();
