---
title: "Attention: cơ chế giúp Transformer chọn thông tin quan trọng"
publish_date: 2026-09-25
author: "BDX0"
description: "Từ Query, Key, Value đến scaled dot-product attention và multi-head attention: cơ chế giúp token trao đổi thông tin theo ngữ cảnh."
tags: ["AI", "Attention", "Transformer", "Deep Learning", "NLP"]
---

# Attention: cơ chế giúp Transformer chọn thông tin quan trọng

Giả sử ta đọc câu:

"Con mèo nằm cạnh chiếc ghế vì nó mệt."

Khi gặp từ "nó", ta có thể liên hệ nó với "con mèo".

Một language model cũng cần giải quyết những quan hệ phụ thuộc kiểu này.

Attention là cơ chế cho phép mỗi token hỏi:

> Trong các token khác, thông tin nào quan trọng đối với tôi lúc này?

## Từ embedding đến context

Embedding tạo vector cho token.

Nhưng vector ban đầu chưa chứa đầy đủ context.

Token "bank" trong hai câu khác nhau cần representation khác nhau.

Attention giúp token thu thập thông tin từ những token liên quan để tạo contextual representation.

## Query, Key, Value

Mỗi token representation X được chiếu qua ba ma trận trọng số:

Q = XW_Q

K = XW_K

V = XW_V

Ta gọi kết quả là:

- Query
- Key
- Value

Một trực giác hữu ích:

Query = tôi đang tìm loại thông tin gì?

Key = tôi có loại thông tin gì để người khác so khớp?

Value = nếu người khác quan tâm tôi, tôi sẽ gửi nội dung gì?

## So sánh Query với Key

Để biết token A nên chú ý token B bao nhiêu, ta tính độ tương đồng giữa Query của A và Key của B.

Một cách phổ biến là dot product.

Nếu Q và K phù hợp, score cao.

Với cả sequence, ta tính:

QK^T

Kết quả là một matrix score.

Mỗi hàng tương ứng một query position.

Mỗi cột tương ứng một key position.

## Vì sao phải scale?

Dot product có thể tăng độ lớn khi dimension lớn.

Nếu score quá lớn, softmax dễ trở nên cực kỳ sắc và gradient có thể khó ổn định hơn.

Scaled dot-product attention dùng:

QK^T / sqrt(d_k)

Trong đó d_k là dimension của key.

Sau đó mới đưa qua softmax.

## Softmax biến score thành trọng số

Softmax biến một dãy score thành các số dương có tổng bằng 1.

Ví dụ:

[2.0, 0.5, -1.0]

có thể trở thành gần như:

[0.79, 0.18, 0.03]

Ta có thể đọc:

- token thứ nhất nhận 79% trọng số
- token thứ hai 18%
- token thứ ba 3%

Attention weight không nhất thiết là "lời giải thích" hoàn chỉnh cho hành vi model, nhưng nó là trọng số tính toán thật trong mechanism.

## Weighted sum của Value

Sau khi có attention weights A, ta tính:

A V

Mỗi token nhận một weighted sum của các Value vector.

Tức là token mới không chỉ chứa thông tin của chính nó.

Nó đã trộn thông tin từ những token khác theo mức độ liên quan được học.

Công thức đầy đủ:

Attention(Q,K,V) = softmax(QK^T / sqrt(d_k)) V

Đằng sau công thức nổi tiếng này là một ý tưởng khá trực quan:

Match → Normalize → Mix information

## Self-attention

Nếu Q, K và V đều được tạo từ cùng sequence, đó là self-attention.

Mỗi token có thể tương tác với các token khác trong cùng context.

Ví dụ một token ở cuối câu có thể lấy thông tin từ đầu câu.

Không cần truyền trạng thái từng bước như RNN.

Đây là một trong những lý do Transformer có thể song song hóa tốt.

## Causal attention

Language model autoregressive không được phép nhìn token tương lai khi dự đoán token tiếp theo.

Do đó attention score được mask.

Token ở vị trí i chỉ được chú ý các vị trí ≤ i.

Ta có thể hình dung attention matrix hình tam giác.

Mask này giữ đúng bài toán next-token prediction.

## Multi-head attention

Một attention mechanism duy nhất có thể bị giới hạn.

Transformer dùng nhiều head.

Mỗi head có projection riêng và có thể học kiểu quan hệ khác nhau.

Một head có thể nhạy với quan hệ gần.

Head khác có thể chú ý dependency xa.

Head khác nữa có thể mã hóa pattern cú pháp hay cấu trúc khác.

