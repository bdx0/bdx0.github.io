# Cyberpunk HUD — Hướng dẫn Design Tokens mở rộng cho Material Design

> Tài liệu này định nghĩa các design token và nguyên tắc phong cách để tùy chỉnh (theme) Material Design theo hướng thẩm mỹ techno/cyberpunk. Nó cung cấp một hệ thống phong cách toàn diện và các token sẵn sàng cho Tailwind, giúp mở rộng Material Design với vẻ ngoài độc đáo của Cyberpunk HUD.

---

## Tổng quan về Design Tokens

Design tokens là các giá trị nhỏ nhất, nguyên tử của hệ thống thiết kế của bạn. Chúng là những quyết định thiết kế được lưu trữ dưới dạng dữ liệu, thay vì được mã hóa cứng (hard-coded) trong các thành phần UI. Trong ngữ cảnh này, các design token sẽ được sử dụng để ghi đè các giá trị mặc định của Material Design, mang lại phong cách Cyberpunk HUD.

Tài liệu này sẽ trình bày các danh mục design token chính, cách chúng được định nghĩa và cách chúng được áp dụng để tạo ra giao diện người dùng nhất quán và có thương hiệu.

---

## Các Danh mục Design Tokens

### 1. Màu sắc (Color Tokens)

Bảng màu được thiết kế để tạo ra trải nghiệm cyberpunk có độ tương phản cao, sống động. Các token màu này sẽ được sử dụng để ghi đè bảng màu mặc định của Material Design, áp dụng cho các yếu tố như nền, văn bản, trạng thái và điểm nhấn.

| Token Name      | Value                 | Description                                     | Usage (trong ngữ cảnh Material Design)                               |
| :-------------- | :-------------------- | :---------------------------------------------- | :----------------------------------------------------------------- |
| `--bg-900`      | `#06060A`             | Nền chính: rất tối, gần như đen                 | Nền ứng dụng chính, thay thế màu nền mặc định của Material Design. |
| `--panel-bg`    | `rgba(10,12,16,0.8)`  | Nền panel: tối bán trong suốt                   | Nền cho các panel, thẻ và các phần mô-đun của Material Design.    |
| `--ui-line`     | `#2B2E34`             | Đường UI: xám tối tinh tế                       | Đường viền, đường phân chia, các đường phân cách tinh tế trong Material Design. |
| `--neon-cyan`   | `#00E6FF`             | Màu nhấn chính: xanh cyan rực rỡ                | Trạng thái được chọn, các yếu tố hoạt động, điểm nhấn, thanh tiến trình trong Material Design. |
| `--neon-magenta`| `#FF2D6A`             | Màu nhấn phụ: hồng magenta rực rỡ               | Trạng thái tiêu cực/cảnh báo, lỗi, nhãn trang trí trong Material Design. |
| `--neon-green`  | `#7CFF6B`             | Màu hỗ trợ: xanh lá cây sáng                    | Chỉ báo thành công, phản hồi tích cực trong Material Design.      |
| `--neon-yellow` | `#FFD34B`             | Màu hỗ trợ: vàng sáng                           | Cảnh báo, thông báo thông tin trong Material Design.              |
| `--neon-orange` | `#FF8C42`             | Màu hỗ trợ: cam sáng                            | Điểm nhấn phụ, cảnh báo thay thế trong Material Design.           |
| `--muted-gray`  | `#9AA0A6`             | Văn bản mờ: xám mềm                             | Văn bản phụ, trạng thái bị vô hiệu hóa, thông tin ít quan trọng trong Material Design. |
| `--neutral-body`| `#C7CED6`             | Văn bản chính: xám nhạt                         | Văn bản đọc tiêu chuẩn cho đoạn văn và mô tả trong Material Design. |
| `--neutral-strong`| `#E8EEF2`           | Nhãn mạnh: trắng ngà                             | Nhãn quan trọng, tiêu đề chính, văn bản nhấn mạnh cao trong Material Design. |
| `--accent-primary`| `#A6FFF4`           | Màu nhấn chính: xanh cyan nhạt                  | Điểm nhấn code, các yếu tố tương tác tinh tế trong Material Design. |
| `--danger`      | `#FF4D6D`             | Nguy hiểm: đỏ tươi                              | Thông báo lỗi, cảnh báo nghiêm trọng trong Material Design.       |

