<<<<<<< HEAD
# HashCrack
=======
# HashCrack - Password Hash Security Testing & Offline Attack Simulator

A cybersecurity web application built for password hashing security testing, salt verification, and offline hash attack simulation.

## 🚀 Features

- **Module 1: Password Hash Generator**
  - Registration form taking Username & Password inputs.
  - Computes raw SHA-256 hash and presents it on frontend with a `[Copy Hash]` button.
  - Generates random 128-bit hex salts internally and computes salted SHA-256 hashes (`password + salt`).
  - Stores records directly in MongoDB (or local fallback storage) without returning or displaying Salt/Salted Hash on the frontend.
  - Enforces zero plain text password storage.

- **Module 2: HashCrack Simulator**
  - Offline attack engine executing **Dictionary Attacks** and **Rule-Based Attacks**.
  - Generates candidate hashes and matches against target SHA-256 hashes.
  - Live attack engine output logs with progress indicators.
  - Returns `Password Found: <original password>` with `Attack Type` or `Password Not Found`.

- **Module 3: Security Report Dashboard**
  - Security posture matrix auditing hash algorithms, salt availability, dictionary resilience, and password strength scores.

- **Database Vault**
  - Administrative record viewer displaying MongoDB storage structure (`Username`, `SHA256_Hash`, `Salt`, `Salted_Hash`, `Created_Time`).

---

## 🛠️ Technology Stack

- **Frontend**: React.js, Vite, Tailwind CSS, Lucide Icons
- **Backend**: Python Flask, PyMongo, `hashlib`, `secrets`
- **Database**: MongoDB

---

## 💻 Getting Started

### 1. Prerequisites
- Python 3.9+
- Node.js 18+
- MongoDB (Optional - automatic JSON storage fallback enabled if MongoDB is not running locally)

### 2. Backend Setup
```bash
cd backend
pip install -r requirements.txt
python app.py
```
*Backend runs on `http://localhost:5000`*

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs on `http://localhost:3000`*
>>>>>>> 7dce766 (Initial commit: HashCrack - Password Hash Security Testing & Offline Attack Simulator)
