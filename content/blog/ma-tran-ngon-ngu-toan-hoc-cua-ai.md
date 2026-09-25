---
title: "Ma trận: ngôn ngữ toán học phía sau AI, neural network và thế giới số"
publish_date: 2026-09-25
author: "BDX0"
description: "Từ phép biến đổi hình học đến neural network, embedding, attention và Transformer: vì sao ma trận trở thành một trong những ngôn ngữ nền tảng của AI hiện đại."
tags: ["Mathematics", "AI", "Neural Network", "Deep Learning", "Transformer"]
---

# Ma trận: ngôn ngữ toán học phía sau AI, neural network và thế giới số

Khi học ma trận ở trường, chúng ta thường gặp những bảng số như:

```text
A = [ 1  2 ]
    [ 3  4 ]
```

rồi học cộng ma trận, nhân ma trận, tính định thức hay tìm ma trận nghịch đảo.

Nhìn theo cách đó, ma trận có vẻ chỉ là một phần khá khô khan của toán học.

Nhưng trong khoa học máy tính hiện đại, ma trận nằm ở một vị trí hoàn toàn khác.

Ma trận xuất hiện trong:

- đồ họa 3D,
- xử lý ảnh,
- xử lý âm thanh,
- machine learning,
- neural network,
- computer vision,
- embeddings,
- Transformer,
- và những mô hình ngôn ngữ lớn như LLM.

Một cách nhìn thú vị hơn là:

> **Ma trận là một cách để biểu diễn và biến đổi thông tin.**

## Từ một con số đến một vector

Một con số chỉ có thể biểu diễn một đại lượng.

Ví dụ `30` có thể là nhiệt độ.

Nhưng nếu muốn mô tả một đối tượng phức tạp hơn, chúng ta cần nhiều con số.

Một người chẳng hạn có thể được mô tả bằng vector:

```text
x = [30, 165, 55]
```

với ba giá trị lần lượt là tuổi, chiều cao và cân nặng.

Trong machine learning, một đối tượng thường được biến thành một vector gồm rất nhiều đặc trưng.

Ví dụ một khách hàng:

```text
x = [
  age,
  income,
  purchase_frequency,
  time_on_site,
  click_rate
]
```

Một hình ảnh cũng có thể trở thành vector.

Một câu văn cũng có thể trở thành vector.

Một người dùng cũng có thể trở thành vector.

Một sản phẩm cũng có thể trở thành vector.

Khi có rất nhiều vector, chúng ta đặt chúng cạnh nhau.

Và lúc đó ta có một **ma trận**.

## Dataset thực chất thường là một ma trận

Giả sử chúng ta có dữ liệu của 10.000 khách hàng.

Mỗi khách hàng có 100 đặc trưng.

Ta có thể biểu diễn toàn bộ dataset bằng:

```text
X ∈ R^(10000 × 100)
```

Có nghĩa là ma trận `X` có 10.000 hàng và 100 cột.

Mỗi hàng là một người.

Mỗi cột là một đặc trưng.

Dưới góc nhìn này:

> Một dataset khổng lồ có thể chỉ đơn giản là một ma trận rất lớn.

## Neural network bắt đầu bằng phép nhân ma trận

Một neuron nhân tạo thường được viết:

```text
y = f(wx + b)
```

Trong đó `x` là đầu vào, `w` là trọng số, `b` là bias và `f` là activation function.

Nhưng neural network không có một neuron.

Nó có hàng trăm, hàng nghìn, thậm chí hàng tỷ đơn vị tính toán.

Thay vì tính từng neuron riêng biệt, ta gom toàn bộ trọng số thành một ma trận `W`:

```text
y = f(Wx + b)
```

Đây là một trong những phương trình quan trọng nhất trong deep learning.

## Ma trận W thực sự đang làm gì?

Giả sử đầu vào có ba thành phần:

```text
x = [x1, x2, x3]
```

và layer có hai neuron.

Ta có:

