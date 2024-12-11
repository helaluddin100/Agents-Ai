import * as SwitchPrimitive from "@radix-ui/react-switch";
import { clsx } from "clsx";
import React, { useEffect, useState } from "react";

interface SwitchProps {
  value: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}

const Switch = ({ value, disabled = false, onChange }: SwitchProps) => {
  const [checked, setChecked] = useState(false);

  // Due to SSR, we should only change the internal state after the initial render
  useEffect(() => {
    // console.log("changed value", value);
    setChecked(value);
  }, [value]);

  const handleChange = (checked: boolean) => {
    onChange(checked);
  };

  return (
    // <SwitchPrimitive.Root
    //   className={clsx(
    //     "group",
    //     "radix-state-checked:bg-sky-600 radix-state-unchecked:bg-zinc-500 dark:radix-state-unchecked:bg-primaryLight",
    //     "relative inline-flex h-4 w-7 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out",
    //     "focus:outline-none focus-visible:ring focus-visible:ring-sky-500 focus-visible:ring-opacity-75",
    //     disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer "
    //   )}
    //   disabled={disabled}
    //   onCheckedChange={handleChange}
    //   checked={checked}
    //   // checked={false}
    // >
    //   <SwitchPrimitive.Thumb
    //     className={clsx(
    //       "group-radix-state-checked:translate-x-3",
    //       "group-radix-state-unchecked:translate-x-0",
    //       "pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
    //     )}
    //   />
    // </SwitchPrimitive.Root>

    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => handleChange(e.target.checked)}
        className="sr-only peer "
      />
      <div className="w-11 h-6  peer-focus:outline-none peer-focus:ring-4  peer-focus:ring-blue-800 rounded-full peer bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-blue-600"></div>
    </label>
  );
};

export { Switch };
