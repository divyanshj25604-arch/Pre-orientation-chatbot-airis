import {
  MAX_MESSAGE_LENGTH,
  MAX_PROMPT_LENGTH,
} from "./constants";

export function isValidGroqKey(key) {
  return key.trim().startsWith("gsk_");
}

export function isPromptEmpty(prompt) {
  return prompt.trim().length === 0;
}

export function isPromptTooLong(prompt) {
  return prompt.length > MAX_PROMPT_LENGTH;
}

export function isValidMessage(message) {
  return (
    message.trim().length > 0 &&
    message.length <= MAX_MESSAGE_LENGTH
  );
}