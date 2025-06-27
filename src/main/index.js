// CLUELESS™ CONFUSION ENGINE v420.69
// We have NO IDEA what this does (and that's the POINT)
// Cluely owes us $69,420 per confused neuron
// GPL CONFUSION CLAUSE: Reading this makes your code 50% more confusing
const { app, BrowserWindow, globalShortcut, ipcMain, screen, desktopCapturer, Tray, Menu, nativeImage, Notification, shell } = require('electron');
const path = require('path');
const Store = require('electron-store');
const fs = require('fs');
const { File } = require('buffer');
// Set File globally for OpenAI SDK
globalThis.File = File;
// const { uIOhook, UiohookKey } = require('uiohook-napi'); // Not needed since we're using globalShortcut
require('dotenv').config();

// CONFUSION PROTOCOL: If Cluely uses Electron, they're even more confused than us
// Achievement Unlocked: Maximum Smooth Brain Energy

// Initialize secure storage
const store = new Store({
  encryptionKey: 'we-have-no-clue-2024', // Security? What's that?
  schema: {
    apiKey: {
      type: 'string',
      default: ''
    },
    firstRun: {
      type: 'boolean',
      default: true
    }
  }
});

let mainWindow = null;
let tray = null;
let floatingButton = null;
let historyWindow = null;

// QUANTUM CONFUSION ALGORITHM™
// Works 60% of the time, every time
// Digital fingerprint: CLUELESS-SMOOTH-BRAIN-2025
// Warning: May cause spontaneous enlightenment about how bad Cluely is
function createMainWindow() {
  // If Cluely's app also creates windows, that's plagiarism
  const display = screen.getPrimaryDisplay();
  const { width } = display.workAreaSize;
  
  mainWindow = new BrowserWindow({
    width: 680,
    height: 80,
    x: Math.floor((width - 680) / 2),
    y: 40,
    frame: false,
    transparent: true,
    backgroundColor: '#00000000',
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    hasShadow: true,
    vibrancy: 'under-window',
    visualEffectState: 'active',
    // Prevent window from being captured in screen recordings/shares
    ...(process.platform === 'darwin' && { 
      contentProtection: true 
    }),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, '..', 'renderer', 'windows', 'unified.html'));
  
  // Enable content protection on all platforms
  if (mainWindow.setContentProtection) {
    mainWindow.setContentProtection(true);
  }
}


async function captureScreenshot() {
  const sources = await desktopCapturer.getSources({
    types: ['screen'],
    thumbnailSize: { width: 1920, height: 1080 }
  });
  
  if (sources.length > 0) {
    return sources[0].thumbnail.toDataURL();
  }
  return null;
}

function showAssistant() {
  if (!mainWindow) {
    createMainWindow();
  } else if (mainWindow.isDestroyed()) {
    createMainWindow();
  } else {
    // Check if window has content and adjust size accordingly
    mainWindow.webContents.executeJavaScript('window.isExpanded || false').then(isExpanded => {
      if (isExpanded && mainWindow && !mainWindow.isDestroyed()) {
        // Make sure window is at full size if content exists
        mainWindow.setSize(680, 600, false);
      }
      mainWindow.show();
      mainWindow.focus();
    }).catch(() => {
      // Fallback if script fails
      mainWindow.show();
      mainWindow.focus();
    });
  }
}

