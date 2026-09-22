import { useEffect, useState } from "react";
import "./App.css";

const sections = [
  {
    title: "YOUR PORTRAITS",
    text: "A little collection of your beautiful moments.",
  },
  {
    title: "YOUR VOICE NOTES",
    text: "The voice I could listen to again and again.",
  },
  {
    title: "YOUR FAVOURITE SONGS",
    text: "Songs that remind me of you.",
  },
  {
    title: "YOUR BIRTHDAY DATE",
    text: "The day my favourite person came into this world.",
  },
  {
    title: "A SURPRISE FOR YOU",
    text: "Something I made only for you.",
  },
];

const portraits = [
  {
    image: "/portraits/portrait01.jpg",
    title: "YOUR SMILE",
    text: "That smile I could look at forever.",
  },
  {
    image: "/portraits/portrait02.jpg",
    title: "YOUR MOMENTS",
    text: "Little moments that became beautiful memories.",
  },
  {
    image: "/portraits/portrait03.jpg",
    title: "YOUR ELEGANCE",
    text: "Simple. Beautiful. Completely you.",
  },
  {
    image: "/portraits/portrait04.jpg",
    title: "YOUR HAPPINESS",
    text: "A moment worth keeping forever.",
  },
  {
    image: "/portraits/portrait05.jpg",
    title: "YOUR VIBES",
    text: "Your own little kind of magic.",
  },
  {
    image: "/portraits/portrait06.jpg",
    title: "YOUR CUTENESS",
    text: "No explanation needed.",
  },
  {
    image: "/portraits/portrait07.jpg",
    title: "YOUR BEAUTY",
    text: "Another side of my favourite person.",
  },
  {
    image: "/portraits/portrait08.jpg",
    title: "YOUR STYLE",
    text: "The way you make every moment yours.",
  },
  {
    image: "/portraits/portrait09.jpg",
    title: "YOUR MOMENTS",
    text: "One more memory to keep close.",
  },
  {
    image: "/portraits/portrait10.jpg",
    title: "YOUR GLOW",
    text: "Soft, calm and beautiful.",
  },
  {
    image: "/portraits/portrait11.jpg",
    title: "YOUR ELEGANCE",
    text: "A beautiful moment captured.",
  },
  {
    image: "/portraits/portrait12.jpg",
    title: "YOUR CUTE SIDE",
    text: "The side that makes you special.",
  },
  {
    image: "/portraits/portrait13.jpg",
    title: "YOUR EYES",
    text: "Those eyes say more than words.",
    special: true,
  },
];

function Butterflies() {
  const butterflies = Array.from({ length: 14 });

  return (
    <div className="butterfly-layer" aria-hidden="true">
      {butterflies.map((_, index) => (
        <span
          key={index}
          className="butterfly"
          style={{
            left: `${5 + ((index * 17) % 90)}%`,
            animationDelay: `${(index * 1.8) % 10}s`,
            animationDuration: `${12 + (index % 5)}s`,
          }}
        >
          🦋
        </span>
      ))}
    </div>
  );
}

function FloatingCore() {
  return (
    <div className="floating-core" aria-hidden="true">
      <div className="core-glow"></div>

      <div className="round-core">
        <span>♡</span>
      </div>
    </div>
  );
}

