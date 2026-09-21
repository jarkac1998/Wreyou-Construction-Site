"use client";

import { FormEvent, useEffect, useState } from "react";

type Project = [image: string, category: "completed" | "ongoing" | "design", place: string, title: string, text: string];

const services = [
  ["+", "Health Centers & Hospitals", "Construction of clinics, health centers, and hospital facilities built to serve their communities."],
  ["/", "Market Halls", "Public market structures designed for durability, airflow, and everyday commerce."],
  ["⌂", "Living Quarters", "Residential compounds and living quarters, from single-family homes to multi-unit buildings."],
  ["⌑", "School Buildings", "Classroom blocks and school facilities built to support education across Liberia."],
  ["∩", "Bridge Construction", "Vehicular and pedestrian bridges engineered for safety and long-term durability."],
  ["≡", "Road Construction", "New road construction and rehabilitation, including culverts and drainage works."],
  ["⌁", "Renovation Works", "Renovation and rehabilitation of existing structures, public and private."],
  ["◇", "Architectural & Structural Design", "Architectural designs and structural calculations for new and renovated buildings."],
  ["◒", "Dam & Swamp Development", "Agricultural dam construction and swamp development to support farming communities."],
  ["▣", "Quantity Survey", "Accurate cost estimation and quantity surveying for projects of every scale."],
  ["▥", "Building Survey", "Structural condition surveys to guide renovation, purchase, or planning decisions."],
  ["≡", "Road Survey", "Topographic and road surveys that inform durable, well-engineered road works."],
];

const projects = [
  ["Images 1.jpg", "completed", "Grand Bassa County", "Superintendent's Compound", "Full construction of the Grand Bassa County Superintendent's Compound, delivered June 2026-July 2026."],
  ["Images 2.jpg", "completed", "Grand Bassa County", "Compound Grounds & Courtyard", "Landscaped courtyard, walkways, and fountain feature completing the compound's public-facing grounds."],
  ["Images11.jpg", "completed", "Bomi County", "Dam Project", "Water infrastructure development designed to improve water storage, irrigation, and agricultural productivity."],
  ["Images12.jpg", "completed", "Bong County", "Road Work", "Site clearing, excavation, boulder filling, and raising road levels to improve stability and drainage."],
  ["Images3.jpg", "completed", "Lloydville, Grand Bassa County", "Lloydville Clinic", "Completion of the Lloydville Clinic, expanding community access to health services."],
  ["Images13.jpg", "completed", "Rivercess County", "Culvert Construction", "Durable culvert structures to improve drainage, water flow, and road accessibility."],
  ["Images4.jpg", "completed", "Grand Bassa County", "Liberia National Police Station", "Construction of a police station building supporting local law enforcement operations."],
  ["Images5.jpg", "completed", "Grand Bassa County", "Latrine Construction", "Safe, durable, and hygienic latrine facilities designed to improve sanitation."],
  ["Images6.jpg", "completed", "Grand Bassa County", "Market Hall", "Covered market structure with concrete vending stalls, built for durability and everyday trade."],
  ["Images15.jpg", "completed", "Grand Bassa County", "Teacher's Quarter", "Comfortable and durable residential quarters for teachers in St. John, District #4."],
  ["Images16.jpg", "completed", "Grand Bassa County", "School Building", "A safe, comfortable, and conducive learning environment for students and teachers."],
  ["Images18.jpeg", "ongoing", "Grand Bassa County", "Open Bible & Kibily Street Pavement", "Ongoing road pavement works improving accessibility, durability, drainage, and transportation."],
  ["Images19.jpeg", "ongoing", "Grand Bassa County", "Open Bible & Kibily Street Pavement", "Ongoing road pavement works improving accessibility, durability, drainage, and transportation."],
  ["Images7.jpg", "ongoing", "Grand Bassa County", "Column Installation", "Installation of reinforced concrete columns providing structural support and stability."],
  ["Images8.jpg", "ongoing", "Grand Bassa County", "Compound Expansion", "Multi-story expansion works in progress."],
  ["Images9.jpg", "design", "Architectural Design", "Residential Apartment Concept", "A structural and architectural design concept for a multi-unit residential building."],
] satisfies Project[];

