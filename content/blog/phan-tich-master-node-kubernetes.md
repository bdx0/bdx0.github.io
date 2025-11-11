---
title: Phân tích chuyên sâu về Master Node trong Kubernetes
description: Khám phá các thành phần cốt lõi và vai trò của Master Node trong việc quản lý và điều phối cụm Kubernetes.
publish_date: 2025-11-12
tags:
- Kubernetes
- Master Node
- Control Plane
---

# Phân tích chuyên sâu về Master Node trong Kubernetes

Trong kiến trúc của Kubernetes, Master Node (còn được gọi là Control Plane) đóng vai trò trung tâm, là bộ não điều khiển toàn bộ cụm. Nó chịu trách nhiệm duy trì trạng thái mong muốn của cụm, quản lý các Worker Node và điều phối các tài nguyên. Hiểu rõ các thành phần của Master Node là rất quan trọng để vận hành và khắc phục sự cố Kubernetes hiệu quả.

## Các thành phần cốt lõi của Master Node

Master Node bao gồm một tập hợp các tiến trình quan trọng, mỗi tiến trình có một vai trò cụ thể:

### 1. Kube-apiserver

*   **Vai trò:** Là giao diện chính để tương tác với cụm Kubernetes. Tất cả các yêu cầu (từ người dùng, công cụ CLI như `kubectl`, hoặc các thành phần khác của cụm) để thay đổi hoặc truy vấn trạng thái của cụm đều phải thông qua kube-apiserver.
*   **Chức năng:**
    *   Cung cấp API RESTful cho các hoạt động CRUD (Create, Read, Update, Delete) trên các đối tượng Kubernetes (Pods, Services, Deployments, v.v.).
    *   Xác thực và ủy quyền các yêu cầu.
    *   Xác thực dữ liệu đầu vào.
    *   Là điểm giao tiếp duy nhất cho tất cả các thành phần trong cụm.

### 2. etcd

*   **Vai trò:** Là kho lưu trữ key-value phân tán, nhất quán và có tính sẵn sàng cao cho tất cả dữ liệu cấu hình của cụm Kubernetes.
*   **Chức năng:**
    *   Lưu trữ trạng thái hiện tại của cụm, bao gồm cấu hình của Pods, Services, Deployments, Secrets, ConfigMaps, v.v.
    *   Đảm bảo tính nhất quán và độ tin cậy của dữ liệu thông qua giao thức đồng thuận Raft.
    *   Là nguồn sự thật duy nhất cho toàn bộ cụm Kubernetes.

### 3. Kube-scheduler

*   **Vai trò:** Chịu trách nhiệm gán các Pod mới được tạo vào các Worker Node phù hợp trong cụm.
*   **Chức năng:**
    *   Giám sát các Pod chưa được gán Node.
    *   Lọc ra các Node không đáp ứng yêu cầu của Pod (ví dụ: không đủ tài nguyên CPU/RAM, không có nhãn phù hợp).
    *   Chấm điểm các Node còn lại dựa trên các yếu tố như mức độ sử dụng tài nguyên, affinity/anti-affinity rules, và các ràng buộc khác.
    *   Chọn Node có điểm cao nhất để gán Pod vào.

### 4. Kube-controller-manager

*   **Vai trò:** Chạy các bộ điều khiển (controllers) khác nhau để quản lý trạng thái của cụm, đảm bảo rằng trạng thái thực tế của cụm khớp với trạng thái mong muốn.
*   **Chức năng:**
    *   **Node Controller:** Giám sát trạng thái của các Node, xử lý khi Node không khả dụng.
    *   **Replication Controller:** Đảm bảo số lượng bản sao (replicas) của Pods luôn đúng như mong muốn.
    *   **Endpoints Controller:** Kết nối Services với Pods.
    *   **Service Account & Token Controllers:** Tạo tài khoản dịch vụ và API access tokens cho các namespace mới.
    *   Và nhiều controllers khác, mỗi controller chịu trách nhiệm cho một loại tài nguyên cụ thể.

## Tương tác giữa các thành phần

Các thành phần của Master Node hoạt động cùng nhau một cách chặt chẽ:

1.  Khi một người dùng hoặc một tiến trình tạo một đối tượng Kubernetes (ví dụ: một Deployment), yêu cầu sẽ được gửi đến **kube-apiserver**.
2.  **Kube-apiserver** xác thực yêu cầu, kiểm tra quyền hạn và lưu trữ đối tượng vào **etcd**.
3.  **Kube-scheduler** liên tục giám sát **kube-apiserver** để tìm các Pod mới chưa được gán Node. Khi tìm thấy, nó sẽ chọn một Worker Node phù hợp và cập nhật thông tin này qua **kube-apiserver** vào **etcd**.
4.  **Kube-controller-manager** (thông qua các controllers của nó) cũng giám sát **kube-apiserver** để phát hiện các thay đổi trạng thái và thực hiện các hành động cần thiết để duy trì trạng thái mong muốn của cụm. Ví dụ, nếu một Node bị lỗi, Node Controller sẽ phát hiện và đánh dấu Node đó là không khỏe mạnh.

## Tính sẵn sàng cao (High Availability) của Master Node

Trong môi trường sản xuất, việc chỉ có một Master Node là một điểm lỗi duy nhất (Single Point of Failure - SPOF). Để đảm bảo tính sẵn sàng cao, các cụm Kubernetes thường được triển khai với nhiều Master Node. Điều này đòi hỏi:

*   Nhiều bản sao của kube-apiserver, kube-scheduler và kube-controller-manager.
*   Một cụm etcd phân tán với số lượng thành viên lẻ (ví dụ: 3 hoặc 5) để duy trì đồng thuận.
*   Một cơ chế cân bằng tải (Load Balancer) để phân phối lưu lượng truy cập đến các kube-apiserver.

## Kết luận

Master Node là trái tim của một cụm Kubernetes, nơi mọi quyết định quản lý và điều phối được đưa ra. Các thành phần như kube-apiserver, etcd, kube-scheduler và kube-controller-manager phối hợp nhịp nhàng để đảm bảo cụm hoạt động ổn định, hiệu quả và tự động. Hiểu rõ vai trò và cách thức hoạt động của chúng là chìa khóa để khai thác tối đa sức mạnh của Kubernetes.
