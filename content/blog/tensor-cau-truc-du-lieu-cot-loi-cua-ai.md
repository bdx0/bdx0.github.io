---
title: "Tensor: từ ma trận nhiều chiều đến cấu trúc dữ liệu cốt lõi của AI"
publish_date: 2026-09-25
author: "BDX0"
description: "Tensor là gì, vì sao ảnh, văn bản, video, trọng số và activation trong AI đều được tổ chức dưới dạng tensor?"
tags: ["Mathematics", "AI", "Tensor", "Deep Learning", "PyTorch"]
---

# Tensor: từ ma trận nhiều chiều đến cấu trúc dữ liệu cốt lõi của AI

Ở bài trước, chúng ta đã nhìn ma trận như một phép biến đổi: dữ liệu đi vào, ma trận tác động lên nó và tạo ra một representation mới.

Nhưng khi mở code PyTorch hay TensorFlow, từ xuất hiện ở khắp nơi lại không phải matrix mà là tensor.

Vì sao?

Bởi AI hiện đại không chỉ xử lý các bảng hai chiều. Nó phải xử lý batch, chuỗi token, nhiều attention head, ảnh màu, video, âm thanh và hàng tỷ tham số. Tensor là cách tổng quát để tổ chức tất cả những cấu trúc đó.

> Trong deep learning, tensor có thể được hiểu thực dụng là một mảng số nhiều chiều, đi kèm shape, kiểu dữ liệu, thiết bị tính toán và thường cả thông tin phục vụ automatic differentiation.

## Từ scalar đến tensor

Bắt đầu từ một giá trị duy nhất:

30

Đó là một scalar.

Một danh sách giá trị:

[30, 165, 55]

là một vector.

Nhiều vector xếp cạnh nhau tạo thành matrix.

Nếu tiếp tục thêm các trục tổ chức dữ liệu, ta đi đến tensor nhiều chiều.

Có thể hình dung:

Scalar → Vector → Matrix → Tensor 3D → Tensor 4D → ...

Trong machine learning, mọi thứ trên đều có thể được coi là tensor với số chiều khác nhau.

## Shape quan trọng hơn số chiều

Giả sử một tensor có shape:

(32, 128, 768)

Ba con số có thể mang ý nghĩa:

- 32 mẫu trong một batch
- 128 token trong mỗi mẫu
- 768 feature cho mỗi token

Tensor có cùng số phần tử nhưng shape khác có thể mang ý nghĩa hoàn toàn khác.

Đó là lý do một trong những câu lệnh phổ biến nhất khi debug model là kiểm tra shape.

Không phải vì shape chỉ là thông tin kỹ thuật. Shape chính là một phần của ngữ nghĩa dữ liệu.

## Một bức ảnh đã là tensor

Ảnh grayscale có thể được biểu diễn bằng một matrix:

height × width

Ảnh RGB cần thêm trục channel:

height × width × 3

Nếu xử lý 64 ảnh cùng lúc, ta thêm batch:

64 × height × width × 3

Trong PyTorch thường gặp thứ tự:

batch × channels × height × width

Ví dụ:

64 × 3 × 224 × 224

Như vậy một batch ảnh màu là tensor bốn chiều.

## Video chỉ là thêm một trục nữa

Video gồm nhiều frame.

Một batch video có thể có shape:

batch × frames × channels × height × width

Ví dụ:

8 × 30 × 3 × 224 × 224

Một tensor duy nhất giờ chứa 8 video, mỗi video 30 frame.

Điểm quan trọng là tensor không cần biết "video" là gì. Ý nghĩa của từng axis do chúng ta và kiến trúc model quy định.

## Text cũng trở thành tensor

Một câu trước hết được tokenizer biến thành token ID.

Sau đó mỗi token được ánh xạ thành embedding vector.

Nếu một sequence có 2.048 token và hidden dimension là 4.096, representation của sequence có shape:

2048 × 4096

Nếu xử lý 8 sequence cùng lúc:

8 × 2048 × 4096

Đây là shape xuất hiện liên tục trong language model:

batch × sequence × hidden

Transformer về cơ bản nhận tensor, biến đổi tensor rồi trả ra tensor mới.

## Weight của model cũng là tensor

Ở layer tuyến tính đơn giản, trọng số có thể là một matrix W.

Nhưng không phải layer nào cũng chỉ cần matrix.

Convolution kernel có thể có shape:

out_channels × in_channels × kernel_height × kernel_width

Attention có các projection weight.

Mixture-of-Experts có thể tổ chức nhiều expert thành những tensor lớn hơn.

Vì vậy cách nói tổng quát hơn là:

> Tham số của neural network được lưu trong các tensor trọng số.

Một checkpoint model phần lớn chính là những tensor này được serialize xuống file.

## Activation cũng là tensor

Weight không phải tensor duy nhất.

Khi dữ liệu đi qua network, mỗi layer tạo ra representation trung gian, thường gọi là activation.

Ta có thể hình dung:

Input tensor
→ Layer 1
→ Activation tensor
→ Layer 2
→ Activation tensor
→ ...
→ Output tensor

Trong training, những activation quan trọng còn phải được giữ lại đủ lâu để tính gradient.

Vì vậy memory của AI model không chỉ dùng để chứa weight mà còn dùng rất nhiều cho activation.

## Attention khiến tensor nhiều chiều trở nên tự nhiên

Trong Transformer, từ input X ta tạo Query, Key và Value.

Khi có batch và multi-head attention, chúng thường được reshape thành:

