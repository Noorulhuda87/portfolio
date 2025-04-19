/* 
  Author: Noorulhuda Khamees
  Date: April 18, 2025
  Description: Portfolio interactivity script (projects, theme toggle, scroll, form, blog)
*/

// ===========================================
// 1. Initialize AOS (Animate On Scroll library)
// ===========================================
AOS.init(); 

// ===========================================
// 2. Sample Project Data to be rendered
// ===========================================
const projects = [
  {
    title: "Grammar Correction App",
    description: "A real-time grammar correction tool built using OpenAI's API and Streamlit.",
    category: "AI",
    link: "https://noorulhuda-grammar-correction.streamlit.app/"
  },
 
  {
    title: "Android Products Manager",
    description: "An Android application for managing product inventory using Room DB and Jetpack Compose.",
    category: "Android",
    link: "https://github.com/Noorulhuda87/Android_Products_Manager/releases"
  },
  {
    title: "Shopify Store",
    description: "A complete e-commerce website built using Shopify, featuring smart collections and product filtering.",
    category: "Web",
    link: "https://loohoocuteshop.myshopify.com/"
  }
  
];




const projectContainer = document.getElementById("projects-container");

// ===========================================
// 3. Function to Render Project Cards Dynamically
// ===========================================
function renderProjects(projectsToShow) {
  projectContainer.innerHTML = ""; // Clear existing
  projectsToShow.forEach((project) => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
    <a href="${project.link}" target="_blank" style="text-decoration: none; color: inherit;">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
    </a>
  `;
  
    projectContainer.appendChild(card);
  });
}

// ===========================================
// 4. Scroll to Top Button Logic
// ===========================================
const scrollBtn = document.getElementById("scrollTopBtn");

window.onscroll = () => {
  scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
};

scrollBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// ===========================================
// 5. Alert on Form Submit (Optional UI Feedback)
// ===========================================
document.querySelector("form").addEventListener("submit", function (e) {
  alert("Your message has been submitted! ✅");
});

// ===========================================
// 6. Dark/Light Theme Toggle with Local Storage
// ===========================================
const toggleBtn = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme");

// Load saved theme on page load
if (currentTheme === "light") {
  document.body.classList.add("light");
  toggleBtn.textContent = "🌚";
}

// Toggle theme on button click
toggleBtn.onclick = () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  toggleBtn.textContent = isLight ? "🌚" : "🌙";
  localStorage.setItem("theme", isLight ? "light" : "dark");
};

// ===========================================
// 7. Hide Loader After Page Fully Loads
// ===========================================
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
});

// ===========================================
// 8. Load Blog Posts from JSON File
// ===========================================
fetch('blog.json')
  .then(res => res.json())
  .then(posts => {
    const blogContainer = document.getElementById('blog-posts');
    posts.forEach(post => {
      const article = document.createElement('article');
      article.innerHTML = `
        <h3>${post.title}</h3>
        <small>${post.date}</small>
        <p>${post.content}</p>
        <hr/>
      `;
      blogContainer.appendChild(article);
    });
  });

// ===========================================
// 9. Search and Filter Projects by Text + Category
// ===========================================
const searchBox = document.getElementById("searchBox");
const categoryFilter = document.getElementById("categoryFilter");

function filterProjects() {
  const query = searchBox.value.toLowerCase();
  const category = categoryFilter.value;

  const filtered = projects.filter(p => {
    const matchesText = p.title.toLowerCase().includes(query);
    const matchesCategory = category === "All" || p.category === category;
    return matchesText && matchesCategory;
  });

  renderProjects(filtered);
}

searchBox.addEventListener("input", filterProjects);
categoryFilter.addEventListener("change", filterProjects);

// ===========================================
// 10. Initial Project Render on Page Load
// ===========================================
renderProjects(projects);




// Start animation
// ===========================================

// Fade-in animation with emojis and single loop
// Fade-in animation with emojis and single loop

// ✅ Fade-in subtitle animation with emojis (single loop)
const fadePhrases = [
  "👨‍💻 Software Developer",
  "🧠 AI Enthusiast",
  "🌐 Tech Explorer",
  "🎮 Video Game Designer"
];


const fadeText = document.getElementById("animated-fade-text");
let currentFade = 0;

function showFadePhrase(index) {
  if (index >= fadePhrases.length) index = 0; // Restart from the beginning


  // Fade out
  fadeText.style.opacity = 0;

  setTimeout(() => {
    // Update text + fade in
    fadeText.textContent = fadePhrases[index];
    fadeText.style.opacity = 1;

    // Show next after 2.5 seconds
    setTimeout(() => {
      showFadePhrase(index + 1);
    }, 2500);
  }, 500);
}

// Make sure DOM is ready first
window.addEventListener("DOMContentLoaded", () => {
  showFadePhrase(currentFade);
});

