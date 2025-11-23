# 🚀 DEPLOY YOUR WEBSITE IN 3 STEPS

## **Everything is ready! Just follow these 3 commands:**

---

### **Step 1: Open Terminal (PowerShell)**
You should already be in the right folder: `C:\Users\User\Documents\imzack-website-ready`

If not, run:
```bash
cd C:\Users\User\Documents\imzack-website-ready
```

---

### **Step 2: Login to Vercel**
Copy and paste this command:
```bash
vercel login
```

**What happens:**
- Your browser opens
- Click "Continue with Email" or "Continue with GitHub"
- Authorize the login
- Come back to terminal

✅ You'll see: "Success! Email authentication complete"

---

### **Step 3: Deploy to Production**
Copy and paste this command:
```bash
vercel --prod --yes
```

**What Vercel will ask you:**

1. **"Set up and deploy?"** 
   → Type: `y` and press Enter

2. **"Which scope?"** 
   → Press Enter (selects your account)

3. **"Link to existing project?"** 
   → Type: `y` and press Enter

4. **"What's the project's name?"** 
   → Look for your existing `imzack.me` project in the list
   → Use arrow keys to select it, or type the exact name
   → Press Enter

5. **"In which directory is your code located?"** 
   → Press Enter (accepts `./`)

6. **"Want to override the settings?"** 
   → Type: `n` and press Enter

---

## **🎉 DONE!**

Vercel will:
- Upload your files
- Build the production version
- Deploy to `imzack.me`
- Show you the live URL

**Takes ~2-3 minutes total.**

---

## **✅ After Deploy:**

1. Visit https://imzack.me
2. Hard refresh: `Ctrl + Shift + R` (or `Cmd + Shift + R` on Mac)
3. Check the "Experience" section - should now say **"Early Career"** instead of "Previous Lives"
4. Test clicking a project card (FRAMEWORK or PRISM)
5. Done! 🎊

---

## **❓ Troubleshooting:**

### **"Command not found: vercel"**
Close terminal and reopen it, then try again.

### **"Project not found"**
Type `y` when asked "Would you like to create a new project?" and give it a name.

### **Browser won't open for login?**
Copy the URL from terminal and paste it into your browser manually.

---

## **🆘 If Stuck:**

Just go to [vercel.com/dashboard](https://vercel.com/dashboard):
1. Find your `imzack.me` project
2. Click "Settings" → "Git"
3. Connect this folder to your GitHub
4. Vercel will auto-deploy

---

**You've got this! The website is production-ready.** 🚀

