export function FloatingBar() {
  return (
    <div
      className="floating-bar"
      aria-label="Quick actions"
    >
      <a
        href="https://www.upwork.com/freelancers/~012d4726a0419ab017?mp_source=share"
        target="_blank"
        rel="noreferrer"
        className="floating-hire"
        data-cursor="hover"
      >
        Hire me on Upwork
      </a>

      <div className="floating-divider" aria-hidden="true" />

      <div className="floating-socials">
        <a
          href="https://www.linkedin.com/in/rabianaveed012/"
          target="_blank"
          rel="noreferrer"
          className="floating-social"
          aria-label="LinkedIn" title="LinkedIn"
          data-cursor="hover"
        >
          <span aria-hidden="true" className="floating-brand-icon floating-brand-icon--linkedin" />
        </a>
        <a
          href="https://www.behance.net/rabianaveed2"
          target="_blank"
          rel="noreferrer"
          className="floating-social"
          aria-label="Behance" title="Behance"
          data-cursor="hover"
        >
          <span aria-hidden="true" className="floating-brand-icon floating-brand-icon--behance" />
        </a>
        <a
          href="https://github.com/rabianaveed012-prog"
          target="_blank"
          rel="noreferrer"
          className="floating-social"
          aria-label="GitHub" title="GitHub"
          data-cursor="hover"
        >
          <span aria-hidden="true" className="floating-brand-icon floating-brand-icon--github" />
        </a>
      </div>
    </div>
  );
}
