"use client";

import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";

export type ExtraToolId =
  | "diff"
  | "pdfcopy"
  | "moneywords"
  | "datewords"
  | "sheetclean"
  | "csvmerge"
  | "image"
  | "filename"
  | "qrpresets"
  | "batchqr"
  | "regex"
  | "markdown"
  | "htmltable"
  | "checksum"
  | "filebase64";

export const EXTRA_TOOL_IDS = new Set<ExtraToolId>([
  "diff", "pdfcopy", "moneywords", "datewords", "sheetclean",
  "csvmerge", "image", "filename", "qrpresets", "batchqr",
  "regex", "markdown", "htmltable", "checksum", "filebase64",
]);

function ToolHeader({ title, description }: { title: string; description: string }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6" component="h2" sx={{ fontWeight: 800, mb: 0.4 }}>{title}</Typography>
      <Typography variant="body2" color="text.secondary">{description}</Typography>
    </Box>
  );
}

function downloadBlob(data: BlobPart, filename: string, type: string) {
  const url = URL.createObjectURL(new Blob([data], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 500);
}

function escCsv(value: string) {
  return /[",\n\r]/.test(value) ? '"' + value.replaceAll('"', '""') + '"' : value;
}

function toCsv(rows: string[][]) {
  return rows.map((row) => row.map(escCsv).join(",")).join("\r\n");
}

function parseCsv(text: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    const next = text[i + 1];
    if (ch === '"') {
      if (quoted && next === '"') {
        cell += '"';
        i += 1;
      } else quoted = !quoted;
    } else if (ch === "," && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((ch === "\n" || ch === "\r") && !quoted) {
      if (ch === "\r" && next === "\n") i += 1;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else cell += ch;
  }
  row.push(cell);
  if (row.some(Boolean) || rows.length === 0) rows.push(row);
  return rows;
}

function stripMarks(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
}

function cleanFilename(value: string) {
  return stripMarks(value)
    .trim()
    .replace(/[^a-zA-Z0-9._ -]+/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function cleanPdfCopy(value: string) {
  return value
    .replace(/([\p{L}\p{N}])-\s*\n\s*([\p{L}\p{N}])/gu, "$1$2")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .split(/\n\n+/)
    .map((p) => p.replace(/\s*\n\s*/g, " ").replace(/[ \t]{2,}/g, " ").trim())
    .filter(Boolean)
    .join("\n\n");
}

type DiffRow = { kind: "same" | "add" | "remove"; text: string };

function diffLines(left: string, right: string): DiffRow[] {
  const a = left.split("\n");
  const b = right.split("\n");
  if (a.length > 400 || b.length > 400) throw new Error("Mỗi bên tối đa 400 dòng.");
  const dp = Array.from({ length: a.length + 1 }, () => new Uint16Array(b.length + 1));
  for (let i = a.length - 1; i >= 0; i -= 1) {
    for (let j = b.length - 1; j >= 0; j -= 1) {
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const out: DiffRow[] = [];
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { out.push({ kind: "same", text: a[i] }); i += 1; j += 1; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) { out.push({ kind: "remove", text: a[i] }); i += 1; }
    else { out.push({ kind: "add", text: b[j] }); j += 1; }
  }
  while (i < a.length) { out.push({ kind: "remove", text: a[i] }); i += 1; }
  while (j < b.length) { out.push({ kind: "add", text: b[j] }); j += 1; }
  return out;
}

const DIGIT = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];

function read3(value: number, full: boolean) {
  const h = Math.floor(value / 100);
  const t = Math.floor((value % 100) / 10);
  const u = value % 10;
  const out: string[] = [];
  if (h > 0 || full) {
    out.push(DIGIT[h] + " trăm");
    if (t === 0 && u > 0) out.push("lẻ");
  }
  if (t > 1) {
    out.push(DIGIT[t] + " mươi");
    if (u === 1) out.push("mốt");
    else if (u === 4) out.push("tư");
    else if (u === 5) out.push("lăm");
    else if (u > 0) out.push(DIGIT[u]);
  } else if (t === 1) {
    out.push("mười");
    if (u === 5) out.push("lăm");
    else if (u > 0) out.push(DIGIT[u]);
  } else if (u > 0) out.push(DIGIT[u]);
  return out.join(" ");
}

function moneyWords(input: string) {
  const normalized = input.replace(/[.,\s]/g, "").replace(/[^0-9-]/g, "");
  if (!/^-?\d+$/.test(normalized)) throw new Error("Số tiền không hợp lệ.");
  let amount = BigInt(normalized);
  const negative = amount < 0n;
  if (negative) amount = -amount;
  if (amount === 0n) return "Không đồng";
  const scale = ["", "nghìn", "triệu", "tỷ", "nghìn tỷ", "triệu tỷ", "tỷ tỷ"];
  const groups: number[] = [];
  while (amount > 0n) {
    groups.push(Number(amount % 1000n));
    amount /= 1000n;
  }
  if (groups.length > scale.length) throw new Error("Số quá lớn.");
  const parts: string[] = [];
  for (let index = groups.length - 1; index >= 0; index -= 1) {
    if (groups[index] === 0) continue;
    parts.push(read3(groups[index], index < groups.length - 1 && groups[index] < 100));
    if (scale[index]) parts.push(scale[index]);
  }
  const value = (negative ? "âm " : "") + parts.join(" ") + " đồng";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function adminDate(value: string) {
  if (!value) return "";
  const parts = value.split("-");
  if (parts.length !== 3) return "";
  return "ngày " + parts[2].padStart(2, "0") + " tháng " + parts[1].padStart(2, "0") + " năm " + parts[0];
}

function markdownPlain(value: string) {
  return value
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/^[-*+]\s+/gm, "• ")
    .replace(/(\*\*|__|~~)/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function plainMarkdown(value: string) {
  return value.split("\n").map((line) => /^[•·]\s*/.test(line.trim()) ? "- " + line.trim().replace(/^[•·]\s*/, "") : line).join("\n");
}

async function loadScript(id: string, src: string) {
  const existing = document.getElementById(id) as HTMLScriptElement | null;
  if (existing?.dataset.loaded === "true") return;
  await new Promise<void>((resolve, reject) => {
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Không tải được thư viện.")), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.id = id;
    script.src = src;
    script.async = true;
    script.onload = () => { script.dataset.loaded = "true"; resolve(); };
    script.onerror = () => reject(new Error("Không tải được thư viện."));
    document.head.appendChild(script);
  });
}

type QrCtor = new (el: HTMLElement, options: { text: string; width: number; height: number; correctLevel: number }) => void;

async function qrPng(text: string, size = 280) {
  await loadScript("office-extra-qr", "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js");
  const scope = window as unknown as { QRCode?: QrCtor & { CorrectLevel: { M: number } } };
  if (!scope.QRCode) throw new Error("QR library chưa sẵn sàng.");
  const host = document.createElement("div");
  new scope.QRCode(host, { text, width: size, height: size, correctLevel: scope.QRCode.CorrectLevel.M });
  await new Promise((resolve) => window.setTimeout(resolve, 0));
  const canvas = host.querySelector("canvas");
  const image = host.querySelector("img");
  if (canvas) return canvas.toDataURL("image/png");
  if (image?.src) return image.src;
  throw new Error("Không tạo được QR.");
}

type SheetApi = {
  read(data: ArrayBuffer, options: { type: "array" }): { SheetNames: string[]; Sheets: Record<string, unknown> };
  utils: { sheet_to_json(sheet: unknown, options: { header: 1; raw: boolean }): unknown[][] };
};

async function loadSheet() {
  await loadScript("office-extra-xlsx", "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js");
  const scope = window as unknown as { XLSX?: SheetApi };
  if (!scope.XLSX) throw new Error("SheetJS chưa sẵn sàng.");
  return scope.XLSX;
}

function DiffTool() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  let rows: DiffRow[] = [];
  let error = "";
  try { if (a || b) rows = diffLines(a, b); } catch (caught) { error = caught instanceof Error ? caught.message : "Không thể so sánh."; }
  return <>
    <ToolHeader title="Text Compare / Diff" description="So sánh hai phiên bản văn bản theo dòng." />
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}>
      <TextField multiline minRows={7} label="Bản A" value={a} onChange={(e) => setA(e.target.value)} />
      <TextField multiline minRows={7} label="Bản B" value={b} onChange={(e) => setB(e.target.value)} />
    </Box>
    {error && <Alert severity="warning" sx={{ mt: 2 }}>{error}</Alert>}
    {!!rows.length && <Paper variant="outlined" sx={{ mt: 2, maxHeight: 340, overflow: "auto" }}>
      {rows.map((row, index) => <Box key={index} component="pre" sx={{
        m: 0, px: 1.5, py: 0.45, whiteSpace: "pre-wrap", fontFamily: "inherit", fontSize: 12,
        borderBottom: 1, borderColor: "divider",
        bgcolor: row.kind === "add" ? "success.main" : row.kind === "remove" ? "error.main" : "transparent",
        color: row.kind === "same" ? "text.primary" : "common.white",
      }}>{row.kind === "add" ? "+ " : row.kind === "remove" ? "- " : "  "}{row.text || " "}</Box>)}
    </Paper>}
  </>;
}

function PdfCopyTool() {
  const [input, setInput] = useState("");
  const output = cleanPdfCopy(input);
  return <>
    <ToolHeader title="PDF Copy Cleaner" description="Nối dòng và sửa từ bị ngắt khi copy văn bản từ PDF." />
    <Stack spacing={2}>
      <TextField multiline minRows={7} label="Text copy từ PDF" value={input} onChange={(e) => setInput(e.target.value)} />
      <TextField multiline minRows={7} label="Kết quả" value={output} InputProps={{ readOnly: true }} />
      <Button variant="outlined" disabled={!output} onClick={() => navigator.clipboard.writeText(output)}>Copy kết quả</Button>
    </Stack>
  </>;
}

function MoneyTool() {
  const [input, setInput] = useState("");
  let output = "";
  let error = "";
  if (input.trim()) {
    try { output = moneyWords(input); } catch (caught) { error = caught instanceof Error ? caught.message : "Không thể đọc số."; }
  }
  return <>
    <ToolHeader title="Số tiền → chữ" description="Đổi số tiền nguyên sang cách đọc tiếng Việt." />
    <Stack spacing={2}>
      <TextField label="Số tiền (VND)" value={input} onChange={(e) => setInput(e.target.value)} />
      {error && <Alert severity="error">{error}</Alert>}
      <TextField multiline minRows={3} label="Bằng chữ" value={output} InputProps={{ readOnly: true }} />
      <Button variant="outlined" disabled={!output} onClick={() => navigator.clipboard.writeText(output)}>Copy</Button>
    </Stack>
  </>;
}

function DateWordsTool() {
  const [value, setValue] = useState("");
  const output = adminDate(value);
  return <>
    <ToolHeader title="Ngày hành chính" description="Đổi ngày sang cách viết hành chính tiếng Việt." />
    <Stack spacing={2}>
      <TextField type="date" label="Ngày" value={value} onChange={(e) => setValue(e.target.value)} InputLabelProps={{ shrink: true }} />
      <TextField label="Kết quả" value={output} InputProps={{ readOnly: true }} />
      <Button variant="outlined" disabled={!output} onClick={() => navigator.clipboard.writeText(output)}>Copy</Button>
    </Stack>
  </>;
}

function SheetCleanTool() {
  const [rows, setRows] = useState<string[][]>([]);
  const [trim, setTrim] = useState(true);
  const [blank, setBlank] = useState(true);
  const [dates, setDates] = useState(false);
  const [decimal, setDecimal] = useState(false);
  const [dedupe, setDedupe] = useState("0");
  const [status, setStatus] = useState("Chưa mở file.");

  const cleaned = useMemo(() => {
    let next = rows.map((row) => row.map((cell) => {
      let value = trim ? cell.trim() : cell;
      const match = dates ? value.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/) : null;
      if (match) value = match[3] + "-" + match[2].padStart(2, "0") + "-" + match[1].padStart(2, "0");
      if (decimal && /^-?\d+,\d+$/.test(value)) value = value.replace(",", ".");
      return value;
    }));
    if (blank) next = next.filter((row) => row.some((cell) => cell !== ""));
    if (next.length < 2) return next;
    const header = next[0];
    const seen = new Set<string>();
    const col = Math.max(0, Number(dedupe) - 1);
    const body = next.slice(1).filter((row) => {
      const key = dedupe === "0" ? JSON.stringify(row) : row[col] || "";
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    return [header, ...body];
  }, [rows, trim, blank, dates, decimal, dedupe]);

  const open = async (file: File) => {
    try {
      let parsed: string[][];
      if (file.name.toLowerCase().endsWith(".csv")) parsed = parseCsv(await file.text());
      else {
        const xlsx = await loadSheet();
        const wb = xlsx.read(await file.arrayBuffer(), { type: "array" });
        const sheet = wb.Sheets[wb.SheetNames[0]];
        parsed = xlsx.utils.sheet_to_json(sheet, { header: 1, raw: false }).map((row) => row.map((cell) => String(cell ?? "")));
      }
      setRows(parsed);
      setStatus(file.name + " · " + parsed.length + " dòng");
    } catch (caught) {
      setStatus(caught instanceof Error ? caught.message : "Không đọc được file.");
    }
  };

  return <>
    <ToolHeader title="Excel / CSV Cleanup" description="Trim, bỏ dòng rỗng, xóa trùng và chuẩn hóa dữ liệu." />
    <Stack spacing={2}>
      <Button component="label" variant="contained">Mở Excel / CSV<input hidden type="file" accept=".csv,.xlsx,.xls" onChange={(e) => { const f = e.target.files?.[0]; if (f) void open(f); }} /></Button>
      <Alert severity="info">{status}</Alert>
      <Stack direction="row" useFlexGap flexWrap="wrap">
        <FormControlLabel control={<Checkbox checked={trim} onChange={(e) => setTrim(e.target.checked)} />} label="Trim ô" />
        <FormControlLabel control={<Checkbox checked={blank} onChange={(e) => setBlank(e.target.checked)} />} label="Bỏ dòng rỗng" />
        <FormControlLabel control={<Checkbox checked={dates} onChange={(e) => setDates(e.target.checked)} />} label="Ngày → YYYY-MM-DD" />
        <FormControlLabel control={<Checkbox checked={decimal} onChange={(e) => setDecimal(e.target.checked)} />} label="12,5 → 12.5" />
      </Stack>
      <TextField label="Cột xóa trùng: 0 = toàn dòng, 1 = A..." value={dedupe} onChange={(e) => setDedupe(e.target.value.replace(/\D/g, ""))} />
      {!!cleaned.length && <>
        <Paper variant="outlined" sx={{ maxHeight: 280, overflow: "auto" }}>
          <Box component="table" sx={{ borderCollapse: "collapse", minWidth: 560, width: "100%", "& td": { px: 1, py: 0.7, borderBottom: 1, borderColor: "divider", fontSize: 12 } }}>
            <tbody>{cleaned.slice(0, 25).map((row, i) => <tr key={i}>{row.slice(0, 12).map((cell, j) => <td key={j}>{cell}</td>)}</tr>)}</tbody>
          </Box>
        </Paper>
        <Button variant="outlined" onClick={() => downloadBlob(toCsv(cleaned), "cleaned.csv", "text/csv;charset=utf-8")}>Tải CSV sạch</Button>
      </>}
    </Stack>
  </>;
}

function CsvTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [input, setInput] = useState("");
  const [size, setSize] = useState("500");
  const [parts, setParts] = useState<Array<{ name: string; text: string }>>([]);

  const merge = async () => {
    const out: string[][] = [];
    let header = "";
    for (const file of files) {
      const rows = parseCsv(await file.text());
      if (!rows.length) continue;
      const head = JSON.stringify(rows[0]);
      if (!header) { header = head; out.push(rows[0]); }
      out.push(...rows.slice(head === header ? 1 : 0));
    }
    if (out.length) downloadBlob(toCsv(out), "merged.csv", "text/csv;charset=utf-8");
  };

  const split = () => {
    const rows = parseCsv(input);
    if (rows.length < 2) return;
    const count = Math.max(1, Number(size) || 500);
    const next: Array<{ name: string; text: string }> = [];
    for (let i = 1; i < rows.length; i += count) {
      next.push({ name: "part-" + String(next.length + 1).padStart(3, "0") + ".csv", text: toCsv([rows[0], ...rows.slice(i, i + count)]) });
    }
    setParts(next);
  };

  return <>
    <ToolHeader title="Merge / Split CSV" description="Ghép nhiều CSV hoặc chia CSV lớn theo số dòng." />
    <Stack spacing={2}>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Button component="label" variant="contained">Chọn nhiều CSV<input hidden multiple type="file" accept=".csv" onChange={(e) => setFiles(Array.from(e.target.files || []))} /></Button>
        <Button sx={{ ml: 1 }} variant="outlined" disabled={!files.length} onClick={() => void merge()}>Ghép ({files.length})</Button>
      </Paper>
      <TextField multiline minRows={7} label="CSV cần chia" value={input} onChange={(e) => setInput(e.target.value)} />
      <Stack direction="row" spacing={1}>
        <TextField label="Dòng / file" value={size} onChange={(e) => setSize(e.target.value.replace(/\D/g, ""))} />
        <Button variant="outlined" onClick={split}>Chia</Button>
      </Stack>
      {parts.map((part) => <Button key={part.name} variant="text" onClick={() => downloadBlob(part.text, part.name, "text/csv;charset=utf-8")}>{part.name}</Button>)}
    </Stack>
  </>;
}

type ImageResult = { name: string; url: string; size: string };

function ImageTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [format, setFormat] = useState("image/webp");
  const [quality, setQuality] = useState("0.82");
  const [keep, setKeep] = useState(true);
  const [results, setResults] = useState<ImageResult[]>([]);

  const process = async () => {
    const next: ImageResult[] = [];
    for (const file of files) {
      const src = URL.createObjectURL(file);
      const image = await new Promise<HTMLImageElement>((resolve, reject) => {
        const el = new Image();
        el.onload = () => resolve(el);
        el.onerror = () => reject(new Error("Không đọc được " + file.name));
        el.src = src;
      });
      let w = Number(width) || image.naturalWidth;
      let h = Number(height) || image.naturalHeight;
      if (keep) {
        if (width) h = Math.round(w * image.naturalHeight / image.naturalWidth);
        else if (height) w = Math.round(h * image.naturalWidth / image.naturalHeight);
      }
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Không tạo được canvas.");
      ctx.drawImage(image, 0, 0, w, h);
      const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob((value) => value ? resolve(value) : reject(new Error("Không xuất được ảnh.")), format, Number(quality)));
      URL.revokeObjectURL(src);
      const ext = format === "image/png" ? "png" : format === "image/jpeg" ? "jpg" : "webp";
      next.push({ name: file.name.replace(/\.[^.]+$/, "") + "-converted." + ext, url: URL.createObjectURL(blob), size: w + "×" + h });
    }
    setResults(next);
  };

  return <>
    <ToolHeader title="Image Tools" description="Resize, compress và đổi PNG/JPEG/WebP hàng loạt." />
    <Stack spacing={2}>
      <Button component="label" variant="contained">Chọn ảnh<input hidden multiple type="file" accept="image/*" onChange={(e) => setFiles(Array.from(e.target.files || []))} /></Button>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4,1fr)" }, gap: 1 }}>
        <TextField label="Width" value={width} onChange={(e) => setWidth(e.target.value.replace(/\D/g, ""))} />
        <TextField label="Height" value={height} onChange={(e) => setHeight(e.target.value.replace(/\D/g, ""))} />
        <FormControl><InputLabel>Format</InputLabel><Select label="Format" value={format} onChange={(e) => setFormat(e.target.value)}><MenuItem value="image/webp">WebP</MenuItem><MenuItem value="image/jpeg">JPEG</MenuItem><MenuItem value="image/png">PNG</MenuItem></Select></FormControl>
        <TextField label="Quality 0–1" value={quality} onChange={(e) => setQuality(e.target.value)} />
      </Box>
      <FormControlLabel control={<Checkbox checked={keep} onChange={(e) => setKeep(e.target.checked)} />} label="Giữ tỷ lệ" />
      <Button variant="outlined" disabled={!files.length} onClick={() => void process()}>Xử lý {files.length} ảnh</Button>
      {results.map((item) => <Button key={item.url} component="a" href={item.url} download={item.name}>{item.name} · {item.size}</Button>)}
    </Stack>
  </>;
}

function FilenameTool() {
  const [input, setInput] = useState("");
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [number, setNumber] = useState(false);
  const output = useMemo(() => input.split("\n").filter(Boolean).map((name, index) => {
    const dot = name.lastIndexOf(".");
    const ext = dot > 0 ? name.slice(dot).toLowerCase() : "";
    const base = cleanFilename(dot > 0 ? name.slice(0, dot) : name);
    return prefix + (number ? String(index + 1).padStart(3, "0") + "-" : "") + base + suffix + ext;
  }).join("\n"), [input, prefix, suffix, number]);
  return <>
    <ToolHeader title="Filename Cleaner" description="Bỏ dấu, chuẩn hóa, prefix/suffix và đánh số tên file." />
    <Stack spacing={2}>
      <TextField multiline minRows={7} label="Tên file, mỗi dòng một tên" value={input} onChange={(e) => setInput(e.target.value)} />
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1}><TextField label="Prefix" value={prefix} onChange={(e) => setPrefix(e.target.value)} /><TextField label="Suffix" value={suffix} onChange={(e) => setSuffix(e.target.value)} /></Stack>
      <FormControlLabel control={<Checkbox checked={number} onChange={(e) => setNumber(e.target.checked)} />} label="Đánh số" />
      <TextField multiline minRows={7} label="Tên mới" value={output} InputProps={{ readOnly: true }} />
      <Button variant="outlined" disabled={!output} onClick={() => navigator.clipboard.writeText(output)}>Copy</Button>
    </Stack>
  </>;
}

function QrPresetTool() {
  const [type, setType] = useState("url");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [d, setD] = useState("");
  const [preview, setPreview] = useState("");
  const payload = useMemo(() => {
    if (type === "wifi") return "WIFI:T:WPA;S:" + a + ";P:" + b + ";;";
    if (type === "vcard") return "BEGIN:VCARD\nVERSION:3.0\nFN:" + a + "\nORG:" + d + "\nTEL:" + b + "\nEMAIL:" + c + "\nEND:VCARD";
    if (type === "email") return "mailto:" + a + "?subject=" + encodeURIComponent(b) + "&body=" + encodeURIComponent(c);
    if (type === "phone") return "tel:" + a;
    if (type === "sms") return "sms:" + a + "?body=" + encodeURIComponent(b);
    return a;
  }, [type, a, b, c, d]);
  return <>
    <ToolHeader title="QR Presets" description="URL, Wi-Fi, vCard, email, phone và SMS." />
    <Stack spacing={2}>
      <FormControl><InputLabel>Loại</InputLabel><Select label="Loại" value={type} onChange={(e) => { setType(e.target.value); setPreview(""); }}><MenuItem value="url">URL</MenuItem><MenuItem value="wifi">Wi-Fi</MenuItem><MenuItem value="vcard">vCard</MenuItem><MenuItem value="email">Email</MenuItem><MenuItem value="phone">Phone</MenuItem><MenuItem value="sms">SMS</MenuItem></Select></FormControl>
      <TextField label={type === "wifi" ? "SSID" : type === "vcard" ? "Họ tên" : type === "email" ? "Email" : type === "phone" || type === "sms" ? "Số điện thoại" : "URL"} value={a} onChange={(e) => setA(e.target.value)} />
      {["wifi","vcard","email","sms"].includes(type) && <TextField label={type === "wifi" ? "Mật khẩu" : type === "vcard" ? "Điện thoại" : type === "email" ? "Tiêu đề" : "Nội dung SMS"} value={b} onChange={(e) => setB(e.target.value)} />}
      {["vcard","email"].includes(type) && <TextField label={type === "vcard" ? "Email" : "Nội dung"} value={c} onChange={(e) => setC(e.target.value)} />}
      {type === "vcard" && <TextField label="Tổ chức" value={d} onChange={(e) => setD(e.target.value)} />}
      <Button variant="contained" disabled={!a} onClick={() => void qrPng(payload).then(setPreview)}>Tạo QR</Button>
      {preview && <Paper variant="outlined" sx={{ p: 2, display: "grid", placeItems: "center", gap: 1 }}><Box component="img" src={preview} alt="QR" sx={{ width: 240, maxWidth: "100%" }} /><Button component="a" href={preview} download="qr-preset.png">PNG</Button></Paper>}
    </Stack>
  </>;
}

function BatchQrTool() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState<Array<{ text: string; url: string }>>([]);
  const make = async () => {
    const lines = input.split("\n").map((line) => line.trim()).filter(Boolean).slice(0, 50);
    const next: Array<{ text: string; url: string }> = [];
    for (const line of lines) next.push({ text: line, url: await qrPng(line, 220) });
    setItems(next);
  };
  return <>
    <ToolHeader title="Batch QR" description="Tạo tối đa 50 QR từ danh sách, mỗi dòng một mã." />
    <Stack spacing={2}>
      <TextField multiline minRows={8} label="Mỗi dòng một nội dung" value={input} onChange={(e) => setInput(e.target.value)} />
      <Button variant="contained" disabled={!input.trim()} onClick={() => void make()}>Tạo QR</Button>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4,1fr)" }, gap: 1 }}>
        {items.map((item, i) => <Paper key={i} variant="outlined" sx={{ p: 1, minWidth: 0 }}><Box component="img" src={item.url} alt="" sx={{ width: "100%" }} /><Typography variant="caption" noWrap>{item.text}</Typography><Button size="small" component="a" href={item.url} download={"qr-" + String(i + 1).padStart(3, "0") + ".png"}>PNG</Button></Paper>)}
      </Box>
    </Stack>
  </>;
}