function App() {
  const [introStep, setIntroStep] = useState(0);

  const [name, setName] = useState("");
  const [homeName, setHomeName] = useState("");

  const [showNameInput, setShowNameInput] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [princess, setPrincess] = useState(false);
  const [nameReveal, setNameReveal] = useState(false);

  const [home, setHome] = useState(false);
  const [homeNameStep, setHomeNameStep] = useState(true);

  // 🤖 NEW — AI PANTHULU REPORT
  const [aiReport, setAiReport] = useState(false);

  const [portraitsPage, setPortraitsPage] = useState(false);
  const [selectedPortrait, setSelectedPortrait] = useState(null);

  /* --------------------------------
     👁️ FULLSCREEN EYES
  -------------------------------- */
  const [eyesFullscreen, setEyesFullscreen] = useState(false);

  /* --------------------------------
     OPENING ANIMATION
  -------------------------------- */
  useEffect(() => {
    const timers = [
      setTimeout(() => setIntroStep(1), 700),
      setTimeout(() => setIntroStep(2), 2200),
      setTimeout(() => setIntroStep(3), 3700),
      setTimeout(() => setIntroStep(4), 5400),
      setTimeout(() => setShowNameInput(true), 6000),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  /* --------------------------------
     🎵 BACKGROUND SONG
  -------------------------------- */
  useEffect(() => {
    const audio = new Audio(
      "/Sai Abhyankkar - She was my best moment.mp3"
    );

    audio.loop = true;
    audio.volume = 0.5;

    const playMusic = () => {
      audio.play().catch(() => {});
    };

    playMusic();

    document.addEventListener("click", playMusic, {
      once: true,
    });

    document.addEventListener("touchstart", playMusic, {
      once: true,
    });

    document.addEventListener("keydown", playMusic, {
      once: true,
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;

      document.removeEventListener("click", playMusic);
      document.removeEventListener("touchstart", playMusic);
      document.removeEventListener("keydown", playMusic);
    };
  }, []);

  /* --------------------------------
     NAME ENTER
  -------------------------------- */
  const handleEnter = () => {
    if (!name.trim()) return;

    setShowNameInput(false);
    setWrong(true);

    setTimeout(() => {
      setWrong(false);
      setPrincess(true);
    }, 1500);
  };

  /* --------------------------------
     PRINCESS NEXT
  -------------------------------- */
  const handleNext = () => {
    setPrincess(false);
    setNameReveal(true);

    setTimeout(() => {
      setNameReveal(false);
      setHome(true);
      setHomeNameStep(true);
      setHomeName("");
    }, 6500);
  };

  /* --------------------------------
     HOME NAME
  -------------------------------- */
  const handleHomeNameEnter = () => {
    if (!homeName.trim()) return;

    setHomeNameStep(false);

    // 🤖 After home name → AI Report
    setTimeout(() => {
      setAiReport(true);
    }, 500);
  };

  /* --------------------------------
     🤖 SHOW WORLD
  -------------------------------- */
  const handleShowWorld = () => {
    setAiReport(false);
  };

  /* --------------------------------
     OPEN PORTRAITS
  -------------------------------- */
  const openPortraits = () => {
    setHome(false);
    setAiReport(false);
    setPortraitsPage(true);
    setSelectedPortrait(null);
    setEyesFullscreen(false);
  };

  /* --------------------------------
     CLOSE PORTRAITS
  -------------------------------- */
  const closePortraits = () => {
    setSelectedPortrait(null);
    setEyesFullscreen(false);
    setPortraitsPage(false);
    setHome(true);
    setAiReport(false);
  };

  /* --------------------------------
     OPEN SINGLE PORTRAIT
  -------------------------------- */
  const openPortrait = (portrait, index) => {
    setSelectedPortrait({
      ...portrait,
      index,
    });
  };

  /* --------------------------------
     NEXT PORTRAIT
  -------------------------------- */
  const showNextPortrait = () => {
    if (!selectedPortrait) return;

    const nextIndex =
      (selectedPortrait.index + 1) % portraits.length;

    setSelectedPortrait({
      ...portraits[nextIndex],
      index: nextIndex,
    });
  };

  /* --------------------------------
     PREVIOUS PORTRAIT
  -------------------------------- */
  const showPreviousPortrait = () => {
    if (!selectedPortrait) return;

    const previousIndex =
      (selectedPortrait.index - 1 + portraits.length) %
      portraits.length;

    setSelectedPortrait({
      ...portraits[previousIndex],
      index: previousIndex,
    });
  };

  /* --------------------------------
     👁️ LAST IMAGE AUTO FULLSCREEN
  -------------------------------- */
  useEffect(() => {
    if (!portraitsPage) return;

    const eyesImage = document.querySelector(
      ".portrait-special"
    );

    if (!eyesImage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (
          entry.isIntersecting &&
          entry.intersectionRatio >= 0.65
        ) {
          setEyesFullscreen(true);
        }
      },
      {
        threshold: [0.65],
      }
    );

    observer.observe(eyesImage);

    return () => observer.disconnect();
  }, [portraitsPage]);

  return (
    <main className="app">
      <Butterflies />
      <FloatingCore />

      {/* --------------------------------
          OPENING
      -------------------------------- */}
      {introStep < 4 && (
        <section className="screen opening-screen">
          <div className="opening-content">
            {introStep === 1 && (
              <div className="opening-word">
                Don't
              </div>
            )}

            {introStep === 2 && (
              <div className="opening-word">
                be
              </div>
            )}

            {introStep === 3 && (
              <div className="opening-word opening-last">
                Kanagarupading
              </div>
            )}
          </div>
        </section>
      )}

      {/* --------------------------------
          NAME INPUT
      -------------------------------- */}
      {showNameInput &&
        !wrong &&
        !princess &&
        !nameReveal &&
        !home &&
        !portraitsPage && (
          <section className="screen name-screen">
            <div className="name-card">
              <p className="eyebrow">
                A LITTLE QUESTION
              </p>

              <h1 className="name-title">
                ENTER YOUR NAME
              </h1>

              <div className="title-line"></div>

              <p className="name-subtitle">
                to begin something beautiful…
              </p>

              <div className="name-form">
                <input
                  type="text"
                  placeholder="Type your name..."
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleEnter();
                    }
                  }}
                />

                <button
                  className="primary-button"
                  onClick={handleEnter}
                >
                  ENTER <span>→</span>
                </button>
              </div>
            </div>
          </section>
        )}

      {/* --------------------------------
          WRONG
      -------------------------------- */}
      {wrong && (
        <section className="screen message-screen">
          <div className="message-content">
            <p className="message-small">
              WAIT…
            </p>

            <h1>
              Hmm… wrong.
            </h1>

            <div className="message-line"></div>
          </div>
        </section>
      )}

      {/* --------------------------------
          PRINCESS
      -------------------------------- */}
      {princess && (
        <section className="screen princess-screen">
          <div className="princess-card">
            <p className="princess-eyebrow">
              I THINK YOU ARE
            </p>

            <div className="princess-title-wrap">
              <span className="princess-heart left-heart">
                ♥
              </span>

              <h1 className="princess-title">
                PRINCESS
              </h1>

              <span className="princess-heart right-heart">
                ♥
              </span>
            </div>

            <div className="princess-underline">
              <span></span>
            </div>

            <p className="princess-subtitle">
              and maybe a little more special than that…
            </p>

            <button
              className="princess-button"
              onClick={handleNext}
            >
              <span>NEXT</span>
              <span className="button-arrow">
                →
              </span>
            </button>
          </div>
        </section>
      )}

      {/* --------------------------------
          NAME REVEAL
      -------------------------------- */}
      {nameReveal && (
        <section className="screen reveal-screen">
          <div className="reveal-content">
            <p className="hello-reveal">
              Hiiilooo raa 😊
            </p>

            <h1 className="revealed-name">
              {name}
            </h1>

            <div className="reveal-line"></div>

            <p className="there-you-are">
              There you are.
            </p>
          </div>
        </section>
      )}

      {/* --------------------------------
          HOME
      -------------------------------- */}
      {home && !aiReport && (
        <section className="screen home-screen">
          <div className="home-content">

            {homeNameStep && (
              <div className="home-name-section">
                <p className="home-eyebrow">
                  WELCOME TO YOUR LITTLE WORLD
                </p>

                <div className="home-message">
                  <p>
                    Nayina user huu nenu 😌
                  </p>

                  <p>
                    AI panthuluni neku em kavalo koruko
                  </p>

                  <p>
                    Poni… ne peru ekkada cheppu?
                  </p>
                </div>

                <div className="home-name-form">
                  <input
                    type="text"
                    placeholder="Nee peru ikkada cheppu..."
                    value={homeName}
                    onChange={(event) =>
                      setHomeName(event.target.value)
                    }
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleHomeNameEnter();
                      }
                    }}
                  />

                  <button
                    className="primary-button"
                    onClick={handleHomeNameEnter}
                  >
                    ENTER <span>→</span>
                  </button>
                </div>
              </div>
            )}

            {!homeNameStep && (
              <>
                <p className="home-eyebrow">
                  WELCOME TO YOUR LITTLE WORLD
                </p>

                <h1 className="home-title">
                  Choose something,
                  <br />
                  <span>
                    princess.
                  </span>
                </h1>

                <div className="home-line"></div>

                <div className="options-container">
                  {sections.map(
                    (section, index) => (
                      <button
                        className="butterfly-option"
                        key={index}
                        onClick={
                          index === 0
                            ? openPortraits
                            : undefined
                        }
                      >
                        <span className="option-number">
                          0{index + 1}
                        </span>

                        <span className="option-content">
                          <strong>
                            {section.title}
                          </strong>

                          <small>
                            {section.text}
                          </small>
                        </span>

                        <span className="option-arrow">
                          ↗
                        </span>
                      </button>
                    )
                  )}
                </div>

                <p className="bottom-caption">
                  made with a little love, just for you ♡
                </p>
              </>
            )}
          </div>
        </section>
      )}

      {/* --------------------------------
          🤖 AI PANTHULU PERSONAL REPORT
      -------------------------------- */}
      {aiReport && (
        <section className="screen ai-report-screen">
          <div className="ai-report-card">

            <p className="ai-report-eyebrow">
              FOUNDED BY AI PANTHULU 🤖
            </p>

            <h1 className="ai-report-title">
              YOUR PERSONAL
              <span> REPORT</span>
            </h1>

            <div className="ai-report-line"></div>

            <div className="ai-report-details">

              <div className="ai-detail">
                <span>YOUR NAME</span>
                <strong>{name}</strong>
              </div>

              <div className="ai-detail">
                <span>DOB</span>
                <strong>25th Jan 2008</strong>
              </div>

              <div className="ai-detail">
                <span>HAIR</span>
                <strong>
                  Neeku noodles laanti hair style untundhi 🍜😂
                </strong>
              </div>

              <div className="ai-detail">
                <span>MEMORY</span>
                <strong>
                  Neeku lite-ga mathimarupu undhi 😌😂
                </strong>
              </div>

              <div className="ai-detail">
                <span>SMILE</span>
                <strong>
                  Navvithe innocent la untav… kani konchem
                  dangerous kuda 😏
                </strong>
              </div>

              <div className="ai-detail">
                <span>ATTITUDE</span>
                <strong>
                  Nee rules neeve… convince cheyyadam konchem
                  kashtame 😂
                </strong>
              </div>

              <div className="ai-detail">
                <span>HEART</span>
                <strong>
                  Chala soft… kani easy-ga oppukovu ❤️
                </strong>
              </div>

              <div className="ai-detail">
                <span>SPECIAL NOTE</span>
                <strong>
                  Ninnu understand cheyyadaniki AI Panthulu ki
                  kuda konchem time pattindhi 🤭
                </strong>
              </div>

            </div>

            <div className="ai-final-report">
              <span>FINAL REPORT</span>

              <p>
                “Overall ga… nuvvu oka special piece 😌❤️”
              </p>
            </div>

            <button
              className="ai-world-button"
              onClick={handleShowWorld}
            >
              <span>
                ✨ OKAY, SHOW ME MY WORLD ✨
              </span>

              <b>→</b>
            </button>

          </div>
        </section>
      )}

      {/* --------------------------------
          YOUR PORTRAITS
      -------------------------------- */}
      {portraitsPage && (
        <section className="screen portraits-screen">
          <div className="portraits-page">

            <div className="portraits-header">
              <button
                className="portraits-back"
                onClick={closePortraits}
              >
                ← BACK
              </button>

              <div>
                <p className="portraits-eyebrow">
                  A LITTLE COLLECTION OF YOU
                </p>

                <h1 className="portraits-title">
                  Your Portraits
                </h1>

                <p className="portraits-subtitle">
                  Every picture holds a little piece of you.
                </p>
              </div>
            </div>

            <div className="portraits-grid">
              {portraits.map(
                (portrait, index) => (
                  <button
                    key={index}
                    className={`portrait-card ${
                      portrait.special
                        ? "portrait-special"
                        : ""
                    }`}
                    onClick={() =>
                      openPortrait(
                        portrait,
                        index
                      )
                    }
                  >
                    <div className="portrait-image-wrap">
                      <img
                        src={portrait.image}
                        alt={portrait.title}
                      />

                      <div className="portrait-overlay">
                        <span>
                          VIEW
                        </span>
                      </div>
                    </div>

                    <div className="portrait-info">
                      <span className="portrait-number">
                        0{index + 1}
                      </span>

                      <div>
                        <h2>
                          {portrait.title}
                        </h2>

                        <p>
                          {portrait.text}
                        </p>
                      </div>

                      <span className="portrait-arrow">
                        ↗
                      </span>
                    </div>
                  </button>
                )
              )}
            </div>

            <p className="portraits-footer">
              made from memories, moments & a little love ♡
            </p>
          </div>
        </section>
      )}

      {/* --------------------------------
          👁️ EYES FULLSCREEN
      -------------------------------- */}
      {eyesFullscreen && (
        <div className="eyes-fullscreen">
          <button
            className="eyes-fullscreen-close"
            onClick={() => setEyesFullscreen(false)}
          >
            ×
          </button>

          <img
            src="/portraits/portrait13.jpg"
            alt="Your Eyes"
          />

          <div className="eyes-fullscreen-caption">
            <span>YOUR EYES</span>

            <p>
              Those eyes say more than words.
            </p>
          </div>
        </div>
      )}

      {/* --------------------------------
          FULLSCREEN PORTRAIT MODAL
      -------------------------------- */}
      {selectedPortrait && (
        <div className="portrait-modal">
          <button
            className="modal-close"
            onClick={() =>
              setSelectedPortrait(null)
            }
          >
            ×
          </button>

          <button
            className="modal-arrow modal-left"
            onClick={showPreviousPortrait}
          >
            ←
          </button>

          <div className="modal-content">
            <div className="modal-image-wrap">
              <img
                src={selectedPortrait.image}
                alt={selectedPortrait.title}
              />
            </div>

            <p className="modal-number">
              {String(
                selectedPortrait.index + 1
              ).padStart(2, "0")}{" "}
              /{" "}
              {String(
                portraits.length
              ).padStart(2, "0")}
            </p>

            <h2>
              {selectedPortrait.title}
            </h2>

            <p>
              {selectedPortrait.text}
            </p>
          </div>

          <button
            className="modal-arrow modal-right"
            onClick={showNextPortrait}
          >
            →
          </button>
        </div>
      )}
    </main>
  );
}

export default App;