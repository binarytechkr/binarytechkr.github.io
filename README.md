# 바이너리테크 공식 홈페이지

바이너리테크(Binarytech)의 회사 소개와 제품 정보를 제공하는 Astro 정적 사이트입니다. Flutter 앱 저장소와 완전히 분리되어 있으며, GitHub Pages에 배포합니다.

- 공개 저장소: [binarytechkr/binarytechkr.github.io](https://github.com/binarytechkr/binarytechkr.github.io)
- 배포 주소: [binarytechkr.github.io](https://binarytechkr.github.io/)
- 대표 제품: 천하제일 단타대회 — 출시 준비 중
- 고객지원: `binarytech804@gmail.com`

## 공개 범위

이 저장소에는 홈페이지를 만드는 데 필요한 Astro 소스, 정적 이미지, 빌드 설정만 포함합니다. Flutter 앱 소스, 서명 키, Firebase 설정 파일, API 키, 비밀번호, 계정 데이터는 포함하거나 연결하지 않습니다. 앱 저장소는 별도로 비공개 유지합니다.

홈페이지 저장소와 빌드 결과는 공개됩니다. 브라우저에 전달되는 HTML, CSS, 이미지도 방문자가 확인할 수 있으므로 비밀값은 코드나 GitHub Actions 설정에 넣지 않습니다.

저장소가 공개되어 있어도 별도 라이선스가 부여되는 것은 아닙니다. 자세한 내용은 [NOTICE.md](NOTICE.md)를 확인하세요.

## 기술 구성

- Astro 7 정적 출력
- React/Vue 등 클라이언트 프레임워크 없음
- 외부 폰트, 분석 도구, 광고, 쿠키 추적 없음
- 제품 정보는 `src/data/products.ts`, 회사·문의 정보는 `src/lib/site.ts`에서 관리
- GitHub 프로젝트 Pages 하위 경로와 향후 사용자 지정 도메인을 환경값으로 전환

Astro는 페이지별 HTML을 미리 생성해 GitHub Pages에 그대로 올릴 수 있고, 제품이 늘어날 때 데이터와 페이지를 추가하기 쉽습니다. SPA나 Flutter Web보다 전송량과 브라우저 실행 코드도 작습니다.

## 페이지 구조

```text
/
├─ products/
├─ products/danta/
├─ about/
├─ support/
├─ privacy/danta/
├─ terms/danta/
├─ account-deletion/danta/
├─ en/
├─ robots.txt
└─ sitemap-index.xml
```

## 로컬 실행

Node.js 24와 pnpm 11을 권장합니다.

```bash
pnpm install
pnpm dev
```

정적 빌드와 검증:

```bash
pnpm run validate
```

빌드 결과는 `dist/`에 생성됩니다.

## 콘텐츠와 출시 상태

앱 설명과 이미지는 비공개 Flutter 저장소의 문서, 구현 상태, 실제 앱 아이콘과 개발 빌드 화면을 읽기 전용으로 확인해 작성했습니다. 홈페이지 작업은 Flutter 저장소를 수정하지 않습니다.

현재 공개 문구는 확인된 개발 빌드와 확정된 출시 방향을 구분합니다. 현재 개발 빌드는 진행과 설정을 기기에 저장하며, 계정·Firebase 원격 저장·광고·분석·실결제는 아직 활성화되지 않았습니다. 출시 버전에는 해당 기능을 도입할 예정입니다.

실제 출시 후보 빌드가 완성되면 개인정보처리방침, 이용약관, 계정 삭제 안내를 SDK 설정 및 Play Console 데이터 보안 답변과 다시 대조해야 합니다.

## GitHub Pages 자동 배포

`main` 브랜치에 반영하면 `.github/workflows/deploy.yml`이 사이트를 빌드하고 GitHub Pages에 배포합니다.

저장소에서 최초 한 번 다음 항목을 확인합니다.

1. **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 설정합니다.
2. Actions의 **Deploy to GitHub Pages** 워크플로가 성공했는지 확인합니다.
3. 배포 주소에서 메인 페이지, 제품·정책 페이지, `robots.txt`, sitemap을 확인합니다.

`astro.config.mjs`는 GitHub의 `GITHUB_REPOSITORY` 값을 사용해 `site`와 `base`를 자동 계산합니다. 현재 저장소명은 Organization 이름과 일치하는 `binarytechkr.github.io`이므로 사이트는 별도 하위 경로 없이 루트 주소에서 제공됩니다.

## 앱 출시 전 정책 확정

홈페이지는 앱보다 먼저 공개할 수 있지만, 현재 개인정보처리방침과 이용약관은 출시 전 초안입니다. Google Play 제출 전에는 다음 항목을 실제 출시 후보 빌드와 맞춰 완료해야 합니다.

1. 계정·Firebase·광고·분석·결제 SDK가 접근·수집·전송·공유하는 데이터와 목적을 확인합니다.
2. 보관 기간, 제3자, 보안 처리, 계정 및 원격 데이터 삭제 절차를 최종 문구에 반영하고 시행일을 확정합니다.
3. 개인정보처리방침 링크를 Play Console과 앱 안에서 모두 접근할 수 있게 연결합니다.
4. 앱 안에서 계정을 만들 수 있다면 앱 내부 삭제 경로와 외부 웹 삭제 요청 경로를 실제로 작동하게 만든 뒤 이 사이트의 계정 삭제 안내를 활성화합니다.
5. Play Console 데이터 보안 섹션이 개인정보처리방침과 모든 포함 SDK의 처리 내용에 일치하는지 대조합니다.

공식 기준:

- [Google Play 사용자 데이터 정책](https://support.google.com/googleplay/android-developer/answer/10144311)
- [Google Play 계정 삭제 요구사항](https://support.google.com/googleplay/android-developer/answer/13327111)
- [Google Play 데이터 보안 섹션](https://support.google.com/googleplay/android-developer/answer/10787469)

## 향후 사용자 지정 도메인 연결

사이트를 다시 만들 필요 없이 Pages와 DNS 설정만 변경합니다.

1. GitHub에서 사용할 도메인을 검증합니다.
2. **Settings → Pages → Custom domain**에 도메인을 추가합니다.
3. **Settings → Secrets and variables → Actions → Variables**에 `SITE_URL`(최종 HTTPS 주소)과 `BASE_PATH`(`/`)를 추가합니다.
4. GitHub Pages 공식 안내에 따라 DNS 제공업체에 필요한 레코드를 설정합니다.
5. 다음 `main` 빌드에서 canonical URL, Open Graph URL, sitemap과 내부 경로가 새 도메인 기준으로 생성되는지 확인합니다.
6. 인증서가 준비되면 **Enforce HTTPS**를 켭니다.

공식 안내:

- [Astro의 GitHub Pages 배포](https://docs.astro.build/en/guides/deploy/github/)
- [GitHub Pages 시작](https://docs.github.com/en/pages/getting-started-with-github-pages)
- [GitHub Pages 게시 소스 설정](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [GitHub Pages 사용자 지정 도메인](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [GitHub Pages HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)

## 보안·운영 원칙

- GitHub Pages에서 비밀번호, 결제, 계정 데이터를 직접 처리하지 않습니다.
- GitHub 비밀번호, 2단계 인증번호, 복구 코드, 서명 키를 저장소나 문의에 남기지 않습니다.
- 서버 문의 폼을 두지 않고 공개 이메일의 `mailto:` 링크만 사용합니다.
- 외부 분석·광고·쿠키 추적은 별도 승인 없이 홈페이지에 추가하지 않습니다.
