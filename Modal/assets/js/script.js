// Projects data
    const projects = [
      {
        title: 'AI-Powered E-commerce Site on AWS',
        body:
          'Advanced conversational AI with natural language processing and quantum-enhanced responses',
        tech: ['JavaScript', 'Python', 'TensorFlow'],
        color: '#00d4ff',
      },
      {
        title: 'On-Premises Migration to AWS',
        description:
          'Using AWS IAM to Enable Multi-Factor Authentication',
        tech: ['React', 'Web3', 'Ethereum'],
        color: '#0099ff',
      },
      {
        title: 'Data Visualization',
        description:
          'WebGL-based game engine with advanced physics and neural rendering',
        tech: ['WebGL', 'JavaScript', 'GLSL'],
        color: '#00ccff',
      },
      {
        title: 'Training',
        description:
          'Quantum machine learning model for market prediction with 99% accuracy',
        tech: ['Python', 'TensorFlow', 'Quantum'],
        color: '#0066ff',
      },
      {
        title: 'Coming Soon',
        description: 'Immersive virtual reality web application with haptic feedback',
        tech: ['A-Frame', 'WebXR', 'Three.js'],
        color: '#00b3ff',
      },
      {
        title: 'Coming Soon',
        description: 'Real-time monitoring system for quantum IoT devices across dimensions',
        tech: ['Node.js', 'Socket.io', 'QuantumDB'],
        color: '#0080ff',
      },
      {
        title: 'Coming Soon',
        description: 'AI-powered code compiler that optimizes at quantum level',
        tech: ['LLVM', 'Neural Networks', 'C++'],
        color: '#004dff',
      },
        {
        title: 'VR Experience',
        description: 'Immersive virtual reality web application with haptic feedback',
        tech: ['A-Frame', 'WebXR', 'Three.js'],
        color: '#00b3ff',
      },
      {
        title: 'IoT Dashboard',
        description: 'Real-time monitoring system for quantum IoT devices across dimensions',
        tech: ['Node.js', 'Socket.io', 'QuantumDB'],
        color: '#0080ff',
      },
      {
        title: 'Neural Compiler',
        description: 'AI-powered code compiler that optimizes at quantum level',
        tech: ['LLVM', 'Neural Networks', 'C++'],
        color: '#004dff',
      },
    
  ]; 
