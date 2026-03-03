# 🚀 QUICK SETUP GUIDE

## Step 1: Install Node.js
If you don't have Node.js installed:
- Download from: https://nodejs.org/
- Install LTS version (v18 or v20)
- Verify: `node --version` and `npm --version`

## Step 2: Setup Project

```bash
# Navigate to project folder
cd snyder-ldc-frontend

# Install all dependencies
npm install

# This will take 2-3 minutes
```

## Step 3: Start Your Spring Boot Backend

```bash
# In your backend project folder
cd snyder-ldc-service
mvn spring-boot:run

# Make sure it's running on http://localhost:8081
```

## Step 4: Start React Frontend

```bash
# In the frontend folder
npm run dev
```

## Step 5: Open Browser

```
http://localhost:3000
```

## ✅ You're Done!

You should see the Snyder LDC Dashboard with 8 modules ready to use.

## 🔧 If Something Goes Wrong

### Problem: "npm install" fails
**Solution**: Delete `node_modules` folder and `package-lock.json`, then run `npm install` again

### Problem: Can't connect to backend
**Solution**: 
1. Check if Spring Boot is running: `http://localhost:8081/api/v1/ldc/charges`
2. Add CORS configuration to your Spring Boot application:

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE");
    }
}
```

### Problem: Port 3000 already in use
**Solution**: Kill the process or change port in `vite.config.js` to 3001

### Problem: Blank screen
**Solution**: 
1. Open browser console (F12)
2. Check for errors
3. Make sure all files are extracted properly

## 📞 Need Help?

1. Check README.md for detailed documentation
2. Review browser console for errors
3. Verify backend is running properly
4. Check network tab for API calls

## 🎉 Features Ready to Use

✅ Dashboard  
✅ LDC Charges (Create, Read, Update, Delete)  
✅ Meter Types  
✅ Quantities  
✅ Pooling Points  
✅ Storage Types  
✅ Tariffs  
✅ Monthly TOL  
✅ Price Products  

All with beautiful UI, validation, and error handling!
