import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  cn
} from "../chunk-WLSC6BOI.mjs";
import "../chunk-PMJAV4JJ.mjs";

// src/components/ui/popover.tsx
import "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { jsx } from "react/jsx-runtime";
function Popover({
  ...props
}) {
  return /* @__PURE__ */ jsx(PopoverPrimitive.Root, { "data-slot": "popover", ...props });
}
function PopoverTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(PopoverPrimitive.Trigger, { "data-slot": "popover-trigger", ...props });
}
function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    PopoverPrimitive.Content,
    {
      "data-slot": "popover-content",
      align,
      sideOffset,
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
        className
      ),
      ...props
    }
  ) });
}

// src/components/ui/slider.tsx
import * as React2 from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}) {
  const _values = React2.useMemo(
    () => Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max],
    [value, defaultValue, min, max]
  );
  return /* @__PURE__ */ jsxs(
    SliderPrimitive.Root,
    {
      "data-slot": "slider",
      defaultValue,
      value,
      min,
      max,
      className: cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx2(
          SliderPrimitive.Track,
          {
            "data-slot": "slider-track",
            className: cn(
              "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
            ),
            children: /* @__PURE__ */ jsx2(
              SliderPrimitive.Range,
              {
                "data-slot": "slider-range",
                className: cn(
                  "bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
                )
              }
            )
          }
        ),
        Array.from({ length: _values.length }, (_, index) => /* @__PURE__ */ jsx2(
          SliderPrimitive.Thumb,
          {
            "data-slot": "slider-thumb",
            className: "border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
          },
          index
        ))
      ]
    }
  );
}

