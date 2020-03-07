# codelinescounter
to see how many lines of code you have written!


### installation

````sh
$ git clone http://github.com/kwabounga/codelinescounter/
$ npm install
$ npm link
> done!
````
### configuration
*fichier ./conf/.conf*
```json
{
  "include_files": [".js", ".css", ".html",".txt", ".md", ".svg"],
  "exclude_files": ["Kwa","jquery","bootstrap","babylon"],
  "exclude_folders": ["node_modules", ".git"],
  "include_folders": ["css", "js", "exports", "html", "bin"]
}
include folders: is used for the root folder, it can be empty
exclude files:
```
### usage
````sh
$ clc -V
> 1.0.0

$ clc -help
# for more infos
````

### options
[- f d b l | h]
-h : for help  

-f --files : to see files tree  
-d -- doc : to count doc and comments  
-b --brackets : to count brackets, parentheses, comma   
-l --logs : to count log lines  
