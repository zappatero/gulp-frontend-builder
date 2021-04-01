# Gulp Frontend Framework for Tailwind CSS

Frontend Framework build on gulpjs (https://gulpjs.com) to provide the toolset needed by any frontend engineer.

The framework bare-bones HTML templates based on the nunjucks template engine (https://mozilla.github.io/nunjucks/)
and Tailwind CSS (https://tailwindcss.com).

The framework allows local dev with browser live preview based on browsersync. It compiles (PostCSS) tailwind according
the config and minify the compiled css and javascripts for production environments. Images will size-optimized with imagenmin.

# Download & Installation

1. Clone the repository:

    ```sh
    git clone git@github.com:zappatero/gulp-frontendframework.git <YOUR_PROJECT_NAME>

    cd <YOUR_PROJECT_NAME>
    ```

    Or if you are not familiar with git, simply download framework's zip file from [this link on github.com](https://github.com/zappatero/frontendframework-tailwind.git).

2. Install node & npm (if needed):

    Check if you have node & npm installed.
    ```sh
    # checks the node and npm versions
    node -v && npm -v
    ```

    If no version is found, install nodejs from [https://nodejs.org](https://nodejs.org)

3. Install the node dependencies:
    ```sh
    # this installs all needed packages
    npm install
    ```

# How to use
## Folder structure
    Folders
    .
    ├── dist                    # Compiled files for dev (gitignore)
    ├── build                   # Compiled files for production (gitignore)
    ├── node-modules            # Required node packages (gitignore)
    └── src                     # App source files main directory
        ├── assets              # Store your pdf docs, fonts, icons here
        │   ├── docs
        │   ├── fonts
        │   └── icons
        ├── css                 # Store your css style files here
        ├── html
        │   ├── pages           # Store your app pages here. All page templates in this folder will be compiled
        │   └── templates
        │       ├── layouts     # Store your nunjucks layout templates here
        │       └── partials    # Store your blocks, components, molecules here 
        ├── images              # Store your images here
        └── js                  # Store your javascripts here
    
    Files
    .
    ├── gulpfile.js             # Framework gulp config
    ├── LICENSE                 # License description for
    ├── package-lock.json       # Description file of installed node package versions
    ├── package.json            # Node package config file
    ├── postcss.config.js       # PostCSS config file
    ├── README.md               # This description here
    └── tailwind.config.js      # Tailwind CSS config file

## Framework commands/tasks
### Local Dev Env
To start local frontend development with live preview use:
```sh
# local development build with live preview
npm run dev
```
The task builds the app for **_development env_** in the folder **_./dist_**.
- compiles the nunjucks templates to html pages
- compiles and minify all css files into one main.min.css
- compiles and minify all js files into one main.min.js
- compress the image files into smaller files
- copy the assets (1:1, no further actions)
- starts live preview in browser and reloads if files change

> Now you should be able to see the welcome page [localhost:8090](http://localhost:8090).

Do not use ./dist for production environments. The local env is optimized for fast previews/less operations and not for optimized file sizes.

### Production build
To ship a production ready built, use
```sh
# production ready build
npm run build
```
- Cleans existing files in the ./build directory
- Compiles & compress the nunjucks-, css-, js- and image files according to dev
- Additional purge unused Tailwind CSS classes out from css to reduce file size. [More details](https://tailwindcss.com/docs/optimizing-for-production)
- Does not start live preview

## Individual tasks
```sh
# to compile nunjucks templates for local dev only
npm run html

# to compile css files for local dev only (not uglified)
npm run css

# to compile js files for local dev only (not uglified)
npm run js

# to copy image files for local dev only (no compression)
npm run images

#to copy asset files only
npm run assets

#to empty local dev ./dist directory
npm run clean
```