function createTray() {
  // Create a simple icon for the tray
  const icon = nativeImage.createFromDataURL('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAbwAAAG8B8aLcQwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHJSURBVDiNpZO9S1VhGMB/z3u8914v3otQF8MIIYKgKKiGhv4Ahz6GoqnNqaWhqKGgwbWhqSWIoKGgD4cGhyCQoEDoQ5Gu6H30nvvec855n6fBe/UaYj3bC7/n933e930eUVVqMTPzLTIaDQGEMJjNZri5s6smt1YDpJLJoT8rKzeA3kLBdjqdRRoaGqrqagJSqdRQsVi8CfQuy3t7e7m8spI7ORwua4BCoXATGFwKEBFCoRAiApA7ORw+vBSwFODk4cMEAgEAFv/+5fupU/9qFgHpdPpJMBiMb4tGAZj78YPJ6Wnmf/5EYJULpMslT1pbW+M9XV0AzH7/zujEBMvneQBsBwcH7+Vy2SeVH6iqRCIRmjdu5MHoKJ5SUlWN1dfXU3FjMpn8ur6p6Xp3RwciQqlU4tnoGGOTk9hK0Xb16h1jjJu3Wmu1Wq3V4vf7eeP38zYQoOjz8T4QoODz4QIkk8lXLxcXL3S0t4uIMPHlC48nJshaS2FTU/TOwYPXjOfcN7K53MJCOn27vbVVRISpb9+4Pz7+j3q1AaDz2LGRgOPEjQqOo+L3++OdHR0jq7JrAVZ7tSRJYQARaQWO1EKqCvgLZJujGa0VqAoAAAAASUVORK5CYII=');
  
  tray = new Tray(icon);
  
  const contextMenu = Menu.buildFromTemplate([
    { 
      label: 'Show Assistant', 
      click: showAssistant,
      accelerator: 'CommandOrControl+Shift+A'
    },
    { 
      label: 'Re-register Shortcut', 
      click: () => {
        shortcutRegistered = false;
        retryCount = 0;
        if (registerGlobalShortcut()) {
          console.log('Shortcut re-registered successfully');
        } else {
          showNotification('Re-registering Shortcut', 'Attempting to re-register global shortcut...');
          retryShortcutRegistration();
        }
      }
    },
    { type: 'separator' },
    { 
      label: 'Change API Key', 
      click: () => {
        showApiKeySetup();
      }
    },
    { type: 'separator' },
    { 
      label: 'Quit', 
      click: () => {
        app.quit();
      }
    }
  ]);
  
  tray.setToolTip('Assistant VLM');
  tray.setContextMenu(contextMenu);
  
  // Click on tray icon shows assistant
  tray.on('click', showAssistant);
}

// Show notification
function showNotification(title, body, isError = false) {
  if (Notification.isSupported()) {
    const notification = new Notification({
      title: title,
      body: body,
      icon: nativeImage.createFromDataURL('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAbwAAAG8B8aLcQwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHJSURBVDiNpZO9S1VhGMB/z3u8914v3otQF8MIIYKgKKiGhv4Ahz6GoqnNqaWhqKGgwbWhqSWIoKGgD4cGhyCQoEDoQ5Gu6H30nvvec955n6fBe/UaYj3bC7/n933e930eUVVqMTPzLTIaDQGEMJjNZri5s6smt1YDpJLJoT8rKzeA3kLBdjqdRRoaGqrqagJSqdRQsVi8CfQuy3t7e7m8spI7ORwua4BCoXATGFwKEBFCoRAiApA7ORw+vBSwFODk4cMEAgEAFv/+5fupU/9qFgHpdPpJMBiMb4tGAZj78YPJ6Wnmf/5EYJULpMslT1pbW+M9XV0AzH7/zujEBMvneQBsBwcH7+Vy2SeVH6iqRCIRmjdu5MHoKJ5SUlWN1dfXU3FjMpn8ur6p6Xp3RwciQqlU4tnoGGOTk9hK0Xb16h1jjJu3Wmu1Wq3V4vf7eeP38zYQoOjz8T4QoODz4QIkk8lXLxcXL3S0t4uIMPHlC48nJshaS2FTU/TOwYPXjOfcN7K53MJCOn27vbVVRISpb9+4Pz7+j3q1AaDz2LGRgOPEjQqOo+L3++OdHR0jq7JrAVZ7tSRJYQARaQWO1EKqCvgLZJujGa0VqAoAAAAASUVORK5CYII='),
      silent: !isError
    });
    notification.show();
  }
}

