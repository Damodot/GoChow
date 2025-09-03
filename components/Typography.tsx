// components/Typography.tsx
import React from 'react';
import { Text, TextProps } from 'react-native';

interface TypographyProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'bodyBold' | 'caption' | 'button';
  children: React.ReactNode;
}

export const Typography: React.FC<TypographyProps> = ({ 
  variant = 'body', 
  style, 
  children, 
  ...props 
}) => {
  const getStyles = () => {
    const baseStyle = { fontFamily: 'Urbanist' };
    
    switch (variant) {
      case 'h1':
        return { ...baseStyle, fontSize: 28, fontWeight: '700' };
      case 'h2':
        return { ...baseStyle, fontSize: 24, fontWeight: '700' };
      case 'h3':
        return { ...baseStyle, fontSize: 20, fontWeight: '700' };
      case 'body':
        return { ...baseStyle, fontSize: 16, fontWeight: '400' };
      case 'bodyBold':
        return { ...baseStyle, fontSize: 16, fontWeight: '700' };
      case 'caption':
        return { ...baseStyle, fontSize: 12, fontWeight: '400' };
      case 'button':
        return { ...baseStyle, fontSize: 16, fontWeight: '600' };
      default:
        return baseStyle;
    }
  };

  return (
    <Text style={[getStyles(), style]} {...props}>
      {children}
    </Text>
  );
};