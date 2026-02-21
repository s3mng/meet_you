import MobileLayout from '../components/MobileLayout';

export default function InterestForm() {
  return (
    <MobileLayout>
      <div className="flex flex-col min-h-screen">
        <header className="p-4 border-b bg-white sticky top-0">
          <div className="flex items-center justify-between">
            <h1 className="text-lg">관심사 프로필 작성</h1>
            <span className="text-sm text-gray-500">1/3</span>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6 space-y-6">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-sm text-purple-900">
              <span className="font-semibold">🎯 왜 필요한가요?</span><br/>
              관심사 프로필을 통해 성향이 맞는 친구들과 매칭됩니다!
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="font-semibold">기본 정보</h2>

            <div>
              <label className="block text-sm mb-2 text-gray-700">학번 *</label>
              <input
                type="text"
                placeholder="예: 2026"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">학년 *</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>선택하세요</option>
                <option>1학년</option>
                <option>2학년</option>
                <option>3학년</option>
                <option>4학년</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">성별 (선택)</label>
              <div className="grid grid-cols-2 gap-3">
                <button className="px-4 py-3 border-2 border-purple-500 bg-purple-50 text-purple-700 rounded-lg">
                  남성
                </button>
                <button className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400">
                  여성
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">나이대 (선택)</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>선택하세요</option>
                <option>10대</option>
                <option>20대 초반</option>
                <option>20대 중반</option>
                <option>20대 후반</option>
                <option>30대 이상</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">전공/파트 (선택)</label>
              <input
                type="text"
                placeholder="예: 컴퓨터공학"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="font-semibold">선호 정보</h2>

            <div>
              <label className="block text-sm mb-2 text-gray-700">MBTI (선택)</label>
              <input
                type="text"
                placeholder="예: ENFP"
                maxLength={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 uppercase"
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">음식 취향 (선택)</label>
              <div className="grid grid-cols-2 gap-2">
                <button className="px-3 py-2 border-2 border-purple-500 bg-purple-50 text-purple-700 rounded-lg text-sm">
                  한식
                </button>
                <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:border-gray-400">
                  중식
                </button>
                <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:border-gray-400">
                  일식
                </button>
                <button className="px-3 py-2 border-2 border-purple-500 bg-purple-50 text-purple-700 rounded-lg text-sm">
                  양식
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">가능 시간대 (선택)</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 text-purple-500 rounded" />
                  <span className="text-sm">평일 점심 (12-14시)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 text-purple-500 rounded" defaultChecked />
                  <span className="text-sm">평일 저녁 (18-20시)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 text-purple-500 rounded" defaultChecked />
                  <span className="text-sm">주말 오후 (14-18시)</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">금지/주의사항 (선택)</label>
              <textarea
                placeholder="예: 술 못 마셔요, 매운 음식 못 먹어요"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">한 줄 소개 (선택)</label>
              <textarea
                placeholder="자신을 소개해주세요"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>

        <div className="p-4 border-t bg-white space-y-3">
          <a href="/home" className="block w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg text-center hover:opacity-90 transition">
            제출하기
          </a>
          <button className="w-full text-sm text-gray-500 hover:text-gray-700">
            나중에 작성하기
          </button>
        </div>
      </div>
    </MobileLayout>
  );
}