**Lưu ý:** Các điểm nhấn neon nên được sử dụng tiết kiệm để duy trì tác động và tránh gây rối mắt. Đảm bảo tỷ lệ tương phản tối thiểu 4.5:1 cho tất cả văn bản dễ đọc trên nền tối. Các yếu tố neon trang trí có thể có độ tương phản thấp hơn.

---

### 2. Typography Tokens (Kiểu chữ)

Hệ thống typography kết hợp các font hiển thị cô đọng, kỹ thuật cho tiêu đề và các yếu tố UI nổi bật với các font monospaced hoặc sans-serif hẹp cho dữ liệu, code và chú thích. Tất cả các font được lựa chọn cẩn thận vì tính thẩm mỹ cyberpunk và hỗ trợ tiếng Việt. Các token typography này sẽ được sử dụng để ghi đè font mặc định của Material Design.

**Các họ font được sử dụng:**

*   **`--font-space-grotesk`**: Sans-serif hiện đại với cảm giác hình học và hơi cô đọng. Dùng cho hiển thị chung và tiêu đề.
*   **`--font-chakra-petch`**: Sans-serif hình học với thiết kế vuông và các góc vát, mang lại vẻ ngoài tương lai và sạch sẽ. Dùng cho hiển thị và các yếu tố UI.
*   **`--font-genos`**: Kiểu chữ hiển thị hiện đại với tính thẩm mỹ tương lai, công nghiệp và kỹ thuật, đặc trưng bởi các ký tự sắc nét, góc cạnh và được xây dựng hình học. Dùng cho hiển thị.
*   **`--font-tektur`**: Sans-serif hiển thị với thiết kế khối, công nghiệp và hình học, có đường viền hình bát giác. Dùng cho hiển thị.
*   **`--font-space-mono`**: Kiểu chữ monospaced với ảnh hưởng hình học và grotesque. Lý tưởng cho code, dữ liệu và hiển thị giống terminal.
*   **`--font-jetbrains-mono`**: Font monospaced được thiết kế cho các nhà phát triển, có các ligatures lập trình. Dùng cho ví dụ code và văn bản kỹ thuật.
*   **`JetBrainsMonoNL`**: Font monospaced tự host, một biến thể của JetBrains Mono không có ligatures lập trình, được cấu hình rõ ràng với `font-feature-settings: "zero" 1;` cho số không có gạch chéo. Dùng cho code và dữ liệu khi không muốn có ligatures.
*   **`--font-hasklig`**: Font monospaced tự host có thêm ligatures lập trình. Dùng cho ví dụ code khi ligatures tăng cường khả năng đọc.
*   **`--font-source-code-pro`**: Font monospaced được Adobe thiết kế cho môi trường lập trình, nhấn mạnh khả năng đọc. Dùng cho code và văn bản kỹ thuật.
*   **`--font-roboto-mono`**: Font monospaced được tối ưu hóa cho khả năng đọc trên màn hình. Dùng cho code, dữ liệu và hiển thị số.
*   **`--font-kanit`**: Sans-serif humanist đương đại và tương lai với các đường cong hình học. Hỗ trợ đầy đủ tiếng Việt. Dùng cho hiển thị và tiêu đề.
*   **`--font-be-vietnam-pro`**: Phong cách Neo Grotesk, được thiết kế rõ ràng với các hình dạng chữ cái tiếng Việt tinh tế và dấu phụ để tối ưu khả năng đọc. Đa năng cho văn bản chính và UI.
*   **`--font-exo-2`**: Kiểu chữ sans-serif hình học với cảm giác công nghệ và tương lai. Hỗ trợ tiếng Việt. Dùng cho hiển thị và văn bản chính.
*   **`--font-unica-one`**: Phong cách sans-serif unicase cô đọng, phù hợp cho tiêu đề và các đoạn văn bản ngắn. Hỗ trợ tiếng Việt.
*   **`--font-teko`**: Thiết kế cao, cô đọng, phù hợp cho bố cục biên tập hiện đại hoặc thiết kế UI. Hỗ trợ tiếng Việt.
*   **`--font-rajdhani`**: Có các hình dạng chữ cái mô-đun hóa với vẻ ngoài vuông vắn và cô đọng, kỹ thuật và tương lai. Hỗ trợ tiếng Việt.
*   **`--font-michroma`**: Phiên bản hiện đại của thể loại sans vuông tròn, gợi lên cảm giác tương lai của những năm 1960. Hỗ trợ tiếng Việt.

