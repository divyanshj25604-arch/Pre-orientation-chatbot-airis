import {
  MAX_MESSAGE_LENGTH,
  MAX_PROMPT_LENGTH,
} from "./constants";

export function isValidGroqKey(key) {
  return key.trim().startsWith("gsk_");
}

export function isPromptEmpty(prompt) {
  return typeof prompt !== "string" || prompt.trim().length === 0;
}

export function isPromptTooLong(prompt) {
  return typeof prompt === "string" && prompt.length > MAX_PROMPT_LENGTH;
}

export function getPromptValidationError(prompt) {
  if (typeof prompt !== "string") {
    return "Prompt must be a valid text value.";
  }

  if (prompt.trim().length === 0) {
    return "Prompt cannot be empty.";
  }

  if (prompt.length > MAX_PROMPT_LENGTH) {
    return `Prompt cannot exceed ${MAX_PROMPT_LENGTH} characters.`;
  }

  return null;
}

export function isValidMessage(message) {
  return (
    typeof message === "string" &&
    message.trim().length > 0 &&
    message.length <= MAX_MESSAGE_LENGTH
  );
}

export function getMessageValidationError(message) {
  if (typeof message !== "string") {
    return "Message must be a valid text value.";
  }

  if (message.trim().length === 0) {
    return "Message cannot be empty.";
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return `Message cannot exceed ${MAX_MESSAGE_LENGTH} characters.`;
  }

  return null;
}