function RegexTool() {
  const [input, setInput] = useState("");
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [replacement, setReplacement] = useState("");
  let output = input;
  let error = "";
  if (pattern) {
    try { output = input.replace(new RegExp(pattern, flags), replacement); } catch (caught) { error = caught instanceof Error ? caught.message : "Regex lỗi."; }
  }
  return <>
    <ToolHeader title="Regex / Search Replace" description="Tìm và thay thế nâng cao bằng regular expression." />
    <Stack spacing={2}>
      <TextField multiline minRows={7} label="Nội dung" value={input} onChange={(e) => setInput(e.target.value)} />
      <Stack direction={{ xs: "column", md: "row" }} spacing={1}><TextField fullWidth label="Pattern" value={pattern} onChange={(e) => setPattern(e.target.value)} /><TextField label="Flags" value={flags} onChange={(e) => setFlags(e.target.value)} /><TextField fullWidth label="Replacement" value={replacement} onChange={(e) => setReplacement(e.target.value)} /></Stack>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField multiline minRows={7} label="Kết quả" value={output} InputProps={{ readOnly: true }} />
    </Stack>
  </>;
}

function MarkdownTool() {
  const [input, setInput] = useState("");
  const [plain, setPlain] = useState(true);
  const output = plain ? markdownPlain(input) : plainMarkdown(input);
  return <>
    <ToolHeader title="Markdown ↔ Plain text" description="Dọn Markdown thành text thuần hoặc chuẩn hóa bullet từ text." />
    <Stack spacing={2}>
      <Stack direction="row" spacing={1}><Button variant={plain ? "contained" : "outlined"} onClick={() => setPlain(true)}>Markdown → Plain</Button><Button variant={!plain ? "contained" : "outlined"} onClick={() => setPlain(false)}>Plain → Markdown</Button></Stack>
      <TextField multiline minRows={7} label="Đầu vào" value={input} onChange={(e) => setInput(e.target.value)} />
      <TextField multiline minRows={7} label="Kết quả" value={output} InputProps={{ readOnly: true }} />
    </Stack>
  </>;
}

