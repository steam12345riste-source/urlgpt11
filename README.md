
# URLGPT by ExploitZ3r0  
A simple, fast, dark‑themed URL shortener using **pure HTML, CSS, JavaScript, and a Node.js backend** — no frameworks, no databases.  
Stores URLs in a JSON file and supports real redirects (e.g., `/s/abc123`).  

---

# ✨ Features
- Generate random 6‑character short URLs  
- Fully client‑side list saved in **localStorage**  
- Max **11 links** per user  
- Copy & Delete buttons  
- Dark UI with neon green accent  
- Real redirect routes (`/s/[code]`)  
- Pure Node.js backend with JSON storage  

---

# 📁 Project Structure

```
urlgpt/
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── data/
│   └── urls.json
│
├── server.js
├── Dockerfile
├── docker-compose.yml
└── README.md
```

---

# 🏁 Local Development

## Prerequisites
- Node.js 16+
- npm or bun

## Install & Run
```bash
npm install express
node server.js
```

Open:  
👉 http://localhost:3000

---

# 🐳 Docker Deployment

## **Dockerfile**
```dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install express
EXPOSE 3000
CMD ["node", "server.js"]
```

## **docker-compose.yml**
```yaml
version: "3"
services:
  urlgpt:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ./data:/app/data
```

To run:
```bash
docker-compose up -d
```

---

# 🔧 systemd Service (Ubuntu, Debian, etc.)

Create service:

```bash
sudo nano /etc/systemd/system/urlgpt.service
```

Paste:

```
[Unit]
Description=URLGPT by ExploitZ3r0
After=network.target

[Service]
ExecStart=/usr/bin/node /root/urlgpt/server.js
WorkingDirectory=/root/urlgpt
Restart=always
User=root
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

Enable & start:

```bash
sudo systemctl daemon-reload
sudo systemctl enable urlgpt
sudo systemctl start urlgpt
```

Check status:

```bash
systemctl status urlgpt
```

---

# 🌍 Hosting Guide

## 🚀 Render (Best Free Option)
1. Go to https://dashboard.render.com  
2. New → Web Service  
3. Build Command: `npm install`  
4. Start Command: `node server.js`  
5. Add a **Persistent Disk** mounted to `/data`  
6. Deploy  

Fully persistent & free.

---

## 🚄 Railway
1. https://railway.app  
2. New Project → Deploy from GitHub  
3. Set Start Command:  
```
node server.js
```  
4. Add a **Volume** mounted at `/data`  
5. Deploy  

---

## 💻 Replit
1. Create Node.js Repl  
2. Upload project files  
3. Add `package.json`:  
```json
{
  "dependencies": { "express": "^4.18.2" }
}
```  
4. Run  

---

## 🏢 cPanel Full Deployment Tutorial

### ✔ Step 1 – Upload Project
1. Open **File Manager**  
2. Upload `urlgpt.zip`  
3. Extract to:  
```
/home/<user>/urlgpt
```

---

### ✔ Step 2 – Enable Node.js on cPanel
1. Open **Setup Node.js App** (also called "Application Manager")  
2. Click **Create Application**  
3. Configure:
```
Node.js version: 18+
Application root: urlgpt
Application URL: https://yourdomain.com
Startup File: server.js
```

Click **Create**.

---

### ✔ Step 3 – Install Dependencies
Inside cPanel terminal:

```bash
cd urlgpt
npm install express
```

---

### ✔ Step 4 – Start the Node App
Back in the Node.js App panel → Click **Start App**

Your site is now live at your domain.

---

# 🖥️ VPS Deployment (DigitalOcean, Hetzner, Vultr)

### Install Node & Git:
```bash
sudo apt update
sudo apt install -y nodejs npm git
```

### Run:
```bash
npm install express
node server.js
```

### Keep running with PM2:
```bash
npm install -g pm2
pm2 start server.js
pm2 save
pm2 startup
```

---

# ☁️ Expose Local Server with Cloudflare Tunnel
```bash
cloudflared tunnel --url http://localhost:3000
```

You get a free HTTPS domain instantly.

---

# 🧪 API Endpoints

### POST `/api/shorten`
```json
{ "url": "https://example.com" }
```

### GET `/api/shorten`
Returns all stored URLs.

### DELETE `/api/shorten`
```json
{ "code": "abc123" }
```

### GET `/s/:code`
Redirects to the original URL.

---

# 🎨 UI Theme
- Dark background `#0a0a0a`  
- Neon green accents  
- Minimal, centered design  

---

# 📜 License
MIT — free to use & modify.

---

# 💚 Created by **ExploitZ3r0**
