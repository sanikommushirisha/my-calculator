import React from 'react';

const enum Palette {
  light= 'light',
  primary= 'primary',
  secondary = 'secondary'
}

const enum Size {
  mini="mini",
  large="large"
}

interface BaseButtonProps {
  palette?: Palette,
  size?: Size,
  children: React.ReactNode,
  onClick: () => void
}

const sizeStylesMapping = {
  [Size.large]: {
    width: "100px",
    borderRadius: "24px"
  }
}

const paletteStylesMapping =  {
 [Palette.light]: {
  backgroundColor: "#D4D4D2"
 },[Palette.primary]: {
  backgroundColor: "#FF9500",
  color: "#ffffff"
 },[Palette.secondary]: {
  backgroundColor: "#505050",
  color: "#ffffff"
 },
 };

export const Button = ({palette = Palette.primary, size= Size.mini, onClick, children}: BaseButtonProps) => {
  const paletteStyles = paletteStylesMapping[palette]
  const variantStyles = sizeStylesMapping[size]

  return (
    <button style={{ ...paletteStyles, ...variantStyles }} onClick={() => onClick()}>{children}</button>
  )
}
