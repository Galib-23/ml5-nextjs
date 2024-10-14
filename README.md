# Next.js With ml5.js










__1. Install these dependencies:__
```bash
npm install @tensorflow/tfjs@^3.12.0
npm install @tensorflow/tfjs-backend-webgl@^3.12.0
npm install @tensorflow/tfjs-converter@^3.12.0
```
__2. Install the patch-package:__
```bash
npm install patch-package --save-dev
```

__3. Update deprecated dependencies:__
```bash
npm install core-js@latest
npm install rimraf@latest
npm install glob@latest
```

__4. Use --legacy-peer-deps Flag for installing ml5:__
```bash
npm install ml5 --legacy-peer-deps
```