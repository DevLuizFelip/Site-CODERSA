import React from 'react';

const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-primary/20 bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:bg-background-dark dark:border-primary/30">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-text-light dark:text-white">{title}</h3>
      <p className="text-text-muted dark:text-slate-300">{description}</p>
    </div>
  );
};

export default ServiceCard;