# Lý Dragon GLB Generator

Bộ generator tham số cho thử nghiệm /lab/ly-dragon/.

JSON trong thư mục spec là source of truth. Chỉnh thông số ở đó rồi build lại GLB.

Cách chạy:

python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python generator/build.py --spec spec/ly-dragon.spec.v2.json --out output/rong-thoi-ly-v2.glb

Generator giữ các phần chính thành mesh có tên riêng để về sau có thể chỉnh hoặc animate riêng đầu, sừng, râu, mào, chân, móng và ngọc châu.
