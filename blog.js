const categories = [
  "All",
  "Import guides",
  "Wholesale markets",
  "Product guides",
  "Business ideas",
  "China trips",
  "Shipping",
  "Customs",
];

const articles = [
  {
    slug: "how-to-import-from-china-to-india",
    category: "Import guides",
    art: "import",
    cover: "A practical import roadmap",
    title: "Importing from China to India in 2026: A Practical Step-by-Step Roadmap",
    date: "18 November 2026",
    read: "7 min read",
    excerpt: "From IEC registration and supplier checks to customs and delivery, follow the main stages of a first commercial shipment.",
    intro: "A first import can feel like several jobs at once: product research, supplier conversations, freight planning and Indian customs. Breaking the work into a clear sequence makes decisions easier and helps catch missing details before they become expensive delays.",
    sections: [
      { title: "Get your Import Export Code", paragraphs: ["Commercial imports into India generally require an Import Export Code from the DGFT. Check that the business details and PAN information used in the application are accurate, then keep the issued IEC available for your broker and bank."] },
      { title: "Write down the product specification", paragraphs: ["Record the material, size, finish, voltage or other technical details, packaging and quantity. A clear brief gives suppliers the same basis for quoting and helps you spot differences between offers.", "Check the product's HS classification and whether a product-specific approval or certification applies before you commit to a purchase."] , tip: "Ask a customs professional to confirm classification and import conditions before placing your order." },
      { title: "Shortlist and verify suppliers", paragraphs: ["Compare more than the unit price. Ask who will manufacture the goods, what the minimum order is, how long production takes and which payment terms are available. Request business details and independently verify them where possible."] },
      { title: "Review samples and agree the order", paragraphs: ["Evaluate a physical sample against the specification. Put the approved version, packaging, tolerances, inspection plan, delivery terms and payment milestones into the purchase agreement."] },
      { title: "Monitor production and quality", paragraphs: ["Keep a written production schedule and arrange checks at suitable milestones. A pre-shipment inspection can document quantity, visible defects, packaging and whether the goods match the approved sample."] },
      { title: "Choose freight and prepare documents", paragraphs: ["Decide whether a full container or shared container space suits the shipment volume. Confirm the route, estimated transit and local charges, then check the commercial invoice, packing list and transport documents for consistent information."] },
      { title: "Plan Indian customs clearance", paragraphs: ["Coordinate with a customs broker before the vessel arrives. The broker can confirm the required documents, applicable duties and taxes, and how the Bill of Entry will be filed for your shipment."] },
      { title: "Arrange the final delivery", paragraphs: ["After release from customs, plan transport from the port to your warehouse or site. Confirm unloading access, delivery timings and who will receive and count the cargo."] },
      { title: "Get support through the process", paragraphs: ["A sourcing and logistics partner can coordinate supplier checks, inspections, freight and delivery while keeping you informed about decisions and costs. Start with a clear product brief and target quantity."] },
    ],
  },
  {
    slug: "yiwu-vs-guangzhou-vs-foshan",
    category: "Wholesale markets",
    art: "markets",
    cover: "Find the right sourcing hub",
    title: "Yiwu, Guangzhou or Foshan: Which China Market Fits Your Product?",
    date: "12 November 2026",
    read: "6 min read",
    excerpt: "China's sourcing hubs specialise in different product categories. Match your buying trip or supplier search to what you plan to purchase.",
    intro: "Choosing a city before defining your product list can lead to wasted travel and scattered supplier meetings. Start with the category and buying format, then shortlist the markets that fit.",
    sections: [
      { title: "Yiwu for small goods and variety", paragraphs: ["Yiwu is known for a wide spread of everyday merchandise, accessories, gifts, household items and toys. Buyers often visit to compare many options and consolidate a varied assortment."] },
      { title: "Guangzhou for fashion and broad trade", paragraphs: ["Guangzhou is a large commercial centre with active wholesale districts and access to a broad supplier network. It can suit apparel, accessories and buyers who need to meet suppliers across multiple categories."] },
      { title: "Foshan for furniture and interiors", paragraphs: ["Foshan is a strong starting point for furniture, lighting and interior fit-outs. For larger projects, prepare dimensions, finish references, room plans and the expected delivery schedule before visiting."] },
      { title: "Choose around the product", paragraphs: ["Consider whether you need catalogue variety, a specialised factory, customisation or a mixed shipment. A clear shortlist makes it easier to plan travel time and compare like-for-like quotes."] , tip: "Send suppliers the same specification and quantity so that price comparisons are meaningful." },
      { title: "Make the visit productive", paragraphs: ["Book meetings ahead, allow time for sample review, record each supplier's terms and keep a daily product shortlist. After the trip, verify company details and confirm specifications before paying a deposit."] },
    ],
  },
  {
    slug: "importing-furniture-from-china",
    category: "Product guides",
    art: "furniture",
    cover: "Furniture sourced to spec",
    title: "Buying Furniture in China: Costs, Minimums and Quality Checks",
    date: "5 November 2026",
    read: "6 min read",
    excerpt: "A planning checklist for villa owners, offices and hospitality buyers considering furniture sourced from China.",
    intro: "Furniture can be tailored to a project, but the quote depends on more than the piece shown in a showroom. Dimensions, materials, finish, packaging and delivery all affect the final budget.",
    sections: [
      { title: "Prepare a project specification", paragraphs: ["List the furniture pieces, quantities, dimensions, materials and finish expectations. Photos and drawings help suppliers understand what can be customised and what should remain standard."] },
      { title: "Compare complete quotations", paragraphs: ["Check whether a quote includes packaging, export preparation and inland transport to the port. Confirm the delivery term and ask which costs are excluded so your estimate does not rely on unit price alone."] },
      { title: "Inspect construction and finish", paragraphs: ["Review a sample for joinery, upholstery, hardware, colour consistency and stability. For a large order, agree on measurable acceptance criteria and an inspection before loading."] },
      { title: "Plan packing and container space", paragraphs: ["Furniture may be shipped assembled or in knock-down form. Ask how pieces are protected, how cartons are labelled and how the packing plan affects the volume and number of containers."] , tip: "Confirm the final carton dimensions before freight is booked; furniture volume can change the shipping plan." },
      { title: "Coordinate the project timeline", paragraphs: ["Allow time for sample approval, production, quality checks, ocean freight, customs and local delivery. For a site project, coordinate the shipment with storage and installation availability."] },
    ],
  },
  {
    slug: "ev-scooter-business-ckd-kits",
    category: "Business ideas",
    art: "ev",
    cover: "An EV assembly opportunity",
    title: "Launching an EV Scooter Business with China-Sourced CKD Kits",
    date: "28 October 2026",
    read: "6 min read",
    excerpt: "Explore the practical checks behind importing scooter kits for local assembly, from compliance and parts to service planning.",
    intro: "A completely knocked-down kit can be one route to local assembly, but the business case depends on regulatory requirements, component quality and after-sales readiness as much as the purchase price.",
    sections: [
      { title: "Validate the market first", paragraphs: ["Identify the customer segment, expected price range, use case and competing models. Speak to potential dealers and service providers before choosing a specification."] },
      { title: "Confirm Indian compliance requirements", paragraphs: ["Vehicles and battery systems can be subject to specific approvals and testing. Confirm the current requirements with qualified regulatory and import professionals before ordering any kit or component."] , tip: "Do not assume a product is road-ready or compliant just because a supplier sells it for export." },
      { title: "Assess the kit and parts list", paragraphs: ["Request a full bill of materials, technical documents, warranty terms and details of replacement parts. Check that the planned kit is complete and that components are compatible with the intended assembly process."] },
      { title: "Calculate the assembled cost", paragraphs: ["Include freight, insurance, duties, taxes, local handling, assembly labour, testing and service support. Use conservative assumptions for exchange rates and the cost of spare inventory."] },
      { title: "Build a support plan", paragraphs: ["A new vehicle business needs trained technicians, diagnostic tools and a reliable parts supply. Agree with suppliers how defects, updates and warranty claims will be handled."] },
    ],
  },
  {
    slug: "canton-fair-guide-for-indian-businesses",
    category: "China trips",
    art: "trip",
    cover: "Plan your Canton Fair visit",
    title: "A Canton Fair Visit Guide for Indian Buyers: Planning, Visa and Sourcing",
    date: "20 October 2026",
    read: "7 min read",
    excerpt: "Plan a focused trade-fair trip with supplier meetings, travel documents, product research and time for follow-up.",
    intro: "A large trade fair is most useful when you arrive with a plan. Set your sourcing goals early, organise travel documents and leave time to verify the suppliers you meet.",
    sections: [
      { title: "Set your visit goals", paragraphs: ["Choose the product categories and target suppliers you want to explore. Bring a concise product brief, target quantities and reference images so conversations stay specific."] },
      { title: "Prepare travel documents", paragraphs: ["Check current entry and visa requirements using official guidance and allow time for the application process. Keep accommodation, event registration and travel confirmations organised."] },
      { title: "Plan the fair days", paragraphs: ["Review the event layout and supplier list before arriving. Group meetings by hall or category, capture contact details and write down quoted specifications and delivery terms as you go."] },
      { title: "Evaluate suppliers beyond the booth", paragraphs: ["A meeting is only a starting point. Request the supplier's business information, factory details, sample process, minimum order and production schedule. Follow up after the fair with a written specification."] , tip: "Photograph product labels and record the booth number beside each note so you can reconnect later." },
      { title: "Include factory visits and recovery time", paragraphs: ["If your schedule allows, arrange factory visits after shortlisting vendors. Build in travel time between cities and keep room in the itinerary for sample discussions and rest."] },
    ],
  },
  {
    slug: "how-to-verify-a-chinese-supplier",
    category: "Import guides",
    art: "supplier",
    cover: "Verify before transferring funds",
    title: "How to Check a Chinese Supplier Before Sending Payment",
    date: "9 October 2026",
    read: "5 min read",
    excerpt: "Use a simple verification checklist to understand who is selling your product and how the order will be fulfilled.",
    intro: "An attractive quote is not enough to establish that a supplier can deliver. A few independent checks before payment can reveal gaps in business identity, product capability or agreed terms.",
    sections: [
      { title: "Confirm the legal business details", paragraphs: ["Request the registered business name and address, then compare them across the quotation, contract and payment instructions. Ask a qualified local contact to help review documents you cannot independently verify."] },
      { title: "Understand who makes the goods", paragraphs: ["Ask whether the company is the factory, a trading company or an agent. Request a video walkthrough or a visit where appropriate, and check that the production capability matches the product being offered."] },
      { title: "Validate product samples", paragraphs: ["Order and inspect a sample before committing to production. Keep a record of the approved materials, dimensions, performance and packaging so that the bulk order can be checked against it."] },
      { title: "Review payment and contract terms", paragraphs: ["Use a written purchase agreement that states the product specification, quantity, delivery term, schedule and quality process. Verify bank account ownership and be cautious about last-minute changes to payment details."] , tip: "Confirm any new bank instructions through a second, previously verified communication channel." },
      { title: "Keep an audit trail", paragraphs: ["Save quotations, messages, invoices, inspection reports and payment confirmations in one place. A clear record helps resolve misunderstandings and supports the import documentation process."] },
    ],
  },
  {
    slug: "fcl-vs-lcl-shipping",
    category: "Shipping",
    art: "shipping",
    cover: "Choose how cargo travels",
    title: "FCL or LCL? Choosing the Right Shipping Option for Your Order",
    date: "30 September 2026",
    read: "5 min read",
    excerpt: "Understand full-container and shared-container shipping, then compare the total cost and timing for your cargo volume.",
    intro: "The best freight option depends on cargo volume, handling needs and the landed cost—not just the space used. Ask your forwarder to compare both methods using the same origin, destination and delivery assumptions.",
    sections: [
      { title: "What full-container shipping means", paragraphs: ["With FCL, your cargo uses a dedicated container. This can suit larger shipments, offer more control over loading and reduce handling alongside unrelated cargo."] },
      { title: "How shared-container shipping works", paragraphs: ["With LCL, cargo shares container space with other shipments. It can be useful for smaller volumes, though consolidation and deconsolidation add handling steps and charges."] },
      { title: "Compare total charges", paragraphs: ["Request a written breakdown that includes origin handling, freight, destination charges, customs-related costs and local delivery. Check minimum billing volumes and any documentation fees."] },
      { title: "Compare timing and cargo care", paragraphs: ["LCL schedules may depend on consolidation and warehouse cut-offs. For fragile, high-value or time-sensitive goods, compare the handling path and insurance terms before selecting an option."] , tip: "Ask for an estimate based on packed carton dimensions and weight, not rough product dimensions." },
      { title: "Choose using your shipment profile", paragraphs: ["Compare total cost per unit, lead time and operational risk. A small cost saving may not be worthwhile if the cargo needs special handling or a tightly coordinated delivery."] },
    ],
  },
  {
    slug: "landed-cost-customs-duty-india",
    category: "Customs",
    art: "customs",
    cover: "Price the full import",
    title: "Understanding Landed Cost in India: Duty, Tax and Other Charges",
    date: "18 September 2026",
    read: "6 min read",
    excerpt: "Build a more complete import budget by looking beyond the supplier's unit price to freight, taxes, clearance and delivery.",
    intro: "A factory quotation is only one part of an import budget. To estimate what goods will cost at your door, map the charges from supplier pickup through customs clearance and final delivery.",
    sections: [
      { title: "Start with the product value and terms", paragraphs: ["Confirm the invoice value, currency and Incoterm. The agreed term determines which transport and handling costs are included in the supplier's price and which you will arrange separately."] },
      { title: "Estimate freight and insurance", paragraphs: ["Use packed dimensions and gross weight to obtain a freight estimate. Include cargo insurance and check what coverage applies during each leg of the journey."] },
      { title: "Confirm classification and applicable levies", paragraphs: ["Customs duty and other charges depend on the product classification, origin and current regulations. Ask a customs broker to verify the HS code and calculate the charges for your specific goods."] , tip: "Treat online duty calculators as an early estimate, not a substitute for a broker's product-specific review." },
      { title: "Include port and clearance costs", paragraphs: ["Budget for terminal handling, documentation, broker services, possible examination, storage and transport from the port. Ask how long charges such as demurrage or detention can accrue if a shipment is delayed."] },
      { title: "Build a landed-cost worksheet", paragraphs: ["Add purchase price, freight, insurance, customs and local charges, then divide by the sellable quantity. Keep assumptions visible and include a buffer for exchange-rate changes or unexpected handling."] },
    ],
  },
  {
    slug: "private-label-car-led-business",
    category: "Business ideas",
    art: "business",
    cover: "Explore a private-label product",
    title: "Private-Label Car LED Lights: Assessing a Small-Batch Business Idea",
    date: "5 September 2026",
    read: "4 min read",
    excerpt: "Explore demand, product compliance, supplier minimums and after-sales requirements before building a branded automotive-lighting offer.",
    intro: "A focused product line can be easier to test than a broad catalogue, but automotive lighting has important fitment and compliance considerations. Validate the product and customer need before committing to branding or stock.",
    sections: [
      { title: "Choose a clear customer and use case", paragraphs: ["Decide whether the product is aimed at installers, retailers or vehicle owners. Research common vehicle models, fitment expectations and the price points customers already see."] },
      { title: "Check specifications and approvals", paragraphs: ["Request technical data, testing documents and information on compatibility. Confirm import and sale requirements with qualified professionals before ordering inventory."] },
      { title: "Ask about private-label minimums", paragraphs: ["Get the minimum quantity for packaging, logo printing and product changes separately. Ask for samples with the intended finish and packaging before approving a production run."] },
      { title: "Plan warranty and returns", paragraphs: ["Lighting products may need installation guidance and a process for handling failures. Decide how you will support customers, source replacements and manage warranty claims."] , tip: "Test a small, well-documented pilot order before expanding the product range." },
    ],
  },
];

