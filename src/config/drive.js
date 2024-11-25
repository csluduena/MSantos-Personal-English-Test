// Using a mock upload function since we can't use Google Drive API in the browser
export const uploadAudio = async (blob) => {
  try {
    // Convert blob to base64 for demo purposes
    const base64Data = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });

    // Return a temporary URL for the audio
    return base64Data;
  } catch (error) {
    console.error('Error handling audio:', error);
    throw new Error('Error al procesar el archivo de audio');
  }
};