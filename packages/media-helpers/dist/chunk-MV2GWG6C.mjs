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

// src/audio/play/AudioPlayerProviderContext.tsx
import { createContext, useContext } from "react";
var defaultTransform = (storageId) => storageId;
var AudioPlayerContext = createContext({
  transformAudioUrlFn: defaultTransform
});
var useAudioPlayer = () => useContext(AudioPlayerContext);
var AudioPlayerProviderContext_default = AudioPlayerContext;

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

// src/audio/play/AudioPlayer.tsx
import {
  Loader2,
  Pause,
  Play,
  Redo,
  Undo,
  Volume2,
  VolumeX
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Fragment, jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function AudioPlayer({
  src,
  className,
  externalAudioUrlFn,
  compact = false
}) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [audioUrl, setAudioUrl] = useState(null);
  const { transformAudioUrlFn } = useAudioPlayer();
  const audioSrc = externalAudioUrlFn ? externalAudioUrlFn(src) : transformAudioUrlFn(src);
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };
  const fetchAndPlay = useCallback(async () => {
    if (!audioSrc || audioUrl) return;
    setIsLoading(true);
    try {
      const response = await fetch(audioSrc);
      if (!response.ok) {
        throw new Error(`Failed to fetch audio: ${response.statusText}`);
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      if (audioRef.current) {
        audioRef.current.src = url;
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Failed to fetch audio as blob:", error);
    } finally {
      setIsLoading(false);
    }
  }, [audioSrc, audioUrl]);
  const handlePlay = useCallback(async () => {
    if (!audioRef.current) return;
    if (!audioUrl) {
      await fetchAndPlay();
      return;
    }
    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Failed to play audio:", error);
    }
  }, [audioUrl, fetchAndPlay]);
  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };
  const handleSeek = (value) => {
    if (audioRef.current) {
      const newTime = value[0] / 100 * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };
  const handleVolumeChange = (value) => {
    const newVolume = value[0] / 100;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };
  const handleMuteToggle = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };
  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
  const handleSpeedChange = (newSpeed) => {
    setPlaybackRate(newSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
    }
  };
  const handleSkip = (direction) => {
    if (audioRef.current) {
      const skipTime = direction === "forward" ? 10 : -10;
      const newTime = Math.max(0, Math.min(duration, currentTime + skipTime));
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);
    const handleCanPlay = () => setIsLoaded(true);
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("canplay", handleCanPlay);
    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("canplay", handleCanPlay);
    };
  }, [audioUrl]);
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);
  return /* @__PURE__ */ jsxs2(
    "div",
    {
      className: cn(
        "bg-background border rounded-lg p-4 select-none",
        compact ? "w-full space-y-4" : "w-full",
        className
      ),
      style: { minWidth: compact ? "300px" : "400px", flexShrink: 0 },
      children: [
        /* @__PURE__ */ jsx3(
          "audio",
          {
            ref: audioRef,
            preload: "none",
            style: { display: "none" },
            onPlay: () => setIsPlaying(true),
            onPause: () => setIsPlaying(false),
            onEnded: () => setIsPlaying(false),
            onLoadedMetadata: () => {
              const audio = audioRef.current;
              if (audio) {
                setDuration(audio.duration);
                setIsLoaded(true);
              }
            },
            onCanPlay: () => setIsLoaded(true),
            onError: (e) => {
              console.error("Audio error:", e);
            }
          }
        ),
        compact ? /* @__PURE__ */ jsxs2(Fragment, { children: [
          /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-center space-x-2", children: [
            /* @__PURE__ */ jsxs2(Popover, { children: [
              /* @__PURE__ */ jsx3(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsx3(Button, { variant: "outline", size: "icon", disabled: !isLoaded, children: isMuted ? /* @__PURE__ */ jsx3(VolumeX, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx3(Volume2, { className: "h-4 w-4" }) }) }),
              /* @__PURE__ */ jsx3(PopoverContent, { className: "w-fit p-4", align: "end", children: /* @__PURE__ */ jsxs2("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsx3("span", { className: "text-sm font-medium", children: "Volume" }),
                  /* @__PURE__ */ jsx3(
                    Button,
                    {
                      variant: "ghost",
                      size: "sm",
                      onClick: handleMuteToggle,
                      className: "h-6 w-6 p-0",
                      children: isMuted ? /* @__PURE__ */ jsx3(VolumeX, { className: "h-3 w-3" }) : /* @__PURE__ */ jsx3(Volume2, { className: "h-3 w-3" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx3(
                  Slider,
                  {
                    value: [isMuted ? 0 : volume * 100],
                    onValueChange: handleVolumeChange,
                    max: 100,
                    step: 1,
                    disabled: !isLoaded,
                    className: "w-full",
                    orientation: "vertical"
                  }
                )
              ] }) })
            ] }),
            /* @__PURE__ */ jsx3(
              Button,
              {
                variant: "outline",
                size: "icon",
                onClick: handleSkip.bind(null, "backward"),
                disabled: !isLoaded,
                children: /* @__PURE__ */ jsx3(Undo, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsx3(
              Button,
              {
                variant: "default",
                size: "icon",
                onClick: isPlaying ? handlePause : handlePlay,
                disabled: isLoading,
                className: "h-12 w-12",
                children: isLoading ? /* @__PURE__ */ jsx3(Loader2, { className: "h-6 w-6 animate-spin" }) : isPlaying ? /* @__PURE__ */ jsx3(Pause, { className: "h-6 w-6" }) : /* @__PURE__ */ jsx3(Play, { className: "h-6 w-6" })
              }
            ),
            /* @__PURE__ */ jsx3(
              Button,
              {
                variant: "outline",
                size: "icon",
                onClick: handleSkip.bind(null, "forward"),
                disabled: !isLoaded,
                children: /* @__PURE__ */ jsx3(Redo, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsxs2(Popover, { children: [
              /* @__PURE__ */ jsx3(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs2(Button, { variant: "outline", size: "sm", disabled: !isLoaded, children: [
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
            ] })
          ] }),
          /* @__PURE__ */ jsxs2("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx3(
              Slider,
              {
                value: [duration > 0 ? currentTime / duration * 100 : 0],
                onValueChange: handleSeek,
                max: 100,
                step: 0.1,
                disabled: !isLoaded,
                className: "w-full"
              }
            ),
            /* @__PURE__ */ jsxs2("div", { className: "flex justify-between text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsx3("span", { children: formatTime(currentTime) }),
              /* @__PURE__ */ jsx3("span", { children: formatTime(duration) })
            ] })
          ] })
        ] }) : /* @__PURE__ */ jsxs2("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsxs2(Popover, { children: [
            /* @__PURE__ */ jsx3(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsx3(Button, { variant: "outline", size: "icon", disabled: !isLoaded, children: isMuted ? /* @__PURE__ */ jsx3(VolumeX, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx3(Volume2, { className: "h-4 w-4" }) }) }),
            /* @__PURE__ */ jsx3(PopoverContent, { className: "w-fit p-4", align: "end", children: /* @__PURE__ */ jsxs2("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsx3("span", { className: "text-sm font-medium", children: "Volume" }),
                /* @__PURE__ */ jsx3(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    onClick: handleMuteToggle,
                    className: "h-6 w-6 p-0",
                    children: isMuted ? /* @__PURE__ */ jsx3(VolumeX, { className: "h-3 w-3" }) : /* @__PURE__ */ jsx3(Volume2, { className: "h-3 w-3" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsx3(
                Slider,
                {
                  value: [isMuted ? 0 : volume * 100],
                  onValueChange: handleVolumeChange,
                  max: 100,
                  step: 1,
                  disabled: !isLoaded,
                  className: "w-full",
                  orientation: "vertical"
                }
              )
            ] }) })
          ] }),
          /* @__PURE__ */ jsx3(
            Button,
            {
              variant: "outline",
              size: "icon",
              onClick: handleSkip.bind(null, "backward"),
              disabled: !isLoaded,
              children: /* @__PURE__ */ jsx3(Undo, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsx3(
            Button,
            {
              variant: "default",
              size: "icon",
              onClick: isPlaying ? handlePause : handlePlay,
              disabled: isLoading,
              className: "h-12 w-12",
              children: isLoading ? /* @__PURE__ */ jsx3(Loader2, { className: "h-6 w-6 animate-spin" }) : isPlaying ? /* @__PURE__ */ jsx3(Pause, { className: "h-6 w-6" }) : /* @__PURE__ */ jsx3(Play, { className: "h-6 w-6" })
            }
          ),
          /* @__PURE__ */ jsx3(
            Button,
            {
              variant: "outline",
              size: "icon",
              onClick: handleSkip.bind(null, "forward"),
              disabled: !isLoaded,
              children: /* @__PURE__ */ jsx3(Redo, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxs2("div", { className: "flex-1 max-lg:w-full space-y-2", children: [
            /* @__PURE__ */ jsx3(
              Slider,
              {
                value: [duration > 0 ? currentTime / duration * 100 : 0],
                onValueChange: handleSeek,
                max: 100,
                step: 0.1,
                disabled: !isLoaded,
                className: "w-full"
              }
            ),
            /* @__PURE__ */ jsxs2("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsx3("span", { children: formatTime(currentTime) }),
              /* @__PURE__ */ jsx3("span", { children: formatTime(duration) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs2(Popover, { children: [
            /* @__PURE__ */ jsx3(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs2(Button, { variant: "outline", size: "sm", disabled: !isLoaded, children: [
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
          ] })
        ] })
      ]
    }
  );
}

// src/audio/play/AudioPlayerProvider.tsx
import "react";
import { jsx as jsx4 } from "react/jsx-runtime";
function AudioPlayerProvider({
  transformAudioUrlFn,
  children
}) {
  const fn = transformAudioUrlFn ?? ((id) => id);
  return /* @__PURE__ */ jsx4(AudioPlayerProviderContext_default.Provider, { value: { transformAudioUrlFn: fn }, children });
}

// src/audio/uploader/single-audio/SingleAudioUploader.tsx
import { SingleFileUploaderHeadless } from "@battlemagedotapp/convex-upload-helpers";
import { LoaderCircle, Music, Trash } from "lucide-react";

// src/audio/uploader/ConfirmAlertDialog.tsx
import "react";
import { jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
function ConfirmAlertDialog({
  title = "Are you sure?",
  description = "This action cannot be undone.",
  trigger,
  onConfirm,
  confirmLabel = "Continue",
  cancelLabel = "Cancel"
}) {
  return /* @__PURE__ */ jsxs3(AlertDialog, { children: [
    trigger ? typeof trigger === "function" ? /* @__PURE__ */ jsx5(AlertDialogTrigger, { asChild: true, children: trigger({}) }) : /* @__PURE__ */ jsx5(AlertDialogTrigger, { asChild: true, children: trigger }) : null,
    /* @__PURE__ */ jsxs3(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxs3(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsx5(AlertDialogTitle, { children: title }),
        /* @__PURE__ */ jsx5(AlertDialogDescription, { children: description })
      ] }),
      /* @__PURE__ */ jsxs3(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsx5(AlertDialogCancel, { children: cancelLabel }),
        /* @__PURE__ */ jsx5(AlertDialogAction, { onClick: onConfirm, children: confirmLabel })
      ] })
    ] })
  ] });
}
var ConfirmAlertDialog_default = ConfirmAlertDialog;

// src/audio/uploader/single-audio/SingleAudioUploader.tsx
import { jsx as jsx6, jsxs as jsxs4 } from "react/jsx-runtime";
function SingleAudioUploader({
  file,
  setFile,
  removeFile,
  maxSizeInMB,
  allowedTypes = [],
  successMessage = "Audio file uploaded successfully!",
  errorMessage = "Failed to upload audio file",
  className,
  audioClassName,
  compact = false
}) {
  return /* @__PURE__ */ jsx6(
    SingleFileUploaderHeadless,
    {
      file,
      setFile,
      removeFile,
      maxSizeInMB,
      allowedTypes,
      successMessage,
      errorMessage,
      children: ({ isUploading, triggerFileSelect, handleFileDelete, hasFile }) => /* @__PURE__ */ jsxs4("div", { className: cn("relative", className), children: [
        !hasFile && /* @__PURE__ */ jsxs4(
          Button,
          {
            disabled: isUploading,
            variant: "default",
            size: "default",
            className: "w-fit",
            onClick: triggerFileSelect,
            children: [
              isUploading ? /* @__PURE__ */ jsx6(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx6(Music, { className: "h-4 w-4" }),
              isUploading ? "Uploading..." : "Add audio"
            ]
          }
        ),
        file && /* @__PURE__ */ jsxs4(
          "div",
          {
            className: "relative p-4 w-full",
            style: { minWidth: compact ? "332px" : "432px", flexShrink: 0 },
            children: [
              /* @__PURE__ */ jsx6(
                AudioPlayer,
                {
                  src: file,
                  className: cn("w-full", audioClassName),
                  compact
                }
              ),
              /* @__PURE__ */ jsx6("div", { className: "absolute top-0 right-0", children: /* @__PURE__ */ jsx6(
                ConfirmAlertDialog_default,
                {
                  trigger: (props) => /* @__PURE__ */ jsx6(
                    Button,
                    {
                      ...props,
                      type: "button",
                      variant: "secondary",
                      size: "icon",
                      className: "cursor-pointer hover:bg-destructive hover:text-destructive-foreground",
                      children: /* @__PURE__ */ jsx6(Trash, { className: "h-4 w-4" })
                    }
                  ),
                  title: "Delete audio",
                  description: "Are you sure you want to delete this audio file? This action cannot be undone.",
                  confirmLabel: "Delete",
                  cancelLabel: "Cancel",
                  onConfirm: handleFileDelete
                }
              ) })
            ]
          }
        )
      ] })
    }
  );
}

export {
  AudioPlayer,
  AudioPlayerProvider,
  SingleAudioUploader
};
//# sourceMappingURL=chunk-MV2GWG6C.mjs.map