function HtmlTableTool() {
  const [input, setInput] = useState("");
  const [htmlToCsv, setHtmlToCsv] = useState(true);
  let output = "";
  let error = "";
  try {
    if (input) {
      if (htmlToCsv) {
        const doc = new DOMParser().parseFromString(input, "text/html");
        const table = doc.querySelector("table");
        if (!table) throw new Error("Không tìm thấy <table>.");
        output = toCsv(Array.from(table.querySelectorAll("tr")).map((row) => Array.from(row.querySelectorAll("th,td")).map((cell) => cell.textContent?.trim() || "")));
      } else {
        const rows = parseCsv(input);
        output = "<table>\n" + rows.map((row) => "  <tr>" + row.map((cell) => "<td>" + cell.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;") + "</td>").join("") + "</tr>").join("\n") + "\n</table>";
      }
    }
  } catch (caught) { error = caught instanceof Error ? caught.message : "Không chuyển đổi được."; }
  return <>
    <ToolHeader title="HTML Table ↔ CSV" description="Chuyển bảng HTML sang CSV và ngược lại." />
    <Stack spacing={2}>
      <Stack direction="row" spacing={1}><Button variant={htmlToCsv ? "contained" : "outlined"} onClick={() => setHtmlToCsv(true)}>HTML → CSV</Button><Button variant={!htmlToCsv ? "contained" : "outlined"} onClick={() => setHtmlToCsv(false)}>CSV → HTML</Button></Stack>
      <TextField multiline minRows={8} label="Đầu vào" value={input} onChange={(e) => setInput(e.target.value)} />
      {error && <Alert severity="error">{error}</Alert>}
      <TextField multiline minRows={8} label="Kết quả" value={output} InputProps={{ readOnly: true }} />
    </Stack>
  </>;
}

function ChecksumTool() {
  const [file, setFile] = useState<File | null>(null);
  const [algorithm, setAlgorithm] = useState("SHA-256");
  const [result, setResult] = useState("");
  const run = async () => {
    if (!file) return;
    const digest = await crypto.subtle.digest(algorithm, await file.arrayBuffer());
    setResult(Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join(""));
  };
  return <>
    <ToolHeader title="File Checksum" description="Tính SHA checksum của file ngay trên thiết bị." />
    <Stack spacing={2}>
      <Button component="label" variant="contained">Chọn file<input hidden type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} /></Button>
      <FormControl><InputLabel>Thuật toán</InputLabel><Select label="Thuật toán" value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}><MenuItem value="SHA-256">SHA-256</MenuItem><MenuItem value="SHA-384">SHA-384</MenuItem><MenuItem value="SHA-512">SHA-512</MenuItem><MenuItem value="SHA-1">SHA-1</MenuItem></Select></FormControl>
      <Button variant="outlined" disabled={!file} onClick={() => void run()}>Tính checksum</Button>
      <TextField multiline minRows={3} label="Digest" value={result} InputProps={{ readOnly: true }} />
    </Stack>
  </>;
}

