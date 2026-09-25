---
title: "Embedding: khi AI biến ý nghĩa thành hình học"
publish_date: 2026-09-25
author: "BDX0"
description: "Embedding biến từ ngữ, hình ảnh, người dùng hay sản phẩm thành vector để AI có thể đo sự tương đồng, tìm kiếm và suy luận trong không gian biểu diễn."
tags: ["Mathematics", "AI", "Embedding", "NLP", "Representation Learning"]
---

# Embedding: khi AI biến ý nghĩa thành hình học

Máy tính không trực tiếp hiểu một từ, một hình ảnh hay một bài hát theo cách con người hiểu.

Nó cần một dạng biểu diễn có thể tính toán.

Embedding là một trong những ý tưởng đẹp nhất của machine learning:

> Biến một đối tượng phức tạp thành một vector trong không gian nhiều chiều sao cho cấu trúc hình học của không gian phản ánh những quan hệ có ý nghĩa.

## Từ ID sang vector

Giả sử từ "mèo" có token ID là 421.

Con số 421 chỉ là nhãn.

Nó không nói "mèo" gần "chó" hơn "máy bay".

Nếu dùng ID trực tiếp, model không có thông tin hình học nào về quan hệ giữa các token.

Embedding thay mỗi ID bằng một vector:

mèo → [0.18, -0.71, 0.42, ...]

chó → [0.22, -0.66, 0.39, ...]

máy bay → [-0.44, 0.11, 0.80, ...]

Các vector có thể có hàng trăm hoặc hàng nghìn chiều.

## Gần nhau trong không gian có thể nghĩa là gần nhau về ý nghĩa

Nếu quá trình học tốt, các khái niệm có quan hệ có thể nằm gần nhau hơn.

Ta có thể đo khoảng cách Euclid hoặc cosine similarity.

Cosine similarity quan tâm đến góc giữa hai vector.

Hai vector cùng hướng thường có similarity cao.

Embedding biến một câu hỏi ngữ nghĩa:

"Hai khái niệm này giống nhau đến mức nào?"

thành một bài toán hình học:

"Hai vector này gần nhau đến mức nào?"

## Embedding matrix

Trong language model, vocabulary có thể chứa hàng chục nghìn token.

Mỗi token có một embedding vector.

Xếp tất cả embedding lại, ta có embedding matrix.

Nếu vocabulary có V token và embedding dimension là d:

shape = V × d

Khi tokenizer trả về token ID, model dùng ID đó để lấy một hàng tương ứng trong embedding matrix.

Operation này thường gọi là embedding lookup.

## Embedding được học

Ban đầu embedding có thể gần ngẫu nhiên.

Trong training, gradient đi ngược tới embedding matrix.

Những vector nào giúp giảm loss sẽ được điều chỉnh.

Dần dần, hình học của embedding space bắt đầu chứa cấu trúc có ích cho objective của model.

Điều đó cho thấy embedding không phải bảng từ điển do con người nhập tay.

Nó là representation được học.

## Static embedding và contextual embedding

Các kỹ thuật embedding đời đầu thường cho mỗi từ một vector cố định.

Vấn đề là một từ có thể có nhiều nghĩa.

Ví dụ "bank" có thể là ngân hàng hoặc bờ sông.

Contextual embedding giải quyết điều đó.

Trong Transformer, representation của một token sau các layer phụ thuộc vào context xung quanh.

Cùng một token ID nhưng trong hai câu khác nhau có thể có vector khác nhau.

Ta không còn chỉ hỏi:

"Vector của từ này là gì?"

mà hỏi:

"Representation của token này trong context cụ thể này là gì?"

## Sentence embedding

Ta cũng có thể biểu diễn cả câu hoặc đoạn văn bằng một vector.

Ví dụ:

"Tôi thích học toán."

và:

"Tôi hứng thú với toán học."

có thể được ánh xạ tới hai vector gần nhau.

Sentence embedding là nền tảng của:

- semantic search
- clustering
- recommendation
- duplicate detection
- retrieval-augmented generation

## Vector search

Giả sử có một triệu tài liệu.

Ta tạo embedding cho từng tài liệu và lưu vào vector database hoặc vector index.

Khi người dùng nhập câu hỏi:

1. Tạo embedding cho câu hỏi.
2. Tìm những vector tài liệu gần nhất.
3. Trả về các tài liệu liên quan.

