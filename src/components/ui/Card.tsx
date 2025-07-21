
import React from 'react';
import { clsx } from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={clsx(
        'rounded-lg border bg-white shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className, ...props }) => {
  return (
    <div className={clsx('flex flex-col space-y-1.5 p-6', className)} {...props}>
      {children}
    </div>
  );
};

export const CardContent: React.FC<CardContentProps> = ({ children, className, ...props }) => {
  return (
    <div className={clsx('p-6 pt-0', className)} {...props}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<CardFooterProps> = ({ children, className, ...props }) => {
  return (
    <div className={clsx('flex items-center p-6 pt-0', className)} {...props}>
      {children}
    </div>
  );
};