// src/audio/playback/AudioPlayback.tsx
import {
  CircleX,
  Pause,
  Play,
  Redo,
  Undo,
  Volume2,
  VolumeX
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
function AudioPlayback({
  src,
  trackId,
  trackName,
  initialVolume = 1,
  initialPlaybackRate = 1,
  initialCurrentTime = 0,
  initialPlaying = false,
  className,
  closePlayer,
  onWavesurferReady
}) {
  const timelineRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(initialCurrentTime);
  const [wavesurferObj, setWavesurferObj] = useState();
  const [volume, setVolume] = useState(initialVolume);
  const [playing, setPlaying] = useState(initialPlaying);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(initialPlaybackRate);
  useEffect(() => {
    if (timelineRef.current && !wavesurferObj) {
      if (timelineRef.current) {
        timelineRef.current.innerHTML = "";
      }
      const ws = WaveSurfer.create({
        container: timelineRef.current,
        cursorColor: "oklch(0.769 0.188 70.08)",
        waveColor: "oklch(0.708 0 0)",
        progressColor: "oklch(0.769 0.188 70.08)",
        height: 32,
        normalize: true,
        fillParent: true
      });
      setWavesurferObj(ws);
    }
  }, [wavesurferObj]);
  useEffect(() => {
    if (src && wavesurferObj) {
      if (src.mode === "url") {
        if (src.externalAudioUrlFn) {
          wavesurferObj.load(src.externalAudioUrlFn(src.url));
        } else {
          wavesurferObj.load(src.url);
        }
      } else if (src.mode === "blob") {
        wavesurferObj.loadBlob(src.blob);
      }
    }
  }, [src, wavesurferObj]);
  useEffect(() => {
    if (wavesurferObj) {
      const handleReady = () => {
        setDuration(wavesurferObj.getDuration());
        updatePlaybackState({
          wavesurferObj,
          initialVolume,
          initialPlaybackRate,
          initialCurrentTime,
          initialPlaying
        });
      };
      const handlePlay = () => {
        setPlaying(true);
      };
      const handleFinish = () => {
        setPlaying(false);
      };
      const handleTimeUpdate = (currentTime2) => {
        setCurrentTime(currentTime2);
      };
      wavesurferObj.on("ready", handleReady);
      wavesurferObj.on("play", handlePlay);
      wavesurferObj.on("finish", handleFinish);
      wavesurferObj.on("timeupdate", handleTimeUpdate);
      if (onWavesurferReady) {
        onWavesurferReady(wavesurferObj);
      }
      return () => {
        wavesurferObj.destroy();
        setWavesurferObj(void 0);
      };
    }
  }, [
    wavesurferObj,
    onWavesurferReady,
    initialVolume,
    initialPlaybackRate,
    initialCurrentTime,
    initialPlaying
  ]);
  function updatePlaybackState({
    wavesurferObj: wavesurferObj2,
    initialVolume: initialVolume2,
    initialPlaybackRate: initialPlaybackRate2,
    initialCurrentTime: initialCurrentTime2,
    initialPlaying: initialPlaying2
  }) {
    wavesurferObj2.setVolume(initialVolume2);
    wavesurferObj2.setPlaybackRate(initialPlaybackRate2);
    wavesurferObj2.setTime(initialCurrentTime2);
    if (initialPlaying2) {
      wavesurferObj2.play();
      setPlaying(true);
    } else {
      wavesurferObj2.pause();
      setPlaying(false);
    }
  }
  function handlePlayPause() {
    if (!wavesurferObj) return;
    wavesurferObj.playPause();
    setPlaying(!playing);
  }
  function handleVolumeSlider(value) {
    if (!wavesurferObj) return;
    wavesurferObj.setVolume(value[0] / 100);
    setVolume(value[0] / 100);
  }
  function handleSpeedChange(newSpeed) {
    if (!wavesurferObj) return;
    wavesurferObj.setPlaybackRate(newSpeed);
    setPlaybackRate(newSpeed);
  }
  function handleSkip(direction) {
    if (!wavesurferObj || duration <= 0) return;
    const skipTime = direction === "forward" ? 10 : -10;
    const newTime = Math.max(0, Math.min(duration, currentTime + skipTime));
    wavesurferObj.setTime(newTime);
  }
  return /* @__PURE__ */ jsxs2(
    "div",
    {
      className: cn(
        "p-4 pt-2 sm:pt-4 w-full select-none flex gap-2 sm:flex-row flex-col min-w-[250px]",
        className
      ),
      children: [
        !!trackName && /* @__PURE__ */ jsxs2("div", { className: "flex flex-row items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsx3("p", { className: "text-sm text-center sm:text-left font-semibold text-ellipsis line-clamp-1 sm:line-clamp-2 min-w-[200px] sm:max-w-[150px] sm:min-w-[100px]", children: trackName }),
          !!closePlayer && /* @__PURE__ */ jsx3(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: () => closePlayer(),
              className: "cursor-pointer sm:hidden",
              children: /* @__PURE__ */ jsx3(CircleX, { className: "h-4 w-4 text-destructive" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-center space-x-2", children: [
          /* @__PURE__ */ jsx3(
            VolumeControl,
            {
              volume,
              handleVolumeSlider
            }
          ),
          /* @__PURE__ */ jsx3(
            Button,
            {
              variant: "outline",
              size: "icon",
              onClick: () => handleSkip("backward"),
              children: /* @__PURE__ */ jsx3(Undo, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsx3(Button, { variant: "default", size: "icon", onClick: handlePlayPause, children: playing ? /* @__PURE__ */ jsx3(Pause, { className: "h-6 w-6" }) : /* @__PURE__ */ jsx3(Play, { className: "h-6 w-6" }) }),
          /* @__PURE__ */ jsx3(
            Button,
            {
              variant: "outline",
              size: "icon",
              onClick: () => handleSkip("forward"),
              children: /* @__PURE__ */ jsx3(Redo, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsx3(
            SpeedControl,
            {
              playbackRate,
              handleSpeedChange
            }
          )
        ] }),
        /* @__PURE__ */ jsxs2("div", { className: "gap-2 flex flex-row w-full justify-center items-center text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsx3("div", { children: formatTime(currentTime) }),
          /* @__PURE__ */ jsx3("div", { ref: timelineRef, className: "w-full" }),
          /* @__PURE__ */ jsx3("div", { children: formatTime(duration) }),
          !!closePlayer && /* @__PURE__ */ jsx3(
            Button,
            {
              variant: "ghost",
              onClick: () => closePlayer(),
              className: "cursor-pointer hidden sm:block",
              children: /* @__PURE__ */ jsx3(CircleX, { className: "h-4 w-4 text-destructive" })
            }
          )
        ] })
      ]
    },
    trackId
  );
}
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
function VolumeControl({
  volume,
  handleVolumeSlider
}) {
  return /* @__PURE__ */ jsxs2(Popover, { children: [
    /* @__PURE__ */ jsx3(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsx3(Button, { variant: "outline", size: "icon", children: volume === 0 ? /* @__PURE__ */ jsx3(VolumeX, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx3(Volume2, { className: "h-4 w-4" }) }) }),
    /* @__PURE__ */ jsx3(PopoverContent, { className: "w-fit p-4", align: "end", children: /* @__PURE__ */ jsxs2("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx3("span", { className: "text-sm font-medium", children: "Volume" }),
      /* @__PURE__ */ jsx3(
        Slider,
        {
          value: [volume * 100],
          onValueChange: handleVolumeSlider,
          max: 100,
          step: 1,
          className: "w-full",
          orientation: "vertical"
        }
      )
    ] }) })
  ] });
}
function SpeedControl({
  playbackRate,
  handleSpeedChange
}) {
  return /* @__PURE__ */ jsxs2(Popover, { children: [
    /* @__PURE__ */ jsx3(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs2(Button, { variant: "outline", size: "icon", children: [
      playbackRate,
      "x"
    ] }) }),
    /* @__PURE__ */ jsx3(PopoverContent, { className: "w-fit p-4", align: "end", children: /* @__PURE__ */ jsxs2("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx3("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsx3("span", { className: "text-sm font-medium", children: "Speed" }) }),
      /* @__PURE__ */ jsx3("div", { className: "flex flex-col gap-2", children: speeds.map((speed) => /* @__PURE__ */ jsxs2(
        Button,
        {
          variant: playbackRate === speed ? "default" : "ghost",
          size: "sm",
          onClick: () => handleSpeedChange(speed),
          className: "text-xs",
          children: [
            speed,
            "x"
          ]
        },
        speed
      )) })
    ] }) })
  ] });
}

// src/audio/playback/AudioPlaybackWithBlob.tsx
import { Ellipsis } from "lucide-react";
import { useEffect as useEffect2, useMemo as useMemo2, useState as useState2 } from "react";
import "wavesurfer.js";
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
async function loadAudio(srcUrl) {
  const response = await fetch(srcUrl);
  const blob = await response.blob();
  return [URL.createObjectURL(blob), blob];
}
function AudioPlaybackWithBlob({
  src,
  externalAudioUrlFn,
  trackId,
  trackName,
  initialVolume,
  initialPlaybackRate,
  initialCurrentTime,
  initialPlaying,
  className,
  closePlayer,
  onWavesurferReady
}) {
  const srcUrl = useMemo2(
    () => externalAudioUrlFn ? externalAudioUrlFn(src) : src,
    [externalAudioUrlFn, src]
  );
  const [isLoading, setIsLoading] = useState2(false);
  const [error, setError] = useState2(null);
  const [audioBlob, setAudioBlob] = useState2(null);
  const [audioBlobUrl, setAudioBlobUrl] = useState2(null);
  useEffect2(() => {
    setIsLoading(true);
    setError(null);
    if (audioBlobUrl) {
      URL.revokeObjectURL(audioBlobUrl);
    }
    loadAudio(srcUrl).then((res) => {
      setAudioBlobUrl(res[0]);
      setAudioBlob(res[1]);
    }).catch((err) => {
      setError(err);
    }).finally(() => {
      setIsLoading(false);
    });
  }, [srcUrl]);
  useEffect2(() => {
    return () => {
      if (audioBlobUrl) {
        URL.revokeObjectURL(audioBlobUrl);
      }
    };
  }, [audioBlobUrl]);
  if (isLoading) {
    return /* @__PURE__ */ jsx4("div", { className: "flex flex-row justify-center", children: /* @__PURE__ */ jsx4(Ellipsis, { className: "h-4 w-4 animate-pulse" }) });
  }
  if (error) {
    return /* @__PURE__ */ jsxs3("div", { children: [
      "Error: ",
      error.message
    ] });
  }
  if (audioBlob && audioBlobUrl) {
    return /* @__PURE__ */ jsx4(
      AudioPlayback,
      {
        src: { mode: "blob", blob: audioBlob },
        trackId,
        trackName,
        initialVolume,
        initialPlaybackRate,
        initialCurrentTime,
        initialPlaying,
        className,
        closePlayer,
        onWavesurferReady
      }
    );
  }
  return /* @__PURE__ */ jsx4("div", { children: "No audio source found" });
}

// src/audio/playback/GlobalPlayer.tsx
import "wavesurfer.js";
import { jsx as jsx5 } from "react/jsx-runtime";
function GlobalPlayer({
  className,
  externalAudioUrlFn,
  playerState,
  onClose,
  onWavesurferReady
}) {
  return /* @__PURE__ */ jsx5(
    "div",
    {
      className: cn(
        "fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-lg",
        className
      ),
      children: /* @__PURE__ */ jsx5("div", { className: "w-full", children: /* @__PURE__ */ jsx5(
        AudioPlaybackWithBlob,
        {
          src: playerState.src,
          externalAudioUrlFn,
          trackName: playerState.trackName,
          initialVolume: playerState.volume,
          initialPlaybackRate: playerState.playbackRate,
          initialCurrentTime: playerState.currentTime,
          initialPlaying: false,
          closePlayer: onClose,
          onWavesurferReady
        }
      ) })
    }
  );
}

// src/audio/playback/GlobalPlayerProvider.tsx
import { useCallback, useEffect as useEffect3, useRef as useRef2, useState as useState3 } from "react";
import { toast } from "sonner";
import "wavesurfer.js";

// src/audio/playback/GlobalPlayerContext.tsx
import { createContext } from "react";
var GlobalPlayerContext = createContext(null);

// src/audio/playback/GlobalPlayerProvider.tsx
import { jsx as jsx6, jsxs as jsxs4 } from "react/jsx-runtime";
var GLOBAL_PLAYER_STORAGE_KEY = "global-audio-player";
function GlobalPlayerProvider({
  children,
  externalAudioUrlFn
}) {
  const wavesurferRef = useRef2(null);
  const loadInitialState = () => {
    try {
      const stored = localStorage.getItem(GLOBAL_PLAYER_STORAGE_KEY);
      if (stored) {
        const state = JSON.parse(stored);
        const isRecent = Date.now() - state.timestamp < 24 * 60 * 60 * 1e3;
        if (isRecent) return state;
        localStorage.removeItem(GLOBAL_PLAYER_STORAGE_KEY);
      }
    } catch (err) {
      console.error("Failed to load global player state:", err);
      localStorage.removeItem(GLOBAL_PLAYER_STORAGE_KEY);
      toast.error("Failed to load saved player state");
    }
    return null;
  };
  const initialStored = loadInitialState();
  const [storedPlayerState, setStoredPlayerState] = useState3(initialStored);
  const storedPlayerStateRef = useRef2(initialStored);
  const [isVisible, setIsVisible] = useState3(
    () => initialStored != null
  );
  const updateStoredState = useCallback((next) => {
    storedPlayerStateRef.current = next;
    setStoredPlayerState(next);
  }, []);
  useEffect3(() => {
    const wsRef = wavesurferRef;
    if (!wsRef) return;
    const interval = setInterval(() => {
      try {
        const currentStored = storedPlayerStateRef.current;
        if (!currentStored) return;
        const ws = wsRef.current;
        if (!ws) return;
        if (!ws.isPlaying()) return;
        const currentTime = ws.getCurrentTime();
        const volume = ws.getVolume();
        const playbackRate = ws.getPlaybackRate();
        const updatedState = {
          ...currentStored,
          currentTime,
          volume,
          playbackRate,
          timestamp: Date.now()
        };
        localStorage.setItem(
          GLOBAL_PLAYER_STORAGE_KEY,
          JSON.stringify(updatedState)
        );
      } catch (err) {
        console.error("Failed to save global player state:", err);
        toast.error("Failed to save player state");
      }
    }, 3e3);
    return () => clearInterval(interval);
  }, [wavesurferRef]);
  const addToGlobalPlayer = useCallback(
    (src, trackName) => {
      const newState = {
        src,
        trackName,
        currentTime: 0,
        volume: 1,
        playbackRate: 1,
        timestamp: Date.now()
      };
      updateStoredState(newState);
      setIsVisible(true);
      try {
        localStorage.setItem(
          GLOBAL_PLAYER_STORAGE_KEY,
          JSON.stringify(newState)
        );
        toast.success("Added. Press the play button to play.");
      } catch (err) {
        console.error("Failed to save global player state:", err);
        toast.error("Failed to save player state");
      }
    },
    [updateStoredState]
  );
  const handleWavesurferReady = useCallback((wavesurfer) => {
    wavesurferRef.current = wavesurfer;
  }, []);
  const handleClose = useCallback(() => {
    setIsVisible(false);
    updateStoredState(null);
    wavesurferRef.current = null;
    localStorage.removeItem(GLOBAL_PLAYER_STORAGE_KEY);
  }, [updateStoredState]);
  return /* @__PURE__ */ jsxs4(
    GlobalPlayerContext.Provider,
    {
      value: { addToGlobalPlayer, isGlobalPlayerVisible: isVisible },
      children: [
        children,
        isVisible && storedPlayerState && /* @__PURE__ */ jsx6(
          GlobalPlayer,
          {
            externalAudioUrlFn,
            playerState: storedPlayerState,
            onClose: handleClose,
            onWavesurferReady: handleWavesurferReady
          }
        )
      ]
    }
  );
}

// src/audio/playback/useGlobalPlayer.ts
import { useContext } from "react";
function useGlobalPlayer() {
  const context = useContext(GlobalPlayerContext);
  if (!context) {
    throw new Error(
      "useGlobalPlayer must be used within a GlobalPlayerProvider"
    );
  }
  return context;
}

// src/audio/uploader/single-audio/CropTestComponent.tsx
import {
  Crop,
  Pause as Pause2,
  Play as Play2,
  RotateCcw,
  Volume2 as Volume22,
  VolumeX as VolumeX2,
  ZoomIn,
  ZoomOut
} from "lucide-react";
import { useEffect as useEffect4, useRef as useRef3, useState as useState4 } from "react";
import WaveSurfer5 from "wavesurfer.js";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.esm.js";
import TimelinePlugin from "wavesurfer.js/dist/plugins/timeline.esm.js";
import { jsx as jsx7, jsxs as jsxs5 } from "react/jsx-runtime";
var regions = RegionsPlugin.create();
function audioBufferToWav(buffer) {
  const length = buffer.length;
  const numberOfChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const bytesPerSample = 2;
  const blockAlign = numberOfChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = length * blockAlign;
  const bufferSize = 44 + dataSize;
  const arrayBuffer = new ArrayBuffer(bufferSize);
  const view = new DataView(arrayBuffer);
  const writeString = (offset2, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset2 + i, string.charCodeAt(i));
    }
  };
  writeString(0, "RIFF");
  view.setUint32(4, bufferSize - 8, true);
  writeString(8, "WAVE");
  writeString(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numberOfChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, 16, true);
  writeString(36, "data");
  view.setUint32(40, dataSize, true);
  let offset = 44;
  for (let i = 0; i < length; i++) {
    for (let channel = 0; channel < numberOfChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      let sample = Math.max(-1, Math.min(1, channelData[i]));
      sample = sample < 0 ? sample * 32768 : sample * 32767;
      view.setInt16(offset, sample, true);
      offset += 2;
    }
  }
  return new Blob([arrayBuffer], { type: "audio/wav" });
}
function CropTestComponent({
  src,
  className,
  onTrim
}) {
  const timelineRef = useRef3(null);
  const timestampsRef = useRef3(null);
  const [wavesurferObj, setWavesurferObj] = useState4();
  const [volume, setVolume] = useState4(1);
  const [playing, setPlaying] = useState4(false);
  const [zoom, setZoom] = useState4(1);
  const [duration, setDuration] = useState4(0);
  useEffect4(() => {
    if (timelineRef.current && timestampsRef.current && !wavesurferObj) {
      if (timelineRef.current) {
        timelineRef.current.innerHTML = "";
      }
      const ws = WaveSurfer5.create({
        container: timelineRef.current,
        cursorColor: "oklch(0.769 0.188 70.08)",
        waveColor: "oklch(0.708 0 0)",
        progressColor: "oklch(0.769 0.188 70.08)",
        height: 32,
        normalize: true,
        fillParent: true,
        plugins: [
          TimelinePlugin.create({
            container: timestampsRef.current
          }),
          regions
        ]
      });
      setWavesurferObj(ws);
    }
  }, [wavesurferObj]);
  useEffect4(() => {
    if (src && wavesurferObj) {
      if (src.mode === "url") {
        if (src.externalAudioUrlFn) {
          wavesurferObj.load(src.externalAudioUrlFn(src.url));
        } else {
          wavesurferObj.load(src.url);
        }
      } else if (src.mode === "blob") {
        wavesurferObj.loadBlob(src.blob);
      }
    }
  }, [src, wavesurferObj]);
  useEffect4(() => {
    if (wavesurferObj) {
      const handleReady = () => {
        regions.enableDragSelection({});
        setDuration(Math.floor(wavesurferObj.getDuration()));
      };
      const handlePlay = () => {
        setPlaying(true);
      };
      const handleFinish = () => {
        setPlaying(false);
      };
      regions.on("region-created", () => {
        const regionList = regions.getRegions();
        const keys = Object.keys(regionList);
        while (keys.length > 1) {
          const firstKey = keys[0];
          regionList[firstKey].remove();
          keys.shift();
        }
      });
      regions.on("region-updated", () => {
        const regionList = regions.getRegions();
        const keys = Object.keys(regionList);
        while (keys.length > 1) {
          const firstKey = keys[0];
          regionList[firstKey].remove();
          keys.shift();
        }
      });
      wavesurferObj.on("ready", handleReady);
      wavesurferObj.on("play", handlePlay);
      wavesurferObj.on("finish", handleFinish);
      return () => {
        wavesurferObj.destroy();
        setWavesurferObj(void 0);
      };
    }
  }, [wavesurferObj]);
  useEffect4(() => {
    if (duration && wavesurferObj) {
      regions.addRegion({
        start: Math.floor(duration / 2) - Math.floor(duration) / 5,
        end: Math.floor(duration / 2),
        color: "hsla(265, 100%, 86%, 0.4)"
      });
    }
  }, [duration, wavesurferObj]);
  function handlePlayPause() {
    if (!wavesurferObj) return;
    wavesurferObj.playPause();
    setPlaying(!playing);
  }
  function handleReload() {
    if (!wavesurferObj) return;
    wavesurferObj.stop();
    wavesurferObj.play();
    setPlaying(true);
  }
  function handleVolumeSlider(value) {
    if (!wavesurferObj) return;
    wavesurferObj.setVolume(value[0] / 100);
    setVolume(value[0] / 100);
  }
  function handleZoomSlider(value) {
    if (!wavesurferObj) return;
    wavesurferObj.zoom(value[0]);
    setZoom(value[0]);
  }
  function handleTrim() {
    if (!wavesurferObj) return;
    const regionList = regions.getRegions();
    const regionKeys = Object.keys(regionList);
    if (regionKeys.length === 0) return;
    const firstKey = regionKeys[0];
    const region = regionList[firstKey];
    if (!region) return;
    const original_buffer = wavesurferObj.getDecodedData();
    if (!original_buffer) {
      return;
    }
    const numberOfChannels = original_buffer.numberOfChannels;
    const channel1 = original_buffer.getChannelData(0);
    const channel2 = numberOfChannels > 1 ? original_buffer.getChannelData(1) : null;
    if (!channel1) {
      return;
    }
    const start = region.start;
    const end = region.end;
    const sampleRate = original_buffer.sampleRate;
    const startIndex = Math.max(
      0,
      Math.min(original_buffer.length, Math.floor(start * sampleRate))
    );
    const endIndex = Math.max(
      0,
      Math.min(original_buffer.length, Math.floor(end * sampleRate))
    );
    if (endIndex <= startIndex) {
      return;
    }
    const newLength = endIndex - startIndex;
    const newDuration = newLength / sampleRate;
    const trimmedChannel1 = new Float32Array(newLength);
    const trimmedChannel2 = numberOfChannels > 1 ? new Float32Array(newLength) : null;
    trimmedChannel1.set(channel1.subarray(startIndex, endIndex));
    if (channel2 && trimmedChannel2) {
      trimmedChannel2.set(channel2.subarray(startIndex, endIndex));
    }
    const channelData = [trimmedChannel1];
    if (trimmedChannel2) {
      channelData.push(trimmedChannel2);
    }
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContextClass();
    const trimmedBuffer = audioContext.createBuffer(
      numberOfChannels,
      newLength,
      sampleRate
    );
    for (let channel = 0; channel < numberOfChannels; channel++) {
      const channelData2 = channel === 0 ? trimmedChannel1 : trimmedChannel2;
      if (channelData2) {
        trimmedBuffer.getChannelData(channel).set(channelData2);
      }
    }
    const trimmedBlob = audioBufferToWav(trimmedBuffer);
    if (onTrim) {
      onTrim(trimmedBlob);
    }
    wavesurferObj.load("", channelData, newDuration);
  }
  return /* @__PURE__ */ jsxs5(
    "div",
    {
      className: cn(
        "p-4 pt-2 sm:pt-4 w-full select-none flex gap-2 sm:flex-row flex-col min-w-[250px]",
        className
      ),
      children: [
        /* @__PURE__ */ jsxs5("div", { className: "flex items-center justify-center space-x-2", children: [
          /* @__PURE__ */ jsx7(
            VolumeControl2,
            {
              volume,
              handleVolumeSlider
            }
          ),
          /* @__PURE__ */ jsx7(
            Button,
            {
              variant: "outline",
              size: "icon",
              onClick: () => setZoom(zoom - 0.1),
              children: /* @__PURE__ */ jsx7(ZoomOut, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsx7(Button, { variant: "default", size: "icon", onClick: handlePlayPause, children: playing ? /* @__PURE__ */ jsx7(Pause2, { className: "h-6 w-6" }) : /* @__PURE__ */ jsx7(Play2, { className: "h-6 w-6" }) }),
          /* @__PURE__ */ jsx7(
            Button,
            {
              variant: "outline",
              size: "icon",
              onClick: () => setZoom(zoom + 0.1),
              children: /* @__PURE__ */ jsx7(ZoomIn, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsx7(SetZoom, { zoom, handleZoomChange: handleZoomSlider }),
          /* @__PURE__ */ jsx7(Button, { variant: "default", size: "icon", onClick: handleReload, children: /* @__PURE__ */ jsx7(RotateCcw, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsx7(Button, { variant: "default", size: "icon", onClick: handleTrim, children: /* @__PURE__ */ jsx7(Crop, { className: "h-4 w-4" }) })
        ] }),
        /* @__PURE__ */ jsxs5("div", { className: "gap-2 flex flex-row w-full justify-center items-center text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsx7("div", { ref: timelineRef, className: "w-full" }),
          /* @__PURE__ */ jsx7("div", { ref: timestampsRef, className: "w-full" })
        ] })
      ]
    }
  );
}
function VolumeControl2({
  volume,
  handleVolumeSlider
}) {
  return /* @__PURE__ */ jsxs5(Popover, { children: [
    /* @__PURE__ */ jsx7(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsx7(Button, { variant: "outline", size: "icon", children: volume === 0 ? /* @__PURE__ */ jsx7(VolumeX2, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx7(Volume22, { className: "h-4 w-4" }) }) }),
    /* @__PURE__ */ jsx7(PopoverContent, { className: "w-fit p-4", align: "end", children: /* @__PURE__ */ jsxs5("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx7("span", { className: "text-sm font-medium", children: "Volume" }),
      /* @__PURE__ */ jsx7(
        Slider,
        {
          value: [volume * 100],
          onValueChange: handleVolumeSlider,
          max: 100,
          step: 1,
          className: "w-full",
          orientation: "vertical"
        }
      )
    ] }) })
  ] });
}
function SetZoom({
  zoom,
  handleZoomChange
}) {
  return /* @__PURE__ */ jsxs5(Popover, { children: [
    /* @__PURE__ */ jsx7(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsx7(Button, { variant: "outline", size: "icon", children: /* @__PURE__ */ jsx7(ZoomOut, { className: "h-4 w-4" }) }) }),
    /* @__PURE__ */ jsx7(PopoverContent, { className: "w-fit p-4", align: "end", children: /* @__PURE__ */ jsxs5("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx7("span", { className: "text-sm font-medium", children: "Zoom" }),
      /* @__PURE__ */ jsx7(
        Slider,
        {
          value: [zoom],
          onValueChange: handleZoomChange,
          max: 1e3,
          min: 1,
          step: 50,
          className: "w-full",
          orientation: "vertical"
        }
      )
    ] }) })
  ] });
}

// src/audio/uploader/single-audio/CropTestComponentWithBlob.tsx
import { Ellipsis as Ellipsis2 } from "lucide-react";
import { useEffect as useEffect5, useMemo as useMemo3, useState as useState5 } from "react";
import { jsx as jsx8, jsxs as jsxs6 } from "react/jsx-runtime";
async function loadAudio2(srcUrl) {
  const response = await fetch(srcUrl);
  const blob = await response.blob();
  return [URL.createObjectURL(blob), blob];
}
function CropTestComponentWithBlob({
  src,
  externalAudioUrlFn
}) {
  const handleTrim = (trimmedBlob) => {
    setAudioBlob(trimmedBlob);
    setAudioBlobUrl(URL.createObjectURL(trimmedBlob));
    setIsLoading(false);
    setError(null);
  };
  const srcUrl = useMemo3(
    () => externalAudioUrlFn ? externalAudioUrlFn(src) : src,
    [externalAudioUrlFn, src]
  );
  const [isLoading, setIsLoading] = useState5(false);
  const [error, setError] = useState5(null);
  const [audioBlob, setAudioBlob] = useState5(null);
  const [audioBlobUrl, setAudioBlobUrl] = useState5(null);
  useEffect5(() => {
    setIsLoading(true);
    setError(null);
    if (audioBlobUrl) {
      URL.revokeObjectURL(audioBlobUrl);
    }
    loadAudio2(srcUrl).then((res) => {
      setAudioBlobUrl(res[0]);
      setAudioBlob(res[1]);
    }).catch((err) => {
      setError(err);
    }).finally(() => {
      setIsLoading(false);
    });
  }, [srcUrl]);
  useEffect5(() => {
    return () => {
      if (audioBlobUrl) {
        URL.revokeObjectURL(audioBlobUrl);
      }
    };
  }, [audioBlobUrl]);
  if (isLoading) {
    return /* @__PURE__ */ jsx8("div", { className: "flex flex-row justify-center", children: /* @__PURE__ */ jsx8(Ellipsis2, { className: "h-4 w-4 animate-pulse" }) });
  }
  if (error) {
    return /* @__PURE__ */ jsxs6("div", { children: [
      "Error: ",
      error.message
    ] });
  }
  if (audioBlob && audioBlobUrl) {
    return /* @__PURE__ */ jsx8(
      CropTestComponent,
      {
        src: { mode: "blob", blob: audioBlob },
        onTrim: handleTrim
      }
    );
  }
  return /* @__PURE__ */ jsx8("div", { children: "No audio source found" });
}

// src/audio/uploader/single-audio/SingleAudioUploader.tsx
import { SingleFileUploaderHeadless } from "@battlemagedotapp/convex-upload-helpers";
import { ExternalLink, LoaderCircle, Music, Trash } from "lucide-react";

// src/audio/uploader/ConfirmAlertDialog.tsx
import "react";
import { jsx as jsx9, jsxs as jsxs7 } from "react/jsx-runtime";
function ConfirmAlertDialog({
  title = "Are you sure?",
  description = "This action cannot be undone.",
  trigger,
  onConfirm,
  confirmLabel = "Continue",
  cancelLabel = "Cancel"
}) {
  return /* @__PURE__ */ jsxs7(AlertDialog, { children: [
    trigger ? typeof trigger === "function" ? /* @__PURE__ */ jsx9(AlertDialogTrigger, { asChild: true, children: trigger({}) }) : /* @__PURE__ */ jsx9(AlertDialogTrigger, { asChild: true, children: trigger }) : null,
    /* @__PURE__ */ jsxs7(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxs7(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsx9(AlertDialogTitle, { children: title }),
        /* @__PURE__ */ jsx9(AlertDialogDescription, { children: description })
      ] }),
      /* @__PURE__ */ jsxs7(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsx9(AlertDialogCancel, { children: cancelLabel }),
        /* @__PURE__ */ jsx9(AlertDialogAction, { onClick: onConfirm, children: confirmLabel })
      ] })
    ] })
  ] });
}
var ConfirmAlertDialog_default = ConfirmAlertDialog;

