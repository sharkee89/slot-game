export const playAudio = (audioFileUrl: string, audio): void => {
    audio.src = audioFileUrl;
    audio.load();
    audio.play();
};