const artMarkup = (kind) => {
  const art = {
    import: '<path class="art-fill" d="M22 48h116l-8 40H32z"/><path class="art-line" d="M35 48V24h30v24m14 0V15h28v33M12 92h138M50 64h12m12 0h12m12 0h12"/>',
    markets: '<path class="art-line" d="M18 98h122M28 98V42h98v56M20 42l18-24h58l26 24M48 98V62h26v36m12-38h26m-26 14h26m-26 14h26"/>',
    furniture: '<path class="art-fill" d="M38 52h72a12 12 0 0 1 12 12v23H30V64a12 12 0 0 1 8-12zm2-27h64a10 10 0 0 1 10 10v17H36V35a10 10 0 0 1 4-10z"/><path class="art-line" d="M38 87v20m72-20v20M30 68h92"/>',
    ev: '<path class="art-fill" d="m22 74 10-24a14 14 0 0 1 13-9h54a14 14 0 0 1 13 9l10 24v15H22z"/><path class="art-line" d="m43 52 6-10m54 10-6-10M38 88v17m68-17v17M29 70h96"/><circle class="art-line" cx="47" cy="87" r="10"/><circle class="art-line" cx="99" cy="87" r="10"/>',
    trip: '<path class="art-fill" d="M26 40h92v62H26z"/><path class="art-line" d="m18 40 54-26 54 26M48 102V61h48v41m-34-24h20m-20 14h20"/>',
    supplier: '<rect class="art-fill" x="30" y="24" width="82" height="76" rx="8"/><path class="art-line" d="M47 48h46M47 63h38m-38 15h24"/><circle class="art-fill" cx="116" cy="83" r="21"/><path class="art-line" d="m106 83 7 7 14-16"/>',
    shipping: '<path class="art-fill" d="M15 66h130l-15 30H36z"/><path class="art-line" d="M40 66V40h25v26m12 0V25h30v41M18 101h121m-93-22h17m13 0h17m13 0h17"/>',
    customs: '<path class="art-fill" d="M28 96V40h88v56z"/><path class="art-line" d="m20 40 52-27 52 27M47 56h49M47 70h49M47 84h26"/><circle class="art-fill" cx="112" cy="87" r="17"/><path class="art-line" d="m104 87 6 6 12-14"/>',
    business: '<path class="art-line" d="M20 100h124M31 100V54h70v46M101 68h34v32M50 66h12m16 0h12M50 82h12m16 0h12"/><path class="art-fill" d="m103 47 15-24 15 24h-8l-7-11-7 11z"/>',
  };
  return `<svg class="cover-art" viewBox="0 0 160 120" aria-hidden="true">${art[kind] || art.import}</svg>`;
};

