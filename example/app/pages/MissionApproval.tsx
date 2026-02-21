import MobileLayout from '../components/MobileLayout';

const submissions = [
  { id: 1, group: '3조', mission: '보드게임 카페 가기', submitter: '김새내', date: '2026.02.20', status: 'pending' },
  { id: 2, group: '1조', mission: '단체 사진 찍기', submitter: '이리더', date: '2026.02.19', status: 'pending' },
  { id: 3, group: '2조', mission: '같이 밥 먹기', submitter: '박조장', date: '2026.02.18', status: 'approved' },
];

export default function MissionApproval() {
  return (
    <MobileLayout>
      <div className="flex flex-col min-h-screen">
        <header className="p-4 border-b bg-white sticky top-0">
          <div className="flex items-center gap-3">
            <a href="/home" className="text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </a>
            <div className="flex-1">
              <h1 className="text-lg">미션 승인</h1>
              <p className="text-xs text-gray-500">운영진 전용</p>
            </div>
          </div>
        </header>

        <div className="p-4 bg-gray-50 border-b">
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border-2 border-purple-500 text-purple-500 rounded-lg text-sm">
              승인 대기 (2)
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-600 rounded-lg text-sm hover:border-gray-400">
              승인완료
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-600 rounded-lg text-sm hover:border-gray-400">
              반려
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {submissions.map((submission) => (
            <div key={submission.id} className="p-4 border-b hover:bg-gray-50">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{submission.mission}</h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{submission.group}</span>
                        <span>•</span>
                        <span>{submission.submitter}</span>
                        <span>•</span>
                        <span>{submission.date}</span>
                      </div>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded whitespace-nowrap ml-2 ${
                        submission.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {submission.status === 'pending' ? '대기중' : '승인완료'}
                    </span>
                  </div>

                  {submission.status === 'pending' && (
                    <>
                      <div className="my-3 space-y-2">
                        <div className="bg-gray-100 rounded-lg p-3 text-sm">
                          <div className="flex items-center gap-2 mb-2">
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-gray-600">사진 2장</span>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                            <span className="text-gray-600">위치 인증 완료</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <span className="text-gray-600">참여자 4명</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex-1 bg-green-500 text-white py-2 rounded-lg text-sm hover:bg-green-600 transition">
                          승인
                        </button>
                        <button className="flex-1 border border-red-500 text-red-500 py-2 rounded-lg text-sm hover:bg-red-50 transition">
                          반려
                        </button>
                        <button className="px-4 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm hover:bg-gray-50 transition">
                          상세
                        </button>
                      </div>
                    </>
                  )}

                  {submission.status === 'approved' && (
                    <div className="mt-3 text-sm text-green-600 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>승인 완료 (50점 부여)</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="p-6 text-center text-sm text-gray-500">
            더 이상 제출된 미션이 없습니다
          </div>
        </div>

        <div className="p-4 border-t bg-white">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl text-purple-600 mb-1">2</p>
                <p className="text-xs text-gray-600">승인 대기</p>
              </div>
              <div>
                <p className="text-2xl text-green-600 mb-1">15</p>
                <p className="text-xs text-gray-600">승인 완료</p>
              </div>
              <div>
                <p className="text-2xl text-red-600 mb-1">1</p>
                <p className="text-xs text-gray-600">반려</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
