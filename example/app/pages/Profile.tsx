import MobileLayout from '../components/MobileLayout';

export default function Profile() {
  return (
    <MobileLayout showNav={true}>
      <div className="flex flex-col min-h-screen">
        <header className="p-4 border-b bg-white sticky top-0">
          <h1 className="text-lg">프로필</h1>
        </header>

        <div className="flex-1 overflow-auto">
          <div className="p-6 bg-gradient-to-br from-purple-500 to-pink-500 text-white">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl flex-shrink-0">
                김
              </div>
              <div className="flex-1">
                <h2 className="text-2xl mb-1">김새내</h2>
                <p className="text-sm opacity-90">26학번 • 1학년</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <p className="text-2xl mb-1">240</p>
                <p className="text-xs opacity-90">내 점수</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <p className="text-2xl mb-1">5위</p>
                <p className="text-xs opacity-90">개인 랭킹</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <p className="text-2xl mb-1">8시간</p>
                <p className="text-xs opacity-90">활동 시간</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <h3 className="font-semibold mb-3">기본 정보</h3>
              <div className="bg-white border border-gray-200 rounded-lg divide-y">
                <div className="p-4 flex items-center justify-between">
                  <span className="text-sm text-gray-600">소속</span>
                  <span className="text-sm">컴퓨터공학과 26학번</span>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <span className="text-sm text-gray-600">학년</span>
                  <span className="text-sm">1학년</span>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <span className="text-sm text-gray-600">전공</span>
                  <span className="text-sm">컴퓨터공학</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">관심사 프로필</h3>
                <a href="/interest-form" className="text-sm text-purple-600">수정</a>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">MBTI</p>
                  <span className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full">ENFP</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-2">음식 취향</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">한식</span>
                    <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">양식</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-2">가능 시간대</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">평일 저녁</span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">주말 오후</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">한 줄 소개</p>
                  <p className="text-sm text-gray-700">코딩 좋아하는 새내기입니다! 친하게 지내요 😊</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">활동 통계</h3>
              <div className="bg-white border border-gray-200 rounded-lg divide-y">
                <div className="p-4 flex items-center justify-between">
                  <span className="text-sm text-gray-600">완료한 미션</span>
                  <span className="text-sm text-purple-600 font-medium">3개</span>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <span className="text-sm text-gray-600">밥약 횟수</span>
                  <span className="text-sm text-purple-600 font-medium">5회</span>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <span className="text-sm text-gray-600">누적 활동 시간</span>
                  <span className="text-sm text-purple-600 font-medium">8시간 30분</span>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <span className="text-sm text-gray-600">획득 점수</span>
                  <span className="text-sm text-purple-600 font-medium">240점</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">설정</h3>
              <div className="bg-white border border-gray-200 rounded-lg divide-y">
                <button className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50">
                  <span className="text-sm">알림 설정</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <button className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50">
                  <span className="text-sm">개인정보 처리방침</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <button className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50">
                  <span className="text-sm text-red-600">로그아웃</span>
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
