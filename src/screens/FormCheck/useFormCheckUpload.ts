import { useEffect, useRef, useState } from "@lynx-js/react";

import { createUploadSession } from "@/api/formChecks.ts";
import { getJSON, removeKey, setJSON } from "@/api/storage.ts";
import type { FormCheckUpload } from "@/types/formCheck.ts";
import { delay } from "@/utils/delay.ts";

const PENDING_KEY = "fc.upload.pending";
const READY_KEY = "fc.upload.ready";
const MAX_SEC = 60;
const CHUNK_MS = 120;
const EMIT_MS = 250;
const MOCK_CLIP = { localUri: "file:///mock/set.mp4", durationSec: 42, bytes: 18 * 1_048_576 };

type Pending = { uploadId: string; localUri: string; durationSec: number; bytes: number; chunkSize: number; offset: number };
type Ready = { uploadId: string; localUri: string; durationSec: number };

export type UploadError = "too_long" | "network";

const IDLE: FormCheckUpload = { status: "idle", progressPct: 0 };

export function useFormCheckUpload() {
  const [upload, setUpload] = useState<FormCheckUpload>(IDLE);
  const run = useRef(0);

  async function send(p: Pending, token: number) {
    let offset = p.offset;
    let lastEmit = 0;
    try {
      while (offset < p.bytes) {
        await delay(CHUNK_MS);
        if (run.current !== token) return;
        offset = Math.min(p.bytes, offset + p.chunkSize);
        setJSON(PENDING_KEY, { ...p, offset });
        const now = Date.now();
        if (offset < p.bytes && now - lastEmit >= EMIT_MS) {
          lastEmit = now;
          setUpload({ status: "uploading", progressPct: Math.floor((offset / p.bytes) * 100), localUri: p.localUri, uploadId: p.uploadId, durationSec: p.durationSec });
        }
      }
      const ready: Ready = { uploadId: p.uploadId, localUri: p.localUri, durationSec: p.durationSec };
      removeKey(PENDING_KEY);
      setJSON(READY_KEY, ready);
      setUpload({ status: "ready", progressPct: 100, ...ready });
    } catch {
      if (run.current !== token) return;
      setUpload({ status: "failed", progressPct: Math.floor((offset / p.bytes) * 100), localUri: p.localUri, uploadId: p.uploadId, error: "network" });
    }
  }

  function resume(p: Pending) {
    const token = ++run.current;
    setUpload({ status: "uploading", progressPct: Math.floor((p.offset / p.bytes) * 100), localUri: p.localUri, uploadId: p.uploadId, durationSec: p.durationSec });
    void send(p, token);
  }

  async function pick() {
    if (upload.status === "picking" || upload.status === "uploading") return;
    const token = ++run.current;
    removeKey(READY_KEY);
    setUpload({ status: "picking", progressPct: 0 });
    await delay(400);
    if (run.current !== token) return;
    const clip = MOCK_CLIP;
    if (clip.durationSec > MAX_SEC) {
      setUpload({ status: "failed", progressPct: 0, error: "too_long" });
      return;
    }
    try {
      const s = await createUploadSession({ durationSec: clip.durationSec, bytes: clip.bytes });
      if (run.current !== token) return;
      const p: Pending = { uploadId: s.uploadId, localUri: clip.localUri, durationSec: clip.durationSec, bytes: clip.bytes, chunkSize: s.chunkSize, offset: 0 };
      setJSON(PENDING_KEY, p);
      setUpload({ status: "uploading", progressPct: 0, localUri: p.localUri, uploadId: p.uploadId, durationSec: p.durationSec });
      void send(p, token);
    } catch {
      if (run.current === token) setUpload({ status: "failed", progressPct: 0, error: "network" });
    }
  }

  function retry() {
    const p = getJSON<Pending>(PENDING_KEY);
    if (p) resume(p);
    else void pick();
  }

  function clear() {
    run.current++;
    removeKey(PENDING_KEY);
    removeKey(READY_KEY);
    setUpload(IDLE);
  }

  useEffect(() => {
    const ready = getJSON<Ready>(READY_KEY);
    if (ready) setUpload({ status: "ready", progressPct: 100, ...ready });
    else {
      const p = getJSON<Pending>(PENDING_KEY);
      if (p) resume(p);
    }
    return () => {
      run.current++;
    };
  }, []);

  return { upload, pick, retry, clear };
}
