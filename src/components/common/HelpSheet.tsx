import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Utensils, CheckCircle2, Edit3, Info } from 'lucide-react';
import Button from './Button';

interface HelpSheetProps {
    isOpen: boolean;
    onClose: () => void;
}

const HelpSheet: React.FC<HelpSheetProps> = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black z-40"
                    />

                    {/* Bottom Sheet */}
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[24px] z-50 p-6 pb-8 max-w-[480px] mx-auto shadow-2xl"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <Info className="w-6 h-6 text-toss-blue" />
                                <h2 className="text-xl font-bold">사용 설명서</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 -mr-2 text-toss-gray-400 hover:text-toss-gray-900 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#FF9F0A]/10 flex items-center justify-center shrink-0">
                                    <Utensils className="w-5 h-5 text-[#FF9F0A]" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-toss-gray-900 mb-1">메뉴 추천</h3>
                                    <p className="text-sm text-toss-gray-600 leading-relaxed">
                                        한식, 중식, 일식 등 카테고리 중에서<br />
                                        오늘 뭐 먹을지 딱 정해드려요.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#30D158]/10 flex items-center justify-center shrink-0">
                                    <CheckCircle2 className="w-5 h-5 text-[#30D158]" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-toss-gray-900 mb-1">YES or NO</h3>
                                    <p className="text-sm text-toss-gray-600 leading-relaxed">
                                        할까 말까 고민되는 순간!<br />
                                        단호하게 한다/안한다를 정해드립니다.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-toss-blue/10 flex items-center justify-center shrink-0">
                                    <Edit3 className="w-5 h-5 text-toss-blue" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-toss-gray-900 mb-1">직접 입력</h3>
                                    <p className="text-sm text-toss-gray-600 leading-relaxed">
                                        친구들과 내기할 때 사용해보세요.<br />
                                        원하는 후보들을 직접 넣고 돌리면 끝!
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <Button fullWidth onClick={onClose} size="lg">
                                확인
                            </Button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default HelpSheet;
