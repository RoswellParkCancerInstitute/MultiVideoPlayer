export const PREFERENCES = {
    keyboardShortcutsEnabled: 'keyboardShortcutsEnabled',
    seekStep: 'seekStep',
    volume: 'volume',
    playbackSpeed: 'playbackSpeed',
    pauseOnCopy: 'pauseOnCopy',
    timeDisplayFormat: 'timeDisplayFormat'
};

export const TIME_DISPLAY_FORMATS = {
    hmmss: 'H:mm:ss',
    ss: 'ss'
};

export const DEFAULT_PREFS = {
    keyboardShortcutsEnabled: true,
    seekStep: 10,
    volume: 100,
    playbackSpeed: 1,
    pauseOnCopy: false,
    timeDisplayFormat: TIME_DISPLAY_FORMATS.hmmss
};
