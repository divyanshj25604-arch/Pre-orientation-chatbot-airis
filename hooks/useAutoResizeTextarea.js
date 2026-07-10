"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

export function useAutoResizeTextarea({ value, enabled = true }) {
  const textareaRef = useRef(null);

  const resize = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea || !enabled) return;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [enabled]);

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    if (!enabled) {
      textarea.style.height = "";
      return;
    }

    resize();
  }, [enabled, resize, value]);

  useEffect(() => {
    if (!enabled) return;

    let frameId;
    const scheduleResize = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(resize);
    };
    const textarea = textareaRef.current;
    const container = textarea?.parentElement;
    const observer = typeof ResizeObserver === "undefined"
      ? null
      : new ResizeObserver(scheduleResize);

    window.addEventListener("resize", scheduleResize);
    window.visualViewport?.addEventListener("resize", scheduleResize);
    if (container) observer?.observe(container);
    scheduleResize();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", scheduleResize);
      window.visualViewport?.removeEventListener("resize", scheduleResize);
      observer?.disconnect();
    };
  }, [enabled, resize]);

  return textareaRef;
}