```text
W = [ w11  w12  w13 ]
    [ w21  w22  w23 ]
```

Khi tính `Wx`, ta nhận được:

```text
[
  w11*x1 + w12*x2 + w13*x3,
  w21*x1 + w22*x2 + w23*x3
]
```

Neuron thứ nhất nhìn dữ liệu theo một cách.

Neuron thứ hai nhìn cùng dữ liệu theo một cách khác.

Có thể hiểu mỗi hàng của ma trận `W` là một **bộ lọc học được**.

Trong quá trình training, neural network liên tục điều chỉnh các giá trị trong `W` để tìm ra phép biến đổi hữu ích hơn.

## Neural network là một chuỗi các phép biến đổi

Một mạng nhiều lớp có thể viết:

```text
h1 = f(W1*x + b1)
h2 = f(W2*h1 + b2)
h3 = f(W3*h2 + b3)
y  = W4*h3 + b4
```

Nếu tạm bỏ qua activation function, ta sẽ thấy:

```text
x → W1 → W2 → W3 → W4 → y
```

Dữ liệu liên tục được đưa qua các **phép biến đổi ma trận**.

Một neural network có thể được nhìn như một hệ thống liên tục biến đổi không gian biểu diễn của dữ liệu.

## Một ví dụ thú vị: nhận diện mèo

Giả sử một mô hình nhận một bức ảnh có kích thước:

```text
1024 × 1024 × 3
```

pixel RGB.

Đối với máy tính, nó chỉ là một tập hợp những con số.

Ở những layer đầu, neural network có thể học các đặc trưng như cạnh, đường cong và texture.

Ở layer sâu hơn, các biểu diễn có thể tương ứng với những cấu trúc phức tạp hơn như tai, mắt, lông hay khuôn mặt.

Cuối cùng mô hình tạo ra một dự đoán, chẳng hạn:

```text
P(cat) = 0.97
```

Điều thú vị là những biểu diễn trung gian này vẫn tồn tại dưới dạng **tensor và ma trận số**.

Máy không thực sự nhìn thấy “tai mèo”.

Nó làm việc với những pattern số học.

## AI biến mọi thứ thành vector

Đây là một ý tưởng cực kỳ quan trọng của AI hiện đại:

> Những thứ rất khác nhau trong thế giới thật có thể được ánh xạ vào một không gian vector.

Một từ như `king` có thể trở thành:

```text
[0.23, -0.41, 0.72, ...]
```

Một hình ảnh cũng có thể trở thành vector.

Một bài hát có thể trở thành vector.

Một người dùng có thể trở thành vector.

Một video có thể trở thành vector.

Những vector như vậy thường được gọi là **embedding**.

## Embedding biến ý nghĩa thành hình học

Giả sử `v_cat` là embedding của “cat”, `v_dog` là embedding của “dog”.

Hai vector này có thể nằm tương đối gần nhau trong không gian embedding, trong khi `v_airplane` nằm xa hơn.

Như vậy một khái niệm trừu tượng như mức độ giống nhau về ý nghĩa có thể được biểu diễn bằng một khái niệm hình học: **khoảng cách hoặc góc giữa các vector**.

Cosine similarity thường được dùng:

```text
cos(θ) = (A · B) / (||A|| ||B||)
```

Nếu hai vector gần cùng hướng:

```text
cos(θ) ≈ 1
```

chúng có thể có ý nghĩa tương tự.

AI đã biến **ngữ nghĩa thành hình học**.

## Khi có hàng triệu embedding, chúng ta lại có ma trận

Giả sử vocabulary của một language model có 100.000 token.

Mỗi token có embedding 4.096 chiều.

Embedding matrix sẽ có kích thước:

```text
100000 × 4096
```

tức hơn 409 triệu giá trị.

Chỉ riêng việc biểu diễn token đã có thể là một ma trận khổng lồ.

## Transformer còn phụ thuộc vào ma trận sâu hơn nữa

