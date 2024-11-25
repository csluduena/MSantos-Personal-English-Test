import { useState } from 'react';
import LandingPage from './components/LandingPage';
import UserForm from './components/UserForm';
import Test from './components/Test';
import Results from './components/Results';

function App() {
  const [stage, setStage] = useState('landing');
  const [userData, setUserData] = useState(null);
  const [testResults, setTestResults] = useState(null);

  const handleStart = () => {
    setStage('userForm');
  };

  const handleUserSubmit = (data) => {
    setUserData(data);
    setStage('test');
  };

  const handleTestComplete = (score, answers) => {
    setTestResults({ score, answers });
    setStage('results');
  };

  return (
    <div>
      {stage === 'landing' && <LandingPage onStart={handleStart} />}
      {stage === 'userForm' && <UserForm onSubmit={handleUserSubmit} />}
      {stage === 'test' && <Test onComplete={handleTestComplete} userData={userData} />}
      {stage === 'results' && <Results score={testResults.score} answers={testResults.answers} userData={userData} />}
    </div>
  );
}

export default App;