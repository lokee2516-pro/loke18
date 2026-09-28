import { useEffect, useRef, useState } from "react";
import "./App.css";
import { supabase } from "./lib/supabase";

const ASSET_BASE = import.meta.env.BASE_URL;

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
    title: "NE KORIKALU",
    text: "Nee heart lo unna korikalu ikkada cheppu… ❤️",
  },
  {
    title: "A SURPRISE FOR YOU",
    text: "Something I made only for you.",
  },
];

const portraits = [
  {
    image: `${ASSET_BASE}portraits/portrait01.jpg`,
    title: "YOUR SMILE",
    text: "That smile I could look at forever.",
  },
  {
    image: `${ASSET_BASE}portraits/portrait02.jpg`,
    title: "YOUR MOMENTS",
    text: "Little moments that became beautiful memories.",
  },
  {
    image: `${ASSET_BASE}portraits/portrait03.jpg`,
    title: "YOUR ELEGANCE",
    text: "Simple. Beautiful. Completely you.",
  },
  {
    image: `${ASSET_BASE}portraits/portrait04.jpg`,
    title: "YOUR HAPPINESS",
    text: "A moment worth keeping forever.",
  },
  {
    image: `${ASSET_BASE}portraits/portrait05.jpg`,
    title: "YOUR VIBES",
    text: "Your own little kind of magic.",
  },
  {
    image: `${ASSET_BASE}portraits/portrait06.jpg`,
    title: "YOUR CUTENESS",
    text: "No explanation needed.",
  },
  {
    image: `${ASSET_BASE}portraits/portrait07.jpg`,
    title: "YOUR BEAUTY",
    text: "Another side of my favourite person.",
  },
  {
    image: `${ASSET_BASE}portraits/portrait08.jpg`,
    title: "YOUR STYLE",
    text: "The way you make every moment yours.",
  },
  {
    image: `${ASSET_BASE}portraits/portrait09.jpg`,
    title: "YOUR MOMENTS",
    text: "One more memory to keep close.",
  },
  {
    image: `${ASSET_BASE}portraits/portrait10.jpg`,
    title: "YOUR GLOW",
    text: "Soft, calm and beautiful.",
  },
  {
    image: `${ASSET_BASE}portraits/portrait11.jpg`,
    title: "YOUR ELEGANCE",
    text: "A beautiful moment captured.",
  },
  {
    image: `${ASSET_BASE}portraits/portrait12.jpg`,
    title: "YOUR CUTE SIDE",
    text: "The side that makes you special.",
  },
  {
    image: `${ASSET_BASE}portraits/portrait13.jpg`,
    title: "YOUR EYES",
    text: "Those eyes say more than words.",
    special: true,
  },
];

