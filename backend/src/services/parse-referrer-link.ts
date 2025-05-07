/**
 * Parses the given URL and extracts the referrerUsername.
 * This function assumes that the username is provided directly after the '/?' in the URL,
 * and matches a specific pattern: word + underscore + word + 2 digit number.
 * It ignores any characters such as "#", "?", or "%" that appear after the username.
 * 
 * Example URL structure: https://example.com/?username_99
 * 
 * @param url The full URL including the referrer username.
 * @returns The extracted referrerUsername or an empty string if not found.
 */
export const parseReferrerLink = (url: string): string => {
    try {
        const urlObj = new URL(url);

        let queryString = urlObj.searchParams.toString();
        
    
        const match = queryString.match(/^([a-zA-Z]+_[a-zA-Z]+\d{2})/);
        

        return match ? match[1] : "";
    } catch (error) {
        console.error("Error parsing referrer link:", error);
        return "";
    }
};