const articleUrl = (article) => `post.html?p=${encodeURIComponent(article.slug)}`;
const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
}[char]));

function renderSharedChrome() {
  const header = document.querySelector("#site-header");
  if (header) {
    header.innerHTML = `
      <a class="brand" href="index.html" aria-label="ImportNow home">
        <span class="brand-wordmark">IMP<svg class="brand-mark" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M12 5.5v9m-3.5-3.2L12 15l3.5-3.7M7.5 18h9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>RT<b>NOW</b></span>
      </a>
      <nav class="nav" id="primary-nav" aria-label="Primary">
        <a href="index.html#services">Services</a><a href="index.html#journey">How it works</a>
        <a href="index.html#industries">What we import</a><a href="index.html#trips">China trips</a>
        <a href="blog.html" aria-current="page">Blog</a><a href="index.html#contact">Contact</a>
      </nav>
      <button class="menu-toggle" type="button" aria-controls="primary-nav" aria-expanded="false" aria-label="Open navigation"><span></span><span></span><span></span></button>
      <a class="btn btn-sm header-cta" href="index.html#contact">Get a free quote</a>`;
    const menuButton = header.querySelector(".menu-toggle");
    const nav = header.querySelector(".nav");
    menuButton.addEventListener("click", () => {
      const open = menuButton.getAttribute("aria-expanded") !== "true";
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
      nav.classList.toggle("open", open);
    });
    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        menuButton.setAttribute("aria-expanded", "false");
        nav.classList.remove("open");
      }
    });
  }

  const footer = document.querySelector("#site-footer");
  if (footer) {
    footer.innerHTML = `
      <div class="footer-grid">
        <div class="footer-brand">
          <a class="brand" href="index.html" aria-label="ImportNow home"><span class="brand-wordmark">IMP<svg class="brand-mark" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M12 5.5v9m-3.5-3.2L12 15l3.5-3.7M7.5 18h9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>RT<b>NOW</b></span></a>
          <p>End-to-end imports from China to India: sourcing, factory inspection, shipping and customs. Save time. Reduce costs.</p>
          <div class="footer-socials">
            <a href="https://www.instagram.com/importnow.in/" target="_blank" rel="noopener" aria-label="Instagram">◎</a>
            <a href="https://wa.me/919989724320" target="_blank" rel="noopener" aria-label="WhatsApp">◉</a>
            <a href="tel:+919989724320" aria-label="Call ImportNow">⌕</a>
          </div>
        </div>
        <div class="footer-col"><h4>Our services</h4><ul><li><a href="index.html#services">Product sourcing</a></li><li><a href="index.html#services">Factory inspection</a></li><li><a href="index.html#services">Quality control</a></li><li><a href="index.html#services">Shipping &amp; logistics</a></li><li><a href="index.html#services">Customs clearance</a></li></ul></div>
        <div class="footer-col"><h4>What we import</h4><ul><li><a href="index.html#industries">Furniture &amp; interiors</a></li><li><a href="index.html#industries">Electronics &amp; tech</a></li><li><a href="index.html#industries">EV &amp; automotive</a></li><li><a href="index.html#industries">Lighting</a></li><li><a href="index.html#trips">China trips</a></li></ul></div>
        <div class="footer-col"><h4>Import guides</h4><ul>${articles.slice(0, 5).map((article) => `<li><a href="${articleUrl(article)}">${escapeHTML(article.title)}</a></li>`).join("")}<li><a class="footer-more" href="blog.html">All articles →</a></li></ul></div>
        <div class="footer-col"><h4>Get in touch</h4><ul class="footer-contact"><li><small>Phone / WhatsApp</small><a href="tel:+919989724320">+91 99897 24320</a></li><li><small>India</small><span>Hyderabad, Telangana</span></li><li><small>China</small><span>Shanghai, China</span></li><li><small>Instagram</small><a href="https://www.instagram.com/importnow.in/" target="_blank" rel="noopener">@importnow.in</a></li></ul></div>
      </div>
      <div class="footer-bottom"><p>© 2026 ImportNow.in · All rights reserved.</p><span class="footer-badge">Import insights for Indian businesses</span></div>`;
  }
}

