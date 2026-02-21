import MobileLayout from '../components/MobileLayout';

export default function Home() {
  return (
    <MobileLayout showNav={true}>
      <div className="flex flex-col">
        <header className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm opacity-90">컴퓨터공학과 26학번</p>
              <h1 className="text-xl">안녕하세요, 김새내님! 👋</h1>
            </div>
            <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-white/20 rounded-lg p-3">
              <p className="text-2xl mb-1">3조</p>
              <p className="text-xs opacity-90">내 조</p>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <p className="text-2xl mb-1">240</p>
              <p className="text-xs opacity-90">내 점수</p>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <p className="text-2xl mb-1">5위</p>
              <p className="text-xs opacity-90">개인 랭킹</p>
            </div>
          </div>
        </header>

        <div className="p-4 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold">진행 중인 미션</h2>
              <a href="/mission-list" className="text-sm text-purple-600">전체보기</a>
            </div>

            <div className="space-y-3">
              <a href="/mission/1" className="block bg-white border-2 border-purple-200 rounded-lg p-4 hover:border-purple-400 transition">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium">보드게임 카페 가기</h3>
                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">진행중</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">조원들과 보드게임 카페에서 즐거운 시간을 보내세요</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>배점: 50점</span>
                  <span>마감: 2026.03.15</span>
                </div>
              </a>

              <a href="/mission/2" className="block bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium">단체 사진 찍기</h3>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">대기</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">조원 전체가 함께하는 단체 사진을 찍어주세요</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>배점: 30점</span>
                  <span>마감: 2026.03.20</span>
                </div>
              </a>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold">밥약 매칭</h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a href="/meal-match-request" className="bg-gradient-to-br from-purple-100 to-purple-50 border border-purple-200 rounded-lg p-4 hover:shadow-md transition">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mb-2">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <p className="text-sm font-medium mb-1">신청형 매칭</p>
                <p className="text-xs text-gray-600">원하는 선배/동기에게 신청</p>
              </a>

              <a href="/meal-match-auto" className="bg-gradient-to-br from-pink-100 to-pink-50 border border-pink-200 rounded-lg p-4 hover:shadow-md transition">
                <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center mb-2">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <p className="text-sm font-medium mb-1">자동 매칭</p>
                <p className="text-xs text-gray-600">AI가 추천하는 매칭</p>
              </a>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold">내 조 활동</h2>
              <a href="/group-assignment" className="text-sm text-purple-600">조 정보</a>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">3조 - 코딩마스터</h3>
                <span className="text-sm text-purple-600">850점</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">조원</span>
                  <span>7명</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">완료 미션</span>
                  <span>5개</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">조 순위</span>
                  <span className="text-purple-600">2위</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold">공지사항</h2>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm">
                <span className="font-semibold">📢 다음 주 조모임 일정</span><br/>
                <span className="text-gray-600">3월 1일(토) 오후 2시, 학생회관 앞 집합!</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
