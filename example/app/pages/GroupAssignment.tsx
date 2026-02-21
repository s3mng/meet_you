import MobileLayout from '../components/MobileLayout';

const groups = [
  { id: 1, name: '1조 - 파이썬마스터', members: 8, score: 920, rank: 1, leader: '김리더' },
  { id: 2, name: '2조 - 자바왕국', members: 7, score: 880, rank: 2, leader: '이조장' },
  { id: 3, name: '3조 - 코딩마스터', members: 7, score: 850, rank: 3, leader: '박선배', isMyGroup: true },
  { id: 4, name: '4조 - 알고리즘천재', members: 8, score: 820, rank: 4, leader: '최멤버' },
];

export default function GroupAssignment() {
  return (
    <MobileLayout showNav={true}>
      <div className="flex flex-col min-h-screen">
        <header className="p-4 border-b bg-white sticky top-0">
          <h1 className="text-lg">조 편성</h1>
          <p className="text-sm text-gray-600 mt-1">2026-1학기 조모임</p>
        </header>

        <div className="flex-1 overflow-auto">
          <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 text-white">
            <div className="bg-white/20 rounded-lg p-4 mb-3">
              <p className="text-sm opacity-90 mb-1">내 조</p>
              <h2 className="text-xl mb-2">3조 - 코딩마스터</h2>
              <div className="flex items-center gap-4 text-sm">
                <span>조원 7명</span>
                <span>•</span>
                <span>850점</span>
                <span>•</span>
                <span>3위</span>
              </div>
            </div>
            <button className="w-full bg-white/20 hover:bg-white/30 py-2 rounded-lg text-sm transition">
              조 상세보기
            </button>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold">전체 조 순위</h2>
              <span className="text-sm text-gray-500">총 4개 조</span>
            </div>

            <div className="space-y-3">
              {groups.map((group) => (
                <div
                  key={group.id}
                  className={`rounded-lg p-4 ${
                    group.isMyGroup
                      ? 'bg-purple-50 border-2 border-purple-500'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0 ${
                        group.rank === 1
                          ? 'bg-yellow-400 text-yellow-900'
                          : group.rank === 2
                          ? 'bg-gray-300 text-gray-700'
                          : group.rank === 3
                          ? 'bg-orange-400 text-orange-900'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {group.rank}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{group.name}</h3>
                        {group.isMyGroup && (
                          <span className="text-xs bg-purple-500 text-white px-2 py-0.5 rounded">내 조</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">조장: {group.leader}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">조원 {group.members}명</span>
                        <span className="text-purple-600 font-medium">{group.score}점</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <span className="font-semibold">📊 조 편성 방식</span><br/>
                관심사 프로필을 기반으로 성향이 비슷한 사람들끼리 자동으로 조를 편성했습니다.
              </p>
            </div>
          </div>

          <div className="p-4">
            <button className="w-full bg-white border-2 border-purple-500 text-purple-500 py-3 rounded-lg hover:bg-purple-50 transition">
              내 조원 보기
            </button>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