Một trong những thành phần cốt lõi của Transformer là **self-attention**.

Mỗi token được biến thành ba biểu diễn:

- Query `Q`
- Key `K`
- Value `V`

Chúng được tạo thông qua:

```text
Q = XW_Q
K = XW_K
V = XW_V
```

Trong đó `W_Q`, `W_K`, `W_V` đều là các ma trận được học trong quá trình training.

## Attention về bản chất cũng dùng phép nhân ma trận

Công thức nổi tiếng của scaled dot-product attention là:

```text
Attention(Q, K, V)
= softmax(QK^T / sqrt(d_k)) V
```

Phần trung tâm của nó là:

```text
QK^T
```

một phép nhân ma trận.

Kết quả tạo thành ma trận attention score, mô tả mức độ liên hệ giữa các token.

Ví dụ trong câu:

> Con mèo nằm trên ghế vì **nó** mệt.

Khi xử lý từ “nó”, attention có thể tạo mối liên hệ mạnh với “con mèo” hơn với “ghế”.

Mối quan hệ này được biểu diễn bằng những con số trong một **attention matrix**.

## LLM thực hiện một lượng khổng lồ phép nhân ma trận

Một language model hiện đại có thể có hàng tỷ tham số.

Phần lớn các tham số đó nằm trong các tensor trọng số, và rất nhiều phép toán cốt lõi có dạng:

```text
XW
QK^T
AV
W2 * activation(W1 * X)
```

lặp đi lặp lại qua nhiều layer.

Có thể nói theo cách đơn giản nhưng khá sát thực tế:

> LLM là một cỗ máy khổng lồ thực hiện các phép toán tensor và nhân ma trận cực kỳ nhanh.

## GPU tồn tại một phần vì bài toán này

CPU rất linh hoạt.

Nhưng GPU có rất nhiều đơn vị tính toán có thể thực hiện các phép tính song song.

Một phép nhân ma trận:

```text
C = AB
```

bao gồm rất nhiều phép nhân và cộng nhỏ có thể thực hiện đồng thời.

Điều đó cực kỳ phù hợp với GPU.

Những phần cứng chuyên dụng hơn như TPU và AI accelerator cũng được tối ưu mạnh cho các phép toán tensor.

Vì thế cuộc cách mạng AI không chỉ là chuyện thuật toán.

Nó còn gắn chặt với khả năng:

> nhân những ma trận khổng lồ nhanh hơn bao giờ hết.

## Training là học ra những ma trận tốt hơn

Khi một neural network được khởi tạo, các ma trận trọng số ban đầu thường gần như ngẫu nhiên.

Mô hình chưa biết gì.

Sau đó dữ liệu đi qua mạng.

Mô hình đưa ra dự đoán.

Ta tính sai số `Loss`.

Backpropagation tính gradient của loss theo trọng số:

```text
∂Loss / ∂W
```

rồi optimizer cập nhật:

```text
W_new = W_old - η * (∂Loss / ∂W)
```

Quá trình này được lặp lại rất nhiều lần.

Cuối cùng, những ma trận ban đầu gần như ngẫu nhiên trở thành những ma trận chứa các pattern mà mô hình đã học được từ dữ liệu.

## Vậy “kiến thức” của AI nằm ở đâu?

Một mô hình ngôn ngữ không có một thư mục như:

```text
knowledge/
├── history.txt
├── vietnam.txt
├── mathematics.txt
└── physics.txt
```

Kiến thức của nó được phân tán trong những tham số của neural network.

Và rất nhiều tham số đó nằm trong các ma trận và tensor trọng số.

Không thể lấy một ô `W[142, 783]` rồi nói:

> đây là nơi mô hình lưu kiến thức về Hà Nội.

Kiến thức được phân bố trên rất nhiều tham số và nhiều layer.

Đây là một dạng **distributed representation**.

## Ma trận không chỉ lưu dữ liệu

