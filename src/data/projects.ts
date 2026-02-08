export interface Project {
  id: string;
  title: string;
  city: string;
  type: string;
  image: string;
  images: string[];
  task: string;
  delivered: string[];
  timeline: string;
}

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Ресторан «Вкусные истории»',
    city: 'Москва',
    type: 'Ресторан',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&h=600&fit=crop',
    ],
    task: 'Полностью укомплектовать заведение на 80 посадочных мест в классическом стиле с элементами современного дизайна.',
    delivered: ['Диваны Честер — 8 шт.', 'Стулья Венские — 48 шт.', 'Столы круглые — 12 шт.', 'Кресла для лобби — 4 шт.'],
    timeline: '14 дней',
  },
  {
    id: 'project-2',
    title: 'Кофейня «Morning Brew»',
    city: 'Санкт-Петербург',
    type: 'Кафе',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=600&fit=crop',
    ],
    task: 'Создать уютную атмосферу скандинавского кафе с удобной мебелью для работы и отдыха.',
    delivered: ['Диваны Скандик — 4 шт.', 'Кресла Модерн — 6 шт.', 'Барные стулья — 8 шт.', 'Столы разные — 10 шт.'],
    timeline: '10 дней',
  },
  {
    id: 'project-3',
    title: 'Отель «Гранд Плаза»',
    city: 'Сочи',
    type: 'Отель',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=600&fit=crop',
    ],
    task: 'Меблировка лобби, ресторана и террасы 5-звёздочного отеля.',
    delivered: ['Диваны Премиум — 6 шт.', 'Кресла Клаб — 12 шт.', 'Столы обеденные — 20 шт.', 'Стулья мягкие — 60 шт.'],
    timeline: '21 день',
  },
  {
    id: 'project-4',
    title: 'Бар «Loft District»',
    city: 'Казань',
    type: 'Бар',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&h=600&fit=crop',
    ],
    task: 'Оформить индустриальное пространство мебелью в стиле лофт.',
    delivered: ['Диваны Лофт — 5 шт.', 'Барные стулья — 16 шт.', 'Высокие столы — 6 шт.', 'Подстолья металл — 10 шт.'],
    timeline: '7 дней',
  },
  {
    id: 'project-5',
    title: 'Столовая «Корпорация»',
    city: 'Екатеринбург',
    type: 'Столовая',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop',
    ],
    task: 'Оснащение корпоративной столовой на 200 мест.',
    delivered: ['Стулья штабелируемые — 200 шт.', 'Столы 6-местные — 35 шт.', 'Комплекты для кофе-зоны — 3 шт.'],
    timeline: '10 дней',
  },
  {
    id: 'project-6',
    title: 'Веранда ресторана «Терраса»',
    city: 'Краснодар',
    type: 'Ресторан',
    image: 'https://images.unsplash.com/photo-1560624052-449f5ddf0c31?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1560624052-449f5ddf0c31?w=800&h=600&fit=crop',
    ],
    task: 'Обустройство летней веранды с атмосферой средиземноморья.',
    delivered: ['Диваны уличные — 6 шт.', 'Кресла — 8 шт.', 'Столы с подстольями — 12 комплектов'],
    timeline: '12 дней',
  },
];

export const getProjectById = (id: string) => projects.find(p => p.id === id);
