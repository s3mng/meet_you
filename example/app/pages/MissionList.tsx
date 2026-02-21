import MobileLayout from '../components/MobileLayout';

const missions = [
  { id: 1, title: '보드게임 카페 가기', category: '친목', points: 50, deadline: '2026.03.15', status: 'ongoing' },
  { id: 2, title: '단체 사진 찍기', category: '친목', points: 30, deadline: '2026.03.20', status: 'waiting' },
  { id: 3, title: '같이 밥 먹기', category: '밥약', points: 20, deadline: '2026.03.25', status: 'waiting' },
  { id: 4, title: '조 이름 정하기', category: '필수', points: 10, deadline: '2026.03.10', status: 'completed' },
  { id: 5, title: '스터디 카페 가기', category: '학습', points: 40, deadline: '2026.03.30', status: 'waiting' },
];

export default function MissionList() {
  return (
    <MobileLayout showNav={true}>
      <div className="flex flex-col min-h-screen">
        <header className="p-4 border-b bg-white sticky top-0">
          <h1 className="text-lg">미션</h1>
          <p className="text-sm text-gray-600 mt-1">조 미션을 수행하고 점수를 획득하세요</p>
        </header>

        <div className="p-4 bg-gray-50 border-b">
          <div className="flex gap-2 overflow-x-auto">
            <button className="px-4 py-2 bg-white border-2 border-purple-500 text-purple-500 rounded-lg text-sm whitespace-nowrap">
              전�� (5)
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-600 rounded-lg text-sm whitespace-nowrap hover:border-gray-400">
              진행중 (1)
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-600 rounded-lg text-sm whitespace-nowrap hover:border-gray-400">
              완료 (1)
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-600 rounded-lg text-sm whitespace-nowrap hover:border-gray-400">
              친목 (2)
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-600 rounded-lg text-sm whitespace-nowrap hover:border-gray-400">
              밥약 (1)
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-3">
          {missions.map((mission) => (
            <a
              key={mission.id}
              href={`/mission/${mission.id}`}
              className={`block rounded-lg p-4 transition ${
                mission.status === 'ongoing'
                  ? 'bg-white border-2 border-purple-200 hover:border-purple-400'
                  : mission.status === 'completed'
                  ? 'bg-green-50 border border-green-200 hover:border-green-300'
                  : 'bg-white border border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium flex-1">{mission.title}</h3>
                <span
                  className={`text-xs px-2 py-1 rounded whitespace-nowrap ml-2 ${
                    mission.status === 'ongoing'
                      ? 'bg-orange-100 text-orange-700'
                      : mission.status === 'completed'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {mission.status === 'ongoing'
                    ? '진행중'
                    : mission.status === 'completed'
                    ? '완료'
                    : '대기'}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                  {mission.category}
                </span>
                <span className="text-xs text-gray-500">
                  {mission.points}점
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>마감: {mission.deadline}</span>
                </div>
                {mission.status === 'completed' && (
                  <span className="text-green-600">✓ 승인완료</span>
                )}
              </div>
            </a>
          ))}
        </div>

        <div className="p-4 border-t bg-white">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-900 mb-1">내 조 누적 점수</p>
                <p className="text-2xl text-purple-600">850점</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-purple-900 mb-1">완료 미션</p>
                <p className="text-2xl text-purple-600">5개</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