Điều quan trọng hơn là ma trận không chỉ đóng vai trò như bảng lưu số.

Trong AI, chúng còn đại diện cho:

- phép biến đổi,
- quan hệ,
- không gian biểu diễn,
- attention,
- tham số học được.

Ví dụ:

```text
XW
```

có thể biến dữ liệu từ không gian 768 chiều sang không gian 3.072 chiều.

Điều này không chỉ thay đổi kích thước.

Nó tạo ra một **representation mới** của dữ liệu.

## Một connection thú vị với đồ họa 3D

Trong đồ họa 3D:

```text
v' = Mv
```

ma trận biến đổi vị trí của một điểm.

Trong neural network:

```text
h = Wx
```

ma trận biến đổi representation của dữ liệu.

Hai lĩnh vực tưởng rất khác nhau lại sử dụng cùng một cấu trúc toán học.

Trong graphics:

```text
geometry → geometry mới
```

Trong AI:

```text
representation → representation mới
```

Ở cả hai trường hợp:

> Ma trận mô tả một phép biến đổi từ một không gian sang một không gian khác.

## Và đây mới là ý nghĩa sâu hơn của ma trận

Ma trận không chỉ là bảng số.

Nó là một **operator**.

Nếu vector mô tả trạng thái hiện tại thì ma trận có thể mô tả quy luật biến đổi trạng thái đó:

```text
x --A--> y

y = Ax
```

Trong graphics:

```text
position → Matrix → new position
```

Trong machine learning:

```text
features → Weights → representation
```

Trong Transformer:

```text
tokens → Attention → contextual representation
```

Trong recommendation system:

```text
user → Model → preferences
```

Trong computer vision:

```text
pixels → Neural Network → objects
```

Cùng một ý tưởng toán học xuất hiện ở khắp nơi.

## Từ thế giới vật lý đến không gian vector

Máy tính không trực tiếp làm việc với hình ảnh, âm thanh, từ ngữ, con người, sản phẩm hay ý nghĩa.

Nó biến chúng thành:

```text
numbers
→ vectors
→ matrices/tensors
→ transformations
→ representations
→ predictions
```

Cuối cùng chúng ta lại diễn giải kết quả thành văn bản, hình ảnh, âm thanh, dự đoán hoặc hành động.

Có thể mô tả một phần rất lớn của AI hiện đại bằng chuỗi:

```text
Reality
→ Numbers
→ Vectors
→ Matrices
→ Transformations
→ Representations
→ Prediction
```

Điều kỳ lạ là từ những phép toán tưởng rất cơ bản và những ma trận chứa hàng tỷ con số, chúng ta bắt đầu tạo ra những hệ thống có khả năng viết, dịch, nhận diện hình ảnh, tạo nhạc, lập trình và trò chuyện.

## Ma trận là một ngôn ngữ của sự biến đổi

Trong đồ họa máy tính, ma trận biến đổi không gian.

Trong machine learning, ma trận biến đổi dữ liệu.

Trong neural network, ma trận biến đổi representation.

Trong Transformer, ma trận giúp xác định mối quan hệ giữa các token.

Trong LLM, hàng tỷ tham số được tổ chức chủ yếu trong các tensor và ma trận khổng lồ.

Vì vậy khi học ma trận, chúng ta không chỉ đang học một kỹ thuật đại số.

Chúng ta đang học một trong những ngôn ngữ toán học cơ bản nhất mà máy tính hiện đại dùng để:

> **biểu diễn thế giới và biến đổi thông tin.**

Và đó là lý do một thứ tưởng như chỉ là một bảng số nhỏ lại xuất hiện ở phía sau từ một con rồng 3D cho đến một mô hình trí tuệ nhân tạo có hàng tỷ tham số.


**Bài tiếp theo:** [Tensor: từ ma trận nhiều chiều đến cấu trúc dữ liệu cốt lõi của AI](/blog/tensor-cau-truc-du-lieu-cot-loi-cua-ai/)
