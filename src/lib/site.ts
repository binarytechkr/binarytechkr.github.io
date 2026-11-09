export const SITE = {
	nameKo: '바이너리테크',
	nameEn: 'Binarytech',
	tagline: '게임과 앱을 만들고 오래 다듬는 독립 개발 스튜디오',
	description:
		'바이너리테크는 게임과 앱을 기획·개발·운영하는 독립 개발 스튜디오입니다.',
	supportEmail: 'binarytech804@gmail.com',
	contentReviewedAt: '2026-09-01',
	legalUpdatedAt: '2026-11-09',
	legalEffectiveAt: '개정 방침 게시일부터 (iOS 항목은 해당 기능 제공 시부터)',
	legalEffectiveAtEn: 'From publication of this revision; iOS provisions from availability of the relevant feature',
	repositoryName: 'binarytechkr.github.io',
} as const;

export const koNavigation = [
	{ label: '제품', path: '/products/' },
	{ label: '회사 소개', path: '/about/' },
	{ label: '고객지원', path: '/support/' },
] as const;

export function withBase(path = '/') {
	const base = import.meta.env.BASE_URL.endsWith('/')
		? import.meta.env.BASE_URL
		: `${import.meta.env.BASE_URL}/`;
	if (path === '/' || path === '') return base;
	return `${base}${path.replace(/^\/+/, '')}`;
}

export function mailtoLink(subject?: string) {
	if (!SITE.supportEmail) return null;
	const query = subject
		? `?subject=${encodeURIComponent(subject)}`
		: '';
	return `mailto:${SITE.supportEmail}${query}`;
}
