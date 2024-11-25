const UPLOAD_API_URL = 'https://hbmodels.com.ar/upload.php';
const BASE_AUDIO_URL = 'https://hbmodels.com.ar/Audios/';

export const uploadAudio = async (blob, userName) => {
  try {
    // Create a sanitized filename from the user's name
    const sanitizedName = userName
      .replace(/\s+/g, '_') // Replace spaces with underscores
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-zA-Z0-9_]/g, '') // Remove special characters
      + '.mp3';

    // Create form data
    const formData = new FormData();
    formData.append('audio', blob, sanitizedName);

    // Upload using fetch
    const response = await fetch(UPLOAD_API_URL, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Error al subir el archivo');
    }

    // Return the public URL of the uploaded file
    return `${BASE_AUDIO_URL}${sanitizedName}`;
  } catch (error) {
    console.error('Error uploading audio:', error);
    throw new Error('Error al procesar el archivo de audio');
  }
};