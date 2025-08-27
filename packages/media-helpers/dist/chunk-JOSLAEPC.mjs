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
} from "./chunk-QQHSLCS3.mjs";

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
  externalAudioUrlFn,
  trackId,
  trackName,
  initialVolume = 1,
  initialPlaybackRate = 1,
  initialCurrentTime = 0,
  initialPlaying = false,
  className,
  closePlayer
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
        if (externalAudioUrlFn) {
          wavesurferObj.load(externalAudioUrlFn(src.url));
        } else {
          wavesurferObj.load(src.url);
        }
      } else if (src.mode === "blob") {
        wavesurferObj.loadBlob(src.blob);
      }
      updatePlaybackState({
        wavesurferObj,
        initialVolume,
        initialPlaybackRate,
        initialCurrentTime,
        initialPlaying
      });
    }
  }, [
    src,
    wavesurferObj,
    externalAudioUrlFn,
    initialVolume,
    initialPlaybackRate,
    initialCurrentTime,
    initialPlaying
  ]);
  useEffect(() => {
    if (wavesurferObj) {
      const handleReady = () => {
        wavesurferObj.pause();
        setDuration(wavesurferObj.getDuration());
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
      return () => {
        wavesurferObj.destroy();
        setWavesurferObj(void 0);
      };
    }
  }, [wavesurferObj]);
  useEffect(() => {
    if (wavesurferObj) wavesurferObj.setVolume(volume);
  }, [volume, wavesurferObj]);
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
    wavesurferObj?.playPause();
    setPlaying(!playing);
  }
  function handleVolumeSlider(value) {
    setVolume(value[0] / 100);
  }
  function handleSpeedChange(newSpeed) {
    if (wavesurferObj) {
      wavesurferObj.setPlaybackRate(newSpeed);
      setPlaybackRate(newSpeed);
    }
  }
  function handleSkip(direction) {
    if (wavesurferObj && duration > 0) {
      const skipTime = direction === "forward" ? 10 : -10;
      const newTime = Math.max(0, Math.min(duration, currentTime + skipTime));
      wavesurferObj.setTime(newTime);
    }
  }
  return /* @__PURE__ */ jsxs2(
    "div",
    {
      className: cn(
        "p-4 pt-2 sm:pt-4 select-none flex gap-2 sm:flex-row flex-col min-w-[250px]",
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
              size: "icon",
              onClick: () => closePlayer(),
              className: "cursor-pointer hidden sm:block ml-2",
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
import { useEffect as useEffect2, useMemo as useMemo2, useState as useState2 } from "react";
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
  closePlayer
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
    return /* @__PURE__ */ jsx4("div", { children: "Loading..." });
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
        closePlayer
      }
    );
  }
  return /* @__PURE__ */ jsx4("div", { children: "No audio source found" });
}

// src/audio/playback/GlobalPlayer.tsx
import { useEffect as useEffect3, useState as useState3 } from "react";
import { toast } from "sonner";

// src/audio/playback/GlobalPlayerContext.tsx
import { createContext } from "react";
var GlobalPlayerContext = createContext(null);