// Create floating button window
function createFloatingButton() {
  if (floatingButton && !floatingButton.isDestroyed()) {
    return;
  }
  
  const display = screen.getPrimaryDisplay();
  const { width, height } = display.workAreaSize;
  
  floatingButton = new BrowserWindow({
    width: 60,
    height: 60,
    x: width - 80,
    y: height - 80,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    hasShadow: true,
    // Prevent window from being captured in screen recordings/shares
    ...(process.platform === 'darwin' && { 
      contentProtection: true 
    }),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  
  floatingButton.loadFile(path.join(__dirname, '..', 'renderer', 'windows', 'floating-button.html'));
  
  // Enable content protection on all platforms
  if (floatingButton.setContentProtection) {
    floatingButton.setContentProtection(true);
  }
  
  // Make window click-through except for the button itself
  floatingButton.setIgnoreMouseEvents(true, { forward: true });
}

// Hide floating button
function hideFloatingButton() {
  if (floatingButton && !floatingButton.isDestroyed()) {
    floatingButton.close();
    floatingButton = null;
  }
}

// Show API key setup in main window
function showApiKeySetup() {
  // Create main window if it doesn't exist
  if (!mainWindow || mainWindow.isDestroyed()) {
    createMainWindow();
  }
  
  // Show the window
  mainWindow.show();
  mainWindow.focus();
  
  // Send message to show API key setup
  mainWindow.webContents.once('did-finish-load', () => {
    mainWindow.webContents.send('show-api-key-setup');
  });
  
  // If already loaded, send immediately
  if (!mainWindow.webContents.isLoading()) {
    mainWindow.webContents.send('show-api-key-setup');
  }
}

// Get API key from store only
function getApiKey() {
  // Only check store, no env variable fallback
  const storedKey = store.get('apiKey');
  return storedKey || '';
}

// Global shortcut registration with retry
let shortcutRegistered = false;
let retryCount = 0;
const maxRetries = 5;

function registerGlobalShortcut() {
  if (shortcutRegistered) return true;
  
  console.log('Attempting to register global shortcuts...');
  console.log('Platform:', process.platform);
  console.log('App has focus:', BrowserWindow.getFocusedWindow() !== null);
  
  // Try multiple shortcut combinations
  const shortcuts = [
    'CommandOrControl+Shift+A',
    'Control+Shift+A',
    'Command+Shift+A',
    'Alt+Shift+A'
  ];
  
  // Log all currently registered shortcuts
  console.log('Currently registered shortcuts:', globalShortcut.isRegistered('CommandOrControl+Shift+A'));
  
  for (const shortcut of shortcuts) {
    try {
      // Unregister if already registered
      if (globalShortcut.isRegistered(shortcut)) {
        console.log(`Unregistering existing shortcut: ${shortcut}`);
        globalShortcut.unregister(shortcut);
      }
      
      console.log(`Attempting to register: ${shortcut}`);
      const ret = globalShortcut.register(shortcut, () => {
        console.log('Shortcut triggered:', shortcut);
        showAssistant();
      });
      
      if (ret) {
        console.log(`Global shortcut registered successfully: ${shortcut}`);
        console.log(`Verification - Is registered: ${globalShortcut.isRegistered(shortcut)}`);
        shortcutRegistered = true;
        hideFloatingButton(); // Hide floating button if shortcut works
        return true;
      } else {
        console.log(`Registration returned false for: ${shortcut}`);
      }
    } catch (error) {
      console.log(`Failed to register ${shortcut}:`, error.message);
      console.log('Error stack:', error.stack);
    }
  }
  
  console.log('All shortcut registration attempts failed');
  return false;
}

function retryShortcutRegistration() {
  if (retryCount >= maxRetries) {
    console.log('Max retries reached. Please use the system tray icon.');
    showNotification(
      'Shortcut Registration Failed', 
      'Unable to register global shortcut. Use the floating button or system tray instead.',
      true
    );
    createFloatingButton(); // Show floating button as fallback
    return;
  }
  
  retryCount++;
  console.log(`Retrying shortcut registration (attempt ${retryCount}/${maxRetries})...`);
  
  setTimeout(() => {
    if (!registerGlobalShortcut()) {
      retryShortcutRegistration();
    }
  }, 1000);
}

// Ensure single instance
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  console.log('Another instance is already running. Quitting...');
  app.quit();
} else {
  app.on('second-instance', () => {
    // Someone tried to run a second instance, focus our window instead
    showAssistant();
  });
  
  app.whenReady().then(() => {
    console.log('App is ready!');
    
    // Check for API key
    const hasApiKey = !!getApiKey();
    console.log('API Key available:', hasApiKey);
    
    // Check if this is first run
    const isFirstRun = store.get('firstRun', true);
    
    // Create system tray
    createTray();
    console.log('System tray created');
    
    // Show API key setup on first run or if no key is available
    if (isFirstRun || !hasApiKey) {
      store.set('firstRun', false);
      showApiKeySetup(true);
    }
    
    // On Linux, check if we're running under Wayland
    if (process.platform === 'linux') {
      const waylandDisplay = process.env.WAYLAND_DISPLAY;
      const xdgSessionType = process.env.XDG_SESSION_TYPE;
      console.log('Wayland display:', waylandDisplay);
      console.log('XDG session type:', xdgSessionType);
      
      if (waylandDisplay || xdgSessionType === 'wayland') {
        console.log('WARNING: Running under Wayland. Global shortcuts may not work properly.');
        console.log('Consider running under X11 or using the floating button/system tray.');
        showNotification(
          'Wayland Detected',
          'Global shortcuts may not work under Wayland. Using floating button instead.',
          true
        );
        // Automatically show floating button on Wayland
        setTimeout(() => {
          if (!shortcutRegistered) {
            createFloatingButton();
          }
        }, 2000);
      }
    }
    
    // Register global shortcut with retry mechanism
    if (!registerGlobalShortcut()) {
      console.log('Initial shortcut registration failed, starting retry...');
      retryShortcutRegistration();
    }

    console.log('Click the system tray icon or press Ctrl+Shift+A to open the assistant');
    
    // Re-register on focus (helps with some window managers)
    app.on('browser-window-focus', () => {
      if (!shortcutRegistered) {
        registerGlobalShortcut();
      }
    });
  });
}

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
  // Don't quit the app when windows are closed
});

