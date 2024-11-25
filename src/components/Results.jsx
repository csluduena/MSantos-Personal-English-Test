import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailjs';
import AudioRecorder from './AudioRecorder';
import { questions } from '../data/questions';
import { uploadAudio } from '../config/upload';

const Results = ({ score, userData, answers }) => {
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const getLevel = (score) => {
    if (score >= 35) return { level: 'C2', message: '¡Excepcional! Estás en el nivel Proficiente, listo para cualquier entrevista.' };
    if (score >= 30) return { level: 'C1', message: '¡Impresionante! Estás en el nivel Avanzado; puedes manejar con confianza preguntas complejas de entrevista.' };
    if (score >= 22) return { level: 'B2', message: '¡Bien hecho! Estás en el nivel Intermedio Alto, bien preparado para la mayoría de los escenarios de entrevista.' };
    if (score >= 15) return { level: 'B1', message: '¡Buen trabajo! Estás en el nivel Intermedio; ¡sigue mejorando!' };
    if (score >= 8) return { level: 'A2', message: '¡Continúa así! Estás en el nivel Elemental; algo de preparación te hará más fuerte.' };
    return { level: 'A1', message: '¡Gran comienzo! Estás en el nivel Principiante; concéntrate en lo básico para aumentar tu confianza.' };
  };

  const formatAnswers = () => {
    return answers.map((answer, index) => {
      const question = questions[index];
      const selectedOption = question.options.find(opt => opt.score === answer);
      return `${index + 1}: ${selectedOption.text} (${selectedOption.type})`;
    }).join('\n');
  };

  const sendTestResults = async (audioUrl) => {
    try {
      // Crear un mensaje formateado para el audio
      const audioMessage = `\n\nGrabación de audio del estudiante:\n${audioUrl}`;

      const templateParams = {
        to_email: 'onlinewithmaca@gmail.com',
        subject: `RESULTADO TEST "${userData.name}"`,
        user_name: userData.name,
        user_email: userData.email,
        score: score,
        level: getLevel(score).level,
        answers: formatAnswers(),
        audio_url: audioUrl
      };

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );
      return true;
    } catch (error) {
      console.error('Error sending test results:', error);
      setError('Error al enviar los resultados del test');
      return false;
    }
  };

  const handleAudioRecorded = async (blob) => {
    setError(null);
    setIsUploading(true);
    
    try {
      // Upload audio to server
      const audioUrl = await uploadAudio(blob, userData.name);
      
      // Send test results with audio URL
      const testResultsSent = await sendTestResults(audioUrl);
      if (!testResultsSent) {
        throw new Error('Error al enviar los resultados del test');
      }

      setEmailSent(true);
    } catch (error) {
      console.error('Error in submission process:', error);
      setError(error.message || 'Error al procesar la grabación');
    } finally {
      setIsUploading(false);
    }
  };

  const result = getLevel(score);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">¡Test Completado!</h2>
        <div className="mb-6">
          <p className="text-xl font-semibold mb-2">Tu nivel de inglés: {result.level}</p>
          <p className="text-gray-700">{result.message}</p>
        </div>
        
        {!emailSent && (
          <div className="mt-8">
            <p className="text-lg mb-4">Para finalizar, cuéntanos sobre tu experiencia laboral y habilidades en un mensaje de voz.</p>
            <AudioRecorder onRecordingComplete={handleAudioRecorded} />
          </div>
        )}

        {isUploading && (
          <div className="text-blue-600 mt-4">
            Subiendo audio y enviando resultados...
          </div>
        )}

        {error && (
          <div className="text-red-600 mt-4">
            {error}
          </div>
        )}

        {emailSent && (
          <div className="text-gray-600 mt-6">
            <p>¡Gracias por completar el test!</p>
            <p>Hemos recibido tus respuestas y tu mensaje de voz.</p>
            <p>Sigue practicando y mejorando tu inglés.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;