**Trọng lượng font (Font Weights):**
Dự án chủ yếu sử dụng các trọng lượng `400` (Regular), `600` (SemiBold) và `700` (Bold) để duy trì tính thẩm mỹ sạch sẽ, dễ đọc và có tác động. Các font cụ thể có thể bao gồm các trọng lượng bổ sung như được định nghĩa trong cấu hình `next/font/google` của chúng.

**Kích thước font và chiều cao dòng (Font Sizes & Line Heights - Tailwind CSS Utility Classes):**
Dự án tận dụng thang kích thước font phản hồi của Tailwind CSS.

*   `text-sm`: 14px (ví dụ: cho ghi chú, nhãn nhỏ)
*   `text-base`: 16px (văn bản chính mặc định)
*   `text-lg`: 18px (ví dụ: ví dụ code)
*   `text-xl`: 20px (ví dụ: tiêu đề phụ)
*   `text-2xl`: 24px (ví dụ: văn bản chính lớn hơn, ví dụ tiếng Việt)
*   `text-3xl`: 30px (ví dụ: tiêu đề phần)
*   `text-4xl`: 36px (ví dụ: tiêu đề chính)
*   `text-5xl`: 48px (ví dụ: văn bản hiển thị nổi bật)

Chiều cao dòng thường được quản lý bởi các tiện ích `leading-normal` hoặc `leading-relaxed` mặc định của Tailwind, hoặc được đặt rõ ràng khi cần kiểm soát chính xác (ví dụ: `line-height: 1.75` cho văn xuôi).

**Sử dụng và ghép nối font (Font Usage and Pairing):**
*   **Tiêu đề (`h1`, `h2`, `h3`, `h4`):** Chủ yếu sử dụng `font-display` (bao gồm `Rajdhani`, `Teko`, `Exo`, `Unica One`, `Kanit`, `Michroma`, `Space Grotesk`, `Orbitron`) cho vẻ ngoài cô đọng, hình học và có tác động.
*   **Văn bản chính (`p`, `span`):** Sử dụng `font-sans` (bao gồm `Exo 2`, `Be Vietnam Pro`, `Space Grotesk`, `Chakra Petch`, `Genos`, `Tektur`, `Manrope`, `Inter`) để dễ đọc ở các kích thước khác nhau, với hỗ trợ tiếng Việt mạnh mẽ.
*   **Văn bản monospaced (`code`, `pre`):** Sử dụng `font-mono` (bao gồm `JetBrains Mono`, `Hasklig`, `JetBrainsMonoNL`, `Source Code Pro`, `Space Mono`, `Roboto Mono`) cho ví dụ code, dữ liệu số và đầu ra giống terminal, đảm bảo căn chỉnh ký tự.

**Tính năng font (Font Features):**
*   `font-feature-settings: "zero" 1;`: Được áp dụng rõ ràng cho các font monospaced như `JetBrainsMonoNL` để đảm bảo số không có gạch chéo, phân biệt nó với chữ 'O'.

---

### 3. Spacing Tokens (Hệ thống khoảng cách)

Hệ thống khoảng cách mô-đun dựa trên đơn vị cơ bản **4px**. Điều này đảm bảo khoảng cách nhất quán và hài hòa trong toàn bộ UI. Các token khoảng cách này có thể được sử dụng để tùy chỉnh hệ thống khoảng cách của Material Design.

*   **Đơn vị cơ bản:** `1u = 4px`
*   **Thang đo:**
    *   `xxs`: `4px` (`1u`)
    *   `xs`: `8px` (`2u`)
    *   `sm`: `12px` (`3u`)
    *   `md`: `16px` (`4u`)
    *   `lg`: `24px` (`6u`)
    *   `xl`: `32px` (`8u`)
    *   `xxl`: `48px` (`12u`)

**Lưới & Bố cục:**
*   **Bố cục lớn hơn:** Sử dụng lưới 12 cột với khoảng cách giữa các cột là `16px` (`4u`). Chiều rộng container tối đa thường là `1280px` đến `1600px`.
*   **Lưới panel:** Các panel bên trong và thẻ mục trong HUD sử dụng hệ thống lưới nhỏ gọn, thường với các mục vuông `72px` đến `96px` và khoảng cách `8px`.

