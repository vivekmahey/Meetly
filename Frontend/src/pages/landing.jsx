import React from "react";
import { Link, useNavigate } from "react-router-dom";
import VideocamOutlined from "@mui/icons-material/VideocamOutlined";
import GroupsOutlined from "@mui/icons-material/GroupsOutlined";
import SecurityOutlined from "@mui/icons-material/SecurityOutlined";
import ScreenShareOutlined from "@mui/icons-material/ScreenShareOutlined";
import ChatOutlined from "@mui/icons-material/ChatOutlined";
import ArrowForward from "@mui/icons-material/ArrowForward";
import CheckCircle from "@mui/icons-material/CheckCircle";
import AccessTimeOutlined from "@mui/icons-material/AccessTimeOutlined";
import "../App.css";

export default function LandingPage() {
  const router = useNavigate();

  const goTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="landingPageContainer" id="top">
      {/* Navbar */}
      <nav className="landingNav">
        <Link to="/" className="landingBrand">
          <span className="brandIcon" style={{color:'orange', background:'none'}}>
            <VideocamOutlined />
          </span>
          <span>
            Meetly
          </span>
        </Link>

        <div className="landingNavLinks">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>

          <button
            className="navTextButton"
            onClick={() => router("/xgh3ut")}
          >
            Join as Guest
          </button>

          <button
            className="navLoginButton"
            onClick={() => router("/auth")}
          >
            Log in
          </button>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section className="landingHero">
          <div className="heroContent">
            {/* <div className="heroBadge">
              <span className="statusDot" />
              SIMPLE. CONNECTED. MEETLY.
            </div> */}

            <h1>
              Great conversations.
              <br />
              <span>Closer connections.</span>
            </h1>

            <p className="heroDescription">
              Meet face-to-face from anywhere. Start a video
              meeting, connect with your team, and share moments
              that matter — all with Meetly.
            </p>

            <div className="heroActions">
              <button
                className="primaryHeroButton"
                onClick={() => router("/auth")}
              >
                Get started
                <ArrowForward />
              </button>

              <button
                className="secondaryHeroButton"
                onClick={() => router("/xgh3ut")}
              >
                <span aria-hidden="true">▶</span>
                Join as guest
              </button>
            </div>

            <div className="heroBenefits">
              <span>
                <CheckCircle /> Easy to join
              </span>
              <span>
                <CheckCircle /> Real-time chat
              </span>
              <span>
                <CheckCircle /> Video meetings
              </span>
            </div>
          </div>

          {/* Illustration */}
         <div className="heroVisual">
  <img
    className="heroIllustration"
    src="undraw_group-video_k4jx (1).svg"
    alt="People connecting through a video call"
  />
</div>
        </section>

        {/* Features introduction */}
        <section className="landingIntro" id="features">
          <span className="sectionEyebrow">WHY MEETLY?</span>
          <h2>
            Everything you need to
            <br />
            <span>stay connected.</span>
          </h2>
          <p>
            From quick conversations to team meetings, Meetly
            brings your communication together in one place.
          </p>
        </section>

        {/* Feature cards */}
        <section className="featureGrid">
          <article className="featureCard">
            <div className="featureIcon">
              <VideocamOutlined />
            </div>
            <h3>Video meetings</h3>
            <p>
              Meet face-to-face with smooth, real-time video
              communication.
            </p>
          </article>

          <article className="featureCard">
            <div className="featureIcon">
              <ChatOutlined />
            </div>
            <h3>Live chat</h3>
            <p>
              Share messages during a meeting and keep the
              conversation flowing.
            </p>
          </article>

          <article className="featureCard">
            <div className="featureIcon">
              <GroupsOutlined />
            </div>
            <h3>Easy collaboration</h3>
            <p>
              Bring people together in a shared meeting room
              with a simple meeting code.
            </p>
          </article>

          <article className="featureCard">
            <div className="featureIcon">
              <ScreenShareOutlined />
            </div>
            <h3>Share your screen</h3>
            <p>
              Share your screen to explain ideas and work
              through things together.
            </p>
          </article>

          <article className="featureCard">
            <div className="featureIcon">
              <SecurityOutlined />
            </div>
            <h3>Account access</h3>
            <p>
              Sign in to access your account and keep track
              of your meeting activity.
            </p>
          </article>

          <article className="featureCard">
            <div className="featureIcon">
              <AccessTimeOutlined />
            </div>
            <h3>Meeting history</h3>
            <p>
              Find previous meeting codes in your activity
              history and reconnect when needed.
            </p>
          </article>
        </section>

        {/* How it works */}
        <section className="howItWorks" id="how-it-works">
          <div className="howIntro">
            <span className="sectionEyebrow">GET STARTED</span>
            <h2>
              Your next meeting
              <br />
              is just a few clicks away.
            </h2>
            <p>
              No complicated setup. Just connect and start
              your conversation.
            </p>

            <button
              className="primaryHeroButton"
              onClick={() => router("/auth")}
            >
              Start with Meetly <ArrowForward />
            </button>
          </div>

          <div className="stepsList">
            <div className="stepItem">
              <span className="stepNumber">01</span>
              <div>
                <h3>Create your account</h3>
                <p>
                  Register or sign in to get started with Meetly.
                </p>
              </div>
            </div>

            <div className="stepItem">
              <span className="stepNumber">02</span>
              <div>
                <h3>Enter a meeting code</h3>
                <p>Join a room using its meeting code.</p>
              </div>
            </div>

            <div className="stepItem">
              <span className="stepNumber">03</span>
              <div>
                <h3>Connect and collaborate</h3>
                <p>
                  Start talking, use live chat, and connect
                  face-to-face.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="landingCta">
          <div>
            <span className="sectionEyebrow">LET'S CONNECT</span>
            <h2>Make distance feel smaller.</h2>
            <p>Your next great conversation starts with Meetly.</p>
          </div>

          <button
            className="ctaButton"
            onClick={() => router("/auth")}
          >
            Get started <ArrowForward />
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="landingFooter">
        <div className="footerMain">
          <div className="footerBrandColumn">
            <Link to="/" className="landingBrand footerBrand">
              <span className="brandIcon">
                <VideocamOutlined />
              </span>
              <span>
                Meetly<span className="brandDot">.</span>
              </span>
            </Link>

            <p>
              Bringing people closer through simple,
              accessible video communication.
            </p>
          </div>

          <div className="footerColumn">
            <h4>Explore</h4>
            <a href="#features">Features</a>
            <a href="#how-it-works">How it works</a>
            <button onClick={() => router("/xgh3ut")}>
              Join as Guest
            </button>
          </div>

          <div className="footerColumn">
            <h4>Your account</h4>
            <button onClick={() => router("/auth")}>
              Register
            </button>
            <button onClick={() => router("/auth")}>
              Log in
            </button>
          </div>

          <div className="footerColumn footerContact">
            <h4>Ready to connect?</h4>
            <p>
              Start a conversation with your team, friends,
              or family.
            </p>
            <button
              className="footerStartButton"
              onClick={() => router("/auth")}
            >
              Get started <ArrowForward />
            </button>
          </div>
        </div>

        <div className="footerBottom">
          <p>
            © {new Date().getFullYear()} Meetly. All rights reserved.
          </p>
          <a href="#top" onClick={goTop}>
            Back to top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}