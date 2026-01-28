import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import HelpSheet from './components/common/HelpSheet';
import { Plus, X, ArrowLeft, ChevronRight, Edit3, Utensils, CheckCircle2, HelpCircle } from 'lucide-react';

const App: React.FC = () => {
  const [step, setStep] = useState<Step>('HOME');
  const [mode, setMode] = useState<Mode | null>(null);
  const [candidates, setCandidates] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState<string>('');
  const [showHelp, setShowHelp] = useState(false);

  // Presets
  const menuPresets = ['한식', '중식', '일식', '양식', '분식', '치킨', '피자', '햄버거'];

  // Logic
  const handleStartMode = (selectedMode: Mode) => {
    setMode(selectedMode);
    setInputValue(''); // Clear previous input
    if (selectedMode === 'MENU') {
      setCandidates(menuPresets);
      setStep('INPUT');
    } else if (selectedMode === 'OX') {
      const oxCandidates = ['⭕ 한다', '❌ 안 한다'];
      setCandidates(oxCandidates);
      startDecision(oxCandidates);
    } else {
      setCandidates([]);
      setStep('INPUT');
    }
  };

  const startDecision = (finalCandidates: string[]) => {
    if (finalCandidates.length < 2) return;
    setCandidates(finalCandidates);
    setStep('LOADING');
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * finalCandidates.length);
      setResult(finalCandidates[randomIndex]);
      setStep('RESULT');
      triggerConfetti();
    }, 2500);
  };

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      // Check if confetti instance is available? canvas-confetti global function usually works.
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ['#0064FF', '#E8F3FF', '#FF0000']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ['#0064FF', '#E8F3FF', '#FF0000']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const addTag = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    if (candidates.includes(trimmed)) {
      alert('이미 있는 항목이에요!');
      setInputValue(''); // Optional: clear or keep, clearing might be better to reset
      return;
    }

    setCandidates([...candidates, trimmed]);
    setInputValue('');
  };

  const removeTag = (index: number) => {
    setCandidates(candidates.filter((_, i) => i !== index));
  };

  const reset = () => {
    setStep('HOME');
    setMode(null);
    setCandidates([]);
    setResult('');
    setInputValue('');
  };

  const retry = () => {
    startDecision(candidates);
  };

  return (
    <Layout>
      <AnimatePresence mode="wait">
        {step === 'HOME' && (
          <HomeScreen
            key="home"
            onStartMode={handleStartMode}
            onOpenHelp={() => setShowHelp(true)}
          />
        )}
        {step === 'INPUT' && (
          <InputScreen
            key="input"
            onBack={() => setStep('HOME')}
            inputValue={inputValue}
            setInputValue={setInputValue}
            onAddTag={addTag}
            candidates={candidates}
            onRemoveTag={removeTag}
            onStart={() => startDecision(candidates)}
          />
        )}
        {step === 'LOADING' && (
          <LoadingScreen key="loading" />
        )}
        {step === 'RESULT' && (
          <ResultScreen
            key="result"
            result={result}
            onRetry={retry}
            onReset={reset}
          />
        )}
      </AnimatePresence>

      <HelpSheet isOpen={showHelp} onClose={() => setShowHelp(false)} />
    </Layout>
  );
};

// --- Sub-components (Extracted) ---

const ModeCard = ({ icon, title, desc, onClick }: { icon: React.ReactNode, title: string, desc: string, onClick: () => void }) => (
  <motion.button
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="flex items-center p-5 bg-toss-gray-100 rounded-[20px] text-left hover:bg-toss-gray-200 transition-colors w-full group"
  >
    <div className="w-12 h-12 bg-white rounded-[16px] flex items-center justify-center shadow-sm mr-4 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <div className="flex-1">
      <h3 className="font-bold text-lg text-toss-gray-900 mb-0.5">{title}</h3>
      <p className="text-sm text-toss-gray-500">{desc}</p>
    </div>
    <ChevronRight className="w-5 h-5 text-toss-gray-400" />
  </motion.button>
);

