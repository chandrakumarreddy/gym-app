import { Button } from "@/components/Button/Button.tsx";
import { Icon } from "@/components/Icon/Icon.tsx";
import type { FormCheckUpload } from "@/types/formCheck.ts";

import "./UploadDropzone.css";

export type DropzoneCopy = {
  title: string;
  hint: string;
  record: string;
  upload: string;
  retry: string;
  replace: string;
};

type UploadDropzoneProps = {
  status: FormCheckUpload["status"];
  progressWidth: string;
  copy: DropzoneCopy;
  disabled?: boolean;
  onRecord: () => void;
  onUpload: () => void;
  onRetry: () => void;
  onReplace: () => void;
};

export function UploadDropzone({ status, progressWidth, copy, disabled, onRecord, onUpload, onRetry, onReplace }: UploadDropzoneProps) {
  const busy = status === "picking" || status === "uploading";
  const showBar = status === "uploading" || status === "failed";
  return (
    <view className={`dropzone${status === "failed" ? " dropzone-failed" : ""}`}>
      <view className={`dropzone-icon${status === "ready" ? " dropzone-icon-ready" : ""}`}>
        <Icon name={status === "ready" ? "check" : "video"} tone={status === "ready" ? "green" : "ember"} size={28} />
      </view>
      <text className="dropzone-title">{copy.title}</text>
      <text className="dropzone-hint">{copy.hint}</text>
      {showBar ? (
        <view className="dropzone-track">
          <view className={`dropzone-fill${status === "failed" ? " dropzone-fill-failed" : ""}`} style={{ width: progressWidth }} />
        </view>
      ) : null}
      <view className="dropzone-actions">
        {status === "ready" ? (
          <Button variant="link" label={copy.replace} onTap={onReplace} />
        ) : status === "failed" ? (
          <Button variant="ghost" size="sm" icon="refresh" label={copy.retry} disabled={disabled} onTap={onRetry} />
        ) : (
          <>
            <Button variant="ghost" size="sm" icon="video" label={copy.record} disabled={busy || disabled} onTap={onRecord} className="dropzone-btn" />
            <Button variant="ghost" size="sm" icon="upload" label={copy.upload} disabled={busy || disabled} onTap={onUpload} className="dropzone-btn" />
          </>
        )}
      </view>
    </view>
  );
}
