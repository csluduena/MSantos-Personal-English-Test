import React, { useState, useRef } from 'react';

const AudioRecorder = ({ onRecordingComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const mediaRecorder = useRef(null);
  const timerInterval = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus',
        audioBitsPerSecond: 32000 // Lower bitrate for smaller file size
      });
      const chunks = [];

      mediaRecorder.current.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        onRecordingComplete(blob);
      };

      mediaRecorder.current.start(1000); // Record in 1-second chunks
      setIsRecording(true);
      
      timerInterval.current = setInterval(() => {
        setDuration(prev => {
          if (prev >= 120) { // 2 minutes max
            stopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
      clearInterval(timerInterval.current);
      setIsRecording(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isValidDuration = duration >= 30; // 30 seconds minimum

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-xl font-semibold">
        {formatTime(duration)}
      </div>
      
      {!isRecording && duration === 0 && (
        <button
          onClick={startRecording}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Comenzar Grabación
        </button>
      )}

      {isRecording && (
        <button
          onClick={stopRecording}
          disabled={!isValidDuration}
          className={`px-6 py-2 rounded-lg ${
            isValidDuration 
              ? 'bg-red-600 text-white hover:bg-red-700' 
              : 'bg-gray-400 text-gray-200'
          }`}
        >
          {isValidDuration ? 'Detener Grabación' : `Espera ${formatTime(30 - duration)}`}
        </button>
      )}

      {isRecording && (
        <p className="text-sm text-gray-600">
          {duration < 30 
            ? 'Mínimo 30 segundos de grabación'
            : duration >= 120 
              ? 'Tiempo máximo alcanzado'
              : 'Máximo 2 minutos de grabación'}
        </p>
      )}
    </div>
  );
};

export default AudioRecorder;