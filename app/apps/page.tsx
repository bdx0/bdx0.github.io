import type { Metadata } from "next";
import { Box, Chip, Typography } from "@mui/material";

export const metadata: Metadata = {
  title: "Apps",
  description: "Small interactive apps and tools in the BDX0 system.",
};

const apps = [
  {
    id: "knowledge",
    href: "/apps/knowledge/",
    title: "BDX0 Knowledge",
    description: "Blog và knowledge workspace đồng bộ nội dung từ Notion, có tìm kiếm và quyền thành viên.",
    kind: "Knowledge",
  },
  {
    id: "dau-thau",
    href: "/apps/dau-thau/",
    title: "Đấu Thầu 360",
    description: "Workspace tra cứu pháp luật, sàng lọc nghiệp vụ, quy trình và trợ lý AI cho công tác đấu thầu.",
    kind: "Legal",
  },
  {
    id: "yi",
    href: "/apps/yi-jing",
    title: "Kinh Dịch",
    description: "Gieo quẻ 3 đồng xu, tra cứu 64 quẻ và xem quẻ biến.",
    kind: "Tool",
  },
  {
    id: "office",
    href: "/apps/office",
    title: "Office Kit",
    description: "Bộ công cụ xử lý văn bản, danh sách, ngày làm việc, phần trăm, mã hóa và JSON.",
    kind: "Utility",
  },
  {
    id: "buddha",
    href: "/apps/buddha",
    title: "Phật Thích Ca 3D",
    description: "Không gian 3D tương tác với tượng Phật và vòng halo.",
    kind: "3D",
  },
  {
    id: "dragon",
    href: "/apps/ly-dragon",
    title: "Rồng thời Lý 3D",
    description: "Mô hình 3D tương tác lấy cảm hứng từ hình tượng rồng thời Lý.",
    kind: "3D",
  },
] as const;

