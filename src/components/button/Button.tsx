import React from "react";

enum Palette {
  light = "light",
  primary = "primary",
  secondary = "secondary"
}

enum Size {
  mini = "mini",
  large = "large"
}

interface BaseButtonProps {
  palette?: Palette;
  size?: Size;
  children: React.ReactNode;
  onClick: () => void;
}

const sizeStylesMapping = {
  large: {
    width: "100px",
    borderRadius: "24px"
  }
};

const paletteStylesMapping = {
  light: {
    backgroundColor: "#D4D4D2"
  },
  primary: {
    backgroundColor: "#FF9500",
    color: "#ffffff"
  },
  secondary: {
    backgroundColor: "#505050",
    color: "#ffffff"
  }
};

export const Button = ({
  palette = Palette.primary,
  size = Size.mini,
  onClick,
  children
}: BaseButtonProps) => {
  const paletteStyles = paletteStylesMapping[palette];
  const variantStyles = sizeStylesMapping[size];

  return (
    <button
      style={{ ...paletteStyles, ...variantStyles }}
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
};
