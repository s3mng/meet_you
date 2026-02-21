import MobileLayout from '../components/MobileLayout';

const members = [
  { id: 1, name: '김새내', year: '26', status: 'approved', role: 'member' },
  { id: 2, name: '이학생', year: '26', status: 'approved', role: 'member' },
  { id: 3, name: '박참가', year: '26', status: 'pending', role: 'member' },
  { id: 4, name: '최모임', year: '26', status: 'pending', role: 'member' },
  { id: 5, name: '정친구', year: '25', status: 'approved', role: 'staff' },
];

export default function ManageMembers() {
  return (
    <MobileLayout>
      <div className="flex flex-col min-h-screen">
        <header className="p-4 border-b bg-white sticky top-0">
          <div className="flex items-center gap-3">
            <a href="/generate-code" className="text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </a>
            <h1 className="text-lg">멤버 관리</h1>
          </div>
        </header>

        <div className="p-4 bg-gray-50 border-b">
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border-2 border-purple-500 text-purple-500 rounded-lg text-sm">
              전체 (27)
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-600 rounded-lg text-sm hover:border-gray-400">
              승인 대기 (3)
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-600 rounded-lg text-sm hover:border-gray-400">
              운영진 (4)
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {members.map((member) => (
            <div key={member.id} className="p-4 border-b hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white flex-shrink-0">
                  {member.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{member.name}</p>
                    <span className="text-xs text-gray-500">({member.year}학번)</span>
                    {member.role === 'staff' && (
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">운영진</span>
                    )}
                  </div>
                  {member.status === 'pending' ? (
                    <div className="flex gap-2 mt-2">
                      <button className="flex-1 px-3 py-1.5 bg-purple-500 text-white rounded text-sm hover:bg-purple-600 transition">
                        승인
                      </button>
                      <button className="flex-1 px-3 py-1.5 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50 transition">
                        거부
                      </button>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500 mt-1">가입일: 2026.02.15</p>
                  )}
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t bg-white">
          <button className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition">
            멤버 내보내기
          </button>
        </div>
      </div>
    </MobileLayout>
  );
}
