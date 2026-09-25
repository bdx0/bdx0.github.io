---
title: "Gradient: AI biết phải thay đổi hàng tỷ tham số theo hướng nào?"
publish_date: 2026-09-25
author: "BDX0"
description: "Từ đạo hàm một biến đến gradient nhiều chiều: cơ chế toán học giúp neural network biết nên thay đổi trọng số theo hướng nào."
tags: ["Mathematics", "AI", "Gradient", "Deep Learning", "Optimization"]
---

# Gradient: AI biết phải thay đổi hàng tỷ tham số theo hướng nào?

Một neural network có thể chứa hàng triệu hay hàng tỷ tham số.

Ban đầu, rất nhiều tham số trong số đó gần như ngẫu nhiên.

Vậy làm sao model biết:

- tham số nào cần tăng,
- tham số nào cần giảm,
- tăng bao nhiêu,
- giảm bao nhiêu?

Nó cần một tín hiệu chỉ đường.

Tín hiệu đó là gradient.

## Bắt đầu từ đạo hàm

Giả sử có hàm:

y = x²

Tại x = 3, nếu tăng x lên một chút, y thay đổi như thế nào?

Đạo hàm là:

dy/dx = 2x

Tại x = 3:

dy/dx = 6

Con số 6 mô tả độ dốc cục bộ của hàm.

Nếu đạo hàm dương, tăng x làm y tăng.

Nếu đạo hàm âm, tăng x làm y giảm.

Nếu đạo hàm gần 0, ta đang ở vùng tương đối phẳng.

Đạo hàm vì thế không chỉ là một công thức. Nó là thông tin về hướng thay đổi.

## Loss biến việc học thành bài toán tối ưu

Trong machine learning, model đưa ra dự đoán.

Ta so sánh dự đoán với mục tiêu và tính loss.

Loss càng nhỏ nghĩa là model đang làm tốt hơn theo objective đã chọn.

Training vì thế có thể được viết như một bài toán:

Tìm các tham số W sao cho Loss(W) nhỏ nhất.

Nếu chỉ có một tham số w, ta có thể nhìn đồ thị loss như một đường cong.

Ta muốn đi xuống đáy.

Đạo hàm cho biết hướng dốc lên.

Vì vậy muốn đi xuống, ta đi theo hướng ngược lại.

## Gradient descent

Quy tắc cơ bản là:

w_new = w_old - learning_rate × dLoss/dw

Nếu gradient dương, ta giảm w.

Nếu gradient âm, trừ một số âm nghĩa là ta tăng w.

Model không "hiểu" mình sai ở đâu theo ngôn ngữ con người.

Nó chỉ biết:

> Nếu thay đổi tham số theo hướng này, loss có xu hướng giảm.

Đó là nền tảng của gradient descent.

## Khi có nhiều tham số

Neural network không có một tham số mà có rất nhiều.

Giả sử loss phụ thuộc vào:

w1, w2, w3

Ta cần ba đạo hàm riêng:

∂L/∂w1
∂L/∂w2
∂L/∂w3

Gom chúng lại, ta có gradient:

∇L = [∂L/∂w1, ∂L/∂w2, ∂L/∂w3]

Gradient là vector chỉ hướng tăng nhanh nhất của loss tại điểm hiện tại.

Muốn giảm loss, ta đi theo hướng ngược gradient:

W_new = W_old - η∇L

Trong đó η là learning rate.

## Không gian tham số khổng lồ

Với ba tham số, ta còn có thể tưởng tượng một không gian ba chiều.

Nhưng model có thể có hàng tỷ tham số.

Không ai có thể vẽ không gian đó.

Tuy nhiên toán học không cần trực giác hình học của con người.

Gradient vẫn có thể được tính trong không gian hàng tỷ chiều.

Mỗi phần tử gradient tương ứng với một tham số.

Vì vậy một optimizer có thể cập nhật cả model bằng cùng một nguyên tắc.

## Learning rate: bước chân lớn hay nhỏ

Gradient cho biết hướng.

Learning rate quyết định bước dài bao nhiêu.

Nếu learning rate quá lớn, model có thể nhảy qua vùng tốt và dao động.

Nếu quá nhỏ, model tiến rất chậm.

Ta có thể hình dung:

gradient = hướng xuống dốc

learning rate = độ dài bước chân

Optimization là nghệ thuật kết hợp hai yếu tố này với nhiều kỹ thuật khác.

## Gradient là cục bộ

Một điểm rất quan trọng: gradient chỉ nói về vùng rất gần vị trí hiện tại.

Nó không cung cấp bản đồ toàn bộ loss landscape.

Model vì thế học bằng một chuỗi bước:

1. Tính dự đoán.
2. Tính loss.
3. Tính gradient tại vị trí hiện tại.
4. Cập nhật tham số.
5. Lặp lại.

Hàng triệu bước cục bộ có thể dẫn đến một model tốt.

## Loss landscape

Nếu có hai tham số, ta có thể tưởng tượng loss như địa hình:

- đỉnh núi: loss cao
- thung lũng: loss thấp
- vùng bằng: gradient nhỏ
- sườn dốc: gradient lớn

Với neural network thật, landscape nằm trong không gian cực nhiều chiều và phức tạp hơn rất nhiều.

Nhưng hình ảnh "đi xuống địa hình loss" vẫn là trực giác tốt.

## Mini-batch gradient

Tính gradient trên toàn bộ dataset mỗi bước có thể cực kỳ đắt.

Thay vào đó, deep learning thường dùng mini-batch.

Mỗi batch cung cấp một ước lượng của gradient.

Vì mỗi batch khác nhau, hướng đi có một chút nhiễu.

Đây không nhất thiết là điều xấu.

Nhiễu có thể giúp optimization không bị mắc kẹt quá dễ trong một số vùng của landscape.

Stochastic Gradient Descent và các biến thể phát triển từ ý tưởng này.

## Gradient cũng là tensor

Ở bài Tensor, chúng ta đã thấy weight của model là tensor.

Gradient có cùng cấu trúc tương ứng.

Nếu weight có shape:

4096 × 4096

gradient của loss theo weight đó cũng có shape:

4096 × 4096

Mỗi phần tử nói:

> Nếu thay đổi weight ở vị trí này một chút, loss sẽ thay đổi ra sao?

Framework lưu những gradient này để optimizer dùng.

## Chain rule là chìa khóa

Một neural network là chuỗi nhiều hàm.

Ví dụ:

x → layer 1 → layer 2 → layer 3 → loss

Ta muốn biết loss phụ thuộc vào weight ở layer đầu như thế nào.

Vấn đề là weight đó không tác động trực tiếp lên loss.

Nó tác động lên layer 1, rồi layer 1 tác động lên layer 2, tiếp tục cho đến loss.

Đây là lúc chain rule xuất hiện.

Nếu:

y = f(u)

và:

u = g(x)

thì:

dy/dx = dy/du × du/dx

Chain rule cho phép ta truyền ảnh hưởng ngược qua chuỗi phép toán.

Đó chính là cơ sở toán học của backpropagation.

## Gradient không nói model "nên biết gì"

Gradient không có khái niệm mèo, toán học hay ngữ pháp.

Nó chỉ tối ưu objective.

Nếu objective được thiết kế kém, model có thể học điều không mong muốn.

Nếu dữ liệu có bias, gradient có thể tối ưu theo bias đó.

Gradient là cơ chế học, không phải tiêu chuẩn chân lý.

Điều model học phụ thuộc vào loss, dữ liệu và kiến trúc.

## Optimizer phát triển từ gradient

Gradient descent thuần túy rất quan trọng về mặt ý tưởng, nhưng trong thực tế thường có những biến thể.

Momentum dùng thông tin từ các bước trước để làm hướng đi ổn định hơn.

Adaptive methods điều chỉnh effective learning rate khác nhau cho từng tham số.

Adam kết hợp nhiều ý tưởng như momentum và adaptive scaling.

Dù cách cập nhật phức tạp hơn, gradient vẫn là tín hiệu cốt lõi.

## Gradient là câu trả lời cho một câu hỏi đơn giản

Với hàng tỷ tham số, AI cần trả lời hàng tỷ câu hỏi nhỏ:

> Nếu tôi thay đổi con số này một chút, loss sẽ thay đổi theo hướng nào?

Gradient trả lời tất cả những câu hỏi đó cùng lúc.

Một bước training sau đó biến:

W

thành:

W - update

và model tiến thêm một bước.

## Từ gradient đến backpropagation

Ta đã biết cần gradient.

Nhưng còn một vấn đề lớn:

> Làm sao tính gradient cho hàng triệu hoặc hàng tỷ tham số mà không làm riêng từng tham số một cách cực kỳ chậm?

Câu trả lời là backpropagation.

Backprop không phải một "bí thuật AI".

Nó là một thuật toán cực kỳ hiệu quả để áp dụng chain rule ngược qua computation graph.

**Bài trước:** [Tensor: cấu trúc dữ liệu cốt lõi của AI](/blog/tensor-cau-truc-du-lieu-cot-loi-cua-ai/)

**Bài tiếp theo:** [Backpropagation: neural network thực sự học như thế nào?](/blog/backpropagation-neural-network-thuc-su-hoc-nhu-the-nao/)
