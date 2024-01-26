## 📄 Description
Tiniest API in the world making use of [le-robert](https://www.npmjs.com/package/le-robert) package. With the correct endpoint, you can look up a word and get its definititions, pronunciation, usages and conjugations (if it's a verb). 
Made to be used by another personal project of mine that needed a french dictionnary API. 

Puppeteer, the main _le-robert_ dependency, caused all kind of troubles during deployment on Fly.io. After an evening of trials and tribulations, I ended up having to "unwrap" the package to modify its parameters since fly.io _also_ didn't play nice with [patch-package](https://www.npmjs.com/package/patch-package).

**TO-DO:**
- Secure the API 🤡
