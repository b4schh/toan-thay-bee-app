export const EXAM_DATA = [
  {
    id: 1,
    name: 'Đề tham khảo thi THPT số 1 (2025)',
    "class": '12',
    typeOfExam: 'THPT',
    chapter: null,
    year: '2024-2025',
    testDuration: 120,
    description: '',
    passRate: 50,
    "solutionUrl": '',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/toan-thay-bee-dc180.firebasestorage.app/o/images%2F1742232263788-t1-1729240246421660927126.jpg?alt=media&token=25c45f05-ea5e-49f8-965d-5056a69dcde0',
    public: true,
    createdAt: '2025-03-17T17:24:25.000Z',
    updatedAt: '2025-03-21T17:46:17.000Z',
    isDone: false,
    isSave: false,
  },
  {
    id: 2,
    name: 'Đề tham khảo thi THPT số 2 (2025)',
    "class": '12',
    typeOfExam: 'THPT',
    chapter: null,
    year: '2024-2025',
    testDuration: 120,
    description: '',
    passRate: 50,
    "solutionUrl": '',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/toan-thay-bee-dc180.firebasestorage.app/o/images%2F1742232263788-t1-1729240246421660927126.jpg?alt=media&token=25c45f05-ea5e-49f8-965d-5056a69dcde0',
    public: true,
    createdAt: '2025-03-17T17:24:25.000Z',
    updatedAt: '2025-03-21T17:46:17.000Z',
    isDone: false,
    isSave: false,
  },
  {
    id: 3,
    name: 'Đề tham khảo thi THPT số 3 (2025)',
    "class": '12',
    typeOfExam: 'THPT',
    chapter: null,
    year: '2024-2025',
    testDuration: 120,
    description: '',
    passRate: 50,
    "solutionUrl": '',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/toan-thay-bee-dc180.firebasestorage.app/o/images%2F1742232263788-t1-1729240246421660927126.jpg?alt=media&token=25c45f05-ea5e-49f8-965d-5056a69dcde0',
    public: true,
    createdAt: '2025-03-17T17:24:25.000Z',
    updatedAt: '2025-03-21T17:46:17.000Z',
    isDone: false,
    isSave: false,
  },
  {
    id: 4,
    name: 'Đề tham khảo thi THPT số 4 (2025)',
    "class": '12',
    typeOfExam: 'THPT',
    chapter: null,
    year: '2024-2025',
    testDuration: 120,
    description: '',
    passRate: 50,
    "solutionUrl": '',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/toan-thay-bee-dc180.firebasestorage.app/o/images%2F1742232263788-t1-1729240246421660927126.jpg?alt=media&token=25c45f05-ea5e-49f8-965d-5056a69dcde0',
    public: true,
    createdAt: '2025-03-17T17:24:25.000Z',
    updatedAt: '2025-03-21T17:46:17.000Z',
    isDone: false,
    isSave: false,
  },
];

