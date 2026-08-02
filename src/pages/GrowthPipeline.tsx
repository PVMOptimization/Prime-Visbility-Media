import React from "react";

/**
 * GrowthPipeline
 * Self-contained component — styles are scoped inside via a <style> tag,
 * so you can drop this file straight into your components folder and
 * render <GrowthPipeline /> on any page/route.
 */
export default function GrowthPipeline() {
  return (
    <div className="gp-root">
      <style>{`
        .gp-root {
          --bg:#12161A;
          --panel:#1B2126;
          --panel-alt:#20272C;
          --line:#333B42;
          --text:#EDEAE2;
          --text-dim:#9BA3AA;
          --accent:#FF6A1A;
          --accent-2:#E3B341;
          --good:#4FAE8E;

          background: var(--bg);
          color: var(--text);
          font-family: 'IBM Plex Sans', sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        .gp-root, .gp-root *{ box-sizing: border-box; }
        .gp-root h1, .gp-root h2, .gp-root h3{
          font-family: 'Oswald', sans-serif;
          text-transform: uppercase;
          letter-spacing: 0.02em;
          margin: 0;
        }
        .gp-mono{ font-family: 'IBM Plex Mono', monospace; }

        .gp-header{
          padding: 56px 20px 40px;
          text-align: center;
          border-bottom: 1px solid var(--line);
          background:
            radial-gradient(ellipse at 50% -20%, rgba(255,106,26,0.12), transparent 60%),
            var(--bg);
        }
        .gp-badge{
          display: inline-block;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.18em;
          color: var(--accent);
          border: 1px solid var(--accent);
          padding: 5px 12px;
          border-radius: 2px;
          margin-bottom: 18px;
        }
        .gp-header h1{
          font-size: clamp(28px, 6vw, 46px);
          line-height: 1.1;
          max-width: 820px;
          margin: 0 auto;
        }
        .gp-header .gp-sub{
          color: var(--text-dim);
          font-size: clamp(14px,2.6vw,17px);
          max-width: 560px;
          margin: 16px auto 0;
          font-weight: 400;
        }

        .gp-stats{
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          max-width: 900px;
          margin: 32px auto 0;
        }
        .gp-stat{
          background: var(--panel);
          border: 1px solid var(--line);
          border-radius: 6px;
          padding: 12px 16px;
          min-width: 150px;
          flex: 1 1 150px;
        }
        .gp-stat .gp-num{
          font-family: 'IBM Plex Mono', monospace;
          color: var(--accent-2);
          font-size: 20px;
          font-weight: 600;
          display: block;
        }
        .gp-stat .gp-lbl{
          color: var(--text-dim);
          font-size: 12px;
          margin-top: 2px;
          display: block;
        }

        .gp-pipeline{
          max-width: 760px;
          margin: 0 auto;
          padding: 60px 20px 20px;
          position: relative;
        }
        .gp-pipeline::before{
          content: "";
          position: absolute;
          top: 0;
          bottom: 120px;
          left: 38px;
          width: 2px;
          background: repeating-linear-gradient(
            to bottom,
            var(--accent) 0px, var(--accent) 8px,
            transparent 8px, transparent 16px
          );
          opacity: 0.55;
        }
        @media (min-width: 640px){
          .gp-pipeline::before{ left: 44px; }
        }

        .gp-stage{
          position: relative;
          padding-left: 76px;
          margin-bottom: 34px;
        }
        @media (min-width: 640px){
          .gp-stage{ padding-left: 96px; }
        }
        .gp-stage-node{
          position: absolute;
          left: 0;
          top: 0;
          width: 76px;
          height: 76px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media (min-width: 640px){
          .gp-stage-node{ width: 96px; }
        }
        .gp-circle{
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: var(--panel);
          border: 2px solid var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'IBM Plex Mono', monospace;
          font-weight: 600;
          font-size: 20px;
          color: var(--accent);
          flex-shrink: 0;
        }

        .gp-card{
          background: var(--panel);
          border: 1px solid var(--line);
          border-radius: 8px;
          padding: 20px 22px;
        }
        .gp-card .gp-eyebrow{
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.14em;
          color: var(--accent-2);
          margin-bottom: 6px;
        }
        .gp-card h3{
          font-size: clamp(18px,3vw,22px);
          margin-bottom: 10px;
          color: var(--text);
        }
        .gp-card .gp-why{
          color: var(--text-dim);
          font-size: 14.5px;
          line-height: 1.55;
          margin-bottom: 14px;
        }
        .gp-card .gp-why b{ color: var(--text); font-weight: 600; }
        .gp-you-get{
          border-left: 2px solid var(--good);
          padding: 10px 14px;
          background: rgba(79,174,142,0.08);
          border-radius: 0 6px 6px 0;
          font-size: 14px;
          line-height: 1.5;
        }
        .gp-you-get b{
          color: var(--good);
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.1em;
          display: block;
          margin-bottom: 4px;
        }
        .gp-proof{
          display: inline-block;
          margin-top: 12px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12.5px;
          color: var(--accent);
          border: 1px solid rgba(255,106,26,0.4);
          padding: 5px 10px;
          border-radius: 4px;
        }

        .gp-stage[data-phase="qual2"] .gp-card{ margin-right: 4%; }
        .gp-stage[data-phase="qual3"] .gp-card{ margin-right: 8%; }

        .gp-gate{
          position: relative;
          padding-left: 76px;
          margin: 10px 0 30px;
          color: var(--text-dim);
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11.5px;
          letter-spacing: 0.14em;
        }
        @media (min-width: 640px){ .gp-gate{ padding-left: 96px; } }
        .gp-gate span{
          background: var(--bg);
          padding-right: 8px;
        }

        .gp-tank{
          max-width: 760px;
          margin: 0 auto;
          padding: 0 20px 60px;
          text-align: center;
        }
        .gp-tank-box{
          border: 1px solid var(--line);
          border-top: 3px solid var(--accent);
          background: var(--panel-alt);
          border-radius: 8px;
          padding: 26px 20px;
        }
        .gp-tank-box .gp-mono{ color: var(--accent-2); font-size: 13px; letter-spacing: 0.1em; }
        .gp-tank-box p{
          color: var(--text-dim);
          font-size: 14.5px;
          margin: 10px auto 0;
          max-width: 480px;
          line-height: 1.5;
        }

        .gp-addendum{
          max-width: 760px;
          margin: 0 auto;
          padding: 10px 20px 60px;
        }
        .gp-addendum-title{
          text-align: center;
          color: var(--text-dim);
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.16em;
          margin-bottom: 20px;
        }
        .gp-rider-grid{
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 640px){
          .gp-rider-grid{ grid-template-columns: 1fr 1fr; }
        }
        .gp-rider{
          background: var(--panel);
          border: 1px dashed var(--line);
          border-radius: 8px;
          padding: 20px;
        }
        .gp-rider .gp-tag{
          display: inline-block;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10.5px;
          letter-spacing: 0.1em;
          color: var(--good);
          border: 1px solid var(--good);
          padding: 2px 8px;
          border-radius: 3px;
          margin-bottom: 10px;
        }
        .gp-rider h3{ font-size: 17px; margin-bottom: 8px; }
        .gp-rider p{ color: var(--text-dim); font-size: 14px; line-height: 1.5; margin: 0 0 10px; }
        .gp-rider .gp-proof{ margin-top: 0; }

        .gp-footer{
          text-align: center;
          padding: 50px 20px 60px;
          border-top: 1px solid var(--line);
        }
        .gp-footer .gp-tagline{
          color: var(--text-dim);
          font-size: 14px;
          margin-bottom: 20px;
          line-height: 1.5;
        }
        .gp-cta-btn{
          display: inline-block;
          background: var(--accent);
          color: #181008;
          font-family: 'IBM Plex Mono', monospace;
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 16px 30px;
          border-radius: 6px;
          text-decoration: none;
        }

        @media (prefers-reduced-motion: reduce){
          .gp-root{ scroll-behavior: auto; }
        }
      `}</style>

      <header className="gp-header">
        <span className="gp-badge">GROWTH SYSTEM</span>
        <h1>The Contractor Growth Pipeline</h1>
        <p className="gp-sub">
          Seven systems, in the order leads actually move through them — from
          first click to collected payment. Built so nothing leaks out along
          the way.
        </p>

        <div className="gp-stats">
          <div className="gp-stat">
            <span className="gp-num">+80%</span>
            <span className="gp-lbl">close rate with 5-min response</span>
          </div>
          <div className="gp-stat">
            <span className="gp-num">1 in 2</span>
            <span className="gp-lbl">finished jobs leave a review</span>
          </div>
          <div className="gp-stat">
            <span className="gp-num">30 → 60%</span>
            <span className="gp-lbl">site visitors who book</span>
          </div>
          <div className="gp-stat">
            <span className="gp-num">Top 3–5</span>
            <span className="gp-lbl">Google ranking in 5–6 months</span>
          </div>
        </div>
      </header>

      <div className="gp-pipeline">
        <div className="gp-stage" data-phase="qual1">
          <div className="gp-stage-node">
            <div className="gp-circle">01</div>
          </div>
          <div className="gp-card">
            <div className="gp-eyebrow">QUALIFICATION — PHASE 1</div>
            <h3>Verbose Intake Form</h3>
            <p className="gp-why">
              A short form gets filled out by anyone. A{" "}
              <b>longer, detailed form</b> gets filled out only by people who
              are actually ready to pay for the job. The form itself does the
              first round of filtering — before you ever pick up the phone.
            </p>
            <div className="gp-you-get">
              <b>YOU GET</b>
              Price-shoppers and time-wasters filter themselves out before
              they reach your calendar.
            </div>
          </div>
        </div>

        <div className="gp-stage" data-phase="qual2">
          <div className="gp-stage-node">
            <div className="gp-circle">02</div>
          </div>
          <div className="gp-card">
            <div className="gp-eyebrow">CONTACT SPEED</div>
            <h3>Speed-to-Lead System</h3>
            <p className="gp-why">
              Every lead gets contacted within <b>5 minutes</b> of submitting
              the form — no manual dialing, no lag. The homeowner never has
              to sit around wondering if anyone saw their request.
            </p>
            <div className="gp-you-get">
              <b>YOU GET</b>
              The lead books with you instead of shopping around, because you
              were first to respond.
            </div>
            <span className="gp-proof">
              Reason: close rate jumps ~80% when the lead doesn't have to
              contact a second contractor
            </span>
          </div>
        </div>

        <div className="gp-stage" data-phase="qual3">
          <div className="gp-stage-node">
            <div className="gp-circle">03</div>
          </div>
          <div className="gp-card">
            <div className="gp-eyebrow">QUALIFICATION — PHASE 2</div>
            <h3>Second-Pass Qualification</h3>
            <p className="gp-why">
              Before anything hits your calendar, the system confirms the
              details that matter: <b>homeowner status, budget, and timing</b>.
              Only leads that clear this pass get marked "qualified."
            </p>
            <div className="gp-you-get">
              <b>YOU GET</b>
              Every appointment on your calendar is a real, fundable,
              ready-to-move job — not a maybe.
            </div>
          </div>
        </div>

        <div className="gp-gate">
          <span>▾ QUALIFIED LEADS ONLY PASS BEYOND THIS POINT ▾</span>
        </div>

        <div className="gp-stage">
          <div className="gp-stage-node">
            <div className="gp-circle">04</div>
          </div>
          <div className="gp-card">
            <div className="gp-eyebrow">BOOKING</div>
            <h3>Appointment Setting System</h3>
            <p className="gp-why">
              The system moves a qualified lead straight onto the calendar —
              no back-and-forth, no operator having to chase a time slot down
              manually.
            </p>
            <div className="gp-you-get">
              <b>YOU GET</b>
              Faster first-contact-to-booked-appointment time, which by
              itself raises your close rate.
            </div>
          </div>
        </div>

        <div className="gp-stage">
          <div className="gp-stage-node">
            <div className="gp-circle">05</div>
          </div>
          <div className="gp-card">
            <div className="gp-eyebrow">NURTURE</div>
            <h3>30-Day Follow-Up System</h3>
            <p className="gp-why">
              Qualified leads who haven't booked yet get automatically
              followed up with for 30 days straight — until they either land
              on your calendar or opt out.
            </p>
            <div className="gp-you-get">
              <b>YOU GET</b>
              Leads that would've gone cold and gotten forgotten instead keep
              getting worked, with zero extra effort from you.
            </div>
          </div>
        </div>

        <div className="gp-stage">
          <div className="gp-stage-node">
            <div className="gp-circle">06</div>
          </div>
          <div className="gp-card">
            <div className="gp-eyebrow">COLLECTIONS</div>
            <h3>Invoice Collection System</h3>
            <p className="gp-why">
              Once a job is finished, the system follows up automatically
              until the remaining balance is paid in full.
            </p>
            <div className="gp-you-get">
              <b>YOU GET</b>
              Money owed to you stops sitting in limbo — collections happen
              without anyone having to remember to chase it.
            </div>
          </div>
        </div>

        <div className="gp-stage">
          <div className="gp-stage-node">
            <div className="gp-circle">07</div>
          </div>
          <div className="gp-card">
            <div className="gp-eyebrow">REPUTATION</div>
            <h3>Review Automation System</h3>
            <p className="gp-why">
              Every finished job automatically gets a review request. People
              forget to ask by hand — so by hand, roughly <b>1 in 10</b> jobs
              turns into a review. Automated, it's closer to <b>1 in 2</b>.
            </p>
            <div className="gp-you-get">
              <b>YOU GET</b>
              A steady, self-feeding stream of reviews aimed at landing you
              in the top 3–5 on Google within 5–6 months.
            </div>
          </div>
        </div>
      </div>

      <div className="gp-tank">
        <div className="gp-tank-box">
          <div className="gp-mono">END OF PIPELINE</div>
          <p>
            Lead in the top, payment collected and a review requested at the
            bottom — every step in between handled by the system, not by
            memory.
          </p>
        </div>
      </div>

      <div className="gp-addendum">
        <div className="gp-addendum-title">INCLUDED, NOT REQUIRED</div>
        <div className="gp-rider-grid">
          <div className="gp-rider">
            <span className="gp-tag">WEBSITE</span>
            <h3>2026 Conversion-Based Website</h3>
            <p>
              Built with current conversion-layout methods so more visitors
              actually book instead of bouncing.
            </p>
            <span className="gp-proof">30% → 60% visitor-to-booking rate</span>
          </div>
          <div className="gp-rider">
            <span className="gp-tag">GOOGLE PROFILE</span>
            <h3>Google Business Profile Optimization</h3>
            <p>
              Kept current and set up with every conversion feature Google
              offers, so the profile itself books customers.
            </p>
            <span className="gp-proof">$0 added cost</span>
          </div>
        </div>
      </div>

      <footer className="gp-footer">
        <p className="gp-tagline">
          First to respond wins the job.
          <br />
          We make sure that's always you.
        </p>
        <a className="gp-cta-btn" href="#">
          Book Your Free Strategy Call
        </a>
      </footer>
    </div>
  );
}
