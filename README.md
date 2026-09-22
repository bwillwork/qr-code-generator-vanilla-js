# 📱 Vanilla JS QR Code Generator

## Live Demo
To see the live version of this project, please visit: https://qr-code-generator-vanilla-js.bwillwork.workers.dev

## Local Installation
If you wish to run the project locally run the following script:
```bash
# Clone the repo
git clone https://github.com/bwillwork/qr-code-generator-vanilla-js.git
# Go to the project directory
cd qr-code-generator-vanilla-js
# Install dependencies and run the start script
npm install && npm run start
```

## Description

This small project was an experiment that became a useful tool.  Using only vanilla JavaScript, it is a self-contained web tool which allows a user to generate QRCodes of various types.
- **Links**: Here you can generate a QRCode from a URL.
- **Text**: This feature allows you to generate a QRCode from any free form.
- **Email**: In this feature, you can create a QRCode to send an email.  
- **Text Message**: Similar to the email feature, this creates a QRCode to send a text message.  
- **Wifi**: Last but not least, this tab allows you to create a QRCode which represents a Wifi network.  When scanned, the user will get all the needed info to log onto the Wifi network.

## Some Features To Note
This tool behaves like a small single page app, and the page has a number of small features to make the tool easier to work with.
- **Caching**: The page has local caching for each tab.  This allows a user to switch between tabs without losing their work in one tab, so they can work on multiple QRCodes simultaneously.
- **Download**: QRCodes can be downloaded as png image files.
- **Form Validation**: For phone numbers, links, and emails there is form validation to help prevent any typos.  Also, each feature requires all fields to be populated before a QRCode is generated.

## Some Dev Notes
Although all the code written by me for the project is vanilla JavaScript, there are a few tools I used to make the project. The main third party technologies I used are as follows:
- **Webpack (and plugins)**: https://webpack.js.org/  
- **Bootstrap**: https://getbootstrap.com/
- **QRCode**: https://github.com/soldair/node-qrcode

For more information about all the dependencies, take a look at the `package.json` file for the project.

