<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url] -->
<!-- [![project_license][license-shield]][license-url] -->
<!-- [![LinkedIn][linkedin-shield]][linkedin-url] -->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Hokus-ev/qr-generator">
    <img src="static/logo_.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">HoKuS QR Generator</h3>

  <p align="center">
    QR Generator.
    Generiert QR-Codes mit Logos und verschiedenen "src"-Kampagnenparametern.
    <!-- <br /> -->
    <!-- <a href="https://github.com/Hokus-ev/qr-generator"><strong>Explore the docs »</strong></a> -->
    <!-- <br /> -->
    <!-- <br /> -->
    <!-- <a href="https://github.com/Hokus-ev/qr-generator">View Demo</a> -->
    <!-- &middot; -->
    <!-- <a href="https://github.com/Hokus-ev/qr-generator/issues/new?labels=bug&template=bug-report---.md">Report Bug</a> -->
    <!-- &middot; -->
    <!-- <a href="https://github.com/Hokus-ev/qr-generator/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a> -->
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation--deployment-per-docker">Installation & Deployment per Docker</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

Praktische QR Generator App für HoKuS.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![Svelte][Svelte.dev]][Svelte-url]
- [![Tailwind][TailwindCSS]][Tailwind-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

Hier erfährst du, wie du das Projekt lokal einrichtest. Folge diesen einfachen Schritten, um eine lokale Kopie zum Laufen zu bringen.

### Prerequisites

Stelle sicher, dass du [Node.js](https://nodejs.org/) und npm installiert hast.

- npm
  ```sh
  npm install npm@latest -g
  ```
- [Docker](https://www.docker.com/get-started/)

### Installation & Deployment per Docker

1. Repository klonen
   ```sh
   git clone https://github.com/Hokus-ev/qr-generator.git
   ```
2. Docker-Image bauen
   ```sh
   docker build -t hokus-tools-app .
   ```
3. Container starten

   ```sh
   docker run -d -p 3000:3000 hokus-tools-app
   ```

   Die App ist danach erreichbar unter http://localhost:3000 (oder IP deines Servers).

4. (Optional) Git-Remote-URL ändern, um versehentliche Pushes ins Original-Repo zu vermeiden:
   ```sh
   git remote set-url origin Hokus-ev/qr-generator
   git remote -v # Kontrolle
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Flo Maier - florian@maierflo.de

Project Link: [https://github.com/Hokus-ev/qr-generator](https://github.com/Hokus-ev/qr-generator)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/Hokus-ev/qr-generator.svg?style=for-the-badge
[contributors-url]: https://github.com/Hokus-ev/qr-generator/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Hokus-ev/qr-generator.svg?style=for-the-badge
[forks-url]: https://github.com/Hokus-ev/qr-generator/network/members
[stars-shield]: https://img.shields.io/github/stars/Hokus-ev/qr-generator.svg?style=for-the-badge
[stars-url]: https://github.com/Hokus-ev/qr-generator/stargazers
[issues-shield]: https://img.shields.io/github/issues/Hokus-ev/qr-generator.svg?style=for-the-badge
[issues-url]: https://github.com/Hokus-ev/qr-generator/issues
[license-shield]: https://img.shields.io/github/license/Hokus-ev/qr-generator.svg?style=for-the-badge
[license-url]: https://github.com/Hokus-ev/qr-generator/blob/master/LICENSE.txt
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[TailwindCSS]: https://img.shields.io/badge/tailwindcss-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
