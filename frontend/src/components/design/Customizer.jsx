import { useEffect, useRef, useState } from 'react';

/**
 * Renders one input per customizable CSS variable declared on the design
 * (e.g. { "--primary-color": "#6366f1", "--border-radius": "20px" }).
 * Color values (#hex) get a color picker; everything else gets a text
 * input (handles px/rem/font-family values too).
 *
 * Calls onChange(overridesObject) any time a value changes, debounced
 * slightly so we don't spam the preview API on every keystroke/drag.
 */
export default function Customizer({ customizableVars, onChange }) {
  const [values, setValues] = useState(customizableVars || {});

  // Keep the latest onChange in a ref so the debounce effect below never
  // closes over a stale callback, even if the parent passes a new
  // function reference on every render (a very common React pitfall —
  // this was the root cause of "changing color does nothing").
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    setValues(customizableVars || {});
  }, [customizableVars]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChangeRef.current?.(values);
    }, 250);
    return () => clearTimeout(timer);
  }, [values]);

  if (!customizableVars || Object.keys(customizableVars).length === 0) {
    return <p className="text-sm text-gray-500">This design has no customizable options.</p>;
  }

  // Accept 3, 4, 6, or 8-digit hex, any case, with optional surrounding
  // whitespace — the original regex only matched 3/6-digit lowercase.
  const isColor = (val) => typeof val === 'string' && /^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(val.trim());

  const friendlyLabel = (key) =>
    key.replace(/^--/, '').replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  const handleChange = (key, newValue) => {
    setValues((prev) => ({ ...prev, [key]: newValue }));
  };

  return (
    <div className="space-y-4">
      {Object.entries(values).map(([key, value]) => (
        <div key={key}>
          <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
            {friendlyLabel(key)}
          </label>
          <div className="flex items-center gap-2">
            {isColor(value) && (
              <input
                type="color"
                value={value}
                onChange={(e) => handleChange(key, e.target.value)}
                className="h-9 w-10 cursor-pointer rounded border border-gray-300 dark:border-gray-700"
              />
            )}
            <input
              type="text"
              value={value}
              onChange={(e) => handleChange(key, e.target.value)}
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
