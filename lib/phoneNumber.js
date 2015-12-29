import {
  PhoneNumberUtil,
  PhoneNumberFormat as PNF
} from "google-libphonenumber";

export const phoneUtil = PhoneNumberUtil.getInstance();

export function format(number, region="US") {
  try {
    const parsedNumber = phoneUtil.parse(number, region);
    return phoneUtil.format(parsedNumber, PNF.NATIONAL);
  } catch (error) {
    return number;
  }
}
