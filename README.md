<h1 align="center">🎵 Tunes - Feel The Sound 🎵</h1>

## 🖥️📱 Deploy

You can access the deployed version of this project at the link below:

Click here: https://tunes-one.vercel.app/search

## 💻 Project

This started as a Front-End module project built during the Web Development Course at Trybe, and was later rewritten as a personal portfolio piece.
The goal of the application is to search for and play music from bands and artists via the iTunes API.

Users can log in with a name, email and profile picture. After logging in, they can search for bands and artists, browse the albums returned for that search, play song previews, favorite tracks, and edit their profile.

## ⏯️ Demo

<div align="center">
    <img alt="presentation gif" src="src/images/Tunes.gif"/>
</div>

*(gif/screenshot above are from the previous version and are due for an update)*

## 🛠️ Tech stack

- [React 19](https://react.dev/) with function components and hooks
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for dev server and build
- [React Router v6](https://reactrouter.com/) for routing, with protected/guest route guards
- React Context (`AuthContext`, `FavoritesContext`) for shared app state
- CSS Modules with a small design-token system (`src/styles/tokens.css`) — no UI framework
- iTunes Search/Lookup API for album and track data
- `localStorage` as a mock backend for the user profile and favorites (no real server)

## Search Screen

![App Screenshot](src/images/Tela-readme.png)

## 👨‍💻 Running the project locally

Clone the repository

```bash
  git clone git@github.com:Mathluiz23/Tunes.git
```

Enter the project directory

```bash
  cd Tunes
```

Install dependencies

```bash
  npm install
```

Start the project (runs at http://localhost:3003)

```bash
  npm run dev
```

Build for production

```bash
  npm run build
```