function renderPostCard(article, delay = 0) {
  const href = articleUrl(article);
  return `<article class="post-card" style="--card-delay:${delay}ms">
    <a class="post-cover" data-art="${article.art}" href="${href}" aria-label="Read ${escapeHTML(article.title)}">
      ${artMarkup(article.art)}
      <span class="cover-title">${escapeHTML(article.cover)}</span>
      <span class="cover-tag">${escapeHTML(article.category)}</span>
    </a>
    <div class="post-card-body">
      <div class="post-meta"><span>${escapeHTML(article.date)}</span><i class="meta-dot"></i><span>${escapeHTML(article.read)}</span></div>
      <h2><a href="${href}">${escapeHTML(article.title)}</a></h2>
      <p class="post-excerpt">${escapeHTML(article.excerpt)}</p>
      <a class="read-link" href="${href}">Read more <span aria-hidden="true">→</span></a>
    </div>
  </article>`;
}

function setupBlog() {
  const filterContainer = document.querySelector("#category-filters");
  const grid = document.querySelector("#post-grid");
  if (!filterContainer || !grid) return;

  let activeCategory = "All";
  let activePage = 1;
  const search = document.querySelector("#article-search");
  const resultCount = document.querySelector("#results-count");
  const pagination = document.querySelector("#pagination");
  const perPage = 6;

  filterContainer.innerHTML = categories.map((category) =>
    `<button class="category-filter" type="button" data-category="${escapeHTML(category)}" aria-pressed="${category === activeCategory}">${escapeHTML(category)}</button>`,
  ).join("");

  const render = () => {
    const term = search.value.trim().toLowerCase();
    const filtered = articles.filter((article) => {
      const matchesCategory = activeCategory === "All" || article.category === activeCategory;
      const searchable = `${article.title} ${article.excerpt} ${article.category} ${article.cover}`.toLowerCase();
      return matchesCategory && searchable.includes(term);
    });
    const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
    activePage = Math.min(activePage, pageCount);
    const visible = filtered.slice((activePage - 1) * perPage, activePage * perPage);
    resultCount.textContent = filtered.length ? `${filtered.length} ${filtered.length === 1 ? "article" : "articles"}` : "";
    grid.innerHTML = visible.length
      ? visible.map((article, index) => renderPostCard(article, index * 45)).join("")
      : `<div class="empty-results"><h2>No articles found</h2><p>Try a different search or select another category.</p></div>`;
    pagination.innerHTML = pageCount > 1
      ? Array.from({ length: pageCount }, (_, index) => `<button class="page-button" type="button" aria-label="Page ${index + 1}" aria-current="${activePage === index + 1 ? "page" : "false"}" data-page="${index + 1}">${index + 1}</button>`).join("")
      : "";
  };

  filterContainer.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-category]");
    if (!button) return;
    activeCategory = button.dataset.category;
    activePage = 1;
    filterContainer.querySelectorAll("button").forEach((filter) => {
      filter.setAttribute("aria-pressed", String(filter === button));
    });
    render();
  });
  search.addEventListener("input", () => {
    activePage = 1;
    render();
  });
  pagination.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-page]");
    if (!button) return;
    activePage = Number(button.dataset.page);
    render();
    document.querySelector(".blog-browser").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  render();
}

