// Scroll Animations

const fadeElements = document.querySelectorAll(
    ".glass-card,.card,.project-card,.skill"
    );
    
    fadeElements.forEach(el=>{
    el.classList.add("fade");
    });
    
    const observer = new IntersectionObserver(
    (entries)=>{
    
    entries.forEach(entry=>{
    
    if(entry.isIntersecting){
    entry.target.classList.add("show");
    }
    
    });
    
    },
    {
    threshold:0.15
    }
    );
    
    fadeElements.forEach(el=>{
    observer.observe(el);
    });
    
    // Skill Bar Animation
    
    const skillsSection = document.querySelector("#skills");
    
    const skillsObserver = new IntersectionObserver(
    (entries)=>{
    
    entries.forEach(entry=>{
    
    if(entry.isIntersecting){
    
    document.querySelector(".cybersecurity").style.width="90%";
    document.querySelector(".software").style.width="85%";
    document.querySelector(".cloud").style.width="80%";
    document.querySelector(".ios").style.width="75%";
    
    }
    
    });
    
    },
    {
    threshold:0.3
    }
    );
    
    if(skillsSection){
    skillsObserver.observe(skillsSection);
    }
    
    // Navbar Background
    
    const navbar = document.getElementById("navbar");
    
    window.addEventListener("scroll",()=>{
    
    if(window.scrollY > 50){
    navbar.style.background="rgba(15,23,42,.98)";
    }
    else{
    navbar.style.background="rgba(15,23,42,.85)";
    }
    
    });
    
    // Typing Effect
    
    const typing = document.querySelector(".typing-text");
    
    const text =
    "Cybersecurity Engineer • iOS Developer • Computer Science Student";
    
    typing.textContent="";
    
    let index = 0;
    
    function typeText(){
    
    if(index < text.length){
    
    typing.textContent += text.charAt(index);
    
    index++;
    
    setTimeout(typeText,40);
    
    }
    
    }
    
    setTimeout(typeText,500);
