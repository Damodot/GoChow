import DarkLogo from "@/assets/images/bottomTabDark.svg";
import LightLogo from "@/assets/images/bottomTabLight.svg";
import { useColorScheme } from "nativewind";
import React from "react";

const CenterLogo = ({ width, height }: { width: number; height: number }) => {
  const { colorScheme } = useColorScheme();

  const Logo = colorScheme === "dark" ? DarkLogo : LightLogo;

  return <Logo width={width} height={height} />;
};

export default CenterLogo;
