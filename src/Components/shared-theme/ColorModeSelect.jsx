// import * as React from 'react';
// import { useColorScheme } from '@mui/material/styles';
// import MenuItem from '@mui/material/MenuItem';
// import Select, { SelectProps } from '@mui/material/Select';

// export default function ColorModeSelect(props: SelectProps) {
//   const { mode, setMode } = useColorScheme();
//   if (!mode) {
//     return null;
//   }
//   return (
//     <Select
//       value={mode}
//       onChange={(event) =>
//         setMode(event.target.value as 'system' || 'light' || 'dark')
//       }
//       SelectDisplayProps={{
//         // @ts-ignore
//         'data-screenshot': 'toggle-mode',
//       }}
//       {...props}
    
//       <MenuItem value="system">System</MenuItem>
//       <MenuItem value="light">Light</MenuItem>
//       <MenuItem value="dark">Dark</MenuItem>
//     </Select>
//   );
// }

// import * as React from "react";
import { useColorScheme } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function ColorModeSelect(props) {
  const colorScheme = useColorScheme();

  if (!colorScheme) {
    return null; // Ensure the hook is available
  }

  const { mode, setMode } = colorScheme;

  if (!setMode) {
    return null; // Ensure the setter function exists
  }

  return (
    <Select
      value={mode}
      onChange={(event) => setMode(event.target.value)}
      {...props} // Spread additional props
      SelectDisplayProps={{
        "data-screenshot": "toggle-mode", // Custom attribute
      }}
    >
      <MenuItem value="system" >System</MenuItem>
      <MenuItem value="light">Light</MenuItem>
      <MenuItem value="dark">Dark</MenuItem>
    </Select>
  );
}
