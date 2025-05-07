// Contains a function to parse and interpret the referrer information.
// called by the actions page -> positive alert UI component
//parseReferrer(referrer: string): string - Analyzes the referrer string and returns a formatted message. It distinguishes between no referrer, an email referrer, and unknown referrers, providing a human-readable interpretation.


export function parseReferrer(referrer: string): string {
    if (referrer === "No referrer") {
      return "Nobody, you're first in line!";
    } else if (referrer.includes('@')) {
      return referrer; 
    } else {
      return "Unknown";
    }
  }
  