function Base64FileTool() {
  const [value, setValue] = useState("");
  const [filename, setFilename] = useState("decoded.bin");
  const [mime, setMime] = useState("application/octet-stream");
  const encode = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => { setValue(String(reader.result || "")); setFilename(file.name); setMime(file.type || "application/octet-stream"); };
    reader.readAsDataURL(file);
  };
  const decode = () => {
    const source = value.trim();
    const comma = source.indexOf(",");
    const raw = comma >= 0 ? source.slice(comma + 1) : source;
    const match = /^data:([^;]+);base64,/.exec(source);
    const binary = atob(raw.replace(/\s+/g, ""));
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
    downloadBlob(bytes, filename, match?.[1] || mime);
  };
  return <>
    <ToolHeader title="File ↔ Base64" description="Encode file thành Data URL/Base64 hoặc decode Base64 về file." />
    <Stack spacing={2}>
      <Button component="label" variant="contained">Chọn file để encode<input hidden type="file" onChange={(e) => { const f = e.target.files?.[0]; if (f) encode(f); }} /></Button>
      <TextField multiline minRows={8} label="Base64 / Data URL" value={value} onChange={(e) => setValue(e.target.value)} />
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1}><TextField fullWidth label="Tên file" value={filename} onChange={(e) => setFilename(e.target.value)} /><TextField fullWidth label="MIME" value={mime} onChange={(e) => setMime(e.target.value)} /></Stack>
      <Button variant="outlined" disabled={!value.trim()} onClick={decode}>Decode & tải file</Button>
    </Stack>
  </>;
}

export default function OfficeExtraTool({ tool }: { tool: ExtraToolId }) {
  if (tool === "diff") return <DiffTool />;
  if (tool === "pdfcopy") return <PdfCopyTool />;
  if (tool === "moneywords") return <MoneyTool />;
  if (tool === "datewords") return <DateWordsTool />;
  if (tool === "sheetclean") return <SheetCleanTool />;
  if (tool === "csvmerge") return <CsvTool />;
  if (tool === "image") return <ImageTool />;
  if (tool === "filename") return <FilenameTool />;
  if (tool === "qrpresets") return <QrPresetTool />;
  if (tool === "batchqr") return <BatchQrTool />;
  if (tool === "regex") return <RegexTool />;
  if (tool === "markdown") return <MarkdownTool />;
  if (tool === "htmltable") return <HtmlTableTool />;
  if (tool === "checksum") return <ChecksumTool />;
  return <Base64FileTool />;
}
