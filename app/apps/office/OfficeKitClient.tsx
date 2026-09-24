"use client";

import {
  AccessTimeOutlined,
  ContentCopyOutlined,
  DataObjectOutlined,
  DescriptionOutlined,
  DownloadOutlined,
  EventOutlined,
  FingerprintOutlined,
  GridOnOutlined,
  LinkOutlined,
  ListAltOutlined,
  PercentOutlined,
  QrCode2Outlined,
  StraightenOutlined,
  TextFieldsOutlined,
  UploadFileOutlined,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo, useRef, useState } from "react";

type ToolId =
  | "text"
  | "list"
  | "extract"
  | "date"
  | "percent"
  | "unit"
  | "timestamp"
  | "identity"
  | "pdf"
  | "sheet"
  | "qr"
  | "encode"
  | "json";

type PdfDocument = {
  getPageCount(): number;
};

type PdfLibApi = {
  PDFDocument: {
    load(bytes: ArrayBuffer | Uint8Array): Promise<PdfDocument & {
      copyPages(source: PdfDocument, indexes: number[]): Promise<unknown[]>;
      addPage(page: unknown): void;
      save(): Promise<Uint8Array<ArrayBuffer>>;
    }>;
    create(): Promise<PdfDocument & {
      copyPages(source: PdfDocument, indexes: number[]): Promise<unknown[]>;
      addPage(page: unknown): void;
      save(): Promise<Uint8Array<ArrayBuffer>>;
    }>;
  };
};

type SheetJsApi = {
  read(data: ArrayBuffer, options: { type: "array" }): {
    SheetNames: string[];
    Sheets: Record<string, unknown>;
  };
  writeFile(workbook: unknown, filename: string): void;
  utils: {
    sheet_to_json(sheet: unknown, options: { header: 1; raw: boolean }): unknown[][];
    sheet_to_csv(sheet: unknown): string;
    aoa_to_sheet(rows: string[][]): unknown;
    book_new(): unknown;
    book_append_sheet(workbook: unknown, sheet: unknown, name: string): void;
  };
};

type QrApi = new (
  element: HTMLElement,
  options: {
    text: string;
    width: number;
    height: number;
    correctLevel: number;
  },
) => void;

declare global {
  interface Window {
    PDFLib?: PdfLibApi;
    XLSX?: SheetJsApi;
    QRCode?: QrApi & { CorrectLevel: { M: number } };
  }
}


type UnitDefinition = {
  label: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
};

type UnitGroup = {
  label: string;
  units: Record<string, UnitDefinition>;
};

const linearUnit = (label: string, factor: number): UnitDefinition => ({
  label,
  toBase: (value) => value * factor,
  fromBase: (value) => value / factor,
});

const UNIT_GROUPS: Record<string, UnitGroup> = {
  length: {
    label: "Độ dài",
    units: {
      mm: linearUnit("Millimetre (mm)", 0.001),
      cm: linearUnit("Centimetre (cm)", 0.01),
      m: linearUnit("Metre (m)", 1),
      km: linearUnit("Kilometre (km)", 1000),
      inch: linearUnit("Inch (in)", 0.0254),
      ft: linearUnit("Foot (ft)", 0.3048),
      yd: linearUnit("Yard (yd)", 0.9144),
      mi: linearUnit("Mile (mi)", 1609.344),
    },
  },
  mass: {
    label: "Khối lượng",
    units: {
      mg: linearUnit("Milligram (mg)", 0.000001),
      g: linearUnit("Gram (g)", 0.001),
      kg: linearUnit("Kilogram (kg)", 1),
      tonne: linearUnit("Tonne (t)", 1000),
      oz: linearUnit("Ounce (oz)", 0.028349523125),
      lb: linearUnit("Pound (lb)", 0.45359237),
    },
  },
  area: {
    label: "Diện tích",
    units: {
      cm2: linearUnit("cm²", 0.0001),
      m2: linearUnit("m²", 1),
      km2: linearUnit("km²", 1_000_000),
      ha: linearUnit("Hectare (ha)", 10_000),
      ft2: linearUnit("ft²", 0.09290304),
      acre: linearUnit("Acre", 4046.8564224),
    },
  },
  volume: {
    label: "Thể tích",
    units: {
      ml: linearUnit("Millilitre (mL)", 0.001),
      l: linearUnit("Litre (L)", 1),
      m3: linearUnit("m³", 1000),
      tsp: linearUnit("Teaspoon (US)", 0.00492892159375),
      tbsp: linearUnit("Tablespoon (US)", 0.01478676478125),
      cup: linearUnit("Cup (US)", 0.2365882365),
      floz: linearUnit("Fluid ounce (US)", 0.0295735295625),
      gal: linearUnit("Gallon (US)", 3.785411784),
    },
  },
  speed: {
    label: "Tốc độ",
    units: {
      ms: linearUnit("m/s", 1),
      kmh: linearUnit("km/h", 1 / 3.6),
      mph: linearUnit("mph", 0.44704),
      knot: linearUnit("Knot", 0.5144444444444445),
    },
  },
  temperature: {
    label: "Nhiệt độ",
    units: {
      c: {
        label: "Celsius (°C)",
        toBase: (value) => value,
        fromBase: (value) => value,
      },
      f: {
        label: "Fahrenheit (°F)",
        toBase: (value) => (value - 32) * 5 / 9,
        fromBase: (value) => value * 9 / 5 + 32,
      },
      k: {
        label: "Kelvin (K)",
        toBase: (value) => value - 273.15,
        fromBase: (value) => value + 273.15,
      },
    },
  },
  data: {
    label: "Dung lượng dữ liệu",
    units: {
      b: linearUnit("Byte (B)", 1),
      kb: linearUnit("Kilobyte (KB)", 1000),
      mb: linearUnit("Megabyte (MB)", 1_000_000),
      gb: linearUnit("Gigabyte (GB)", 1_000_000_000),
      tb: linearUnit("Terabyte (TB)", 1_000_000_000_000),
      kib: linearUnit("Kibibyte (KiB)", 1024),
      mib: linearUnit("Mebibyte (MiB)", 1_048_576),
      gib: linearUnit("Gibibyte (GiB)", 1_073_741_824),
    },
  },
};