const HomeScreen = ({ onStartMode, onOpenHelp }: { onStartMode: (mode: Mode) => void, onOpenHelp: () => void }) => (
  <motion.main
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="flex-1 flex flex-col p-6 overflow-y-auto"
  >
    <header className="mt-8 mb-10 flex justify-between items-start">
      <div>
        <h1 className="text-3xl font-bold leading-tight mb-3">
          무엇을<br />정해드릴까요?
        </h1>
        <p className="text-toss-gray-500">결정의 신에게 운명을 맡겨보세요</p>
      </div>
      <button
        onClick={onOpenHelp}
        className="w-10 h-10 rounded-full bg-toss-gray-100 flex items-center justify-center text-toss-gray-500 hover:bg-toss-gray-200 hover:text-toss-gray-900 transition-colors"
      >
        <HelpCircle className="w-6 h-6" />
      </button>
    </header>

    <div className="flex flex-col gap-4">
      <ModeCard
        icon={<Utensils className="w-6 h-6 text-[#FF9F0A]" />}
        title="메뉴 추천"
        desc="한식, 중식, 일식 중 고민될 때"
        onClick={() => onStartMode('MENU')}
      />
      <ModeCard
        icon={<CheckCircle2 className="w-6 h-6 text-[#30D158]" />}
        title="YES or NO"
        desc="할까 말까 고민될 때"
        onClick={() => onStartMode('OX')}
      />
      <ModeCard
        icon={<Edit3 className="w-6 h-6 text-toss-blue" />}
        title="직접 입력"
        desc="원하는 후보를 직접 입력해요"
        onClick={() => onStartMode('CUSTOM')}
      />
    </div>
  </motion.main>
);

interface InputScreenProps {
  onBack: () => void;
  inputValue: string;
  setInputValue: (val: string) => void;
  onAddTag: () => void;
  candidates: string[];
  onRemoveTag: (index: number) => void;
  onStart: () => void;
}

const InputScreen = ({ onBack, inputValue, setInputValue, onAddTag, candidates, onRemoveTag, onStart }: InputScreenProps) => (
  <motion.div
    initial={{ opacity: 0, x: '100%' }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: '100%' }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
    className="flex-1 flex flex-col bg-white h-full relative"
  >
    <div className="p-4 flex items-center">
      <button onClick={onBack} className="p-2 -ml-2">
        <ArrowLeft className="w-6 h-6 text-toss-gray-900" />
      </button>
    </div>

    <div className="px-6 flex-1 flex flex-col pb-24">
      <h2 className="text-2xl font-bold mb-2">후보를 입력해주세요</h2>
      <p className="text-toss-gray-500 mb-8 text-sm">최소 2개 이상 입력해야 해요</p>

      <div className="flex gap-3 mb-6">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
              onAddTag();
            }
          }}
          placeholder="항목 입력"
          className="flex-1 px-4 py-3 bg-toss-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-toss-blue/50 transition-all font-medium"
          autoFocus
        />
        <button
          onClick={onAddTag}
          className="w-12 h-12 flex items-center justify-center bg-toss-gray-800 text-white rounded-2xl active:scale-95 transition-transform"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 content-start overflow-y-auto">
        {candidates.map((tag, idx) => (
          <motion.span
            key={`${tag}-${idx}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-2 px-4 py-2.5 bg-toss-lightBlue text-toss-blue rounded-[14px] font-medium"
          >
            {tag}
            <button onClick={() => onRemoveTag(idx)} className="text-blue-400 hover:text-blue-600">
              <X className="w-4 h-4" />
            </button>
          </motion.span>
        ))}
      </div>
    </div>

    <div className="fixed bottom-0 w-full max-w-[480px] p-6 bg-gradient-to-t from-white via-white to-transparent safe-area-bottom">
      <Button
        fullWidth
        size="lg"
        onClick={onStart}
        disabled={candidates.length < 2}
        className="shadow-lg shadow-toss-blue/20"
      >
        {candidates.length}개로 결정하기
      </Button>
    </div>
  </motion.div>
);

const LoadingScreen = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex-1 flex flex-col items-center justify-center p-6 bg-toss-gray-50"
  >
    <div className="relative">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-20 h-20 border-4 border-toss-blue/20 border-t-toss-blue rounded-full"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl">🤔</span>
      </div>
    </div>
    <h2 className="text-2xl font-bold text-toss-gray-900 mt-8 mb-2">신이 고민 중입니다...</h2>
    <p className="text-toss-gray-500">잠시만 기다려주세요</p>
  </motion.div>
);

const ResultScreen = ({ result, onRetry, onReset }: { result: string, onRetry: () => void, onReset: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white relative overflow-hidden"
  >
    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-toss-blue via-purple-500 to-toss-blue animate-pulse" />

    <motion.p
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="text-toss-blue font-bold text-lg mb-6 bg-toss-lightBlue px-4 py-1.5 rounded-full"
    >
      오늘의 운명
    </motion.p>

    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
    >
      <h1 className="text-5xl font-black mb-12 text-toss-gray-900 leading-tight break-keep">
        {result}
      </h1>
    </motion.div>

    <div className="w-full max-w-xs flex flex-col gap-3 mt-auto mb-8">
      <Button onClick={onRetry} size="lg" className="shadow-lg shadow-toss-blue/20">
        다시 돌리기
      </Button>
      <Button variant="secondary" onClick={onReset} size="lg">
        처음으로
      </Button>
    </div>
  </motion.div>
);

export default App;
