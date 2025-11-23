# 🔒 Security Setup for LENS Tool

## ⚠️ IMPORTANT: Your API Key Was Exposed!

GitHub detected your Gemini API key in the code. Follow these steps immediately:

---

## 1️⃣ **Rotate Your API Key** (DO THIS FIRST!)

1. Go to: https://aistudio.google.com/app/apikey
2. Delete the old key: `AIzaSyDHTrg_KfwNXTLxakUjYp3MeLiAnqZ1uU0`
3. Create a new API key
4. Copy the new key

---

## 2️⃣ **Add Environment Variable**

### **For Local Development:**
Create a file called `.env.local` in the root directory:

```bash
VITE_GEMINI_API_KEY=your_new_api_key_here
```

Replace `your_new_api_key_here` with your actual new key.

---

## 3️⃣ **For Vercel Deployment:**

1. Go to: https://vercel.com/iconiczack93/new-website/settings/environment-variables
2. Add a new environment variable:
   - **Name:** `VITE_GEMINI_API_KEY`
   - **Value:** Your new API key
   - **Environment:** Production, Preview, Development (check all)
3. Click "Save"
4. Redeploy your site

---

## 4️⃣ **Verify It Works:**

After adding the environment variable:

```bash
npm run dev
```

Test the LENS tool - it should still work with the new key.

---

## ✅ **What Was Fixed:**

- ❌ **Before:** API key hardcoded in `Work.tsx` (exposed to GitHub)
- ✅ **After:** API key stored in environment variable (secure)
- ✅ **Added:** `.env.local` to `.gitignore` (never commit secrets)

---

## 📝 **Summary:**

1. **Rotate your API key** (delete old, create new)
2. **Add to `.env.local`** locally
3. **Add to Vercel** environment variables
4. **Push the secure code** (already done)

Your site will work once you add the environment variable! 🚀

