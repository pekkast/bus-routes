# Reittiopas

Sovellus kertoo nopeimman ja mahdollisesti muitakin reittejä kahden pisteen välillä, mitkä on kuljettavissa linja-autolla oheisen [datan](./src/mocks/reittiopas.json) mukaisesti.

Vaihtoehtoisesti tulokset voi järjestää vaihtojen määrän suhteen.

Sovellusta voit testata [oheiselta sivulta](https://pekkast.github.io/bus-routes) tai kloonaamalla repon ja suorittamalla luodussa kansiossa komennot
```bash
npm i
npm start
```
## Suositus

Sovellusta on ehkä helpointa käyttää näppiksellä.

Kiva testireitti on esim. A-P/P-A, jossa nopein ja vähiten vaihtoja sisältävä ovat erit.

## Tech

This project was bootstrapped with typescript template of [Create React App](https://github.com/facebook/create-react-app).

The ui components are based on [Material UI](https://material-ui.com/)
