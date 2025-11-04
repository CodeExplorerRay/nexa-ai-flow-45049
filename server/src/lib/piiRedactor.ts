const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const CC_REGEX = /\b(?:\d[ -]*?){13,16}\b/g;

export function piiRedactor(data: any): any {
  if (!data) return data;

  const jsonString = JSON.stringify(data);
  
  const redactedString = jsonString
    .replace(EMAIL_REGEX, '[REDACTED_EMAIL]')
    .replace(CC_REGEX, '[REDACTED_CC]');

  return JSON.parse(redactedString);
}
