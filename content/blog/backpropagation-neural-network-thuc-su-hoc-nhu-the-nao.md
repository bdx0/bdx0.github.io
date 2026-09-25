---
title: "Backpropagation: neural network thực sự học như thế nào?"
publish_date: 2026-09-25
author: "BDX0"
description: "Backpropagation dùng chain rule và computation graph để tính gradient hiệu quả cho mọi tham số trong neural network."
tags: ["Mathematics", "AI", "Backpropagation", "Deep Learning", "Neural Network"]
---

# Backpropagation: neural network thực sự học như thế nào?

Ở bài Gradient, ta đã thấy model cần gradient để biết mỗi tham số nên thay đổi theo hướng nào.

Nhưng một neural network có thể có hàng tỷ tham số.

Nếu thử thay đổi từng tham số rồi chạy model lại để đo loss, chi phí sẽ khủng khiếp.

Backpropagation giải quyết vấn đề đó.

> Backpropagation là cách tính gradient hiệu quả bằng cách đi ngược computation graph và áp dụng chain rule.

## Forward pass trước, backward pass sau

Training một neural network thường có hai pha lớn.

Forward pass:

Input
→ Layer 1
→ Layer 2
→ ...
→ Prediction
→ Loss

Backward pass:

Loss
→ gradient qua layer cuối
→ gradient qua layer trước
→ ...
→ gradient của từng parameter

Forward tạo ra kết quả.

Backward tìm ra trách nhiệm của từng phép toán đối với loss.

## Một ví dụ nhỏ

Giả sử:

a = wx

y = a²

Ta muốn tính:

dy/dw

Theo chain rule:

dy/dw = dy/da × da/dw

Ta có:

dy/da = 2a

và:

da/dw = x

nên:

dy/dw = 2ax

Điểm quan trọng là ta không cần mở rộng toàn bộ biểu thức rồi tính lại từ đầu.

Ta có thể dùng kết quả trung gian a đã tính trong forward pass.

Đây là tư tưởng cốt lõi của backpropagation.

## Computation graph

Framework deep learning có thể nhìn chương trình như graph các phép toán.

Ví dụ:

x ----       multiply → a → square → y
w ----/

Mỗi node biết:

- input của mình
- output của mình
- đạo hàm cục bộ của phép toán

Khi backward bắt đầu từ loss, gradient chảy ngược qua graph.

Mỗi node lấy gradient từ phía sau, nhân với đạo hàm cục bộ rồi truyền tiếp.

## Local derivatives làm bài toán dễ hơn

Một model lớn có thể cực kỳ phức tạp.

Nhưng từng phép toán nhỏ lại có đạo hàm đơn giản.

Cộng:

y = a + b

thì đạo hàm theo a và b đều là 1.

Nhân:

y = ab

thì:

∂y/∂a = b

∂y/∂b = a

ReLU:

y = max(0, x)

thì gradient phụ thuộc x dương hay âm.

Matrix multiplication cũng có quy tắc đạo hàm riêng.

Framework chỉ cần biết backward rule của từng operation.

Từ những luật địa phương nhỏ, nó tính được gradient của cả hệ thống.

## Reverse-mode automatic differentiation

Backpropagation có thể được xem là một trường hợp của reverse-mode automatic differentiation.

Ta có rất nhiều input parameter nhưng chỉ một vài output scalar quan trọng như loss.

Reverse mode đặc biệt hiệu quả trong tình huống này.

Bắt đầu từ:

dL/dL = 1

rồi truyền gradient ngược.

Một lần backward có thể tính gradient của loss theo rất nhiều parameter.

Đây là lý do backprop phù hợp hoàn hảo với neural network.

## Tại sao phải lưu activation?

Trong forward pass, model tạo ra nhiều giá trị trung gian.

Backward thường cần các giá trị đó để tính local derivative.

Vì vậy training tốn memory hơn inference.

Inference chủ yếu đi tới trước.

Training phải giữ nhiều thông tin để còn quay lại.

Đây cũng là lý do activation checkpointing tồn tại: đổi thêm computation để giảm memory.

## Một layer tuyến tính

Xét:

y = Wx + b

Trong backward, ta cần gradient theo:

- W
- x
- b

Giả sử đã biết gradient từ phía sau:

dL/dy

Ta có thể suy ra các gradient cần thiết bằng những phép toán matrix.

Điều quan trọng là toàn bộ batch được xử lý cùng lúc.

Backprop không đi từng neuron theo kiểu vòng lặp ngây thơ.

Nó tận dụng linear algebra và GPU.

## Gradient được cộng khi graph phân nhánh

Một giá trị có thể ảnh hưởng đến loss qua nhiều đường.

Ví dụ một tensor được dùng ở hai nhánh khác nhau.

