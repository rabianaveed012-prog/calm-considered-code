import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, type CSSProperties } from "react";
import "@/agrinova-case-study.css";

export const Route = createFileRoute("/work/agrinova")({
  head: () => ({ meta: [
    { title: "AgriNova — Mobile App Case Study | Rabia Naveed" },
    { name: "description", content: "AgriNova UI/UX case study: a connected mobile experience for agricultural shopping, cultivation guidance and crop health. Original app screens by Rabia Naveed." },
  ] }),
  component: AgriNovaCaseStudy,
});

const screens = {
  home: "Home: search, consultation and featured products",
  seeds: "Seed catalog with categories, product ratings and availability",
  product: "Rice seed product details with pricing and quantity controls",
  cart: "Shopping cart with selected products and quantities",
  order: "Order summary with delivery, payment and price breakdown",
  services: "Farming services including seeds, machinery and cultivation support",
  crops: "Cultivation guidance for crops",
  vegetables: "Cultivation guidance for vegetables",
  flowers: "Cultivation guidance for flowers",
  blogs: "Crop health articles, disease alerts and search",
  videos: "Crop health educational video listings",
  profile: "Profile, membership and account settings",
};
type ScreenKey = keyof typeof screens;
function Screen({ name, caption, eager = false }: { name: ScreenKey; caption?: string; eager?: boolean }) {
  return <figure className="ag-screen"><img src={`/case-studies/agrinova/${name}.png`} alt={`AgriNova — ${screens[name]}`} width={400} height={760} draggable={false} loading={eager ? "eager" : "lazy"} decoding="async" />{caption && <figcaption>{caption}</figcaption>}</figure>;
}
function Detail({ name, label, x, y, w, h }: { name: ScreenKey; label: string; x: number; y: number; w: number; h: number }) {
  const style = { aspectRatio: `${w} / ${h}`, maxWidth: w } as CSSProperties;
  return <figure className="ag-detail"><div className="ag-crop" style={style}><img src={`/case-studies/agrinova/${name}.png`} alt={label} width={400} height={760} draggable={false} loading="lazy" decoding="async" style={{ width: `${400 / w * 100}%`, left: `${-x / w * 100}%`, top: `${-y / h * 100}%` }} /></div><figcaption>{label}</figcaption></figure>;
}
function Heading({ number, eyebrow, title, copy }: { number: string; eyebrow: string; title: string; copy?: string }) {
  return <div className="ag-heading"><div><p className="ag-eyebrow">{number} / {eyebrow}</p><h2>{title}</h2></div>{copy && <p className="ag-copy">{copy}</p>}</div>;
}

