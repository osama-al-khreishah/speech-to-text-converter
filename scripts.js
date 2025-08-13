const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const clearBtn = document.getElementById('clearBtn');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');
const transcriptDiv = document.getElementById('transcript');
const statusDiv = document.getElementById('status');
const wordCountDiv = document.getElementById('wordCount');
const languageSelect = document.getElementById('language');
const browserWarning = document.getElementById('browserWarning');

// speech recognition variables
let recognition = null;
let isRecording = false;
let finalTranscript = '';
let interimTranscript = '';

// check browser support and initialize
function initializeSpeechRecognition() {
// check if browser supports Speech Recognition
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        browserWarning.classList.remove('hidden');
        startBtn.disabled = true;
        updateStatus('Browser not supported', 'error');
        return false;
    }

// initialize Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();

// configuration
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = languageSelect.value;

// event handlers
    recognition.onstart = handleRecognitionStart;
    recognition.onresult = handleRecognitionResult;
    recognition.onerror = handleRecognitionError;
    recognition.onend = handleRecognitionEnd;

    return true;
}

// event Handlers
function handleRecognitionStart() {
    isRecording = true;
    updateStatus('Listening...', 'recording');
    startBtn.disabled = true;
    stopBtn.disabled = false;
    startBtn.classList.add('recording');
}

function handleRecognitionResult(event) {
    interimTranscript = '';
    
    for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        
        if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
        } else {
            interimTranscript += transcript;
        }
    }
    
// update display
    updateTranscriptDisplay();
    updateWordCount();
}

function handleRecognitionError(event) {
    console.error('Speech recognition error:', event.error);
    
    let errorMessage = 'Recognition error';
    switch (event.error) {
        case 'no-speech':
            errorMessage = 'No speech detected';
            break;
        case 'audio-capture':
            errorMessage = 'Microphone not accessible';
            break;
        case 'not-allowed':
            errorMessage = 'Microphone permission denied';
            break;
        case 'network':
            errorMessage = 'Network error';
            break;
        default:
            errorMessage = `Error: ${event.error}`;
    }
    
    updateStatus(errorMessage, 'error');
    stopRecording();
}

function handleRecognitionEnd() {
    if (isRecording) {
        // restart recognition if it was stopped unexpectedly
        try {
            recognition.start();
        } catch (error) {
            console.log('Recognition restart failed:', error);
            stopRecording();
        }
    }
}

// control Functions
async function startRecording() {
    try {
        // request microphone permission
        await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // initialize or restart recognition
        if (!recognition) {
            if (!initializeSpeechRecognition()) {
                return;
            }
        }
        
        recognition.lang = languageSelect.value;
        recognition.start();
        
    } catch (error) {
        console.error('Error accessing microphone:', error);
        updateStatus('Microphone access denied', 'error');
    }
}

function stopRecording() {
    if (recognition && isRecording) {
        isRecording = false;
        recognition.stop();
    }
    
    updateStatus('Recording stopped', 'ready');
    startBtn.disabled = false;
    stopBtn.disabled = true;
    startBtn.classList.remove('recording');
    
    // finalize transcript
    if (interimTranscript) {
        finalTranscript += interimTranscript;
        interimTranscript = '';
        updateTranscriptDisplay();
        updateWordCount();
    }
}

function clearTranscript() {
    finalTranscript = '';
    interimTranscript = '';
    updateTranscriptDisplay();
    updateWordCount();
    updateStatus('Transcript cleared', 'ready');
}

function copyToClipboard() {
    const text = finalTranscript.trim();
    if (!text) {
        updateStatus('No text to copy', 'error');
        return;
    }
    
    navigator.clipboard.writeText(text).then(() => {
        updateStatus('Text copied to clipboard', 'ready');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        updateStatus('Text copied to clipboard', 'ready');
    });
}

function downloadTranscript() {
    const text = finalTranscript.trim();
    if (!text) {
        updateStatus('No text to download', 'error');
        return;
    }
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transcript_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    updateStatus('Transcript downloaded', 'ready');
}

// UI transitions 
function updateTranscriptDisplay() {
    const displayText = finalTranscript + interimTranscript;
    transcriptDiv.textContent = displayText;
    
    // update text direction based on language
    const isArabic = languageSelect.value.startsWith('ar');
    transcriptDiv.className = isArabic ? 'arabic' : '';
    
    // auto-scroll to bottom
    transcriptDiv.scrollTop = transcriptDiv.scrollHeight;
}

function updateWordCount() {
    const text = finalTranscript.trim();
    const wordCount = text ? text.split(/\s+/).length : 0;
    wordCountDiv.textContent = `Words: ${wordCount}`;
}

function updateStatus(message, type) {
    const statusSpan = statusDiv.querySelector('span');
    statusSpan.textContent = message;
    
    // remove all status classes
    statusSpan.classList.remove('status-ready', 'status-recording', 'status-processing', 'status-error');
    
    // add appropriate status class
    statusSpan.classList.add(`status-${type}`);
}

// event Listeners
startBtn.addEventListener('click', startRecording);
stopBtn.addEventListener('click', stopRecording);
clearBtn.addEventListener('click', clearTranscript);
copyBtn.addEventListener('click', copyToClipboard);
downloadBtn.addEventListener('click', downloadTranscript);

// anguage change handler
languageSelect.addEventListener('change', () => {
    if (recognition) {
        recognition.lang = languageSelect.value;
    }
    updateTranscriptDisplay(); // Update text direction
    
    // if recording, restart with new language
    if (isRecording) {
        stopRecording();
        setTimeout(startRecording, 500);
    }
});

// seyboard shortcuts
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey || event.metaKey) {
        switch (event.key.toLowerCase()) {
            case 'r':
                event.preventDefault();
                if (!isRecording) {
                    startRecording();
                } else {
                    stopRecording();
                }
                break;
            case 'c':
                if (event.shiftKey) {
                    event.preventDefault();
                    clearTranscript();
                }
                break;
        }
    }
    
    // space bar to start/stop recording
    if (event.code === 'Space' && event.target === document.body) {
        event.preventDefault();
        if (!isRecording) {
            startRecording();
        } else {
            stopRecording();
        }
    }
});

// initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeSpeechRecognition();
    updateWordCount();
});

// prevent page refresh on space bar
window.addEventListener('keydown', (e) => {
    if (e.keyCode === 32 && e.target === document.body) {
        e.preventDefault();
    }
});