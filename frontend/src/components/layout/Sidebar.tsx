// src/components/layout/Sidebar.tsx
import React, { useState } from 'react';
import { Instagram, Facebook, X, Bird, Menu, X as CloseIcon } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import type { SocialNetwork } from '../../types';

const socialNetworks: { name: SocialNetwork; icon: React.ElementType }[] = [
  { name: 'instagram', icon: Instagram },
  { name: 'facebook', icon: Facebook },
  { name: 'x', icon: X },
  { name: 'tiktok', icon: () => <p className="font-bold text-2xl">♪</p> },
];

export const Sidebar = () => {
  // ¡CORRECCIÓN! Seleccionamos cada valor del store por separado.
  // Esto evita crear un nuevo objeto en cada render y detiene el bucle infinito.
  const activeNetwork = useAppStore(state => state.activeNetwork);
  const setNetwork = useAppStore(state => state.setNetwork);
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNetworkSelect = (network: SocialNetwork) => {
    setNetwork(network);
    setIsMobileMenuOpen(false);
  };

  const NavContent = () => (
    <>
      <div className="p-4 mb-4">
        <Bird className="h-10 w-10 text-blue-500" />
      </div>
      <nav className="flex flex-col items-center space-y-4">
        {socialNetworks.map(({ name, icon: Icon }) => (
          <button
            key={name}
            onClick={() => handleNetworkSelect(name)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 relative group`}
            aria-label={`Seleccionar ${name}`}
            aria-current={activeNetwork === name}
          >
            <div className={`absolute inset-0 rounded-full transition-colors ${activeNetwork === name ? 'bg-gray-200' : 'bg-transparent group-hover:bg-gray-100'}`}></div>
            <Icon className={`h-7 w-7 transition-colors z-10 ${activeNetwork === name ? 'text-gray-800' : 'text-gray-500 group-hover:text-gray-700'}`} />
            {activeNetwork === name && (
              <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-8 bg-blue-500 rounded-r-full z-10"></div>
            )}
          </button>
        ))}
      </nav>
    </>
  );

  return (
    <>
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 bg-white rounded-full shadow-lg text-gray-700">
          {isMobileMenuOpen ? <CloseIcon size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <div className={`fixed top-0 left-0 h-full bg-white shadow-xl z-40 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden w-24 border-r border-gray-200`}>
        <NavContent />
      </div>
      <aside className="hidden lg:flex flex-col w-24 bg-white border-r border-gray-200 h-screen sticky top-0">
        <NavContent />
      </aside>
    </>
  );
};