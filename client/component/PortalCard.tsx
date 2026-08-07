import Link from 'next/link';
import { ReactNode } from 'react';

interface PortalCardProps {
  href: string;
  title: string;
  description: string;
  icon: ReactNode;
  theme?: 'blue' | 'purple' | 'emerald' | 'pink' | 'amber';
}

const themeStyles = {
  blue: {
    hoverShadow: 'hover:shadow-blue-500/10',
    bubbleGradient: 'from-blue-100',
    iconBgGradient: 'from-blue-500 to-cyan-400',
    iconShadow: 'shadow-cyan-500/30',
    iconRotate: 'group-hover:rotate-3',
    titleHover: 'group-hover:text-blue-600',
    textColor: 'text-blue-600',
  },
  purple: {
    hoverShadow: 'hover:shadow-purple-500/10',
    bubbleGradient: 'from-purple-100',
    iconBgGradient: 'from-indigo-500 to-purple-600',
    iconShadow: 'shadow-purple-500/30',
    iconRotate: 'group-hover:-rotate-3',
    titleHover: 'group-hover:text-purple-600',
    textColor: 'text-purple-600',
  },
  emerald: {
    hoverShadow: 'hover:shadow-emerald-500/10',
    bubbleGradient: 'from-emerald-100',
    iconBgGradient: 'from-emerald-500 to-teal-400',
    iconShadow: 'shadow-teal-500/30',
    iconRotate: 'group-hover:-rotate-3',
    titleHover: 'group-hover:text-emerald-600',
    textColor: 'text-emerald-600',
  },
  pink: {
    hoverShadow: 'hover:shadow-pink-500/10',
    bubbleGradient: 'from-pink-100',
    iconBgGradient: 'from-pink-500 to-rose-500',
    iconShadow: 'shadow-pink-500/30',
    iconRotate: 'group-hover:rotate-3',
    titleHover: 'group-hover:text-pink-600',
    textColor: 'text-pink-600',
  },
  amber: {
    hoverShadow: 'hover:shadow-amber-500/10',
    bubbleGradient: 'from-amber-100',
    iconBgGradient: 'from-amber-500 to-orange-400',
    iconShadow: 'shadow-orange-500/30',
    iconRotate: 'group-hover:rotate-3',
    titleHover: 'group-hover:text-amber-600',
    textColor: 'text-amber-600',
  }
};

export default function PortalCard({ href, title, description, icon, theme = 'blue' }: PortalCardProps) {
  const styles = themeStyles[theme];

  return (
    <Link href={href} className={`group relative overflow-hidden bg-white rounded-3xl p-8 lg:p-10 shadow-lg border border-slate-200 transition-all duration-300 hover:shadow-2xl ${styles.hoverShadow} hover:-translate-y-2 flex flex-col items-center text-center`}>
      <div className={`absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br ${styles.bubbleGradient} to-transparent rounded-full z-0 opacity-50 group-hover:scale-150 transition-transform duration-500`}></div>

      <div className={`relative z-10 w-24 h-24 mb-8 rounded-2xl bg-gradient-to-br ${styles.iconBgGradient} flex items-center justify-center text-white shadow-xl ${styles.iconShadow} group-hover:scale-110 transition-transform duration-300 ${styles.iconRotate}`}>
        {icon}
      </div>
      
      <h3 className={`relative z-10 text-2xl lg:text-3xl font-extrabold text-slate-900 mb-4 ${styles.titleHover} transition-colors ${theme === 'pink' ? 'leading-tight' : ''}`}>
        {title}
      </h3>
      
      <p className="relative z-10 text-slate-500 text-lg leading-relaxed">
        {description}
      </p>

      <div className={`relative z-10 mt-10 flex items-center ${styles.textColor} font-bold text-lg group-hover:gap-3 transition-all`}>
        Enter Portal
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
    </Link>
  );
}
