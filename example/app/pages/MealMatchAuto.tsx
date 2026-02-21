import MobileLayout from '../components/MobileLayout';

export default function MealMatchAuto() {
  return (
    <MobileLayout showNav={true}>
      <div className="flex flex-col min-h-screen">
        <header className="p-4 border-b bg-white sticky top-0">
          <h1 className="text-lg">자동 매칭</h1>
          <p className="text-sm text-gray-600 mt-1">AI가 최적의 매칭을 찾아드립니다</p>
        </header>

        <div className="flex-1 overflow-auto p-6 space-y-6">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h2 className="text-xl mb-2">이번 주 밥약 매칭</h2>
            <p className="text-sm opacity-90">참여자 중에서 1:1 또는 그룹으로 매칭합니다</p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">매칭 설정</h3>
            <div className="space-y-3">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <label className="text-sm text-gray-700 mb-3 block">매칭 타입</label>
                <div className="grid grid-cols-3 gap-2">
                  <button className="px-3 py-2 border-2 border-purple-500 bg-purple-50 text-purple-700 rounded-lg text-sm">
                    1:1
                  </button>
                  <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:border-gray-400">
                    2:2
                  </button>
                  <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:border-gray-400">
                    3:3
                  </button>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <label className="text-sm text-gray-700 mb-3 block">매칭 조건</label>
                <div className="space-y-2">
                  <label className="flex items-center justify-between">
                    <span className="text-sm">성향 유사도 우선</span>
                    <input type="radio" name="condition" className="text-purple-500" defaultChecked />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm">다양성 우선</span>
                    <input type="radio" name="condition" className="text-purple-500" />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm">학년 혼합</span>
                    <input type="radio" name="condition" className="text-purple-500" />
                  </label>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <label className="text-sm text-gray-700 mb-3 block">선호 시간대</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-purple-500 rounded" defaultChecked />
                    <span className="text-sm">평일 점심 (12-14시)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-purple-500 rounded" defaultChecked />
                    <span className="text-sm">평일 저녁 (18-20시)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-purple-500 rounded" />
                    <span className="text-sm">주말 오후 (14-18시)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium">현재 참여 현황</h3>
              <span className="text-sm text-purple-600">23명 참여 중</span>
            </div>
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full border-2 border-white flex items-center justify-center text-white text-xs">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
              <div className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center text-gray-600 text-xs">
                +15
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-900">
              <span className="font-semibold">⏰ 매칭 마감</span><br/>
              매주 일요일 오후 11시에 자동으로 매칭이 진행됩니다
            </p>
          </div>
        </div>

        <div className="p-4 border-t bg-white space-y-3">
          <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg hover:opacity-90 transition">
            매칭 참여하기
          </button>
          <a href="/home" className="block w-full text-center py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition">
            돌아가기
          </a>
        </div>
      </div>
    </MobileLayout>
  );
}
