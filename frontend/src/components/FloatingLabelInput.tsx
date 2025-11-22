import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FloatingLabelInput = ({ 
  label, 
  error, 
  value, 
  className,
  ...props 
}: FloatingLabelInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value !== undefined && value !== '';

  return (
    <div className="relative">
      <Input
        {...props}
        value={value}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
        className={cn(
          "pt-6 pb-2 transition-all",
          error && "border-destructive focus-visible:ring-destructive",
          className
        )}
      />
      <Label
        className={cn(
          "absolute left-3 transition-all pointer-events-none",
          isFocused || hasValue
            ? "top-1.5 text-xs text-muted-foreground"
            : "top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
        )}
      >
        {label}
      </Label>
      {error && (
        <p className="text-xs text-destructive mt-1">{error}</p>
      )}
    </div>
  );
};