---

### 4. Elevation & Shadow Tokens (Bóng đổ & Độ cao)

Thiết kế HUD nhấn mạnh độ cao dựa trên *hiệu ứng phát sáng* thay vì bóng đổ truyền thống, tạo ra hiệu ứng tương lai và siêu thực. Các token bóng đổ này sẽ thay thế hoặc bổ sung cho hệ thống bóng đổ của Material Design.

**Shadow Tokens (ví dụ `box-shadow` CSS):**

*   `--glow-xs`: `0 2px 6px rgba(0,230,255,0.06)`
*   `--glow-sm`: `0 8px 28px rgba(0,230,255,0.08)`
*   `--glow-neon`: `0 0 18px rgba(0,230,255,0.18), 0 0 36px rgba(255,45,106,0.06)` (kết hợp phát sáng cyan và magenta)
*   `--neon-blue-glow`: `0 0 10px #00f0ff, 0 0 20px #00f0ff`
*   `--neon-green-glow`: `0 0 10px #00ff99, 0 0 20px #00ff99`

**Quy tắc sử dụng:**
*   **Phát sáng bên trong:** Dùng cho các màn hình nhúng hoặc các yếu tố trông như bị lõm vào.
*   **Phát sáng bên ngoài:** Áp dụng cho các thẻ hoạt động hoặc được làm nổi bật và các yếu tố tương tác.
*   **Tránh bóng đổ nặng:** Giữ bóng đổ mềm mại, tinh tế và có màu sắc của các màu nhấn.

---

### 5. Border Radius Tokens (Bo góc)

Các token bo góc này sẽ được sử dụng để ghi đè các giá trị mặc định của Material Design.

*   **Thẻ nhỏ:** `4px` (`--hud-sm`)
*   **Nút / Chip:** `6px` đến `8px` (`--hud-md`)
*   **Badge / Avatar tròn:** `9999px` (`--hud-pill`) cho hình dạng tròn hoàn toàn, giống viên thuốc.
*   **Panel đặc biệt:** `2px` hoặc các góc sắc nét cho các yếu tố kỹ thuật hoặc HUD trung tâm cụ thể.

---

### 6. Opacity & Transparency Tokens (Độ mờ & Độ trong suốt)

Độ mờ và độ trong suốt rất quan trọng để phân lớp thông tin và tạo chiều sâu trong HUD. Các token này có thể được sử dụng để tùy chỉnh các giá trị mặc định của Material Design.

*   **Lớp phủ nền:** `0.75` đến `0.85` để làm mờ tinh tế nội dung phía sau các yếu tố hoạt động.
*   **Bề mặt panel:** `0.85` đến `0.95` để đảm bảo khả năng đọc nội dung trong khi vẫn duy trì hiệu ứng bán trong suốt.
*   **Các yếu tố bị vô hiệu hóa/mờ:** `0.36` đến `0.48` để chỉ ra trực quan rằng không thể tương tác.
*   **Phát sáng khi di chuột/hoạt động:** Sử dụng pha trộn cộng thêm và giá trị alpha cao hơn (`0.12` đến `0.25`) cho hiệu ứng phát sáng.

---

### 7. Animation & Transition Tokens (Hoạt ảnh & Chuyển tiếp)

Chuyển động trong HUD là tối thiểu, có mục đích và được thiết kế để tăng cường trải nghiệm tương lai mà không gây mất tập trung. Các token hoạt ảnh này có thể được áp dụng để tùy chỉnh các hoạt ảnh mặc định của Material Design.

*   **Chuyển tiếp di chuột:** `120ms` đến `180ms` với hàm easing `cubic-bezier(0.2, 0.8, 0.2, 1)` cho phản hồi mượt mà, nhạy bén.
*   **Chọn/Kích hoạt:** Chuyển tiếp `150ms` đến `220ms` liên quan đến việc thay đổi tỷ lệ phát sáng và độ mờ.
*   **Hiệu ứng quét:** Hiệu ứng nhấp nháy scan line dọc tinh tế, thường lặp lại `1.2s` đến `2s`, sử dụng gradient mờ có độ mờ thấp.
*   **Hiệu ứng nhấp nháy:** Rung động độ mờ nhỏ, ngắn (`0.06s` đến `0.12s`) để mô phỏng hiệu ứng nhấp nháy neon giống CRT.
*   **Chuyển động vi mô:** Hiệu ứng thị sai chậm trên các yếu tố nền hoặc các mô hình trung tâm (`6s` đến `12s` ease) để tạo chiều sâu tinh tế.

