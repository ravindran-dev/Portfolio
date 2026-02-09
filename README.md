# Ravindran S - Portfolio Website

A modern, responsive developer portfolio built with React and Tailwind CSS, showcasing AI/ML engineering expertise and full-stack development skills.

## 🚀 Features

- **Responsive Design**: Fully responsive layout that works seamlessly across all devices
- **Dark Theme**: Professional dark theme optimized for developer aesthetics
- **Smooth Animations**: Clean fade-in, slide-up, and hover animations for enhanced UX
- **SEO Optimized**: Proper meta tags and semantic HTML structure
- **Performance**: Optimized with Vite for fast build times and HMR
- **Reusable Components**: Modular component architecture for easy maintenance

## 📋 Sections

1. **Hero Section**: Introduction with role tagline and call-to-action buttons
2. **About**: Education background, GPA, and areas of interest
3. **Experience**: Professional experience with achievements and metrics
4. **Projects**: Featured projects with tech stacks, metrics, and links
5. **Skills**: Categorized technical and soft skills
6. **Achievements**: LeetCode rating, ICPC rank, hackathon wins
7. **Certifications**: Professional certifications from NPTEL, Cisco, and Udemy
8. **Footer**: Social links and contact information

## 🛠️ Tech Stack

- **Framework**: React 18
- **Styling**: Tailwind CSS 3
- **Build Tool**: Vite
- **Language**: JavaScript (JSX)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ravindran-dev/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🎨 Customization

### Colors
Edit the color scheme in `tailwind.config.js`:
```javascript
colors: {
  dark: {
    bg: '#0a0a0a',
    card: '#111111',
    border: '#222222',
    hover: '#1a1a1a',
  },
  accent: {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
  }
}
```

### Content
Update your personal information in the respective section files:
- `src/sections/Hero.jsx` - Name and introduction
- `src/sections/About.jsx` - Education and interests
- `src/sections/Experience.jsx` - Work experience
- `src/sections/Projects.jsx` - Project details
- `src/sections/Skills.jsx` - Technical skills
- `src/sections/Achievements.jsx` - Achievements and certifications

## 📁 Project Structure

```
Portfolio/
├── public/
├── src/
│   ├── components/
│   │   ├── Button.jsx
│   │   ├── SectionTitle.jsx
│   │   ├── ProjectCard.jsx
│   │   └── SkillBadge.jsx
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Experience.jsx
│   │   ├── Projects.jsx
│   │   ├── Skills.jsx
│   │   ├── Achievements.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── postcss.config.js
```

## 🌐 Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy the 'dist' folder
```

### GitHub Pages
```bash
npm run build
# Push the 'dist' folder to gh-pages branch
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Ravindran S**
- GitHub: [@ravindran-dev](https://github.com/ravindran-dev)
- LinkedIn: [ravindran-dev](https://linkedin.com/in/ravindran-dev)
- Email: ravindran@example.com

## 🙏 Acknowledgments

- Built with React and Tailwind CSS
- Icons from Heroicons
- Animations with Tailwind CSS

---

**Built with ❤️ by Ravindran S**