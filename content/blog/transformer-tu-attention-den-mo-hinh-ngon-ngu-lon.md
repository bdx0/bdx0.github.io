---
title: "Transformer: từ attention đến mô hình ngôn ngữ lớn"
publish_date: 2026-09-25
author: "BDX0"
description: "Ráp lại toàn bộ chuỗi: embedding, attention, MLP, residual, normalization, logits và next-token prediction để hiểu Transformer và LLM hoạt động thế nào."
tags: ["AI", "Transformer", "LLM", "Deep Learning", "NLP"]
---

# Transformer: từ attention đến mô hình ngôn ngữ lớn

Chúng ta đã đi qua một chuỗi ý tưởng:

Vector
→ Matrix
→ Tensor
→ Gradient
→ Backpropagation
→ Embedding
→ Attention

Bây giờ có thể ráp chúng lại.

Transformer là một kiến trúc biến chuỗi token thành chuỗi representation ngày càng giàu context bằng cách lặp lại những block gồm attention, feed-forward network, residual connection và normalization.

Ở quy mô lớn, kiến trúc này trở thành nền tảng cho nhiều language model hiện đại.

## Bước 1: Text trở thành token

Model không nhận trực tiếp một câu dưới dạng ký tự có ý nghĩa.

Tokenizer biến text thành token ID.

Ví dụ khái niệm:

"AI đang học"

có thể thành:

[812, 1934, 551]

Tokenization là bước chuyển từ chuỗi ký tự sang vocabulary rời rạc mà model có thể index.

## Bước 2: Token trở thành embedding

Mỗi token ID được lookup trong embedding matrix.

Ta nhận tensor:

batch × sequence × hidden

Ví dụ:

1 × 3 × 4096

Mỗi token giờ là vector 4096 chiều.

Nhưng model còn cần thông tin thứ tự.

Cơ chế positional information được kết hợp để phân biệt token ở những vị trí khác nhau.

## Bước 3: Đi vào Transformer block

Một block khái niệm gồm hai phần lớn:

1. Attention
2. Feed-forward network

Xung quanh chúng là normalization và residual connection.

Tùy kiến trúc, thứ tự chi tiết có thể khác, nhưng motif chung vẫn vậy.

## Attention: token trao đổi thông tin

Từ input X, model tạo:

Q = XW_Q
K = XW_K
V = XW_V

Sau đó:

Attention(Q,K,V) = softmax(QK^T / sqrt(d_k))V

Multi-head attention chạy nhiều attention head song song.

Kết quả được ghép lại và chiếu trở lại hidden dimension.

Attention cho token đọc thông tin có chọn lọc từ những token khác trong context.

## MLP: xử lý representation tại từng token

Sau attention thường là một feed-forward network.

Dạng khái niệm:

MLP(x) = W2 activation(W1x)

Hidden dimension có thể được mở rộng ở layer giữa rồi chiếu về kích thước ban đầu.

Attention chủ yếu kết hợp thông tin giữa các vị trí.

MLP thực hiện nonlinear transformation trên representation của từng vị trí.

Hai cơ chế bổ sung cho nhau.

## Vì sao cần nonlinear activation?

Nếu chỉ xếp nhiều linear transformation:

W3 W2 W1 x

ta có thể gộp chúng thành một linear transformation duy nhất.

Nonlinearity làm network có khả năng biểu diễn những hàm phức tạp hơn nhiều.

Các kiến trúc hiện đại có thể dùng nhiều activation khác nhau, nhưng ý nghĩa chung là phá tính tuyến tính thuần túy.

## Residual connection

Thay vì chỉ dùng:

y = F(x)

Transformer thường có dạng:

y = x + F(x)

Input cũ được cộng trực tiếp vào output của sublayer.

Residual connection giúp:

- giữ thông tin
- ổn định optimization
- tạo đường truyền gradient tốt hơn
- cho phép xây network rất sâu

Đây là một trong những ý tưởng kiến trúc quan trọng nhất của deep learning hiện đại.

## Normalization

Representation đi qua nhiều layer có thể thay đổi scale và distribution.

Normalization giúp giữ computation ổn định hơn.

Trong Transformer hiện đại thường gặp LayerNorm hoặc RMSNorm tùy kiến trúc.

Chi tiết khác nhau, nhưng mục tiêu chung là kiểm soát scale của activation để training sâu dễ hơn.

## Xếp chồng nhiều block

Một block chưa tạo ra language model mạnh.

Ta xếp nhiều block:

Embedding
→ Block 1
→ Block 2
→ Block 3
→ ...
→ Block N

Mỗi layer nhận tensor từ layer trước và tạo representation mới.

Có thể nhìn mỗi layer như một bước tái tổ chức thông tin.

Representation ở layer sâu hơn đã đi qua rất nhiều vòng attention và nonlinear transformation.

## Từ hidden state đến logits

Sau layer cuối, model cần dự đoán token kế tiếp.

Hidden state tại vị trí cuối được chiếu sang vocabulary dimension.

Nếu vocabulary có V token, ta nhận V con số gọi là logits.

Mỗi logit đại diện mức độ model ưu tiên một token trước softmax.

Softmax biến logits thành distribution xác suất.

## Next-token prediction

Language model autoregressive được train để dự đoán token tiếp theo.

Ví dụ:

"Trái Đất quay quanh"

model nên gán xác suất cao cho token liên quan "Mặt Trời".