**Ví dụ Keyframes (CSS):**

```css
@keyframes neon-flicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.92; }
}
@keyframes scan-line {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}
```

**Khả năng tiếp cận:** Luôn tôn trọng `prefers-reduced-motion` để tắt các hoạt ảnh không cần thiết cho người dùng không muốn nhiều chuyển động.

---

### 8. Assets & Iconography Tokens (Tài sản & Iconography)

Các token này áp dụng cho việc thay thế hoặc bổ sung các icon mặc định của Material Design.

*   **Icon hệ thống:** Được thiết kế trên lưới `32px` hoặc `48px`. Xuất ở độ phân giải `1x`, `2x` và `3x` cho các mật độ hiển thị khác nhau.
*   **Định dạng:** SVG được ưu tiên cho các icon vector sắc nét, có thể mở rộng.
*   **Đường nét:** Icon thường có độ rộng đường nét `1.5px` đến `2px`.
*   **Màu sắc:** Các vùng điền neon nhỏ được sử dụng cho các chỉ báo trạng thái. SVG nội tuyến cho phép ghi đè màu động thông qua CSS.
*   **Định dạng Sprite:** Chấp nhận được cho các icon nhỏ, nhưng SVG nội tuyến được ưu tiên để kiểm soát và linh hoạt hơn.

---

### Tích hợp với các Hệ thống Thiết kế Bên ngoài (Integrating with External Design Systems)

Khi tích hợp các thành phần hoặc thư viện từ các hệ thống thiết kế bên ngoài (ví dụ: Material UI, Ant Design) vào dự án Cyberpunk HUD, điều quan trọng là phải duy trì tính thẩm mỹ và nhất quán của thương hiệu. Các nguyên tắc sau đây sẽ hướng dẫn quá trình này:

1.  **Ưu tiên Design Tokens:** Luôn cố gắng ghi đè các giá trị mặc định của hệ thống bên ngoài bằng các design token đã xác định của chúng ta (màu sắc, typography, spacing, v.v.). Sử dụng các biến CSS hoặc cấu hình Tailwind CSS để áp dụng các token này.
2.  **Tùy chỉnh thành phần:** Đối với các thành phần phức tạp hơn, hãy sử dụng các API tùy chỉnh của hệ thống bên ngoài (ví dụ: `sx` prop trong Material UI, `theme` prop trong Ant Design) để áp dụng các kiểu dáng Cyberpunk HUD. Tập trung vào việc điều chỉnh màu sắc, bo góc, bóng đổ và typography.
3.  **Tạo Wrapper Components:** Nếu việc tùy chỉnh trực tiếp trở nên quá phức tạp hoặc không thể, hãy tạo các "wrapper components" (thành phần bao bọc) của riêng chúng ta. Các wrapper này sẽ gói gọn thành phần bên ngoài và áp dụng các kiểu dáng cần thiết để phù hợp với hệ thống thiết kế của chúng ta.
4.  **Kiểm tra khả năng tương thích:** Đảm bảo rằng các thành phần bên ngoài được tích hợp vẫn hoạt động tốt với các nguyên tắc về khả năng tiếp cận và phản hồi của chúng ta.
5.  **Sử dụng có chọn lọc:** Chỉ tích hợp các thành phần bên ngoài khi chúng cung cấp chức năng độc đáo hoặc giải quyết một vấn thể cụ thể mà không thể dễ dàng đạt được bằng các thành phần nội bộ. Tránh tích hợp toàn bộ thư viện nếu chỉ cần một vài thành phần.

---

## Nguyên tắc Phong cách và Triển khai

### Phong cách thành phần (Theming Material Design Components)

Phần này mô tả cách áp dụng phong cách Cyberpunk HUD vào các thành phần Material Design.

#### Panels / Cards (Thẻ Material Design)

