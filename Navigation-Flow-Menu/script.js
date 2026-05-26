document.addEventListener('DOMContentLoaded', () => {
    const flowPanel = document.getElementById('flowPanel');
    const panelTitle = document.getElementById('panel-title');
    const panelLinksUl = document.getElementById('panel-links');
    const closeBtn = flowPanel.querySelector('.close-btn');

    let currentVisibleSectionId = null; // Track which section is currently active
    let isPanelManuallyClosed = false; // Flag for user closing the panel

    // --- Simulate Content Metadata & Relations DB ---
    // In a real application, this data would come from your backend/CMS
    const sectionData = {
        'intro': {
            title: 'Welcome & Next Steps',
            links: [
                { text: 'About Our Vision', url: '#about-vision' },
                { text: 'Meet Our Leadership', url: '#leadership' },
                { text: 'Contact Us for Information', url: '#contact' }
            ]
        },
        'ai': {
            title: 'Explore AI & Machine Learning',
            links: [
                { text: 'Download: AI Platform Whitepaper', url: '#ai-whitepaper' },
                { text: 'Case Study: AI in Finance', url: '#ai-finance-case-study' },
                { text: 'Register for AI Demo Webinar', url: '#ai-demo' },
                { text: 'Glossary of AI Terms', url: '#ai-glossary' }
            ]
        },
        'energy': {
            title: 'Discover Renewable Energy',
            links: [
                { text: 'Success Story: Solar Farm Project', url: '#solar-farm-story' },
                { text: 'Explore Battery Storage Tech', url: '#battery-tech' },
                { text: 'Get a Green Energy Quote', url: '#energy-quote' }
            ]
        },
        'materials': {
            title: 'Insights into Advanced Materials',
            links: [
                { text: 'Research Paper: Self-Healing Polymers', url: '#self-healing-polymers' },
                { text: 'Applications in Aerospace', url: '#aerospace-materials' },
                { text: 'Partnerships & Collaborations', url: '#materials-partnerships' }
            ]
        }
        // Add more sections as needed
    };

    // --- Function to update the Flow Panel's content ---
    function updateFlowPanel(sectionId) {
        const data = sectionData[sectionId];
        if (data) {
            panelTitle.textContent = data.title;
            panelLinksUl.innerHTML = ''; // Clear existing links

            data.links.forEach(link => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = link.url;
                a.textContent = link.text;
                li.appendChild(a);
                panelLinksUl.appendChild(li);
            });

            // Only show the panel if it wasn't manually closed for this section
            if (!isPanelManuallyClosed || currentVisibleSectionId !== sectionId) {
                 flowPanel.classList.add('is-visible');
                 isPanelManuallyClosed = false; // Reset if section changes
            }
            console.log(`Flow Panel updated for section: ${sectionId}`);
        } else {
            // If no data for section, hide the panel
            flowPanel.classList.remove('is-visible');
            console.log(`No data for section ${sectionId}, hiding panel.`);
        }
    }

    // --- Intersection Observer Setup ---
    const contentSections = document.querySelectorAll('.content-section');

    const observerOptions = {
        root: null, // observe against the viewport
        rootMargin: '0px',
        // Trigger when 60% of the section is visible. Adjust threshold as needed.
        // A higher threshold means the user has to be deeper into the section.
        threshold: 0.6
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const sectionId = entry.target.dataset.sectionId;
            if (entry.isIntersecting) {
                // If a section becomes significantly visible
                if (currentVisibleSectionId !== sectionId) {
                    currentVisibleSectionId = sectionId;
                    updateFlowPanel(sectionId);
                }
            } else {
                // If a section is no longer intersecting, and it was the current one,
                // you might hide the panel or update to a more general one.
                // For this demo, we'll let the next intersecting section take over.
                // Or you could hide it if scrolling completely past ALL sections,
                // but that adds complexity. Simpler: if a new section intersects, it updates.
                // If the currently displayed section goes out of view, and no new one comes in,
                // the panel *might* linger until a new section is hit, or we could add a timer to hide.
            }
        });
    }, observerOptions);

    // Start observing each content section
    contentSections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- Handle manual close button ---
    closeBtn.addEventListener('click', () => {
        flowPanel.classList.remove('is-visible');
        isPanelManuallyClosed = true; // Set flag to prevent immediate re-appearance for THIS section
        console.log('Flow Panel manually hidden.');
    });

    // Optional: Hide panel if scrolled to top or bottom without a specific section active
    // This is a refinement for a real app, omitted for core blueprint clarity.
    /*
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // If no specific section is currently intersecting after a brief pause
            // and the panel is visible, you might want to hide it or show a default.
            // This requires more complex logic to check if *any* section is intersecting.
            // For now, new section intersection triggers updates.
        }, 200); // Debounce scroll
    });
    */
});