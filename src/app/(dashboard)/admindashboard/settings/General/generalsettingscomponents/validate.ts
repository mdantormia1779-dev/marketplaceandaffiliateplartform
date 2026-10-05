import { MAX_NAME, MIN_NAME } from "./data";
import { Errors, Settings } from "./types";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_CHARS = /^\+?[\d\s().-]+$/;

export function validate(s: Settings): Errors {
  const e: Errors = {};

  const name = s.platformName.trim();
  if (!name) e.platformName = "Enter a platform name.";
  else if (name.length < MIN_NAME) e.platformName = `Use at least ${MIN_NAME} characters.`;
  else if (name.length > MAX_NAME) e.platformName = `Use ${MAX_NAME} characters or fewer.`;

  const email = s.supportEmail.trim();
  if (!email) e.supportEmail = "Enter a support email.";
  else if (!EMAIL.test(email)) e.supportEmail = "Enter a valid email, like support@example.com.";

  // phone optional, kintu dile thik hote hobe
  const phone = s.supportPhone.trim();
  if (phone) {
    const digits = phone.replace(/\D/g, "").length;
    if (!PHONE_CHARS.test(phone) || digits < 7 || digits > 15) {
      e.supportPhone = "Enter a valid phone number with 7 to 15 digits.";
    }
  }

  return e;
}