// Articles data with images and links
const articles = {
  'AI-Powered E-commerce Site on AWS': {
    title: 'AI-Powered E-commerce Site on AWS',
    body: `
      <p>Deploying an AI-Powered E-commerce Site on AWS</p><br>
      <p>Containerized Application Deployment: Hands-on experience deploying containerized applications using AWS LightSail.</p><br>
<p>Secure & Flexible Configurations: The practical use of environment variables for managing and securing application configurations.</p><br>
<p>AI Integration: The real-world application of generative AI for practical solutions like customer support.</p><br>
 <p>deployed CloudMart on AWS LightSail, leveraging the scalability and efficiency of a container service. From setting up the container service to configuring environment variables, every step was a hands-on learning experience that reinforced my understanding of cloud-native deployment</p>    
    `,
    images: [
      { src: 'assets/images/cloudmart shop.png', caption: 'AI Chat Bot' },
      { src: 'assets/images/Cloudmart About.png', caption: 'About Cloud Mart' }, // Added caption here
      { src: 'assets/images/Cloudmart Home.png', caption: 'Cloud Mart' }, // Added caption here
    ],
    liveLink: 'https://your-live-demo-url.com/ai-chat-bot',
    githubLink: 'https://github.com/yourusername/ai-chat-bot',
  },
      'On-Premises Migration to AWS': {
        title: 'On-Premises Migration to AWS',
        body: `<h3>Using AWS IAM to Enable Multi-Factor Authentication</h3>
            <p>In this project based on a real-world scenario, I had the opportunity to use the latest cutting edge features of AWS IAM (Identity and Access Management) resources. The data related to the profiles was securely extracted, transformed and loaded into a file prepared for a script. In an automated way, groups were added, users were then added to groups, using Gitbash, AWS Cli, and shell script. In the AWS Console, MFA (Multi-factor authentication) was enabled and a group policy applied to their accounts as this strategy to have defense-in-depth is a security best practice.
           Provides robust privacy and sync using Web3 and Ethereum.</p>
        `,
        images: [
          { src: 'assets/images/PORTFOLIO PROJECTS_AWS - MODULE 2_ARCHITECTURE.png', caption: 'Solution Architecture' },
          { src: 'assets/images/PORTFOLIO PROJECTS_AWS - MODULE 2_THUMBNAIL.png', caption: 'Cloud Project' },
        ],
        liveLink: 'https://your-live-demo-url.com/blockchain-wallet',
        githubLink: 'https://github.com/yourusername/blockchain-wallet',
      },
'Data Visualization': {
        title: 'Data Visualization',
        body: `<h3>The Transformative Power of AI in My Toolkit</h3>
            <p>In this project, I enlisted an AI assistant called Gemeni powered by Google which turned out to be like having a dedicated team of data analysts, developers, and project managers at my fingertips. My role was to be the architect, providing the clear, creative prompts that transformed publicly available raw data into a compelling narrative.

Together, we created a single-page infographic. A rapidly generated data visualization generated with HTML, Tailwind CSS, and Chart.js code to make it a responsive, interactive visualization. Publicly available data was used to break down complex information making it incredibly easy to understand.</p>
        `,
        images: [
          { src: 'assets/images/1_2IjJnAR59J_qzcGeMJavbA.png', caption: 'Data Storytelling' },
          { src: 'assets/images/1_AxAVQYXq4-qdrbjMKX7TAg.png', caption: 'Simplicity & Clarity' },
          { src: 'assets/images/1_HmotBQX91AGr0zACf-alaw.png', caption: 'Visual Consistency' },
          { src: 'assets/images/1_vkXDqOfiH0WEH6RItOxb1w.png', caption: 'User Engagement' },
        ],
        liveLink: 'https://futuristiclab.github.io/FuturisticLab.github.io./',
        githubLink: 'https://futuristiclab.github.io/FuturisticLab.github.io./',
      },
'Training': {
        title: 'Training',
        body: `<h2>Network Technology Academy</h2><br>
<h3>CompTIA Security + Training/Certification, Certificate ID (476437364)     September 2023-April 2024</h3> <br><br>
Completed comprehensive training aligned with regulatory compliance requirements, covering data privacy, retention, disposal, licensing, policy, and chain of custody.<br><br>
Fulfilled 300+ hours of both lecture & technical labs covering core concepts CompTIA Security+ certification domains: Threats, Attacks, and Vulnerabilities; Architecture and Design; Implementation; Operations and Incident Response; Governance, Risk, and Compliance.<br><br>
Developed practical knowledge in incident response, risk mitigation, and security governance to support organizational security objectives.
</p>
        `,
        images: [
          { src: 'assets/images/ntai_certificate.png', caption: 'Network Technology Academy' },
          { src: 'assets/images/20260615_000635.jpg ', caption: 'Security +' },
          { src: 'assets/images/Foundations of CyberSecurity Google.png ', caption: 'Google Cybersecurity Fundamentals' },
        ],
        liveLink: 'https://futuristiclab.github.io/FuturisticLab.github.io./',
        githubLink: 'https://futuristiclab.github.io/FuturisticLab.github.io./',
      },
      // Add more article entries keyed by project title as needed
    };

    const network = document.getElementById('neural-network');
    const modal = document.getElementById('project-modal');
    const modalContent = modal.querySelector('.modal-content');
    let nodes = [];
    let connections = [];
    let isRotating = false;
    let rotationSpeed = 0.005;
    let mouseX = 0,
      mouseY = 0;
    let cursor = document.getElementById('custom-cursor');
    let infoPanel = document.getElementById('info-panel');
    let currentImageIndex = 0;

    // Initialize neural network: create nodes and connections
    function initializeNetwork() {
      network.innerHTML = '';
      nodes = [];
      connections = [];

      projects.forEach((project, index) => {
        createProjectNode(project, index);
      });
      createConnections();
      createParticles();
      createSpaceEffects();
      updateStats();
    }

    function createProjectNode(project, index) {
      const node = document.createElement('div');
      node.className = 'project-node';
      node.innerHTML = `<div class="project-title">${project.title}</div>`;

      // Fibonacci sphere distribution for positioning in 3D
      const phi = Math.acos(1 - (2 * (index + 1)) / projects.length);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (index + 1);

      const radius = 300;
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      node.style.left = `calc(50% + ${x}px)`;
      node.style.top = `calc(50% + ${y}px)`;
      node.style.transform = `translateZ(${z}px)`;

      // Click opens modal with rich article content
      node.addEventListener('click', () => openModal(project.title));

      network.appendChild(node);
      nodes.push({ element: node, project, x, y, z });
    }

    function createConnections() {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const distance = Math.sqrt(
            Math.pow(nodes[i].x - nodes[j].x, 2) +
              Math.pow(nodes[i].y - nodes[j].y, 2) +
              Math.pow(nodes[i].z - nodes[j].z, 2)
          );
          if (distance < 400 && Math.random() > 0.6) {
            createConnection(nodes[i], nodes[j]);
          }
        }
      }
    }

    function createConnection(nodeA, nodeB) {
      const line = document.createElement('div');
      line.className = 'connection-line';

      const rect1 = nodeA.element.getBoundingClientRect();
      const rect2 = nodeB.element.getBoundingClientRect();

      const x1 = rect1.left + rect1.width / 2;
      const y1 = rect1.top + rect1.height / 2;
      const x2 = rect2.left + rect2.width / 2;
      const y2 = rect2.top + rect2.height / 2;

      const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;

      line.style.width = `${distance}px`;
      line.style.left = `${x1}px`;
      line.style.top = `${y1}px`;
      line.style.transform = `rotate(${angle}deg)`;
      line.style.transformOrigin = '0 50%';

      network.appendChild(line);
      connections.push(line);
    }

    function createParticles() {
      for (let i = 0; i < 30; i++) {
        setTimeout(() => {
          const particle = document.createElement('div');
          particle.className = 'particle';
          particle.style.left = Math.random() * window.innerWidth + 'px';
          particle.style.top = window.innerHeight + 20 + 'px';
          particle.style.animationDelay = Math.random() * 8 + 's';
          particle.style.animationDuration = Math.random() * 6 + 8 + 's';

          document.getElementById('universe').appendChild(particle);

          setTimeout(() => {
            if (particle.parentNode) {
              particle.parentNode.removeChild(particle);
            }
          }, 14000);
        }, i * 300);
      }
      for (let i = 0; i < 20; i++) {
        setTimeout(() => {
          const qParticle = document.createElement('div');
          qParticle.className = 'quantum-particle';
          qParticle.style.left = Math.random() * window.innerWidth + 'px';
          qParticle.style.top = Math.random() * window.innerHeight + 'px';
          qParticle.style.animationDelay = Math.random() * 12 + 's';
          qParticle.style.animationDuration = Math.random() * 8 + 12 + 's';

          document.getElementById('universe').appendChild(qParticle);

          setTimeout(() => {
            if (qParticle.parentNode) {
              qParticle.parentNode.removeChild(qParticle);
            }
          }, 20000);
        }, i * 400);
      }
    }

    function createSpaceEffects() {
      for (let i = 0; i < 3; i++) {
        const nebula = document.createElement('div');
        nebula.className = 'nebula-effect';
        nebula.style.left = Math.random() * window.innerWidth + 'px';
        nebula.style.top = Math.random() * window.innerHeight + 'px';
        nebula.style.animationDelay = Math.random() * 20 + 's';
        document.getElementById('universe').appendChild(nebula);
      }
      for (let i = 0; i < 2; i++) {
        const wormhole = document.createElement('div');
        wormhole.className = 'wormhole';
        wormhole.style.left = Math.random() * window.innerWidth + 'px';
        wormhole.style.top = Math.random() * window.innerHeight + 'px';
        wormhole.style.animationDelay = Math.random() * 8 + 's';
        document.getElementById('universe').appendChild(wormhole);
      }
    }

    function updateStats() {
      document.getElementById('node-count').textContent = nodes.length;
      document.getElementById('connection-count').textContent = connections.length;
    }

    // Modal article gallery and content loading

    function loadArticle(projectTitle) {
      const article = articles[projectTitle];
      if (!article) return;

      modalContent.innerHTML = `
        <span class="close-modal" role="button" aria-label="Close modal">&times;</span>
        <div class="modal-article">
          <h2 class="article-title">${article.title}</h2>
          <div class="article-body">${article.body}</div>
          <div class="image-gallery" aria-label="Image gallery">
            <button class="nav prev" aria-label="Previous image">&#10094;</button>
            <div class="image-wrapper">
              <img src="" alt="" class="gallery-image" />
              <div class="caption"></div>
            </div>
            <button class="nav next" aria-label="Next image">&#10095;</button>
          </div>
          <div class="modal-buttons" style="margin-top: 20px; display: flex; gap: 15px; justify-content: center;">
            <button class="control-btn" onclick="window.open('${article.liveLink || '#'}', '_blank')">View Live</button>
            <button class="control-btn" onclick="window.open('${article.githubLink || '#'}', '_blank')">GitHub</button>
          </div>
        </div>
      `;

      currentImageIndex = 0;
      const galleryImage = modalContent.querySelector('.gallery-image');
      const caption = modalContent.querySelector('.caption');
      const prevBtn = modalContent.querySelector('.nav.prev');
      const nextBtn = modalContent.querySelector('.nav.next');
      const closeBtn = modalContent.querySelector('.close-modal');

      function updateImage() {
        galleryImage.src = article.images[currentImageIndex].src;
        galleryImage.alt = `${article.title} - Image ${currentImageIndex + 1}`;
        caption.textContent = article.images[currentImageIndex].caption;
      }

      updateImage();

      prevBtn.addEventListener('click', () => {
        currentImageIndex =
          currentImageIndex === 0 ? article.images.length - 1 : currentImageIndex - 1;
        updateImage();
      });

      nextBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % article.images.length;
        updateImage();
      });

      closeBtn.addEventListener('click', closeModal);

      // Keyboard navigation for images and closing modal
      modalContent.focus();
      modalContent.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevBtn.click();
        else if (e.key === 'ArrowRight') nextBtn.click();
        else if (e.key === 'Escape') closeModal();
      });
    }

    function openModal(projectTitle) {
      if (articles[projectTitle]) {
        loadArticle(projectTitle);
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      } else {
        // fallback to simple modal content
        modalContent.innerHTML = `
          <span class="close-modal" role="button" aria-label="Close modal">&times;</span>
          <h2 class="modal-title">${projectTitle}</h2>
          <p>Details not available.</p>
        `;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        // Close button
        modalContent.querySelector('.close-modal').addEventListener('click', closeModal);
      }
    }

    function closeModal() {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }

    // Controls and animation

    function toggleRotation() {
      isRotating = !isRotating;
    }
    function toggleInfo() {
      infoPanel.classList.toggle('active');
    }
    function randomizeNetwork() {
      nodes.forEach((node) => {
        const randomX = (Math.random() - 0.5) * 600;
        const randomY = (Math.random() - 0.5) * 600;
        const randomZ = (Math.random() - 0.5) * 400;

        node.element.style.left = `calc(50% + ${randomX}px)`;
        node.element.style.top = `calc(50% + ${randomY}px)`;
        node.element.style.transform = `translateZ(${randomZ}px)`;
      });
    }
    function resetView() {
      network.style.transform = '';
      initializeNetwork();
    }

    function animate() {
      if (isRotating) {
        const currentTransform = network.style.transform || '';
        const currentRotY = currentTransform.match(/rotateY\(([-\d.]+)deg\)/);
        const rotation = currentRotY ? parseFloat(currentRotY[1]) : 0;
        network.style.transform = `rotateY(${rotation + 0.5}deg) rotateX(${Math.sin(Date.now() *
          0.001) *
          5}deg)`;
      }

      if (Math.random() < 0.05) {
        createParticles();
      }

      cursor.style.boxShadow = `
        0 0 ${10 + Math.sin(Date.now() * 0.01) * 5}px rgba(0, 212, 255, 0.5),
        inset 0 0 5px rgba(0, 212, 255, 0.2)
      `;

      requestAnimationFrame(animate);
    }

    // Mouse interaction
    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;

      if (!isRotating) {
        network.style.transform = `rotateY(${mouseX * 20}deg) rotateX(${-mouseY * 10}deg)`;
      }

      cursor.style.left = e.clientX - 12 + 'px';
      cursor.style.top = e.clientY - 12 + 'px';
    });

    // Close modal on outside click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case ' ':
          e.preventDefault();
          toggleRotation();
          break;
        case 'i':
          toggleInfo();
          break;
        case 'r':
          randomizeNetwork();
          break;
        case 'Escape':
          closeModal();
          break;
      }
    });

    // Initial setup
    initializeNetwork();
    animate();

    setTimeout(() => {
      infoPanel.classList.add('active');
      setTimeout(() => {
        infoPanel.classList.remove('active');
      }, 5000);
    }, 1000);
