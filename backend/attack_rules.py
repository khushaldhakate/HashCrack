"""
attack_rules.py
Wordlists and Rule-Based Attack Mutator Module for HashCrack Simulator
"""

# Comprehensive Dictionary Wordlist for Offline Attack Simulation
DEFAULT_DICTIONARY = [
    "password",
    "testpassword",
    "admin123",
    "123456",
    "vatsal",
    "vatsal123",
    "welcome123",
    "admin",
    "secret",
    "12345678",
    "123456789",
    "pass123",
    "letmein",
    "qwerty",
    "password123",
    "root",
    "master",
    "cyber2026",
    "security",
    "dragon",
    "monkey",
    "football",
    "baseball",
    "superman",
    "batman",
    "hello123",
    "welcome",
    "welcome1",
    "test123",
    "login123",
    "guest",
    "guest123",
    "user123",
    "user",
    "india123",
    "india",
    "india2026",
    "nagpur",
    "computer",
    "computer123",
    "iloveyou",
    "sunshine",
    "freedom",
    "abcd1234",
    "abc123",
    "admin2026",
    "root123",
    "system",
    "system123",
    "default",
    "default123",
    "temp123",
    "changeit",
    "changeme",
    "access123",
    "welcome2026",
    "pass@123",
    "Admin@123",
    "Password@123",
    "Test@123",
    "Hello@123",
    "Summer2026",
    "Winter2026",
    "Spring2026",
    "Autumn2026",
    "company123",
    "telecom123",
    "operator123",
    "secure123",
    "hash123",
    "hashcrack",
    "hashcrack123",
    "demo123",
    "sample123",
    "student123",
    "college123",
    "project123",
    "cybersecurity",
    "network123",
    "internet123",
    "mobile123",
    "android123",
    "iphone123",
    "administrator",
    "support123",
    "service123",
    "manager123",
    "vatsal",
    "vatsal123",
    "vatsal2026",
    "vatsal@123",
    "vatsaladmin"
]

# Rule Suffixes and Variations
RULE_SUFFIXES = ["123", "@123", "2026", "2025", "!", "@", "#", "1234", "007", "99", "@2026"]

def generate_rules(base_words):
    """
    Generate rule-based password mutations:
    - Capitalization & Case variations (lowercase, UPPERCASE, Capitalize)
    - Suffix appending (numbers, years, special symbols)
    - Leetspeak transformations (a->@, e->3, i->1, o->0, s->$)
    """
    variations = []
    
    for word in base_words:
        w_lower = word.lower()
        w_upper = word.upper()
        w_cap = word.capitalize()
        
        candidates = list(set([word, w_lower, w_upper, w_cap]))
        for c in candidates:
            variations.append(c)
            for s in RULE_SUFFIXES:
                variations.append(f"{c}{s}")
                
        # Leetspeak variations
        leet = w_lower.replace('a', '@').replace('e', '3').replace('i', '1').replace('o', '0').replace('s', '$')
        variations.append(leet)
        for s in RULE_SUFFIXES:
            variations.append(f"{leet}{s}")
            
    # Deduplicate while preserving order
    seen = set()
    dedup = []
    for v in variations:
        if v not in seen:
            seen.add(v)
            dedup.append(v)
    return dedup