const equipment = [
  ["Images17.jpg", "Concrete Mixer", "Our concrete mixers support efficient and consistent concrete production for quality project execution."],
  ["Images24.jpg", "Small Truck", "Reliable transportation for construction materials, tools, equipment, and supplies."],
  ["Images21.jpeg", "HOWO 10-Tire Truck", "Heavy-duty transportation for hauling sand, gravel, soil, and other construction materials."],
  ["Images22.jpeg", "GMC Jeep", "Reliable mobility for construction teams, site visits, supervision, and operations."],
  ["Images20.jpeg", "Yellow Machine", "Earthmoving, excavation, grading, and material handling for demanding site operations."],
  ["Images23.jpg", "Topcon ES-105 Total Station", "Accurate surveying and measurement for site layout, leveling, and precise positioning."],
];

const nav = ["home", "about", "services", "projects", "team", "testimonials", "contact"];

function SectionHead({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return <div className="section-head reveal"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>;
}

function Stat({ value, suffix = "", label }: { value: string; suffix?: string; label: string }) {
  return <div className="stat-card"><span className="stat-num">{value}{suffix}</span><span className="stat-label">{label}</span></div>;
}

export default function Home() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | Project[1]>("all");
  const [status, setStatus] = useState("");
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("wcc-theme");
    const isDark = savedTheme === "dark";
    setDark(isDark);
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    const onScroll = () => setShowTop(window.scrollY > 480);
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    localStorage.setItem("wcc-theme", next ? "dark" : "light");
  }

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("fullName") || "").trim();
    const email = String(data.get("email") || "").trim();
    const subject = String(data.get("subject") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || subject.length < 3 || message.length < 10) {
      setStatus("Please complete the required fields with valid details.");
      return;
    }
    setStatus(`Thanks, ${name.split(" ")[0]}! Your message has been noted - our team will get back to you soon.`);
    form.reset();
  }

  return <div data-theme={dark ? "dark" : "light"}>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><nav className="navbar" aria-label="Primary">
      <a href="#home" className="brand"><span className="brand-mark"><img src="/Logo.png" alt="WCC" /></span><span className="brand-name">Wreyou Construction<small>Company · Est. 2016</small></span></a>
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>{nav.map((item) => <li key={item}><a href={`#${item}`} className="nav-link" onClick={() => setMenuOpen(false)}>{item[0].toUpperCase() + item.slice(1)}</a></li>)}</ul>
      <div className="nav-actions"><button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle color theme">{dark ? "☼" : "◐"}</button><a href="#contact" className="btn btn-amber btn-sm nav-quote">Get a Quote</a><button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">{menuOpen ? "×" : "☰"}</button></div>
    </nav></header>

    <main id="main">
      <section className="hero" id="home"><div className="hero-inner"><div className="hero-copy reveal"><p className="hero-eyebrow">Preston Street, Lower Buchanan, Grand Bassa County, Liberia</p><h1 className="hero-title">Building <span className="hero-accent">Excellence.</span><br />Delivering Trust.</h1><p className="hero-role">Construction · Civil Engineering · Architectural Design</p><p className="hero-desc">Wreyou Construction Company (WCC) is a proudly Liberian-owned construction and engineering firm, incorporated under the laws of the Republic of Liberia in 2016. We deliver high-quality solutions across Liberia&apos;s 15 political subdivisions, built on professionalism, safety, and excellence.</p><div className="hero-actions"><a href="#services" className="btn btn-primary">Our Services</a><a href="#contact" className="btn btn-outline">Request a Quote</a></div><div className="hero-meta"><div><strong>2016</strong><span>Founded & Incorporated</span></div><div><strong>10+</strong><span>Completed Projects</span></div><div><strong>15</strong><span>Counties We Serve</span></div></div></div><div className="hero-visual reveal"><div className="hero-frame"><div className="hero-photo"><img src="/Images 1.jpg" alt="Completed Superintendent's Compound" /></div><span className="hero-frame-corner tl" /><span className="hero-frame-corner br" /><div className="hero-badge">✓ ISO 9001-Aligned Quality Management</div></div><div className="hero-highlight"><div className="hero-highlight-top">✦ Featured Project</div><p><strong>Grand Bassa County Superintendent&apos;s Compound</strong> - full renovation and expansion delivered for the County Superintendent.</p></div></div></div><a href="#about" className="scroll-cue" aria-label="Scroll to About"><span /></a></section>

      <section className="section" id="about"><div className="container"><SectionHead eyebrow="About Us" title="Your Trusted Partner in Construction & Engineering" text="A Liberian-owned firm built on professionalism, safety, and excellence." /><div className="about-grid"><div className="about-text reveal"><p>Wreyou Construction Company (WCC) is a proudly Liberian-owned construction and engineering company established and incorporated under the laws of the Republic of Liberia in 2016. Since our founding, we have remained committed to delivering high-quality construction, civil engineering, and architectural design solutions.</p><p>We combine modern construction practices with innovative engineering solutions to create structures that are safe, sustainable, and built to last. Through transparent communication, careful planning, and attention to detail, we transform our clients&apos; visions into reality while maintaining an unwavering commitment to <strong>quality, safety, and customer satisfaction</strong>.</p><ul className="about-focus">{["Health Centers & Hospitals", "Schools & Market Halls", "Roads & Bridges", "Architectural Design", "Dam & Swamp Development", "Quantity & Building Survey"].map((item) => <li key={item}>✓ {item}</li>)}</ul><a href="#services" className="btn btn-outline">⚙ Explore All Services</a></div><div className="about-stats reveal"><Stat value="2016" label="Founded & Incorporated" /><Stat value="10" suffix="+" label="Projects Delivered" /><Stat value="15" label="Political Subdivisions Served" /><div className="stat-card stat-card-amber"><span className="stat-num">100%</span><span className="stat-label">Commitment to Quality</span></div></div></div></div></section>

      <section className="section section-alt" id="philosophy"><div className="container"><SectionHead eyebrow="How We Work" title="Our Project Philosophy" text="Our project management and execution philosophy guides every job we take on, from a small renovation to a multi-county road contract." /><div className="philosophy-grid reveal">{[["01", "Plan with Precision", "Create a detailed schedule and resource plan to meet each client's objectives before breaking ground."], ["02", "Communicate Clearly", "Keep every project stakeholder informed, from the client's office to the crew on site."], ["03", "Track & Fine-Tune", "Monitor progress continuously and adjust course the moment a deviation appears."], ["04", "Deliver On Time", "Supervise and commission every project on schedule, to the standard our clients expect."]].map(([num, title, text]) => <article className="philosophy-card" key={num}><span className="philosophy-num">{num}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

      <section className="section" id="mission"><div className="container"><SectionHead eyebrow="What Drives Us" title="Mission & Vision" /><div className="mv-grid reveal"><div className="mv-card is-mission"><span className="mv-icon">⌁</span><h3>Our Mission</h3><p>To bring innovation, creativity, professionalism, and excellence to the road construction and civil engineering industry while delivering safe, durable, cost-effective, and sustainable infrastructure throughout Liberia&apos;s 15 political subdivisions.</p></div><div className="mv-card is-vision"><span className="mv-icon">◎</span><h3>Our Vision</h3><p>To position Wreyou Construction Company as a leading engineering and construction firm in Liberia, recognized for quality, innovation, professionalism, and exceptional project delivery.</p></div></div></div></section>

      <section className="section section-alt" id="services"><div className="container"><SectionHead eyebrow="What We Do" title="Our Services" text="Full project management and engineering services, from site survey to final commissioning." /><div className="services-grid reveal">{services.map(([icon, title, text]) => <article className="service-card" key={title}><span className="service-icon">{icon}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

      <section className="section" id="projects"><div className="container"><SectionHead eyebrow="Our Work" title="Featured Projects" text="A selection of completed, ongoing, and design-stage work delivered by WCC across Grand Bassa County and beyond." /><div className="filter-bar reveal">{([["all", "All Projects"], ["completed", "Completed"], ["ongoing", "Ongoing"], ["design", "Design Concepts"]] as const).map(([value, label]) => <button key={value} className={`filter-btn ${filter === value ? "active" : ""}`} onClick={() => setFilter(value)}>{label}</button>)}</div><div className="projects-grid reveal">{projects.filter((project) => filter === "all" || project[1] === filter).map(([image, category, place, title, text], index) => <article className="project-card" key={`${title}-${index}`}><div className="project-thumb"><span className={`project-status status-${category}`}>{category === "design" ? "Design Concept" : category[0].toUpperCase() + category.slice(1)}</span><img src={`/${image}`} alt={title} /></div><div className="project-body"><span className="project-tag">{place}</span><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>

      <section className="section section-alt"><div className="container"><div className="numbers-panel reveal"><div><strong>2016</strong><span>Founded in Liberia</span></div><div><strong>10+</strong><span>Projects on Record</span></div><div><strong>15</strong><span>Counties We Serve</span></div><div><strong>9001</strong><span>ISO Standard We Align To</span></div></div></div></section>

      <section className="section" id="team"><div className="container"><SectionHead eyebrow="Our People" title="Management Team" text="Driven by a Board of Directors with a combined decade-plus of experience in procurement, project management, and administration." /><div className="team-grid reveal">{[["Wreyou.jpg", "Steve Wreyou", "Founder & Chief Executive Officer", "Provides the strategic leadership and vision behind WCC's growth."], ["Project Manager.jpg", "Joe Annaduy", "General Manager / Project Manager", "Oversees day-to-day operations and the efficient execution of projects."], ["Daniel.jpg", "Daniel D. Gargar", "Engineer", "Leads planning, design, and supervision of civil engineering works."], ["Clinton.png", "Clinton C. Jarka", "Information Technology Officer", "Manages WCC's information systems, website, and digital infrastructure."]].map(([image, name, role, text]) => <article className="team-card" key={name}><div className="team-photo"><img src={`/${image}`} alt={name} /></div><div className="team-body"><h3>{name}</h3><p className="team-role">{role}</p><p>{text}</p></div></article>)}</div></div></section>

      <section className="section section-alt" id="testimonials"><div className="container"><SectionHead eyebrow="Client Feedback" title="What Our Clients Say" /><div className="testimonial-panel reveal"><span className="testimonial-quote-icon">&ldquo;</span><div><blockquote>&ldquo;I am pleased with the work carried out by Wreyou Construction Company in renovating the Superintendent&apos;s Compound in Grand Bassa County. The team demonstrated professionalism, dedication, and quality workmanship throughout the project.&rdquo;</blockquote><div className="testimonial-author"><span className="testimonial-avatar"><img src="/Surp.jpeg" alt="Hon. Karyou Johnson" /></span><div><strong>Hon. Karyou Johnson</strong><span>Superintendent, Grand Bassa County</span></div></div></div></div></div></section>

      <section className="section section-alt equipment"><div className="container"><SectionHead eyebrow="WCC Equipment" title="Equipment & Machinery" text="Reliable construction equipment and machinery supporting efficient, safe, and timely project execution." /><div className="projects-grid reveal">{equipment.map(([image, title, text]) => <article className="project-card" key={title}><div className="project-thumb"><span className="project-status">{title}</span><img src={`/${image}`} alt={title} /></div><div className="project-body"><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>

      <section className="section" id="contact"><div className="container"><SectionHead eyebrow="Get In Touch" title="Start Your Project With Us" text="Have a construction or engineering project in mind? Tell us about it and our team will get back to you." /><div className="contact-grid reveal"><form className="contact-form" onSubmit={submitForm}><div className="form-row"><label>Full Name<input name="fullName" required /></label><label>Email Address<input name="email" type="email" required /></label></div><div className="form-row"><label>Phone Number<input name="phone" type="tel" /></label><label>Subject<input name="subject" required /></label></div><label>Project Details<textarea name="message" rows={5} required placeholder="Tell us about your project - location, scope, and timeline." /></label><button className="btn btn-primary btn-block" type="submit">Send Message <span>↗</span></button><p className={`form-status ${status.startsWith("Please") ? "error" : "success"}`} role="status">{status}</p></form><div className="contact-info"><div className="info-card"><span>⌖</span><div><small>Office Address</small><p>Preston Street, Lower Buchanan, Grand Bassa County, Liberia</p></div></div><div className="info-card"><span>▣</span><div><small>Coverage</small><p>Projects across Liberia&apos;s 15 political subdivisions</p></div></div><div className="info-card"><span>✦</span><div><small>Standards</small><p>Aligned with ISO 9001 quality management principles</p></div></div><div className="info-card"><span>☎</span><div><small>Contact Numbers</small><p>+231-777-331-645<br />+231-886-714-580</p></div></div><div className="info-card"><span>@</span><div><small>Email Address</small><p><a href="mailto:wreyuconstruction@gmail.com">wreyuconstruction@gmail.com</a></p></div></div></div></div></div></section>
    </main>

    <footer className="site-footer"><div className="container footer-grid"><div className="footer-brand"><h3>Wreyou Construction Company</h3><p>Building Excellence · Delivering Trust · Shaping the Future.</p></div><div className="footer-links"><h4>Navigate</h4>{nav.map((item) => <a key={item} href={`#${item}`}>{item[0].toUpperCase() + item.slice(1)}</a>)}</div><div className="footer-connect"><h4>Head Office</h4><p>Preston Street, Lower Buchanan, Grand Bassa County, Liberia</p><a href="#contact" className="btn btn-amber btn-sm">Get a Quote</a></div></div><div className="footer-bottom">© 2026 Wreyou Construction Company. All Rights Reserved.</div></footer>
    <button className={`back-to-top ${showTop ? "visible" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">↑</button>
  </div>;
}
