# 🎤 Speech to Text Converter

This is a modern, real-time speech-to-text converter that supports English and Arabic languages. This web application uses the browser's built-in Web Speech API to provide accurate speech recognition without requiring any external API keys or payments.

## Features

- **Real-time Speech Recognition**: Convert speech to text instantly as you speak
- **Bilingual Support**: Full support for English and Arabic languages
- **Modern UI**: Clean, responsive design with smooth animations and gradient background
- **Navigation Bar**: Professional navbar with microphone icon and branding
- **Cross-browser Compatible**: Works on Chrome, Edge, and Safari better performance on edge
- **Text Management**: Copy, download, and clear transcripts easily
- **Word Counter**: Real-time word count display
- **RTL Support**: Proper right-to-left text display for Arabic

##  Getting Started

### Prerequisites

- A modern web browser (Chrome, Safari, Edge recommended)
- Microphone access permission
- Internet connection (required for speech recognition API)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/osama-al-khreishah/speech-to-text-converter.git
   cd speech-to-text-converter
   ```

2. **Open the application**
   Simply open `index.html` in your web browser, or use a local server:
   
   **Option A: Direct file opening**
   - Double-click `index.html`
   - Or right-click and select "Open with" → your preferred browser

3. **Grant microphone permission**
   - Click "Allow" when prompted for microphone access
   - Ensure your microphone is working properly

## How to Use

### Basic Usage

1. **Select Language**: Choose between English or Arabic from the dropdown menu
2. **Start Recording**: Click the "Start Recording" button or press `Ctrl+R`
3. **Speak Clearly**: Talk normally into your microphone
4. **Stop Recording**: Click "Stop Recording" or press `Ctrl+R` again
5. **View Results**: Your speech will appear as text in the transcript area

### Advanced Features

#### Keyboard Shortcuts
- **Ctrl+R** or **Cmd+R**: Start/Stop recording
- **Ctrl+Shift+C**: Clear transcript
- **Spacebar**: Start/Stop recording (when focused on the page)

#### Text Actions
- **Copy**: Copy the transcribed text to clipboard
- **Download**: Save the transcript as a .txt file
- **Clear**: Remove all transcribed text

## Project Structure

```
project-root/
├── index.html          # Main application interface
├── styles.css          # Styling and responsive design
├── scripts.js           # Core functionality and speech recognition
├── README.md           # This file
```

## Technical Details

### Browser Compatibility

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome |  Full | Recommended for best experience |
| Edge |  Full | Excellent compatibility |
| Safari |  Full | Works well on macOS/iOS |
| Firefox |  Limited | Web Speech API support limited |

### Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Flexbox, Grid, and backdrop-filter
- **Vanilla JavaScript**: Pure JS with Web Speech API
- **Tailwind CSS**: Utility-first CSS framework (via CDN)
- **Web Speech API**: Browser-native speech recognition
- **SVG Icons**: Scalable vector graphics for navigation

### API Requirements

This application uses the **Web Speech API**, which is:
-  **Free**: No API keys or payment required
-  **Built-in**: Native browser functionality
-  **Reliable**: Backed by Google's speech recognition
-  **Internet Required**: Needs connection for processing

## Browser Setup

### Chrome/Edge
1. Ensure microphone permission is granted
2. Check that "Use microphone" is enabled in site settings

### Safari
1. Go to Safari → Preferences → Websites → Microphone
2. Allow microphone access for the site

### Troubleshooting

#### Common Issues

**"Browser not supported" message**
- Use Chrome, Edge, or Safari
- Ensure you're using HTTPS (required for microphone access)

**"Microphone permission denied"**
- Click the microphone icon in the address bar
- Select "Allow" for microphone access
- Refresh the page

**Recognition stops unexpectedly**
- Check your internet connection
- Ensure microphone is working properly
- Try refreshing the page

#### Performance Tips

- **Stable Internet**: Ensure good internet connection for best results
- **Quiet Environment**: Reduce background noise for better accuracy
- **Clear Speech**: Speak clearly and at normal pace
- **Proper Distance**: Stay 6-12 inches from microphone

## Customization

### Adding New Languages

To add support for additional languages, modify the language options in `index.html`:

```html
<select id="language">
    <option value="en-US">English (US)</option>
    <option value="ar-SA">العربية (Arabic)</option>
    <option value="es-ES">Español (Spanish)</option>
    <option value="fr-FR">Français (French)</option>
</select>
```

### Styling Changes

Modify `styles.css` to customize:
- Colors and themes
- Layout and spacing
- Typography and fonts
- Background gradients
- Navigation bar appearance

### Background Customization

Change the background gradient in `styles.css`:

```css
body {
    background-image: 
        radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
        linear-gradient(135deg, #your-color1 0%, #your-color2 100%);
}
```
##  Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Open an issue on GitHub
3. Ensure your browser supports Web Speech API
4. Verify microphone permissions are granted

## Recent Updates

- ✅ Added professional navigation bar with microphone icon
- ✅ Implemented gradient background with glass-morphism design
- ✅ Enhanced UI with backdrop blur effects
- ✅ Improved mobile responsiveness
- ✅ Added brand name "SpeechText Pro"

---