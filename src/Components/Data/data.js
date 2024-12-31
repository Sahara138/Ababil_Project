

function getRandomDate(start, end) {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString(); // Formats as 'YYYY-MM-DDTHH:mm:ss.sssZ'
  }

export const userRows= [
    { id: 1, userName: 'Jon', email: 'jon@gmail.com', phone: '01978891274', status: true, createdAt: getRandomDate(new Date(2020, 0, 1), new Date()) },
    { id: 2, userName: 'Jane', email: 'jane@gmail.com', phone: '01978891275', status: false, createdAt: getRandomDate(new Date(2020, 0, 1), new Date()) },
    { id: 3, userName: 'Mike', email: 'mike@gmail.com', phone: '01978891276', status: true, createdAt: getRandomDate(new Date(2020, 0, 1), new Date()) },
    { id: 4, userName: 'Sarah', email: 'sarah@gmail.com', phone: '01978891277', status: false, createdAt: getRandomDate(new Date(2020, 0, 1), new Date()) },
    { id: 5, userName: 'Chris', email: 'chris@gmail.com', phone: '01978891278', status: true, createdAt: getRandomDate(new Date(2020, 0, 1), new Date()) },
    { id: 6, userName: 'Emma', email: 'emma@gmail.com', phone: '01978891279', status: true, createdAt: getRandomDate(new Date(2020, 0, 1), new Date()) },
    { id: 7, userName: 'James', email: 'james@gmail.com', phone: '01978891280', status: false, createdAt: getRandomDate(new Date(2020, 0, 1), new Date()) },
    { id: 8, userName: 'Sophia', email: 'sophia@gmail.com', phone: '01978891281', status: true, createdAt: getRandomDate(new Date(2020, 0, 1), new Date()) },
    { id: 9, userName: 'Liam', email: 'liam@gmail.com', phone: '01978891282', status: true, createdAt: getRandomDate(new Date(2020, 0, 1), new Date()) },
    { id: 10, userName: 'Olivia', email: 'olivia@gmail.com', phone: '01978891283', status: false, createdAt: getRandomDate(new Date(2020, 0, 1), new Date()) },
    { id: 11, userName: 'Noah', email: 'noah@gmail.com', phone: '01978891284', status: true, createdAt: getRandomDate(new Date(2020, 0, 1), new Date()) },
    { id: 12, userName: 'Ava', email: 'ava@gmail.com', phone: '01978891285', status: false, createdAt: getRandomDate(new Date(2020, 0, 1), new Date()) },
    { id: 13, userName: 'Mason', email: 'mason@gmail.com', phone: '01978891286', status: true, createdAt: getRandomDate(new Date(2020, 0, 1), new Date()) },
    { id: 14, userName: 'Isabella', email: 'isabella@gmail.com', phone: '01978891287', status: true, createdAt: getRandomDate(new Date(2020, 0, 1), new Date()) },
    { id: 15, userName: 'Lucas', email: 'lucas@gmail.com', phone: '01978891288', status: false, createdAt: getRandomDate(new Date(2020, 0, 1), new Date()) },
    { id: 16, userName: 'Mia', email: 'mia@gmail.com', phone: '01978891289', status: true, createdAt: getRandomDate(new Date(2020, 0, 1), new Date()) },
    { id: 17, userName: 'Elijah', email: 'elijah@gmail.com', phone: '01978891290', status: true, createdAt: getRandomDate(new Date(2020, 0, 1), new Date()) },
    { id: 18, userName: 'Amelia', email: 'amelia@gmail.com', phone: '01978891291', status: false, createdAt: getRandomDate(new Date(2020, 0, 1), new Date()) },
    { id: 19, userName: 'Logan', email: 'logan@gmail.com', phone: '01978891292', status: true, createdAt: getRandomDate(new Date(2020, 0, 1), new Date()) },
    { id: 20, userName: 'Charlotte', email: 'charlotte@gmail.com', phone: '01978891293', status: false, createdAt: getRandomDate(new Date(2020, 0, 1), new Date()) },
  ];