batch × heads × sequence × head_dimension

Ví dụ:

8 × 32 × 2048 × 128

Khi tính attention score, kết quả có thể có shape:

batch × heads × sequence × sequence

Tức là mỗi head có một bảng quan hệ giữa mọi query position và mọi key position.

Một khái niệm rất trừu tượng như "token này chú ý token kia bao nhiêu" cuối cùng được biểu diễn thành các giá trị trong tensor.

## Reshape không nhất thiết thay đổi dữ liệu

Giả sử hidden dimension bằng 4096 và model có 32 attention head.

Ta có:

4096 = 32 × 128

Một tensor:

(batch, sequence, 4096)

có thể được reshape thành:

(batch, sequence, 32, 128)

rồi permute thành:

(batch, 32, sequence, 128)

Số phần tử không đổi.

Ta chỉ thay đổi cách tổ chức chúng để phép toán tiếp theo có ý nghĩa.

Đây là lý do reshape, view, transpose và permute xuất hiện dày đặc trong code deep learning.

## Broadcasting: cùng một phép toán cho rất nhiều vị trí

Giả sử activation có shape:

(32, 128, 768)

và bias có shape:

(768,)

Ta vẫn có thể cộng chúng.

Framework hiểu rằng bias phải được áp dụng cho mọi token trong mọi sample.

Cơ chế này gọi là broadcasting.

Nó giúp biểu diễn phép toán ngắn gọn mà không cần thật sự tạo hàng nghìn bản sao của vector bias.

## Tensor còn có dtype

Một tensor không chỉ có shape.

Nó còn có kiểu dữ liệu:

- float32
- float16
- bfloat16
- int8
- int4

Cùng một số phần tử nhưng dtype khác nhau sẽ cần lượng bộ nhớ khác nhau.

Một matrix 4096 × 4096 có hơn 16 triệu phần tử.

Nếu mỗi phần tử dùng 4 byte, bộ nhớ cần thiết lớn gấp đôi so với 2 byte.

Ở quy mô hàng tỷ tham số, dtype trở thành vấn đề kiến trúc.

Đây là nền tảng của mixed precision và quantization.

## Tensor còn có device

Tensor có thể nằm trên CPU, GPU, TPU, NPU hay accelerator khác.

Khi ta chuyển tensor lên GPU, ta đang chuyển dữ liệu đến phần cứng được tối ưu cho những phép toán song song cực lớn.

GPU không biết "mèo", "câu văn" hay "bài hát".

Nó thấy những tensor số và thực thi kernel toán học lên chúng.

## Tensor và automatic differentiation

Trong framework deep learning, tensor còn có thể tham gia computation graph.

Giả sử:

y = x²

Nếu x được đánh dấu cần gradient, framework ghi lại phép toán đã tạo ra y.

Khi gọi backward, nó có thể tính:

dy/dx = 2x

Từ một ví dụ nhỏ này, ý tưởng được mở rộng đến network hàng tỷ tham số.

Loss là một tensor.

Weight là tensor.

Gradient của loss theo weight cũng là tensor.

Training trở thành:

data tensors
→ forward computation
→ loss tensor
→ backward computation
→ gradient tensors
→ update weight tensors

## Model AI là kiến trúc cộng với tensor đã học

Có thể tách một model thành hai phần:

Architecture = quy tắc các tensor tương tác với nhau

Weights = giá trị đã học bên trong các tensor

Hai model dùng cùng kiến trúc nhưng weight khác nhau có thể hành xử hoàn toàn khác.

Một model chưa train có cấu trúc đúng nhưng weight gần ngẫu nhiên.

Training là quá trình biến các tensor weight đó thành những giá trị hữu ích.

## Tensor như ngôn ngữ trung gian của AI

Text được encode thành tensor.

Ảnh được encode thành tensor.

Audio được encode thành tensor.

Video được encode thành tensor.

Weight là tensor.

Activation là tensor.

Gradient là tensor.

Output trước khi decode cũng là tensor.

Có thể nhìn AI hiện đại như một pipeline:

Reality
→ Numbers
→ Tensors
→ Transformations
→ Representations
→ Predictions or Generations

Tensor là điểm gặp nhau giữa dữ liệu, toán học và phần cứng.

## Tensor không phải trí thông minh

Một tensor tự nó chỉ là một cấu trúc chứa số.

Ý nghĩa không nằm trong từng con số riêng lẻ mà xuất hiện từ toàn bộ hệ thống:

- cách encode dữ liệu
- kiến trúc model
- objective
- training data
- các phép biến đổi
- những weight đã học

Tensor cung cấp vật liệu.

Kiến trúc và quá trình học quyết định vật liệu đó được tổ chức thành gì.

## Bước tiếp theo: Gradient

Nếu tensor cho ta biết dữ liệu và tham số được tổ chức như thế nào, câu hỏi tiếp theo là:

> Một model biết phải thay đổi những tensor trọng số đó theo hướng nào?

Câu trả lời nằm ở gradient.

Gradient là cầu nối từ một model chứa những con số gần ngẫu nhiên sang một model có thể học từ dữ liệu.

**Bài trước:** [Ma trận: ngôn ngữ toán học phía sau AI](/blog/ma-tran-ngon-ngu-toan-hoc-cua-ai/)

**Bài tiếp theo:** [Gradient: AI biết phải thay đổi hàng tỷ tham số theo hướng nào?](/blog/gradient-ai-biet-thay-doi-tham-so-theo-huong-nao/)
