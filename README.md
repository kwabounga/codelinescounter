# codelinescounter
to see how many lines of code you have written!


### installation

````sh
# install
$ git clone http://github.com/kwabounga/codelinescounter/
$ npm install
$ npm link
...
# tests
$ npm test
...
# show version
$ clcnter -V
> 1.0.0
````
### configuration

has you want  
*fichier ./conf/.conf*
```json
{
  "include_files": [".js", ".css", ".html",".txt", ".md", ".svg"],
  "exclude_files": ["Kwa","jquery","bootstrap","babylon"],
  "exclude_folders": ["node_modules", ".git"],
  "include_folders": ["css", "js", "exports", "html", "bin"]
}
include_folders: is only used for the root folder, it can be empty
exclude_folders: if is empty : no excluded folders
exclude_files: if is empty : no excluded files
include_files: if is empty :  all files are included
```
### usage
````sh
$ clcnter
# [code lines counter]
#
# scan >> C:\the\current\folder\where\you\run\clc:
# ----------------
# 711 'lines of code written!'
# ----------------
# run clcnter -h  for more details
$ clcnter -f
# [code lines counter]
#
# scan >> C:\Users\utilisateur1\projects\test-app:
# [root]
# ├──[ ./css/ ]
# |  ├──styles.css (1)
# ├──[ ./html/ ]
# |  ├──index.html (35)
# ├──[ ./js/ ]
# |  ├──kwatools.js (69)
# |  ├──main.js (21)
# ├──kwa.settings.json (21)
# ----------------
# 147 'lines of code written!'
# ----------------
$ clcnter --help
# or
$ clcnter -h
# for more infos
````

### options
[- f d b l |-e| -h | -c]
-h : for help  

-f --files : to see files tree  
-d -- doc : to count doc and comments  
-b --brackets : to count brackets, parentheses, comma   
-l --logs : to count log lines  
-e --exclude : for exclude files on the fly
-c --conf : override global configuration file
-p --path : select the path to analyse. if null the current path is used

```sh
$ clcnter -e ttf
# or 
$ clcnter -e '.ttf;.svg'
# or 
$ clcnter -e ttf;svg
```
