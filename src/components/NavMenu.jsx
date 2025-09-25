import React, { useState, useEffect } from 'react';
import ElectricBorder from './ElectricBorder';

// Clean replacement for InteractiveMenu without any Game tab
const NavMenu = () => {
  const [active, setActive] = useState('home');

  const items = [
    { id: 'home', label: 'Home', icon: '🏠', color: '#3b82f6' },
    { id: 'about', label: 'About', icon: '👨‍💻', color: '#8b5cf6' },
    { id: 'profile', label: 'Profile', icon: '🎯', color: '#e91e63' },
    { id: 'projects', label: 'Projects', icon: '🛠️', color: '#10b981' },
    { id: 'contact', label: 'Contact', icon: '📧', color: '#ef4444' }
  ];

  useEffect(() => {
    const onScroll = () => {
      const order = ['home','about','projects','contact'];
      const pos = window.scrollY + 220;
      for (let i = order.length - 1; i >= 0; i--) {
        const el = document.getElementById(order[i]);
        if (el && pos >= el.offsetTop) { setActive(order[i]); break; }
      }
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => {
    setActive(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav style={{ position:'fixed', top:30, left:'50%', transform:'translateX(-50%)', zIndex:1000, padding:10 }}>
      <ElectricBorder color="#7df9ff" speed={0.8} chaos={0.3} thickness={2} style={{ borderRadius:50 }}>
        <div style={{ background:'rgba(0,0,0,0.88)', backdropFilter:'blur(18px)', borderRadius:50, padding:'14px 24px', display:'flex', gap:18, alignItems:'center' }}>
          {items.map(it => (
            <button key={it.id} onClick={() => go(it.id)}
              style={{
                background: active === it.id ? it.color : 'transparent',
                border: active === it.id ? 'none' : `1px solid ${it.color}40`,
                color: active === it.id ? '#000' : it.color,
                padding:'11px 17px', borderRadius:30, cursor:'pointer',
                display:'flex', gap:8, alignItems:'center', fontSize:'.9rem', fontWeight:500,
                transition:'all .3s ease'
              }}
              onMouseEnter={e=>{ if(active!==it.id){ e.currentTarget.style.background=`${it.color}22`; e.currentTarget.style.borderColor=it.color; }}}
              onMouseLeave={e=>{ if(active!==it.id){ e.currentTarget.style.background='transparent'; e.currentTarget.style.borderColor=`${it.color}40`; }}}
            >
              <span style={{ fontSize:'1.15rem' }}>{it.icon}</span>
              <span>{it.label}</span>
            </button>
          ))}
        </div>
      </ElectricBorder>
    </nav>
  );
};

export default NavMenu;