Khác với keyword search, semantic search có thể tìm tài liệu liên quan dù không dùng chính xác cùng từ.

Embedding vì thế biến search thành nearest-neighbor problem.

## Recommendation cũng dùng embedding

Không chỉ văn bản.

Ta có thể học embedding cho:

- user
- sản phẩm
- bài hát
- phim
- creator
- quảng cáo

Nếu user embedding nằm gần product embedding trong một không gian được học phù hợp, hệ thống có thể dự đoán user quan tâm sản phẩm đó.

Recommendation system vì thế cũng có thể được nhìn như một bài toán hình học.

## Image embedding

Computer vision model có thể biến ảnh thành vector.

Hai ảnh có nội dung giống nhau có thể có embedding gần nhau.

Nếu model đa phương thức học text và image vào cùng không gian, ta có thể so sánh:

embedding("một con chó chạy trên bãi biển")

với embedding của ảnh.

Điều này mở ra text-to-image retrieval và nhiều hệ thống multimodal.

## Embedding space không dễ diễn giải từng chiều

Một sai lầm phổ biến là cố hỏi:

"Chiều số 127 có nghĩa là gì?"

Trong representation distributed, ý nghĩa thường không nằm ở một chiều đơn lẻ.

Một khái niệm có thể được biểu diễn bởi pattern trên rất nhiều chiều.

Ngược lại, một chiều có thể tham gia nhiều khái niệm.

Embedding space có tính distributed.

Đó cũng là lý do visualization 2D chỉ là projection của một không gian phức tạp hơn nhiều.

## Dimension càng lớn càng tốt?

Không hẳn.

Dimension lớn có thể cho model capacity cao hơn, nhưng:

- tốn memory
- tốn compute
- search đắt hơn
- có thể chứa redundancy

Dimension là một design choice.

Điều quan trọng không phải chỉ số chiều lớn mà là representation có phục vụ objective tốt hay không.

## Embedding và position

Token embedding nói token là gì.

Nhưng Transformer còn cần biết token nằm ở đâu trong sequence.

Vì vậy representation thường được kết hợp với thông tin vị trí thông qua positional encoding, learned position, RoPE hoặc kỹ thuật khác.

Hai token giống nhau ở hai vị trí khác nhau không nhất thiết nên được xử lý giống nhau.

Embedding mang nội dung.

Position mang cấu trúc thứ tự.

## Embedding chỉ là điểm bắt đầu của Transformer

Input embedding được đưa vào Transformer.

Sau mỗi layer, vector của token được biến đổi.

Ban đầu representation gần với token identity.

Sau nhiều layer, nó trở thành contextual representation giàu thông tin hơn.

Ta có thể hình dung:

Token
→ Embedding
→ Attention
→ MLP
→ Attention
→ ...
→ Contextual representation

Embedding là cánh cửa để dữ liệu rời thế giới symbolic và bước vào không gian số mà model có thể biến đổi.

## Embedding và knowledge

Embedding có thể mã hóa nhiều regularity từ dữ liệu, nhưng không nên đồng nhất embedding với "kiến thức" theo nghĩa một database fact.

Một fact có thể được phân tán qua:

- embedding
- attention projections
- MLP weights
- nhiều layer khác

Embedding là một phần của representation system, không phải kho kiến thức duy nhất.

## Khi ý nghĩa trở thành hình học

Đây là điểm hấp dẫn nhất.

Ta bắt đầu từ những thứ khó định lượng:

- giống nghĩa
- cùng chủ đề
- liên quan
- sở thích
- phong cách

và biến chúng thành:

- vector
- góc
- khoảng cách
- neighborhood

AI biến một phần của semantic structure thành geometry.

## Từ embedding đến attention

Embedding cho ta vector của các token.

Nhưng language model còn phải trả lời:

> Trong context hiện tại, token nào liên quan token nào?

Đó là công việc của attention.

Nếu embedding đặt thông tin vào không gian vector, attention là cơ chế cho phép các vị trí trong sequence trao đổi thông tin có chọn lọc.

**Bài trước:** [Backpropagation: neural network thực sự học như thế nào?](/blog/backpropagation-neural-network-thuc-su-hoc-nhu-the-nao/)

**Bài tiếp theo:** [Attention: cơ chế giúp Transformer chọn thông tin quan trọng](/blog/attention-co-che-giup-transformer-chon-thong-tin-quan-trong/)