const surpriseMessages = [
  "Arey 😭 naku oka love story undhi rah… vintava? 🥹❤️",

  "Arey… nenu naa AI Panthulammaki em cheppudham anukunnano telusa rah? 👀❤️",

  "Evi anni naa unsend messages rah… 🥹",

  `oke ooru kaadu Chinnappati parichayam kaadu, bandhutvamu kaadu, manalni kalipe okka kaaranam kooda ledu. Nijam cheppalante okappudu nee peru kooda naaku teliyadu. Ee prapanchamlo nuvvu ane oka manishi unnaavu ane vishayam kooda naaku teliyadu. Nee daarilo nenu lenu, na daari lo nuvvu levu. Ayina ekkado, eppudo, e kaaranam lekunda rendu aparichitamaina jeevithaalu oka palakarimputho oka parichayangaa maaraayi. Konni parichayaalu maname vethukkuntaam, marikonni parichayaalu manaki teliyakunda jaruguthaayi. Nee parichayam rendodi. Modata oka peru, tharvatha oka palakarimpu, aa tharvatha teliyakunda manasuku daggaraina oka manishi. Ippatiki aashcharyangane untundi, e sambandham lekapoyina intha anubhandham ela eerpadindo ani. Ee prapanchamlo kotla mandi manushulu unnaru. Vaallandari lo mana daarulu kalavadam, mana parichayam eerpadadam anedi naaku maathram oka chinna adbhuthangaa anipisthundi.`,

  `choodu manam same to same kaakapoyina naaku adi anavasaram. Choodu naaku evaru avasaramo cheppana? Nuvve nuvve naaku avasaram. Okay? Idi neeku eppudu cheppaledu. Cheppi vundalsindhi Cheppalekapoyaanu. Endukante adi nee manasuloni baadhalni bhaavaalni artham chesukoleni balheenudini kaabatti nenu neeku eppudu bhaarangaane unnaanu. Nee baadhalni nenu eppudu panchukoledu. Daaniki kaaranam bahusha naa jeevitham motham ontariga gadipinandukemo`,

  `Nee baadhalonoo, nee santhoshamloo nee ku thoduga nenuuntaanu. Mee ammaanaanna tharvatha vaallakante ekkuvaga ninnu nenu premisthaanu. Maathalu chaalaamandi chepthaaru kaani okkasaari nannu preminchi choodu, tharvatha neekante ekkuvaga ninnu nenu premisthaanu.`,

  `Naa jeevithamlo jarigina naaku santhoshaanni ichche vishayam edaina undi ante adi nuvve. Endukante ee prapanchamlo nuvvu thappa inkevaroo leru.`,

  `Oka samudhram lo neeku entha water kavalo antha teesuko… nuvvu teesukunna aa water antha nee prema anukunte, migilina neeru antha naa prema. 🌊❤️`,

  `Ee oka maata thanaki eduruga, naa tho unnapudu cheppali anukunna… adhe chepputhano ledho ee janmaki… 🥹❤️ Nenu thanani premistha ani cheppadam ledhu… pelli chesukunta ani chepthunna. ❤️💍`,
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

  const [aiReport, setAiReport] = useState(false);

  const [portraitsPage, setPortraitsPage] = useState(false);
  const [selectedPortrait, setSelectedPortrait] = useState(null);

  const [eyesFullscreen, setEyesFullscreen] = useState(false);

  // ❤️ NE KORIKALU
  const [wishPage, setWishPage] = useState(false);
  const [wish, setWish] = useState("");
  const [wishSaving, setWishSaving] = useState(false);
  const [wishStatus, setWishStatus] = useState("");

  // 🎵 MUSIC
  const backgroundAudioRef = useRef(null);

  // 🎬 FAVOURITE SONGS
  const [songsPage, setSongsPage] = useState(false);
  const [songPlaying, setSongPlaying] = useState(false);
  const favouriteSongRef = useRef(null);

  // 🎙️ VOICE NOTES
  const [voicePage, setVoicePage] = useState(false);
  const [voicePlayingIndex, setVoicePlayingIndex] = useState(null);
  const voiceAudioRefs = useRef([]);

  // 🎁 SURPRISE
  const [surprisePage, setSurprisePage] = useState(false);
  const [surprisePhase, setSurprisePhase] = useState("countdown");
  const [surpriseCountdown, setSurpriseCountdown] = useState(3);
  const [surpriseMessageIndex, setSurpriseMessageIndex] = useState(0);

  // Browser session ID
  const sessionIdRef = useRef("");

  useEffect(() => {
    let id = sessionStorage.getItem("ai_panthu_session_id");

    if (!id) {
      id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

      sessionStorage.setItem("ai_panthu_session_id", id);
    }

    sessionIdRef.current = id;
  }, []);

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
     🎵 BACKGROUND MUSIC
  -------------------------------- */
  useEffect(() => {
    const audio = new Audio(`${ASSET_BASE}Sai Abhyankkar - She was my best moment.mp3`);

    audio.loop = true;
    audio.volume = 0.5;

    backgroundAudioRef.current = audio;

    const playMusic = () => {
      if (!songPlaying) {
        audio.play().catch(() => {});
      }
    };

    playMusic();

    const unlockMusic = () => {
      if (!songPlaying) {
        audio.play().catch(() => {});
      }
    };

    document.addEventListener("click", unlockMusic, {
      once: true,
    });

    document.addEventListener("touchstart", unlockMusic, {
      once: true,
    });

    document.addEventListener("keydown", unlockMusic, {
      once: true,
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
      backgroundAudioRef.current = null;

      document.removeEventListener("click", unlockMusic);
      document.removeEventListener("touchstart", unlockMusic);
      document.removeEventListener("keydown", unlockMusic);
    };
  }, []);

  /* --------------------------------
     🎵 PAUSE / RESUME BACKGROUND
  -------------------------------- */
  useEffect(() => {
    const audio = backgroundAudioRef.current;

    if (!audio) return;

    if (songPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  }, [songPlaying]);

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

    setTimeout(() => {
      setAiReport(true);
    }, 500);
  };

  /* --------------------------------
     SHOW WORLD
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
    setWishPage(false);
    setSongsPage(false);
    setSurprisePage(false);
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
     EYES AUTO FULLSCREEN
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

  /* --------------------------------
     ❤️ OPEN WISH PAGE
  -------------------------------- */
  const openWishPage = () => {
    setHome(false);
    setAiReport(false);
    setPortraitsPage(false);
    setSongsPage(false);
    setSurprisePage(false);
    setWishStatus("");
    setWishPage(true);
  };

  /* --------------------------------
     ❤️ CLOSE WISH PAGE
  -------------------------------- */
  const closeWishPage = () => {
    setWishPage(false);
    setWishStatus("");
    setWish(true ? "" : "");
    setHome(true);
  };

  /* --------------------------------
     ❤️ SAVE WISH
  -------------------------------- */
  const submitWish = async () => {
    if (!wish.trim() || wishSaving) return;

    setWishSaving(true);
    setWishStatus("");

    const { error } = await supabase
      .from("her_responses")
      .insert({
        name: homeName.trim() || name.trim(),
        wish: wish.trim(),
        session_id: sessionIdRef.current,
      });

    if (error) {
      console.error("Wish save failed:", error);
      setWishStatus(
        "Something went wrong… try once more ❤️"
      );
    } else {
      setWish("");
      setWishStatus(
        "Nee korika na daggara safe ga undhi ❤️"
      );
    }

    setWishSaving(false);
  };

  /* --------------------------------
     🎙️ OPEN VOICE NOTES
  -------------------------------- */
  const openVoicePage = () => {
    setHome(false);
    setAiReport(false);
    setPortraitsPage(false);
    setWishPage(false);
    setSongsPage(false);
    setSurprisePage(false);
    setVoicePage(true);
    setVoicePlayingIndex(null);
  };

  /* --------------------------------
     🎙️ VOICE PLAY / PAUSE
  -------------------------------- */
  const handleVoicePlay = (index) => {
    voiceAudioRefs.current.forEach((audio, audioIndex) => {
      if (audio && audioIndex !== index) {
        audio.pause();
        audio.currentTime = 0;
      }
    });

    setVoicePlayingIndex(index);
    setSongPlaying(true);
  };

  const handleVoicePause = (index) => {
    if (voicePlayingIndex === index) {
      setVoicePlayingIndex(null);
      setSongPlaying(false);
    }
  };

  const handleVoiceEnded = (index) => {
    if (voicePlayingIndex === index) {
      setVoicePlayingIndex(null);
      setSongPlaying(false);
    }
  };

  /* --------------------------------
     🎙️ CLOSE VOICE NOTES
  -------------------------------- */
  const closeVoicePage = () => {
    voiceAudioRefs.current.forEach((audio) => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });

    setVoicePlayingIndex(null);
    setSongPlaying(false);
    setVoicePage(false);
    setHome(true);
  };

  /* --------------------------------
     🎵 OPEN FAVOURITE SONGS
  -------------------------------- */
  const openSongsPage = () => {
    setHome(false);
    setAiReport(false);
    setPortraitsPage(false);
    setWishPage(false);
    setSurprisePage(false);
    setSongsPage(true);
  };

  /* --------------------------------
     🎵 CLOSE FAVOURITE SONGS
  -------------------------------- */
  const closeSongsPage = () => {
    if (favouriteSongRef.current) {
      favouriteSongRef.current.pause();
      favouriteSongRef.current.currentTime = 0;
    }

    setSongPlaying(false);
    setSongsPage(false);
    setHome(true);
  };

  /* --------------------------------
     🎵 VIDEO HANDLERS
     Ready for future video file.
  -------------------------------- */
  const handleSongPlay = () => {
    setSongPlaying(true);
  };

  const handleSongPause = () => {
    setSongPlaying(false);
  };

  const handleSongEnded = () => {
    setSongPlaying(false);
  };

  /* --------------------------------
     🎁 OPEN SURPRISE
  -------------------------------- */
  const openSurprise = () => {
    setHome(false);
    setAiReport(false);
    setPortraitsPage(false);
    setWishPage(false);
    setSongsPage(false);

    setSurprisePage(true);
    setSurprisePhase("countdown");
    setSurpriseCountdown(3);
    setSurpriseMessageIndex(0);
  };

  /* --------------------------------
     🎁 SURPRISE COUNTDOWN
  -------------------------------- */
  useEffect(() => {
    if (!surprisePage) return;
    if (surprisePhase !== "countdown") return;

    if (surpriseCountdown <= 0) {
      setSurprisePhase("prank");
      return;
    }

    const timer = setTimeout(() => {
      setSurpriseCountdown((current) => current - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [
    surprisePage,
    surprisePhase,
    surpriseCountdown,
  ]);

  /* --------------------------------
     🎁 PRANK TIMER
  -------------------------------- */
  useEffect(() => {
    if (!surprisePage) return;
    if (surprisePhase !== "prank") return;

    const timer = setTimeout(() => {
      setSurprisePhase("messages");
      setSurpriseMessageIndex(0);
    }, 6000);

    return () => clearTimeout(timer);
  }, [surprisePage, surprisePhase]);

  /* --------------------------------
     🎁 NEXT SURPRISE MESSAGE
  -------------------------------- */
  const nextSurpriseMessage = () => {
    if (
      surpriseMessageIndex <
      surpriseMessages.length - 1
    ) {
      setSurpriseMessageIndex(
        (current) => current + 1
      );
    }
  };

  /* --------------------------------
     🎁 CLOSE SURPRISE
  -------------------------------- */
  const closeSurprise = () => {
    setSurprisePage(false);
    setSurprisePhase("countdown");
    setSurpriseCountdown(3);
    setSurpriseMessageIndex(0);
    setHome(true);
  };

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
        !portraitsPage &&
        !wishPage &&
        !songsPage &&
        !voicePage &&
        !surprisePage && (
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
                        onClick={() => {
                          if (index === 0) {
                            openPortraits();
                          }

                          if (index === 1) {
                            openVoicePage();
                          }

                          if (index === 2) {
                            openSongsPage();
                          }

                          if (index === 3) {
                            openWishPage();
                          }

                          if (index === 4) {
                            openSurprise();
                          }
                        }}
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
          AI PANTHULU PERSONAL REPORT
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
          🎙️ YOUR VOICE NOTES
      -------------------------------- */}
      {voicePage && (
        <section className="screen voice-screen">
          <div className="voice-page">
            <button
              className="voice-back"
              onClick={closeVoicePage}
            >
              ← BACK
            </button>

            <div className="voice-content">
              <p className="voice-eyebrow">
                A LITTLE PIECE OF YOUR VOICE
              </p>

              <h1 className="voice-title">
                Your Voice Notes
              </h1>

              <div className="voice-line"></div>

              <p className="voice-subtitle">
                Some voices are meant to be heard again and again. ❤️
              </p>

              <div className="voice-list">
                {[
                  {
                    title: "VOICE NOTE 01",
                    text: "A little voice note, kept here just for you.",
                    src: `${import.meta.env.BASE_URL}voice-note-01.mp3`,
                  },
                  {
                    title: "VOICE NOTE 02",
                    text: "One more little memory in your voice.",
                    src: `${import.meta.env.BASE_URL}voice-note-02.mp3`,
                  },
                ].map((voice, index) => (
                  <div
                    className={`voice-card ${
                      voicePlayingIndex === index
                        ? "voice-card-playing"
                        : ""
                    }`}
                    key={voice.src}
                  >
                    <div className="voice-card-top">
                      <div className="voice-icon">
                        {voicePlayingIndex === index ? "◉" : "♫"}
                      </div>

                      <div className="voice-info">
                        <span>{voice.title}</span>
                        <strong>{voice.text}</strong>
                      </div>

                      <div className="voice-status">
                        {voicePlayingIndex === index
                          ? "PLAYING"
                          : "VOICE"}
                      </div>
                    </div>

                    <audio
                      ref={(element) => {
                        voiceAudioRefs.current[index] = element;
                      }}
                      className="voice-player"
                      controls
                      preload="metadata"
                      src={voice.src}
                      onPlay={() => handleVoicePlay(index)}
                      onPause={() => handleVoicePause(index)}
                      onEnded={() => handleVoiceEnded(index)}
                    >
                      Your browser does not support the audio player.
                    </audio>
                  </div>
                ))}
              </div>

              <div className="voice-note-footer">
                <span>♡</span>
                <p>
                  Background music pauses while a voice note plays and resumes when it stops.
                </p>
              </div>
            </div>
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
          EYES FULLSCREEN
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
            src={`${ASSET_BASE}portraits/portrait13.jpg`}
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
          PORTRAIT MODAL
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

      {/* --------------------------------
          ❤️ NE KORIKALU
      -------------------------------- */}
      {wishPage && (
        <section className="screen wish-screen">
          <div className="wish-page">

            <button
              className="wish-back"
              onClick={closeWishPage}
            >
              ← BACK
            </button>

            <div className="wish-content">
              <p className="wish-eyebrow">
                TELL ME YOUR HEART
              </p>

              <h1 className="wish-title">
                Ne Korikalu
              </h1>

              <div className="wish-line"></div>

              <p className="wish-subtitle">
                Nee heart lo unna korika edaina…
                ikkada naatho cheppu.
                <br />
                Maybe oka roju adi nijam cheddam. 🦋
              </p>

              <textarea
                className="wish-input"
                placeholder="Nee korika ikkada cheppu…"
                value={wish}
                onChange={(event) =>
                  setWish(event.target.value)
                }
              />

              <button
                className="wish-submit"
                onClick={submitWish}
                disabled={
                  !wish.trim() || wishSaving
                }
              >
                {wishSaving
                  ? "SAVING…"
                  : "SEND MY KORIKA ♡"}
              </button>

              {wishStatus && (
                <div className="wish-success-message">
                  <p className="wish-success-main">
                    {wishStatus}
                  </p>

                  {wishStatus.includes(
                    "safe ga undhi"
                  ) && (
                    <div className="wish-reassurance">
                      <strong>
                        Thappakunda, ee AI Panthulu nee
                        korikani neraverchadaniki try
                        chesthadu… 🦋❤️
                      </strong>

                      <p>
                        Inka emaina naatho cheppu
                        anipisthundha? 🥹❤️
                      </p>

                      <p>
                        Nee heart lo emaina unte, simple
                        ga naatho cheppu rah…
                        <br />
                        nuvvu cheppalanukunna prathi maata
                        vinadaniki nenu unna. 🫶🏻❤️
                      </p>

                      <p>
                        Emaina chinna korika aina,
                        pedda dream aina…
                        <br />
                        naatho share chesko. Nenu possible
                        ayinantha varaku nee kosam try
                        chestha. ❤️🦋
                      </p>
                    </div>
                  )}
                </div>
              )}

              <p className="wish-footer">
                Only your wish gets saved here. ♡
              </p>
            </div>
          </div>
        </section>
      )}

      {/* --------------------------------
          🎵 FAVOURITE SONGS
      -------------------------------- */}
      {songsPage && (
        <section className="screen songs-screen">
          <div className="songs-page">

            <button
              className="songs-back"
              onClick={closeSongsPage}
            >
              ← BACK
            </button>

            <div className="songs-content">
              <p className="songs-eyebrow">
                A LITTLE SOUNDTRACK OF YOU
              </p>

              <h1 className="songs-title">
                Your Favourite Songs
              </h1>

              <div className="songs-line"></div>

              <p className="songs-subtitle">
                Songs that remind me of you.
              </p>

              <div className="song-card">
                <div className="song-card-icon">
                  ♫
                </div>

                <div className="song-card-info">
                  <span>
                    YOUR SONG
                  </span>

                  <strong>
                    Krishnahazar - Divine.mp3.mp3
                  </strong>

                  <small>
                    Favourite Song
                  </small>
                </div>
              </div>

              <div className="song-player-wrap">
                <audio
                  ref={favouriteSongRef}
                  className="favourite-song-player"
                  controls
                  preload="metadata"
                  src={`${ASSET_BASE}Krishnahazar - Divine.mp3.mp3`}
                  onPlay={handleSongPlay}
                  onPause={handleSongPause}
                  onEnded={handleSongEnded}
                >
                  Your browser does not support the audio player.
                </audio>
              </div>

              <div className="song-note">
                <span>♡</span>
                <p>
                  Play this song here. The background music
                  pauses while your song plays and resumes
                  when it stops. ❤️
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* --------------------------------
          🎁 SURPRISE
      -------------------------------- */}
      {surprisePage && (
        <section className="screen surprise-screen">
          <div className="surprise-page">

            {surprisePhase === "countdown" && (
              <div className="surprise-countdown-wrap">
                <p className="surprise-eyebrow">
                  GET READY…
                </p>

                <div
                  className="surprise-countdown"
                  key={surpriseCountdown}
                >
                  {surpriseCountdown}
                </div>
              </div>
            )}

            {surprisePhase === "prank" && (
              <div className="surprise-prank-wrap">
                <p className="surprise-eyebrow">
                  WAIT…
                </p>

                <h1 className="surprise-prank-title">
                  SURPRISE LEDHU 😂
                </h1>
              </div>
            )}

            {surprisePhase === "messages" && (
              <div className="surprise-message-wrap">

                <p className="surprise-message-number">
                  {String(
                    surpriseMessageIndex + 1
                  ).padStart(2, "0")}{" "}
                  /{" "}
                  {String(
                    surpriseMessages.length
                  ).padStart(2, "0")}
                </p>

                <div className="surprise-message-card">
                  <p className="surprise-message-text">
                    {
                      surpriseMessages[
                        surpriseMessageIndex
                      ]
                    }
                  </p>
                </div>

                {surpriseMessageIndex <
                surpriseMessages.length - 1 ? (
                  <button
                    className="surprise-next-button"
                    onClick={nextSurpriseMessage}
                  >
                    NEXT <span>→</span>
                  </button>
                ) : (
                  <button
                    className="surprise-next-button"
                    onClick={closeSurprise}
                  >
                    BACK TO MY WORLD <span>→</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}

export default App;