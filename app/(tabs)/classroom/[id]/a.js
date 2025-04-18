const abc = {
  academicYear: '2024-2025',
  class_code: 'CGIPM8',
  createdAt: '2025-03-25T10:32:36.000Z',
  dayOfWeek: 'T2',
  description: 'Lớp đại 12A 2024-2025',
  id: 8,
  joinedStudentCount: 1,
  lessonCount: 1,
  lessons: [
    {
      description: '',
      id: 9,
      learningItems: [Array],
      name: 'bách thối tai 12 lít mủ',
    },
  ],
  name: 'lớp đại 12A',
  public: true,
  slide: {
    createdAt: '2025-03-25T11:32:49.000Z',
    description: null,
    id: 1,
    slideImages: [],
    title: null,
    updatedAt: '2025-03-25T11:32:49.000Z',
  },
  slideId: 1,
  status: 'LHD',
  studentCount: 1,
  studyTime: '7:00 - 9:00',
  updatedAt: '2025-03-26T12:00:46.000Z',
  userStatus: 'JS',
};

const classData = [
  {
    academicYear: '2024-2025',
    class_code: 'CGIPM8',
    dayOfWeek: 'T2',
    description: 'Lớp đại 12A 2024-2025',
    id: 8,
    lessonCount: 1,
    name: 'lớp đại 12A',
    public: true,
    slideId: 1,
    status: 'LHD',
    studentClassStatus: 'JS',
    studentCount: 1,
    studyTime: '7:00 - 9:00',
  },
];

const classDetail = {
  academicYear: '2024-2025',
  class_code: 'AHH9P9',
  createdAt: '2025-03-26T16:12:14.000Z',
  dayOfWeek: 'T3',
  description: '',
  id: 9,
  lessonCount: 2,
  lessons: [
    {
      classId: 9,
      createdAt: '2025-03-26T16:12:58.000Z',
      day: '2025-03-26T00:00:00.000Z',
      description: 'Thầy Đức cực kì đẹp trai',
      id: 20,
      learningItemCount: 3,
      learningItems: [Array],
      name: 'Buổi 1 Giới thiệu',
      updatedAt: '2025-03-26T16:43:00.000Z',
    },
    {
      classId: 9,
      createdAt: '2025-03-26T16:46:51.000Z',
      day: '2025-03-27T00:00:00.000Z',
      description: '',
      id: 21,
      learningItemCount: 2,
      learningItems: [Array],
      name: 'Học toán không dễ',
      updatedAt: '2025-03-26T16:48:24.000Z',
    },
  ],
  name: 'Toán Thầy Đức',
  public: true,
  slideId: null,
  status: 'LHD',
  studentCount: 1,
  studyTime: '7:00 - 9:00',
  updatedAt: '2025-03-26T16:46:52.000Z',
  userStatus: 'JS',
};

const learningItems = [
  {
    createdAt: '2025-03-26T16:43:00.000Z',
    deadline: null,
    id: 19,
    lessonId: 20,
    name: 'Buổi 1 Giới thiệu',
    typeOfLearningItem: 'VID',
    updatedAt: '2025-03-26T16:43:00.000Z',
    url: 'https://www.youtube.com/watch?v=z8rxrOE_QXA',
  },
  {
    createdAt: '2025-03-26T16:41:42.000Z',
    deadline: '2025-03-27T00:00:00.000Z',
    id: 18,
    lessonId: 20,
    name: 'Buổi 1 Giới thiệu',
    typeOfLearningItem: 'BTVN',
    updatedAt: '2025-03-26T16:41:42.000Z',
    url: '11',
  },
  {
    createdAt: '2025-03-26T16:35:49.000Z',
    deadline: null,
    id: 15,
    lessonId: 20,
    name: 'Bài 1: Giới thiệu tổng quan',
    typeOfLearningItem: 'DOC',
    updatedAt: '2025-03-26T16:36:06.000Z',
    url: 'https://firebasestorage.googleapis.com/v0/b/toan-thay-bee-dc180.firebasestorage.app/o/pdfs%2F1743006963965-demo.pdf?alt=media&token=4d1c0ae7-93d5-4b0a-a2fe-fd31feee74e4',
  },
];

const bc = {
  examData: {
    id: 1,
    name: 'Đề thi Toán THPT',
    class: 'l12',
    typeOfExam: 'GK1',
    year: '2023-2024',
    duration: 90,
  },
  questions: [
    {
      questionData: {
        class: 'Math',
        content: 'What is 2 + 2?',
        solutionUrl: 'https://example.com/solution',
        needImage: true,
        typeOfQuestion: 'TN',
      },
      statements: [
        {
          content: '3',
          isCorrect: false,
          needImage: false,
        },
        {
          content: '4',
          isCorrect: true,
          needImage: true,
        },
        {
          content: '5',
          isCorrect: false,
          needImage: false,
        },
        {
          content: '6',
          isCorrect: false,
          needImage: true,
        },
      ],
        
    },
    {
      questionData: {
        class: 'Math',
        content: 'What is 2 + 2?',
        solutionUrl: 'https://example.com/solution',
        needImage: true,
        typeOfQuestion: 'TN',
      },
      statements: [
        {
          content: '3',
          isCorrect: false,
          needImage: false,
        },
        {
          content: '4',
          isCorrect: true,
          needImage: true,
        },
        {
          content: '5',
          isCorrect: false,
          needImage: false,
        },
        {
          content: '6',
          isCorrect: false,
          needImage: true,
        },
      ],
    },
  ],
};
