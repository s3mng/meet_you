import MobileLayout from '../components/MobileLayout';

const groupRankings = [
  { rank: 1, name: '1조 - 파이썬마스터', score: 920, members: 8, missions: 8 },
  { rank: 2, name: '2조 - 자바왕국', score: 880, members: 7, missions: 7 },
  { rank: 3, name: '3조 - 코딩마스터', score: 850, members: 7, missions: 5, isMyGroup: true },
  { rank: 4, name: '4조 - 알고리즘천재', score: 820, members: 8, missions: 6 },
];

const individualRankings = [
  { rank: 1, name: '김리더', group: '1조', score: 280, avatar: '김' },
  { rank: 2, name: '이조장', group: '2조', score: 260, avatar: '이' },
  { rank: 3, name: '박선배', group: '3조', score: 255, avatar: '박' },
  { rank: 4, name: '최멤버', group: '4조', score: 240, avatar: '최' },
  { rank: 5, name: '김새내', group: '3조', score: 240, avatar: '김', isMe: true },
];

export default function Ranking() {
  return (
    <MobileLayout showNav={true}>
      <div className="flex flex-col min-h-screen">
        <header className="p-4 border-b bg-white sticky top-0">
          <h1 className="text-lg">랭킹</h1>
          <p className="text-sm text-gray-600 mt-1">2026-1학기 순위</p>
        </header>

        <div className="p-4 bg-gray-50 border-b">
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border-2 border-purple-500 text-purple-500 rounded-lg text-sm">
              조별 랭킹
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-600 rounded-lg text-sm hover:border-gray-400">
              개인 랭킹
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="p-4">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white mb-6">
              <p className="text-sm opacity-90 mb-1">내 조 순위</p>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl mb-1">3위</h2>
                  <p className="text-sm opacity-90">3조 - 코딩마스터</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl mb-1">850</p>
                  <p className="text-sm opacity-90">점</p>
                </div>
              </div>
            </div>

            <h2 className="font-semibold mb-3">전체 조 순위</h2>
            <div className="space-y-3">
              {groupRankings.map((group) => (
                <div
                  key={group.rank}
                  className={`rounded-lg p-4 ${
                    group.isMyGroup
                      ? 'bg-purple-50 border-2 border-purple-500'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0 ${
                        group.rank === 1
                          ? 'bg-gradient-to-br from-yellow-400 to-yellow-500 text-yellow-900'
                          : group.rank === 2
                          ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-700'
                          : group.rank === 3
                          ? 'bg-gradient-to-br from-orange-400 to-orange-500 text-orange-900'
                          : 'bg-gradient-to-br from-gray-200 to-gray-300 text-gray-600'
                      }`}
                    >
                      {group.rank === 1 ? '🥇' : group.rank === 2 ? '🥈' : group.rank === 3 ? '🥉' : group.rank}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{group.name}</h3>
                        {group.isMyGroup && (
                          <span className="text-xs bg-purple-500 text-white px-2 py-0.5 rounded">내 조</span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-600">
                        <span>{group.members}명</span>
                        <span>•</span>
                        <span>미션 {group.missions}개</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl text-purple-600 font-medium">{group.score}</p>
                      <p className="text-xs text-gray-500">점</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 mb-4">
              <h2 className="font-semibold mb-3">개인 랭킹 TOP 5</h2>
            </div>

            <div className="space-y-3">
              {individualRankings.map((person) => (
                <div
                  key={person.rank}
                  className={`rounded-lg p-4 ${
                    person.isMe
                      ? 'bg-purple-50 border-2 border-purple-500'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        person.rank <= 3
                          ? 'bg-gradient-to-br from-purple-400 to-pink-400 text-white text-lg'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {person.rank}
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white flex-shrink-0">
                      {person.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{person.name}</h3>
                        {person.isMe && (
                          <span className="text-xs bg-purple-500 text-white px-2 py-0.5 rounded">나</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">{person.group}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg text-purple-600 font-medium">{person.score}</p>
                      <p className="text-xs text-gray-500">점</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-900">
                <span className="font-semibold">🏆 보상 안내</span><br/>
                학기말 1위 조에게는 특별 상품이 수여됩니다!
              </p>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
