# Тестовое задание Vue.js
Необходимо реализовать табличный компонент, с помощью которого пользователь сможет подобрать продукты по различным параметрам.

### Требования

Таблица имеет следующие колонки: Product, Calories, Fat, Carbs, Protein, Iron. 
1) Пользователь может выбирать колонку которую хочет видеть первой в таблице. По этой колонке можно будет отсортировать продукты. 
2) Пользователь может определить количество продуктов в таблице (10, 15, 20)
3) Пользователь может выбирать колонки которые он хочет видеть. По умолчанию все колонки видимы.
4) Пользователь может удалить продукт или продукты из таблицы. Перед удалением нужно попросить пользователя подвердить действие.


В приложении к тестовому заданию есть два файла: 'products.json' и 'request.js'. Перед инициализацией таблицы, необходимо загрузить продукты с помощью метода 'getProducts' и сохранить их в хранилище Vuex. Внимание! Метод 'getProducts' может вернуть ошибку с вероятностью 1/3. В этом случае ошибку необходимо обработать. Компонент таблицы получает входные данные из хранилища.

При удалении продуктов нужно использовать метод 'deleteProducts'. Этот метод также может вернуть ошибку. Продукты из хранилища удаляются только в случае успешного завершения метода 'deleteProducts'.

*****
#### ССЫЛКИ И РЕСУРСЫ!!!

[Макет](https://www.figma.com/file/OTPi7Ys1GDlBZWY4UZNrvv/Table-Component)

[Приложение](https://yadi.sk/d/nfEUoPch-otV-g)

*****
[Рабочее приложение](https://table-ui-1f22e.web.app/)
