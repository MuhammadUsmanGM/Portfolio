# Muhammad Usman - Portfolio Website

A modern, responsive portfolio website showcasing my skills as a Front-end Developer. Built with HTML, CSS, JavaScript, and Node.js with a focus on animations, user experience, and responsive design.

## 🚀 Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Animated UI**: Smooth animations with AOS (Animate On Scroll) library
- **Video Integration**: Background videos and interactive project showcases
- **Contact Form**: Functional contact form with email integration
- **Modern Aesthetics**: Clean, professional design with gradient animations
- **Interactive Elements**: Hover effects and smooth transitions

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Email Service**: Nodemailer with Gmail integration
- **Animation**: AOS (Animate On Scroll)
- **Icons**: Boxicons
- **Styling**: Custom CSS with modern animations and responsive design

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (version 14 or higher)
- npm (comes with Node.js)
- A Gmail account with App Password enabled (for contact form)

## ⚙️ Installation & Setup

1. **Clone the repository** (or download the files)
   ```bash
   git clone <repository-url>
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env`
   - Update the environment variables:
     ```
     PORT=3000
     NODE_ENV=development
     EMAIL_USER=your_email@gmail.com
     EMAIL_PASS=your_app_password_here
     ```

4. **Gmail App Password Setup**
   - Enable 2-factor authentication on your Gmail account
   - Generate an App Password: Google Account → Security → App Passwords
   - Use the generated password in the `EMAIL_PASS` field

5. **Start the development server**
   ```bash
   npm run dev
   ```
   Or for production:
   ```bash
   npm start
   ```

6. **Open in browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
Portfolio/
├── images/           # Image assets
├── videos/           # Video assets
├── node_modules/     # Dependencies (auto-generated)
├── index.html        # Main HTML file
├── style.css         # Stylesheet
├── app.js           # Client-side JavaScript
├── server.js        # Express server
├── package.json     # Project configuration
├── .env.example     # Environment variables template
├── .gitignore       # Git ignore rules
└── README.md        # Project documentation
```

## 📧 Contact Form Setup

The contact form requires Gmail configuration:

1. Enable Gmail API or use App Passwords
2. Update `.env` with your credentials
3. The form will send emails to the configured EMAIL_USER address

## 🎨 Customization

### Update Personal Information
- Edit contact details in `index.html`
- Update social links in both `index.html` and `server.js`
- Replace placeholder project links with actual URLs

### Modify Styling
- Main styles are in `style.css`
- The design uses CSS custom properties for easy theming
- Responsive breakpoints: 1200px, 700px, 480px

### Add Projects
- Update project sections in `index.html`
- Add corresponding video files to the `videos/` folder
- Update project links and descriptions

## 🚀 Deployment

### Heroku Deployment
1. Create a Heroku app
2. Set environment variables in Heroku dashboard
3. Deploy using Git or GitHub integration

### Other Platforms
- **Vercel**: Add `vercel.json` configuration
- **Netlify**: Configure build settings and environment variables
- **DigitalOcean**: Use App Platform or Droplets

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

**Muhammad Usman**
- Email: muhammadusman5965etc@gmail.com
- GitHub: [@MuhammadUsmanGM](https://github.com/MuhammadUsmanGM)
- Phone: +92 325 6550687

---

⭐ If you find this project helpful, please consider giving it a star!