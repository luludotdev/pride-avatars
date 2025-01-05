"use client";

import { useCallback, useId, useMemo } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Slider } from "~/components/ui/slider";
import { useStore } from "~/lib/data/store";
import { flagNames } from "~/lib/flags";
import {
  qualities,
  qualityToResolution,
  scaleQualityValue,
} from "~/lib/quality";
import { Experimental } from "./feature-flags";

export const Controls = () => {
  const quality = useStore((state) => state.quality);
  const padding = useStore((state) => state.padding);
  const angle = useStore((state) => state.angle);
  const blur = useStore((state) => state.blur);
  const feather = useStore((state) => state.feather);
  const flag = useStore((state) => state.flag);
  const flag2 = useStore((state) => state.flag2);
  const preview = useStore((state) => state.preview);
  const clip = useStore((state) => state.clip);
  const dualFlag = useStore((state) => state.dualFlag);
  const blurFlagBoundary = useStore((state) => state.blurFlagBoundary);

  const setQuality = useStore((state) => state.setQuality);
  const setPadding = useStore((state) => state.setPadding);
  const setAngle = useStore((state) => state.setAngle);
  const setBlur = useStore((state) => state.setBlur);
  const setFeather = useStore((state) => state.setFeather);
  const setFlag = useStore((state) => state.setFlag);
  const setFlag2 = useStore((state) => state.setFlag2);
  const setPreview = useStore((state) => state.setPreview);
  const setClip = useStore((state) => state.setClip);
  const setDualFlag = useStore((state) => state.setDualFlag);
  const setBlurFlagBoundary = useStore((state) => state.setBlurFlagBoundary);

  const formatQuality = useCallback<(v: number) => string>((value) => {
    const padding = 6;
    if (value === 0) return "shit".padEnd(padding, " ");

    const resolution = qualityToResolution(value).toString();
    return `${resolution}px`.padEnd(padding, " ");
  }, []);

  const formatPadding = useCallback<(v: number) => string>(
    (value) => {
      const scaled = scaleQualityValue(quality, value, true);
      return `${scaled.toFixed(0).padStart(2, "0")}px`;
    },
    [quality],
  );

  const formatAngle = useCallback<(v: number) => string>(
    (value) => `${value.toFixed(2)}°`,
    [],
  );

  const formatBlur = useCallback<(v: number) => string>(
    (value) => {
      const scaled = scaleQualityValue(quality, value);
      return `${scaled.toFixed(2)}px`.padEnd(7, " ");
    },
    [quality],
  );

  return (
    <div className="grid w-full grid-cols-input items-center gap-x-4 gap-y-3">
      <RangeInput
        formatter={formatQuality}
        label="Quality"
        max={qualities.length - 1}
        min={0}
        onChange={setQuality}
        step={1}
        value={quality}
      />

      <RangeInput
        formatter={formatPadding}
        label="Padding"
        max={96}
        min={0}
        onChange={setPadding}
        step={1}
        value={padding}
      />

      <RangeInput
        formatter={formatAngle}
        label="Tilt"
        max={10}
        min={-10}
        onChange={setAngle}
        step={0.01}
        value={angle}
      />

      <RangeInput
        formatter={formatBlur}
        label="Blur"
        max={10}
        min={0}
        onChange={setBlur}
        step={0.01}
        value={blur}
      />

      <Experimental>
        <RangeInput
          formatter={formatBlur}
          label="Feather"
          max={10}
          min={0}
          onChange={setFeather}
          step={0.01}
          value={feather}
        />
      </Experimental>

      <SelectInput
        label="Flag"
        onChange={setFlag}
        options={flagNames}
        placeholder="Flag"
        value={flag}
      />

      <Experimental>
        {dualFlag && (
          <SelectInput
            label="Second Flag"
            onChange={setFlag2}
            options={flagNames}
            value={flag2}
          />
        )}

        <CheckboxInput checked={dualFlag} onCheckedChange={setDualFlag}>
          Dual Flags
        </CheckboxInput>

        {dualFlag && (
          <CheckboxInput
            checked={blurFlagBoundary}
            onCheckedChange={setBlurFlagBoundary}
          >
            Blur Boundary
          </CheckboxInput>
        )}
      </Experimental>

      <CheckboxInput checked={preview} onCheckedChange={setPreview}>
        Preview
      </CheckboxInput>

      <CheckboxInput checked={clip} onCheckedChange={setClip}>
        Clip
      </CheckboxInput>
    </div>
  );
};

const RangeInput = ({
  label,
  value,
  onChange,
  formatter,
  ...props
}: Omit<
  ComponentPropsWithoutRef<typeof Slider>,
  "label" | "onChange" | "onValueChange" | "value"
> & {
  readonly label: string;
  readonly value: number;
  onChange(value: number): void;
  formatter(value: number): string;
}) => {
  const id = useId();
  const val = useMemo(() => [value], [value]);
  const onValueChange = useCallback(
    ([value]: number[]) => onChange(value),
    [onChange],
  );

  const formatted = useMemo(
    () => formatter(value).padEnd(7, " "),
    [formatter, value],
  );

  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      <div className="flex gap-x-2">
        <span className="whitespace-pre font-mono text-sm leading-none">
          {formatted}
        </span>

        <Slider id={id} onValueChange={onValueChange} value={val} {...props} />
      </div>
    </>
  );
};

const SelectInput = ({
  label,
  placeholder,
  options,
  value,
  onChange,
}: {
  readonly label: string;
  readonly placeholder?: string;
  readonly options: readonly string[];
  readonly value: string;
  onChange(value: string): void;
}) => {
  const id = useId();

  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger id={id}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

const CheckboxInput = ({
  children,
  ...props
}: ComponentPropsWithoutRef<typeof Checkbox> & {
  readonly children: ReactNode;
}) => {
  const id = useId();

  return (
    <>
      <Label htmlFor={id}>{children}</Label>
      <Checkbox id={id} {...props} />
    </>
  );
};