function AppPreview({ id }: { id: (typeof apps)[number]["id"] }) {
  if (id === "knowledge") {
    return <Box sx={{height:"100%",bgcolor:"#f4f5f7",p:1.4}}><Box sx={{height:18,borderRadius:1.2,bgcolor:"#fff",border:"1px solid #ddd",mb:1}}/><Box sx={{height:34,width:"72%",borderRadius:1.5,bgcolor:"#171717",mb:1.2}}/><Box sx={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:1}}>{[1,2,3,4].map(n=><Box key={n} sx={{height:45,borderRadius:1.5,bgcolor:"#fff",border:"1px solid #ddd"}}/>)}</Box></Box>;
  }

  if (id === "dau-thau") {
    return (
      <Box sx={{ position: "relative", height: "100%", bgcolor: "#f5f7fb", overflow: "hidden", p: 1.4 }}>
        <Box sx={{ height: 18, borderRadius: 1.2, bgcolor: "#123b6d", mb: 1 }} />
        <Box sx={{ display: "grid", gridTemplateColumns: "28% 1fr", gap: 1, height: "calc(100% - 26px)" }}>
          <Box sx={{ borderRadius: 1.5, bgcolor: "#e8eef6", border: "1px solid #d5deea", p: .8 }}>
            {[76, 61, 84, 68, 55].map((w) => (
              <Box key={w} sx={{ width: `${w}%`, height: 7, borderRadius: 9, bgcolor: "#9baec4", mb: .8 }} />
            ))}
          </Box>
          <Box sx={{ display: "grid", gridTemplateRows: "auto 1fr", gap: 1 }}>
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: .7 }}>
              {[1, 2, 3].map((n) => (
                <Box key={n} sx={{ height: 31, borderRadius: 1.2, bgcolor: "#fff", border: "1px solid #dfe5ed" }} />
              ))}
            </Box>
            <Box sx={{ borderRadius: 1.5, bgcolor: "#fff", border: "1px solid #dfe5ed", p: 1 }}>
              <Box sx={{ width: "46%", height: 9, borderRadius: 9, bgcolor: "#1f5c99", mb: 1 }} />
              {[92, 81, 88, 64].map((w) => (
                <Box key={w} sx={{ width: `${w}%`, height: 6, borderRadius: 9, bgcolor: "#d3dbe5", mb: .7 }} />
              ))}
              <Box sx={{ mt: 1.2, width: "34%", height: 11, borderRadius: 9, bgcolor: "#c78a2b" }} />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  if (id === "yi") {
    return (
      <Box sx={{ position: "relative", height: "100%", bgcolor: "#efe3cf", overflow: "hidden" }}>
        <Box sx={{ position: "absolute", inset: "0 auto 0 0", width: "24%", bgcolor: "#fbf7ef", borderRight: "1px solid #dccdaf" }} />
        <Box sx={{ position: "absolute", left: "52%", top: "17%", width: 58, height: 58, transform: "translateX(-50%)", borderRadius: "50%", bgcolor: "#352116", color: "#f5dca7", display: "grid", placeItems: "center", fontSize: 27 }}>☯</Box>
        <Box sx={{ position: "absolute", left: "35%", right: "13%", top: "51%", height: 11, borderRadius: 99, bgcolor: "#725036", opacity: .78 }} />
        <Box sx={{ position: "absolute", left: "35%", right: "13%", top: "64%", height: 18, borderRadius: 1.5, bgcolor: "#fffaf2", border: "1px solid #dfd0b8" }} />
        <Box sx={{ position: "absolute", left: "42%", right: "20%", bottom: "10%", height: 15, borderRadius: 1.5, bgcolor: "#745033" }} />
      </Box>
    );
  }

  if (id === "office") {
    return (
      <Box sx={{ position: "relative", height: "100%", bgcolor: "#f6f7f9", overflow: "hidden", p: 1.4 }}>
        <Box sx={{ height: 18, borderRadius: 1.2, bgcolor: "#fff", border: "1px solid #dfe3e8", mb: 1 }} />
        <Box sx={{ display: "grid", gridTemplateColumns: "30% 1fr", gap: 1, height: "calc(100% - 26px)" }}>
          <Box sx={{ borderRadius: 1.5, bgcolor: "#eef1f5", border: "1px solid #dfe3e8", p: .8 }}>
            {[55, 72, 64, 80, 60].map((w) => <Box key={w} sx={{ width: `${w}%`, height: 6, borderRadius: 9, bgcolor: "#b8c0cc", mb: .7 }} />)}
          </Box>
          <Box sx={{ borderRadius: 1.5, bgcolor: "#fff", border: "1px solid #dfe3e8", p: 1 }}>
            <Box sx={{ width: "42%", height: 9, borderRadius: 9, bgcolor: "#3457d5", mb: 1 }} />
            <Box sx={{ height: 38, borderRadius: 1, bgcolor: "#f0f2f5", border: "1px solid #e0e4e9", mb: .8 }} />
            <Box sx={{ display: "flex", gap: .5 }}>
              <Box sx={{ width: 34, height: 9, borderRadius: 9, bgcolor: "#3457d5" }} />
              <Box sx={{ width: 29, height: 9, borderRadius: 9, bgcolor: "#cbd1da" }} />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  if (id === "buddha") {
    return (
      <Box sx={{ position: "relative", height: "100%", overflow: "hidden", background: "radial-gradient(circle at 50% 43%,#4b3c29 0,#201c15 38%,#0e0d0b 82%)" }}>
        <Box sx={{ position: "absolute", left: "50%", top: "29%", width: 86, height: 86, transform: "translate(-50%,-50%)", borderRadius: "50%", border: "3px solid rgba(255,220,139,.75)", boxShadow: "0 0 24px rgba(255,190,78,.35)" }} />
        <Box sx={{ position: "absolute", left: "50%", top: "31%", width: 31, height: 39, transform: "translate(-50%,-50%)", borderRadius: "48%", background: "linear-gradient(145deg,#f0ece2,#aaa391)" }} />
        <Box sx={{ position: "absolute", left: "50%", top: "64%", width: "34%", height: "48%", transform: "translate(-50%,-50%)", borderRadius: "48% 48% 20% 20%", background: "linear-gradient(145deg,#eee9df,#9e9787)", clipPath: "polygon(50% 0,68% 12%,80% 38%,100% 78%,76% 92%,50% 79%,24% 92%,0 78%,20% 38%,32% 12%)" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ position: "relative", height: "100%", overflow: "hidden", background: "radial-gradient(circle at 62% 35%,#173b37 0,#091718 44%,#04090a 82%)" }}>
      <Box component="svg" viewBox="0 0 220 120" sx={{ position: "absolute", inset: "5% 4% 8%", width: "92%", height: "87%", filter: "drop-shadow(0 0 9px rgba(103,221,199,.30))" }}>
        <path d="M27 79 C47 38 87 92 111 54 C130 25 164 35 171 55 C177 73 156 83 142 72 C126 59 138 43 155 40 C178 36 193 54 186 75 C176 103 124 100 94 83 C68 68 56 64 44 73" fill="none" stroke="#7fc5b6" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M163 40 L174 25 L176 43 M151 39 L155 23 L163 39" fill="none" stroke="#e2c792" strokeWidth="4" strokeLinecap="round" />
        <circle cx="169" cy="54" r="3.2" fill="#ffd777" />
      </Box>
    </Box>
  );
}

export default function AppsPage() {
  return (
    <Box sx={{ maxWidth: 1120 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: "0.12em" }}>
          BDX0 system
        </Typography>
        <Typography variant="h3" component="h1" sx={{ mt: 0.5, fontWeight: 760 }}>
          Mini Apps
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1.25, maxWidth: 720, lineHeight: 1.7 }}>
          Những ứng dụng nhỏ có thể mở độc lập nhưng vẫn thuộc cùng một hệ thống.
          Mỗi app giữ giao diện riêng, còn System Shell luôn cho bạn đường về Apps và Home.
        </Typography>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2,minmax(0,1fr))", lg: "repeat(3,minmax(0,1fr))" }, gap: 2 }}>
        {apps.map((app) => (
          <Box
            component="a"
            key={app.id}
            href={app.href}
            sx={{
              color: "inherit",
              textDecoration: "none",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
              overflow: "hidden",
              bgcolor: "background.paper",
              transition: "transform .18s ease, box-shadow .18s ease, border-color .18s ease",
              "&:hover": { transform: "translateY(-3px)", boxShadow: 4, borderColor: "text.disabled" },
            }}
          >
            <Box sx={{ aspectRatio: "16/10" }}><AppPreview id={app.id} /></Box>
            <Box sx={{ p: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: .75 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 750, flexGrow: 1 }}>{app.title}</Typography>
                <Chip label={app.kind} size="small" variant="outlined" />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, minHeight: 45 }}>{app.description}</Typography>
              <Typography variant="body2" sx={{ mt: 1.5, fontWeight: 700 }}>Mở ứng dụng →</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
