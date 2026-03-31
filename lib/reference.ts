import { verseSamples } from '@/data/verseSamples';

const referenceRegex = /\b([1-3]?\s?[A-Za-z]+)\s(\d{1,3}:\d{1,3})\b/g;

export function extractReferences(text: string) {
  return Array.from(text.matchAll(referenceRegex)).map((match) => `${match[1].replace(/\s+/g, ' ').trim()} ${match[2]}`);
}

export function getVerse(reference: string) {
  return verseSamples.find((verse) => verse.reference.toLowerCase() === reference.toLowerCase());
}
