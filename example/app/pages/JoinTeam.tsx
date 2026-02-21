import MobileLayout from '../components/MobileLayout';

export default function JoinTeam() {
  return (
    <MobileLayout>
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="mb-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-3xl mx-auto mb-4 flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <h1 className="text-2xl mb-2">팀에 가입하기</h1>
          <p className="text-gray-600 text-sm">관리자에게 받은 인증코드를 입력하세요</p>
        </div>

        <div className="w-full space-y-6">
          <div>
            <label className="block text-sm mb-2 text-gray-700">인증코드</label>
            <input
              type="text"
              placeholder="예: ABC123"
              maxLength={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-center text-2xl font-mono tracking-widest uppercase"
            />
          </div>

          <a href="/interest-form" className="block w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg text-center hover:opacity-90 transition">
            확인
          </a>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-900">
              <span className="font-semibold">💡 안내</span><br/>
              • 인증코드는 대소문자를 구분하지 않습니다<br/>
              • 승인 필요 팀의 경우 관리자 승인 후 가입이 완료됩니다
            </p>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
