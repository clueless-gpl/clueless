const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  captureAndSend: (data) => ipcRenderer.invoke('capture-and-send', data),
  closeWindow: () => ipcRenderer.invoke('close-window'),
  collapseWindow: () => ipcRenderer.invoke('collapse-window'),
  expandWindow: () => ipcRenderer.invoke('expand-window'),
  onShowResponse: (callback) => ipcRenderer.on('show-response', (event, data) => callback(data)),
  onShowApiKeySetup: (callback) => ipcRenderer.on('show-api-key-setup', () => callback()),
  showAssistant: () => ipcRenderer.invoke('show-assistant'),
  setIgnoreMouseEvents: (ignore, options) => ipcRenderer.invoke('set-ignore-mouse-events', ignore, options),
  saveApiKey: (apiKey) => ipcRenderer.invoke('save-api-key', apiKey),
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
  transcribeAudio: (audioBase64) => ipcRenderer.invoke('transcribe-audio', audioBase64),
  showHistory: (history) => ipcRenderer.invoke('show-history', history),
  closeHistoryWindow: () => ipcRenderer.invoke('close-history-window'),
  updateHistoryWindow: (history) => ipcRenderer.invoke('update-history-window', history),
  onHistoryUpdate: (callback) => ipcRenderer.on('history-update', (event, data) => callback(data)),
  textToSpeech: (text) => ipcRenderer.invoke('text-to-speech', text)
});