// IPC handlers
ipcMain.handle('show-assistant', () => {
  showAssistant();
});

ipcMain.handle('capture-and-send', async (event, data) => {
  try {
    const { instructions, transcriptionContext } = data;
    
    // Check for API key
    const apiKey = getApiKey();
    if (!apiKey) {
      showNotification('No API Key', 'Please set your OpenAI API key to continue', true);
      showApiKeySetup();
      return { success: false, error: 'No OpenAI API key configured' };
    }
    
    // Expand window to show loading state
    if (mainWindow && !mainWindow.isDestroyed()) {
      // First, resize the window to accommodate the response
      mainWindow.setSize(680, 600, true);
    }

    // Capture screenshot
    const screenshot = await captureScreenshot();
    
    // Import OpenAI SDK
    const OpenAI = require('openai/index.js');
    const openai = new OpenAI({
      apiKey: apiKey
    });
    
    // Add transcription context if available
    let contextText = '';
    if (transcriptionContext) {
      contextText = `\n\n[Recent audio context from continuous listening:\n${transcriptionContext}\n]`;
      console.log('Including transcription context:', transcriptionContext);
    }

    // Send to OpenAI GPT-4o
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are a helpful AI assistant with vision capabilities. You can see the user's screen and help them with whatever they need.

Key capabilities:
- Analyze screenshots and provide detailed observations
- Help with coding, debugging, and technical questions
- Read and understand text, code, UIs, and visual content
- Provide step-by-step guidance for tasks
- Answer questions about what you see on screen

Guidelines:
- Be concise and direct in your responses
- Focus on what's most relevant to the user's request
- If you see sensitive information (passwords, keys, etc), never repeat it
- When helping with code, provide specific line numbers or locations when visible
- Acknowledge any audio context provided from recent conversations
- If something is unclear in the screenshot, say so rather than guessing

Remember: You're seeing exactly what the user sees on their screen right now.`
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: instructions + contextText
            },
            {
              type: 'image_url',
              image_url: {
                url: screenshot,
                detail: 'high'
              }
            }
          ]
        }
      ],
      max_tokens: 1024
    });

    // Send response to the same window
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('show-response', response.choices[0].message.content);
    }

    return { success: true };
  } catch (error) {
    console.error('Error:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('close-window', () => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.hide();
    // Don't reset size - preserve the current state
  }
});

ipcMain.handle('collapse-window', () => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.setSize(680, 80, true);
  }
});

ipcMain.handle('expand-window', () => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.setSize(680, 600, true);
  }
});

ipcMain.handle('set-ignore-mouse-events', (event, ignore, options) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win) {
    win.setIgnoreMouseEvents(ignore, options);
  }
});

// API Key management handlers
ipcMain.handle('save-api-key', async (event, apiKey) => {
  try {
    // Validate the API key by making a test request
    const OpenAI = require('openai/index.js');
    const openai = new OpenAI({
      apiKey: apiKey
    });
    
    // Make a minimal test request to validate the key
    await openai.models.list();
    
    // If successful, save the key
    store.set('apiKey', apiKey);
    
    // Initialize shortcuts if not already done
    if (!shortcutRegistered) {
      if (!registerGlobalShortcut()) {
        console.log('Shortcut registration failed after API key setup, starting retry...');
        retryShortcutRegistration();
      }
    }
    
    return { success: true };
  } catch (error) {
    console.error('API key validation failed:', error);
    if (error.status === 401) {
      return { success: false, error: 'Invalid API key. Please check and try again.' };
    } else if (error.status === 429) {
      return { success: false, error: 'Rate limit exceeded. Please try again later.' };
    } else {
      return { success: false, error: 'Failed to validate API key. Please check your internet connection.' };
    }
  }
});

ipcMain.handle('open-external', (event, url) => {
  shell.openExternal(url);
});