function toLocalDateTimeInput(date: Date) {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function createUuidV4() {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

const tools: Array<{
  id: ToolId;
  label: string;
  detail: string;
  icon: typeof TextFieldsOutlined;
}> = [
  { id: "text", label: "Text", detail: "Clean & case", icon: TextFieldsOutlined },
  { id: "list", label: "Lists", detail: "Sort & dedupe", icon: ListAltOutlined },
  { id: "extract", label: "Extract", detail: "Email · URL · phone", icon: LinkOutlined },
  { id: "date", label: "Dates", detail: "Workdays", icon: EventOutlined },
  { id: "percent", label: "Percent", detail: "VAT & changes", icon: PercentOutlined },
  { id: "unit", label: "Units", detail: "Metric · imperial", icon: StraightenOutlined },
  { id: "timestamp", label: "Timestamp", detail: "Unix · ISO · local", icon: AccessTimeOutlined },
  { id: "identity", label: "UUID / Hash", detail: "UUID v4 · SHA", icon: FingerprintOutlined },
  { id: "pdf", label: "PDF", detail: "Merge & extract", icon: DescriptionOutlined },
  { id: "sheet", label: "Excel / CSV", detail: "Preview & convert", icon: GridOnOutlined },
  { id: "qr", label: "QR", detail: "Create PNG", icon: QrCode2Outlined },
  { id: "encode", label: "Encode", detail: "Slug · URL · Base64", icon: DataObjectOutlined },
  { id: "json", label: "JSON", detail: "Format & validate", icon: DataObjectOutlined },
];

function downloadBlob(data: BlobPart, filename: string, type: string) {
  const url = URL.createObjectURL(new Blob([data], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 500);
}

function loadScript(id: string, src: string) {
  return new Promise<void>((resolve, reject) => {
    const existing = document.getElementById(id) as HTMLScriptElement | null;
    if (existing?.dataset.loaded === "true") {
      resolve();
      return;
    }
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Không tải được thư viện.")), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.id = id;
    script.src = src;
    script.async = true;
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    script.onerror = () => reject(new Error("Không tải được thư viện."));
    document.head.appendChild(script);
  });
}

function ToolHeader({
  title,
  description,
  local = true,
}: {
  title: string;
  description: string;
  local?: boolean;
}) {
  return (
    <Box sx={{ mb: 1.5 }}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.75 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 750 }}>
          {title}
        </Typography>
        {local && <Chip label="Local" size="small" variant="outlined" />}
      </Stack>
      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
        {description}
      </Typography>
    </Box>
  );
}

function CopyButton({ value }: { value: string }) {
  return (
    <Button
      size="small"
      variant="outlined"
      startIcon={<ContentCopyOutlined />}
      onClick={() => navigator.clipboard.writeText(value)}
      disabled={!value}
    >
      Copy
    </Button>
  );
}

export default function OfficeKitClient() {
  const [tool, setTool] = useState<ToolId>("text");

  const [textInput, setTextInput] = useState("");
  const [textOutput, setTextOutput] = useState("");
  const textStats = useMemo(() => {
    const words = textInput.trim().match(/\S+/g)?.length ?? 0;
    return {
      words,
      chars: textInput.length,
      lines: textInput ? textInput.split(/\r?\n/).length : 0,
    };
  }, [textInput]);

  const [listInput, setListInput] = useState("");
  const [listOutput, setListOutput] = useState("");
  const [extractInput, setExtractInput] = useState("");
  const [extractOutput, setExtractOutput] = useState("");

  const today = new Date().toISOString().slice(0, 10);
  const [dateStart, setDateStart] = useState(today);
  const [dateEnd, setDateEnd] = useState(today);

  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("10");
  const [percentResult, setPercentResult] = useState("—");
  const [vatAmount, setVatAmount] = useState("");
  const [vatRate, setVatRate] = useState("10");

  const [unitCategory, setUnitCategory] = useState("length");
  const [unitFrom, setUnitFrom] = useState("m");
  const [unitTo, setUnitTo] = useState("km");
  const [unitValue, setUnitValue] = useState("1");

  const [timestampValue, setTimestampValue] = useState("");
  const [timestampPrecision, setTimestampPrecision] = useState<"seconds" | "milliseconds">("seconds");
  const [dateTimeValue, setDateTimeValue] = useState("");

  const [uuidCount, setUuidCount] = useState("1");
  const [uuidOutput, setUuidOutput] = useState("");
  const [hashInput, setHashInput] = useState("");
  const [hashAlgorithm, setHashAlgorithm] = useState<"SHA-1" | "SHA-256" | "SHA-384" | "SHA-512">("SHA-256");
  const [hashOutput, setHashOutput] = useState("");

  const [encodeInput, setEncodeInput] = useState("");
  const [encodeOutput, setEncodeOutput] = useState("");
  const [jsonInput, setJsonInput] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");
  const [jsonStatus, setJsonStatus] = useState("");

  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const [pdfRange, setPdfRange] = useState("1");
  const [pdfStatus, setPdfStatus] = useState("Chưa chọn tệp.");
  const pdfInputRef = useRef<HTMLInputElement | null>(null);

  const [sheetFile, setSheetFile] = useState<File | null>(null);
  const [sheetName, setSheetName] = useState("");
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  const [sheetRows, setSheetRows] = useState<unknown[][]>([]);
  const [sheetStatus, setSheetStatus] = useState("Chưa chọn tệp.");
  const sheetInputRef = useRef<HTMLInputElement | null>(null);
  const workbookRef = useRef<ReturnType<SheetJsApi["read"]> | null>(null);

  const [csvInput, setCsvInput] = useState("");
  const [qrText, setQrText] = useState("https://bdx0.github.io/");
  const qrHostRef = useRef<HTMLDivElement | null>(null);

  const listLines = () =>
    listInput
      .split(/\r?\n/)
      .map((item) => item.trim())
      .filter(Boolean);

  const dateMetrics = useMemo(() => {
    const startDate = new Date(dateStart + "T00:00:00");
    const endDate = new Date(dateEnd + "T00:00:00");
    const diff = Math.round((endDate.getTime() - startDate.getTime()) / 86400000);
    const min = diff >= 0 ? startDate : endDate;
    const max = diff >= 0 ? endDate : startDate;
    let workdays = 0;
    const cursor = new Date(min);
    while (cursor <= max) {
      const day = cursor.getDay();
      if (day !== 0 && day !== 6) workdays += 1;
      cursor.setDate(cursor.getDate() + 1);
    }
    return { diff, inclusive: Math.abs(diff) + 1, workdays };
  }, [dateStart, dateEnd]);

  const n = (value: string) => Number(value.replace(/,/g, ""));

  const unitGroup = UNIT_GROUPS[unitCategory];
  const unitResult = useMemo(() => {
    const input = Number(unitValue.replace(/,/g, ""));
    const from = UNIT_GROUPS[unitCategory]?.units[unitFrom];
    const to = UNIT_GROUPS[unitCategory]?.units[unitTo];
    if (!Number.isFinite(input) || !from || !to) return "—";
    const result = to.fromBase(from.toBase(input));
    return new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 10 }).format(result);
  }, [unitCategory, unitFrom, unitTo, unitValue]);

  const timestampResult = useMemo(() => {
    if (!timestampValue.trim()) return null;
    const value = Number(timestampValue);
    if (!Number.isFinite(value)) return null;
    const date = new Date(timestampPrecision === "seconds" ? value * 1000 : value);
    if (Number.isNaN(date.getTime())) return null;
    return {
      iso: date.toISOString(),
      local: date.toLocaleString("vi-VN"),
      seconds: Math.floor(date.getTime() / 1000).toString(),
      milliseconds: date.getTime().toString(),
    };
  }, [timestampPrecision, timestampValue]);

  const dateTimeResult = useMemo(() => {
    if (!dateTimeValue) return null;
    const date = new Date(dateTimeValue);
    if (Number.isNaN(date.getTime())) return null;
    return {
      seconds: Math.floor(date.getTime() / 1000).toString(),
      milliseconds: date.getTime().toString(),
      iso: date.toISOString(),
    };
  }, [dateTimeValue]);

  const hashText = async () => {
    const bytes = new TextEncoder().encode(hashInput);
    const digest = await crypto.subtle.digest(hashAlgorithm, bytes);
    setHashOutput(
      Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join(""),
    );
  };

  const fmt = (value: number) =>
    Number.isFinite(value)
      ? new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 4 }).format(value)
      : "Không hợp lệ";

  const runText = (action: string) => {
    let result = textInput;
    if (action === "clean") {
      result = result.replace(/[ \t]+/g, " ").replace(/ *\n */g, "\n").trim();
    }
    if (action === "blank") {
      result = result
        .split(/\r?\n/)
        .filter((line) => line.trim())
        .join("\n");
    }
    if (action === "upper") result = result.toUpperCase();
    if (action === "lower") result = result.toLowerCase();
    if (action === "title") {
      result = result
        .toLowerCase()
        .replace(/(^|\s)(\S)/g, (_, space: string, char: string) => space + char.toUpperCase());
    }
    if (action === "sentence") {
      result = result
        .toLowerCase()
        .replace(/(^\s*|[.!?]\s+)([a-zà-ỹ])/g, (_, prefix: string, char: string) => prefix + char.toUpperCase());
    }
    setTextOutput(result);
  };

  const runList = (action: string) => {
    let rows = listLines();
    if (action === "dedupe") rows = Array.from(new Set(rows));
    if (action === "asc") rows.sort((a, b) => a.localeCompare(b, "vi"));
    if (action === "desc") rows.sort((a, b) => b.localeCompare(a, "vi"));
    if (action === "reverse") rows.reverse();
    if (action === "number") rows = rows.map((row, index) => `${index + 1}. ${row}`);
    setListOutput(rows.join("\n"));
  };

  const runExtract = (kind: string) => {
    let matches: string[] = [];
    if (kind === "email") {
      matches = extractInput.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) ?? [];
    }
    if (kind === "url") {
      matches = extractInput.match(/https?:\/\/[^\s<>"']+/gi) ?? [];
    }
    if (kind === "phone") {
      matches = extractInput.match(/(?:\+?84|0)(?:[\s.-]*\d){8,10}/g) ?? [];
    }
    setExtractOutput(Array.from(new Set(matches.map((item) => item.trim()))).join("\n"));
  };

  const ensurePdfLib = async () => {
    if (!window.PDFLib) {
      await loadScript(
        "office-pdf-lib",
        "https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js",
      );
    }
    if (!window.PDFLib) throw new Error("PDF library chưa sẵn sàng.");
    return window.PDFLib;
  };

  const mergePdfs = async () => {
    if (!pdfFiles.length) return;
    try {
      setPdfStatus("Đang ghép PDF…");
      const api = await ensurePdfLib();
      const output = await api.PDFDocument.create();
      for (const file of pdfFiles) {
        const source = await api.PDFDocument.load(await file.arrayBuffer());
        const indexes = Array.from({ length: source.getPageCount() }, (_, index) => index);
        const pages = await output.copyPages(source, indexes);
        pages.forEach((page) => output.addPage(page));
      }
      const bytes = await output.save();
      downloadBlob(bytes, "merged.pdf", "application/pdf");
      setPdfStatus(`Đã ghép ${pdfFiles.length} tệp.`);
    } catch (error) {
      setPdfStatus(error instanceof Error ? error.message : "Không thể ghép PDF.");
    }
  };

  const parsePageRange = (value: string, total: number) => {
    const indexes = new Set<number>();
    value
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean)
      .forEach((part) => {
        const range = part.match(/^(\d+)\s*-\s*(\d+)$/);
        if (range) {
          const from = Number(range[1]);
          const to = Number(range[2]);
          for (let page = Math.min(from, to); page <= Math.max(from, to); page += 1) {
            if (page >= 1 && page <= total) indexes.add(page - 1);
          }
          return;
        }
        const page = Number(part);
        if (page >= 1 && page <= total) indexes.add(page - 1);
      });
    return Array.from(indexes).sort((a, b) => a - b);
  };

  const extractPdfPages = async () => {
    const file = pdfFiles[0];
    if (!file) return;
    try {
      setPdfStatus("Đang tách trang…");
      const api = await ensurePdfLib();
      const source = await api.PDFDocument.load(await file.arrayBuffer());
      const indexes = parsePageRange(pdfRange, source.getPageCount());
      if (!indexes.length) throw new Error("Khoảng trang không hợp lệ.");
      const output = await api.PDFDocument.create();
      const pages = await output.copyPages(source, indexes);
      pages.forEach((page) => output.addPage(page));
      const bytes = await output.save();
      downloadBlob(bytes, "extracted-pages.pdf", "application/pdf");
      setPdfStatus(`Đã xuất ${indexes.length} trang.`);
    } catch (error) {
      setPdfStatus(error instanceof Error ? error.message : "Không thể tách PDF.");
    }
  };

  const ensureXlsx = async () => {
    if (!window.XLSX) {
      await loadScript(
        "office-xlsx",
        "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js",
      );
    }
    if (!window.XLSX) throw new Error("Excel library chưa sẵn sàng.");
    return window.XLSX;
  };

  const openSheet = async (file: File) => {
    try {
      setSheetFile(file);
      setSheetStatus("Đang đọc bảng tính…");
      const api = await ensureXlsx();
      const workbook = api.read(await file.arrayBuffer(), { type: "array" });
      workbookRef.current = workbook;
      setSheetNames(workbook.SheetNames);
      const first = workbook.SheetNames[0] ?? "";
      setSheetName(first);
      const rows = first
        ? api.utils.sheet_to_json(workbook.Sheets[first], { header: 1, raw: false })
        : [];
      setSheetRows(rows.slice(0, 30));
      setSheetStatus(`${file.name} · ${workbook.SheetNames.length} sheet`);
    } catch (error) {
      setSheetStatus(error instanceof Error ? error.message : "Không thể đọc file.");
    }
  };

  const selectSheet = (name: string) => {
    setSheetName(name);
    const api = window.XLSX;
    const workbook = workbookRef.current;
    if (!api || !workbook || !name) return;
    setSheetRows(
      api.utils
        .sheet_to_json(workbook.Sheets[name], { header: 1, raw: false })
        .slice(0, 30),
    );
  };

  const exportSheetCsv = () => {
    const api = window.XLSX;
    const workbook = workbookRef.current;
    if (!api || !workbook || !sheetName) return;
    const csv = api.utils.sheet_to_csv(workbook.Sheets[sheetName]);
    downloadBlob(csv, `${sheetName || "sheet"}.csv`, "text/csv;charset=utf-8");
  };

  const csvToXlsx = async () => {
    try {
      const api = await ensureXlsx();
      const rows = csvInput
        .split(/\r?\n/)
        .filter(Boolean)
        .map((line) => line.split(",").map((cell) => cell.trim()));
      const sheet = api.utils.aoa_to_sheet(rows);
      const workbook = api.utils.book_new();
      api.utils.book_append_sheet(workbook, sheet, "Sheet1");
      api.writeFile(workbook, "converted.xlsx");
    } catch (error) {
      setSheetStatus(error instanceof Error ? error.message : "Không thể tạo XLSX.");
    }
  };

  const generateQr = async () => {
    if (!qrHostRef.current || !qrText.trim()) return;
    try {
      if (!window.QRCode) {
        await loadScript(
          "office-qrcode",
          "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js",
        );
      }
      if (!window.QRCode) throw new Error("QR library chưa sẵn sàng.");
      qrHostRef.current.innerHTML = "";
      new window.QRCode(qrHostRef.current, {
        text: qrText,
        width: 240,
        height: 240,
        correctLevel: window.QRCode.CorrectLevel.M,
      });
    } catch {
      // The empty preview makes a failed CDN load obvious without sending user data elsewhere.
    }
  };

  const downloadQr = () => {
    const host = qrHostRef.current;
    const canvas = host?.querySelector("canvas");
    const image = host?.querySelector("img");
    const src = canvas?.toDataURL("image/png") ?? image?.getAttribute("src");
    if (!src) return;
    const a = document.createElement("a");
    a.href = src;
    a.download = "qr-code.png";
    a.click();
  };

  const slugify = (value: string) =>
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const b64Encode = (value: string) => {
    const bytes = new TextEncoder().encode(value);
    let binary = "";
    bytes.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });
    return btoa(binary);
  };

  const b64Decode = (value: string) => {
    const binary = atob(value);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  };

  const renderTool = () => {
    if (tool === "text") {
      return (
        <>
          <ToolHeader
            title="Text Cleaner"
            description="Dọn văn bản, đổi kiểu chữ và xem thống kê nhanh trước khi dán sang Word, email hoặc biểu mẫu."
          />
          <Stack spacing={2}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <TextField
                label="Văn bản gốc"
                multiline
                minRows={5}
                fullWidth
                value={textInput}
                onChange={(event) => setTextInput(event.target.value)}
              />
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mt: 1.5 }}>
                <Chip size="small" label={`${textStats.words} từ`} />
                <Chip size="small" label={`${textStats.chars} ký tự`} />
                <Chip size="small" label={`${textStats.lines} dòng`} />
              </Stack>
            </Paper>
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              <Button variant="outlined" onClick={() => runText("clean")}>Dọn khoảng trắng</Button>
              <Button variant="outlined" onClick={() => runText("blank")}>Xóa dòng trống</Button>
              <Button variant="outlined" onClick={() => runText("upper")}>HOA</Button>
              <Button variant="outlined" onClick={() => runText("lower")}>thường</Button>
              <Button variant="outlined" onClick={() => runText("title")}>Viết Hoa Từ</Button>
              <Button variant="outlined" onClick={() => runText("sentence")}>Viết hoa câu</Button>
            </Stack>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <TextField
                label="Kết quả"
                multiline
                minRows={4}
                fullWidth
                value={textOutput}
                onChange={(event) => setTextOutput(event.target.value)}
              />
              <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
                <CopyButton value={textOutput} />
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<DownloadOutlined />}
                  disabled={!textOutput}
                  onClick={() =>
                    downloadBlob(textOutput, "office-kit.txt", "text/plain;charset=utf-8")
                  }
                >
                  TXT
                </Button>
              </Stack>
            </Paper>
          </Stack>
        </>
      );
    }

    if (tool === "list") {
      const rows = listLines();
      return (
        <>
          <ToolHeader title="List Tools" description="Chuẩn hóa danh sách theo dòng: loại trùng, sắp xếp, đảo thứ tự hoặc đánh số." />
          <Stack spacing={2}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <TextField label="Danh sách" multiline minRows={5} fullWidth value={listInput} onChange={(event) => setListInput(event.target.value)} />
              <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
                <Chip size="small" label={`${rows.length} dòng`} />
                <Chip size="small" label={`${new Set(rows).size} duy nhất`} />
              </Stack>
            </Paper>
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              <Button variant="outlined" onClick={() => runList("dedupe")}>Loại trùng</Button>
              <Button variant="outlined" onClick={() => runList("asc")}>A → Z</Button>
              <Button variant="outlined" onClick={() => runList("desc")}>Z → A</Button>
              <Button variant="outlined" onClick={() => runList("reverse")}>Đảo thứ tự</Button>
              <Button variant="outlined" onClick={() => runList("number")}>Đánh số</Button>
            </Stack>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <TextField label="Kết quả" multiline minRows={5} fullWidth value={listOutput} onChange={(event) => setListOutput(event.target.value)} />
              <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
                <CopyButton value={listOutput} />
                <Button size="small" onClick={() => setListInput(listOutput)} disabled={!listOutput}>Đưa về nguồn</Button>
              </Stack>
            </Paper>
          </Stack>
        </>
      );
    }

    if (tool === "extract") {
      return (
        <>
          <ToolHeader title="Extract" description="Trích nhanh email, URL hoặc số điện thoại ra khỏi một khối văn bản dài." />
          <Stack spacing={2}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <TextField label="Nguồn" multiline minRows={5} fullWidth value={extractInput} onChange={(event) => setExtractInput(event.target.value)} />
            </Paper>
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" onClick={() => runExtract("email")}>Email</Button>
              <Button variant="outlined" onClick={() => runExtract("url")}>URL</Button>
              <Button variant="outlined" onClick={() => runExtract("phone")}>Điện thoại</Button>
            </Stack>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <TextField label="Kết quả duy nhất" multiline minRows={4} fullWidth value={extractOutput} onChange={(event) => setExtractOutput(event.target.value)} />
              <Box sx={{ mt: 1.5 }}><CopyButton value={extractOutput} /></Box>
            </Paper>
          </Stack>
        </>
      );
    }

    if (tool === "date") {
      return (
        <>
          <ToolHeader title="Date & Workdays" description="Tính chênh lệch ngày và ngày làm việc từ thứ Hai đến thứ Sáu." />
          <Paper variant="outlined" sx={{ p: { xs: 2, md: 2.5 } }}>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
              <TextField type="date" label="Từ ngày" value={dateStart} onChange={(event) => setDateStart(event.target.value)} InputLabelProps={{ shrink: true }} />
              <TextField type="date" label="Đến ngày" value={dateEnd} onChange={(event) => setDateEnd(event.target.value)} InputLabelProps={{ shrink: true }} />
            </Box>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3,1fr)" }, gap: 1.5, mt: 2.5 }}>
              {[
                ["Chênh lệch", dateMetrics.diff, "ngày"],
                ["Tính cả hai đầu", dateMetrics.inclusive, "ngày lịch"],
                ["Ngày làm việc", dateMetrics.workdays, "T2–T6"],
              ].map(([label, value, unit]) => (
                <Paper key={label} variant="outlined" sx={{ p: 2, bgcolor: "background.default" }}>
                  <Typography variant="caption" color="text.secondary">{label}</Typography>
                  <Typography variant="h4" sx={{ my: 0.5, fontWeight: 750 }}>{value}</Typography>
                  <Typography variant="caption" color="text.secondary">{unit}</Typography>
                </Paper>
              ))}
            </Box>
            <Alert severity="info" sx={{ mt: 2 }}>Hiện chưa tự trừ ngày lễ; chỉ loại thứ Bảy và Chủ nhật.</Alert>
          </Paper>
        </>
      );
    }

    if (tool === "percent") {
      const vatBase = n(vatAmount);
      const vat = vatBase * n(vatRate) / 100;
      return (
        <>
          <ToolHeader title="Percent & VAT" description="Các phép tính phần trăm thường gặp trong dự toán, báo giá và bảng tính." />
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Stack spacing={2}>
                <TextField label="Giá trị" value={amount} onChange={(event) => setAmount(event.target.value)} />
                <TextField label="Tỷ lệ %" value={rate} onChange={(event) => setRate(event.target.value)} />
                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                  <Button variant="outlined" onClick={() => setPercentResult(fmt(n(amount) * n(rate) / 100))}>Tính %</Button>
                  <Button variant="outlined" onClick={() => setPercentResult(fmt(n(amount) * (1 + n(rate) / 100)))}>Cộng %</Button>
                  <Button variant="outlined" onClick={() => setPercentResult(fmt(n(amount) * (1 - n(rate) / 100)))}>Trừ %</Button>
                </Stack>
                <Typography variant="h5" sx={{ fontWeight: 750 }}>{percentResult}</Typography>
              </Stack>
            </Paper>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Stack spacing={2}>
                <TextField label="Giá trị chưa VAT" value={vatAmount} onChange={(event) => setVatAmount(event.target.value)} />
                <TextField label="VAT %" value={vatRate} onChange={(event) => setVatRate(event.target.value)} />
                <Box>
                  <Typography variant="body2" color="text.secondary">VAT</Typography>
                  <Typography variant="h6">{fmt(vat)}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Tổng sau VAT</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 750 }}>{fmt(vatBase + vat)}</Typography>
                </Box>
              </Stack>
            </Paper>
          </Box>
        </>
      );
    }


    if (tool === "unit") {
      const unitKeys = Object.keys(unitGroup.units);
      const changeCategory = (category: string) => {
        const keys = Object.keys(UNIT_GROUPS[category].units);
        setUnitCategory(category);
        setUnitFrom(keys[0]);
        setUnitTo(keys[1] ?? keys[0]);
      };
      return (
        <>
          <ToolHeader title="Unit Converter" description="Chuyển đổi nhanh độ dài, khối lượng, diện tích, thể tích, tốc độ, nhiệt độ và dung lượng dữ liệu." />
          <Paper variant="outlined" sx={{ p: { xs: 2, md: 2.5 } }}>
            <Stack spacing={2}>
              <FormControl fullWidth>
                <InputLabel id="unit-category-label">Nhóm đơn vị</InputLabel>
                <Select labelId="unit-category-label" label="Nhóm đơn vị" value={unitCategory} onChange={(event) => changeCategory(event.target.value)}>
                  {Object.entries(UNIT_GROUPS).map(([id, group]) => <MenuItem key={id} value={id}>{group.label}</MenuItem>)}
                </Select>
              </FormControl>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
                <Stack spacing={1.5}>
                  <TextField label="Giá trị" value={unitValue} onChange={(event) => setUnitValue(event.target.value)} inputMode="decimal" />
                  <FormControl fullWidth>
                    <InputLabel id="unit-from-label">Từ</InputLabel>
                    <Select labelId="unit-from-label" label="Từ" value={unitFrom} onChange={(event) => setUnitFrom(event.target.value)}>
                      {unitKeys.map((id) => <MenuItem key={id} value={id}>{unitGroup.units[id].label}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Stack>
                <Stack spacing={1.5}>
                  <TextField label="Kết quả" value={unitResult} InputProps={{ readOnly: true }} />
                  <FormControl fullWidth>
                    <InputLabel id="unit-to-label">Sang</InputLabel>
                    <Select labelId="unit-to-label" label="Sang" value={unitTo} onChange={(event) => setUnitTo(event.target.value)}>
                      {unitKeys.map((id) => <MenuItem key={id} value={id}>{unitGroup.units[id].label}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Stack>
              </Box>
              <Stack direction="row" spacing={1}>
                <Button variant="outlined" onClick={() => {
                  setUnitFrom(unitTo);
                  setUnitTo(unitFrom);
                }}>Đảo chiều</Button>
                <CopyButton value={unitResult === "—" ? "" : unitResult} />
              </Stack>
              {unitCategory === "data" && <Alert severity="info">KB/MB/GB dùng hệ thập phân (1000); KiB/MiB/GiB dùng hệ nhị phân (1024).</Alert>}
            </Stack>
          </Paper>
        </>
      );
    }

    if (tool === "timestamp") {
      const setNow = () => {
        const now = new Date();
        setTimestampPrecision("seconds");
        setTimestampValue(Math.floor(now.getTime() / 1000).toString());
        setDateTimeValue(toLocalDateTimeInput(now));
      };
      return (
        <>
          <ToolHeader title="Timestamp" description="Chuyển Unix timestamp ↔ ngày giờ, xem ISO 8601 và thời gian local của trình duyệt." />
          <Stack spacing={2}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Stack spacing={2}>
                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" alignItems="center">
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, flexGrow: 1 }}>Timestamp → Date</Typography>
                  <Button size="small" variant="outlined" onClick={setNow}>Lấy thời điểm hiện tại</Button>
                </Stack>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "minmax(0,1fr) 180px" }, gap: 1.5 }}>
                  <TextField label="Unix timestamp" value={timestampValue} onChange={(event) => setTimestampValue(event.target.value)} inputMode="numeric" />
                  <FormControl>
                    <InputLabel id="timestamp-precision-label">Đơn vị</InputLabel>
                    <Select labelId="timestamp-precision-label" label="Đơn vị" value={timestampPrecision} onChange={(event) => setTimestampPrecision(event.target.value as "seconds" | "milliseconds")}>
                      <MenuItem value="seconds">Seconds</MenuItem>
                      <MenuItem value="milliseconds">Milliseconds</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                {timestampResult ? (
                  <Stack spacing={1}>
                    <TextField label="ISO 8601" value={timestampResult.iso} InputProps={{ readOnly: true }} />
                    <TextField label="Local time" value={timestampResult.local} InputProps={{ readOnly: true }} />
                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                      <CopyButton value={timestampResult.iso} />
                      <Chip label={`${timestampResult.seconds} s`} variant="outlined" />
                      <Chip label={`${timestampResult.milliseconds} ms`} variant="outlined" />
                    </Stack>
                  </Stack>
                ) : <Alert severity="info">Nhập timestamp hoặc bấm “Lấy thời điểm hiện tại”.</Alert>}
              </Stack>
            </Paper>

            <Paper variant="outlined" sx={{ p: 2 }}>
              <Stack spacing={2}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Date → Timestamp</Typography>
                <TextField type="datetime-local" label="Ngày giờ local" value={dateTimeValue} onChange={(event) => setDateTimeValue(event.target.value)} InputLabelProps={{ shrink: true }} />
                {dateTimeResult && (
                  <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 1.5 }}>
                    <TextField label="Unix seconds" value={dateTimeResult.seconds} InputProps={{ readOnly: true }} />
                    <TextField label="Unix milliseconds" value={dateTimeResult.milliseconds} InputProps={{ readOnly: true }} />
                    <TextField sx={{ gridColumn: { sm: "1 / -1" } }} label="ISO 8601" value={dateTimeResult.iso} InputProps={{ readOnly: true }} />
                  </Box>
                )}
              </Stack>
            </Paper>
          </Stack>
        </>
      );
    }

    if (tool === "identity") {
      const generateUuids = () => {
        const count = Math.min(20, Math.max(1, Number(uuidCount) || 1));
        setUuidOutput(Array.from({ length: count }, () => createUuidV4()).join("\n"));
      };
      return (
        <>
          <ToolHeader title="UUID / Hash" description="Tạo UUID v4 và tính SHA hash bằng Web Crypto API ngay trên thiết bị." />
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Stack spacing={2}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>UUID v4</Typography>
                <TextField label="Số lượng (1–20)" value={uuidCount} onChange={(event) => setUuidCount(event.target.value)} inputMode="numeric" />
                <Button variant="contained" startIcon={<FingerprintOutlined />} onClick={generateUuids}>Tạo UUID</Button>
                <TextField multiline minRows={5} label="Kết quả" value={uuidOutput} onChange={(event) => setUuidOutput(event.target.value)} />
                <CopyButton value={uuidOutput} />
              </Stack>
            </Paper>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Stack spacing={2}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Hash text</Typography>
                <FormControl fullWidth>
                  <InputLabel id="hash-algorithm-label">Thuật toán</InputLabel>
                  <Select labelId="hash-algorithm-label" label="Thuật toán" value={hashAlgorithm} onChange={(event) => setHashAlgorithm(event.target.value as "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512")}>
                    <MenuItem value="SHA-1">SHA-1</MenuItem>
                    <MenuItem value="SHA-256">SHA-256</MenuItem>
                    <MenuItem value="SHA-384">SHA-384</MenuItem>
                    <MenuItem value="SHA-512">SHA-512</MenuItem>
                  </Select>
                </FormControl>
                <TextField multiline minRows={5} label="Nội dung" value={hashInput} onChange={(event) => setHashInput(event.target.value)} />
                <Button variant="outlined" onClick={hashText} disabled={!hashInput}>Tính hash</Button>
                <TextField multiline minRows={3} label="Hex digest" value={hashOutput} InputProps={{ readOnly: true }} />
                <CopyButton value={hashOutput} />
                <Alert severity="info">SHA-1 chỉ nên dùng cho tương thích/kiểm tra cũ; không nên dùng cho mục đích bảo mật mới.</Alert>
              </Stack>
            </Paper>
          </Box>
        </>
      );
    }

    if (tool === "pdf") {
      return (
        <>
          <ToolHeader title="PDF Tools" description="Ghép nhiều PDF hoặc tách một số trang thành file mới. File được xử lý trong trình duyệt." />
          <Stack spacing={2}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <input ref={pdfInputRef} hidden type="file" accept="application/pdf" multiple onChange={(event) => {
                const files = Array.from(event.target.files ?? []);
                setPdfFiles(files);
                setPdfStatus(files.length ? `${files.length} tệp đã chọn.` : "Chưa chọn tệp.");
              }} />
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" alignItems="center">
                <Button variant="contained" startIcon={<UploadFileOutlined />} onClick={() => pdfInputRef.current?.click()}>Chọn PDF</Button>
                <Chip label={pdfStatus} variant="outlined" />
              </Stack>
              {!!pdfFiles.length && (
                <Stack spacing={0.5} sx={{ mt: 2 }}>
                  {pdfFiles.map((file) => <Typography key={file.name + file.size} variant="body2">{file.name}</Typography>)}
                </Stack>
              )}
            </Paper>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Merge PDF</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ my: 1.25 }}>Ghép theo đúng thứ tự tệp đã chọn.</Typography>
                <Button variant="outlined" onClick={mergePdfs} disabled={!pdfFiles.length}>Ghép & tải PDF</Button>
              </Paper>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Extract pages</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ my: 1.25 }}>Dùng tệp đầu tiên. Ví dụ: 1,3,5-8.</Typography>
                <Stack spacing={1.25}>
                  <TextField size="small" label="Trang" value={pdfRange} onChange={(event) => setPdfRange(event.target.value)} />
                  <Button variant="outlined" onClick={extractPdfPages} disabled={!pdfFiles.length}>Tách & tải PDF</Button>
                </Stack>
              </Paper>
            </Box>
            <Alert severity="info">Thư viện PDF được tải khi bạn dùng công cụ; nội dung PDF không được upload lên dịch vụ xử lý.</Alert>
          </Stack>
        </>
      );
    }

    if (tool === "sheet") {
      return (
        <>
          <ToolHeader title="Excel / CSV Tools" description="Mở XLSX/XLS/CSV, xem nhanh dữ liệu, xuất sheet thành CSV hoặc chuyển CSV sang XLSX." />
          <Stack spacing={2}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <input ref={sheetInputRef} hidden type="file" accept=".xlsx,.xls,.csv,text/csv" onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) openSheet(file);
              }} />
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" alignItems="center">
                <Button variant="contained" startIcon={<UploadFileOutlined />} onClick={() => sheetInputRef.current?.click()}>Mở bảng tính</Button>
                <Chip label={sheetStatus} variant="outlined" />
              </Stack>
              {sheetNames.length > 0 && (
                <FormControl size="small" sx={{ minWidth: 220, mt: 2 }}>
                  <InputLabel id="sheet-label">Sheet</InputLabel>
                  <Select labelId="sheet-label" label="Sheet" value={sheetName} onChange={(event) => selectSheet(event.target.value)}>
                    {sheetNames.map((name) => <MenuItem key={name} value={name}>{name}</MenuItem>)}
                  </Select>
                </FormControl>
              )}
            </Paper>
            {sheetRows.length > 0 && (
              <Paper variant="outlined" sx={{ maxHeight: 320, overflow: "auto" }}>
                <Box component="table" sx={{ borderCollapse: "collapse", width: "100%", minWidth: 560, "& td": { borderBottom: 1, borderColor: "divider", px: 1.5, py: 1, fontSize: 12, whiteSpace: "nowrap" } }}>
                  <tbody>
                    {sheetRows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {(row.length ? row : [""]).slice(0, 12).map((cell, cellIndex) => <td key={cellIndex}>{String(cell ?? "")}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </Box>
                <Stack direction="row" spacing={1} sx={{ p: 1.5 }}>
                  <Button size="small" variant="outlined" startIcon={<DownloadOutlined />} onClick={exportSheetCsv}>Xuất sheet → CSV</Button>
                  <Typography variant="caption" color="text.secondary" sx={{ alignSelf: "center" }}>Preview tối đa 30 dòng × 12 cột.</Typography>
                </Stack>
              </Paper>
            )}
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>CSV → XLSX</Typography>
              <TextField multiline minRows={4} fullWidth label="CSV đơn giản (phân tách bằng dấu phẩy)" value={csvInput} onChange={(event) => setCsvInput(event.target.value)} />
              <Button sx={{ mt: 1.5 }} variant="outlined" disabled={!csvInput.trim()} onClick={csvToXlsx}>Tạo XLSX</Button>
            </Paper>
            <Alert severity="info">Excel được xử lý trong trình duyệt. Thư viện SheetJS chỉ được tải khi bạn mở hoặc chuyển đổi file.</Alert>
          </Stack>
        </>
      );
    }

    if (tool === "qr") {
      return (
        <>
          <ToolHeader title="QR Generator" description="Tạo mã QR từ URL, văn bản hoặc chuỗi bất kỳ rồi lưu thành PNG." />
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0,1fr) 300px" }, gap: 2 }}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <TextField multiline minRows={5} fullWidth label="Nội dung QR" value={qrText} onChange={(event) => setQrText(event.target.value)} />
              <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
                <Button variant="contained" startIcon={<QrCode2Outlined />} onClick={generateQr}>Tạo QR</Button>
                <Button variant="outlined" startIcon={<DownloadOutlined />} onClick={downloadQr}>PNG</Button>
              </Stack>
            </Paper>
            <Paper variant="outlined" sx={{ p: 2, display: "grid", placeItems: "center", minHeight: 286 }}>
              <Box ref={qrHostRef} sx={{ "& canvas, & img": { maxWidth: "100%", height: "auto" } }} />
              {!qrHostRef.current?.childNodes.length && <Typography variant="body2" color="text.secondary">QR preview</Typography>}
            </Paper>
          </Box>
          <Alert severity="info" sx={{ mt: 2 }}>Nội dung QR được tạo tại trình duyệt; chuỗi của bạn không được gửi tới dịch vụ tạo QR.</Alert>
        </>
      );
    }

    if (tool === "encode") {
      const run = (action: string) => {
        try {
          if (action === "slug") setEncodeOutput(slugify(encodeInput));
          if (action === "url-enc") setEncodeOutput(encodeURIComponent(encodeInput));
          if (action === "url-dec") setEncodeOutput(decodeURIComponent(encodeInput));
          if (action === "b64-enc") setEncodeOutput(b64Encode(encodeInput));
          if (action === "b64-dec") setEncodeOutput(b64Decode(encodeInput.trim()));
        } catch (error) {
          setEncodeOutput(error instanceof Error ? `Lỗi: ${error.message}` : "Không thể xử lý.");
        }
      };
      return (
        <>
          <ToolHeader title="Encode & Slug" description="Tạo slug tiếng Việt, URL encode/decode và Base64 Unicode." />
          <Stack spacing={2}>
            <Paper variant="outlined" sx={{ p: 2 }}><TextField multiline minRows={5} fullWidth label="Nội dung" value={encodeInput} onChange={(event) => setEncodeInput(event.target.value)} /></Paper>
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              <Button variant="outlined" onClick={() => run("slug")}>Slug</Button>
              <Button variant="outlined" onClick={() => run("url-enc")}>URL encode</Button>
              <Button variant="outlined" onClick={() => run("url-dec")}>URL decode</Button>
              <Button variant="outlined" onClick={() => run("b64-enc")}>Base64 encode</Button>
              <Button variant="outlined" onClick={() => run("b64-dec")}>Base64 decode</Button>
            </Stack>
            <Paper variant="outlined" sx={{ p: 2 }}><TextField multiline minRows={4} fullWidth label="Kết quả" value={encodeOutput} onChange={(event) => setEncodeOutput(event.target.value)} /><Box sx={{ mt: 1.5 }}><CopyButton value={encodeOutput} /></Box></Paper>
          </Stack>
        </>
      );
    }

    const runJson = (mode: string) => {
      try {
        const parsed: unknown = JSON.parse(jsonInput);
        setJsonStatus("JSON hợp lệ");
        setJsonOutput(mode === "minify" ? JSON.stringify(parsed) : JSON.stringify(parsed, null, 2));
      } catch (error) {
        setJsonStatus(error instanceof Error ? error.message : "JSON không hợp lệ");
        setJsonOutput("");
      }
    };

    return (
      <>
        <ToolHeader title="JSON Tools" description="Kiểm tra, format hoặc minify JSON ngay trong trình duyệt." />
        <Stack spacing={2}>
          <Paper variant="outlined" sx={{ p: 2 }}><TextField multiline minRows={4} fullWidth label="JSON" value={jsonInput} onChange={(event) => setJsonInput(event.target.value)} /></Paper>
          <Stack direction="row" spacing={1}><Button variant="outlined" onClick={() => runJson("format")}>Format</Button><Button variant="outlined" onClick={() => runJson("minify")}>Minify</Button><Button variant="outlined" onClick={() => runJson("validate")}>Validate</Button></Stack>
          {jsonStatus && <Alert severity={jsonOutput ? "success" : "error"}>{jsonStatus}</Alert>}
          <Paper variant="outlined" sx={{ p: 2 }}><TextField multiline minRows={5} fullWidth label="Kết quả" value={jsonOutput} onChange={(event) => setJsonOutput(event.target.value)} /><Box sx={{ mt: 1.5 }}><CopyButton value={jsonOutput} /></Box></Paper>
        </Stack>
      </>
    );
  };

  const activeTool = tools.find((item) => item.id === tool) ?? tools[0];
  const ActiveIcon = activeTool.icon;

  return (
    <Paper
      variant="outlined"
      sx={{
        height: "100dvh",
        minHeight: 0,
        maxHeight: "100dvh",
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", lg: "248px minmax(0,1fr)" },
        bgcolor: "background.paper",
      }}
    >
      <Box
        component="aside"
        sx={{
          display: { xs: "none", lg: "flex" },
          minHeight: 0,
          flexDirection: "column",
          borderRight: 1,
          borderColor: "divider",
          bgcolor: "background.default",
        }}
      >
        <Box sx={{ px: 1.75, pt: 1.5, pb: 1.25 }}>
          <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: "0.12em" }}>
            Workspace
          </Typography>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
            <Typography variant="h6" component="h1" sx={{ fontWeight: 800 }}>
              Office Kit
            </Typography>
            <Chip label="13" size="small" variant="outlined" />
          </Stack>
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5, lineHeight: 1.55 }}>
            Local-first utilities
          </Typography>
        </Box>

        <Divider />

        <Box sx={{ p: 1, overflowY: "auto", minHeight: 0, flex: 1 }}>
          <Stack spacing={0.5}>
            {tools.map(({ id, label, detail, icon: Icon }) => {
              const selected = tool === id;
              return (
                <Button
                  key={id}
                  onClick={() => setTool(id)}
                  variant={selected ? "contained" : "text"}
                  color={selected ? "primary" : "inherit"}
                  startIcon={<Icon fontSize="small" />}
                  sx={{
                    justifyContent: "flex-start",
                    textAlign: "left",
                    px: 1.25,
                    py: 0.6,
                    minHeight: 40,
                    width: "100%",
                    "& .MuiButton-startIcon": { alignSelf: "flex-start", mt: 0.3 },
                  }}
                >
                  <Box sx={{ minWidth: 0 }}>
                    <Typography component="span" variant="body2" sx={{ display: "block", fontWeight: 700, lineHeight: 1.25 }}>
                      {label}
                    </Typography>
                    <Typography component="span" variant="caption" sx={{ display: "block", opacity: 0.65, lineHeight: 1.3 }}>
                      {detail}
                    </Typography>
                  </Box>
                </Button>
              );
            })}
          </Stack>
        </Box>

        <Box sx={{ p: 1.5, borderTop: 1, borderColor: "divider" }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: "success.main",
                flex: "0 0 auto",
              }}
            />
            <Typography variant="caption" color="text.secondary">
              Xử lý trên thiết bị
            </Typography>
          </Stack>
        </Box>
      </Box>

      <Box sx={{ minWidth: 0, minHeight: 0, display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: { xs: "flex", lg: "none" },
            p: 1.5,
            gap: 1.25,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "divider",
            bgcolor: "background.default",
          }}
        >
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
              Office Kit
            </Typography>
            <Typography variant="caption" color="text.secondary">
              13 local utilities
            </Typography>
          </Box>
          <FormControl size="small" sx={{ minWidth: 168, maxWidth: "58%" }}>
            <InputLabel id="office-tool-label">Công cụ</InputLabel>
            <Select
              labelId="office-tool-label"
              label="Công cụ"
              value={tool}
              onChange={(event) => setTool(event.target.value as ToolId)}
              renderValue={() => activeTool.label}
            >
              {tools.map(({ id, label, detail, icon: Icon }) => (
                <MenuItem key={id} value={id}>
                  <Icon fontSize="small" sx={{ mr: 1.25, color: "text.secondary" }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 650 }}>{label}</Typography>
                    <Typography variant="caption" color="text.secondary">{detail}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box
          sx={{
            display: { xs: "none", lg: "flex" },
            minHeight: 50,
            px: 2,
            alignItems: "center",
            gap: 1.25,
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <ActiveIcon fontSize="small" color="primary" />
          <Typography variant="subtitle2" sx={{ fontWeight: 750 }}>
            {activeTool.label}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {activeTool.detail}
          </Typography>
          <Box sx={{ flex: 1 }} />
          <Chip label="Local" size="small" variant="outlined" />
        </Box>

        <Box
          component="section"
          sx={{
            minWidth: 0,
            minHeight: 0,
            flex: 1,
            overflow: { xs: "auto", md: "hidden" },
            p: { xs: 1.5, sm: 2, md: 2 },
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 1040, height: "100%", minHeight: 0, mx: "auto", overflow: "hidden" }}>
            {renderTool()}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
