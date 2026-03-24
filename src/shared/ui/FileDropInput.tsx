import Icon from "@shared/ui/Icon";
import { cx } from "@shared/utils/cx";
import { useMemo, useRef, useState } from "react";

type FileDropInputProps = {
  label?: string;
  required?: boolean;
  requiredMark?: boolean;

  containerClassName?: string;
  labelClassName?: string;
  dropzoneClassName?: string;
  helperClassName?: string;

  accept?: string;           
  multiple?: boolean;
  disabled?: boolean;
  maxSizeMB?: number;         // e.g. 10
  error?: string;
  helperText?: string;

  value?: File | File[] | null; // optional: if parent wants to control display
  onFilesSelected: (files: File[]) => void;
};

export default function FileDropInput({
  label,
  required,
  requiredMark = true,
  containerClassName,
  labelClassName,
  dropzoneClassName,
  helperClassName,
  accept = ".jpg",
  multiple = false,
  disabled = false,
  maxSizeMB = 10,
  error,
  helperText = "Ukuran File Maksimal 10MB",
  value = null,
  onFilesSelected,
}: FileDropInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const filesForDisplay = useMemo(() => {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  }, [value]);

  const openPicker = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  const validateFiles = (files: File[]) => {
    const maxBytes = maxSizeMB * 1024 * 1024;

    const tooBig = files.find((f) => f.size > maxBytes);
    if (tooBig) {
      return {
        ok: false as const,
        message: `Ukuran file maksimal ${maxSizeMB}MB.`,
      };
    }

    return { ok: true as const };
  };

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;

    const files = Array.from(fileList);
    const picked = multiple ? files : files.slice(0, 1);

    const v = validateFiles(picked);
    if (!v.ok) {
      // You can wire this to your form error system instead of alert
      // eslint-disable-next-line no-alert
      alert(v.message);
      return;
    }

    onFilesSelected(picked);

    // allow selecting the same file again
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className={cx("w-full", containerClassName)}>
      {label ? (
        <label
          className={cx(
              "mb-2 block text-[10px] font-medium text-start md:text-[14px] lg:text[18px]",
            disabled && "text-slate-400",
            labelClassName
          )}
        >
          {label}
          {required && requiredMark ? <span className="ml-1 text-red-500">*</span> : null}
        </label>
      ) : null}

      {error && !label ? (
        <p
          className={cx("flex items-center gap-1 mb-1 text-sm text-red-600", helperClassName)}
        >
          <Icon icon="close-circle-outlined" size={14} />
          <span className="text-[11px]">
            {error}
          </span>
        </p>)
        : null}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <button
        type="button"
        disabled={disabled}
        onClick={openPicker}
        onDragEnter={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (disabled) return;
          setIsDragging(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (disabled) return;
          setIsDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(false);
          if (disabled) return;
          handleFiles(e.dataTransfer.files);
        }}
        className={cx(
          "w-full rounded-[12px] border border-dashed bg-field",
          "px-4 py-8 text-center",
          "transition",
          disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
          error ? "border-red-500" : "border-neutral-200",
          isDragging && !disabled && "border-neutral-400 bg-neutral-50",
          dropzoneClassName
        )}
      >

        <p className="text-[10px] font-semibold text-light-primary md:text-[14px] lg:text[18px]">
          Klik untuk upload atau drag & drop
        </p>
        <p className="mt-1 text-[8px] text-neutral-500 md:text-[12px] lg:text[14px]">{helperText}</p>

        {filesForDisplay.length > 0 ? (
          <div className="mt-4 space-y-2 text-left">
            {filesForDisplay.map((f) => (
              <div
                key={`${f.name}-${f.size}-${f.lastModified}`}
                className="flex items-center justify-between rounded-[10px] border border-neutral-200 px-3 py-2"
              >
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-medium text-neutral-900">{f.name}</p>
                  <p className="text-[12px] text-neutral-500">
                    {(f.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </button>
      {
        error && label ?
          <p
            className={cx("flex items-center gap-1 mt-1 text-sm text-red-600", helperClassName)}
          >
            <Icon icon="close-circle-outlined" size={14} />
            <span className="text-[11px]">
              {error}
            </span>
          </p>
          :
          null

      }

    </div>
  );
}
