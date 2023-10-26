function isValidUsername(username: string): boolean {
    // List of banned words and patterns
    const bannedWords: string[] = [
        "admin", "administrator", "user", "root", "guest", "superuser",
        "system", "support", "help", "info", "contact", "assistance",
        "service", "helpline", "techsupport", "link'd", "link'dsupport",
        "link'dadmin", "webmaster", "postmaster", "hostmaster", "sql",
        "database", "dbadmin", "police", "official", "government", 
        "judge", "moderator", "staff", "employee", "payment", "billing",
        "verify", "certified", "legal", "finance", "api", "bot", "server",
        "follow", "like", "subscribe", "ad", "advertisement", "promo"
    ];

    // Convert username to lowercase for case-insensitive checks
    const lowerUsername: string = username.toLowerCase();

    // Check against banned words
    if (bannedWords.includes(lowerUsername)) {
        return false;
    }

    // Patterns that should be banned
    const bannedPatterns: RegExp[] = [/.*admin.*/, /.*support.*/, /.*official.*/];

    // Check against banned patterns
    for (const pattern of bannedPatterns) {
        if (pattern.test(lowerUsername)) {
            return false;
        }
    }

    // If username passes all checks
    return true;
}

export default isValidUsername;