import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen w-full bg-white flex justify-center text-toss-gray-900">
            <div className="w-full max-w-[480px] min-h-screen bg-white flex flex-col relative shadow-sm">
                {children}
            </div>
        </div>
    );
};

export default Layout;