function renderArticle(article) {
  const articlePage = document.querySelector("#article-page");
  if (!articlePage) return;
  if (!article) {
    document.title = "Article not found | ImportNow";
    articlePage.innerHTML = `<section class="article-not-found"><p class="kicker">ImportNow journal</p><h1>We couldn't find that article.</h1><p>Browse the journal for practical import and sourcing guides.</p><a class="btn" href="blog.html">Browse all articles →</a></section>`;
    document.querySelector("#related-section")?.remove();
    return;
  }

  document.title = `${article.title} | ImportNow`;
  const toc = article.sections.map((section, index) => ({ title: section.title, id: `s${index + 1}` }));
  const sectionMarkup = article.sections.map((section, index) => `
    <section id="s${index + 1}">
      <h2><span class="article-number">${index + 1}.</span> ${escapeHTML(section.title)}</h2>
      ${section.paragraphs.map((paragraph) => `<p>${escapeHTML(paragraph)}</p>`).join("")}
      ${section.tip ? `<aside class="article-tip"><strong>Worth noting:</strong> ${escapeHTML(section.tip)}</aside>` : ""}
      ${section.bullets ? `<ul>${section.bullets.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul>` : ""}
    </section>`).join("");
  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(article.title);
  const popular = articles.filter((item) => item.slug !== article.slug).slice(0, 5);
  const related = articles.filter((item) => item.slug !== article.slug).slice(0, 3);

  articlePage.innerHTML = `
    <div class="article-top">
      <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span>/</span><a href="blog.html">Blog</a><span>/</span><span aria-current="page">${escapeHTML(article.category)}</span></nav>
      <h1 class="article-heading">${escapeHTML(article.title)}</h1>
      <div class="article-byline"><time>${escapeHTML(article.date)}</time><i class="meta-dot"></i><span>${escapeHTML(article.read)}</span><i class="meta-dot"></i><span>By ImportNow Team</span></div>
      <div class="article-art" data-art="${article.art}" role="img" aria-label="${escapeHTML(article.cover)}">
        ${artMarkup(article.art)}
        <span class="article-art-title">${escapeHTML(article.cover)}</span>
        <span class="article-category">${escapeHTML(article.category)}</span>
      </div>
    </div>
    <div class="article-layout">
      <article class="article-body">
        <p>${escapeHTML(article.intro)}</p>
        ${sectionMarkup}
        <section class="article-cta" id="s${toc.length + 1}">
          <h2>Need a hand with your import?</h2>
          <p>Share your product and quantity with ImportNow. Our team can help you explore suppliers, costs and the next steps.</p>
          <a class="btn" href="index.html#contact">Get a free quote →</a>
        </section>
        <div class="share-row"><span>Share:</span>
          <a class="share-link" target="_blank" rel="noopener" href="https://wa.me/?text=${shareTitle}%20${shareUrl}">WhatsApp</a>
          <a class="share-link" target="_blank" rel="noopener" href="https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}">LinkedIn</a>
          <a class="share-link" target="_blank" rel="noopener" href="https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}">X</a>
        </div>
      </article>
      <aside class="article-sidebar">
        <nav class="sidebar-box toc-box" aria-label="In this article">
          <h2>In this article</h2>
          <ol>${toc.map((item, index) => `<li><a href="#${item.id}"><span>${index + 1}.</span>${escapeHTML(item.title)}</a></li>`).join("")}
            <li><a href="#s${toc.length + 1}">Need help with your import?</a></li>
          </ol>
        </nav>
        <section class="sidebar-box">
          <h2>Popular articles</h2>
          <div class="popular-list">${popular.map((item) => `<a class="popular-link" href="${articleUrl(item)}"><span class="popular-thumb" data-art="${item.art}">${artMarkup(item.art)}</span><span><strong>${escapeHTML(item.title)}</strong><small>${escapeHTML(item.date)}</small></span></a>`).join("")}</div>
        </section>
        <section class="sidebar-box quote-box">
          <h2>Planning an import?</h2>
          <p>Tell us the product and quantity. We'll help you explore suppliers, costs and timing.</p>
          <a class="btn" href="index.html#contact">Get a free quote →</a>
        </section>
      </aside>
    </div>`;

  const relatedSection = document.querySelector("#related-section");
  relatedSection.innerHTML = `<div class="related-inner"><header class="related-head"><p class="kicker">Keep reading</p><h2>Related articles</h2></header><div class="related-grid">${related.map((item, index) => renderPostCard(item, index * 45)).join("")}</div></div>`;
}

renderSharedChrome();
setupBlog();
if (document.querySelector("#article-page")) {
  const slug = new URLSearchParams(window.location.search).get("p");
  renderArticle(articles.find((article) => article.slug === slug));
}

const progress = document.querySelector("#scroll-progress");
if (progress) {
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();
}