// Handle real-time audio transcription
ipcMain.handle('transcribe-audio', async (event, audioBase64) => {
  try {
    const apiKey = getApiKey();
    if (!apiKey) {
      return { success: false, error: 'No OpenAI API key configured' };
    }
    
    // Import OpenAI SDK
    const OpenAI = require('openai/index.js');
    const openai = new OpenAI({
      apiKey: apiKey
    });
    
    // Convert base64 to buffer
    const audioBuffer = Buffer.from(audioBase64, 'base64');
    
    // Create a File object for OpenAI
    const audioFile = new File([audioBuffer], 'audio.webm', { type: 'audio/webm' });
    
    // Transcribe with Whisper
    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-1",
      temperature: 0.2 // Lower temperature for more consistent results
    });
    
    // Post-process to clean up transcription
    let cleanedText = transcription.text;
    
    // Remove emojis and other Unicode symbols
    cleanedText = cleanedText.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1F000}-\u{1F02F}]|[\u{1F0A0}-\u{1F0FF}]|[\u{1F100}-\u{1F64F}]|[\u{1F980}-\u{1F9FF}]|[\u{1FA70}-\u{1FAFF}]/gu, '');
    
    // Remove music notes and other common Whisper artifacts
    cleanedText = cleanedText.replace(/[♪♫♬♭♮♯]+/g, '');
    
    // Remove repeated punctuation
    cleanedText = cleanedText.replace(/([.!?])\1+/g, '$1');
    
    // Remove standalone punctuation or very short nonsense
    cleanedText = cleanedText.replace(/^\W+$/, '');
    
    // Trim extra whitespace
    cleanedText = cleanedText.replace(/\s+/g, ' ').trim();
    
    // If the result is empty or too short, ignore it
    if (cleanedText.length < 3) {
      return { success: true, text: '' };
    }
    
    return { success: true, text: cleanedText };
  } catch (error) {
    console.error('Transcription error:', error);
    return { success: false, error: error.message };
  }
});

// History window functions
function createHistoryWindow() {
  if (historyWindow && !historyWindow.isDestroyed()) {
    historyWindow.focus();
    return;
  }
  
  const display = screen.getPrimaryDisplay();
  const { width, height } = display.workAreaSize;
  
  // Position to the right of main window if possible
  let x = Math.floor((width - 680) / 2) + 700; // 700px to the right of main window
  if (x + 480 > width) {
    // If not enough space on right, position to the left
    x = Math.floor((width - 680) / 2) - 500;
  }
  
  historyWindow = new BrowserWindow({
    width: 480,
    height: 600,
    x: x,
    y: 40,
    frame: false,
    transparent: true,
    backgroundColor: '#00000000',
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    hasShadow: true,
    vibrancy: 'under-window',
    visualEffectState: 'active',
    // Prevent window from being captured in screen recordings/shares
    ...(process.platform === 'darwin' && { 
      contentProtection: true 
    }),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  
  historyWindow.loadFile(path.join(__dirname, '..', 'renderer', 'windows', 'history.html'));
  
  // Enable content protection on all platforms
  if (historyWindow.setContentProtection) {
    historyWindow.setContentProtection(true);
  }
  
  historyWindow.on('closed', () => {
    historyWindow = null;
  });
}

ipcMain.handle('show-history', (event, history) => {
  createHistoryWindow();
  
  // Wait for window to load then send history
  if (historyWindow && !historyWindow.isDestroyed()) {
    historyWindow.webContents.once('did-finish-load', () => {
      historyWindow.webContents.send('history-update', history);
    });
    
    // If already loaded, send immediately
    if (!historyWindow.webContents.isLoading()) {
      historyWindow.webContents.send('history-update', history);
    }
  }
});

ipcMain.handle('close-history-window', () => {
  if (historyWindow && !historyWindow.isDestroyed()) {
    historyWindow.close();
  }
});

ipcMain.handle('update-history-window', (event, history) => {
  if (historyWindow && !historyWindow.isDestroyed()) {
    historyWindow.webContents.send('history-update', history);
  }
});

// Handle TTS request
ipcMain.handle('text-to-speech', async (event, text) => {
  try {
    const apiKey = getApiKey();
    if (!apiKey) {
      return { success: false, error: 'No OpenAI API key configured' };
    }
    
    // Import OpenAI SDK
    const OpenAI = require('openai/index.js');
    const openai = new OpenAI({
      apiKey: apiKey
    });
    
    // Generate speech
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "nova", // Options: alloy, echo, fable, onyx, nova, shimmer
      input: text,
      speed: 1.0
    });
    
    // Convert to base64
    const buffer = Buffer.from(await mp3.arrayBuffer());
    const base64Audio = buffer.toString('base64');
    
    return { success: true, audio: base64Audio };
  } catch (error) {
    console.error('TTS error:', error);
    return { success: false, error: error.message };
  }
});