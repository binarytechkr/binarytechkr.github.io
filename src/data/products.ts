export type ProductStatus = 'released' | 'preparing' | 'development';

export const productStatusLabels: Record<ProductStatus, string> = {
	released: '출시',
	preparing: '출시 준비 중',
	development: '개발 중',
};

export const dantaProduct = {
	slug: 'danta',
	name: '천하제일 단타대회',
	nameEn: 'Danta Championship',
	status: 'released' as ProductStatus,
	featured: true,
	summary: '가상 시장을 읽고 짧고 선명한 단타 경기에 도전하는 모바일 게임',
	description:
		'7개 가상 종목의 흐름을 읽고 5분 단타 또는 1분 번개단타를 플레이합니다. 시장가·지정가 주문, 장비, 기록과 꾸미기, 결과 카드와 도전 코드 공유를 한 흐름으로 제공합니다.',
	icon: '/assets/products/danta/app-icon.png',
	featureGraphic: '/assets/products/danta/feature-graphic.png',
	platformNote: 'Android 출시',
	facts: [
		'7개 가상 종목으로 구성된 시장',
		'5분 단타와 1분 번개단타',
		'시장가·지정가 주문과 실제 체결 규칙을 반영한 게임 코어',
		'장비 5종, 차트 설정, 뉴스와 체결 피드백',
		'완주 기록·업적·무료 진행 꾸미기',
		'결과 카드와 같은 가상 장세를 재현하는 도전 코드',
		'한국어·영어 인터페이스',
		'기기 로컬 진행 저장',
	],
	screenshots: [
		{
			src: '/assets/products/danta/screens/01-home.png',
			alt: '천하제일 단타대회의 5분 단타 시작 화면',
			caption: '5분 단타와 1분 번개단타',
		},
		{
			src: '/assets/products/danta/screens/02-loadout.png',
			alt: '불기둥 레이더와 추세 돋보기를 고르는 장비 선택 화면',
			caption: '두 개 장비로 만드는 경기 전략',
		},
		{
			src: '/assets/products/danta/screens/03-market.png',
			alt: '7개 가상 종목의 가격과 등락을 보여 주는 시장 화면',
			caption: '7개 가상 종목을 한눈에',
		},
		{
			src: '/assets/products/danta/screens/04-chart.png',
			alt: '캔들 차트와 거래량, 이동평균을 보여 주는 차트 화면',
			caption: '차트·거래량·이동평균',
		},
		{
			src: '/assets/products/danta/screens/05-trade.png',
			alt: '가상 종목의 호가와 시장가 주문 체결 화면',
			caption: '호가를 읽고 주문을 체결',
		},
		{
			src: '/assets/products/danta/screens/07-locker.png',
			alt: '무료 진행 보상으로 얻은 화면 꾸미기를 고르는 보관함',
			caption: '무료 진행 보상과 꾸미기',
		},
		{
			src: '/assets/products/danta/screens/08-achievements.png',
			alt: '완주 기록에 따라 달성되는 13개 업적 화면',
			caption: '완주 기록과 13개 업적',
		},
	],
} as const;

export const products = [dantaProduct] as const;
