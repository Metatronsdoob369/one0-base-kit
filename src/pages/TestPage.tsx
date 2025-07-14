import React from 'react';
import { Button } from '@/components/ui/button';
import IconButton from '@/components/ui/IconButton';
import { playLockSound } from '@/lib/utils';

const TestPage: React.FC = () => {
  console.log('🧪 TestPage is rendering!');
  
  const MicIcon = (
    <svg viewBox="0 0 24 24" width="24" height="24">
      <path d="M12 3v10m0 0a4 4 0 0 0 4-4V7a4 4 0 0 0-8 0v2a4 4 0 0 0 4 4zm0 0v4m-4 0h8" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" fill="none" />
    </svg>
  );

  const handleTestSound = () => {
    console.log('Testing sound directly...');
    playLockSound();
  };
  
  return (
    <div style={{
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      color: 'white',
      padding: '4rem',
      textAlign: 'center',
      fontSize: '2rem',
      fontWeight: 'bold',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2rem'
    }}>
      <h1>🧪 SOUND TEST PAGE 🧪</h1>
      <p>Click the buttons below to test the lock.wav sound:</p>
      
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button 
          variant="luminescent" 
          size="lg"
          onClick={() => console.log('Button clicked!')}
        >
          Test Button with Sound
        </Button>
        
        <Button 
          variant="frosted" 
          size="lg"
          playSound={false}
          onClick={() => console.log('Silent button clicked!')}
        >
          Silent Button
        </Button>
        
        <IconButton 
          icon={MicIcon}
          onClick={() => console.log('Icon button clicked!')}
          ariaLabel="Test microphone"
        />
        
        <button 
          onClick={handleTestSound}
          style={{
            background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '8px',
            fontSize: '1.2rem',
            cursor: 'pointer'
          }}
        >
          Direct Sound Test
        </button>
      </div>
      
      <div style={{ marginTop: '2rem', fontSize: '1rem', opacity: 0.8 }}>
        <p>Check the browser console for sound-related messages</p>
        <p>Make sure your browser allows audio playback</p>
      </div>
    </div>
  );
};

export default TestPage; 