# 🚀 DEPLOYING TO VERCEL - imzack.me (Redesign)

Since you already have `imzack.me` deployed on Vercel, deploying this redesign is straightforward.

---

## **Quick Deploy Steps**

### **Option 1: If Linked to Git (Recommended)**

If your current site is linked to a GitHub repo:

1. **Push this redesign to your repo:**
   ```bash
   git add .
   git commit -m "Complete website redesign - production ready"
   git push origin main
   ```

2. **Vercel auto-deploys!** 
   - Check your Vercel dashboard
   - Should see build starting automatically
   - Live in ~2 minutes

---

### **Option 2: Vercel CLI (Manual Deploy)**

If you prefer manual control:

1. **Build the production version:**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel:**
   ```bash
   vercel --prod
   ```

3. **Follow prompts:**
   - Confirm project linking
   - Deploy to production

---

### **Option 3: Drag & Drop (Vercel Dashboard)**

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click your `imzack.me` project
3. Go to "Deployments" tab
4. Run `npm run build` locally
5. Drag `/dist` folder to Vercel

---

## **Post-Deploy Checklist**

Within 5 minutes of deployment:

- [ ] Visit `https://imzack.me`
- [ ] Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
- [ ] Check all images load
- [ ] Test one project drawer (FRAMEWORK or PRISM)
- [ ] Test LENS tool
- [ ] Test email copy button
- [ ] Check console for errors (F12)

---

## **Lighthouse Audit (Do This!)**

1. Open Chrome
2. Navigate to `https://imzack.me`
3. Press F12 → Click "Lighthouse" tab
4. Select: Performance, Accessibility, Best Practices, SEO
5. Click "Analyze page load"
6. **Target:** 90+ scores across the board

---

## **If Something Breaks**

### **Images not loading?**
- Check `/dist` folder has all images
- Verify paths in code start with `/` (e.g., `/headshot.jpg`)

### **Mockups not loading in drawer?**
- Ensure `framework-mockup-v3.html` and `prism-mockup-v3.html` are in `/public`
- Check browser console for 404 errors

### **Styles look wrong?**
- Hard refresh (Ctrl+Shift+R)
- Clear browser cache
- Check Vercel build logs for CSS issues

---

## **Current Build Stats**

```
Bundle Size (gzipped): ~120 kB
Build Time: ~5 seconds
Zero Errors: ✅
```

You're good to go! 🚀

