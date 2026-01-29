// Scroll animation observer
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('#invitation, #introduction, #story, #album, #event, #bank');
    
    sections.forEach((section, index) => {
        const children = section.querySelectorAll('.relative > section, .relative > div');
        children.forEach((child, childIndex) => {
            // Skip ask-selection elements
            if (child.classList.contains('ask-selection')) return;
            
            if (index % 2 === 0) {
                child.classList.add('fade-left-section');
            } else {
                child.classList.add('fade-right-section');
            }
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0,
        rootMargin: '0px 0px 100px 0px'
    });

    // Observer riêng cho invitation với rootMargin nhỏ hơn
    const invitationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0,
        rootMargin: '0px 0px 50px 0px'
    });

    // Observe các phần tử thông thường
    document.querySelectorAll('.fade-in-section, .fade-left-section, .fade-right-section, .scale-in').forEach(el => {
        observer.observe(el);
    });

    // Observe các phần tử trong invitation
    document.querySelectorAll('.scale-in-slow').forEach(el => {
        invitationObserver.observe(el);
    });
});
