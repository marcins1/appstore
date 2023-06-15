# Appstore
Jest to projekt sklepu internetowego z aplikacjami stworzony w ramach przedmiotu Bazy Danych na uczelni Akademia Górniczo-Hutnicza im. Stanisława Staszica w Krakowie.
Technologie które wykorzystaliśmy podczas tworzenia projektu:
- Angular
- Express
- MongoDB

## Funkcjonalności
Funkcjonalności aplikacji:
- Aplikacje - operacje CRUD
- Użytkownicy - operacje CRUD, autoryzacja oraz autentykacja
- Koszyk - możliwość kupowania aplikacji przez użytkownika

## Baza danych MongoDB
### Model aplikacji
```sh
mongoose.model(
    "application",
    mongoose.Schema({
        appID: Number,
        name: String,
        price: Number,
        downloadSize: Number,
        description: String,
        photos: [String],
        numberOfDownloads: Number
    },
    { timestamps: true })
);
```
### Model użytkownika
```sh
mongoose.model(
    "user",
    new mongoose.Schema({
        userID: String,
        username: String,
        email: String,
        password: String,
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "role"
            }
        ],
        listOfAps: [
            {
                appID: String,
                appName: String,
                purchaseDate: Date,
                price: Number,
                paymentMethod: String
            }
        ],
        premiumSubscriptions: [
            {
                subscriptionID: String,
                dateFrom: Date,
                dateTo: Date
            }
        ],
        cart: [String]
    })
);
```
### Model roli użytkownika
```sh
mongoose.model(
    "role",
    mongoose.Schema(
        {
            name: String
        }
    )
);
```

## Backend
### Punkty końcowe API
#### Logowanie
- URL: /authentication/login
- Metoda: POST
#### Rejestracja
- URL: /authentication/register
- Metoda: POST
#### Wylogowywanie
- URL: /authentication/logout
- Metoda: POST
#### Dodawanie aplikacji
- URL: /applications
- Metoda: POST
#### Pobieranie wszystkich aplikacji
- URL: /applications
- Metoda: GET
#### Pobieranie jednej aplikacji
- URL: /applications/:id
- Metoda: GET
#### Edycja aplikacji
- URL: /applications/:id
- Metoda: PUT
#### Usuwanie wybranej aplikacji
- URL: /applications/:id
- Metoda: DELETE
#### Usuwanie wszystkich aplikacji
- URL: /applications
- Metoda: DELETE

## Autorzy
- [Marcin Saja](https://github.com/marcins1)
- [Sebastian Soczawa](https://github.com/socz3qqq)
- [Michał Sośnik](https://github.com/msosnik)