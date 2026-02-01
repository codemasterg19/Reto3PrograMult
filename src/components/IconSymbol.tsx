import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type IconSymbolProps = {
  name: string;
  size?: number;
  color?: string;
};

const IconSymbol = ({name, size = 24, color = '#FFFFFF'}: IconSymbolProps) => {
  return <MaterialIcons name={name} size={size} color={color} />;
};

export default IconSymbol;