function AgriNovaCaseStudy() {
  const mainRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!mainRef.current || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("ag-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.03 });
    mainRef.current.querySelectorAll("[data-ag-reveal]").forEach((section) => { section.classList.add("ag-pending"); observer.observe(section); });
    return () => observer.disconnect();
  }, []);
  return <div className="min-h-screen bg-background text-foreground">
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md">
      <nav aria-label="Case study navigation" className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link to="/" hash="work" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-brand focus-visible:outline-2 focus-visible:outline-brand"><ArrowLeft aria-hidden="true" className="h-4 w-4" /> Back to work</Link>
        <Link to="/" hash="contact" className="text-sm font-semibold hover:text-brand focus-visible:outline-2 focus-visible:outline-brand">Let's talk</Link>
      </nav>
    </header>
    <main ref={mainRef} className="agrinova-case">
      <section className="ag-hero">
        <div className="ag-shell">
          <div className="ag-topline"><span>Selected work / UI/UX Design</span><span>Mobile App · Agriculture</span></div>
          <div className="ag-hero-heading"><div><p className="ag-eyebrow">Smart Agriculture Mobile App</p><h1>AgriNova<span aria-hidden="true">.</span></h1></div><p>An all-in-one farming experience combining agricultural products, crop knowledge and essential farming services.</p></div>
          <div className="ag-hero-screens"><Screen name="seeds" eager /><Screen name="home" eager /><Screen name="crops" eager /></div>
          <div className="ag-hero-bottom"><span>Practical tools. Everyday growth.</span><span>Designed around farming needs.</span></div>
        </div>
      </section>

      <section className="ag-shell ag-section" data-ag-reveal>
        <Heading number="01" eyebrow="Project overview" title="A simpler digital experience for everyday farming needs." copy="AgriNova brings agricultural products, farming services, cultivation guidance and crop-health resources into one mobile experience. The design keeps product browsing, purchasing and learning straightforward." />
        <dl className="ag-facts"><div><dt>Role</dt><dd>UI/UX Designer</dd></div><div><dt>Platform</dt><dd>Mobile</dd></div><div><dt>Category</dt><dd>Agriculture / E-commerce / Education</dd></div></dl>
      </section>

      <section className="ag-challenge" data-ag-reveal><div className="ag-shell ag-section">
        <p className="ag-eyebrow">02 / The challenge</p><h2>Many farming needs.<br />One clear place to start.</h2><p className="ag-copy">Products, crop guidance and disease information can live across different sources. The design challenge was to bring these needs together without overwhelming the user.</p><ol className="ag-problems"><li>Scattered information</li><li>Complex farming content</li><li>Disconnected product and service journeys</li></ol>
      </div></section>

      <section className="ag-shell ag-section" data-ag-reveal>
        <Heading number="03" eyebrow="Design approach" title="One ecosystem, multiple farming needs." copy="The app structure centers on a few clear needs, connecting commerce, education and practical agricultural support." />
        <div className="ag-needs">{["Shop", "Learn", "Cultivate", "Get Support"].map((need, index) => <div key={need}><span>0{index + 1}</span><h3>{need}</h3></div>)}</div>
        <div className="ag-architecture"><p className="ag-eyebrow">App structure</p><div className="ag-flow"><strong>Home</strong><ul><li><span>Marketplace</span><span>Seed catalog</span><span>Product detail</span><span>Cart</span><span>Order summary</span></li><li><span>Services</span><span>Cultivation guide</span></li><li><span>Crop health</span><span>Blogs / Videos</span></li><li><span>Profile</span></li></ul></div></div>
      </section>

      <section className="ag-sage" data-ag-reveal><div className="ag-shell ag-section ag-feature">
        <div><p className="ag-eyebrow">04 / Home experience</p><h2>A practical<br />starting point.</h2><p className="ag-copy">Search, consultation support, product discovery and primary navigation come together in one everyday starting point.</p><ul className="ag-notes"><li>Prominent search and product categories</li><li>Free consultation, within easy reach</li><li>Featured products above persistent navigation</li></ul></div><Screen name="home" caption="Home / A familiar starting point" />
      </div></section>

      <section className="ag-shell ag-section ag-market" data-ag-reveal>
        <Heading number="05" eyebrow="Marketplace journey" title="From discovery to checkout." copy="A familiar shopping flow connects seed browsing, product details, quantity selection and order review." />
        <div className="ag-journey">{([['seeds', '01 / Browse'], ['product', '02 / Discover'], ['cart', '03 / Add'], ['order', '04 / Checkout']] as const).map(([name, caption]) => <Screen key={name} name={name} caption={caption} />)}</div>
      </section>

      <section className="ag-discovery" data-ag-reveal><div className="ag-shell ag-section">
        <Heading number="06" eyebrow="Product discovery" title="The details that help a decision." copy="Search and categories make browsing familiar. Product imagery, availability, ratings and quantity controls keep useful information close to the next action." />
        <div className="ag-discovery-grid"><Detail name="seeds" label="Browse / Search and category filters" x={65} y={63} w={270} h={157} /><Detail name="product" label="Discover / Product information and quantity selection" x={65} y={281} w={270} h={98} /><Detail name="seeds" label="Compare / Product images, ratings and availability" x={65} y={232} w={270} h={226} /><Detail name="product" label="Act / A clear Add to Cart action" x={65} y={612} w={270} h={54} /></div>
      </div></section>

      <section className="ag-shell ag-section ag-feature ag-feature-reverse" data-ag-reveal>
        <Screen name="services" caption="Services / Agricultural support in one view" /><div><p className="ag-eyebrow">07 / Farming services</p><h2>Beyond the<br />marketplace.</h2><p className="ag-copy">Seeds, seedlings, machinery, worker hiring, cultivation support and crop-disease guidance are organized in one place.</p><p className="ag-side-note">A simple service grid helps users find the type of support they need.</p></div>
      </section>

      <section className="ag-cultivation" data-ag-reveal><div className="ag-shell ag-section">
        <Heading number="08" eyebrow="Cultivation guide" title="Guidance that adapts to what users grow." copy="Crops, vegetables and flowers have their own browsing categories, with seasonal tips and practical growing information close at hand." />
        <div className="ag-trio"><Screen name="crops" caption="01 / Crops" /><Screen name="vegetables" caption="02 / Vegetables" /><Screen name="flowers" caption="03 / Flowers" /></div>
      </div></section>

      <section className="ag-shell ag-section ag-learning" data-ag-reveal>
        <div><p className="ag-eyebrow">09 / Crop health & learning</p><h2>Learning through different formats.</h2><p className="ag-copy">Written guides and video content offer different ways to explore crop-health information.</p><ul className="ag-notes"><li>Seasonal alerts and search</li><li>A clear Blogs / Videos switch</li><li>Disease articles and educational video previews</li></ul></div><div className="ag-pair"><Screen name="blogs" caption="Read / Crop health blogs" /><Screen name="videos" caption="Watch / Educational videos" /></div>
      </section>

      <section className="ag-language" data-ag-reveal><div className="ag-shell ag-section">
        <Heading number="10" eyebrow="Visual language" title="A calm, familiar agricultural palette." copy="Green leads the interface, while warm orange supports alerts, promotions and selected actions. Light surfaces keep the content readable and the screens open." />
        <div className="ag-swatches">{["Agricultural green", "Soft green", "Warm orange", "Off-white", "Dark text"].map((color, index) => <div key={color} className={`ag-swatch ag-swatch-${index}`}><span>{color}</span></div>)}</div>
        <p className="ag-palette-note">Color direction observed in the supplied interface.</p>
        <div className="ag-principles">{[
          ["Clear hierarchy", "Headings, product names and supporting details have distinct visual roles."],
          ["Familiar interaction patterns", "Search, category chips and bottom navigation repeat across the experience."],
          ["Action-focused interfaces", "Primary actions sit close to the information needed to use them."],
          ["Readable content", "Short summaries and grouped details make information easier to scan."],
        ].map(([title, copy], index) => <div key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></div>)}</div>
      </div></section>

      <section className="ag-shell ag-section" data-ag-reveal>
        <Heading number="11" eyebrow="Component details" title="Small patterns. A consistent experience." copy="A closer look at the existing interface: alerts, growing guides, cart controls and navigation." />
        <div className="ag-components"><Detail name="blogs" label="Seasonal crop-health alert" x={65} y={111} w={270} h={75} /><Detail name="crops" label="Cultivation card / Season, difficulty and growing time" x={65} y={261} w={270} h={147} /><Detail name="cart" label="Cart item / Selection and quantity controls" x={65} y={160} w={270} h={120} /><Detail name="home" label="Persistent bottom navigation" x={49} y={610} w={302} h={69} /></div>
      </section>

      <section className="ag-sage" data-ag-reveal><div className="ag-shell ag-section ag-feature">
        <div><p className="ag-eyebrow">12 / Profile experience</p><h2>A simple space for account essentials.</h2><p className="ag-copy">Account information, membership status, shipping details, payment settings and order history are organized in one clear view.</p></div><Screen name="profile" caption="Profile / Account essentials" />
      </div></section>

      <section className="ag-showcase" aria-label="AgriNova final screen showcase" data-ag-reveal><div className="ag-shell ag-section"><p className="ag-eyebrow">13 / The experience, together</p><div className="ag-wall">{(['home', 'services', 'seeds', 'product', 'crops', 'blogs', 'cart', 'profile'] as const).map((name) => <Screen key={name} name={name} />)}</div></div></section>

      <section className="ag-shell ag-section ag-outcome" data-ag-reveal><p className="ag-eyebrow">14 / Final outcome</p><h2>A connected<br />farming experience.</h2><p className="ag-copy">AgriNova brings commerce, crop education and farming support together in a single mobile product, with a visual system designed to keep everyday actions simple and easy to navigate.</p><div className="ag-closing"><strong>AgriNova.</strong><span>Smart Agriculture App<br />UI/UX Design</span><span>Designed around<br />practical farming needs.</span></div></section>
    </main>
    <footer className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5 py-12 sm:px-8">
      <Link to="/" hash="work" className="inline-flex items-center gap-2 font-semibold hover:text-brand"><ArrowLeft aria-hidden="true" className="h-4 w-4" /> Explore more work</Link>
      <Link to="/" hash="contact" className="inline-flex items-center gap-2 font-semibold text-brand">Have a project in mind? <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link>
    </footer>
  </div>;
}
