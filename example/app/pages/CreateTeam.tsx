import MobileLayout from '../components/MobileLayout';

export default function CreateTeam() {
  return (
    <MobileLayout>
      <div className="flex flex-col min-h-screen">
        <header className="p-4 border-b bg-white sticky top-0">
          <div className="flex items-center gap-3">
            <a href="/role-selection" className="text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </a>
            <h1 className="text-lg">팀 만들기</h1>
          </div>
        </header>

        <div className="flex-1 p-6 space-y-6">
          <div>
            <label className="block text-sm mb-2 text-gray-700">팀 이름 *</label>
            <input
              type="text"
              placeholder="예: 컴퓨터공학과 26학번"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">카테고리 *</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>선택하세요</option>
              <option>과</option>
              <option>동아리</option>
              <option>기타</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">학기 *</label>
            <div className="grid grid-cols-2 gap-3">
              <select className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>2026</option>
                <option>2025</option>
                <option>2024</option>
              </select>
              <select className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>1학기</option>
                <option>2학기</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">팀 소개</label>
            <textarea
              placeholder="팀에 대한 간단한 소개를 입력하세요"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <span className="font-semibold">💡 안내</span><br/>
              팀을 만들면 인증코드가 자동으로 생성됩니다. 멤버들에게 코드를 공유하여 팀에 초대하세요.
            </p>
          </div>
        </div>

        <div className="p-6 border-t bg-white">
          <a href="/generate-code" className="block w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg text-center hover:opacity-90 transition">
            팀 만들기
          </a>
        </div>
      </div>
    </MobileLayout>
  );
}
