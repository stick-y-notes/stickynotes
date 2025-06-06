# stickynotes
🟨 a simple sticky notes web app


---

### Dev and Build

```sh
bun i
bun run start
bun run dev
bun run build
bun run clean

# web4 deploy
NEAR_SIGNER_KEY=ed25519:your_key_here
bun run web4_testnet
bun run web4_mainnet
# web3 storgae as backup
w3 space use TEMP
w3 up src
```

---

### Features
- 📝 Create, edit, and delete sticky notes
- 💾 Offline-first functionality
- 🔄 Automatic local storage saving (JSON format)
- 📱 Responsive design for all devices
- 🎨 Customizable note colors
- 📌 Pin notes to keep them at the top
- 🔍 Search through notes
- 📋 Copy note content to clipboard
- ⚡ Fast and lightweight
- 🔒 Privacy-focused (all data stays on your device)
- 🔐 no lock in, export your notes and open in other apps


---

### Design Details

```json
{ "color": "yellow", "note": "Hello World!", "id": "1" }
```

json feilds
- "pinned": "true"
- "color": "yellow"
- "note": "Hello World!"
- "id": "1234567890"



Color Options
- #95D58D - green
- #C9A8F4 - purple
- #FFF8A3 - yellow
- #8CA2F5 - blue
- #FF8A8A - red
- #FFC58A - orange


---

### Roadmap
ideas
- [x] basic functionality, create, edit, export
- [ ] search
- [ ] import
- [ ] share

---

copyright 2025 by sleet.near