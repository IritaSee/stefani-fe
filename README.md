# Stefani - C Programming Assistant

Stefani adalah asisten pemrograman C yang dikembangkan oleh Daskom Laboratory. Aplikasi web ini membantu pengguna mempelajari bahasa pemrograman C melalui antarmuka chat yang interaktif.

## Fitur

- 🤖 Chat interaktif dengan asisten AI
- 📱 Responsif untuk semua perangkat (desktop, tablet, mobile)
- 🎨 Desain sesuai dengan branding daskomlab.com
- 📝 Dukungan rendering Markdown untuk kode
- 💬 Riwayat percakapan dengan ID unik
- 🌐 Interface dalam Bahasa Indonesia
- ⚙️ Konfigurasi environment untuk development dan production

## Teknologi

- **Frontend**: React + TypeScript + Vite
- **Styling**: CSS dengan responsif design
- **Markdown**: react-markdown untuk rendering kode
- **Backend**: Flask API (terpisah)

## Instalasi dan Menjalankan

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd stefani-fe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env file and update VITE_API_BASE_URL to match your backend
   # For development: http://localhost:5001
   # For production: https://your-production-backend.com
   ```

4. **Jalankan development server**
   ```bash
   npm run dev
   ```

5. **Build untuk production**
   ```bash
   npm run build
   ```

## Konfigurasi Backend

### Development
Pastikan backend Flask berjalan di URL yang sesuai dengan `VITE_API_BASE_URL` di file `.env` (default: `http://localhost:5001`).

### Production
Update file `.env.production` atau set environment variable `VITE_API_BASE_URL` dengan URL backend production Anda.

Backend endpoint yang diperlukan: `/api/ask` yang menerima:
```json
{
  "question": "string",
  "conversation_id": "string",
  "conversation_history": [
    {
      "role": "user|assistant",
      "content": "string"
    }
  ]
}
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:5001` |
| `VITE_DEV_MODE` | Development mode flag | `true` |

## Struktur Project

```
src/
├── components/
│   ├── Chat.tsx           # Komponen utama chat
│   ├── ChatHistory.tsx    # Menampilkan riwayat pesan
│   ├── ChatInput.tsx      # Input untuk mengetik pesan
│   └── Chat.css          # Styling untuk komponen chat
├── App.tsx               # Komponen root aplikasi
├── App.css              # Styling utama aplikasi
├── index.css            # Global styles
└── main.tsx             # Entry point aplikasi
```

## Responsiveness

Aplikasi ini sepenuhnya responsif dengan breakpoint:
- **Mobile**: ≤ 768px
- **Tablet**: 769px - 1024px  
- **Desktop**: > 1024px

## Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Files
- `.env` - Local development
- `.env.production` - Production deployment
- `.env.example` - Template file

## Kontribusi

Dikembangkan oleh Daskom Laboratory, Telkom University.

## License
MIT
© 2025 Daskom Laboratory