Khi backward đi ngược, gradient từ các nhánh phải được cộng lại.

Điều này phản ánh đúng calculus:

Nếu một biến ảnh hưởng đến output theo nhiều đường, tổng ảnh hưởng là tổng của các đóng góp.

Computation graph giúp framework quản lý việc này.

## Parameter không tự cập nhật trong backward

Một điểm dễ nhầm:

backpropagation tính gradient.

Optimizer mới dùng gradient để cập nhật parameter.

Ta có thể tách rõ:

Forward:
tạo prediction và loss.

Backward:
tính gradient.

Optimizer step:
thay đổi weight.

Ví dụ về ý tưởng:

weight.grad = dLoss/dweight

sau đó optimizer thực hiện update.

Backprop nói "đi hướng nào".

Optimizer quyết định "đi như thế nào".

## Zeroing gradient

Nhiều framework cộng dồn gradient mặc định.

Điều này hữu ích trong gradient accumulation.

Nhưng nếu không chủ ý, ta phải reset gradient giữa các bước.

Một training loop khái niệm thường là:

1. zero gradient
2. forward
3. compute loss
4. backward
5. optimizer step

Năm bước này là trái tim của rất nhiều pipeline deep learning.

## Vanishing gradient

Khi gradient đi ngược qua rất nhiều layer, nó có thể trở nên cực nhỏ.

Nếu liên tục nhân với các giá trị nhỏ hơn 1, gradient ở layer đầu gần như biến mất.

Khi đó layer đó học rất chậm.

Đây là vanishing gradient.

Các kiến trúc và kỹ thuật như ReLU, normalization, residual connection giúp giảm nhiều vấn đề optimization kiểu này.

## Exploding gradient

Ngược lại, nếu gradient liên tục bị khuếch đại, nó có thể trở nên cực lớn.

Weight update mất ổn định và training có thể diverge.

Gradient clipping là một kỹ thuật phổ biến để giới hạn norm của gradient.

Vanishing và exploding gradient cho thấy chain rule vừa là sức mạnh, vừa là nguồn thách thức.

## Residual connection giúp gradient đi qua network sâu

Một residual block có dạng khái niệm:

y = F(x) + x

Nhánh x cung cấp một đường trực tiếp hơn qua network.

Điều này không chỉ giúp forward representation mà còn tạo đường thuận lợi cho gradient trong backward.

Đó là một lý do residual connection trở thành thành phần cốt lõi của nhiều kiến trúc sâu, bao gồm Transformer.

## Backprop qua attention

Attention trông phức tạp:

Q, K, V
→ score
→ softmax
→ weighted sum

Nhưng với autograd, mỗi operation đều có backward rule.

Gradient đi ngược:

output
→ weighted sum
→ softmax
→ scores
→ Q, K, V
→ projection weights
→ input

Ta không cần tự viết từng đạo hàm trong phần lớn ứng dụng.

Framework xây computation graph và làm việc đó.

## Backpropagation không phải cách não sinh học học

Tên neural network khiến người ta dễ liên tưởng trực tiếp đến não.

Nhưng backpropagation là một thuật toán tối ưu trong hệ thống toán học nhân tạo.

Việc não sinh học học chính xác bằng cơ chế nào là câu hỏi khác.

Neural network lấy cảm hứng ở mức khái quát, không phải bản sao cơ chế sinh học.

## Training một LLM nhìn từ backprop

Một bước training language model có thể hình dung:

Token batch
→ embedding
→ nhiều Transformer layer
→ logits
→ next-token loss
→ backward qua toàn bộ network
→ gradient của parameter
→ optimizer update

Lặp lại quá trình này với lượng dữ liệu khổng lồ.

Model dần thay đổi weight để giảm loss dự đoán token.

Khả năng ngôn ngữ phức tạp xuất hiện từ một objective tương đối đơn giản nhưng được tối ưu ở quy mô rất lớn.

## Backprop là chiếc cầu nối

Ma trận giải thích phép biến đổi.

Tensor giải thích cách tổ chức dữ liệu.

Gradient cho biết hướng thay đổi.

Backpropagation cho phép tính những gradient đó hiệu quả trên cả network.

Bây giờ ta đã có cơ chế học.

Câu hỏi tiếp theo là:

> Model biểu diễn những khái niệm như từ, câu, hình ảnh hay người dùng bằng cách nào để có thể tính toán với chúng?

Đây là nơi embedding xuất hiện.

**Bài trước:** [Gradient: AI biết phải thay đổi tham số theo hướng nào?](/blog/gradient-ai-biet-thay-doi-tham-so-theo-huong-nao/)

**Bài tiếp theo:** [Embedding: khi AI biến ý nghĩa thành hình học](/blog/embedding-khi-ai-bien-y-nghia-thanh-hinh-hoc/)
