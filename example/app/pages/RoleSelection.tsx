import MobileLayout from '../components/MobileLayout';

export default function RoleSelection() {
  return (
    <MobileLayout>
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="mb-12 text-center">
          <h1 className="text-2xl mb-2">환영합니다! 👋</h1>
          <p className="text-gray-600 text-sm">역할을 선택해주세요</p>
        </div>

        <div className="w-full space-y-4">
          <a href="/create-team" className="block">
            <div className="p-6 border-2 border-purple-500 rounded-xl hover:bg-purple-50 transition">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg mb-1">관리자</h3>
                  <p className="text-sm text-gray-600">팀을 만들고 멤버를 관리합니다</p>
                  <ul className="mt-2 text-xs text-gray-500 space-y-1">
                    <li>• 팀 생성 및 인증코드 발급</li>
                    <li>• 멤버 승인 및 관리</li>
                    <li>• 미션 등록 및 채점</li>
                  </ul>
                </div>
              </div>
            </div>
          </a>

          <a href="/join-team" className="block">
            <div className="p-6 border-2 border-pink-500 rounded-xl hover:bg-pink-50 transition">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg mb-1">참여자</h3>
                  <p className="text-sm text-gray-600">인증코드로 팀에 가입합니다</p>
                  <ul className="mt-2 text-xs text-gray-500 space-y-1">
                    <li>• 인증코드로 팀 가입</li>
                    <li>• 밥약 매칭 참여</li>
                    <li>• 미션 수행 및 제출</li>
                  </ul>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </MobileLayout>
  );
}
