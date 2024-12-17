export const validateEmail = (email: string): string => {
    const validProviders = [
     'gmail.com', 'yahoo.com', 'yahoo.com.ph', 'outlook.com', 'hotmail.com', 'aol.com', 
     'icloud.com', 'gov.ph', 'dfa.gov.ph', 'dip.gov.ph', 'deped.gov.ph', 'neda.gov.ph', 
     'doh.gov.ph', 'dti.gov.ph', 'dswd.gov.ph', 'dbm.gov.ph', 'pcso.gov.ph', 'pnp.gov.ph', 
     'bsp.gov.ph', 'prc.gov.ph', 'psa.gov.ph', 'dpwh.gov.ph', 'lto.gov.ph', 'boi.gov.ph',
     'hotmail.co.uk', 'hotmail.fr', 'msn.com', 'yahoo.fr', 'wanadoo.fr', 'orange.fr', 
     'comcast.net', 'yahoo.co.uk', 'yahoo.com.br', 'yahoo.com.in', 'live.com', 
     'rediffmail.com', 'free.fr', 'gmx.de', 'web.de', 'yandex.ru', 'ymail.com', 
     'libero.it', 'uol.com.br', 'bol.com.br', 'mail.ru', 'cox.net', 'hotmail.it', 
     'sbcglobal.net', 'sfr.fr', 'live.fr', 'verizon.net', 'live.co.uk', 'googlemail.com', 
     'yahoo.es', 'ig.com.br', 'live.nl', 'bigpond.com', 'terra.com.br', 'yahoo.it', 
     'neuf.fr', 'yahoo.de', 'alice.it', 'rocketmail.com', 'att.net', 'laposte.net', 
     'facebook.com', 'bellsouth.net', 'yahoo.in', 'hotmail.es', 'charter.net', 
     'yahoo.ca', 'yahoo.com.au', 'rambler.ru', 'hotmail.de', 'tiscali.it', 'shaw.ca', 
     'yahoo.co.jp', 'sky.com', 'earthlink.net', 'optonline.net', 'freenet.de', 
     't-online.de', 'aliceadsl.fr', 'virgilio.it', 'home.nl', 'qq.com', 'telenet.be', 
     'me.com', 'yahoo.com.ar', 'tiscali.co.uk', 'yahoo.com.mx', 'voila.fr', 'gmx.net', 
     'mail.com', 'planet.nl', 'tin.it', 'live.it', 'ntlworld.com', 'arcor.de', 
     'yahoo.co.id', 'frontiernet.net', 'hetnet.nl', 'live.com.au', 'yahoo.com.sg', 
     'zonnet.nl', 'club-internet.fr', 'juno.com', 'optusnet.com.au', 'blueyonder.co.uk', 
     'bluewin.ch', 'skynet.be', 'sympatico.ca', 'windstream.net', 'mac.com', 
     'centurytel.net', 'chello.nl', 'live.ca', 'aim.com', 'bigpond.net.au',
     'up.edu.ph', 'addu.edu.ph', 'ateneo.edu.ph', 'dlsu.edu.ph', 'ust.edu.ph', 'lu.edu.ph'
 ]
 
     email = email.trim();
 
     if (!email) return "Email is required.";
 
     const localPart = email.split('@')[0];
     if (localPart.length > 64) {
         return "The local part (before the '@') of the email address cannot exceed 64 characters.";
     }
 
     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}(\.[a-z]{2,})?$/;
 
     if (!emailRegex.test(email)) {
         return "Invalid email format. Please enter a valid email address.";
     }
 
     const domain = email.split('@')[1];
 
     // Strict validation to ensure no invalid trailing patterns after valid government email domains
     const isStrictGovPh = validProviders.some(provider => new RegExp(`^${provider}$`).test(domain));
 
     if (!isStrictGovPh) {
         return `Invalid email domain. ${domain} is not a recognized email provider.`;
     }
 
     return "";
 };


 export const validatePassword = (password: string, confirm: string): string => {
    // Check if passwords match
    if (password !== confirm) {
        return "Passwords do not match. Please try again.";
    }

    // Combined regex to check for:
    // 1. At least one uppercase letter
    // 2. At least one special character (@, $, !, %, *, ?, &)
    // 3. At least one number
    // 4. No spaces
    // 5. Minimum 6 characters
    const regex = /^(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*\d)(?!.*\s).{6,}$/;

    if (!regex.test(password)) {
        return "Password must contain at least one uppercase letter, one special character (@, $, !, %, *, ?, &), one number, and be at least 6 characters long without spaces.";
    }

    return ""; 
};

    
 
    export const validateUsername = (username: string): string => {
        const regex = /^[A-Za-z0-9][A-Za-z0-9._\-\s]*[A-Za-z0-9]$/; // Alphanumeric, with allowed special chars at the beginning/end
        const invalidCharsRegex = /[^A-Za-z0-9\s._\-]/; // Checks for disallowed special characters or numbers
        const repeatedCharRegex = /(.)\1{2,}/; // Checks for repeated characters
        const maxLength = 30; // Maximum length for username
        const randomSequenceRegex = /([a-zA-Z0-9])\1{3,}/; // Checks for random sequences of the same character
        const leadingTrailingSpaceRegex = /^\s|\s$/; // Checks for leading or trailing spaces
    
        // Check if the username is empty
        if (!username.trim()) return "Username is required.";
    
        // Prevent all spaces username
        if (/^\s+$/.test(username)) return "Username cannot consist of only spaces.";
    
        // Prevent username consisting only of special characters
        if (/^[._\-]+$/.test(username)) return "Username cannot consist of only special characters.";
    
        // Check for invalid characters like disallowed special characters
        if (invalidCharsRegex.test(username))
            return "Username can only contain letters, numbers, spaces, and the special characters '-', '_', or '.'.";
    
    
        // Check if the username length is within the valid range
        if (username.trim().length < 3) return "Username must be at least 3 characters long.";
        if (username.trim().length > maxLength) return `Username must be at most ${maxLength} characters long.`;
    
        // Check for random sequences of the same character (e.g., "aaaa")
        if (randomSequenceRegex.test(username.trim())) {
            return "Username must not contain long sequences of the same character.";
        }
    
        // Check for repeated characters (e.g., "aa", "bb")
        if (repeatedCharRegex.test(username.trim())) {
            return "Username must not contain repeated characters.";
        }
    
        // Check for usernames with leading or trailing spaces
        if (leadingTrailingSpaceRegex.test(username)) {
            return "Username cannot have leading or trailing spaces.";
        }
    
        // Allow username to contain repeated words (e.g., "John John")
        const repeatedWordPattern = /^(\b\w+\b)(?:\s+\1){1}$/; // Regex to allow exactly two occurrences of the same word
        if (repeatedWordPattern.test(username.trim())) {
            return ""; // Allow repeated valid words
        }
    
        return ""; // Username is valid
    };
    