Không nên diễn giải cứng rằng một head luôn tương ứng một khái niệm duy nhất, nhưng multi-head cho model nhiều "góc nhìn" song song.

## Shape của multi-head attention

Giả sử:

batch = B
sequence = T
hidden = D
heads = H

Ta thường reshape:

(B, T, D)

thành:

(B, H, T, D/H)

Sau attention, các head được ghép lại về:

(B, T, D)

Đây là ví dụ rõ về việc tensor shape và linear algebra phối hợp để thực hiện một cơ chế ngữ nghĩa.

## Attention có giá tính toán

Self-attention đầy đủ tạo matrix:

T × T

Nếu sequence length tăng gấp đôi, số cặp token tăng xấp xỉ bốn lần.

Đây là lý do context dài từng là thách thức lớn về memory và compute.

Nhiều nghiên cứu tìm cách tối ưu kernel, giảm memory hoặc thay đổi pattern attention.

Dù implementation tiến bộ, cấu trúc all-to-all cơ bản vẫn rất quan trọng để hiểu chi phí.

## Attention không phải memory hoàn chỉnh

Attention cho token truy cập representation trong context hiện tại.

Nó không đồng nghĩa với memory lâu dài.

Knowledge trong model phần lớn nằm trong learned parameters.

Context cung cấp working information tạm thời.

Retrieval system có thể cung cấp thêm external memory.

Attention là cơ chế kết nối và tổng hợp các nguồn representation đó trong computation.

## Cross-attention

Không phải attention lúc nào cũng self-attention.

Trong encoder-decoder hoặc multimodal system, Query có thể đến từ một nguồn, còn Key và Value đến từ nguồn khác.

Ví dụ text query có thể attention vào image features.

Đây là cross-attention.

Nó cho phép hai modality hay hai stream thông tin tương tác.

## Attention và retrieval có điểm giống nhau

Ta có thể thấy một motif chung:

Query
→ so với Keys
→ chọn những thứ liên quan
→ lấy Values

Vector search cũng có pattern tương tự:

query embedding
→ so với document embeddings
→ chọn nearest neighbors
→ lấy documents

Không phải hai cơ chế giống hệt nhau, nhưng chúng chia sẻ trực giác "tìm bằng độ tương đồng trong không gian vector".

## Attention có phải là "sự chú ý" như con người?

Tên gọi dễ gây hiểu nhầm.

Attention trong Transformer là một phép toán toán học.

Nó không chứng minh model có trải nghiệm chủ quan hay cơ chế chú ý sinh học giống con người.

Tên giúp trực giác hóa chức năng chọn lọc thông tin, không phải tuyên bố về ý thức.

## Từ attention đến Transformer block

Attention rất mạnh nhưng chưa đủ.

Một Transformer block còn có các thành phần như:

- residual connections
- normalization
- feed-forward network hay MLP

Attention chủ yếu trộn thông tin giữa các token.

MLP biến đổi representation tại từng vị trí.

Residual giúp thông tin và gradient đi qua mạng sâu.

Các block này được xếp chồng nhiều lần.

## Một token "hiểu context" như thế nào?

Không có một bước duy nhất nơi model đột nhiên hiểu.

Representation được cập nhật dần:

Embedding
→ Attention
→ MLP
→ Attention
→ MLP
→ ...

Mỗi layer có thể tái cấu trúc thông tin.

Contextual meaning xuất hiện từ cả chuỗi biến đổi.

## Attention là một routing mechanism

Một cách nhìn hữu ích là:

> Attention thực hiện dynamic information routing.

Weight không cố định cho mọi input.

Attention score được tính lại theo context cụ thể.

Cùng một token có thể chú ý vị trí khác nhau trong các câu khác nhau.

Đó là sức mạnh lớn so với một kết nối hoàn toàn tĩnh.

## Bước tiếp theo: Transformer

Giờ ta đã có những mảnh quan trọng:

- vector và matrix
- tensor
- gradient
- backpropagation
- embedding
- attention

Transformer là kiến trúc kết hợp những mảnh này thành một hệ thống có thể scale rất lớn.

Ở bài tiếp theo, ta sẽ ráp toàn bộ lại và theo dõi một token đi xuyên qua Transformer cho đến khi model tạo ra token kế tiếp.

**Bài trước:** [Embedding: khi AI biến ý nghĩa thành hình học](/blog/embedding-khi-ai-bien-y-nghia-thanh-hinh-hoc/)

**Bài tiếp theo:** [Transformer: từ attention đến mô hình ngôn ngữ lớn](/blog/transformer-tu-attention-den-mo-hinh-ngon-ngu-lon/)