*   **Nền:** Sử dụng `var(--panel-bg)` (tối bán trong suốt) để cho phép các kết cấu nền tinh tế hiển thị qua.
*   **Đường viền:** `1px` đường viền bên trong hoặc đường viền neon mỏng cho các đường phân cách phần, sử dụng `var(--ui-line)` hoặc màu nhấn neon.
*   **Padding:** `md` (`16px`) cho nội dung panel chung. Các panel chặt chẽ hơn có thể sử dụng `8px` đến `12px`.
*   **Bo góc:** `border-radius` nhỏ `4px` (`--hud-sm`) cho các thẻ thông tin. Một số chip nhấn có thể sử dụng `6px` đến `8px` (`--hud-md`) hoặc `9999px` (`--hud-pill`) cho các hình dạng tròn hoàn toàn.

#### Inventory Grid (Lưới các mục)

*   **Ô mục:** Kích thước vuông cố định `72px` đến `96px`.
*   **Đường viền mục:** `1px` đường viền màu neon (`ring-2 ring-neon-cyan/60`) khi được chọn, nếu không thì là một đường viền mờ nhạt tinh tế (`border border-[rgba(255,255,255,0.04)]`).
*   **Icon:** Căn giữa trong ô, được chia tỷ lệ từ `48%` đến `64%` kích thước ô.
*   **Badge số lượng:** Hình viên thuốc tròn nhỏ (`rounded-full`) được đặt ở trên cùng bên phải, với văn bản `11px`.

#### Tooltip / Details Panel (Tooltip Material Design)

*   **Chiều rộng:** `320px` đến `420px`, có thể điều chỉnh dựa trên nội dung.
*   **Nền:** Panel tối hoàn toàn mờ (`bg-[#0a0a0b]`) với padding `8px` đến `12px`.
*   **Điểm nhấn Callout:** Một sọc neon dọc `4px` ở cạnh trái hoặc trên cùng, sử dụng `var(--neon-cyan)`.
*   **Đường phân chia:** `1px` đường kết cấu tinh tế hoặc hiệu ứng phát sáng.

#### Buttons / Tabs (Nút và Tab Material Design)

*   **Nút:** Thiết kế phẳng với đường viền neon và hiệu ứng phát sáng tinh tế khi di chuột qua.
*   **CTA chính:** Được điền bằng nền `var(--neon-cyan)`, sử dụng văn bản tối hoặc văn bản sáng tùy thuộc vào độ tương phản để dễ đọc.

#### Icons & Glyphs (Icon Material Design)

*   **Phong cách:** Sử dụng các glyphs vuông, chi tiết thấp.
*   **Đường nét:** Ưu tiên các icon đường nét với độ rộng đường nét `1.5px` đến `2px`.
*   **Điểm nhấn:** Các vùng điền neon nhỏ được sử dụng cho các chỉ báo trạng thái.
*   **Định dạng:** SVG được ưu tiên cho các icon vector sắc nét. SVG nội tuyến cho phép ghi đè màu động thông qua CSS.

---

### Sử dụng Tailwind CSS phổ biến trong dự án

Phần này phác thảo cách các design token được định nghĩa được chuyển đổi thành các lớp tiện ích Tailwind CSS thực tế để áp dụng nhất quán, đặc biệt khi tùy chỉnh các thành phần Material Design.

**Mở rộng cấu hình Tailwind (từ `tailwind.config.js`):**

