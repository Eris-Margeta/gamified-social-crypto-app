// services/magic-link-creator.ts

/**
 * Generates a magic link for the given username.
 * @param username The username for which to generate the magic link.
 * @returns The generated magic link.
 */
export const createMagicLink = (username: string): string => {
    const frontEndUrl = process.env.FRONT_END_URL || "http://localhost:3000";
    return `${frontEndUrl}/?${username}`;
};
