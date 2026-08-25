# Binarytech

바이너리테크 공식 홈페이지의 Astro 정적 사이트입니다.

- 홈페이지: [binarytechkr.github.io](https://binarytechkr.github.io/)
- 배포: `main` 브랜치 · GitHub Actions · GitHub Pages

## 로컬 실행

```bash
pnpm install
pnpm dev
```

빌드와 검증:

```bash
pnpm run validate
```

사용자 지정 도메인은 GitHub Pages의 **Custom domain**에 연결하고, Actions 변수 `SITE_URL`과 `BASE_PATH`를 해당 주소에 맞게 설정합니다.
