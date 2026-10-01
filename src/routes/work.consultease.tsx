import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, ArrowRight } from "lucide-react";
import { consultEaseScreens, type ConsultEaseScreen } from "@/data/consultease-screens";
import consultEaseMockup from "@/assets/consultease-thumbnail.png";
import "@/consultease-case-study.css";

export const Route = createFileRoute("/work/consultease")({
  head: () => ({
    meta: [
      { title: "ConsultEase | Mobile UI/UX Case Study | Rabia Naveed" },
      {
        name: "description",
        content:
          "ConsultEase: a curated mobile UI/UX case study covering doctor discovery, appointment booking, wireframes and a reusable design system.",
      },
    ],
  }),
  component: ConsultEaseCaseStudy,
});
const base = "/case-studies/consultease/";
const lowFiGroups: { title: string; names: ConsultEaseScreen[] }[] = [
  { title: "Discover & review", names: ["home", "doctors", "doctor-profile"] },
  { title: "Arrange an appointment", names: ["date-time", "patient", "summary"] },
  { title: "Return & communicate", names: ["upcoming", "chat"] },
];
const comparisons = [
  {
    name: "home",
    title: "Doctor discovery",
    copy: "Search, specialties and doctor cards retain their place. Teal and mint distinguish navigation and booking actions in the final interface.",
  },
  {
    name: "doctor-profile",
    title: "Profile review",
    copy: "The profile keeps its information groups and bottom booking action. Portraits, color and review cards complete the visual hierarchy.",
  },
  {
    name: "date-time",
    title: "Date & time",
    copy: "The calendar and time choices remain separate. Selected states gain a mint accent and the primary action becomes teal.",
  },
] satisfies { name: ConsultEaseScreen; title: string; copy: string }[];
const showcase: ConsultEaseScreen[] = [
  "welcome",
  "login",
  "home",
  "category",
  "doctor-profile",
  "date-time",
  "packages",
  "success",
  "upcoming",
  "chat",
  "notifications",
  "profile",
];
const completeFlow: { title: string; names: ConsultEaseScreen[] }[] = [
  {
    title: "01 / Introduction & account access",
    names: ["splash", "welcome", "specialists", "consultation", "login", "signup", "verification"],
  },
  {
    title: "02 / Discovery & profile review",
    names: [
      "home",
      "doctors",
      "category",
      "category-cardiology",
      "category-dentist",
      "doctor-profile",
    ],
  },
  {
    title: "03 / Appointment booking & feedback",
    names: ["date-time", "packages", "patient", "payment", "summary", "pin", "success", "failure"],
  },
  {
    title: "04 / Appointments & supporting screens",
    names: ["upcoming", "completed", "cancelled", "notifications", "profile"],
  },
  {
    title: "05 / Conversations & consultations",
    names: [
      "messages",
      "chat",
      "calling",
      "video-call",
      "video-history",
      "voice-history",
      "video-recording",
      "voice-recording",
    ],
  },
];
function Screen({
  name,
  low = false,
  caption,
  eager = false,
}: {
  name: ConsultEaseScreen;
  low?: boolean;
  caption?: string;
  eager?: boolean;
}) {
  const screen = consultEaseScreens[name];
  return (
    <figure className={"ce-screen" + (low ? " ce-wireframe" : "")}>
      <img
        src={base + (low ? "low-fi/" : "hi-fi/") + name + ".png"}
        alt={(low ? "Low-fidelity wireframe: " : "ConsultEase final UI: ") + screen.label}
        width={low ? 360 : screen.width}
        height={low ? 800 : screen.height}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
      />
      <figcaption>{caption ?? screen.label}</figcaption>
    </figure>
  );
}
function Screens({ names, className = "" }: { names: ConsultEaseScreen[]; className?: string }) {
  return (
    <div className={"ce-screens " + className}>
      {names.map((name) => (
        <Screen key={name} name={name} />
      ))}
    </div>
  );
}
function SystemCrop({
  box,
  label,
}: {
  box: readonly [number, number, number, number];
  label: string;
}) {
  const [x, y, w, h] = box;
  return (
    <figure className="ce-system-detail">
      <div className="ce-crop" style={{ aspectRatio: String((1886 * w) / (1933 * h)) }}>
        <img
          src={base + "design-system.png"}
          alt={label + " - crop from the original ConsultEase design system"}
          loading="lazy"
          decoding="async"
          draggable={false}
          style={{ width: 100 / w + "%", left: (-x / w) * 100 + "%", top: (-y / h) * 100 + "%" }}
        />
      </div>
      <figcaption>{label}</figcaption>
    </figure>
  );
}
function Heading({ label, title, copy }: { label: string; title: string; copy?: string }) {
  return (
    <div className="ce-heading">
      <div>
        <p className="ce-label">{label}</p>
        <h2>{title}</h2>
      </div>
      {copy && <p className="ce-copy">{copy}</p>}
    </div>
  );
}
function ConsultEaseCaseStudy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md">
        <nav
          aria-label="Case study navigation"
          className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8"
        >
          <Link
            to="/"
            hash="work"
            className="inline-flex items-center gap-2 text-sm font-semibold hover:text-brand"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Back to work
          </Link>
          <Link to="/" hash="contact" className="text-sm font-semibold hover:text-brand">
            Let's talk
          </Link>
        </nav>
      </header>
      <main className="consultease-case">
        <section className="ce-hero">
          <div className="ce-shell">
            <div className="ce-topline">
              <span>A mobile product design study</span>
              <span>Rabia Naveed / UI & UX</span>
            </div>
            <div className="ce-hero-heading">
              <div>
                <h1>
                  Consult<span>Ease</span>
                  <span className="ce-hero-subtitle">
                    Doctor Consultation
                    <br />& Appointment App
                  </span>
                </h1>
              </div>
              <div>
                <p className="ce-copy">
                  A mobile experience designed to make doctor discovery, appointment booking and
                  consultation management easier to navigate.
                </p>
                <p className="ce-tags">
                  UI/UX Design <span>/</span> Mobile App <span>/</span> Healthcare <span>/</span>{" "}
                  Product Design
                </p>
              </div>
            </div>
            <div className="ce-hero-screens">
              <Screen name="doctor-profile" caption="Review a doctor" eager />
              <Screen name="home" caption="Discover your next consultation" eager />
              <Screen name="date-time" caption="Choose a date & time" eager />
            </div>
          </div>
        </section>
        <nav className="ce-chapters ce-shell" aria-label="ConsultEase case study chapters">
          <a href="#ce-overview">01 / Product</a>
          <a href="#ce-process">02 / Process</a>
          <a href="#ce-system">03 / System</a>
          <a href="#ce-flows">04 / Flows</a>
          <a href="#ce-showcase">05 / Final screens</a>
        </nav>
        <section id="ce-overview" className="ce-shell ce-section">
          <Heading
            label="01 / Overview"
            title="Making doctor consultation easier to navigate."
            copy="ConsultEase is a mobile doctor-consultation experience designed to help users discover doctors, explore specialties, view doctor profiles, select appointment times and manage consultations from one app."
          />
          <dl className="ce-meta">
            {[
              ["Role", "UI/UX Designer"],
              ["Platform", "Mobile App"],
              ["Category", "Healthcare / Appointment Booking"],
              ["Deliverables", "UX Flow / Wireframes / UI / Design System"],
            ].map(([a, b]) => (
              <div key={a}>
                <dt>{a}</dt>
                <dd>{b}</dd>
              </div>
            ))}
          </dl>
          <div className="ce-challenge">
            <h3>The challenge</h3>
            <p>
              The product needed to bring doctor discovery, specialty browsing, profile review,
              scheduling and consultation communication into one clear mobile flow without
              overwhelming users with information.
            </p>
          </div>
        </section>
        <section className="ce-goals">
          <div className="ce-shell ce-section">
            <Heading
              label="02 / Product goals"
              title="A simpler path from search to consultation."
            />
            <ol>
              {[
                "Discover doctors",
                "Browse specialties",
                "Book appointments",
                "Track consultations",
                "Communicate easily",
              ].map((s, i) => (
                <li key={s}>
                  <span>0{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        </section>
        <section className="ce-shell ce-section">
          <Heading
            label="03 / App structure"
            title="Four destinations. A connected journey."
            copy="The bottom navigation anchors the experience in Home, Appointment, Chat and Profile, with related tasks branching from each destination."
          />
          <div className="ce-architecture">
            {[
              [
                "Home",
                "Search & categories",
                "Doctor list & profile",
                "Date, time & package",
                "Patient & payment details",
                "Summary & confirmation",
              ],
              ["Appointment", "Upcoming", "Completed", "Cancelled"],
              ["Chat", "Conversations", "Doctor conversation", "Voice & video history"],
              ["Profile", "Account & settings"],
            ].map(([title, ...items]) => (
              <div key={title}>
                <h3>{title}</h3>
                <ul>
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="ce-footnote">
            Notifications are accessed from Home. Structure shown here is based on the supplied
            screens.
          </p>
        </section>
        <section id="ce-process" className="ce-process">
          <div className="ce-shell ce-section">
            <Heading
              label="04 / Low-fidelity process"
              title="Shaping the flow before the visuals."
              copy="The experience was first mapped through low-fidelity wireframes to establish screen hierarchy, navigation and the core appointment flow before visual styling."
            />
            {lowFiGroups.map((group, i) => (
              <div className="ce-wire-group" key={group.title}>
                <div className="ce-wire-heading">
                  <span className="ce-label">0{i + 1}</span>
                  <h3>{group.title}</h3>
                </div>
                <div className="ce-screens">
                  {group.names.map((name) => (
                    <Screen key={name} name={name} low />
                  ))}
                </div>
              </div>
            ))}
            <p className="ce-footnote">
              Eight selected wireframes from the original low-fidelity set.
            </p>
          </div>
        </section>
        <section className="ce-shell ce-section ce-evolution">
          <Heading
            label="05 / Low-fi to high-fi"
            title="From structure to final interface."
            copy="The final UI builds on the same core structure while adding hierarchy, color, spacing, components and clearer interaction states."
          />
          {comparisons.map((pair, i) => (
            <article className="ce-comparison" key={pair.name}>
              <div className="ce-comparison-copy">
                <p className="ce-label">Evolution / 0{i + 1}</p>
                <h3>{pair.title}</h3>
                <p className="ce-copy">{pair.copy}</p>
              </div>
              <div className="ce-pair">
                <Screen name={pair.name} low caption="Before / Low-fidelity" />
                <ArrowRight className="ce-pair-arrow" aria-hidden="true" />
                <Screen name={pair.name} caption="After / High-fidelity" />
              </div>
            </article>
          ))}
        </section>
        <section id="ce-system" className="ce-system">
          <div className="ce-shell ce-section">
            <Heading
              label="06 / Design system"
              title="A reusable UI system."
              copy="A shared visual vocabulary connects type hierarchy, interaction colors, forms, doctor cards and navigation. The original system board brings those decisions together."
            />
            <figure className="ce-system-board">
              <img
                src={base + "design-system.png"}
                width={1886}
                height={1933}
                alt="Original ConsultEase design system with typography, palette, buttons, fields, chips, doctor cards, navigation states and icons"
                loading="lazy"
                decoding="async"
                draggable={false}
              />
              <figcaption>The supplied design-system board / Original artwork</figcaption>
            </figure>
            <div className="ce-color-study">
              <div>
                <p className="ce-label">Color language</p>
                <h3>Calm, clear and functional.</h3>
                <p className="ce-copy">
                  Teal leads primary actions. Mint marks selection and progress, while white and
                  grey keep information areas light. The error color provides a distinct feedback
                  accent.
                </p>
              </div>
              <SystemCrop
                box={[0.185, 0.055, 0.4, 0.09]}
                label="Primary / Accent / Background / Text / Error"
              />
            </div>
            <div className="ce-type-study">
              <SystemCrop box={[0.05, 0.063, 0.11, 0.105]} label="Original typography hierarchy" />
              <div>
                <p className="ce-label">Typography</p>
                <h3>Clear hierarchy for information-heavy screens.</h3>
                <p className="ce-copy">
                  Title, main heading, section heading, subheading, minor heading, body text and
                  button styles establish a repeatable reading order.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="ce-flows" className="ce-shell ce-section">
          <Heading
            label="07 / Doctor discovery"
            title="Finding the right doctor."
            copy="Search, specialties and doctor listings give discovery a clear starting point. The profile brings specialty, experience, patient-count fields, reviews and a booking action into one focused view."
          />
          <Screens names={["home", "category", "doctor-profile"]} className="ce-discovery" />
          <div className="ce-flow-notes">
            <p>
              <strong>01 / Browse</strong>Search and category entry points on Home.
            </p>
            <p>
              <strong>02 / Narrow the view</strong>Specialty chips and recurring doctor cards.
            </p>
            <p>
              <strong>03 / Review</strong>Profile information before the booking action.
            </p>
          </div>
        </section>
        <section className="ce-booking">
          <div className="ce-shell ce-section">
            <Heading
              label="08 / Appointment booking"
              title="A guided booking journey."
              copy="The supplied booking screens separate appointment choices from patient and payment details, then bring the selection together in a summary and a clear feedback state."
            />
            <div className="ce-booking-stage">
              <div className="ce-stage-title">
                <span className="ce-label">Make the selection</span>
                <p>
                  Date & time <span aria-hidden="true">&rarr;</span> Package{" "}
                  <span aria-hidden="true">&rarr;</span> Patient details
                </p>
              </div>
              <Screens names={["date-time", "packages", "patient"]} />
              <p className="ce-stage-note">
                Calendar and time chips are separated visually. Mint indicates the selected date and
                time; the teal Next action continues the flow.
              </p>
            </div>
            <div className="ce-booking-stage">
              <div className="ce-stage-title">
                <span className="ce-label">Review & finish</span>
                <p>
                  Payment <span aria-hidden="true">&rarr;</span> Summary{" "}
                  <span aria-hidden="true">&rarr;</span> Booked
                </p>
              </div>
              <Screens names={["payment", "summary", "success"]} />
              <p className="ce-stage-note">
                The summary collects the appointment details. The confirmation screen provides a
                View Appointment action. The separate PIN screen appears in the complete flow below.
              </p>
            </div>
          </div>
        </section>
        <section className="ce-shell ce-section ce-feedback">
          <div>
            <p className="ce-label">09 / Feedback</p>
            <h2>
              A clear finish.
              <br />A way to try again.
            </h2>
            <p className="ce-copy">
              The success state confirms the booking and points to the appointment. The failure
              state offers Try Again and Cancel, giving each outcome its own next step.
            </p>
          </div>
          <Screen name="failure" caption="The original booking failure state" />
        </section>
        <section className="ce-management">
          <div className="ce-shell ce-section">
            <Heading
              label="10 / Appointment management"
              title="Keeping consultations organized."
              copy="Upcoming appointments expose Cancel and Reschedule actions. Completed and Cancelled tabs separate other records, while the notification screen gathers schedule changes and appointment messages."
            />
            <div className="ce-management-layout">
              <div>
                <Screen name="upcoming" />
                <SystemCrop
                  box={[0.05, 0.408, 0.205, 0.133]}
                  label="Upcoming / Completed / Cancelled states"
                />
              </div>
              <Screen name="notifications" />
            </div>
          </div>
        </section>
        <section className="ce-shell ce-section ce-chat">
          <div className="ce-chat-copy">
            <p className="ce-label">11 / Consultation communication</p>
            <h2>Conversation close to the appointment.</h2>
            <p className="ce-copy">
              A doctor header, contrasting message bubbles and a compact composer keep the
              conversation familiar. The consultation history separates message, video and voice
              records.
            </p>
            <p className="ce-footnote">All communication screens shown are supplied UI designs.</p>
          </div>
          <Screen name="messages" caption="Conversation history" />
          <Screen name="chat" caption="Doctor header / Messages / Composer" />
        </section>
        <section className="ce-components">
          <div className="ce-shell ce-section">
            <Heading
              label="12 / Navigation & components"
              title="Small patterns. A consistent experience."
              copy="Four primary destinations use the same navigation pattern. Selected components show how that consistency extends into category browsing, forms and appointment choices."
            />
            <div className="ce-component-board">
              <div>
                <h3>
                  Four destinations.
                  <br />
                  One navigation pattern.
                </h3>
                <SystemCrop
                  box={[0.05, 0.562, 0.215, 0.18]}
                  label="Home / Appointment / Chat / Profile active states"
                />
              </div>
              <div>
                <SystemCrop box={[0.3, 0.394, 0.18, 0.098]} label="Category chips" />
                <SystemCrop
                  box={[0.545, 0.245, 0.195, 0.15]}
                  label="Filled, outlined & icon buttons"
                />
              </div>
              <div>
                <SystemCrop box={[0.466, 0.528, 0.18, 0.05]} label="Doctor card" />
                <SystemCrop box={[0.664, 0.408, 0.06, 0.085]} label="Time-slot states" />
                <SystemCrop box={[0.535, 0.19, 0.173, 0.04]} label="Form field" />
              </div>
            </div>
          </div>
        </section>
        <section className="ce-shell ce-section ce-journey">
          <Heading label="13 / The connected flow" title="From discovery to consultation." />
          <ol>
            {[
              "Home",
              "Category",
              "Doctor profile",
              "Date & time",
              "Package & details",
              "Booking feedback",
              "Appointment",
              "Chat",
            ].map((s, i) => (
              <li key={s}>
                <span>0{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
          <p className="ce-footnote">
            A reading guide to the actual screens shown above, from the initial discovery view to
            ongoing consultation management.
          </p>
        </section>
        <section className="ce-mockup">
          <div className="ce-shell ce-section">
            <Heading label="14 / Mobile presentation" title="The interface in context." />
            <figure>
              <img
                src={consultEaseMockup}
                width={1198}
                height={1313}
                alt="Supplied ConsultEase phone mockup showing discovery, onboarding, doctor profile, chat and booking feedback"
                loading="lazy"
                decoding="async"
                draggable={false}
              />
              <figcaption>Existing project mockup / ConsultEase mobile interfaces</figcaption>
            </figure>
          </div>
        </section>
        <section id="ce-showcase" className="ce-showcase">
          <div className="ce-shell ce-section">
            <Heading
              label="15 / Selected final screens"
              title="One visual language, across the journey."
              copy="Twelve selected interfaces bring onboarding, discovery, booking and consultation management together in a wider view of the final UI."
            />
            <div className="ce-screen-wall">
              {showcase.map((name) => (
                <Screen key={name} name={name} />
              ))}
            </div>
          </div>
        </section>
        <section className="ce-shell ce-section ce-complete">
          <Heading
            label="16 / Complete flow"
            title="The complete ConsultEase experience."
            copy="Explore the original high-fidelity screens by task. These grouped reference sets keep the wider app flow separate from the main design story."
          />
          {completeFlow.map((group) => (
            <details key={group.title}>
              <summary>
                <span>{group.title}</span>
                <span className="ce-reference-count">{group.names.length} screens</span>
              </summary>
              <Screens names={group.names} className="ce-reference-screens" />
            </details>
          ))}
        </section>
        <section className="ce-closing">
          <div className="ce-shell ce-section">
            <p className="ce-label">17 / Design summary</p>
            <h2>
              A connected
              <br />
              consultation experience.
            </h2>
            <p className="ce-copy">
              ConsultEase brings doctor discovery, profile review, appointment booking, status
              tracking and communication into one consistent mobile experience, supported by a
              reusable design system and a clearly structured flow.
            </p>
            <div className="ce-signoff">
              <strong>ConsultEase</strong>
              <span>
                Doctor Consultation Mobile App
                <br />
                UI/UX Design
              </span>
              <span>
                Designed around a clearer
                <br />
                appointment journey.
              </span>
            </div>
          </div>
        </section>
      </main>
      <footer className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5 py-12 sm:px-8">
        <Link
          to="/"
          hash="work"
          className="inline-flex items-center gap-2 font-semibold hover:text-brand"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Explore more work
        </Link>
        <Link
          to="/"
          hash="contact"
          className="inline-flex items-center gap-2 font-semibold text-brand"
        >
          Have a project in mind? <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </footer>
    </div>
  );
}