Loss so sánh distribution dự đoán với token thật.

Backpropagation tính gradient.

Optimizer cập nhật weight.

Lặp lại trên lượng dữ liệu rất lớn.

Từ objective next-token khá đơn giản, model học nhiều regularity của ngôn ngữ và dữ liệu.

## Training và inference khác nhau

Training:

- có token mục tiêu
- tính loss
- backward
- cập nhật weights

Inference:

- weights cố định
- model tính logits
- chọn hoặc sample token
- nối token mới vào context
- chạy tiếp

Generation là vòng lặp:

context
→ predict next token
→ append
→ predict next token
→ append
→ ...

## Temperature

Khi sampling, logits có thể được điều chỉnh bằng temperature.

Temperature thấp làm distribution sắc hơn, output thường ổn định và ít ngẫu nhiên hơn.

Temperature cao làm distribution phẳng hơn, tăng đa dạng nhưng cũng tăng rủi ro chọn token kém phù hợp.

Temperature không làm model thông minh hơn.

Nó thay đổi cách sample từ distribution mà model đã tạo.

## Context window

Transformer chỉ trực tiếp xử lý lượng context hữu hạn trong một lần inference.

Context có thể chứa:

- prompt hệ thống
- message của người dùng
- lịch sử hội thoại
- retrieved documents
- tool results
- output đang sinh

Attention cho model kết hợp thông tin trong context đó.

Context không đồng nghĩa với toàn bộ knowledge của model.

## Parameters và context là hai nguồn thông tin khác nhau

Ta có thể phân biệt:

Parametric knowledge:
information encoded distributed trong learned weights.

Contextual information:
information được đưa vào input hiện tại.

RAG bổ sung nguồn thứ ba:

Retrieved external information.

Transformer xử lý tất cả chúng thành representation trong computation hiện tại.

## Tại sao Transformer scale tốt?

Một số lý do quan trọng:

- matrix multiplication cực kỳ hợp với GPU/accelerator
- training trên sequence có thể song song hóa tốt
- kiến trúc module hóa và lặp lại
- attention cho phép quan hệ xa trong sequence
- tensor operations có thể tối ưu mạnh ở cấp kernel và distributed systems

Sức mạnh không chỉ đến từ một công thức.

Nó đến từ sự ăn khớp giữa toán học, kiến trúc, dữ liệu và phần cứng.

## Transformer không chỉ dành cho text

Cùng pattern đã được áp dụng cho:

- hình ảnh
- audio
- video
- protein
- multimodal data
- time series

Điều cốt lõi là biến input thành sequence hoặc tập representation phù hợp, rồi dùng attention và các transformation để xử lý.

## Một LLM nhìn qua toàn bộ series

Ta có thể tóm tắt:

Text
→ Token IDs
→ Embedding vectors
→ Tensor
→ Matrix projections
→ Attention
→ MLP
→ nhiều Transformer blocks
→ Logits
→ Probability distribution
→ Next token

Trong training, thêm:

Loss
→ Gradient
→ Backpropagation
→ Optimizer
→ Updated tensors

Mỗi bài trong series giải thích một đoạn của pipeline.

## Vậy "trí thông minh" nằm ở đâu?

Không có một module tên intelligence.

Không có một neuron duy nhất chứa khả năng suy luận.

Hành vi xuất hiện từ tương tác của:

- architecture
- learned weights
- representations
- context
- training objective
- data
- inference procedure
- tools và external systems khi có

Đây là một distributed computational system.

## Từ toán học nhỏ đến hệ thống lớn

Điều thú vị là các thành phần cơ bản lại rất quen thuộc:

- cộng
- nhân
- dot product
- matrix multiplication
- đạo hàm
- softmax
- nonlinear function

Không có một phép toán đơn lẻ nào mang tên "hiểu ngôn ngữ".

Nhưng hàng tỷ phép toán được tổ chức đúng cách tạo ra hành vi rất phức tạp.

Đây có lẽ là một trong những bài học đẹp nhất của deep learning:

> Complexity có thể xuất hiện từ việc lặp lại và kết hợp những phép toán tương đối đơn giản ở quy mô rất lớn.

## Toàn bộ hành trình

Series này bắt đầu bằng câu hỏi: ma trận thực sự dùng để làm gì ngoài 3D?

Câu trả lời dẫn ta qua:

**Ma trận** — phép biến đổi của representation.

**Tensor** — cấu trúc tổ chức dữ liệu và tham số.

**Gradient** — hướng để giảm loss.

**Backpropagation** — cách tính gradient hiệu quả.

**Embedding** — biến đối tượng thành hình học vector.

**Attention** — routing thông tin động giữa các token.

**Transformer** — kiến trúc ráp những thành phần trên thành một hệ thống có thể scale.

Đó chưa phải toàn bộ AI.

Nhưng nó là một bản đồ đủ mạnh để khi nhìn thấy code của một model, ta không còn chỉ thấy những tensor vô nghĩa.

Ta bắt đầu nhận ra mỗi tensor đang đóng vai trò gì trong cả hệ thống.

**Bài trước:** [Attention: cơ chế giúp Transformer chọn thông tin quan trọng](/blog/attention-co-che-giup-transformer-chon-thong-tin-quan-trong/)

**Bắt đầu series:** [Ma trận: ngôn ngữ toán học phía sau AI](/blog/ma-tran-ngon-ngu-toan-hoc-cua-ai/)
