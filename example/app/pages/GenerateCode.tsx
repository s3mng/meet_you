import MobileLayout from '../components/MobileLayout';

export default function GenerateCode() {
  return (
    <MobileLayout>
      <div className="flex flex-col min-h-screen">
        <header className="p-4 border-b bg-white sticky top-0">
          <div className="flex items-center gap-3">
            <a href="/create-team" className="text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </a>
            <h1 className="text-lg">인증코드 관리</h1>
          </div>
        </header>

        <div className="flex-1 p-6 space-y-6">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
            <p className="text-sm opacity-90 mb-2">현재 활성 코드</p>
            <div className="flex items-center justify-between mb-4">
              <p className="text-3xl font-mono tracking-wider">ABC123</p>
              <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition">
                복사
              </button>
            </div>
            <div className="flex items-center gap-2 text-sm opacity-90">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>2026.03.31까지 유효</span>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-sm text-gray-700">코드 설정</h2>

            <div>
              <label className="block text-sm mb-2 text-gray-600">만료일</label>
              <input
                type="date"
                defaultValue="2026-03-31"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-600">최대 인원</label>
              <input
                type="number"
                defaultValue="50"
                placeholder="제한 없음"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
              <div>
                <p className="text-sm">승인 필요</p>
                <p className="text-xs text-gray-500">가입 시 관리자 승인 필요</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="px-4 py-3 border-2 border-purple-500 text-purple-500 rounded-lg hover:bg-purple-50 transition">
              새 코드 생성
            </button>
            <button className="px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition">
              설정 저장
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              코드 사용 현황
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">총 가입자</span>
                <span>24명</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">승인 대기</span>
                <span className="text-orange-600">3명</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">최대 인원</span>
                <span>50명</span>
              </div>
            </div>
          </div>

          <a href="/manage-members" className="block w-full border-2 border-gray-300 text-center py-3 rounded-lg hover:bg-gray-50 transition">
            멤버 관리하기
          </a>
        </div>
      </div>
    </MobileLayout>
  );
}