// src/audio/playback/GlobalPlayer.tsx
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
var GLOBAL_PLAYER_STORAGE_KEY = "global-audio-player";
function GlobalPlayerComponent({
  className,
  externalAudioUrlFn,
  playerState,
  onClose
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
          closePlayer: onClose
        }
      ) })
    }
  );
}
function GlobalPlayerProvider({
  children,
  externalAudioUrlFn
}) {
  const [globalPlayerState, setGlobalPlayerState] = useState3(null);
  const [isVisible, setIsVisible] = useState3(false);
  useEffect3(() => {
    try {
      const stored = localStorage.getItem(GLOBAL_PLAYER_STORAGE_KEY);
      if (stored) {
        const state = JSON.parse(stored);
        const isRecent = Date.now() - state.timestamp < 24 * 60 * 60 * 1e3;
        if (isRecent) {
          setGlobalPlayerState(state);
          setIsVisible(true);
        } else {
          localStorage.removeItem(GLOBAL_PLAYER_STORAGE_KEY);
        }
      }
    } catch (err) {
      console.error("Failed to load global player state:", err);
      localStorage.removeItem(GLOBAL_PLAYER_STORAGE_KEY);
      toast.error("Failed to load saved player state");
    }
  }, []);
  useEffect3(() => {
    if (!globalPlayerState) return;
    const interval = setInterval(() => {
      try {
        const updatedState = {
          ...globalPlayerState,
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
    }, 1e3);
    return () => clearInterval(interval);
  }, [globalPlayerState]);
  const addToGlobalPlayer = (src, trackName) => {
    const newState = {
      src,
      trackName,
      currentTime: 0,
      volume: 1,
      playbackRate: 1,
      timestamp: Date.now()
    };
    setGlobalPlayerState(newState);
    setIsVisible(true);
    try {
      localStorage.setItem(GLOBAL_PLAYER_STORAGE_KEY, JSON.stringify(newState));
    } catch (err) {
      console.error("Failed to save global player state:", err);
      toast.error("Failed to save player state");
    }
  };
  const handleClose = () => {
    setIsVisible(false);
    setGlobalPlayerState(null);
    localStorage.removeItem(GLOBAL_PLAYER_STORAGE_KEY);
  };
  return /* @__PURE__ */ jsxs4(
    GlobalPlayerContext.Provider,
    {
      value: { addToGlobalPlayer, isGlobalPlayerVisible: isVisible },
      children: [
        children,
        isVisible && globalPlayerState && /* @__PURE__ */ jsx5(
          GlobalPlayerComponent,
          {
            externalAudioUrlFn,
            playerState: globalPlayerState,
            onClose: handleClose
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

// src/audio/uploader/single-audio/SingleAudioUploader.tsx
import { SingleFileUploaderHeadless } from "@battlemagedotapp/convex-upload-helpers";
import { ExternalLink, LoaderCircle, Music, Trash } from "lucide-react";

// src/audio/uploader/ConfirmAlertDialog.tsx
import "react";
import { jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
function ConfirmAlertDialog({
  title = "Are you sure?",
  description = "This action cannot be undone.",
  trigger,
  onConfirm,
  confirmLabel = "Continue",
  cancelLabel = "Cancel"
}) {
  return /* @__PURE__ */ jsxs5(AlertDialog, { children: [
    trigger ? typeof trigger === "function" ? /* @__PURE__ */ jsx6(AlertDialogTrigger, { asChild: true, children: trigger({}) }) : /* @__PURE__ */ jsx6(AlertDialogTrigger, { asChild: true, children: trigger }) : null,
    /* @__PURE__ */ jsxs5(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxs5(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsx6(AlertDialogTitle, { children: title }),
        /* @__PURE__ */ jsx6(AlertDialogDescription, { children: description })
      ] }),
      /* @__PURE__ */ jsxs5(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsx6(AlertDialogCancel, { children: cancelLabel }),
        /* @__PURE__ */ jsx6(AlertDialogAction, { onClick: onConfirm, children: confirmLabel })
      ] })
    ] })
  ] });
}
var ConfirmAlertDialog_default = ConfirmAlertDialog;

// src/audio/uploader/single-audio/SingleAudioUploader.tsx
import { jsx as jsx7, jsxs as jsxs6 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx7(
    SingleFileUploaderHeadless,
    {
      file,
      setFile,
      removeFile,
      maxSizeInMB,
      allowedTypes,
      successMessage,
      errorMessage,
      children: ({ isUploading, triggerFileSelect, handleFileDelete, hasFile }) => /* @__PURE__ */ jsxs6("div", { className: cn("relative", className), children: [
        !hasFile && /* @__PURE__ */ jsxs6(
          Button,
          {
            disabled: isUploading,
            variant: "default",
            size: "default",
            className: "w-fit",
            onClick: triggerFileSelect,
            children: [
              isUploading ? /* @__PURE__ */ jsx7(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx7(Music, { className: "h-4 w-4" }),
              isUploading ? "Uploading..." : "Add audio"
            ]
          }
        ),
        file && /* @__PURE__ */ jsxs6("div", { className: "relative p-4 w-full min-w-[332px] flex flex-col items-center gap-2", children: [
          /* @__PURE__ */ jsx7(
            AudioPlaybackWithBlob,
            {
              src: file,
              externalAudioUrlFn,
              closePlayer
            }
          ),
          /* @__PURE__ */ jsxs6(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              className: "cursor-pointer hover:bg-primary hover:text-primary-foreground",
              onClick: () => addToGlobalPlayer(file, "Uploaded Audio"),
              title: "Open in global player",
              children: [
                /* @__PURE__ */ jsx7(ExternalLink, { className: "h-4 w-4" }),
                "Open in player"
              ]
            }
          ),
          /* @__PURE__ */ jsx7("div", { className: "absolute top-0 right-0 flex gap-1", children: /* @__PURE__ */ jsx7(
            ConfirmAlertDialog_default,
            {
              trigger: (props) => /* @__PURE__ */ jsx7(
                Button,
                {
                  ...props,
                  type: "button",
                  variant: "secondary",
                  size: "icon",
                  className: "cursor-pointer hover:bg-destructive hover:text-destructive-foreground",
                  children: /* @__PURE__ */ jsx7(Trash, { className: "h-4 w-4" })
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
  GlobalPlayerProvider,
  useGlobalPlayer,
  SingleAudioUploader
};
//# sourceMappingURL=chunk-JOSLAEPC.mjs.map