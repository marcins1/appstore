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
### Model subskrypcji
```sh
mongoose.model(
    "subscription",
    new mongoose.Schema({
            id: Number,
            rank: String,
            apps_with_discount: [ 
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "discount"
                }
            ],
            free_apps: [{type: Number}],
            price: Number,
            quantity: {type: Number, min: 0}
    })
);
```
### Model zniżki
```sh
mongoose.model(
    "discount",
    new mongoose.Schema({
        app_id: Number,
        discount_value: Number
    })
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
#### Profil użytkownika
- URL: /user
- Metoda: GET
#### Koszyk użytkownika
- URL: /cart
- Metoda: GET
#### Dodawanie aplikacji do koszyka
- URL: /cart/add
- Metoda: POST
#### Usuwanie aplikacji z koszyka
- URL: /cart/remove
- Metoda: POST
#### Kupowanie aplikacji z koszyka
- URL: /cart/buy
- Metoda: POST
#### Pobieranie aplikacji użytkownika
- URL: /myapps
- Metoda: GET
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
- Metoda: DELETEs

## Autorzy
- [Marcin Saja](https://github.com/marcins1)
- [Sebastian Soczawa](https://github.com/socz3qqq)
- [Michał Sośnik](https://github.com/msosnik)