// src/audio/uploader/single-audio/SingleAudioUploader.tsx
import { jsx as jsx10, jsxs as jsxs8 } from "react/jsx-runtime";
function SingleAudioUploader({
  file,
  setFile,
  removeFile,
  maxSizeInMB,
  allowedTypes = [],
  successMessage = "Audio file uploaded successfully!",
  errorMessage = "Failed to upload audio file",
  className,
  externalAudioUrlFn,
  closePlayer
}) {
  const { addToGlobalPlayer } = useGlobalPlayer();
  return /* @__PURE__ */ jsx10(
    SingleFileUploaderHeadless,
    {
      file,
      setFile,
      removeFile,
      maxSizeInMB,
      allowedTypes,
      successMessage,
      errorMessage,
      children: ({ isUploading, triggerFileSelect, handleFileDelete, hasFile }) => /* @__PURE__ */ jsxs8("div", { className: cn("relative", className), children: [
        !hasFile && /* @__PURE__ */ jsxs8(
          Button,
          {
            disabled: isUploading,
            variant: "default",
            size: "default",
            className: "w-fit",
            onClick: triggerFileSelect,
            children: [
              isUploading ? /* @__PURE__ */ jsx10(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx10(Music, { className: "h-4 w-4" }),
              isUploading ? "Uploading..." : "Add audio"
            ]
          }
        ),
        file && /* @__PURE__ */ jsxs8("div", { className: "relative p-4 w-full min-w-[332px] flex flex-col items-center gap-2", children: [
          /* @__PURE__ */ jsx10(
            AudioPlaybackWithBlob,
            {
              src: file,
              externalAudioUrlFn,
              closePlayer
            }
          ),
          /* @__PURE__ */ jsxs8(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              className: "cursor-pointer",
              onClick: () => addToGlobalPlayer(file, "Uploaded Audio"),
              title: "Open in global player",
              children: [
                /* @__PURE__ */ jsx10(ExternalLink, { className: "h-4 w-4" }),
                "Open in player"
              ]
            }
          ),
          /* @__PURE__ */ jsx10("div", { className: "absolute top-0 right-0 flex gap-1", children: /* @__PURE__ */ jsx10(
            ConfirmAlertDialog_default,
            {
              trigger: (props) => /* @__PURE__ */ jsx10(
                Button,
                {
                  ...props,
                  type: "button",
                  variant: "secondary",
                  size: "icon",
                  className: "cursor-pointer hover:bg-destructive hover:text-destructive-foreground",
                  children: /* @__PURE__ */ jsx10(Trash, { className: "h-4 w-4" })
                }
              ),
              title: "Delete audio",
              description: "Are you sure you want to delete this audio file? This action cannot be undone.",
              confirmLabel: "Delete",
              cancelLabel: "Cancel",
              onConfirm: handleFileDelete
            }
          ) })
        ] })
      ] })
    }
  );
}
export {
  AudioPlayback,
  AudioPlaybackWithBlob,
  CropTestComponent,
  CropTestComponentWithBlob,
  GlobalPlayer,
  GlobalPlayerProvider,
  SingleAudioUploader,
  useGlobalPlayer
};
//# sourceMappingURL=index.mjs.map