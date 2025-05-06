import React, { useRef, useState, useEffect } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

interface MusicPlayerProps {
  videoId: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ videoId }) => {
  const playerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(true); // Stav přehrávání
  const [volume, setVolume] = useState(50); // Výchozí hlasitost (0–100)

  useEffect(() => {
    // Dynamicky načteme YouTube IFrame Player API
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    if (firstScriptTag?.parentNode) {
      firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
    }

    // Inicializace YouTube Player
    const onYouTubeIframeAPIReady = () => {
      playerRef.current = new (window as any).YT.Player("player", {
        videoId,
        events: {
          onReady: onPlayerReady,
        },
        playerVars: {
          autoplay: 1,
          loop: 1,
          playlist: videoId,
          enablejsapi: 1,
        },
      });
    };

    (window as any).onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

    // Zachytíme stisk kláves
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        toggleMusic(); // Mezerník pro play/pause
        event.preventDefault();
      } else if (event.code === "ArrowUp") {
        event.preventDefault(); // Zabránit výchozímu posunutí
        changeVolume(10); // Šipka nahoru pro zvýšení hlasitosti
      } else if (event.code === "ArrowDown") {
        event.preventDefault(); // Zabránit výchozímu posunutí
        changeVolume(-10); // Šipka dolů pro snížení hlasitosti
      }
    };

    // Přidáme event listener na `window`
    window.addEventListener("keydown", handleKeyDown);

    // Vyčištění listeneru při unmountu
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  const onPlayerReady = () => {
    if (playerRef.current) {
      playerRef.current.setVolume(volume); // Nastavení výchozí hlasitosti
    }
  };

  const toggleMusic = () => {
    if (playerRef.current) {
      const playerState = playerRef.current.getPlayerState();
      // Stav YouTube hráče: 1 = Přehrávání, 2 = Pauza
      if (playerState === 1) {
        playerRef.current.pauseVideo();
        setIsPlaying(false); // Synchronizovat s React stavem
      } else {
        playerRef.current.playVideo();
        setIsPlaying(true); // Synchronizovat s React stavem
      }
    }
  };

  const changeVolume = (delta: number) => {
    if (playerRef.current) {
      // Požádat YouTube o aktuální hlasitost
      const currentVolume = playerRef.current.getVolume(); // Získat současnou hlasitost z přehrávače (namísto použití stavu Reactu)

      // Počítat novou hlasitost
      const newVolume = Math.max(0, Math.min(100, currentVolume + delta)); // Omezit na rozsah 0–100

      // Nastavit novou hlasitost
      playerRef.current.setVolume(newVolume); // Nastavení nové hlasitosti v přehrávači YouTube

      // Aktualizace React stavu pro zobrazení
      setVolume(newVolume);
    }
  };

  return (
    <>
      <div id="player" style={{ display: "none" }}></div>

      {/* HUD v pravém spodním rohu */}
      <div
        style={{
          position: "fixed",
          bottom: 80,
          right: 40,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          padding: "10px",
          borderRadius: "8px",
        }}
        className="text-white flex flex-col items-end gap-4"
      >
        {/* Hudební ovládání */}
        <div
          className="music-control flex items-center gap-2 cursor-pointer whitespace-nowrap text-center"
          onClick={toggleMusic}
          style={{
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isPlaying ? (
            <>
              STISKNI <span className="mezernik">MEZERNÍK</span> PRO ZASTAVENÍ HUDBY
            </>
          ) : (
            <>
              STISKNI <span className="mezernik">MEZERNÍK</span> PRO ZAPNUTÍ HUDBY
            </>
          )}
        </div>

        {/* Ovládání hlasitosti */}
        <div className="volume-controls flex items-center gap-4">
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => changeVolume(10)}
          >
            <ArrowUp className="text-[#8f0c45]" size={20} />
            <span className="text-sm text-white">HLASITOST NAHORU</span>
          </div>
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => changeVolume(-10)}
          >
            <ArrowDown className="text-[#8f0c45]" size={20} />
            <span className="text-sm text-white">HLASITOST DOLŮ</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MusicPlayer;
