# 📟 Document Browser
```
Elegant and minimalist web layout for managing documents.
Data is mocked asynchronously throughout a RESTful API supported by a JSON server.
```
## 📑 Summary

- [Document Browser](#-document-browser)
  - [Summary](#-summary)
  - [Built With](#--built-with)
    - [About The Technologies Used](#-about-the-technologies-used)
  - [Run The Project Locally](#--run-the-project-locally)
    - [Using The Document Browser](#-using-the-document-browser)
  - [Versioning](#-versioning)
  - [Author](#-author)
  - [Copyright and license](#%EF%B8%8F-copyright-and-license)

## 🔨  Built With
    
| Tecnology | Description |
| ------ | ------ |
| [Node.js v14.15.5](https://nodejs.org/en/) | JavaScript runtime built on Chrome's V8 JavaScript engine. |
| [React.js v17.0.2](https://reactjs.org/) | A JavaScript library for building user interfaces. |
| [React Redux v7.2.6](https://react-redux.js.org/) | Official React bindings for Redux. |
| [Redux Toolkit v1.6.2](https://redux-toolkit.js.org/) | The official, opinionated, batteries-included toolset for efficient Redux development. |
| [Ant Design of React](https://ant.design/docs/react/introduce) | React UI library 'antd' that contains a set of high quality components and demos for building rich, interactive user interfaces. |
| [JSON Server](https://github.com/typicode/json-server)  | Get a full fake REST API with zero coding in less than 30 seconds. |
| [faker.js](https://github.com/Marak/Faker.js) | Generate massive amounts of fake data in the browser and node.js |

### 🙋 About The Technologies Used
This project includes the most up-to-date features from React.js (Hooks) and Redux (async thunks).

## 🚀  Run The Project Locally
To start with, you can clone this repo pasting the following command in a shell:
```sh
git clone https://github.com/Ch3ssMaster/document-browser.git
```
To continue, I recommend you to `maintain the original file package-lock.json` and install the node packages with the following command:
```sh
npm ci
```
Once the installation has finished, `you should run both json-server and react simultaneosly`. I added a script to easily launch them. Run the following command: 
```sh
npm run dev
```
It will start a json-server in [http://localhost:8000/documents](http://localhost:8000/documents). The document browser will run in the URL: [http://localhost:3000/](http://localhost:3000).

### 💡 Using The Document Browser
To add new documents, write a name for the document in the input field and press the `"+Add new"` button. The rest of the fields will be randomly generated.

You can check the new document ordering the results table by pressing the select `"Date"` button and choosing `"descend"`. 
As you can imagine, simply pressing the `"trash"` icon will delete the corresponding document in the same row.
Also is possible to `"filter"` the showed documents by status, checking the boxes in the left side menu. 

## ⌚ Versioning
`v1.0.0-alpha`
The site use [SemVer](http://semver.org/) for versioning. 

## 🔗 Author
**Antonio Cebrián Mesa** - _Full Stack Web Developer & Informatics Teacher_ -
- [My personal Website](http://clasesinformaticagranada.es/)
- [My Tetris Game Version](http://clasesinformaticagranada.es/tetris)
- [Follow me on Twitter](https://twitter.com/hacking_the_web)
- [For projects and classes](https://www.linkedin.com/in/antonio-cebri%C3%A1n-mesa)

## ©️ Copyright And License

Code and documentation copyright 2021 the [Author](https://www.linkedin.com/in/antonio-cebri%C3%A1n-mesa). Code released under the [MIT License](https://github.com/Ch3ssMaster/document-browser/blob/main/LICENSE.md). 