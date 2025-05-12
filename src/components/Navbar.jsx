import { useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect } from "react";
import { useWindowScroll } from "react-use";
import gsap from "gsap";

const navItem = ["Nexus", "The Vault", "Prologue", "About", "Contact"];

const Navbar = () => {
  const navRef = useRef(null);
  const audioElRef = useRef(null);
  const [isAudioPlaying, setisAudioPlaying] = useState(true);
  const [isIndicatorActive, setisIndicatorActive] = useState(true);
  const [lastScrollY, setlastScrollY] = useState(0);
  const [isNavVisible, setisNavVisible] = useState(true);
  const toggleAudio = () => {
    setisAudioPlaying((prev) => !prev);
    setisIndicatorActive((prev) => !prev);
  };

  const { y: currScrollY } = useWindowScroll();

  useEffect(() => {
    if (currScrollY === 0) {
      setisNavVisible(true);
      navRef.current.classList.remove("floating-nav");
    } else if (currScrollY > lastScrollY) {
      setisNavVisible(false);
      navRef.current.classList.add("floating-nav");
    } else if (currScrollY < lastScrollY) {
      setisNavVisible(true);
      navRef.current.classList.add("floating-nav");
    }

    setlastScrollY(currScrollY);
  }, [currScrollY, lastScrollY]);



  useEffect(() => {
    if (isAudioPlaying) {
      audioElRef.current.play();
    } else {
      audioElRef.current.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    gsap.to(navRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.3,
      ease: "power1.out",
    });
  }, [isNavVisible]);
  return (
    <div
      ref={navRef}
      className="fixed inset-x-0
  top-4 z-50 h-16 border-none transition-all
  duration-700 sm:inset-x-6"
    >
      <header
        className="absolute top-1/2 w-full
    -translate-y-1/2"
      >
        <nav
          className="flex size-full items-center justify-between
        p-4"
        >
          <div className="flex items-center gap-7">
            <img src="/img/logo.png" alt="logo" className="w-10" />

            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center
               justify-center gap-1"
            />
          </div>
          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItem.map((menu, index) => (
                <a
                  key={index}
                  href={`#${menu.toLowerCase()}`}
                  className="nav-hover-btn"
                >
                  {menu}
                </a>
              ))}
            </div>

            <button
              className="ml-10 flex items-center space-x-0.5"
              onClick={toggleAudio}
            >
              <audio
                ref={audioElRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
                autoPlay
              />
              {[1, 2, 3, 4].map((val) => (
                <div
                  key={val}
                  className={`indicator-line
                  ${isIndicatorActive ? "active" : ""}`}
                  style={{
                    animationDelay: `${val * 0.1}s`,
                  }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