```javascript
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,html}'], // Adjusted for project structure
  theme: {
    extend: {
      colors: {
        'bg-900': 'var(--bg-900)',
        'panel-bg': 'var(--panel-bg)',
        'ui-line': 'var(--ui-line)',
        'neon-cyan': 'var(--neon-cyan)',
        'neon-magenta': 'var(--neon-magenta)',
        'neon-green': 'var(--neon-green)',
        'neon-yellow': 'var(--neon-yellow)',
        'neon-orange': 'var(--neon-orange)',
        'muted-gray': 'var(--muted-gray)',
        'neutral-body': 'var(--neutral-body)',
        'neutral-strong': 'var(--neutral-strong)',
        'accent-primary': 'var(--accent-primary)',
        'danger': 'var(--danger)',
      },
      fontFamily: {
        display: ['var(--font-rajdhani)', 'var(--font-teko)', 'var(--font-exo)', 'var(--font-unica-one)', 'var(--font-kanit)', 'var(--font-space-grotesk)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'var(--font-hasklig)', 'var(--font-jetbrains-mono-nl)', 'var(--font-source-code-pro)', 'var(--font-space-mono)', 'var(--font-roboto-mono)', 'ui-monospace', 'monospace'],
        body: ['var(--font-manrope)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-exo-2)', 'var(--font-be-vietnam-pro)', 'var(--font-space-grotesk)', 'var(--font-chakra-petch)', 'var(--font-genos)', 'var(--font-tektur)', 'var(--font-manrope)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '1u': '4px', '2u': '8px', '3u': '12px', '4u': '16px',
        '6u': '24px', '8u': '32px', '12u': '48px',
      },
      boxShadow: {
        'neon-xs': 'var(--glow-xs)',
        'neon-sm': 'var(--glow-sm)',
        'neon-lg': 'var(--glow-neon)',
        'neon-blue-glow': 'var(--neon-blue-glow)',
        'neon-green-glow': 'var(--neon-green-glow)',
      },
      borderRadius: {
        'hud-sm': '4px',
        'hud-md': '6px',
        'hud-lg': '8px',
        'hud-pill': '9999px',
      },
      keyframes: {
        'scan': { '0%': { transform: 'translateY(-100%)' }, '100%': { transform: 'translateY(100%)' } },
        'neon-flicker': { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.92' } }
      },
      animation: {
        'scan-anim': 'scan 1.8s linear infinite',
        'neon-flicker': 'neon-flicker 2s ease-in-out infinite'
      }
    }
  }
}
```

**Ví dụ về lớp tiện ích:**

*   **Panel:** `bg-panel-bg p-4u rounded-hud-sm border border-ui-line`
*   **Selected Item:** `ring-2 ring-neon-cyan/60 shadow-neon-sm`
*   **Tooltip:** `bg-panel-bg p-3u rounded-hud-md text-sm text-neutral-body`
*   **Heading:** `text-4xl font-bold font-display text-neutral-strong`
*   **Body Text:** `text-base font-body text-neutral-body`
*   **Code Block:** `bg-bg-900 text-accent-primary font-mono text-lg`

---

### Các mẫu & Ví dụ (áp dụng cho Material Design Components)

Phần này mô tả các mẫu tương tác và ví dụ có thể được áp dụng khi tùy chỉnh các thành phần Material Design.

*   **Luồng chi tiết kho đồ:**
    *   **Tương tác:** Di chuột qua mục lưới kích hoạt tooltip xem trước.
    *   **Kích hoạt:** Nhấp vào một mục sẽ mở một panel chi tiết trượt từ bên phải, có hoạt ảnh quét tinh tế trên tiêu đề của nó.
*   **Chỉ báo trạng thái:**
    *   Kết hợp màu sắc, icon và nhãn để truyền đạt trạng thái (ví dụ: "EQUIPPED" bằng `neon-cyan` với icon tia chớp).
*   **Phản hồi lỗi/cảnh báo:**
    *   Sử dụng `neon-magenta` với hoạt ảnh rung hoặc nhấp nháy nhỏ, kèm theo giải thích tooltip ngắn gọn.

---

### Cân nhắc về bố cục & phản hồi (Responsive & Layout Considerations)

Các nguyên tắc này là chung và cần được áp dụng khi thiết kế bố cục với Material Design.

*   **Màn hình hẹp:** Các panel bên cạnh nên thu gọn thành các ngăn kéo điều hướng. Hình ảnh giải phẫu trung tâm hoặc khu vực nội dung chính có thể chuyển sang vùng có thể cuộn.
*   **Điều chỉnh thang loại:** Triển khai thang loại nhỏ hơn (ví dụ: giảm tất cả kích thước font một bước) để cải thiện khả năng đọc trên màn hình nhỏ gọn.
*   **Thích ứng lưới:** Điều chỉnh kích thước ô lưới (ví dụ: thành các ô vuông `56px`) để phù hợp với các khung nhìn nhỏ hơn.

---

### Ghi chú về khả năng tiếp cận (Accessibility Notes)

Các nguyên tắc này là phổ quát và cần được duy trì khi tùy chỉnh Material Design.