const exam_details = {
  "examData": {
    "id": 1,
    "name": 'Đề tham khảo thi THPT (2025)',
    "class": '12',
    "typeOfExam": 'OTTHPT',
    "chapter": null,
    "year": '2024-2025',
    "testDuration": 120,
    "description": '',
    "passRate": 50,
    "solutionUrl": '',
    "public": true,
  },
  "questions": [
    {
      "questionData": {
        "class": '12',
        "content": 'Nguyên hàm của hàm số \( f(x)=e^{x} \) là:',
        "solutionUrl": 'https://example.com/solution',
        "needImage": false,
        "typeOfQuestion": 'TN',
      },
      "statements": [
        {
          "content": '\( \frac{e^{x+1}}{x+1}+C \).',
          "isCorrect": false,
          "needImage": false,
        },
        {
          "content": '\( x \cdot e^{x-1}+C \).',
          "isCorrect": true,
          "needImage": false,
        },
        {
          "content": '\( \frac{e^{x}}{x}+C \).',
          "isCorrect": false,
          "needImage": false,
        },
        {
          "content": '\( e^{x}+C \).',
          "isCorrect": false,
          "needImage": false,
        },
      ],
    },
    {
      "questionData": {
        "class": '12',
        "content": 'Cho hàm số \( y=f(x) \) liên tục, nhận giá trị dương trên đoạn \( [a ; b] \). Xét hình phẳng \( (H) \) giới hạn bởi đồ thị hàm số \( y=f(x) \), trục hoành và hai đường thẳng \( x=a, x=b \). Khối tròn xoay được tạo thành khi quay hình phẳng \( (H) \) quanh trục \( O x \) có thể tích là:',
        "solutionUrl": 'https://example.com/solution',
        "needImage": false,
        "typeOfQuestion": 'TN',
      },
      "statements": [
        {
          "content": '\( V=\pi^{2} \int_{a}^{b} f(x) d x \).',
          "isCorrect": false,
          "needImage": false,
        },
        {
          "content": '\( V=\pi^{2} \int_{a}^{b}[f(x)]^{2} d x \).',
          "isCorrect": false,
          "needImage": false,
        },
        {
          "content": '\( V=\pi \int_{a}^{b}[f(x)]^{2} d x \).',
          "isCorrect": true,
          "needImage": false,
        },
        {
          "content": '\( V=\pi \int_{a}^{b}|f(x)| d x \).',
          "isCorrect": false,
          "needImage": false,
        },
      ],
    },
    {
      "questionData": {
        "class": '12',
        "content": 'Hai mẫu số liệu ghép nhóm \( M_{1}, M_{2} \) có bảng tần số ghép nhóm như sau: Gọi \( s_{1}, s_{2} \) lần lượt là độ lệch chuẩn của mẫu số liệu ghép nhóm \( M_{1}, M_{2} \). Phát biểu nảo sau đây là đúng?',
        "solutionUrl": 'https://example.com/solution',
        "needImage": true,
        "typeOfQuestion": 'TN',
      },
      "statements": [
        {
          "content": '\( s_{1}=s_{2} \).',
          "isCorrect": true,
          "needImage": false,
        },
        {
          "content": '\( s_{1}=2 s_{2} \).',
          "isCorrect": false,
          "needImage": false,
        },
        {
          "content": '\( 2 s_{1}=s_{2} \).',
          "isCorrect": false,
          "needImage": false,
        },
        {
          "content": '\( 4 s_{1}=s_{2} \).',
          "isCorrect": false,
          "needImage": false,
        },
      ],
    },
    {
      "questionData": {
        "class": '12',
        "content": 'Cho hàm số \( f(x)=2 \cos x+x \).',
        "solutionUrl": 'https://example.com/solution',
        "needImage": false,
        "typeOfQuestion": 'DS',
      },
      "statements": [
        {
          "content": '\( f(0)=2 ; f\left(\frac{\pi}{2}\right)=\frac{\pi}{2} \).',
          "isCorrect": true,
          "needImage": false,
        },
        {
          "content": 'Đạo hàm của hàm số đã cho là \( f^{\prime}(x)=2 \sin x+1 \).',
          "isCorrect": false,
          "needImage": false,
        },
        {
          "content": 'Nghiệm của phương trình \( f^{\prime}(x)=0 \) trên đoạn \( \left[0 ; \frac{\pi}{2}\right] \) là \( \frac{\pi}{6} \).',
          "isCorrect": true,
          "needImage": false,
        },
        {
          "content": 'Giá trị lớn nhất của \( f(x) \) trên đoạn \( \left[0 ; \frac{\pi}{2}\right] \) là \( \sqrt{3}+\frac{\pi}{6} \).',
          "isCorrect": true,
          "needImage": false,
        },
      ],
    },
    {
      "questionData": {
        "class": '12',
        "content": 'Một người điều khiển ô tô đang ở đường dẫn muốn nhập làn vào đường cao tốc. Khi ô tô cách điểm nhập làn 200 m , tốc độ của ô tô là \( 36 \mathrm{~km} / \mathrm{h} \). Hai giây sau đó, ô tô bắt đầu tăng tốc với tốc độ \( v(t)=a t+b(a, b \in \mathbb{R}, a>0) \), trong đó \( t \) là thời gian tính bằng giây kể từ khi bắt đầu tăng tốc. Biết rằng ô tô nhập làn cao tốc sau 12 giây và duy trì sự tăng tốc trong 24 giây kể từ khi bắt đầu tăng tốc.',
        "solutionUrl": 'https://example.com/solution',
        "needImage": false,
        "typeOfQuestion": 'DS',
      },
      "statements": [
        {
          "content": 'Quãng đường ô tô đi được từ khi bắt đầu tăng tốc đến khi nhập làn là 180 m .',
          "isCorrect": true,
          "needImage": false,
        },
        {
          "content": 'Giá trị của \( b \) là 10 .',
          "isCorrect": true,
          "needImage": false,
        },
        {
          "content": 'Quãng đường \( S(t) \) (đơn vị: mét) mà ô tô đi được trong thời gian \( t \) giây ( \( 0 \leq t \leq 24 \) ) kể từ khi tăng tốc dược tính theo công thức \( S(t)=\int_{0}^{24} v(t) d t \).',
          "isCorrect": false,
          "needImage": false,
        },
        {
          "content": 'Sau 24 giây kể từ khi tăng tốc, tốc độ của ô tô không vượt quá tốc độ tối đa cho phép là \( 100 \mathrm{~km} / \mathrm{h} \).',
          "isCorrect": false,
          "needImage": false,
        },
      ],
    },
    {
      "questionData": {
        "class": '12',
        "content": 'Một doanh nghiệp dự định sản xuất không quá 500 sản phẩm. Nếu doanh nghiệp sản xuất \( x \) sản phẩm \( (1 \leq x \leq 500) \) thì doanh thu nhận được khi bán hết số sản phẩm đó là \( F(x)=x^{3}-1999 x^{2}+1001000 x+250000 \) (đồng), trong khi chi phí sản xuất bình quân cho một sản phẩm là \( G(x)=x+1000+\frac{250000}{x} \) (đồng). Doanh nghiệp cần sản xuất bao nhiêu sản phẩm để lợi nhuận thu được là lớn nhất?',
        "solutionUrl": 'https://example.com/solution',
        "needImage": false,
        "typeOfQuestion": 'DS',
        "correctAnswer": '123'
      },
      "statements": [
      ],
    },
    {
      "questionData": {
        "class": '12',
        "content": 'Có hai chiếc hộp, hộp I có 6 quả bóng màu đỏ và 4 quả bóng màu vàng, hộp II có 7 quả bóng mảu đỏ và 3 quả bóng màu vàng, các quả bóng có cùng kích thước và khối lượng. Lấy ngẫu nhiên một quả bóng từ hộp I bỏ vào hộp II. Sau đó, lấy ra ngẫu nhiên một quả bóng từ hộp II. Tính xác suất để quả bóng được lấy ra từ hộp II là quả bóng được chuyển từ hộp I sang, biết rằng quả bóng đó có màu đỏ (làm tròn kết quả đến hàng phần trăm).',
        "solutionUrl": 'https://example.com/solution',
        "needImage": false,
        "typeOfQuestion": 'DS',
        "correctAnswer": '123'
      },
      "statements": [
      ],
    },
    {
      "questionData": {
        "class": '12',
        "content": 'Hệ thống định vị toàn cầu GPS là một hệ thống cho phép xác định vị trí của một vật thể trong không gian. Trong cùng một thời điểm, vị trí của một điểm \( M \) trong không gian sẽ được xác định bởi bốn vệ tỉnh cho trước nhờ các bộ thu phát tín hiệu đặt trên các vệ tinh. Giả sử trong không gian với hệ tọa độ \( O x y z \), có bốn vệ tinh lần lượt đặt tại các điểm \( A(3 ; 1 ; 0), B(3 ; 6 ; 6) \), \( C(4 ; 6 ; 2), D(6 ; 2 ; 14) \); vị trí \( M(a ; b ; c) \) thỏa mãn \( M A=3, M B=6, M C=5, M D=13 \). Khoảng cách từ điểm \( M \) đến điểm O bằng bao nhiêu?',
        "solutionUrl": 'https://example.com/solution',
        "needImage": false,
        "typeOfQuestion": 'DS',
        "correctAnswer": '123'
      },
      "statements": [
      ],
    },
    
  ],
};