*   **Độ tương phản:** Duy trì tỷ lệ tương phản tối thiểu 4.5:1 cho tất cả văn bản chính để đảm bảo khả năng đọc. Các điểm nhấn neon chủ yếu mang tính trang trí và không nên là chỉ báo duy nhất cho thông tin thiết yếu.
*   **Trạng thái focus:** Cung cấp các trạng thái focus bàn phím rõ ràng và khác biệt bằng cách sử dụng đường viền và các tín hiệu không màu để hỗ trợ người dùng điều hướng bằng bàn phím.
*   **Giảm chuyển động:** Tôn trọng truy vấn phương tiện `prefers-reduced-motion` để tắt các hoạt ảnh và chuyển tiếp không cần thiết cho người dùng nhạy cảm với chuyển động.
*   **Nhãn ARIA:** Sử dụng các thuộc tính ARIA thích hợp cho các thành phần tương tác phức tạp để truyền đạt mục đích và trạng thái của chúng cho các công nghệ hỗ trợ.

---

## Danh sách kiểm tra triển khai (Implementation Checklist)

Danh sách này được điều chỉnh để phản ánh việc tùy chỉnh Material Design.

*   [x] Thêm các token màu vào biến CSS `:root` trong `globals.css`.
*   [x] Mở rộng cấu hình Tailwind CSS với các token màu, font, khoảng cách, bóng đổ và bo góc tùy chỉnh.
*   [ ] Xây dựng các thành phần cơ bản của Material Design và tùy chỉnh chúng: `Panel`, `InventoryGrid`, `Tooltip`, `HUDTitle`.
*   [x] Tạo các token chuyển động (keyframes) và đảm bảo `prefers-reduced-motion` được tôn trọng.
*   [ ] Thực hiện kiểm tra khả năng tiếp cận: xác minh tỷ lệ tương phản, điều hướng bàn phím và nhãn ARIA.

---

## Phụ lục — CSS Variable Starter (từ `globals.css`)

```css
:root{
  --bg-900: #06060A;
  --panel-bg: rgba(10,12,16,0.85);
  --ui-line: #2B2E34;
  --neon-cyan: #00E6FF;
  --neon-magenta: #FF2D6A;
  --neon-green: #7CFF6B;
  --neon-yellow: #FFD34B;
  --neon-orange: #FF8C42;
  --muted-gray: #9AA0A6;
  --neutral-body: #C7CED6;
  --neutral-strong: #E8EEF2;
  --accent-primary: #A6FFF4;
  --danger: #FF4D6D;

  /* Font Variables */
  --font-inter: 'Inter', sans-serif;
  --font-roboto-mono: 'Roboto Mono', monospace;
  --font-manrope: 'Manrope', sans-serif;
  --font-space-grotesk: 'Space Grotesk', sans-serif;
  --font-chakra-petch: 'Chakra Petch', sans-serif;
  --font-genos: 'Genos', sans-serif;
  --font-tektur: 'Tektur', sans-serif;
  --font-space-mono: 'Space Mono', monospace;
  --font-source-code-pro: 'Source Code Pro', monospace;
  --font-exo: 'Exo', sans-serif;
  --font-kanit: 'Kanit', sans-serif;
  --font-be-vietnam-pro: 'Be Vietnam Pro', sans-serif;
  --font-exo-2: 'Exo 2', sans-serif;
  --font-unica-one: 'Unica One', sans-serif;
  --font-teko: 'Teko', sans-serif;
  --font-rajdhani: 'Rajdhani', sans-serif;
  --font-jetbrains-mono: 'JetBrains Mono', monospace;
  --font-jetbrains-mono-nl: 'JetBrainsMonoNL', monospace; /* Self-hosted */

  /* Shadow Variables */
  --glow-xs: 0 2px 6px rgba(0,230,255,0.06);
  --glow-sm: 0 8px 28px rgba(0,230,255,0.08);
  --glow-neon: 0 0 18px rgba(0,230,255,0.18), 0 0 36px rgba(255,45,106,0.06);
  --neon-blue-glow: 0 0 10px #00f0ff, 0 0 20px #00f0ff;
  --neon-green-glow: 0 0 10px #00ff99, 0 0 20px #00ff99;
}
```

---

Hướng dẫn phong cách chi tiết này cung cấp cái nhìn tổng quan toàn diện về ngôn ngữ hình ảnh, design token và các mẫu triển khai của Cyberpunk HUD, được điều chỉnh để tùy chỉnh Material Design. Nó nhằm mục đích đảm bảo tính nhất quán và duy trì tính thẩm mỹ riêng biệt trên tất cả các yếu tố UI.